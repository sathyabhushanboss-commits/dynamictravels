"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Mail, Menu, MessageCircle, Phone, X, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE, telLink, mailLink, waLink } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/fleet", label: "Fleet" },
  { href: "/destinations", label: "Destinations" },
  { href: "/group-booking", label: "Group Travel" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* Top info bar (desktop) */}
      <div className="hidden bg-ink text-[13px] text-white/80 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <a href={telLink} className="flex items-center gap-2 transition hover:text-brand-light">
              <Phone size={14} /> {SITE.phoneDisplay}
            </a>
            <a href={mailLink()} className="flex items-center gap-2 transition hover:text-brand-light">
              <Mail size={14} /> {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-sky-light" /> ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-sky-light" /> 24/7 Bookings
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "glass-light shadow-soft" : "bg-cream/95 backdrop-blur"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          {/* Logo */}
          <Link href="/" aria-label="Dynamic Travels — Home" className="shrink-0">
            <img
              src="/images/web/dynamic-travels-logo.webp"
              alt="Dynamic Travels logo"
              width={543}
              height={100}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-9 sm:h-10" : "h-10 sm:h-12"}`}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[15px] font-semibold transition ${
                  isActive(l.href) ? "text-brand" : "text-ink/75 hover:text-ink"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-brand"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink}
              className="hidden items-center gap-2 rounded-full border border-sky/30 bg-sky-soft px-4 py-2.5 text-sm font-bold text-sky-deep transition hover:bg-sky hover:text-white md:inline-flex"
            >
              <Phone size={16} /> Call Now
            </a>
            <Link
              href="/#book"
              className="btn-shine hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-dark sm:inline-flex"
            >
              Book a Ride <ArrowRight size={16} />
            </Link>
            <a
              href={telLink}
              aria-label="Call Dynamic Travels"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-soft text-sky-deep md:hidden"
            >
              <Phone size={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 right-0 z-[90] flex w-[86%] max-w-sm flex-col bg-cream shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between border-b border-cream-line px-5 py-4">
                <img src="/images/web/dynamic-travels-logo.webp" alt="Dynamic Travels" className="h-9 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-soft"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {[...NAV_LINKS, { href: "/my-bookings", label: "My Bookings" }].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-semibold ${
                        isActive(l.href) ? "bg-brand-50 text-brand" : "text-ink hover:bg-white"
                      }`}
                    >
                      {l.label}
                      <ArrowRight size={16} className="opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-2.5 border-t border-cream-line p-4 pb-safe">
                <Link
                  href="/#book"
                  className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white shadow-brand"
                >
                  Book a Ride <ArrowRight size={17} />
                </Link>
                <div className="grid grid-cols-3 gap-2">
                  <a href={telLink} className="flex flex-col items-center gap-1 rounded-2xl bg-sky-soft py-3 text-xs font-bold text-sky-deep">
                    <Phone size={18} /> Call
                  </a>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-2xl bg-[#E8F9EF] py-3 text-xs font-bold text-[#128C4B]">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                  <a href={mailLink()} className="flex flex-col items-center gap-1 rounded-2xl bg-brand-50 py-3 text-xs font-bold text-brand-dark">
                    <Mail size={18} /> Email
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
