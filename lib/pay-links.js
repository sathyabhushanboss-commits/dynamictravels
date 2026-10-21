// Pay-by-link for bookings.
//
// Every booking gets a private pay URL — /pay/<token> — which is what the
// WhatsApp "Pay now" button opens. That page shows the amount due (+ the
// online payment fee) and sends the customer to a Razorpay Payment Link.
// When Razorpay confirms the payment (redirect back, or the webhook at
// /api/payment/webhook), the booking is marked paid automatically.

import crypto from 'crypto';
import { getBooking, patchBooking } from './db';
import { ONLINE_FEE_RATE } from './payments';
import { SITE } from './site';

const secret = () =>
  process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.RAZORPAY_KEY_SECRET || 'dt-pay';

const sig = (id) => crypto.createHmac('sha256', secret()).update(`pay:${id}`).digest('base64url').slice(0, 12);

/** Unguessable token for a booking's pay page. */
export const payToken = (bookingId) => `${bookingId}.${sig(bookingId)}`;
export const payUrl = (bookingId) => `${SITE.url}/pay/${payToken(bookingId)}`;

/** Returns the booking id if the token is genuine, else null. */
export function parsePayToken(token) {
  const [id, s] = String(token || '').split('.');
  if (!id || !s) return null;
  const a = Buffer.from(s);
  const b = Buffer.from(sig(id));
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? id : null;
}

/** What's still owed on a booking and the fee for paying it online. */
export function amountDue(booking) {
  if (booking.price?.enquiryOnly || booking.paymentStatus === 'paid') return { fare: 0, fee: 0, total: 0 };
  const fare = Math.max(0, Math.round(Number(booking.balanceDue ?? booking.price?.total) || 0));
  const fee = Math.round(fare * ONLINE_FEE_RATE);
  return { fare, fee, total: fare + fee };
}

/* ------------------------------ Razorpay ------------------------------- */

function rzp(path, init = {}) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  return fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
    cache: 'no-store',
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.description || `Razorpay error ${res.status}`);
    return data;
  });
}

export const hasRazorpay = () => Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

/**
 * Returns a usable Razorpay Payment Link for the amount currently due,
 * reusing the last one if it's still open for the same amount.
 */
export async function ensurePaymentLink(booking) {
  const due = amountDue(booking);
  if (due.total < 1) return null;

  const existing = booking.paymentLink;
  if (existing?.id && existing.amount === due.total) {
    try {
      const link = await rzp(`/payment_links/${existing.id}`);
      if (link.status === 'paid') {
        await markLinkPaid(booking.id, link);
        return { paid: true };
      }
      if (link.status === 'created' || link.status === 'partially_paid') return { url: link.short_url, due };
    } catch (err) {
      console.error('[pay] could not fetch payment link', err.message);
    }
  }

  const n = (booking.paymentLinkCount || 0) + 1;
  const phone10 = String(booking.phone || '').replace(/\D/g, '').slice(-10);
  const link = await rzp('/payment_links', {
    method: 'POST',
    body: JSON.stringify({
      amount: due.total * 100,
      currency: 'INR',
      accept_partial: false,
      reference_id: n > 1 ? `${booking.id}-${n}` : booking.id,
      description: `${SITE.name} booking ${booking.id} — ${booking.vehicleLabel || 'ride'}`.slice(0, 2048),
      customer: { name: booking.name, contact: phone10 ? `+91${phone10}` : undefined, email: booking.email || undefined },
      notify: { sms: false, email: false },
      reminder_enable: false,
      notes: { booking_id: booking.id, fare: String(due.fare), online_fee: String(due.fee) },
      callback_url: payUrl(booking.id),
      callback_method: 'get',
    }),
  });

  await patchBooking(booking.id, {
    paymentLink: { id: link.id, url: link.short_url, amount: due.total, fee: due.fee, createdAt: new Date().toISOString() },
    paymentLinkCount: n,
  });
  return { url: link.short_url, due };
}

/** Signature Razorpay adds to the redirect after a payment link is paid. */
export function verifyLinkCallback(q) {
  const { razorpay_payment_link_id: id, razorpay_payment_link_reference_id: ref = '', razorpay_payment_link_status: status, razorpay_payment_id: pid, razorpay_signature: signature } = q || {};
  if (!id || !pid || !signature || status !== 'paid') return false;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(`${id}|${ref}|${status}|${pid}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Confirms with Razorpay that the link is paid, then updates the booking (idempotent). */
export async function confirmLinkPaid(bookingId, linkId) {
  const link = await rzp(`/payment_links/${linkId}`);
  if (link.status !== 'paid' || link.notes?.booking_id !== bookingId) return null;
  return markLinkPaid(bookingId, link);
}

async function markLinkPaid(bookingId, link) {
  const booking = await getBooking(bookingId);
  if (!booking) return null;
  if ((booking.paidLinks || []).includes(link.id)) return booking;

  const paidRupees = Math.round((link.amount_paid || link.amount) / 100);
  const fee = Number(link.notes?.online_fee) || 0;
  return patchBooking(bookingId, {
    status: booking.status === 'Cancelled' ? 'Cancelled' : 'Confirmed',
    paymentStatus: 'paid',
    paymentMode: 'Paid online via WhatsApp payment link (Razorpay)',
    amountPaid: (Number(booking.amountPaid) || 0) + paidRupees,
    onlineFee: (Number(booking.onlineFee) || 0) + fee,
    balanceDue: 0,
    paidLinks: [...(booking.paidLinks || []), link.id],
    razorpayPaymentId: link.payments?.[link.payments.length - 1]?.payment_id || booking.razorpayPaymentId || '',
  });
}
