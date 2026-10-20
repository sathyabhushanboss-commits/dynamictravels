// Signed session cookies for the customer and admin portals.
//
// A token is base64url(JSON payload) + "." + HMAC-SHA256 signature, so it
// can't be forged or edited without the server secret, and it carries its own
// expiry. Verification is synchronous (no database round trip).
//
// Secret: SESSION_SECRET, else ADMIN_SESSION_SECRET, else ADMIN_PASSWORD.
// Changing it logs everyone out.

import crypto from 'crypto';

export const USER_COOKIE = 'dt_user';
export const ADMIN_COOKIE = 'ntt_admin';

export const USER_SESSION_DAYS = 30;
export const ADMIN_SESSION_HOURS = 8;

function secret() {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'admin123'
  );
}

const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');

/** payload: { kind, sub, ... } — `exp` (ms) is added from ttlMs. */
export function signToken(payload, ttlMs) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + ttlMs })).toString('base64url');
  return `${body}.${sign(body)}`;
}

/** Returns the payload if the signature is valid, not expired and of `kind`. */
export function verifyToken(token, kind) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(body));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.kind !== kind || !(payload.exp > Date.now())) return null;
    return payload;
  } catch {
    return null;
  }
}

export function cookieOptions(maxAgeSeconds) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeSeconds,
    path: '/',
  };
}

export const clientIp = (req) => (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';

/** Customer session from the cookie store (next/headers cookies()). */
export function getUserSession(cookieStore) {
  return verifyToken(cookieStore.get(USER_COOKIE)?.value, 'user');
}

export function getAdminSession(cookieStore) {
  return verifyToken(cookieStore.get(ADMIN_COOKIE)?.value, 'admin');
}
