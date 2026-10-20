// WhatsApp Business Cloud API (Meta).
//
// Two things use this:
//  1. New website lead → we send the customer an approved template message
//     ("Hello {{1}}, are you looking for travel?…"). Meta only lets a business
//     start a conversation with a pre-approved template.
//  2. Customer messages our number → the webhook (app/api/whatsapp/webhook)
//     replies with a greeting. Inside that 24-hour window a plain text reply
//     is allowed, no template needed.
//
// If WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID aren't set, every call here is
// skipped and the site works exactly as before. Setup steps: .env.example.

import crypto from 'crypto';
import { SITE } from './site';

const {
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_API_VERSION = 'v23.0',
  WHATSAPP_TEMPLATE_NAME,
  WHATSAPP_TEMPLATE_LANG = 'en',
  WHATSAPP_APP_SECRET,
} = process.env;

export const hasWhatsAppApi = Boolean(WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID);

async function send(payload) {
  if (!hasWhatsAppApi) return { skipped: true };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messaging_product: 'whatsapp', ...payload }),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[whatsapp] send failed:', data?.error?.message || res.status);
      return { error: data?.error?.message || `HTTP ${res.status}` };
    }
    return { sent: true, id: data?.messages?.[0]?.id };
  } catch (err) {
    console.error('[whatsapp] send failed:', err.message);
    return { error: err.message };
  }
}

const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || 'there';

/** Business-initiated greeting to a new lead (needs an approved template). */
export function sendLeadGreeting({ phone, name }) {
  if (!WHATSAPP_TEMPLATE_NAME) return Promise.resolve({ skipped: true });
  return send({
    to: phone,
    type: 'template',
    template: {
      name: WHATSAPP_TEMPLATE_NAME,
      language: { code: WHATSAPP_TEMPLATE_LANG },
      components: [{ type: 'body', parameters: [{ type: 'text', text: firstName(name) }] }],
    },
  });
}

/** Auto-reply when a customer messages us first. */
export function sendAutoReply({ phone, name }) {
  const text = [
    `Hello ${firstName(name)}! 👋`,
    `Welcome to *${SITE.name}* — thank you for reaching out.`,
    '',
    'Are you looking for travelling? To share the best fare, please send us:',
    '1️⃣ Pickup location',
    '2️⃣ Destination',
    '3️⃣ Travel date & time',
    '4️⃣ Number of passengers',
    '',
    'Our travel expert will reply shortly. 🚗',
    `📞 ${SITE.phoneDisplay} (24×7)`,
    `🌐 Live fares: ${SITE.url}/#book`,
  ].join('\n');

  return send({ to: phone, type: 'text', text: { preview_url: false, body: text } });
}

/** Checks Meta's X-Hub-Signature-256 header against the raw request body. */
export function verifySignature(rawBody, header) {
  if (!WHATSAPP_APP_SECRET) {
    console.warn('[whatsapp] WHATSAPP_APP_SECRET not set — webhook signature not verified');
    return true;
  }
  if (!header?.startsWith('sha256=')) return false;
  const expected = crypto.createHmac('sha256', WHATSAPP_APP_SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
