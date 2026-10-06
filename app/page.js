"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gem,
  Gift,
  Headphones,
  IndianRupee,
  Mail,
  MapPin,
  Mountain,
  Phone,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import TravelExpertPopup from "@/components/TravelExpertPopup";
import { Reveal, Stagger, StaggerItem, ParallaxImage, Parallax, CountUp } from "@/components/Motion";
import { WhatsAppIcon } from "@/components/FloatingContact";
import { SITE, telLink, mailLink, waLink } from "@/lib/site";
import { getCustomer, getRecentBookings } from "@/lib/cookies";
import { formatINR } from "@/lib/pricing";

/* =========================================================
   IMAGES — optimized WebP copies of the original photos
   (public/images/web/*.webp, ~95% smaller than the PNGs)
========================================================= */

const pic = (name) => ({
  src: `/images/web/${name}.webp`,
  srcSet: `/images/web/${name}-sm.webp 800w, /images/web/${name}.webp 1600w`,
});

const HERO_SLIDES = [
  { name: "1", place: "Mysore Palace", caption: "Heritage tours across Karnataka" },
  { name: "2", place: "Vidhana Soudha, Bengaluru", caption: "City rides & airport transfers" },
  { name: "3", place: "Weekend resort getaways", caption: "Innova Crysta & Hycross for families" },
  { name: "4", place: "Coastal Karnataka", caption: "Urbania & Tempo Travellers for groups" },
  { name: "5", place: "Premium arrivals", caption: "Luxury travel for weddings & events" },
];

const ROTATING = ["Airport Transfers", "Outstation Trips", "Tempo Travellers", "Group Tours", "Corporate Travel"];

/* =========================================================
   CONTENT
========================================================= */

const SERVICES = [
  { icon: Plane, title: "Airport Transfers", text: "On-time pickups & drops to Kempegowda International Airport with flight tracking.", trip: "airport", tag: "24/7" },
  { icon: Building2, title: "Local City Rides", text: "4, 8 & 12-hour packages for meetings, shopping and Bengaluru sightseeing.", trip: "local", tag: "Hourly" },
  { icon: Mountain, title: "Outstation Trips", text: "Round trips to Mysore, Coorg, Ooty, Chikmagalur and all of South India.", trip: "outstation", tag: "Popular" },
  { icon: Users, title: "Group & Bus Travel", text: "Tempo Travellers, Urbania, 21–50 seater buses for tours and pilgrimages.", href: "/group-booking", tag: "Groups" },
  { icon: Briefcase, title: "Corporate Travel", text: "Employee transport, client pickups and event logistics with GST invoices.", href: "/contact", tag: "B2B" },
  { icon: Gem, title: "Weddings & Events", text: "Decorated premium cars and guest shuttles that arrive in style.", href: "/contact", tag: "Premium" },
];

const FLEET = [
  { name: "Sedan", seats: 4, img: "sedan11", tag: "Swift Dzire · Etios", rate: "sedan" },
  { name: "Innova Crysta", seats: 7, img: "crysta11", tag: "Premium MPV", rate: "crysta" },
  { name: "Innova Hycross", seats: 7, img: "hybrid11", tag: "Hybrid comfort", rate: "innova_hycross_hybrid" },
  { name: "Toyota Innova", seats: 7, img: "innova11", tag: "Family favourite", rate: "suv" },
  { name: "Force Urbania", seats: 17, img: "urbania11", tag: "9 – 17 seater luxury", rate: "urbania_12_seater" },
  { name: "Tempo Traveller", seats: 20, img: "tt11", tag: "AC & Non-AC", rate: "tt_ac" },
  { name: "Mini Bus", seats: 33, img: "mini11", tag: "21 & 33 seater", rate: "mini_bus_33_ac" },
];

const WHY = [
  { icon: ShieldCheck, title: "ISO 9001:2015 Certified", text: "Audited quality systems for car rental services." },
  { icon: BadgeCheck, title: "Verified, Uniformed Drivers", text: "Experienced chauffeurs who know every route." },
  { icon: IndianRupee, title: "Transparent Fares", text: "Live price before you book. GST shown. No surprises." },
  { icon: Headphones, title: "24/7 Human Support", text: "Call or WhatsApp us any time — a real person answers." },
  { icon: Sparkles, title: "Spotless Vehicles", text: "Sanitised, well-maintained cars inspected before every trip." },
  { icon: CalendarCheck, title: "Flexible Payment", text: "Pay after the ride, pay 25% advance, or pay in full online." },
];

const STEPS = [
  { icon: Route, title: "Enter your trip", text: "Choose trip type, pickup, drop and date. Distance is calculated automatically." },
  { icon: Car, title: "Pick your vehicle", text: "Compare sedans, SUVs, Urbania and Tempo Travellers with live fares." },
  { icon: CalendarCheck, title: "Confirm & pay your way", text: "Pay later, 25% advance or full — instant confirmation on WhatsApp." },
  { icon: Star, title: "Enjoy the ride", text: "Driver details shared before pickup. Sit back — we handle the road." },
];

const DESTINATIONS = [
  { name: "Mysore", km: "145 km", img: "1", text: "Palace, Chamundi Hills & Brindavan Gardens" },
  { name: "Bengaluru City Tour", km: "Local", img: "2", text: "Vidhana Soudha, Lalbagh, Cubbon Park & more" },
  { name: "Coorg & Chikmagalur", km: "250 km", img: "3", text: "Coffee estates, waterfalls and misty hills" },
  { name: "Gokarna & Coastal Karnataka", km: "480 km", img: "4", text: "Beaches, temples and sunset drives" },
];

const MOMENTS = [
  { img: "2dd", alt: "Dynamic Travels team at a travel expo" },
  { img: "1dt", alt: "Dynamic Travels stall at Karnataka Tourism expo" },
  { img: "1dd", alt: "Dynamic Travels team at the Dubai travel pavilion" },
  { img: "3dd", alt: "Dynamic Travels receiving an industry award" },
  { img: "2dt", alt: "Dynamic Travels at Karnataka tourism stall" },
  { img: "4dt", alt: "Dynamic Travels founders at a tourism event" },
];

const FAQS = [
  { q: "How do I book a cab with Dynamic Travels?", a: "Use the booking form on this page — choose your trip type, enter pickup and drop, pick a date and select a vehicle. You can also call or WhatsApp us 24/7 and we'll book it for you." },
  { q: "Do you provide Bangalore airport taxi service at night?", a: "Yes. Airport pickups and drops to Kempegowda International Airport run 24 hours a day, 7 days a week, including early-morning and late-night flights." },
  { q: "Which vehicles can I rent?", a: "Sedans (Swift Dzire, Etios), Toyota Innova, Innova Crysta, Innova Hycross, Force Urbania (9–17 seater), Tempo Travellers (12–20 seater), mini buses (21 & 33 seater) and 50-seater coaches." },
  { q: "How is the fare calculated?", a: "Fares are based on distance and trip type — per-km rates for airport and outstation trips, fixed hourly packages for local rentals — plus 5% GST. Tolls, state permits and parking are extra as applicable. You see the full fare before you confirm." },
  { q: "Can I pay after the ride?", a: "Yes. Choose 'Pay after ride' and settle with the driver by cash or UPI. You can also lock your booking with a 25% advance or pay 100% online through Razorpay." },
  { q: "Do you arrange outstation and multi-day tours?", a: "Absolutely. We run round trips and multi-day tours from Bengaluru to Mysore, Coorg, Ooty, Wayanad, Chikmagalur, Hampi, Goa, Kerala, Tirupati and across South India." },
];

/* =========================================================
   HERO — crossfading slides + scroll parallax
========================================================= */

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [word, setWord] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    const w = setInterval(() => setWord((s) => (s + 1) % ROTATING.length), 2400);
    return () => {
      clearInterval(t);
      clearInterval(w);
    };
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <section ref={ref} className="relative isolate min-h-[92svh] overflow-hidden bg-ink lg:min-h-[94vh]">
      {/* Parallax background slides */}
      <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.name}
            {...pic(current.name)}
            sizes="100vw"
            alt={`Dynamic Travels — ${current.place}`}
            fetchPriority={slide === 0 ? "high" : "auto"}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: "easeOut" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" />
      <div className="dot-grid absolute inset-0 -z-10 opacity-60" />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-5 pb-36 pt-16 sm:px-8 lg:min-h-[94vh] lg:pb-44"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white sm:text-sm"
        >
          <ShieldCheck size={16} className="text-sky-light" />
          ISO 9001:2015 Certified · Bengaluru
          <span className="mx-1 h-1 w-1 rounded-full bg-white/50" />
          <span className="text-brand-light">24/7</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5.2rem]"
        >
          Travel Bengaluru &amp; South India{" "}
          <span className="text-gradient">the premium way.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-white/80 sm:text-xl"
        >
          <span>Book</span>
          <span className="relative inline-flex h-8 min-w-[12ch] overflow-hidden sm:h-9">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING[word]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute left-0 font-bold text-sky-light"
              >
                {ROTATING[word]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="w-full text-base text-white/65 sm:w-auto sm:text-lg">with live fares in under 60 seconds.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <a
            href="#book"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-white shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Book Your Ride <ArrowRight size={19} />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white transition hover:bg-white/20"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp
          </a>
          <a
            href={telLink}
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white transition hover:bg-white/20"
          >
            <Phone size={18} className="text-sky-light" /> Call
          </a>
        </motion.div>

        {/* Slide caption + controls */}
        <div className="mt-12 flex items-center gap-5">
          <div className="flex gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show ${s.place}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-10 bg-brand" : "w-4 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.place}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="hidden items-center gap-2 text-sm text-white/70 sm:flex"
            >
              <MapPin size={15} className="text-brand-light" />
              <span className="font-semibold text-white">{current.place}</span> — {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating stat cards (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-52 right-28 hidden animate-float rounded-3xl bg-white/95 p-5 shadow-lift xl:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-soft text-sky-deep">
            <Car size={24} />
          </span>
          <div>
            <p className="font-display text-2xl font-extrabold text-ink">8+ vehicle types</p>
            <p className="text-sm text-ink-mute">Sedan to 50-seater coach</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   BOOKING WIDGET (overlaps hero)
========================================================= */

function BookingInner() {
  const params = useSearchParams();
  const tripKey = params.get("tripType") || "default";
  const [customer, setCustomer] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setCustomer(getCustomer());
    setRecent(getRecentBookings());
  }, []);

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-light">Instant booking</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
            {customer?.name ? `Welcome back, ${customer.name.split(" ")[0]}! 👋` : "Where are you headed?"}
          </h2>
        </div>
        {recent[0] && (
          <Link
            href="/my-bookings"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
          >
            <CalendarCheck size={14} className="text-sky-light" /> Last booking {recent[0].id}
          </Link>
        )}
      </div>
      <SearchForm key={tripKey} />
    </div>
  );
}

function BookingSection() {
  return (
    <section id="book" className="relative z-20 mx-auto -mt-32 max-w-6xl scroll-mt-28 px-4 sm:-mt-40 sm:px-6 lg:px-8">
      <Reveal y={50}>
        <Suspense fallback={<div className="h-80 rounded-[28px] bg-white/80" />}>
          <BookingInner />
        </Suspense>
      </Reveal>
    </section>
  );
}

/* =========================================================
   TRUST STRIP + STATS
========================================================= */

function TrustStrip() {
  // "Gift box" vehicle banner: an orange box wrapped with sky-blue ribbons,
  // a bow tag on top, and two rows of vehicle photo cards scrolling in
  // opposite directions. Hover pauses the motion.
  const rowA = [
    { name: "Sedan", img: "sedan11", seats: 4 },
    { name: "Innova Crysta", img: "crysta11", seats: 7 },
    { name: "Innova Hycross", img: "hybrid11", seats: 7 },
    { name: "Force Urbania", img: "urbania11", seats: 17 },
    { name: "Tempo Traveller", img: "tt11", seats: 20 },
    { name: "Mini Bus", img: "mini11", seats: 33 },
    { name: "Toyota Innova", img: "innova11", seats: 7 },
  ];
  const rowB = [
    { name: "Urbania Luxury", img: "urbania12", seats: 10 },
    { name: "Tempo Traveller", img: "tt12", seats: 12 },
    { name: "Crysta Premium", img: "crysta12", seats: 7 },
    { name: "Hycross Hybrid", img: "hybrid12", seats: 7 },
    { name: "Sedan Comfort", img: "sedan12", seats: 4 },
    { name: "Coach & Bus", img: "mini12", seats: 50 },
    { name: "Innova", img: "innova12", seats: 7 },
  ];
  const perks = ["Pay after ride", "Live fares + GST", "24/7 support", "Verified drivers"];

  const Card = ({ v }) => (
    <Link
      href="/fleet"
      className="group/card relative block h-40 w-60 shrink-0 overflow-hidden rounded-3xl bg-white shadow-lift ring-4 ring-white/40 transition duration-300 hover:-translate-y-1 hover:ring-white sm:h-48 sm:w-72"
    >
      <img
        src={`/images/web/${v.img}-sm.webp`}
        alt={`${v.name} on rent in Bengaluru`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-700 group-hover/card:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink">
        <Users size={12} className="text-sky-deep" /> {v.seats}
      </span>
      <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-extrabold text-white">{v.name}</p>
    </Link>
  );

  return (
    <section className="relative mt-20 px-3 sm:px-6">
      <Reveal y={40}>
        <div className="relative mx-auto max-w-[96rem] rounded-[40px] bg-brand-gradient px-0 pb-10 pt-16 shadow-brand sm:pt-20">
          {/* Ribbons */}
          <div className="pointer-events-none absolute inset-y-0 left-[18%] w-10 bg-gradient-to-b from-sky-light via-sky to-sky-deep opacity-90 shadow-[0_0_0_3px_rgba(255,255,255,0.35)] sm:w-14" />
          <div className="pointer-events-none absolute inset-x-0 top-[52%] h-10 -translate-y-1/2 bg-gradient-to-r from-sky-deep via-sky to-sky-light opacity-90 shadow-[0_0_0_3px_rgba(255,255,255,0.35)] sm:h-12" />
          <div className="dot-grid pointer-events-none absolute inset-0 rounded-[40px]" />

          {/* Bow tag */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-3 rounded-full border-4 border-cream bg-ink py-2.5 pl-2.5 pr-6 shadow-lift">
              <span className="flex h-11 w-11 animate-wiggle items-center justify-center rounded-full bg-sky text-white">
                <Gift size={22} />
              </span>
              <span className="whitespace-nowrap font-display text-sm font-extrabold text-white sm:text-base">
                Your ride, <span className="text-brand-light">wrapped &amp; ready</span>
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="relative z-10 mx-auto mb-8 max-w-4xl px-5 text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
              8 vehicle types. One tap to book.
            </h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {perks.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-ink shadow-soft sm:text-sm">
                  <CheckCircle2 size={14} className="text-brand" /> {p}
                </span>
              ))}
            </div>
          </div>

          {/* Scrolling photo rows */}
          <div className="relative z-10 space-y-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex w-max animate-marquee-slow gap-5 pr-5 hover:[animation-play-state:paused]">
              {[...rowA, ...rowA].map((v, i) => (
                <Card key={`a${i}`} v={v} />
              ))}
            </div>
            <div className="flex w-max animate-marquee-reverse gap-5 pr-5 hover:[animation-play-state:paused]">
              {[...rowB, ...rowB].map((v, i) => (
                <Card key={`b${i}`} v={v} />
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-3 px-5">
            <a href="#book" className="btn-shine inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-bold text-white shadow-lift hover:bg-ink/90">
              Unwrap your fare <ArrowRight size={18} />
            </a>
            <Link href="/fleet" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-dark shadow-lift hover:bg-cream">
              See all vehicles
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 24, suffix: "/7", label: "Booking & support" },
    { value: 8, suffix: "+", label: "Vehicle categories" },
    { value: 100, suffix: "+", label: "Bengaluru areas served" },
    { value: 30, suffix: "+", label: "South India destinations" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="group rounded-3xl border border-cream-line bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:border-brand/40 sm:p-8">
              <p className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} className="bg-gradient-to-br from-brand to-sky-deep bg-clip-text text-transparent" />
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-mute">{s.label}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function Heading({ eyebrow, title, accent, text, center = false, light = false, accentClass = "text-gradient" }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] ${light ? "text-brand-light" : "text-brand"}`}>
        <span className="h-px w-8 bg-current" /> {eyebrow}
      </p>
      <h2 className={`mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl ${light ? "text-white" : "text-ink"}`}>
        {title} {accent && <span className={accentClass}>{accent}</span>}
      </h2>
      {text && <p className={`mt-4 text-base leading-8 sm:text-lg ${light ? "text-white/70" : "text-ink-soft"}`}>{text}</p>}
    </Reveal>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function Services() {
  const router = useRouter();

  function go(service) {
    if (service.trip) {
      router.replace(`/?tripType=${service.trip}`, { scroll: false });
      setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      router.push(service.href);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-sky-soft blur-3xl" />
      <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-brand-50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Heading
          eyebrow="Our services"
          title="One partner for"
          accent="every journey."
          text="From a quick airport drop to a 50-seater pilgrimage tour — book it in minutes and travel with a team that has done it thousands of times."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <button
                type="button"
                onClick={() => go(s)}
                className="group relative h-full w-full overflow-hidden rounded-[28px] border border-cream-line bg-cream p-7 text-left transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-ink hover:shadow-lift"
              >
                <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-brand transition group-hover:bg-brand group-hover:text-white">
                  {s.tag}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-soft transition duration-300 group-hover:rotate-[-6deg] group-hover:bg-brand group-hover:text-white">
                  <s.icon size={26} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-ink transition group-hover:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft transition group-hover:text-white/70">{s.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-deep transition group-hover:text-sky-light">
                  {s.trip ? "Get instant fare" : "Learn more"}
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* =========================================================
   FLEET SHOWCASE — swipeable on mobile
========================================================= */

function FleetShowcase() {
  const scroller = useRef(null);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then(setRates)
      .catch(() => {});
  }, []);

  const fromPrice = useMemo(() => {
    const out = {};
    FLEET.forEach((f) => {
      const v = rates?.vehicles?.[f.rate];
      if (!v || v.enquiryOnly) return;
      const opts = [v.local?.packages?.[0]?.price, v.airport?.flat || (v.airport ? v.airport.minKm * v.airport.ratePerKm : null)].filter(Boolean);
      if (opts.length) out[f.name] = Math.min(...opts);
    });
    return out;
  }, [rates]);

  const scrollBy = (dir) => scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="The fleet" title="Choose your" accent="perfect ride." text="Clean, comfortable and chauffeur-driven — from 4-seater sedans to 50-seater coaches." />
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous vehicles" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:bg-ink hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next vehicles" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-brand transition hover:bg-brand-dark">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-6 sm:scroll-px-8 sm:px-8 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:scroll-px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
      >
        {FLEET.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.6 }}
            className="group w-[82vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-white shadow-soft transition hover:shadow-lift sm:w-[340px]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-cream-deep">
              <img {...pic(f.img)} sizes="360px" alt={`${f.name} rental in Bengaluru — Dynamic Travels`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink">
                <Users size={13} className="text-sky-deep" /> {f.seats} seats
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{f.name}</h3>
                  <p className="mt-1 text-sm text-ink-mute">{f.tag}</p>
                </div>
                <div className="text-right">
                  {fromPrice[f.name] ? (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">From</p>
                      <p className="font-display text-xl font-extrabold text-brand">{formatINR(fromPrice[f.name])}</p>
                    </>
                  ) : (
                    <span className="rounded-full bg-sky-soft px-3 py-1 text-[11px] font-bold text-sky-deep">Get quote</span>
                  )}
                </div>
              </div>
              <Link href="/fleet" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-bold text-white transition group-hover:bg-brand">
                View &amp; Book <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
        <Link href="/fleet" className="flex w-[60vw] max-w-[260px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-brand/40 bg-white/60 p-6 text-center font-display text-lg font-bold text-brand transition hover:bg-white">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white"><ArrowRight /></span>
          See the full fleet
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   PARALLAX BANNER
========================================================= */

function ParallaxBanner() {
  return (
    <ParallaxImage src="/images/web/4.webp" alt="Dynamic Travels Urbania at sunset by the coast" strength={16} overlay="bg-gradient-to-r from-ink/90 via-ink/60 to-sky-deep/40" className="min-h-[70vh]">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-light">Weekend plans?</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Every road trip, <span className="text-gradient-sky">beautifully handled.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
            Coastal drives, hill-station escapes and temple trails — with a driver who knows the way and a vehicle that fits your whole group.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/destinations" className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-bold text-white shadow-brand hover:bg-brand-dark">
              Explore Destinations <ArrowRight size={18} />
            </Link>
            <Link href="/group-booking" className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-white hover:bg-white/20">
              Plan a Group Trip
            </Link>
          </div>
        </Reveal>
      </div>
    </ParallaxImage>
  );
}

/* =========================================================
   WHY CHOOSE US — parallax image collage
========================================================= */

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative h-[460px] sm:h-[560px]">
          <Parallax speed={0.18} className="absolute left-0 top-0 h-[78%] w-[72%]">
            <img {...pic("2")} sizes="(min-width:1024px) 40vw, 72vw" alt="Dynamic Travels Innova at Vidhana Soudha" loading="lazy" className="h-full w-full rounded-[32px] object-cover shadow-lift" />
          </Parallax>
          <Parallax speed={-0.22} className="absolute bottom-0 right-0 h-[56%] w-[55%]">
            <img {...pic("crysta12")} sizes="(min-width:1024px) 30vw, 55vw" alt="Innova Crysta interior comfort" loading="lazy" className="h-full w-full rounded-[32px] border-[6px] border-white object-cover shadow-lift" />
          </Parallax>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute left-4 bottom-10 z-10 flex items-center gap-3 rounded-3xl bg-brand p-5 text-white shadow-brand sm:left-8"
          >
            <ShieldCheck size={34} />
            <div>
              <p className="font-display text-lg font-extrabold leading-tight">ISO 9001:2015</p>
              <p className="text-xs text-white/85">Certified car rental service</p>
            </div>
          </motion.div>
        </div>

        <div>
          <Heading eyebrow="Why Dynamic Travels" title="Premium service," accent="honest pricing." text="We built Dynamic Travels around one idea: travel should feel effortless. That means vetted drivers, spotless cars and a fare you know before you book." />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {WHY.map((w) => (
              <StaggerItem key={w.title}>
                <div className="flex h-full gap-4 rounded-3xl border border-cream-line bg-cream/60 p-5 transition hover:border-sky/40 hover:bg-sky-soft/60">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-deep shadow-soft">
                    <w.icon size={21} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-ink">{w.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{w.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-sky-gradient py-20 text-white sm:py-28">
      <div className="dot-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Heading light center eyebrow="How it works" title="Booked in" accent="four easy steps." accentClass="text-ink" />
        <Stagger className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent lg:block" />
          {STEPS.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative h-full rounded-[28px] border border-white/20 bg-white/10 p-7 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-brand shadow-lift">
                  <s.icon size={32} />
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <a href="#book" className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-sky-deep shadow-lift hover:bg-cream">
            Start booking <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   DESTINATIONS PREVIEW
========================================================= */

function DestinationsPreview() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Popular from Bengaluru" title="Where will you" accent="go next?" />
          <Reveal>
            <Link href="/destinations" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 font-bold text-ink hover:bg-ink hover:text-white">
              All 30+ destinations <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <StaggerItem key={d.name} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : ""}>
              <Link
                href={`/?tripType=outstation&drop=${encodeURIComponent(d.name.split(" ")[0])}#book`}
                className={`group relative block h-full overflow-hidden rounded-[28px] shadow-soft ${i === 0 ? "min-h-[340px] lg:min-h-[520px]" : "min-h-[250px]"}`}
              >
                <img {...pic(d.img)} sizes="(min-width:1024px) 50vw, 100vw" alt={`${d.name} trip from Bengaluru`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    <MapPin size={12} /> {d.km}
                  </span>
                  <h3 className={`mt-3 font-display font-extrabold text-white ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{d.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{d.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-light opacity-0 transition group-hover:opacity-100">
                    Book this trip <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* =========================================================
   MOMENTS + CERTIFICATE
========================================================= */

function Moments() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="hero-glow absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Heading light eyebrow="On the road & at the expo" title="A team you can" accent="actually meet." text="We represent Bengaluru travel at tourism expos across India and abroad — and the same people answer your call at 2 AM." />
          <div className="mt-10 columns-2 gap-4 sm:columns-3">
            {MOMENTS.map((m, i) => (
              <motion.div
                key={m.img}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-3xl"
              >
                <img {...pic(m.img)} sizes="300px" alt={m.alt} loading="lazy" className="w-full object-cover transition duration-700 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal x={40} y={0} className="lg:pt-24">
          <div className="sticky top-28 rounded-[32px] bg-white p-4 text-ink shadow-lift">
            <img {...pic("dynamic-travels-certificate")} sizes="420px" alt="Dynamic Travels ISO 9001:2015 certificate for car rental service" loading="lazy" className="w-full rounded-3xl" />
            <div className="flex items-center gap-3 p-4">
              <BadgeCheck className="text-brand" size={28} />
              <div>
                <p className="font-display text-lg font-bold">ISO 9001:2015 Certified</p>
                <p className="text-sm text-ink-mute">Quality Management System — Car Rental Service</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ (+ FAQPage structured data for Google rich results)
========================================================= */

function FaqSection() {
  const [open, setOpen] = useState(0);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="bg-white py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Heading eyebrow="FAQ" title="Questions," accent="answered." text="Still unsure? Our travel desk is a call or WhatsApp away, day and night." />
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-bold text-white hover:bg-sky-deep">
              <Phone size={17} /> {SITE.phoneDisplay}
            </a>
            <a href={waLink("Hello Dynamic Travels, I have a question about a booking.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
          </Reveal>
        </div>
        <Stagger className="space-y-3" gap={0.06}>
          {FAQS.map((f, i) => (
            <StaggerItem key={f.q}>
              <div className={`overflow-hidden rounded-3xl border transition ${open === i ? "border-brand/40 bg-brand-50/60" : "border-cream-line bg-cream/40"}`}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                  <span className="font-display text-base font-bold text-ink sm:text-lg">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-brand transition duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-6 text-[15px] leading-7 text-ink-soft sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* =========================================================
   SEO CONTENT — keyword-rich, genuinely useful copy
========================================================= */

function SeoContent() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Cab, Tempo Traveller &amp; Bus Rental in Bengaluru — Dynamic Travels
          </h2>
          <div className="mt-6 grid gap-6 text-[15px] leading-8 text-ink-soft md:grid-cols-2">
            <p>
              Dynamic Travels is an <strong className="text-ink">ISO 9001:2015 certified travel company in Bengaluru</strong> offering
              reliable <strong className="text-ink">airport taxi service to Kempegowda International Airport</strong>, local cab rentals by the
              hour and <strong className="text-ink">outstation cabs from Bangalore</strong> to Mysore, Coorg, Ooty, Chikmagalur, Wayanad, Hampi,
              Goa, Tirupati and across Karnataka, Kerala and Tamil Nadu. Every booking shows a transparent fare with GST before you confirm.
            </p>
            <p>
              Need more seats? Rent an <strong className="text-ink">Innova Crysta</strong> or <strong className="text-ink">Innova Hycross</strong> for
              family trips, a <strong className="text-ink">Force Urbania</strong> or <strong className="text-ink">Tempo Traveller on rent in Bangalore</strong> for
              12–20 people, or a <strong className="text-ink">mini bus and 50-seater coach</strong> for weddings, school trips, pilgrimages and corporate events.
              Our chauffeurs are verified and experienced, and our desk is open 24/7 on call and WhatsApp.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-brand-gradient p-8 text-white shadow-brand sm:p-14">
          <div className="dot-grid absolute inset-0" />
          <img src="/images/web/urbania12-sm.webp" alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute -bottom-6 -right-10 hidden w-[46%] max-w-xl drop-shadow-2xl lg:block" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Ready when you are</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Your ride is one tap away.</h2>
            <p className="mt-4 text-lg leading-8 text-white/85">Book online in a minute, or talk to our travel desk — we reply in minutes, 24 hours a day.</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#book" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-white hover:bg-ink/90">
                <CalendarCheck size={18} /> Book Online
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#128C4B] hover:bg-cream">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a href={telLink} className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-7 py-4 font-bold text-white hover:bg-sky-deep">
                <Phone size={18} /> Call Now
              </a>
              <a href={mailLink()} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-7 py-4 font-bold text-white hover:bg-white/10">
                <Mail size={18} /> Email
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <Clock size={15} /> {SITE.hours}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream">
      <TravelExpertPopup />
      <Header />
      <Hero />
      <BookingSection />
      <TrustStrip />
      <Stats />
      <Services />
      <FleetShowcase />
      <ParallaxBanner />
      <WhyUs />
      <HowItWorks />
      <DestinationsPreview />
      <Moments />
      <FaqSection />
      <SeoContent />
      <FinalCta />
      <Footer />
    </main>
  );
}
