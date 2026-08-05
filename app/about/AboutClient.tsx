"use client";

import RouteDivider from "@/components/RouteDivider";
import { 
  MapPin, Users, Building2, Globe, Target, Shield, HeartHandshake, 
  Calendar, TrendingUp, Award, Globe2, Sparkles, Rocket, Star, 
  Zap, Compass, Mountain, Coffee, Plane, Clock, CheckCircle, 
  ArrowRight, BookOpen, Lightbulb, Heart, Smile, ThumbsUp, 
  Crown, Diamond, Infinity, Flame, Gem, Gift, PartyPopper,
  Briefcase, Trophy, Medal, BadgeCheck, StarHalf, Users2,
  Building, ChevronRight, Circle, Square, Triangle, Hexagon,
  Octagon, Pentagon
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";

const milestones = [
  { 
    year: "2006", 
    text: "Founded with a clear vision to provide high-quality travel services to corporate MNCs and individual travelers.",
    icon: Calendar
  },
  { 
    year: "2008", 
    text: "Rapidly established as one of the fastest-growing travel service providers in Bangalore.",
    icon: TrendingUp
  },
  { 
    year: "2012", 
    text: "Recorded a turnover of INR 10 crore between 2012-2016, showcasing strong growth.",
    icon: Award
  },
  { 
    year: "2024", 
    text: "Expanding footprint across India with a nationwide network and partner ecosystem.",
    icon: Globe2
  },
];

const floatingIcons = [
  { icon: Star, delay: 0, duration: 3, x: 0, y: -20 },
  { icon: Sparkles, delay: 0.5, duration: 4, x: 20, y: -10 },
  { icon: Rocket, delay: 1, duration: 3.5, x: -20, y: -15 },
  { icon: Compass, delay: 1.5, duration: 4.5, x: 15, y: -25 },
  { icon: Mountain, delay: 2, duration: 3.8, x: -15, y: -20 },
  { icon: Coffee, delay: 0.8, duration: 4.2, x: 10, y: -30 },
];

const clients = [
  { name: "AFI", initials: "AFI" },
  { name: "Agripower Fertilisers India Pvt. Ltd.", initials: "AF" },
  { name: "CIE", initials: "CIE" },
  { name: "Connect India E-Commerce Services Private Limited.", initials: "CI" },
  { name: "CSP", initials: "CSP" },
  { name: "CSB Solutions Pvt Ltd", initials: "CS" },
  { name: "ETP", initials: "ETP" },
  { name: "Exotel Techom Pvt Ltd", initials: "ET" },
  { name: "GIP", initials: "GIP" },
  { name: "Gunnam Infra Projects Private Limited", initials: "GI" },
];

const floatingClientIcons = [
  { icon: Trophy, delay: 0, duration: 4, x: -30, y: -20 },
  { icon: Medal, delay: 0.5, duration: 3.5, x: 30, y: -15 },
  { icon: BadgeCheck, delay: 1, duration: 4.5, x: -20, y: -25 },
  { icon: StarHalf, delay: 1.5, duration: 3.8, x: 20, y: -30 },
  { icon: Users2, delay: 0.8, duration: 4.2, x: -25, y: -10 },
  { icon: Building, delay: 1.2, duration: 3.6, x: 25, y: -20 },
];

// Floating animation for icons
function FloatingIcon({ icon: Icon, delay, duration, x, y }: { icon: any, delay: number, duration: number, x: number, y: number }) {
  return (
    <motion.div
      className="absolute text-signal-amber/20"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
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

function FloatingClientIcon({ icon: Icon, delay, duration, x, y }: { icon: any, delay: number, duration: number, x: number, y: number }) {
  return (
    <motion.div
      className="absolute text-signal-amber/10"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0],
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon size={50} />
    </motion.div>
  );
}

// Animated number counter
function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = Math.max(1, Math.floor(value / (duration / 16)));
      
      const timer = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Number counter animation for timeline years
function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0000");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const target = parseInt(value);
      let start = 0;
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / (duration / 20)));
      
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(start.toString());
        }
      }, 20);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

// Floating shapes animation
function FloatingShapes() {
  const shapes = [
    { Icon: Circle, delay: 0, duration: 5, x: -40, y: -30, size: 20 },
    { Icon: Square, delay: 0.3, duration: 4.5, x: 40, y: -25, size: 16 },
    { Icon: Triangle, delay: 0.6, duration: 5.5, x: -30, y: -35, size: 18 },
    { Icon: Hexagon, delay: 0.9, duration: 4.8, x: 35, y: -20, size: 14 },
    { Icon: Octagon, delay: 1.2, duration: 5.2, x: -25, y: -40, size: 15 },
    { Icon: Pentagon, delay: 1.5, duration: 4.3, x: 45, y: -15, size: 17 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute text-signal-amber/5"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            x: [0, shape.x, 0],
            y: [0, shape.y, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <shape.Icon size={shape.size} />
        </motion.div>
      ))}
    </>
  );
}

// Particle background
function ParticleBackground() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-signal-amber/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Type definitions for component props
interface AnimatedSectionProps {
  children: ReactNode;
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

export default function AboutClient() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Animation variants
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

  // Animation variants for timeline
  const timelineVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 90,
      y: 50
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      rotateY: -30
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * 0.3 + 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    })
  };

  const yearVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.3 + 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 8
      }
    })
  };

  const iconVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -360
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.3 + 0.3,
        duration: 0.7,
        type: "spring",
        stiffness: 150,
        damping: 6
      }
    })
  };

  const dividerVariants = {
    hidden: { 
      opacity: 0,
      scaleX: 0
    },
    visible: (i: number) => ({
      opacity: 1,
      scaleX: 1,
      transition: {
        delay: i * 0.3 + 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // SEO-friendly structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dynamic Travels",
    "description": "Dynamic Travels is a Bangalore-based travel company offering comprehensive travel services to corporate MNCs and individual travelers since 2006.",
    "url": "https://dynamictravels.com/about",
    "founder": {
      "@type": "Person",
      "name": "Mohan Kumar MN"
    },
    "foundingDate": "2006",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressCountry": "India"
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
                  About Dynamic Travels
                </motion.p>
                <motion.h1 
                  id="hero-title"
                  className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Building Relationships,
                  <br />
                  <motion.span 
                    className="text-signal-amber"
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    One Journey
                  </motion.span> at a Time
                </motion.h1>
                <motion.p 
                  className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  For over 18 years, Dynamic Travels has been transforming travel experiences 
                  for corporate MNCs and individual travelers across India. We&apos;re not just a 
                  travel company – we&apos;re your trusted partner in exploration.
                </motion.p>
                <motion.div 
                  className="mt-8 flex flex-wrap gap-6"
                  variants={staggerChildren}
                  initial="hidden"
                  animate={isHeroInView ? "visible" : "hidden"}
                >
                  <motion.div variants={fadeInUp}>
                    <p className="text-3xl font-bold text-signal-amber">18+</p>
                    <p className="text-sm text-concrete-100/60">Years of Excellence</p>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <p className="text-3xl font-bold text-signal-amber">500+</p>
                    <p className="text-sm text-concrete-100/60">Corporate Clients</p>
                  </motion.div>
                </motion.div>
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
                      <Building2 className="mx-auto h-16 w-16 text-signal-amber" aria-hidden="true" />
                      <p className="mt-4 font-display text-xl font-bold">Dynamic Travels</p>
                      <p className="text-sm text-concrete-100/60">Bangalore • India</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Story Section */}
        <section className="py-20" aria-labelledby="story-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Our Story</p>
                <h2 id="story-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                  From Bangalore to <br className="hidden sm:block" />
                  <span className="text-signal-amber">Nationwide</span>
                </h2>
                <div className="mt-6 space-y-4 font-body text-lg leading-relaxed text-ink-600">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Founded in 2006, Dynamic Travels was established with a clear vision: 
                    to provide high-quality travel-related services to corporate MNCs and 
                    individual travelers.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Under the leadership of <strong className="text-ink-900">Mr. Mohan Kumar MN</strong>, 
                    who assumed proprietorship in the same year, the company has consistently 
                    aimed to deliver reliable, efficient, and comprehensive end-to-end travel 
                    solutions.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    With a central office in Bangalore and a wide partner network, Dynamic 
                    Travels is well-positioned to cater to the diverse and evolving needs of 
                    its customers—offering a seamless, one-stop travel experience.
                  </motion.p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="space-y-6">
                  <motion.div 
                    className="rounded-2xl bg-concrete-100 p-6"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-xl font-bold text-ink-900">Our Mission</h3>
                    <p className="mt-2 font-body text-ink-600">
                      To inspire and empower meaningful travel experiences that open minds, 
                      foster connections, and enrich lives, while honoring the cultures and 
                      environments we explore.
                    </p>
                  </motion.div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div 
                      className="rounded-2xl border border-concrete-200 p-6"
                      whileHover={{ scale: 1.05, borderColor: "#F59E0B" }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapPin className="h-8 w-8 text-signal-amber" aria-hidden="true" />
                      <p className="mt-3 font-body text-sm text-ink-600">
                        Bangalore-based serving clients across India
                      </p>
                    </motion.div>
                    <motion.div 
                      className="rounded-2xl border border-concrete-200 p-6"
                      whileHover={{ scale: 1.05, borderColor: "#F59E0B" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Globe className="h-8 w-8 text-signal-amber" aria-hidden="true" />
                      <p className="mt-3 font-body text-sm text-ink-600">
                        Wide partner network for seamless service
                      </p>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <motion.section 
          className="bg-concrete-50 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="values-title"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">What Drives Us</p>
              <h2 id="values-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                Our <span className="text-signal-amber">Core Values</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-ink-600">
                Guided by our motto &apos;Building Relationships,&apos; we are committed to 
                fostering lasting connections with our clients and partners.
              </p>
            </motion.div>
            <motion.div 
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Target,
                  title: "Exceptional Experiences",
                  description: "Personalized, seamless, and memorable travel services for both corporate and individual clients.",
                },
                {
                  icon: Shield,
                  title: "Safety & Reliability",
                  description: "Highest standards in safety and service delivery, every step of the way.",
                },
                {
                  icon: HeartHandshake,
                  title: "Long-Term Relationships",
                  description: "Trust, consistency, and customer satisfaction to foster lasting partnerships.",
                },
              ].map((value, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <value.icon className="h-10 w-10 text-signal-amber" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{value.title}</h3>
                  <p className="mt-2 font-body text-ink-600">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Founder Section */}
        <section className="py-20" aria-labelledby="founder-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Meet Our Founder</p>
                <h2 id="founder-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                  Mohan Kumar <span className="text-signal-amber">MN</span>
                </h2>
                <p className="mt-2 font-body text-lg text-signal-amber">Founder &amp; CEO</p>
                <div className="mt-6 space-y-4 font-body text-lg leading-relaxed text-ink-600">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    With a passion for travel and a vision for excellence, Mohan Kumar MN 
                    founded Dynamic Travels in 2006. His leadership has been instrumental 
                    in transforming the company into one of Bangalore&apos;s fastest-growing 
                    travel service providers.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Under his guidance, Dynamic Travels has consistently delivered 
                    reliable, efficient, and comprehensive travel solutions, earning the 
                    trust of corporate MNCs and individual travelers alike.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Mohan&apos;s commitment to building lasting relationships and his 
                    customer-centric approach continue to drive the company&apos;s growth 
                    and success.
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative h-80 w-full rounded-2xl bg-gradient-to-br from-signal-amber/10 to-signal-green/10 p-1 lg:h-96"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                    <div className="text-center">
                      <Users className="mx-auto h-20 w-20 text-signal-amber" aria-hidden="true" />
                      <p className="mt-4 font-display text-2xl font-bold text-ink-900">Mohan Kumar MN</p>
                      <p className="text-sm text-ink-600">Founder &amp; CEO</p>
                      <p className="mt-2 text-xs text-ink-400">Dynamic Travels</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <motion.section 
          className="relative bg-concrete-50 py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="timeline-title"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {floatingIcons.map((item, index) => (
              <FloatingIcon key={index} {...item} />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber"
                animate={{
                  letterSpacing: ["0.2em", "0.5em", "0.2em"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Our Journey
              </motion.p>
              
              <motion.h2 
                id="timeline-title"
                className="mt-2 font-display text-4xl font-bold uppercase text-ink-900"
                animate={{
                  scale: [1, 1.02, 1],
                  color: ["#1a1a1a", "#f59e0b", "#1a1a1a"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                The <motion.span 
                  className="text-signal-amber"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(245, 158, 11, 0)",
                      "0 0 30px rgba(245, 158, 11, 0.3)",
                      "0 0 0px rgba(245, 158, 11, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Road
                </motion.span> So Far
              </motion.h2>
            </motion.div>

            <div className="mt-12 space-y-0 relative">
              {/* Timeline Line */}
              <motion.div 
                className="absolute left-20 top-0 h-full w-1"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-signal-amber via-signal-amber/50 to-transparent"></div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-signal-amber via-signal-green to-signal-amber"
                  animate={{
                    backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "100% 200%" }}
                />
              </motion.div>

              {milestones.map((milestone, index) => (
                <motion.div 
                  key={milestone.year}
                  custom={index}
                  variants={timelineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative pl-24"
                >
                  {/* Year Badge */}
                  <motion.div 
                    className="absolute left-0 top-6 w-20"
                    custom={index}
                    variants={yearVariants}
                  >
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="rounded-lg bg-gradient-to-r from-signal-amber to-signal-green p-3 text-center shadow-lg">
                        <motion.p 
                          className="font-mono text-xl font-bold text-white"
                          animate={{
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <AnimatedNumber value={milestone.year} />
                        </motion.p>
                      </div>
                      <motion.div 
                        className="absolute -inset-2 rounded-lg border-2 border-signal-amber/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    className="ml-4 py-6"
                    custom={index}
                    variants={textVariants}
                  >
                    <motion.div 
                      className="group relative rounded-2xl bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl"
                      whileHover={{ 
                        scale: 1.02,
                        x: 10,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
                      }}
                    >
                      {/* Icon */}
                      <motion.div 
                        className="absolute -left-12 -top-4"
                        custom={index}
                        variants={iconVariants}
                        aria-hidden="true"
                      >
                        <motion.div 
                          className="rounded-full bg-gradient-to-r from-signal-amber to-signal-green p-2 text-white shadow-lg"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: {
                              duration: 10,
                              repeat: Infinity,
                              ease: "linear"
                            },
                            scale: {
                              duration: 2,
                              delay: index * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <milestone.icon size={20} />
                        </motion.div>
                      </motion.div>

                      <motion.p 
                        className="font-body text-lg text-ink-600 ml-4"
                        animate={{
                          color: ["#4b5563", "#1a1a1a", "#4b5563"]
                        }}
                        transition={{
                          duration: 3,
                          delay: index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {milestone.text}
                      </motion.p>

                      {/* Progress Bar */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-gradient-to-r from-signal-amber to-signal-green"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        aria-hidden="true"
                      />

                      {/* Glow Effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
                    </motion.div>
                  </motion.div>

                  {/* Divider */}
                  {index < milestones.length - 1 && (
                    <motion.div 
                      custom={index}
                      variants={dividerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative ml-4 py-2"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="h-0.5 flex-1 bg-gradient-to-r from-signal-amber/50 via-signal-amber to-signal-amber/50"
                          animate={{
                            scaleX: [1, 1.05, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div 
                            className="h-3 w-3 rounded-full bg-signal-amber"
                            animate={{
                              boxShadow: [
                                "0 0 0px rgba(245, 158, 11, 0)",
                                "0 0 20px rgba(245, 158, 11, 0.5)",
                                "0 0 0px rgba(245, 158, 11, 0)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="h-0.5 flex-1 bg-gradient-to-l from-signal-amber/50 via-signal-amber to-signal-amber/50"
                          animate={{
                            scaleX: [1, 1.05, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Clients Section */}
        <section 
          className="relative py-20 overflow-hidden"
          aria-labelledby="clients-title"
        >
          <ParticleBackground />
          
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {floatingClientIcons.map((item, index) => (
              <FloatingClientIcon key={index} {...item} />
            ))}
          </div>

          <FloatingShapes />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Our Clients</p>
              <h2 id="clients-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                Trusted by <span className="text-signal-amber">Industry Leaders</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-ink-600">
                Proud to have served some of the biggest names in the business world.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Total Clients", value: 500, icon: Users2 },
                { label: "Years of Trust", value: 18, icon: Clock },
                { label: "Industries Served", value: 25, icon: Briefcase },
                { label: "Satisfaction Rate", value: 98, suffix: "%", icon: ThumbsUp },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-concrete-50 p-4 text-center"
                >
                  <stat.icon className="mx-auto h-6 w-6 text-signal-amber" aria-hidden="true" />
                  <p className="mt-2 font-display text-2xl font-bold text-ink-900">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                  </p>
                  <p className="text-xs text-ink-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Client Cards - All using amber-green gradient */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className="group relative"
                >
                  <div className="relative rounded-xl border border-concrete-200 bg-white p-4 transition-all duration-300 hover:shadow-xl hover:border-signal-amber hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-signal-amber to-signal-green text-sm font-bold text-white shadow-md"
                      >
                        {client.initials}
                      </div>

                      <span className="flex-1 font-body text-sm font-medium text-ink-700">
                        {client.name}
                      </span>

                      <ChevronRight className="h-4 w-4 text-concrete-400 group-hover:text-signal-amber transition-colors duration-300" aria-hidden="true" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-0.5 rounded-b-xl bg-gradient-to-r from-signal-amber to-signal-green group-hover:w-full transition-all duration-500 w-0" aria-hidden="true"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="bg-gradient-to-br from-ink-900 to-ink-800 text-concrete-50"
          aria-labelledby="cta-title"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="text-center">
              <h2 id="cta-title" className="font-display text-4xl font-bold uppercase">
                Ready to <span className="text-signal-amber">Travel</span> with Us?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-concrete-100/80">
                Experience seamless travel solutions tailored to your needs. 
                Let&apos;s build a relationship that lasts.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-block rounded-full bg-gradient-to-r from-signal-amber to-signal-green px-8 py-3 font-body font-semibold text-white transition-colors hover:opacity-90"
                  aria-label="Get in touch with Dynamic Travels"
                >
                  Get in Touch
                </a>
                <a
                  href="/services"
                  className="inline-block rounded-full border border-concrete-100/20 px-8 py-3 font-body font-semibold text-concrete-50 transition-colors hover:bg-concrete-50/10"
                  aria-label="View our travel services"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}