import { NextResponse } from 'next/server';
import { adminToken, ADMIN_COOKIE } from './admin-auth';
import { newId, recordSession, touchAdminLogin } from './auth-db';
import { ADMIN_SESSION_HOURS, clientIp, cookieOptions } from './session';

// Signs an admin in: records the session and sets the admin cookie.
export async function startAdminSession(admin, req) {
  const sid = newId('ASE');
  const ttl = ADMIN_SESSION_HOURS * 3600 * 1000;
  await recordSession('admin', {
    id: sid,
    subjectId: admin.id,
    ip: clientIp(req),
    userAgent: req.headers.get('user-agent'),
    expiresAt: new Date(Date.now() + ttl).toISOString(),
  });
  await touchAdminLogin(admin.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(admin, sid), cookieOptions(ttl / 1000));
  return res;
}
