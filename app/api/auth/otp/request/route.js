import { NextResponse } from 'next/server';
import { OtpError, maskTarget, parseTarget, requestOtp } from '@/lib/otp';
import { clientIp } from '@/lib/session';

// Customer login, step 1: send a code to a mobile number or email.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const target = parseTarget(body.target);
  if (!target) {
    return NextResponse.json({ error: 'Enter a valid 10-digit mobile number or email address.' }, { status: 400 });
  }
  try {
    await requestOtp('user', target, clientIp(req));
    return NextResponse.json({ ok: true, sentTo: maskTarget(target), type: target.type });
  } catch (err) {
    if (err instanceof OtpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error('[auth] otp request failed', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
