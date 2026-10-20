// Accounts database — customers, admins, sessions and OTP codes.
//
// Kept apart from bookings/rates: set AUTH_DATABASE_URL to use a separate Neon
// database for accounts; if it isn't set, the same DATABASE_URL is used (in
// separate tables). Tables are created automatically on first use.
//
// The first time it runs, an "owner" admin is created from ADMIN_EMAIL /
// ADMIN_PHONE / ADMIN_PASSWORD (falling back to the business email/phone).

import crypto from 'crypto';
import { neon } from '@neondatabase/serverless';
import { SITE } from './site';

const URL = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || '';
export const hasAuthDb = Boolean(URL);

let _sql = null;
function db() {
  if (!hasAuthDb) throw new Error('Login needs a database — set AUTH_DATABASE_URL or DATABASE_URL.');
  if (!_sql) _sql = neon(URL);
  return _sql;
}

/* ------------------------------ passwords ------------------------------ */

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function checkPassword(password, stored) {
  const [scheme, salt, hash] = String(stored || '').split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const a = crypto.scryptSync(String(password), salt, 64);
  const b = Buffer.from(hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* -------------------------------- schema -------------------------------- */

let _ready = null;
export function ensureAuthSchema() {
  if (_ready) return _ready;
  const sql = db();
  _ready = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS app_users (
        id            TEXT PRIMARY KEY,
        phone         TEXT UNIQUE,
        email         TEXT UNIQUE,
        name          TEXT NOT NULL DEFAULT '',
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
        last_login_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id            TEXT PRIMARY KEY,
        email         TEXT UNIQUE NOT NULL,
        phone         TEXT,
        name          TEXT NOT NULL DEFAULT '',
        role          TEXT NOT NULL DEFAULT 'staff',
        password_hash TEXT NOT NULL,
        active        BOOLEAN NOT NULL DEFAULT true,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
        last_login_at TIMESTAMPTZ
      )
    `;
    // One row per code sent. Codes are stored hashed, never in plain text.
    await sql`
      CREATE TABLE IF NOT EXISTS otp_codes (
        id          BIGSERIAL PRIMARY KEY,
        portal      TEXT NOT NULL,
        target      TEXT NOT NULL,
        code_hash   TEXT NOT NULL,
        attempts    INT NOT NULL DEFAULT 0,
        expires_at  TIMESTAMPTZ NOT NULL,
        consumed_at TIMESTAMPTZ,
        ip          TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS otp_codes_target_idx ON otp_codes (portal, target, created_at DESC)`;
    // Login history (sessions are signed cookies; these rows are the audit trail).
    await sql`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id         TEXT PRIMARY KEY,
        user_id    TEXT NOT NULL,
        ip         TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        expires_at TIMESTAMPTZ NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id         TEXT PRIMARY KEY,
        admin_id   TEXT NOT NULL,
        ip         TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        expires_at TIMESTAMPTZ NOT NULL
      )
    `;

    const [{ count }] = await sql`SELECT count(*)::int AS count FROM admin_users`;
    if (count === 0) {
      const email = (process.env.ADMIN_EMAIL || SITE.email).trim().toLowerCase();
      const phone = (process.env.ADMIN_PHONE || SITE.phone).replace(/\D/g, '').slice(-10);
      await sql`
        INSERT INTO admin_users (id, email, phone, name, role, password_hash)
        VALUES (${newId('ADM')}, ${email}, ${phone ? `91${phone}` : null}, 'Owner', 'owner',
                ${hashPassword(process.env.ADMIN_PASSWORD || 'admin123')})
        ON CONFLICT DO NOTHING
      `;
      console.log(`[auth] created owner admin ${email}`);
    }
  })().catch((err) => {
    _ready = null;
    throw err;
  });
  return _ready;
}

export function newId(prefix) {
  return `${prefix}-${crypto.randomBytes(9).toString('base64url')}`;
}

async function q() {
  await ensureAuthSchema();
  return db();
}

/* -------------------------------- users --------------------------------- */

const userRow = (r) =>
  r && { id: r.id, phone: r.phone || '', email: r.email || '', name: r.name || '', createdAt: r.created_at };

export async function getUser(id) {
  const sql = await q();
  const [r] = await sql`SELECT * FROM app_users WHERE id = ${id}`;
  return userRow(r);
}

/** Finds the customer for a verified phone/email, creating one if new. */
export async function upsertUserByTarget({ phone, email }) {
  const sql = await q();
  const [existing] = phone
    ? await sql`SELECT * FROM app_users WHERE phone = ${phone}`
    : await sql`SELECT * FROM app_users WHERE email = ${email}`;
  if (existing) {
    const [r] = await sql`UPDATE app_users SET last_login_at = now() WHERE id = ${existing.id} RETURNING *`;
    return userRow(r);
  }
  const [r] = await sql`
    INSERT INTO app_users (id, phone, email, last_login_at)
    VALUES (${newId('USR')}, ${phone || null}, ${email || null}, now())
    RETURNING *
  `;
  return userRow(r);
}

export async function updateUserProfile(id, { name, email }) {
  const sql = await q();
  const [r] = await sql`
    UPDATE app_users
    SET name = COALESCE(${name ?? null}, name),
        email = COALESCE(${email || null}, email)
    WHERE id = ${id}
    RETURNING *
  `;
  return userRow(r);
}

/* -------------------------------- admins -------------------------------- */

const adminRow = (r) =>
  r && {
    id: r.id,
    email: r.email,
    phone: r.phone || '',
    name: r.name || '',
    role: r.role,
    active: r.active,
    createdAt: r.created_at,
    lastLoginAt: r.last_login_at,
  };

export async function findAdminForLogin(email) {
  const sql = await q();
  const [r] = await sql`SELECT * FROM admin_users WHERE email = ${String(email).trim().toLowerCase()} AND active = true`;
  return r ? { ...adminRow(r), passwordHash: r.password_hash } : null;
}

export async function getAdmin(id) {
  const sql = await q();
  const [r] = await sql`SELECT * FROM admin_users WHERE id = ${id}`;
  return adminRow(r);
}

export async function listAdmins() {
  const sql = await q();
  const rows = await sql`SELECT * FROM admin_users ORDER BY created_at`;
  return rows.map(adminRow);
}

export async function createAdmin({ email, phone, name, role, password }) {
  const sql = await q();
  const [r] = await sql`
    INSERT INTO admin_users (id, email, phone, name, role, password_hash)
    VALUES (${newId('ADM')}, ${email}, ${phone || null}, ${name || ''}, ${role}, ${hashPassword(password)})
    RETURNING *
  `;
  return adminRow(r);
}

export async function updateAdmin(id, { active, password, role }) {
  const sql = await q();
  const [r] = await sql`
    UPDATE admin_users
    SET active = COALESCE(${typeof active === 'boolean' ? active : null}, active),
        role = COALESCE(${role || null}, role),
        password_hash = COALESCE(${password ? hashPassword(password) : null}, password_hash)
    WHERE id = ${id}
    RETURNING *
  `;
  return adminRow(r);
}

export async function touchAdminLogin(id) {
  const sql = await q();
  await sql`UPDATE admin_users SET last_login_at = now() WHERE id = ${id}`;
}

/* ------------------------------- sessions ------------------------------- */

export async function recordSession(kind, { id, subjectId, ip, userAgent, expiresAt }) {
  const sql = await q();
  const ua = String(userAgent || '').slice(0, 300);
  if (kind === 'admin') {
    await sql`INSERT INTO admin_sessions (id, admin_id, ip, user_agent, expires_at) VALUES (${id}, ${subjectId}, ${ip}, ${ua}, ${expiresAt})`;
  } else {
    await sql`INSERT INTO user_sessions (id, user_id, ip, user_agent, expires_at) VALUES (${id}, ${subjectId}, ${ip}, ${ua}, ${expiresAt})`;
  }
}

/* --------------------------------- OTP ---------------------------------- */

export async function otpRecentCount(portal, target, minutes) {
  const sql = await q();
  const since = new Date(Date.now() - minutes * 60 * 1000).toISOString();
  const [r] = await sql`
    SELECT count(*)::int AS n, max(created_at) AS last
    FROM otp_codes WHERE portal = ${portal} AND target = ${target} AND created_at > ${since}
  `;
  return { count: r.n, last: r.last ? new Date(r.last) : null };
}

export async function insertOtp({ portal, target, codeHash, expiresAt, ip }) {
  const sql = await q();
  // A new code replaces any earlier unused one.
  await sql`UPDATE otp_codes SET consumed_at = now() WHERE portal = ${portal} AND target = ${target} AND consumed_at IS NULL`;
  await sql`
    INSERT INTO otp_codes (portal, target, code_hash, expires_at, ip)
    VALUES (${portal}, ${target}, ${codeHash}, ${expiresAt}, ${ip})
  `;
}

export async function latestOpenOtp(portal, target) {
  const sql = await q();
  const [r] = await sql`
    SELECT * FROM otp_codes
    WHERE portal = ${portal} AND target = ${target} AND consumed_at IS NULL
    ORDER BY created_at DESC LIMIT 1
  `;
  return r || null;
}

export async function bumpOtpAttempts(id) {
  const sql = await q();
  await sql`UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ${id}`;
}

export async function consumeOtp(id) {
  const sql = await q();
  const rows = await sql`UPDATE otp_codes SET consumed_at = now() WHERE id = ${id} AND consumed_at IS NULL RETURNING id`;
  return rows.length > 0;
}
