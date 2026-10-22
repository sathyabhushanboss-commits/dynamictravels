// WhatsApp Business Cloud API (Meta).
//
// Two things use this:
//  1. New website lead → we send the customer an approved template message
//     ("Hello {{1}}, are you looking for travel?…"). Meta only lets a business
//     start a conversation with a pre-approved template.
//  2. Customer messages our number → the webhook (app/api/whatsapp/webhook)
//     replies with a greeting. Inside that 24-hour window a plain text reply
//     is allowed, no template needed.
//
// If WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID aren't set, every call here is
// skipped and the site works exactly as before. Setup steps: .env.example.

import crypto from 'crypto';
import { SITE } from './site';

const {
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_API_VERSION = 'v23.0',
  WHATSAPP_TEMPLATE_NAME,
  WHATSAPP_TEMPLATE_LANG = 'en',
  WHATSAPP_APP_SECRET,
} = process.env;

export const hasWhatsAppApi = Boolean(WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID);

async function send(payload) {
  if (!hasWhatsAppApi) return { skipped: true };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messaging_product: 'whatsapp', ...payload }),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[whatsapp] send failed:', data?.error?.message || res.status);
      return { error: data?.error?.message || `HTTP ${res.status}` };
    }
    return { sent: true, id: data?.messages?.[0]?.id };
  } catch (err) {
    console.error('[whatsapp] send failed:', err.message);
    return { error: err.message };
  }
}

const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || 'there';

/** Business-initiated greeting to a new lead (needs an approved template). */
export function sendLeadGreeting({ phone, name }) {
  if (!WHATSAPP_TEMPLATE_NAME) return Promise.resolve({ skipped: true });
  return send({
    to: phone,
    type: 'template',
    template: {
      name: WHATSAPP_TEMPLATE_NAME,
      language: { code: WHATSAPP_TEMPLATE_LANG },
      components: [{ type: 'body', parameters: [{ type: 'text', text: firstName(name) }] }],
    },
  });
}

// Template params can't contain newlines, tabs or long runs of spaces.
const clean = (v, max = 120) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max) || '-';

/**
 * Booking confirmation to the customer: a short "Hi", the booking summary
 * and a "Pay now" URL button pointing at their private /pay/<token> page.
 * Needs an approved Utility template named in WHATSAPP_BOOKING_TEMPLATE
 * (wording + button setup in .env.example).
 */
export function sendBookingConfirmation(booking, { amountText, payToken }) {
  const template = process.env.WHATSAPP_BOOKING_TEMPLATE;
  if (!template) return Promise.resolve({ skipped: true });
  const phone10 = String(booking.phone || '').replace(/\D/g, '').slice(-10);
  if (phone10.length !== 10) return Promise.resolve({ error: 'Invalid customer phone' });

  const ride = [booking.vehicleLabel, [booking.date, booking.time].filter(Boolean).join(' ')].filter(Boolean).join(' · ');
  return send({
    to: `91${phone10}`,
    type: 'template',
    template: {
      name: template,
      language: { code: WHATSAPP_TEMPLATE_LANG },
      components: [
        {
          type: 'body',
          parameters: [firstName(booking.name), booking.id, ride, amountText].map((t) => ({ type: 'text', text: clean(t) })),
        },
        { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: payToken }] },
      ],
    },
  });
}

/** Sends an approved template with plain text body parameters. */
export function sendTemplate(to, templateName, params = []) {
  if (!templateName) return Promise.resolve({ skipped: true });
  return send({
    to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: WHATSAPP_TEMPLATE_LANG },
      components: [{ type: 'body', parameters: params.map((t) => ({ type: 'text', text: clean(t) })) }],
    },
  });
}

const bookingWhen = (b) => [b.date, b.time].filter(Boolean).join(' ') || 'To be confirmed';

/**
 * Simple customer confirmation (no payment button):
 *   "Hi {{1}}, thank you for booking with us! Date: {{2}} Pickup: {{3}} …"
 * Template name in WHATSAPP_CUSTOMER_TEMPLATE. Used when the "Pay now"
 * template (WHATSAPP_BOOKING_TEMPLATE) isn't set.
 */
export function sendCustomerConfirmation(booking) {
  const phone10 = String(booking.phone || '').replace(/\D/g, '').slice(-10);
  if (phone10.length !== 10) return Promise.resolve({ error: 'Invalid customer phone' });
  return sendTemplate(`91${phone10}`, process.env.WHATSAPP_CUSTOMER_TEMPLATE, [
    firstName(booking.name),
    bookingWhen(booking),
    booking.pickup || 'To be confirmed',
  ]);
}

/**
 * New-booking alert to the owner:
 *   "New booking received. Name: {{1}} Phone: {{2}} Date: {{3}} Pickup: {{4}}"
 * Template name in WHATSAPP_OWNER_TEMPLATE, recipient in WHATSAPP_OWNER_NUMBER.
 * The owner number must differ from the number the Cloud API sends from.
 */
export function sendOwnerBookingAlert(booking) {
  const digits = String(process.env.WHATSAPP_OWNER_NUMBER || '').replace(/\D/g, '');
  const to = digits.length === 10 ? `91${digits}` : digits;
  if (!/^91\d{10}$/.test(to)) return Promise.resolve({ skipped: true });
  return sendTemplate(to, process.env.WHATSAPP_OWNER_TEMPLATE, [
    booking.name,
    `+91 ${String(booking.phone || '').replace(/\D/g, '').slice(-10)}`,
    bookingWhen(booking),
    booking.pickup || '-',
  ]);
}

/** Auto-reply when a customer messages us first. */
export function sendAutoReply({ phone, name }) {
  const text = [
    `Hello ${firstName(name)}! 👋`,
    `Welcome to *${SITE.name}* — thank you for reaching out.`,
    '',
    'Are you looking for travelling? To share the best fare, please send us:',
    '1️⃣ Pickup location',
    '2️⃣ Destination',
    '3️⃣ Travel date & time',
    '4️⃣ Number of passengers',
    '',
    'Our travel expert will reply shortly. 🚗',
    `📞 ${SITE.phoneDisplay} (24×7)`,
    `🌐 Live fares: ${SITE.url}/#book`,
  ].join('\n');

  return send({ to: phone, type: 'text', text: { preview_url: false, body: text } });
}

/** Checks Meta's X-Hub-Signature-256 header against the raw request body. */
export function verifySignature(rawBody, header) {
  if (!WHATSAPP_APP_SECRET) {
    console.warn('[whatsapp] WHATSAPP_APP_SECRET not set — webhook signature not verified');
    return true;
  }
  if (!header?.startsWith('sha256=')) return false;
  const expected = crypto.createHmac('sha256', WHATSAPP_APP_SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
