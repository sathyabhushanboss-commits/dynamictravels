// Payment options shown at checkout, in priority order (the first is the
// default selection):
//
//  - full      : pay the whole fare now, nothing left for the driver
//  - advance25 : pay 25% now to lock the booking, balance to the driver
//  - later     : pay nothing now, settle with the driver after the ride
//
// The two paid options go through Razorpay and carry a 2% online payment fee
// (Razorpay's charge, passed on to the customer) on the amount paid online.
// "later" needs no payment gateway and has no fee.

// 2% by default; override with NEXT_PUBLIC_ONLINE_PAYMENT_FEE_PCT (e.g. "2.5").
export const ONLINE_FEE_RATE = (() => {
  const pct = Number(process.env.NEXT_PUBLIC_ONLINE_PAYMENT_FEE_PCT);
  return Number.isFinite(pct) && pct >= 0 && pct <= 10 ? pct / 100 : 0.02;
})();

export const PAYMENT_OPTIONS = [
  {
    id: 'full',
    label: 'Pay 100% now',
    pct: 1,
    tagline: 'Full payment',
    badge: 'Recommended',
    desc: 'Pay the full fare now. Nothing to pay the driver.',
  },
  {
    id: 'advance25',
    label: 'Pay 25% now',
    pct: 0.25,
    tagline: '25% advance',
    desc: 'Lock your ride with a 25% advance. Pay the balance to the driver.',
  },
  {
    id: 'later',
    label: 'Pay after ride',
    pct: 0,
    tagline: 'Pay later',
    desc: 'Book now, pay the driver by cash or UPI after your trip.',
  },
];

export const DEFAULT_PAYMENT_OPTION = PAYMENT_OPTIONS[0].id;

// Unknown ids fall back to "later" so a bad request can never trigger a charge.
export function getPaymentOption(id) {
  return PAYMENT_OPTIONS.find((o) => o.id === id) || PAYMENT_OPTIONS.find((o) => o.id === 'later');
}

/**
 * Given a GST-inclusive total and a payment option id, work out how much is
 * due now (online, including the payment fee) and how much is left for the
 * driver.
 */
export function paymentBreakdown(total, optionId) {
  const option = getPaymentOption(optionId);
  const safeTotal = Math.max(0, Math.round(Number(total) || 0));
  const fareNow = Math.round(safeTotal * option.pct); // part of the fare paid online
  const fee = option.pct > 0 ? Math.round(fareNow * ONLINE_FEE_RATE) : 0;
  const payNow = fareNow + fee;
  const balance = Math.max(0, safeTotal - fareNow);

  let status = 'not_paid';
  if (option.pct >= 1) status = 'paid';
  else if (option.pct > 0) status = 'advance_paid';

  return {
    optionId: option.id,
    label: option.label,
    pct: option.pct,
    total: safeTotal,
    fareNow, // fare portion collected online (INR)
    fee, // online payment fee (INR)
    feeRate: ONLINE_FEE_RATE,
    payNow, // amount charged on Razorpay now = fareNow + fee (INR)
    balance, // amount to pay the driver (INR)
    status, // paymentStatus to store on the booking
    requiresPayment: option.pct > 0,
  };
}
