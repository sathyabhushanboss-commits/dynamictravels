'use client';

// Lead capture — two entry points, one form:
//  • Popup: opens once per visit, 30 seconds after the visitor lands.
//  • WhatsApp widget: opens when the floating / mobile-bar WhatsApp button is
//    tapped (FloatingContact dispatches the `dt-whatsapp` event).
//
// Submitting saves the lead (/api/leads → database + emails + Meta WhatsApp
// greeting) and opens WhatsApp with a personalised message from the visitor.
// Returning visitors who already shared their details go straight to WhatsApp.

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, Phone, ShieldCheck, User, X } from 'lucide-react';
import { SITE, telLink } from '@/lib/site';
import { getCustomer, saveCustomer } from '@/lib/cookies';
import { WhatsAppIcon, WHATSAPP_EVENT } from './FloatingContact';

const POPUP_DELAY_MS = 30_000;
const DONE_KEY = 'dt_lead_done';
const SHOWN_KEY = 'dt_lead_popup_shown';
// Don't interrupt checkout or the admin panel.
const QUIET_PATHS = ['/admin', '/booking', '/select-cars', '/my-bookings', '/login', '/account'];

const TRIPS = [
  { id: 'Airport transfer', label: 'Airport' },
  { id: 'Local city ride', label: 'Local' },
  { id: 'Outstation trip', label: 'Outstation' },
  { id: 'Group / bus travel', label: 'Group' },
  { id: 'Wedding / event', label: 'Event' },
];

const store = {
  get(area, key) {
    try {
      return window[area].getItem(key);
    } catch {
      return null;
    }
  },
  set(area, key, value) {
    try {
      window[area].setItem(key, value);
    } catch {
      /* private mode — fine */
    }
  },
};

const tenDigits = (v) => String(v || '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '').slice(0, 10);
const firstName = (n) => String(n || '').trim().split(/\s+/)[0];

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

function Field({ icon: Icon, prefix, ...props }) {
  return (
    <label className="flex items-center gap-2.5 rounded-2xl border border-cream-line bg-white px-4 py-3 transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
      <Icon size={17} className="shrink-0 text-ink-mute" />
      {prefix && <span className="text-sm font-semibold text-ink">{prefix}</span>}
      <input {...props} className="w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-mute/70" />
    </label>
  );
}

function LeadForm({ source, compact = false, autoFocus = false, onSuccess }) {
  const pathname = usePathname() || '/';
  const [form, setForm] = useState({ name: '', phone: '', email: '', tripType: '', company: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const c = getCustomer();
    if (c) setForm((f) => ({ ...f, name: c.name || '', phone: tenDigits(c.phone), email: c.email || '' }));
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: k === 'phone' ? tenDigits(e.target.value) : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError('');
    const name = form.name.trim();
    const email = form.email.trim();
    if (name.length < 2) return setError('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError('Please enter a valid 10-digit mobile number.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError('Please enter a valid email address.');

    // We message the customer from the business WhatsApp number (server-side,
    // Meta Cloud API) — the customer never has to open WhatsApp themselves.
    setSending(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, name, email, source, page: pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong — please call us.');
      saveCustomer({ name, phone: form.phone, email });
      store.set('localStorage', DONE_KEY, '1');
      onSuccess?.({ name, phone: form.phone, waSent: Boolean(data.whatsapp?.sent) });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className={compact ? 'space-y-2.5' : 'space-y-3'}>
      <Field icon={User} type="text" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} autoFocus={autoFocus} maxLength={80} required />
      <Field icon={Phone} prefix="+91" type="tel" name="phone" inputMode="numeric" autoComplete="tel-national" placeholder="Mobile number" value={form.phone} onChange={set('phone')} required />
      <Field icon={Mail} type="email" name="email" autoComplete="email" placeholder="Email (Gmail) — for your confirmation" value={form.email} onChange={set('email')} maxLength={120} />

      {/* Honeypot — hidden from people, bots fill it */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} className="hidden" aria-hidden="true" />

      {!compact && (
        <div className="flex flex-wrap gap-2 pt-1">
          {TRIPS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setForm((f) => ({ ...f, tripType: f.tripType === t.id ? '' : t.id }))}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                form.tripType === t.id ? 'border-brand bg-brand text-white' : 'border-cream-line bg-white text-ink-soft hover:border-brand/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5a] disabled:opacity-70"
      >
        {sending ? <Loader2 size={18} className="animate-spin" /> : <WhatsAppIcon className="h-5 w-5" />}
        Get details on WhatsApp
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-mute">
        <ShieldCheck size={13} className="text-sky-deep" /> Your details stay private. No spam, ever.
      </p>
    </form>
  );
}

function Success({ name, phone, waSent }) {
  return (
    <div className="py-4 text-center">
      <CheckCircle2 size={48} className="mx-auto text-[#25D366]" />
      <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">Thank you, {firstName(name)}!</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">
        {waSent ? (
          <>We&apos;ve just sent you a WhatsApp message on <strong className="text-ink">+91 {phone}</strong>. Reply there and our travel expert will plan your trip.</>
        ) : (
          <>Our travel expert will WhatsApp you on <strong className="text-ink">+91 {phone}</strong> shortly.</>
        )}
      </p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E8F9EF] px-4 py-2 text-xs font-bold text-[#128C4B]">
        <WhatsAppIcon className="h-4 w-4" /> Keep an eye on WhatsApp
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Popup + widget                                                      */
/* ------------------------------------------------------------------ */

export default function LeadCapture() {
  const pathname = usePathname() || '/';
  const [mode, setMode] = useState(null); // 'popup' | 'chat' | null
  const [done, setDone] = useState(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const close = useCallback(() => {
    setMode(null);
    setDone(null);
  }, []);

  // 30-second popup, once per visit, never after the visitor has shared details.
  useEffect(() => {
    if (QUIET_PATHS.some((p) => pathname.startsWith(p))) return;
    if (store.get('localStorage', DONE_KEY) || store.get('sessionStorage', SHOWN_KEY)) return;

    const t = setTimeout(() => {
      if (modeRef.current) return;
      store.set('sessionStorage', SHOWN_KEY, '1');
      setMode('popup');
    }, POPUP_DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  // WhatsApp buttons → returning visitors go straight to WhatsApp.
  useEffect(() => {
    const onWa = () => {
      setDone(null);
      setMode((m) => (m === 'chat' ? null : 'chat'));
    };
    window.addEventListener(WHATSAPP_EVENT, onWa);
    return () => window.removeEventListener(WHATSAPP_EVENT, onWa);
  }, []);

  useEffect(() => {
    if (!mode) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, close]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <AnimatePresence>
      {mode === 'popup' && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/70 p-3 backdrop-blur-md sm:items-center sm:p-5"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-[480px] overflow-y-auto rounded-[28px] bg-cream shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
            >
              <X size={18} />
            </button>

            <div className="h-1.5 w-full bg-brand-gradient" />
            <div className="p-6 sm:p-8">
              {done ? (
                <Success {...done} />
              ) : (
                <div className="text-center">
                  <img src="/images/logo.webp" alt={SITE.name} className="mx-auto h-auto w-[220px] max-w-[70%] object-contain sm:w-[260px]" />
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark">Free trip planning · 24×7</p>
                  <h2 id="lead-title" className="mt-2 font-display text-[1.7rem] font-extrabold leading-tight text-ink sm:text-3xl">
                    Get the best fare in minutes.
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">Share your details — we'll message you on WhatsApp.</p>
                  <div className="mt-6 text-left">
                    <LeadForm source="popup" onSuccess={setDone} />
                  </div>
                  <a href={telLink} className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand-dark">
                    <Phone size={15} /> Prefer to talk? Call {SITE.phoneDisplay}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {mode === 'chat' && (
        <motion.div
          key="chat"
          role="dialog"
          aria-modal="false"
          aria-label={`Chat with ${SITE.name} on WhatsApp`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="fixed inset-x-3 bottom-[88px] z-[70] origin-bottom-right overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] lg:inset-x-auto lg:bottom-6 lg:right-24 lg:w-[370px]"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4 text-white">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <img src="/images/logo.webp" alt="" className="h-full w-full object-contain p-1" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display font-bold">{SITE.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/75">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" /> Online · replies in minutes
              </p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white">
              <X size={19} />
            </button>
          </div>

          <div className="bg-[#ECE5DD] px-4 pb-4 pt-5">
            {done ? (
              <div className="rounded-2xl bg-white p-4">
                <Success {...done} />
              </div>
            ) : (
              <>
                <div className="relative mb-4 max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-ink shadow-sm">
                  Hello 👋 Are you looking for travelling? Share your details and we'll message you on WhatsApp right away.
                  <span className="mt-1 block text-right text-[10px] text-ink-mute">now</span>
                </div>
                <div className="rounded-2xl bg-cream/80 p-3">
                  <LeadForm source="whatsapp-widget" compact autoFocus onSuccess={setDone} />
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
