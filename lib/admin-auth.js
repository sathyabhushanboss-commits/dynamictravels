// Admin session token.
//
// The admin cookie is a signed, expiring session token (see lib/session.js)
// identifying which admin is logged in. Admins sign in at /admin with email +
// password + a one-time code (lib/otp.js); accounts live in the admin_users
// table (lib/auth-db.js).

import { ADMIN_COOKIE, ADMIN_SESSION_HOURS, signToken, verifyToken } from './session';

export { ADMIN_COOKIE };

export function adminToken(admin, sessionId) {
  return signToken(
    { kind: 'admin', sub: admin.id, role: admin.role, name: admin.name || admin.email, sid: sessionId },
    ADMIN_SESSION_HOURS * 3600 * 1000
  );
}

export function isAdminToken(value) {
  return Boolean(verifyToken(value, 'admin'));
}
