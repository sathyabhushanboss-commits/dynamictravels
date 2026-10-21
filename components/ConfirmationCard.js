'use client';

import { formatINR } from '@/lib/pricing';
import { SITE } from '@/lib/site';

// Business contact comes from lib/site.js.
const PHONE = SITE.phone;

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

      {/* WhatsApp is sent automatically from the business number (server-side) */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#E8F9EF] p-4 text-sm text-[#0F5132]">
        <span className="text-lg leading-none">💬</span>
        <p>
          {booking.whatsappAuto === 'sent'
            ? booking.paymentStatus === 'paid'
              ? 'We’ve sent your booking confirmation to your WhatsApp.'
              : 'We’ve sent your booking details and a secure “Pay now” link to your WhatsApp.'
            : 'Our team will send your booking details on WhatsApp shortly.'}
        </p>
      </div>

      <a
        href={`tel:${PHONE}`}
        className="focus-ring mt-4 flex items-center justify-center gap-2 rounded-full border-2 border-asphalt px-4 py-3 text-sm font-semibold text-asphalt hover:bg-asphalt hover:text-white"
      >
        📞 Call Us
      </a>

      {onReset && (
        <button onClick={onReset} className="focus-ring mt-6 text-sm font-medium text-route-teal underline underline-offset-4">
          Make another booking
        </button>
      )}
    </div>
  );
}
