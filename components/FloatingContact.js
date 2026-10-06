'use client';

// WhatsApp · Call · Email — always one tap away.
//  Desktop: floating button stack (bottom-right) + back-to-top.
//  Mobile:  fixed bottom action bar (Call · WhatsApp · Email · Book).

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, CalendarCheck, Mail, Phone } from 'lucide-react';
import { telLink, mailLink, waLink } from '@/lib/site';

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.696 4.61 1.897 6.478L4 29l7.72-1.865A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.6a9.55 9.55 0 0 1-4.87-1.334l-.35-.207-4.583 1.107 1.127-4.47-.228-.365A9.56 9.56 0 1 1 25.6 15c0 5.302-4.298 9.6-9.6 9.6zm5.24-7.146c-.287-.144-1.697-.837-1.96-.933-.263-.096-.454-.144-.646.144-.192.287-.742.933-.91 1.125-.168.192-.335.216-.622.072-.287-.144-1.212-.447-2.31-1.426-.854-.762-1.43-1.703-1.598-1.99-.168-.287-.018-.442.126-.585.13-.13.288-.336.431-.504.144-.168.192-.287.288-.479.096-.192.048-.36-.024-.504-.072-.144-.646-1.558-.885-2.134-.233-.56-.47-.484-.646-.493l-.55-.01c-.192 0-.504.072-.767.36-.263.287-1.005.982-1.005 2.396s1.03 2.78 1.174 2.972c.144.192 2.027 3.096 4.912 4.34.686.296 1.221.473 1.638.605.688.219 1.314.188 1.81.114.552-.082 1.697-.694 1.937-1.364.24-.67.24-1.244.168-1.364-.072-.12-.263-.192-.55-.336z" />
    </svg>
  );
}

export { WhatsAppIcon };

export default function FloatingContact() {
  const pathname = usePathname() || '';
  const [showTop, setShowTop] = useState(false);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  const items = [
    { id: 'wa', label: 'WhatsApp us', href: waLink(), external: true, cls: 'bg-[#25D366] text-white', icon: <WhatsAppIcon className="h-6 w-6" /> },
    { id: 'call', label: 'Call now', href: telLink, cls: 'bg-sky text-white', icon: <Phone size={21} /> },
    { id: 'mail', label: 'Email us', href: mailLink(), cls: 'bg-brand text-white', icon: <Mail size={21} /> },
  ];

  return (
    <>
      {/* Desktop floating stack */}
      <div className="fixed bottom-6 right-6 z-[60] hidden flex-col items-end gap-3 lg:flex">
        <AnimatePresence>
          {showTop && (
            <motion.button
              key="top"
              type="button"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-y-0.5"
            >
              <ArrowUp size={19} />
            </motion.button>
          )}
        </AnimatePresence>

        {items.map((it, i) => (
          <motion.a
            key={it.id}
            href={it.href}
            target={it.external ? '_blank' : undefined}
            rel={it.external ? 'noreferrer' : undefined}
            aria-label={it.label}
            onMouseEnter={() => setHover(it.id)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 260, damping: 22 }}
            className="relative flex items-center"
          >
            <AnimatePresence>
              {hover === it.id && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-[64px] whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white shadow-soft"
                >
                  {it.label}
                </motion.span>
              )}
            </AnimatePresence>
            <span className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-lift transition hover:scale-105 ${it.cls}`}>
              {it.id === 'wa' && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />}
              <span className="relative">{it.icon}</span>
            </span>
          </motion.a>
        ))}
      </div>

      {/* Mobile bottom action bar */}
      <nav
        aria-label="Quick contact"
        className="glass-light fixed inset-x-0 bottom-0 z-[60] grid grid-cols-4 gap-1 border-t border-cream-line px-2 pt-2 pb-safe shadow-[0_-10px_30px_-12px_rgba(15,42,61,0.25)] lg:hidden"
      >
        <a href={telLink} className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-bold text-sky-deep">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky text-white"><Phone size={17} /></span>
          Call
        </a>
        <a href={waLink()} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-bold text-[#128C4B]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon className="h-5 w-5" /></span>
          WhatsApp
        </a>
        <a href={mailLink()} className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-bold text-brand-dark">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-white"><Mail size={17} /></span>
          Email
        </a>
        <Link href="/#book" className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-brand"><CalendarCheck size={17} /></span>
          Book
        </Link>
      </nav>
      {/* spacer so page content isn't hidden behind the mobile bar */}
      <div className="h-[76px] lg:hidden" aria-hidden="true" />
    </>
  );
}
