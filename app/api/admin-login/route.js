import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/admin-auth';
import { startAdminSession } from '@/lib/admin-session';
import { checkPassword, findAdminForLogin } from '@/lib/auth-db';
import { OtpError, canDeliver, maskTarget, requestOtp } from '@/lib/otp';
import { clientIp, signToken } from '@/lib/session';

const CHALLENGE_MS = 10 * 60 * 1000;

// Where an admin's code goes: email first, then phone.
function otpTargetFor(admin) {
  if (canDeliver('email')) return { type: 'email', value: admin.email };
  if (admin.phone && canDeliver('phone')) return { type: 'phone', value: admin.phone };
  return null;
}

// Step 1: email + password. On success a code is sent and a short-lived
// challenge token is returned for step 2 (/api/admin-login/verify).
export async function POST(req) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });

  let admin;
  try {
    admin = await findAdminForLogin(email);
  } catch (err) {
    console.error('[admin-login]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  if (!admin || !checkPassword(password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
  }

  const target = otpTargetFor(admin);
  if (!target) {
    // No email/SMS delivery configured on this server: allow password-only so
    // the owner is never locked out, and say so loudly in the logs.
    console.warn(`[admin-login] OTP delivery not configured — ${admin.email} signed in with password only`);
    return startAdminSession(admin, req);
  }

  try {
    await requestOtp('admin', target, clientIp(req));
  } catch (err) {
    const status = err instanceof OtpError ? err.status : 500;
    return NextResponse.json({ error: err.message }, { status });
  }

  const challenge = signToken({ kind: 'admin-otp', sub: admin.id, t: target.value }, CHALLENGE_MS);
  return NextResponse.json({ otpRequired: true, challenge, sentTo: maskTarget(target) });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
