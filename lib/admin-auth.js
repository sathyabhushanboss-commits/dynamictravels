// Admin session token.
//
// The admin cookie used to hold the literal value "1", which meant anyone could
// set `ntt_admin=1` in their browser/devtools and get full admin access
// (bookings, customer phone numbers, rates). The cookie now holds an HMAC
// derived from a server-only secret, so it can't be forged.
//
// Set ADMIN_SESSION_SECRET in .env.local (any long random string). If it's not
// set, ADMIN_PASSWORD is used as the secret. Changing either logs everyone out.

import crypto from 'crypto';

export const ADMIN_COOKIE = 'ntt_admin';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'admin123';
}

export function adminToken() {
  return crypto.createHmac('sha256', secret()).update('ntt-admin-session-v1').digest('hex');
}

export function isAdminToken(value) {
  if (!value) return false;
  const a = Buffer.from(String(value));
  const b = Buffer.from(adminToken());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
