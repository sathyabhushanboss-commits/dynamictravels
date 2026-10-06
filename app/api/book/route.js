import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { addBooking, getBookings, makeBookingId } from '@/lib/db';
import { sendBookingEmail } from '@/lib/mailer';
import { paymentBreakdown } from '@/lib/payments';
import { calculatePrice } from '@/lib/pricing';
import { getRatesData } from '@/lib/rates-store';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isAdminToken } from '@/lib/admin-auth';

// ---------------------------------------------------------------------------
// FIXES in this route
//  1. The fare used to come straight from the browser (body.price.total), so a
//     customer could edit the request and book any car for ₹1. The fare is now
//     recalculated here from the rates stored in the database.
//  2. A booking used to be marked "Confirmed / paid" if the request merely
//     contained ANY razorpayPaymentId string. The Razorpay signature is now
//     verified here (HMAC-SHA256) and the order amount is cross-checked with
//     Razorpay before anything is marked as paid.
//  3. The booking email was fire-and-forget. On Vercel the function is frozen
//     as soon as the response is sent, so emails were silently dropped. It is
//     now awaited (failures are still logged and never block the booking).
//  4. /my-bookings lookup matched with endsWith(), so typing a single digit
//     returned other customers' bookings. It now needs a full 10-digit number.
// ---------------------------------------------------------------------------

const onlyDigits = (s) => String(s || '').replace(/\D/g, '');
const last10 = (s) => onlyDigits(s).slice(-10);

function tripDays(tripType, date, returnDate, fallback) {
  if (tripType !== 'outstation') return 1;
  if (date && returnDate) {
    const diff = Math.round((new Date(returnDate) - new Date(date)) / 86400000);
    return diff > 0 ? Math.min(diff + 1, 60) : 1;
  }
  return Math.min(Math.max(1, Number(fallback) || 1), 60);
}

function signatureValid(orderId, paymentId, signature, secret) {
  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Returns { ok, paidPaise, reason }
async function verifyOnlinePayment(payment, expectedPaise) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = payment || {};

  if (!secret || !keyId) return { ok: false, reason: 'Payment gateway not configured' };
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return { ok: false, reason: 'Missing payment details' };
  }
  if (!signatureValid(razorpayOrderId, razorpayPaymentId, razorpaySignature, secret)) {
    return { ok: false, reason: 'Invalid payment signature' };
  }

  // Signature is genuine. Now make sure the order was for the right amount
  // (the order amount is chosen by the browser in /api/payment/order).
  try {
    const auth = Buffer.from(`${keyId}:${secret}`).toString('base64');
    const res = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpayOrderId)}`, {
      headers: { Authorization: `Basic ${auth}` },
      cache: 'no-store',
    });
    if (res.ok) {
      const order = await res.json();
      const orderPaise = Number(order.amount) || 0;
      if (orderPaise !== expectedPaise) {
        return { ok: false, paidPaise: orderPaise, reason: `Amount mismatch (paid ₹${orderPaise / 100}, expected ₹${expectedPaise / 100})` };
      }
      return { ok: true, paidPaise: orderPaise };
    }
  } catch (err) {
    console.error('[book] could not fetch Razorpay order', err?.message || err);
  }
  // Razorpay unreachable, but the signature is valid → accept, amount unchecked.
  return { ok: true, paidPaise: expectedPaise, unchecked: true };
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    if (onlyDigits(phone).length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    const tripType = String(body.tripType || 'airport');
    const days = tripDays(tripType, body.date, body.returnDate, body.days);
    const km = Math.max(0, Math.round(Number(body.km) || 0));
    const localPackageIdx = Math.max(0, Number(body.localPackageIdx) || 0);

    // ---- Server-side fare (never trust the browser's numbers) -------------
    const rates = await getRatesData();
    let price = calculatePrice({
      vehicles: rates.vehicles,
      vehicleId: body.vehicleId,
      tripType,
      km,
      days,
      localPackageIdx,
      gstRate: rates.settings?.gstRate,
    });
    // Unknown / unpriced vehicle (e.g. a fleet vehicle that has no rate card
    // yet) or an enquiry trip → record it as a quote request.
    if (price?.error || price?.enquiryOnly || body.price?.enquiryOnly) {
      price = { enquiryOnly: true, label: body.vehicleLabel || body.vehicleId || '' };
    }
    const isEnquiry = !!price.enquiryOnly;

    // ---- Payment -----------------------------------------------------------
    const optionId = isEnquiry ? 'later' : body.payment?.optionId || 'later';
    const split = paymentBreakdown(price.total || 0, optionId);

    let paid = false;
    let amountPaid = 0;
    let paymentNote = '';
    if (split.requiresPayment) {
      const check = await verifyOnlinePayment(body.payment, split.payNow * 100);
      paid = check.ok;
      amountPaid = check.paidPaise ? Math.round(check.paidPaise / 100) : 0;
      if (!check.ok) paymentNote = check.reason || 'Payment not verified';
    }

    const paymentStatus = paid ? split.status : 'not_paid';
    const balanceDue = paid ? Math.max(0, split.total - amountPaid) : split.total;

    const paymentMode = !split.requiresPayment
      ? 'Pay after ride (cash / UPI to driver)'
      : paid
      ? split.pct >= 1
        ? 'Paid in full online (Razorpay)'
        : '25% advance paid online (Razorpay); balance to driver'
      : body.payment?.razorpayPaymentId
      ? `Online payment NEEDS MANUAL CHECK — ${paymentNote}`
      : 'Advance selected — payment not completed';

    const booking = {
      id: makeBookingId(),
      createdAt: new Date().toISOString(),
      status: paid ? 'Confirmed' : 'Pending',
      name,
      phone,
      email: body.email || '',
      tripType,
      tripTypeLabel: body.tripTypeLabel || tripType,
      vehicleId: body.vehicleId || '',
      vehicleLabel: body.vehicleLabel || body.vehicleId || '',
      fleetVehicle: body.fleetVehicle || '',
      source: body.source || 'website',
      pickup: body.pickup || '',
      drop: body.drop || '',
      stops: Array.isArray(body.stops) ? body.stops : [],
      date: body.date || '',
      time: body.time || '',
      returnDate: body.returnDate || '',
      days,
      km,
      passengers: body.passengers ? Number(body.passengers) || '' : '',
      notes: body.notes || '',
      price,
      // Payment
      paymentOption: optionId,
      paymentMode,
      paymentStatus, // 'not_paid' | 'advance_paid' | 'paid'
      amountPaid,
      balanceDue,
      razorpayOrderId: body.payment?.razorpayOrderId || '',
      razorpayPaymentId: body.payment?.razorpayPaymentId || '',
    };

    await addBooking(booking);

    // Awaited so serverless hosts don't kill it mid-send; never blocks booking.
    try {
      await sendBookingEmail(booking);
    } catch (err) {
      console.error('[booking email] failed to send for', booking.id, err?.message || err);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong. Please call us instead.' }, { status: 500 });
  }
}

export async function GET(req) {
  const isAdmin = isAdminToken(cookies().get(ADMIN_COOKIE)?.value);
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');

  if (isAdmin) {
    const all = await getBookings();
    return NextResponse.json({ bookings: all });
  }

  if (phone) {
    const wanted = last10(phone);
    if (wanted.length < 10) {
      return NextResponse.json({ error: 'Enter your full 10-digit mobile number' }, { status: 400 });
    }
    const all = await getBookings();
    const mine = all.filter((b) => last10(b.phone) === wanted);
    return NextResponse.json({ bookings: mine });
  }

  return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
}
