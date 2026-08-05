"use client";

import Link from "next/link";
import RouteDivider from "@/components/RouteDivider";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Car, Bus, Users, Clock, MapPin, Shield, Award, 
  TrendingUp, Star, Sparkles, CheckCircle, ArrowRight,
  Phone, Mail, Map, Calendar, Building2, Crown, Diamond,
  Flame, Gem, Gift, PartyPopper, Briefcase, Trophy,
  Medal, BadgeCheck, Users2, ChevronRight, Circle,
  Square, Triangle, Hexagon, Octagon, Pentagon
} from "lucide-react";

// B2B Tariff Data
const b2bVehicles = [
  {
    id: "etios-dzire",
    name: "ETIOS / DZIRE",
    seating: "4 Seater",
    rate: 2200,
    extraHour: 150,
    extraKm: 13,
    minKm: 300,
    driverAllowance: 400,
    ac: true,
    type: "Sedan",
    icon: Car,
    bestFor: "Budget-friendly executive travel"
  },
  {
    id: "innova-crysta",
    name: "INNOVA CRYSTA",
    seating: "7 Seater",
    rate: 3000,
    extraHour: 250,
    extraKm: 20,
    minKm: 300,
    driverAllowance: 500,
    ac: true,
    type: "SUV",
    icon: Car,
    bestFor: "Comfortable family & group travel"
  },
  {
    id: "hycross-hybrid",
    name: "HYCROSS HYBRID",
    seating: "7 Seater",
    rate: 3500,
    extraHour: 300,
    extraKm: 22,
    minKm: 300,
    driverAllowance: 500,
    ac: true,
    type: "SUV",
    icon: Car,
    bestFor: "Premium eco-friendly travel"
  },
  {
    id: "urbenia-16",
    name: "URBENIA 16 SEATER",
    seating: "16 Seater",
    rate: 7500,
    extraHour: 500,
    extraKm: 36,
    minKm: 300,
    driverAllowance: 700,
    ac: true,
    type: "Mini Bus",
    icon: Bus,
    bestFor: "Group tours & corporate events"
  }
];

// General Tariff Data
const generalVehicles = [
  {
    id: "etios-dzire-gen",
    name: "ETIOS / DZIRE",
    seating: "4 Seater",
    local8hrs: 2200,
    airportTransfer: 1600,
    extraHour: 150,
    extraKm: 13,
    localBata: 250,
    minKm: 300,
    driverAllowance: 400,
    ac: true,
    type: "Sedan",
    icon: Car,
    bestFor: "Corporate executive travel"
  },
  {
    id: "innova-crysta-gen",
    name: "INNOVA CRYSTA",
    seating: "7 Seater",
    local8hrs: 3500,
    airportTransfer: 2500,
    extraHour: 250,
    extraKm: 22,
    localBata: 300,
    minKm: 300,
    driverAllowance: 500,
    ac: true,
    type: "SUV",
    icon: Car,
    bestFor: "Premium family travel"
  },
  {
    id: "crysta-hybrid",
    name: "CRYSTA HYBRID",
    seating: "7 Seater",
    local8hrs: 4500,
    airportTransfer: 4000,
    extraHour: 450,
    extraKm: 26,
    localBata: 400,
    minKm: 300,
    driverAllowance: 500,
    ac: true,
    type: "SUV",
    icon: Car,
    bestFor: "Luxury eco-friendly travel"
  },
  {
    id: "fortuner",
    name: "TOYOTA FORTUNER",
    seating: "7 Seater",
    local8hrs: 6000,
    airportTransfer: 6000,
    extraHour: 600,
    extraKm: 60,
    localBata: 500,
    minKm: 300,
    driverAllowance: 600,
    ac: true,
    type: "SUV",
    icon: Car,
    bestFor: "Premium luxury SUV experience"
  }
];

// Floating animation for icons
function FloatingIcon({ icon: Icon, delay, duration, x, y }: { icon: any, delay: number, duration: number, x: number, y: number }) {
  return (
    <motion.div
      className="absolute text-signal-amber/10"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0],
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon size={40} />
    </motion.div>
  );
}

// Type definitions
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FleetPage() {
  const [activeTab, setActiveTab] = useState<"b2b" | "general">("b2b");
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 text-concrete-50"
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" aria-hidden="true"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[
            { icon: Car, delay: 0, duration: 3, x: -40, y: -30 },
            { icon: Bus, delay: 0.5, duration: 4, x: 40, y: -20 },
            { icon: Users, delay: 1, duration: 3.5, x: -30, y: -35 },
            { icon: Clock, delay: 1.5, duration: 4.5, x: 35, y: -25 },
            { icon: Shield, delay: 2, duration: 3.8, x: -20, y: -40 },
            { icon: Award, delay: 0.8, duration: 4.2, x: 25, y: -15 },
          ].map((item, index) => (
            <FloatingIcon key={index} {...item} />
          ))}
        </div>

        <motion.div 
          className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20"
          variants={staggerChildren}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div variants={fadeInLeft}>
              <motion.p 
                className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber"
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                Our Fleet
              </motion.p>
              <motion.h1 
                id="hero-title"
                className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Four Categories.
                <br />
                <motion.span 
                  className="text-signal-amber"
                  initial={{ opacity: 0 }}
                  animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  One Rate Card.
                </motion.span>
              </motion.h1>
              <motion.p 
                className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                Every category below carries a per-km rate and a fixed base fare. 
                Whatever you pick, the same rule applies: distance × rate, 
                plus base fare, plus 5% GST.
              </motion.p>
            </motion.div>
            <motion.div 
              className="relative flex items-center justify-center"
              variants={fadeInRight}
            >
              <motion.div 
                className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-signal-amber/20 to-signal-green/20 p-1 lg:h-80"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink-800/50 backdrop-blur-sm">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Car className="mx-auto h-16 w-16 text-signal-amber" aria-hidden="true" />
                    <p className="mt-4 font-display text-xl font-bold">Dynamic Fleet</p>
                    <p className="text-sm text-concrete-100/60">Premium Vehicles • Best Rates</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Tariff Tabs */}
      <section className="py-8 bg-concrete-50 border-b border-concrete-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab("b2b")}
              className={`px-8 py-3 font-display text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                activeTab === "b2b"
                  ? "bg-gradient-to-r from-signal-amber to-signal-green text-white shadow-lg scale-105"
                  : "bg-white text-ink-600 hover:bg-concrete-100 border border-concrete-200"
              }`}
            >
              B2B Tariff
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`px-8 py-3 font-display text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                activeTab === "general"
                  ? "bg-gradient-to-r from-signal-amber to-signal-green text-white shadow-lg scale-105"
                  : "bg-white text-ink-600 hover:bg-concrete-100 border border-concrete-200"
              }`}
            >
              General Tariff
            </button>
          </div>
        </div>
      </section>

      {/* B2B Tariff Section */}
      {activeTab === "b2b" && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">B2B Tariff</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink-900">
              Out Station <span className="text-signal-amber">Rates</span>
            </h2>
            <p className="mt-2 font-body text-ink-600">Dynamic Travels Corporate Rates</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {b2bVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
                className="relative border border-concrete-200 bg-white p-6 rounded-2xl shadow-sm transition-all duration-300"
              >
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                  animate={{
                    boxShadow: [
                      "inset 0 0 0px rgba(245, 158, 11, 0)",
                      "inset 0 0 50px rgba(245, 158, 11, 0.05)",
                      "inset 0 0 0px rgba(245, 158, 11, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-r from-signal-amber to-signal-green p-2 text-white">
                      <vehicle.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink-900">{vehicle.name}</h3>
                      <p className="font-body text-sm text-ink-500">{vehicle.seating}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-signal-amber/10 px-3 py-1 text-xs font-bold text-signal-amber">
                    {vehicle.type}
                  </span>
                </div>

                <RouteDivider className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-concrete-50 p-3 text-center">
                    <p className="font-body text-xs text-ink-500">8 Hours / 80 Kms</p>
                    <p className="font-display text-xl font-bold text-signal-amber">₹{vehicle.rate}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-3 text-center">
                    <p className="font-body text-xs text-ink-500">Extra Hour</p>
                    <p className="font-display text-xl font-bold text-ink-900">₹{vehicle.extraHour}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-3 text-center">
                    <p className="font-body text-xs text-ink-500">Extra Km</p>
                    <p className="font-display text-xl font-bold text-ink-900">₹{vehicle.extraKm}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-3 text-center">
                    <p className="font-body text-xs text-ink-500">Min Kms/Day</p>
                    <p className="font-display text-xl font-bold text-ink-900">{vehicle.minKm}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-concrete-200 pt-4">
                  <div>
                    <p className="font-body text-xs text-ink-500">Driver Allowance</p>
                    <p className="font-display text-lg font-bold text-signal-amber">₹{vehicle.driverAllowance}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-signal-green" />
                    <span className="font-body text-xs text-ink-600">AC</span>
                  </div>
                </div>

                <p className="mt-3 font-body text-xs text-ink-400">
                  Best for: <span className="text-ink-700">{vehicle.bestFor}</span>
                </p>

                <Link
                  href={`/fare-calculator?category=${vehicle.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-signal-amber to-signal-green px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-all hover:opacity-90"
                >
                  Get a fare <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* B2B Terms */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-concrete-50 p-6 border border-concrete-200"
          >
            <h4 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-signal-amber" />
              Terms & Conditions
            </h4>
            <ul className="mt-3 space-y-1.5 font-body text-sm text-ink-600 list-disc list-inside">
              <li>Kms and Timings will be calculated from our office to our office.</li>
              <li>Toll, Parking and Permit fee will be charged on actuals.</li>
              <li>The driver allowance will be charged double, if the outstation journey starts before 6.00AM or continued after 10.00 pm.</li>
              <li>For Outstation, Minimum 300 Kms per day shall be covered, otherwise the same will be charged.</li>
              <li>GST 5% will be charged on Every Bill.</li>
            </ul>
          </motion.div>
        </motion.section>
      )}

      {/* General Tariff Section */}
      {activeTab === "general" && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">General Tariff</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink-900">
              Complete <span className="text-signal-amber">Rate Card</span>
            </h2>
            <p className="mt-2 font-body text-ink-600">Dynamic Travels Standard Rates</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {generalVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
                className="relative border border-concrete-200 bg-white p-6 rounded-2xl shadow-sm transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-r from-signal-amber to-signal-green p-2 text-white">
                      <vehicle.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink-900">{vehicle.name}</h3>
                      <p className="font-body text-sm text-ink-500">{vehicle.seating}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-signal-amber/10 px-3 py-1 text-xs font-bold text-signal-amber">
                    {vehicle.type}
                  </span>
                </div>

                <RouteDivider className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">8 Hrs / 80 Kms</p>
                    <p className="font-display text-lg font-bold text-signal-amber">₹{vehicle.local8hrs}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">Airport Transfer</p>
                    <p className="font-display text-lg font-bold text-signal-amber">₹{vehicle.airportTransfer}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">Extra Hour</p>
                    <p className="font-display text-lg font-bold text-ink-900">₹{vehicle.extraHour}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">Extra Km</p>
                    <p className="font-display text-lg font-bold text-ink-900">₹{vehicle.extraKm}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">Local Bata (After 10PM)</p>
                    <p className="font-display text-lg font-bold text-ink-900">₹{vehicle.localBata}</p>
                  </div>
                  <div className="rounded-lg bg-concrete-50 p-2.5 text-center">
                    <p className="font-body text-xs text-ink-500">Min Kms/Day</p>
                    <p className="font-display text-lg font-bold text-ink-900">{vehicle.minKm}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-concrete-200 pt-4">
                  <div>
                    <p className="font-body text-xs text-ink-500">Driver Allowance</p>
                    <p className="font-display text-lg font-bold text-signal-amber">₹{vehicle.driverAllowance}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-signal-green" />
                    <span className="font-body text-xs text-ink-600">AC</span>
                  </div>
                </div>

                <p className="mt-3 font-body text-xs text-ink-400">
                  Best for: <span className="text-ink-700">{vehicle.bestFor}</span>
                </p>

                <Link
                  href={`/fare-calculator?category=${vehicle.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-signal-amber to-signal-green px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-all hover:opacity-90"
                >
                  Get a fare <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* General Terms */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-concrete-50 p-6 border border-concrete-200"
          >
            <h4 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-signal-amber" />
              Terms & Conditions
            </h4>
            <ul className="mt-3 space-y-1.5 font-body text-sm text-ink-600 list-disc list-inside">
              <li>Kms and Timings will be calculated from our office to our office.</li>
              <li>Toll, Parking and Permit fee will be charged on actuals.</li>
              <li>The driver allowance will be charged double, if the outstation journey starts before 6.00AM or continued after 10.00 pm.</li>
              <li>For Outstation, Minimum 300 Kms per day shall be covered, otherwise the same will be charged.</li>
              <li>For Local Use the driver allowance will be charged after 10.00 pm.</li>
              <li>If the fuel cost go up accordingly we will revise the tariff by mutual consent.</li>
              <li>GST 5% will be charged on Every Bill.</li>
              <li>Bills for the service provided will be submitted on monthly basis and payment to be cleared within 15 days from the date of submission of bill.</li>
            </ul>
          </motion.div>
        </motion.section>
      )}

      {/* Footer Notes */}
      <section className="bg-concrete-50 border-t border-concrete-200 py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="font-body text-sm text-steel">
            All rates shown are before the 5% GST applied at checkout. Tolls, parking, 
            and interstate permits (if applicable) are billed separately at actuals. 
            Minimum billable km applies per day of travel, even if the actual distance 
            covered is shorter.
          </p>
        </div>
      </section>
    </div>
  );
}