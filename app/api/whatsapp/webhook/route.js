// Meta WhatsApp Cloud API webhook.
//
// In Meta Developer dashboard → WhatsApp → Configuration → Webhook:
//   Callback URL:  https://<your-domain>/api/whatsapp/webhook
//   Verify token:  the same value as WHATSAPP_VERIFY_TOKEN
//   Subscribe to:  messages
//
// When someone messages the business number we save them as a lead (if new)
// and send one auto-reply greeting per conversation.

import { NextResponse } from 'next/server';
import { addLead, claimAutoReply, findLeadByPhone, makeLeadId } from '@/lib/leads';
import { sendAutoReply, verifySignature } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

// Meta calls this once to verify the webhook URL.
export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (token && p.get('hub.mode') === 'subscribe' && p.get('hub.verify_token') === token) {
    return new Response(p.get('hub.challenge') || '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req) {
  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new Response('Invalid signature', { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true });
  }

  // Always answer 200 quickly — Meta retries on errors.
  try {
    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        const contacts = value.contacts || [];

        for (const msg of value.messages || []) {
          const phone = msg.from; // already 91XXXXXXXXXX
          const profileName = contacts.find((c) => c.wa_id === phone)?.profile?.name || '';

          let lead = await findLeadByPhone(phone);
          if (!lead) {
            lead = {
              id: makeLeadId(),
              createdAt: new Date().toISOString(),
              status: 'New',
              name: profileName || 'WhatsApp user',
              phone,
              email: '',
              tripType: '',
              source: 'whatsapp-inbound',
              page: '',
              firstMessage: msg.text?.body?.slice(0, 500) || `[${msg.type}]`,
            };
            await addLead(lead);
          }

          const name = lead.name !== 'WhatsApp user' ? lead.name : profileName;
          if (await claimAutoReply(phone, name)) {
            await sendAutoReply({ phone, name });
          }
        }
      }
    }
  } catch (err) {
    console.error('[whatsapp] webhook error', err?.message || err);
  }

  return NextResponse.json({ ok: true });
}
