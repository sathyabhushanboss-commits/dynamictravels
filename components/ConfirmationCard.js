'use client';

import { formatINR } from '@/lib/pricing';
import { SITE } from '@/lib/site';

// Business contact comes from lib/site.js.
const PHONE = SITE.phone;

// Message the customer sends from their own WhatsApp, about the service they booked.
function whatsappUrl(b) {
  const lines = [
    `Hello ${SITE.name}! 👋`,
    `I've just booked ${b.tripTypeLabel || 'a ride'} on your website.`,
    '',
    `Booking ID: ${b.id}`,
    `Name: ${b.name}`,
    `Vehicle: ${b.vehicleLabel || '-'}`,
    b.pickup ? `Pickup: ${b.pickup}` : null,
    b.drop ? `Drop: ${b.drop}` : null,
    b.date ? `Date: ${[b.date, b.time].filter(Boolean).join(' ')}` : null,
    b.price?.enquiryOnly ? 'Fare: please share a quote' : `Fare: ${formatINR(b.price?.total)} (incl. GST)`,
    '',
    'Please confirm my booking.',
  ].filter((l) => l !== null);
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function ConfirmationCard({ booking, onReset }) {
  const paid = booking.paymentStatus === 'paid';
  const advance = booking.paymentStatus === 'advance_paid';

  return (
    <div className="ticket-notch rounded-2xl border border-black/5 bg-white p-8 shadow-ticket">
      <div className="route-line mb-6 rounded-full" />
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-route-green">✅ Ride Confirmed</div>
      <h3 className="font-display text-2xl font-bold text-asphalt">Thank you, {booking.name}!</h3>
      <p className="mt-2 text-sm text-asphalt/70">
        Booking ID <span className="font-semibold text-asphalt">{booking.id}</span>. Our team will call you shortly to
        finalize the details.
      </p>
      {booking.emailSent && (
        <p className="mt-3 rounded-xl bg-mist px-4 py-2.5 text-sm text-asphalt/80">
          📧 All your booking details have been emailed to <span className="font-semibold text-asphalt">{booking.email}</span>.
        </p>
      )}

      {/* Fare + payment status */}
      {!booking.price?.enquiryOnly && (
        <div className="mt-4 rounded-xl bg-mist p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-asphalt/70">Total fare (incl. GST)</span>
            <span className="font-display text-lg font-bold text-asphalt">{formatINR(booking.price?.total)}</span>
          </div>

          {paid && (
            <div className="mt-2 flex items-center justify-between text-sm text-route-green">
              <span>Paid online</span>
              <span className="font-semibold">{formatINR(booking.amountPaid)} · nothing due to driver</span>
            </div>
          )}
          {(paid || advance) && booking.onlineFee > 0 && (
            <div className="text-right text-[11px] text-asphalt/45">
              Includes {formatINR(booking.onlineFee)} online payment fee
            </div>
          )}
          {advance && (
            <>
              <div className="mt-2 flex items-center justify-between text-sm text-route-green">
                <span>Advance paid online</span>
                <span className="font-semibold">{formatINR(booking.amountPaid)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-asphalt/70">
                <span>Balance to driver</span>
                <span className="font-semibold">{formatINR(booking.balanceDue)}</span>
              </div>
            </>
          )}
          {!paid && !advance && (
            <div className="mt-2 text-sm text-asphalt/60">
              No advance needed — pay {formatINR(booking.price?.total)} to the driver by cash or UPI after your ride.
            </div>
          )}
        </div>
      )}

      {/* Pay online now (private pay page — fare + online payment fee) */}
      {booking.payPath && !paid && (
        <a
          href={booking.payPath}
          className="focus-ring mt-6 flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-sm font-bold text-white shadow-brand hover:bg-brand-dark"
        >
          🔒 Pay {formatINR(booking.balanceDue)} online now
        </a>
      )}

      <div className={`grid gap-3 sm:grid-cols-2 ${booking.payPath && !paid ? 'mt-3' : 'mt-6'}`}>
        <a
          href={whatsappUrl(booking)}
          target="_blank"
          rel="noreferrer"
          className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#1ebe5a]"
        >
          💬 Send booking on WhatsApp
        </a>
        <a
          href={`tel:${PHONE}`}
          className="focus-ring flex items-center justify-center gap-2 rounded-full bg-sky px-4 py-3 text-sm font-bold text-white hover:bg-sky-deep"
        >
          📞 Call Us
        </a>
      </div>

      {onReset && (
        <button onClick={onReset} className="focus-ring mt-6 text-sm font-medium text-route-teal underline underline-offset-4">
          Make another booking
        </button>
      )}
    </div>
  );
}
