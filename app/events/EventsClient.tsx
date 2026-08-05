"use client";

import RouteDivider from "@/components/RouteDivider";
import { 
  Calendar, Users, Bus, Clock, MapPin, Shield, TrendingUp, Star, 
  Sparkles, Rocket, Compass, Mountain, Coffee, Plane, CheckCircle, 
  ArrowRight, Building2, Globe, Target, HeartHandshake, Award,
  Briefcase, Trophy, Medal, BadgeCheck, StarHalf, Users2,
  ChevronRight, Circle, Square, Triangle, Hexagon, Octagon, Pentagon,
  Phone, Mail, Map, Clock as ClockIcon, BusFront, PartyPopper,
  Music, Building, Home, School, Train, Car, Truck, User,
  CalendarDays, Gift, Wifi, Utensils, Crown, Diamond, Infinity,
  Flame, Gem, PartyPopper as PartyIcon
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";

const eventTypes = [
  {
    title: "Corporate Events",
    description: "Conferences, seminars, and business meetings",
    icon: Building,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Social Gatherings",
    description: "Weddings, reunions, and private parties",
    icon: Home,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Public Events",
    description: "Concerts, festivals, and sports events",
    icon: Music,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Educational Events",
    description: "Campus tours, field trips, and workshops",
    icon: School,
    color: "from-signal-amber to-signal-green"
  }
];

const fleetFeatures = [
  {
    title: "Fleet Options",
    description: "Wide range of vehicles to accommodate different group sizes and event types.",
    icon: Bus,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Punctual Service",
    description: "Reliable and timely transportation ensuring your event runs on schedule.",
    icon: Clock,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Group Coordination",
    description: "Expert coordination for multiple pickup points and complex schedules.",
    icon: Users,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Safety First",
    description: "Professional drivers and well-maintained vehicles for secure transportation.",
    icon: Shield,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Route Planning",
    description: "Optimized routes and logistics for efficient group movement.",
    icon: MapPin,
    color: "from-signal-amber to-signal-green"
  },
  {
    title: "Corporate Solutions",
    description: "Specialized services for business events and corporate functions.",
    icon: Briefcase,
    color: "from-signal-amber to-signal-green"
  }
];

const floatingIcons = [
  { icon: Star, delay: 0, duration: 3, x: 0, y: -20 },
  { icon: Sparkles, delay: 0.5, duration: 4, x: 20, y: -10 },
  { icon: Rocket, delay: 1, duration: 3.5, x: -20, y: -15 },
  { icon: Compass, delay: 1.5, duration: 4.5, x: 15, y: -25 },
  { icon: Bus, delay: 2, duration: 3.8, x: -15, y: -20 },
  { icon: Coffee, delay: 0.8, duration: 4.2, x: 10, y: -30 },
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

// Event type card with animation
function EventTypeCard({ event, index }: { event: typeof eventTypes[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 20 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="relative rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${event.color}`} style={{ zIndex: -1 }} />
        
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`mb-4 inline-block rounded-lg bg-gradient-to-r ${event.color} p-3 text-white`}
        >
          <event.icon size={24} />
        </motion.div>
        
        <h3 className="font-display text-xl font-bold text-ink-900">{event.title}</h3>
        <p className="mt-2 font-body text-sm text-ink-600">{event.description}</p>
        
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-b-xl bg-gradient-to-r from-signal-amber to-signal-green"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

export default function EventsClient() {
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

  // SEO-friendly structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Event Transport Services",
    "description": "Specialized in corporate and event bulk vehicle bookings. We provide comprehensive transportation solutions for conferences, weddings, concerts, and all types of events.",
    "provider": {
      "@type": "Organization",
      "name": "Dynamic Travels"
    },
    "areaServed": "India",
    "serviceType": "Event Transportation"
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
                  Event Transport Services
                </motion.p>
                <motion.h1 
                  id="hero-title"
                  className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Seamless <br />
                  <motion.span 
                    className="text-signal-amber"
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Event Transport
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  Specialized in corporate and event bulk vehicle bookings. 
                  We provide comprehensive transportation solutions for conferences, 
                  weddings, concerts, and all types of events.
                </motion.p>
                <motion.div 
                  className="mt-8 flex flex-wrap gap-6"
                  variants={staggerChildren}
                  initial="hidden"
                  animate={isHeroInView ? "visible" : "hidden"}
                >
                  <motion.div variants={fadeInUp}>
                    <p className="text-3xl font-bold text-signal-amber"><AnimatedCounter value={500} />+</p>
                    <p className="text-sm text-concrete-100/60">Events Served</p>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <p className="text-3xl font-bold text-signal-amber"><AnimatedCounter value={98} />%</p>
                    <p className="text-sm text-concrete-100/60">Satisfaction Rate</p>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <p className="text-3xl font-bold text-signal-amber"><AnimatedCounter value={200} />+</p>
                    <p className="text-sm text-concrete-100/60">Fleet Vehicles</p>
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
                      <Bus className="mx-auto h-16 w-16 text-signal-amber" aria-hidden="true" />
                      <p className="mt-4 font-display text-xl font-bold">Event Transport</p>
                      <p className="text-sm text-concrete-100/60">Dynamic Travels</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Event Transport Solutions */}
        <section className="py-20" aria-labelledby="solutions-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <AnimatedSection>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Event Transport Solutions</p>
              <h2 id="solutions-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                Bulk Vehicle Booking <br className="hidden sm:block" />
                <span className="text-signal-amber">for Events</span>
              </h2>
              <p className="mt-4 max-w-2xl font-body text-lg text-ink-600">
                We specialize in providing comprehensive bulk vehicle booking services for 
                corporate events and large gatherings. Our expert team ensures seamless 
                transportation logistics for your event attendees.
              </p>
            </AnimatedSection>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Corporate event transportation management",
                "Wedding guest shuttle services",
                "Conference and seminar transport solutions",
                "Multi-vehicle coordination for large events",
                "Professional chauffeur services",
                "24/7 event support team"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 rounded-xl bg-concrete-50 p-4"
                  whileHover={{ scale: 1.02, backgroundColor: "#FEF3C7" }}
                >
                  <CheckCircle className="h-5 w-5 text-signal-amber shrink-0" />
                  <span className="font-body text-sm text-ink-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Features */}
        <motion.section 
          className="bg-concrete-50 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="fleet-title"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Fleet Features</p>
              <h2 id="fleet-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                Why Choose <span className="text-signal-amber">Our Fleet</span>
              </h2>
            </motion.div>

            <motion.div 
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {fleetFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${feature.color}`} style={{ zIndex: -1 }} />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-4 inline-block rounded-lg bg-gradient-to-r ${feature.color} p-3 text-white`}
                  >
                    <feature.icon size={24} />
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-bold text-ink-900">{feature.title}</h3>
                  <p className="mt-2 font-body text-sm text-ink-600">{feature.description}</p>
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-gradient-to-r from-signal-amber to-signal-green"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Event Types */}
        <motion.section 
          className="relative py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="event-types-title"
        >
          {/* Floating Icons Background */}
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
                Event Categories
              </motion.p>
              <motion.h2 
                id="event-types-title"
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
                Types of Events <motion.span 
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
                  We Service
                </motion.span>
              </motion.h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-ink-600">
                From corporate functions to large social gatherings, we provide specialized 
                transportation solutions for various event types.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {eventTypes.map((event, index) => (
                <EventTypeCard key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Quote / Booking Form */}
        <motion.section 
          className="bg-concrete-50 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="quote-title"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Quick Quote</p>
              <h2 id="quote-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                Book Your <span className="text-signal-amber">Event Transport</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-ink-600">
                Get an instant quote for your event transportation needs
              </p>
            </motion.div>

            <motion.div 
              className="mt-10 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="vehicleType" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Vehicle Type
                      </label>
                      <select 
                        id="vehicleType" 
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber"
                      >
                        <option>Select vehicle type</option>
                        <option>Toyota Innova Crysta (7 seats)</option>
                        <option>Tempo Traveller (12 seats)</option>
                        <option>Mini Bus (20 seats)</option>
                        <option>Standard Bus (35 seats)</option>
                        <option>Luxury Bus (50 seats)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicles" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Number of Vehicles
                      </label>
                      <select 
                        id="vehicles" 
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-4">
                    <div>
                      <label htmlFor="pickupDate" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Pickup Date
                      </label>
                      <input 
                        type="date" 
                        id="pickupDate" 
                        defaultValue="2026-08-05"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                    <div>
                      <label htmlFor="pickupTime" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Pickup Time
                      </label>
                      <input 
                        type="time" 
                        id="pickupTime" 
                        defaultValue="09:00"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        End Date
                      </label>
                      <input 
                        type="date" 
                        id="endDate" 
                        defaultValue="2026-08-05"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        End Time
                      </label>
                      <input 
                        type="time" 
                        id="endTime" 
                        defaultValue="18:00"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="pickupLocation" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Pickup Location
                      </label>
                      <input 
                        type="text" 
                        id="pickupLocation" 
                        placeholder="Enter pickup location"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                    <div>
                      <label htmlFor="dropoffLocation" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Drop-off Location
                      </label>
                      <input 
                        type="text" 
                        id="dropoffLocation" 
                        placeholder="Enter drop-off location"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="your@email.com"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Your phone number"
                        className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comments" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
                      Comments/Requirements
                    </label>
                    <textarea 
                      id="comments" 
                      rows={3}
                      placeholder="Any special requirements or comments"
                      className="mt-2 w-full rounded-lg border border-concrete-200 bg-concrete-50 px-4 py-3 font-body outline-none focus:border-signal-amber resize-none" 
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.2em] text-steel block mb-3">
                      Additional Services
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        { label: "Wedding Decoration", price: "+₹2000" },
                        { label: "Onboard Refreshments", price: "+₹500" },
                        { label: "Wi-Fi Service", price: "+₹300" },
                        { label: "Event Coordinator", price: "+₹1500" },
                      ].map((service, index) => (
                        <motion.label 
                          key={index}
                          className="flex items-center gap-2 rounded-lg border border-concrete-200 p-3 cursor-pointer hover:border-signal-amber transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input type="checkbox" className="rounded border-concrete-300 text-signal-amber focus:ring-signal-amber" />
                          <span className="font-body text-sm text-ink-700">
                            {service.label}
                            <span className="block text-xs text-signal-amber">{service.price}</span>
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-concrete-50 p-6">
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <p className="font-body text-sm text-ink-500">Base Price:</p>
                        <p className="font-display text-2xl font-bold text-ink-900">₹0</p>
                      </div>
                      <div>
                        <p className="font-body text-sm text-ink-500">Add-ons:</p>
                        <p className="font-display text-2xl font-bold text-ink-900">₹0</p>
                      </div>
                      <div>
                        <p className="font-body text-sm text-signal-amber">Estimated Total:</p>
                        <p className="font-display text-3xl font-bold text-signal-amber">₹0</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-signal-amber to-signal-green py-4 font-display text-lg font-bold uppercase tracking-wide text-white shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Booking
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Corporate Solutions */}
        <section className="py-20" aria-labelledby="corporate-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">Corporate Solutions</p>
                <h2 id="corporate-title" className="mt-2 font-display text-4xl font-bold uppercase text-ink-900">
                  Corporate <span className="text-signal-amber">Event Transport</span>
                </h2>
                <p className="mt-4 font-body text-lg text-ink-600">
                  Specialized transportation solutions for corporate events, ensuring your 
                  team and guests arrive on time and in comfort. We handle all logistics 
                  for seamless event transportation.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Conference Transport Services",
                    "Team Building Events",
                    "Business Meeting Logistics",
                    "Corporate Event Transport"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                      whileHover={{ x: 10 }}
                    >
                      <CheckCircle className="h-5 w-5 text-signal-amber" />
                      <span className="font-body text-ink-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <motion.div 
                  className="relative h-80 w-full rounded-2xl bg-gradient-to-br from-signal-amber/10 to-signal-green/10 p-1 lg:h-96"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-8">
                    <Building2 className="h-20 w-20 text-signal-amber" />
                    <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Corporate Events</h3>
                    <p className="mt-2 text-center font-body text-ink-600">
                      Professional transportation solutions for your business events
                    </p>
                    <motion.div 
                      className="mt-4 flex gap-2"
                      animate={{
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="rounded-full bg-signal-amber/20 px-4 py-1 text-sm text-signal-amber">Reliable</span>
                      <span className="rounded-full bg-signal-amber/20 px-4 py-1 text-sm text-signal-amber">Professional</span>
                      <span className="rounded-full bg-signal-amber/20 px-4 py-1 text-sm text-signal-amber">Punctual</span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="bg-gradient-to-br from-ink-900 to-ink-800 text-concrete-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          aria-labelledby="cta-title"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                id="cta-title"
                className="font-display text-4xl font-bold uppercase"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to <span className="text-signal-amber">Plan</span> Your Event Transport?
              </motion.h2>
              <motion.p 
                className="mx-auto mt-4 max-w-2xl font-body text-lg text-concrete-100/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Let us handle the logistics while you focus on making your event memorable.
                Get a free quote today!
              </motion.p>
              <motion.div 
                className="mt-8 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#quote-title"
                  className="inline-block rounded-full bg-gradient-to-r from-signal-amber to-signal-green px-8 py-3 font-body font-semibold text-white transition-colors hover:opacity-90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get a Quote
                </motion.a>
                <motion.a
                  href="/contact"
                  className="inline-block rounded-full border border-concrete-100/20 px-8 py-3 font-body font-semibold text-concrete-50 transition-colors hover:bg-concrete-50/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}