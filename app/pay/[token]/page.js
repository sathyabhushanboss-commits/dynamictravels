import { notFound } from 'next/navigation';
import { CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { getBooking } from '@/lib/db';
import { amountDue, confirmLinkPaid, ensurePaymentLink, hasRazorpay, parsePayToken, verifyLinkCallback } from '@/lib/pay-links';
import { formatINR } from '@/lib/pricing';
import { SITE, telLink } from '@/lib/site';

// Opened from the WhatsApp "Pay now" button. Shows what's due and hands over
// to Razorpay; Razorpay redirects back here after payment.
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pay for your ride', robots: { index: false, follow: false } };

function Shell({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-cream-line bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,42,61,0.35)] sm:p-9">
        <img src="/images/logo.webp" alt={SITE.name} className="mx-auto h-auto w-[190px]" />
        {children}
        <p className="mt-6 text-center text-xs text-ink-mute">
          Questions? Call <a href={telLink} className="font-semibold text-ink underline">{SITE.phoneDisplay}</a> (24×7)
        </p>
      </div>
    </main>
  );
}

function Summary({ booking }) {
  return (
    <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">
      <div className="flex justify-between gap-4">
        <span className="text-ink-mute">Booking</span>
        <span className="font-semibold text-ink">{booking.id}</span>
      </div>
      <div className="mt-1 flex justify-between gap-4">
        <span className="text-ink-mute">Ride</span>
        <span className="text-right font-semibold text-ink">{booking.vehicleLabel}</span>
      </div>
      {(booking.date || booking.time) && (
        <div className="mt-1 flex justify-between gap-4">
          <span className="text-ink-mute">When</span>
          <span className="font-semibold text-ink">{[booking.date, booking.time].filter(Boolean).join(' · ')}</span>
        </div>
      )}
      {booking.pickup && (
        <div className="mt-1 flex justify-between gap-4">
          <span className="shrink-0 text-ink-mute">Pickup</span>
          <span className="text-right font-semibold text-ink">{booking.pickup}</span>
        </div>
      )}
    </div>
  );
}

export default async function PayPage({ params, searchParams }) {
  const id = parsePayToken(params.token);
  if (!id) notFound();
  let booking = await getBooking(id);
  if (!booking) notFound();

  // Back from Razorpay: verify the signature, confirm with Razorpay, mark paid.
  if (searchParams?.razorpay_payment_link_id && verifyLinkCallback(searchParams)) {
    try {
      booking = (await confirmLinkPaid(id, searchParams.razorpay_payment_link_id)) || booking;
    } catch (err) {
      console.error('[pay] confirm failed', err.message);
    }
  }

  const first = String(booking.name || '').split(' ')[0];

  if (booking.paymentStatus === 'paid') {
    return (
      <Shell>
        <div className="mt-7 text-center">
          <CheckCircle2 size={52} className="mx-auto text-emerald-500" />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">Payment received{first ? `, ${first}` : ''}!</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Your ride is fully paid — nothing to pay the driver. We&apos;ll share driver details before pickup.
          </p>
        </div>
        <Summary booking={booking} />
        <div className="mt-3 flex justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          <span>Paid online</span>
          <span>{formatINR(booking.amountPaid)}</span>
        </div>
      </Shell>
    );
  }

  if (booking.price?.enquiryOnly) {
    return (
      <Shell>
        <h1 className="mt-7 text-center font-display text-2xl font-extrabold text-ink">We&apos;re preparing your quote</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">Our team will share the fare for this trip on WhatsApp shortly.</p>
        <Summary booking={booking} />
      </Shell>
    );
  }

  const due = amountDue(booking);
  let link = null;
  let problem = '';
  if (!hasRazorpay()) {
    problem = 'Online payment is not available right now.';
  } else {
    try {
      link = await ensurePaymentLink(booking);
      if (link?.paid) booking = await getBooking(id);
    } catch (err) {
      console.error('[pay] link failed', err.message);
      problem = 'We could not start the online payment just now. Please try again in a minute.';
    }
  }

  if (booking.paymentStatus === 'paid') {
    return (
      <Shell>
        <div className="mt-7 text-center">
          <CheckCircle2 size={52} className="mx-auto text-emerald-500" />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">Already paid — thank you!</h1>
        </div>
        <Summary booking={booking} />
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="mt-7 text-center font-display text-2xl font-extrabold text-ink">Hi {first || 'there'} 👋</h1>
      <p className="mt-1 text-center text-sm text-ink-soft">Pay for your ride securely online.</p>
      <Summary booking={booking} />

      <div className="mt-4 rounded-2xl border border-cream-line p-4 text-sm">
        <div className="flex justify-between text-ink-soft">
          <span>{booking.paymentStatus === 'advance_paid' ? 'Balance fare' : 'Fare (incl. GST)'}</span>
          <span>{formatINR(due.fare)}</span>
        </div>
        <div className="mt-1 flex justify-between text-ink-soft">
          <span>Online payment fee</span>
          <span>{formatINR(due.fee)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-cream-line pt-2 font-display text-lg font-extrabold text-ink">
          <span>Pay now</span>
          <span>{formatINR(due.total)}</span>
        </div>
      </div>

      {link?.url ? (
        <a
          href={link.url}
          className="btn-shine mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-bold text-white shadow-brand transition hover:bg-brand-dark"
        >
          <Lock size={17} /> Pay {formatINR(due.total)} securely
        </a>
      ) : (
        <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-800">{problem}</p>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-mute">
        <ShieldCheck size={13} className="text-sky-deep" /> UPI, cards, netbanking &amp; wallets via Razorpay. Prefer cash? Pay the driver{' '}
        {formatINR(due.fare)} after the ride — no fee.
      </p>
    </Shell>
  );
}
