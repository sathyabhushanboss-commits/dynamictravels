// Razorpay webhook — marks a booking paid when its WhatsApp payment link is
// paid, even if the customer closes the browser before being redirected back.
//
// Razorpay Dashboard → Settings → Webhooks → Add new webhook:
//   URL:     https://<your-domain>/api/payment/webhook
//   Secret:  same value as RAZORPAY_WEBHOOK_SECRET
//   Events:  payment_link.paid

import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { confirmLinkPaid } from '@/lib/pay-links';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return new Response('Webhook not configured', { status: 503 });

  const raw = await req.text();
  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const given = String(req.headers.get('x-razorpay-signature') || '');
  if (expected.length !== given.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given))) {
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const event = JSON.parse(raw);
    if (event.event === 'payment_link.paid') {
      const link = event.payload?.payment_link?.entity;
      const bookingId = link?.notes?.booking_id;
      // Re-checks with Razorpay before updating (never trusts the payload alone).
      if (bookingId && link?.id) await confirmLinkPaid(bookingId, link.id);
    }
  } catch (err) {
    console.error('[razorpay webhook]', err?.message || err);
  }
  return NextResponse.json({ ok: true });
}
