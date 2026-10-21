// Leads store — website enquiries and WhatsApp contacts.
//
// Backed by Neon (serverless Postgres) when DATABASE_URL is set; otherwise
// falls back to an in-memory list so the site still runs locally without a
// database. See lib/neon.js.

import { getSql, hasNeon, ensureSchema } from './neon';

export const LEAD_STATUSES = ['New', 'Contacted', 'Converted', 'Closed'];

// In-memory fallback (used only when Neon isn't configured).
let memLeads = [];
const memReplies = new Map();

export function makeLeadId() {
  const d = new Date();
  const stamp = d.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LEAD-${stamp}-${rand}`;
}

/** Any Indian number format → 91XXXXXXXXXX (what WhatsApp expects), or null. */
export function normalizePhone(input) {
  let digits = String(input || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `91${digits}` : null;
}

function rowToLead(row) {
  return { ...row.data, status: row.status };
}

export async function getLeads() {
  if (!hasNeon) return memLeads;

  const sql = getSql();
  await ensureSchema();
  const rows = await sql`SELECT data, status FROM leads ORDER BY created_at DESC LIMIT 1000`;
  return rows.map(rowToLead);
}

export async function addLead(lead) {
  if (!hasNeon) {
    memLeads.unshift(lead);
    return lead;
  }

  const sql = getSql();
  await ensureSchema();
  await sql`
    INSERT INTO leads (id, created_at, status, phone, data)
    VALUES (
      ${lead.id},
      ${lead.createdAt},
      ${lead.status || 'New'},
      ${lead.phone || ''},
      ${JSON.stringify(lead)}::jsonb
    )
    ON CONFLICT (id) DO NOTHING
  `;
  return lead;
}

/** Most recent lead for a phone number (91XXXXXXXXXX), or null. */
export async function findLeadByPhone(phone) {
  if (!hasNeon) return memLeads.find((l) => l.phone === phone) || null;

  const sql = getSql();
  await ensureSchema();
  const rows = await sql`
    SELECT data, status FROM leads WHERE phone = ${phone} ORDER BY created_at DESC LIMIT 1
  `;
  return rows.length ? rowToLead(rows[0]) : null;
}

/** Merges extra fields into a lead's data (e.g. WhatsApp delivery result). */
export async function updateLeadData(id, patch) {
  if (!hasNeon) {
    const lead = memLeads.find((l) => l.id === id);
    if (lead) Object.assign(lead, patch);
    return lead || null;
  }
  const sql = getSql();
  await ensureSchema();
  await sql`UPDATE leads SET data = data || ${JSON.stringify(patch)}::jsonb WHERE id = ${id}`;
}

export async function updateLeadStatus(id, status) {
  const now = new Date().toISOString();

  if (!hasNeon) {
    const lead = memLeads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    lead.updatedAt = now;
    return lead;
  }

  const sql = getSql();
  await ensureSchema();
  const rows = await sql`
    UPDATE leads
    SET status = ${status},
        updated_at = now(),
        data = jsonb_set(data, '{updatedAt}', to_jsonb(${now}::text))
    WHERE id = ${id}
    RETURNING data, status
  `;
  return rows.length ? rowToLead(rows[0]) : null;
}

/**
 * Records that we're auto-replying to `phone` now. Returns false if we already
 * replied within `withinHours`, so a conversation only gets one greeting.
 */
export async function claimAutoReply(phone, name, withinHours = 12) {
  const cutoff = Date.now() - withinHours * 3600 * 1000;

  if (!hasNeon) {
    if ((memReplies.get(phone) || 0) > cutoff) return false;
    memReplies.set(phone, Date.now());
    return true;
  }

  const sql = getSql();
  await ensureSchema();
  const rows = await sql`
    INSERT INTO wa_contacts (phone, name, last_reply_at)
    VALUES (${phone}, ${name || null}, now())
    ON CONFLICT (phone) DO UPDATE
      SET last_reply_at = now(),
          name = COALESCE(EXCLUDED.name, wa_contacts.name)
      WHERE wa_contacts.last_reply_at IS NULL
         OR wa_contacts.last_reply_at < ${new Date(cutoff).toISOString()}
    RETURNING phone
  `;
  return rows.length > 0;
}
