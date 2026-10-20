// One-time passwords for customer and admin login.
//
// Codes are 6 digits, valid for 5 minutes, 5 wrong tries max, stored hashed.
// Limits: one code per 30 seconds and 5 per hour per phone/email.
//
// Delivery (whichever is configured — see .env.example):
//   email  → SMTP (Gmail)                              SMTP_HOST/USER/PASS
//   phone  → SMS via Fast2SMS OTP route                FAST2SMS_API_KEY
//          → or WhatsApp authentication template      WHATSAPP_OTP_TEMPLATE (+ WhatsApp API keys)
// In development with nothing configured, the code is printed in the server
// console so you can test.

import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { bumpOtpAttempts, consumeOtp, insertOtp, latestOpenOtp, otpRecentCount } from './auth-db';
import { SITE } from './site';

const TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const isDev = process.env.NODE_ENV !== 'production';

const hashCode = (portal, target, code) =>
  crypto
    .createHmac('sha256', process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'admin123')
    .update(`${portal}:${target}:${code}`)
    .digest('hex');

/* ------------------------------ targets -------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "98765 43210" / "+91…" / "a@b.com" → { type, value } or null. */
export function parseTarget(input) {
  const raw = String(input || '').trim();
  if (raw.includes('@')) {
    const email = raw.toLowerCase();
    return EMAIL_RE.test(email) ? { type: 'email', value: email } : null;
  }
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? { type: 'phone', value: `91${digits}` } : null;
}

export function maskTarget({ type, value }) {
  if (type === 'phone') return `+91 ••••• ${value.slice(-5)}`;
  const [u, d] = value.split('@');
  return `${u.slice(0, 2)}${'•'.repeat(Math.max(1, u.length - 2))}@${d}`;
}

/* ------------------------------ channels ------------------------------- */

const smtpReady = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const smsReady = () => Boolean(process.env.FAST2SMS_API_KEY);
const waReady = () =>
  Boolean(process.env.WHATSAPP_OTP_TEMPLATE && process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);

export function channels() {
  return {
    email: smtpReady() || isDev,
    phone: smsReady() || waReady() || isDev,
    devConsole: isDev && !(smtpReady() && (smsReady() || waReady())),
  };
}

export const canDeliver = (type) => channels()[type];

async function sendEmail(to, code, portal) {
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const who = portal === 'admin' ? 'admin panel' : 'account';
  await t.sendMail({
    from: `"${SITE.name}" <${process.env.SMTP_USER}>`,
    to,
    subject: `${code} is your ${SITE.name} login code`,
    text: `Your ${SITE.name} ${who} login code is ${code}. It expires in 5 minutes. Never share this code with anyone.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:460px;margin:auto;padding:28px;border:1px solid #EFE2CF;border-radius:16px;background:#fff">
<p style="margin:0;color:#C2600B;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold">${SITE.name}</p>
<h2 style="margin:10px 0 6px;color:#0F2A3D">Your login code</h2>
<p style="margin:0 0 18px;color:#3d4f5c">Use this code to sign in to your ${who}. It expires in 5 minutes.</p>
<p style="margin:0 0 18px;font-size:34px;font-weight:bold;letter-spacing:10px;color:#0F2A3D;background:#FFF8EE;border-radius:12px;padding:14px;text-align:center">${code}</p>
<p style="margin:0;color:#7a8791;font-size:12px">Didn't request this? You can ignore this email. Never share this code with anyone.</p></div>`,
  });
}

async function sendSms(phone, code) {
  const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: { authorization: process.env.FAST2SMS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ route: 'otp', variables_values: code, numbers: phone.slice(2) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.return === false) throw new Error(data.message || `SMS failed (${res.status})`);
}

async function sendWhatsApp(phone, code) {
  const res = await fetch(
    `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION || 'v23.0'}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: process.env.WHATSAPP_OTP_TEMPLATE,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'en' },
          // Authentication templates: code in the body + the copy-code button.
          components: [
            { type: 'body', parameters: [{ type: 'text', text: code }] },
            { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: code }] },
          ],
        },
      }),
    }
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error?.message || `WhatsApp failed (${res.status})`);
  }
}

async function deliver(target, code, portal) {
  if (target.type === 'email' && smtpReady()) return sendEmail(target.value, code, portal);
  if (target.type === 'phone' && smsReady()) return sendSms(target.value, code);
  if (target.type === 'phone' && waReady()) return sendWhatsApp(target.value, code);
  if (isDev) {
    console.log(`\n[otp] ${portal} login code for ${target.value}: ${code}  (dev only — configure SMTP / SMS to send it)\n`);
    return;
  }
  throw new Error('No OTP delivery is configured');
}

/* ---------------------------- request / verify ------------------------- */

export class OtpError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function requestOtp(portal, target, ip) {
  if (!canDeliver(target.type)) {
    throw new OtpError(
      target.type === 'email' ? 'Email login is not available right now — use your mobile number.' : 'Mobile login is not available right now — use your email.',
      503
    );
  }
  const { count, last } = await otpRecentCount(portal, target.value, 60);
  if (last && Date.now() - last.getTime() < 30_000) throw new OtpError('Please wait 30 seconds before requesting another code.', 429);
  if (count >= 5) throw new OtpError('Too many codes requested. Please try again in an hour.', 429);

  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  await insertOtp({
    portal,
    target: target.value,
    codeHash: hashCode(portal, target.value, code),
    expiresAt: new Date(Date.now() + TTL_MS).toISOString(),
    ip,
  });
  try {
    await deliver(target, code, portal);
  } catch (err) {
    console.error('[otp] delivery failed:', err.message);
    throw new OtpError('Could not send the code. Please try again or use another method.', 502);
  }
}

/** Throws OtpError unless `code` is the current valid code for target. */
export async function verifyOtp(portal, targetValue, code) {
  const row = await latestOpenOtp(portal, targetValue);
  if (!row || new Date(row.expires_at).getTime() < Date.now()) throw new OtpError('This code has expired. Please request a new one.');
  if (row.attempts >= MAX_ATTEMPTS) throw new OtpError('Too many wrong attempts. Please request a new code.', 429);

  const expected = Buffer.from(row.code_hash);
  const given = Buffer.from(hashCode(portal, targetValue, String(code || '').trim()));
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) {
    await bumpOtpAttempts(row.id);
    const left = MAX_ATTEMPTS - row.attempts - 1;
    throw new OtpError(left > 0 ? `Incorrect code. ${left} attempt${left > 1 ? 's' : ''} left.` : 'Too many wrong attempts. Please request a new code.');
  }
  if (!(await consumeOtp(row.id))) throw new OtpError('This code was already used. Please request a new one.');
}
