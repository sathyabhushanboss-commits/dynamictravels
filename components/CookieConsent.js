'use client';

// Cookie banner. "Accept all" enables the remember-me cookies in
// lib/cookies.js (last search, contact details for faster booking, recent
// booking IDs). "Essential only" stores just the choice itself.
// Re-open any time by dispatching:  window.dispatchEvent(new Event('dt-open-cookies'))

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { getConsent, setConsent } from '@/lib/cookies';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!getConsent()) setShow(true);
    }, 1800);
    const reopen = () => setShow(true);
    window.addEventListener('dt-open-cookies', reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener('dt-open-cookies', reopen);
    };
  }, []);

  function choose(value) {
    setConsent(value);
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-[88px] z-[75] mx-auto max-w-xl rounded-3xl border border-cream-line bg-white p-5 shadow-lift sm:inset-x-auto sm:left-6 sm:bottom-6 lg:bottom-6"
        >
          <button
            type="button"
            onClick={() => choose('essential')}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-1.5 text-ink/40 hover:bg-cream hover:text-ink"
          >
            <X size={16} />
          </button>
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand">
              <Cookie size={22} />
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink">We remember your trips 🍪</p>
              <p className="mt-1 text-[13px] leading-6 text-ink-soft">
                With your permission we save your last search and contact details on this device, so your next booking takes
                seconds. Nothing is shared with advertisers. <Link href="/privacy" className="font-semibold text-sky-deep underline">Privacy policy</Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => choose('all')}
                  className="btn-shine rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-brand hover:bg-brand-dark"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => choose('essential')}
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink hover:bg-cream"
                >
                  Essential only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
