import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isAdminToken } from '@/lib/admin-auth';
import { addLead, findLeadByPhone, getLeads, makeLeadId, normalizePhone, updateLeadData } from '@/lib/leads';
import { sendLeadEmails } from '@/lib/mailer';
import { sendLeadGreeting } from '@/lib/whatsapp';
import { SITE } from '@/lib/site';

const TRIP_TYPES = ['Airport transfer', 'Local city ride', 'Outstation trip', 'Group / bus travel', 'Wedding / event', 'Other'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Light per-IP throttle so the public form can't be used to spam emails or
// WhatsApp messages. In-memory, so it resets per server instance — enough to
// stop casual abuse.
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

// Public: the lead popup / WhatsApp widget posts here.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));

  // Honeypot field — real visitors never see or fill it.
  if (body.company) return NextResponse.json({ ok: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (throttled(ip)) {
    return NextResponse.json({ error: 'Too many requests — please call or WhatsApp us directly.' }, { status: 429 });
  }

  const name = String(body.name || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  const phone = normalizePhone(body.phone);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 120);

  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!phone) return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
  if (email && !EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });

  const lead = {
    id: makeLeadId(),
    createdAt: new Date().toISOString(),
    status: 'New',
    name,
    phone,
    email,
    tripType: TRIP_TYPES.includes(body.tripType) ? body.tripType : '',
    source: body.source === 'whatsapp-widget' ? 'whatsapp-widget' : 'popup',
    page: String(body.page || '/').slice(0, 200),
  };

  // One WhatsApp greeting per number per 6 hours, however often the form is sent.
  let recentlyGreeted = false;
  try {
    const previous = await findLeadByPhone(phone);
    recentlyGreeted = Boolean(previous && Date.now() - new Date(previous.createdAt).getTime() < 6 * 3600 * 1000);
  } catch {
    /* lookup failure shouldn't block the lead */
  }

  try {
    await addLead(lead);
  } catch (err) {
    console.error('[leads] save failed', err?.message || err);
    return NextResponse.json({ error: 'Could not save right now — please call or WhatsApp us.' }, { status: 500 });
  }

  const [mail, wa] = await Promise.allSettled([
    sendLeadEmails(lead, SITE),
    recentlyGreeted ? Promise.resolve({ sent: true, deduped: true }) : sendLeadGreeting(lead),
  ]);

  const waResult = wa.status === 'fulfilled' ? wa.value : { error: String(wa.reason) };
  const whatsappAuto = waResult.deduped ? 'duplicate' : waResult.sent ? 'sent' : waResult.skipped ? 'not-configured' : 'failed';
  await updateLeadData(lead.id, { whatsappAuto }).catch(() => {});

  return NextResponse.json({
    ok: true,
    id: lead.id,
    email: mail.status === 'fulfilled' ? mail.value : { error: String(mail.reason) },
    whatsapp: wa.status === 'fulfilled' ? wa.value : { error: String(wa.reason) },
  });
}

// Admin: list leads.
export async function GET() {
  if (!isAdminToken(cookies().get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  return NextResponse.json({ leads: await getLeads() });
}
