import { NextResponse } from 'next/server';
import { OtpError, parseTarget, verifyOtp } from '@/lib/otp';
import { newId, recordSession, upsertUserByTarget } from '@/lib/auth-db';
import { USER_COOKIE, USER_SESSION_DAYS, clientIp, cookieOptions, signToken } from '@/lib/session';

// Customer login, step 2: check the code, create the account if new, sign in.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const target = parseTarget(body.target);
  if (!target || !/^\d{6}$/.test(String(body.code || '').trim())) {
    return NextResponse.json({ error: 'Enter the 6-digit code.' }, { status: 400 });
  }

  try {
    await verifyOtp('user', target.value, body.code);
    const user = await upsertUserByTarget(target.type === 'phone' ? { phone: target.value } : { email: target.value });

    const sid = newId('SES');
    const ttl = USER_SESSION_DAYS * 86400 * 1000;
    await recordSession('user', {
      id: sid,
      subjectId: user.id,
      ip: clientIp(req),
      userAgent: req.headers.get('user-agent'),
      expiresAt: new Date(Date.now() + ttl).toISOString(),
    });

    const res = NextResponse.json({ ok: true, user, isNew: !user.name });
    res.cookies.set(USER_COOKIE, signToken({ kind: 'user', sub: user.id, sid }, ttl), cookieOptions(ttl / 1000));
    return res;
  } catch (err) {
    if (err instanceof OtpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error('[auth] otp verify failed', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
