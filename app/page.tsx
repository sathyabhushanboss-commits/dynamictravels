"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import RouteDivider from "@/components/RouteDivider";
import { vehicleCategories, destinations } from "@/lib/data";

// Premium Icon Imports
import { 
  Car, Truck, Bus, Train, Plane, Bike, Ship, Sailboat,
  CarFront, BusFront, Truck as TruckIcon, TrainFront, Plane as PlaneIcon,
  Navigation, Compass, MapPin, Globe, Route, MoveRight, MoveLeft,
  Building, Building2, Home, House, School, Church, Hospital,
  Hotel, Restaurant, Store, ShoppingBag, Briefcase, Briefcase as BriefcaseIcon,
  Mountain, Trees, Tree, Flower, Sun, Moon, Sparkles, Cloud, Wind,
  Waves, Water, Droplets, Thermometer, Snowflake, Sunrise, Sunset,
  Calendar, Clock, Users, User, Users2, UserPlus, UserCheck,
  PartyPopper, Gift, Crown, Diamond, Gem, Trophy, Medal, Award,
  BadgeCheck, Star, StarHalf, Heart, ThumbsUp, Smile,
  TrendingUp, TrendingDown, LineChart, BarChart, PieChart,
  Globe2, Network, Share2, ExternalLink,
  Settings, Sliders, Filter, Edit, PenTool, Code, Terminal, Command,
  Maximize, Minimize, ZoomIn, ZoomOut, RefreshCw, Repeat, Shuffle,
  Phone, Mail, MessageCircle, MessageSquare, Send, MailOpen,
  PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneOff,
  Shield, ShieldCheck, ShieldAlert, Lock, Unlock, Key,
  CheckCircle, CheckSquare, Check, X, AlertCircle, AlertTriangle,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ArrowUpRight,
  ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  Infinity, Flame, Zap, Rocket, Coffee, Camera, Video,
  Music, Headphones, Microphone, Speaker, Volume2,
  Layers, Grid, Layout, Columns, List, Menu,
  CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog,
  CloudOff,
  Compass as CompassIcon, Anchor, Bike as BikeIcon, Footprints,
  Luggage, Backpack, Suitcase, Ticket, Receipt,
  Award as AwardIcon, TrendingUp as TrendingUpIcon, Heart as HeartIcon,
  Star as StarIcon, Users as UsersIcon, Clock as ClockIcon,
  MapPin as MapPinIcon, Globe as GlobeIcon, Building as BuildingIcon,
  Link as LinkIcon, Image as ImageIcon,
  Wifi, Coffee as CoffeeIcon, BookOpen, Compass as CompassIcon2
} from "lucide-react";

// ============================================================
// DATA DEFINITIONS
// ============================================================

// Hero Images
const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
];

// Trust Images
const trustImages = [
  { id: 1, src: "/images/trust/certified.jpg", alt: "ISO Certified" },
  { id: 2, src: "/images/trust/award-winning.jpg", alt: "Award Winning" },
  { id: 3, src: "/images/trust/safety-certified.jpg", alt: "Safety Certified" },
  { id: 4, src: "/images/trust/eco-friendly.jpg", alt: "Eco Friendly" },
];

// ============================================================
// SCROLL ANIMATION HOOK
// ============================================================
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

// ============================================================
// TOP 9 SERVICES - 3x3 Grid with Vehicle Highlight
// ============================================================
const topServices = [
  {
    id: 1,
    title: "Luxury Outstation Cabs in Urania & Cresta",
    description: "Premium outstation taxi services from Urania and Cresta to Coorg, Mysore, Ooty, Wayanad, Kerala, and 100+ destinations across South India.",
    icon: Car,
    color: "from-blue-500 to-cyan-400",
    features: ["100+ Destinations", "Luxury Fleet", "Fixed Pricing"],
    seoKeywords: "Urania outstation cabs, Cresta taxi service, luxury cabs Urania, premium taxi Cresta"
  },
  {
    id: 2,
    title: "Premium Bus Rentals in Urania & Cresta",
    description: "Luxury bus rentals from Urania and Cresta for group travel, corporate events, and large gatherings with AC, reclining seats, and entertainment.",
    icon: Bus,
    color: "from-purple-500 to-indigo-400",
    features: ["20-50 Seats", "AC Luxury Coaches", "Entertainment"],
    seoKeywords: "bus rental Urania, luxury bus Cresta, group travel Urania, event bus Cresta"
  },
  {
    id: 3,
    title: "Airport Pick & Drop from Urania & Cresta",
    description: "Premium airport transfer from Urania and Cresta with flight tracking, meet & greet, and luxury vehicles to Bangalore, Mysore, and major airports.",
    icon: Plane,
    color: "from-cyan-500 to-blue-400",
    features: ["Flight Tracking", "Meet & Greet", "Luxury Cars"],
    seoKeywords: "airport pick drop Urania, airport taxi Cresta, Bangalore airport cab Urania"
  },
  {
    id: 4,
    title: "Corporate Travel in Urania & Cresta",
    description: "Executive corporate travel from Urania and Cresta for business meetings, conferences, team events, and VIP transport with professional chauffeurs.",
    icon: Briefcase,
    color: "from-indigo-500 to-purple-400",
    features: ["Executive Fleet", "24/7 Support", "Corporate Accounts"],
    seoKeywords: "corporate travel Urania, business transport Cresta, executive car Urania"
  },
  {
    id: 5,
    title: "Wedding Transport in Urania & Cresta",
    description: "Luxury wedding car rental from Urania and Cresta with professional chauffeurs, floral decorations, and flawless execution for your special day.",
    icon: Crown,
    color: "from-pink-500 to-rose-400",
    features: ["Luxury Cars", "Chauffeur Service", "Decorations"],
    seoKeywords: "wedding car rental Urania, wedding transport Cresta, luxury wedding cars"
  },
  {
    id: 6,
    title: "Event Transport in Urania & Cresta",
    description: "Comprehensive event transport from Urania and Cresta for conferences, concerts, festivals with bulk booking, expert coordination, and real-time tracking.",
    icon: Users,
    color: "from-amber-500 to-orange-400",
    features: ["Bulk Booking", "Live Tracking", "Event Coordination"],
    seoKeywords: "event transport Urania, bulk vehicle booking Cresta, concert shuttle Urania"
  },
  {
    id: 7,
    title: "Group Tours from Urania & Cresta",
    description: "Customized group tours from Urania and Cresta for families, schools, corporate outings with vehicles, guides, meals, and accommodation included.",
    icon: Users2,
    color: "from-emerald-500 to-teal-400",
    features: ["Custom Itineraries", "Group Discounts", "Guided Tours"],
    seoKeywords: "group tours Urania, family tours Cresta, school trips Urania"
  },
  {
    id: 8,
    title: "Tempo Traveller in Urania & Cresta",
    description: "Premium tempo traveller rentals from Urania and Cresta with 9-20 seater vehicles perfect for family trips, corporate events, and airport transfers.",
    icon: BusFront,
    color: "from-green-500 to-emerald-400",
    features: ["9-20 Seats", "AC Comfort", "Group Bookings"],
    seoKeywords: "tempo traveller Urania, group transport Cresta, luxury traveller Urania"
  },
  {
    id: 9,
    title: "Chauffeur Service in Urania & Cresta",
    description: "Professional chauffeur service from Urania and Cresta with luxury vehicles for VIP visits, business executives, special occasions, and celebrity transport.",
    icon: UserCheck,
    color: "from-violet-500 to-purple-400",
    features: ["Executive Vehicles", "Professional Drivers", "VIP Service"],
    seoKeywords: "chauffeur service Urania, executive car Cresta, VIP transport Urania"
  }
];

// ============================================================
// EVENT JOURNEY STORY - 5 Steps with Urania & Cresta
// ============================================================
const eventJourney = [
  {
    step: 1,
    title: "Share Your Vision",
    description: "Tell us about your event in Urania, Cresta, or anywhere in Bangalore - the venue, number of guests, schedule, and special requirements.",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-400"
  },
  {
    step: 2,
    title: "Custom Fleet Selection",
    description: "We curate the perfect fleet for your event in Urania and Cresta - from luxury sedans to premium buses and tempo travellers.",
    icon: CarFront,
    color: "from-purple-500 to-indigo-400"
  },
  {
    step: 3,
    title: "Route & Schedule Planning",
    description: "Our logistics experts design optimal routes from Urania and Cresta, coordinating multiple pickup points across Bangalore.",
    icon: Route,
    color: "from-emerald-500 to-teal-400"
  },
  {
    step: 4,
    title: "Professional Execution",
    description: "On event day, our chauffeurs and coordinators ensure flawless execution in Urania and Cresta with real-time tracking.",
    icon: Users,
    color: "from-amber-500 to-orange-400"
  },
  {
    step: 5,
    title: "Post-Event Follow-Up",
    description: "We follow up for feedback and build lasting relationships for your future transportation needs in Urania, Cresta, and beyond.",
    icon: Heart,
    color: "from-rose-500 to-pink-400"
  }
];

// ============================================================
// LUXURY FLEET - All Vehicles Highlighted
// ============================================================
const luxuryFleet = [
  {
    name: "Mercedes-Benz S-Class",
    type: "Executive Luxury Sedan",
    capacity: "4 Seats",
    features: ["Premium Leather", "Climate Control", "Wi-Fi", "Refreshments"],
    color: "from-slate-700 to-slate-900",
    icon: Car,
    seoDescription: "Luxury sedan rental in Urania & Cresta for executive travel"
  },
  {
    name: "BMW 7 Series",
    type: "Business Class Sedan",
    capacity: "4 Seats",
    features: ["Massage Seats", "Ambient Lighting", "Privacy Glass"],
    color: "from-blue-800 to-blue-950",
    icon: CarFront,
    seoDescription: "Business class sedan hire in Urania & Cresta for corporate events"
  },
  {
    name: "Volvo XC90",
    type: "Luxury SUV",
    capacity: "7 Seats",
    features: ["Panoramic Roof", "Premium Audio", "Air Suspension"],
    color: "from-gray-700 to-gray-900",
    icon: Car,
    seoDescription: "Luxury SUV rental in Urania & Cresta for family trips"
  },
  {
    name: "Toyota Vellfire",
    type: "Executive MPV",
    capacity: "7 Seats",
    features: ["Captain Seats", "Entertainment System", "Premium Sound"],
    color: "from-zinc-700 to-zinc-900",
    icon: CarFront,
    seoDescription: "Executive MPV hire in Urania & Cresta for VIP travel"
  },
  {
    name: "Mercedes Sprinter",
    type: "Luxury Mini Bus",
    capacity: "15-20 Seats",
    features: ["Reclining Seats", "TV & Audio", "USB Charging"],
    color: "from-neutral-700 to-neutral-900",
    icon: Bus,
    seoDescription: "Luxury mini bus rental in Urania & Cresta for group travel"
  },
  {
    name: "Volvo B9R",
    type: "Premium Coach",
    capacity: "35-50 Seats",
    features: ["AC with Air Purifier", "Entertainment System", "Refreshments"],
    color: "from-stone-700 to-stone-900",
    icon: BusFront,
    seoDescription: "Premium coach hire in Urania & Cresta for large events"
  }
];

// ============================================================
// SCROLL ANIMATED COMPONENTS
// ============================================================

function ScrollFadeUp({ children, className = "", delay = 0, duration = 0.8 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

function ScrollScale({ children, className = "", delay = 0, duration = 0.8 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.85)',
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

function ScrollFlip({ children, className = "", delay = 0, duration = 0.8 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'rotateY(0)' : 'rotateY(90deg)',
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

function ScrollFloat({ children, className = "", delay = 0 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `floatPremium 3s ease-in-out ${delay}s infinite` : 'none',
        willChange: 'transform, opacity'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes floatPremium {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
      `}</style>
    </div>
  );
}

function ScrollSlideUp({ children, className = "", delay = 0, duration = 0.6 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

function ScrollGlow({ children, className = "", delay = 0, duration = 2.5 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `glowPremium ${duration}s ease-in-out ${delay}s infinite` : 'none',
        willChange: 'filter, opacity'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes glowPremium {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.2)); }
          50% { filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.5)) drop-shadow(0 0 60px rgba(245, 158, 11, 0.2)); }
        }
      `}</style>
    </div>
  );
}

function ScrollTada({ children, className = "", delay = 0 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `tadaPremium 1s ease-out ${delay}s` : 'none',
        willChange: 'transform, opacity'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes tadaPremium {
          0% { opacity: 0; transform: scale(0.8); }
          10%, 20% { opacity: 1; transform: scale(0.9) rotate(-3deg); }
          30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
          40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
          100% { transform: scale(1) rotate(0); }
        }
      `}</style>
    </div>
  );
}

function ScrollPulse({ children, className = "", delay = 0, duration = 2 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `pulsePremium ${duration}s ease-in-out ${delay}s infinite` : 'none',
        willChange: 'transform, opacity'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes pulsePremium {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function ScrollBounce({ children, className = "", delay = 0, duration = 2 }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `bouncePremium ${duration}s ease-in-out ${delay}s infinite` : 'none',
        willChange: 'transform, opacity'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes bouncePremium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// MARQUEE COMPONENT
// ============================================================
function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-signal-amber via-signal-green to-signal-amber py-3 relative">
      <div style={{
        animation: 'marqueePremium 35s linear infinite',
        display: 'flex',
        width: '200%',
      }}>
        {items.map((item, index) => (
          <span key={index} className="mx-8 font-body text-sm font-semibold text-ink-900 whitespace-nowrap tracking-wide">
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`dup-${index}`} className="mx-8 font-body text-sm font-semibold text-ink-900 whitespace-nowrap tracking-wide">
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marqueePremium {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// ANIMATED COUNTER COMPONENT
// ============================================================
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ============================================================
// FLOATING PARTICLES
// ============================================================
function FloatingParticles({ count = 30 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = 2 + Math.random() * 5;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 8;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const colors = ['bg-signal-amber/20', 'bg-signal-green/20', 'bg-white/10', 'bg-signal-amber/10'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <div
            key={i}
            className={`absolute rounded-full ${color}`}
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              animation: `floatParticlePremium ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes floatParticlePremium {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.2; }
          25% { transform: translateY(-40px) translateX(15px) scale(1.5); opacity: 0.6; }
          50% { transform: translateY(-80px) translateX(-15px) scale(0.8); opacity: 0.4; }
          75% { transform: translateY(-40px) translateX(25px) scale(1.2); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// TOP SERVICES SECTION - 3x3 Grid
// ============================================================
function TopServicesSection() {
  return (
    <section className="py-20 bg-white" aria-label="Premium Travel Services in Urania & Cresta">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollFloat delay={0}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">
              Premium Services in Urania & Cresta
            </p>
          </ScrollFloat>
          <ScrollFadeUp delay={0.2}>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink-900 sm:text-5xl">
              Comprehensive Travel <br />
              <span className="text-signal-amber">Solutions</span>
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.4}>
            <p className="mt-4 text-lg text-ink-600">
              From luxury outstation cabs to premium bus rentals and airport transfers in Urania & Cresta, 
              we deliver excellence across every travel need.
            </p>
          </ScrollFadeUp>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((service, index) => (
            <ScrollScale key={service.id} delay={index * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-concrete-100 p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-signal-amber">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`relative mb-4 inline-block rounded-xl bg-gradient-to-br ${service.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={24} />
                </div>
                
                <h3 className="font-display text-lg font-bold text-ink-900 leading-tight">
                  {service.title}
                </h3>
                
                <p className="mt-2 font-body text-sm text-ink-500 line-clamp-3">
                  {service.description}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="rounded-full bg-concrete-100 px-2.5 py-0.5 text-xs font-medium text-ink-600">
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Hidden SEO Keywords */}
                <div className="hidden" aria-hidden="true">
                  {service.seoKeywords.split(', ').map((kw, idx) => (
                    <span key={idx}>{kw}</span>
                  ))}
                </div>
                
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-signal-amber to-signal-green w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </ScrollScale>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LUXURY FLEET SECTION - 3x2 Grid
// ============================================================
function LuxuryFleetSection() {
  return (
    <section className="py-20 bg-concrete-50" aria-label="Luxury Fleet in Urania & Cresta">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollFloat delay={0}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">
              Premium Fleet in Urania & Cresta
            </p>
          </ScrollFloat>
          <ScrollFadeUp delay={0.2}>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink-900 sm:text-5xl">
              Luxury <span className="text-signal-amber">Vehicle</span> Fleet
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.4}>
            <p className="mt-4 text-lg text-ink-600">
              Experience unparalleled luxury with our premium fleet available in Urania & Cresta - 
              from executive sedans to luxury SUVs and premium buses.
            </p>
          </ScrollFadeUp>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {luxuryFleet.map((vehicle, index) => {
            const IconComponent = vehicle.icon;
            return (
              <ScrollFlip key={index} delay={index * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative h-32 rounded-xl bg-gradient-to-br from-ink-800 to-ink-900 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="h-12 w-12 text-white/80" />
                      <p className="text-xs text-white/60 mt-1">{vehicle.type}</p>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-ink-900">{vehicle.name}</h3>
                  <p className="text-sm text-ink-500">{vehicle.type}</p>
                  
                  <div className="mt-3 flex items-center gap-2 text-sm text-ink-600">
                    <Users className="h-4 w-4" />
                    <span>{vehicle.capacity}</span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <span key={idx} className="rounded-full bg-signal-amber/10 px-2.5 py-0.5 text-xs font-medium text-signal-amber">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* SEO Description */}
                  <div className="hidden" aria-hidden="true">
                    {vehicle.seoDescription}
                  </div>
                  
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-signal-amber/30 to-transparent" />
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-signal-amber">Premium in Urania & Cresta</span>
                    <span className="text-xs text-ink-400">{vehicle.capacity}</span>
                  </div>
                </div>
              </ScrollFlip>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EVENT JOURNEY SECTION - Desktop Restored, Mobile Optimized (No Loop)
// ============================================================
function EventJourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll trigger - only runs once when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimating) {
          setIsAnimating(true);
          startSequence();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startSequence = () => {
    let currentStep = 0;
    setActiveStep(0);
    
    const interval = setInterval(() => {
      if (!isPaused) {
        if (currentStep < eventJourney.length - 1) {
          currentStep++;
          setActiveStep(currentStep);
        } else {
          clearInterval(interval);
          // Stop at the last step - no loop
        }
      }
    }, 3000);

    intervalRef.current = interval;
  };

  const currentStep = eventJourney[activeStep];
  const progress = ((activeStep + 1) / eventJourney.length) * 100;

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden" aria-label="Event Journey in Urania & Cresta">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <ScrollFloat delay={0}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">
              Your Journey With Us
            </p>
          </ScrollFloat>
          <ScrollFadeUp delay={0.2}>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink-900 sm:text-5xl">
              From <span className="text-signal-amber">Vision</span> to <br />
              <span className="text-signal-amber">Flawless</span> Execution
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.4}>
            <p className="mt-4 text-lg text-ink-600 max-w-2xl mx-auto">
              Every successful event transport in <strong className="text-signal-amber">Urania</strong> and <strong className="text-signal-amber">Cresta</strong> 
              begins with a vision and ends with a flawless execution.
            </p>
          </ScrollFadeUp>
        </div>

        {/* Desktop: Vertical Pole with Cards */}
        <div className="hidden sm:block">
          <div className="relative flex items-start gap-8">
            {/* Vertical Timeline Pole - Left Side */}
            <div className="relative flex flex-col items-center w-16 flex-shrink-0">
              {/* Pole Container */}
              <div className="relative flex flex-col items-center" style={{ minHeight: `${eventJourney.length * 120}px` }}>
                {/* Pole Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-concrete-200 rounded-full">
                  {/* Progress Fill */}
                  <div 
                    className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-signal-amber to-signal-green transition-all duration-1000"
                    style={{ height: `${progress}%` }}
                  />
                </div>

                {/* Step Indicators on Pole */}
                {eventJourney.map((step, index) => {
                  const isActive = index <= activeStep;
                  const isCurrent = index === activeStep;
                  
                  return (
                    <div
                      key={step.step}
                      className="relative z-10"
                      style={{ 
                        marginTop: index === 0 ? '0' : 'auto',
                        marginBottom: index === eventJourney.length - 1 ? '0' : 'auto',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div 
                        className={`
                          flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 cursor-pointer
                          ${isActive ? 'bg-gradient-to-r from-signal-amber to-signal-green text-white shadow-lg scale-110' : 'bg-concrete-200 text-ink-400'}
                          ${isCurrent ? 'ring-4 ring-signal-amber/30 animate-pulse' : ''}
                        `}
                        onClick={() => {
                          setActiveStep(index);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                      >
                        {step.step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cards Container */}
            <div className="flex-1 pt-2">
              {eventJourney.map((step, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;
                const isPrevious = index < activeStep;
                
                return (
                  <div
                    key={step.step}
                    className={`
                      transition-all duration-700 ease-in-out
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'}
                      ${isPrevious ? 'opacity-70 scale-[0.97]' : ''}
                      ${isCurrent ? 'scale-100' : ''}
                      mb-6 last:mb-0
                    `}
                    style={{ 
                      transitionDelay: `${index * 0.15}s`,
                      minHeight: '100px'
                    }}
                  >
                    <div className={`
                      group relative overflow-hidden rounded-2xl bg-white border-2 p-6 shadow-md transition-all duration-500
                      ${isCurrent ? 'border-signal-amber shadow-xl scale-100' : 'border-concrete-200 shadow-sm'}
                      ${isPrevious ? 'hover:shadow-lg' : ''}
                    `}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`} />
                      
                      <div className="flex items-start gap-4">
                        {/* Step Number Badge */}
                        <div className="flex-shrink-0">
                          <div className={`
                            flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300
                            ${isCurrent ? 'bg-gradient-to-r from-signal-amber to-signal-green text-white shadow-lg' : 'bg-concrete-100 text-ink-500'}
                          `}>
                            {step.step}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className={`
                              font-display text-lg font-bold transition-colors duration-300
                              ${isCurrent ? 'text-ink-900' : 'text-ink-600'}
                            `}>
                              {step.title}
                            </h3>
                            {isCurrent && (
                              <span className="text-xs font-medium text-signal-amber animate-pulse">Active</span>
                            )}
                            {isPrevious && (
                              <span className="text-xs font-medium text-signal-green">Complete</span>
                            )}
                            {!isActive && !isCurrent && (
                              <span className="text-xs font-medium text-ink-400">Pending</span>
                            )}
                          </div>
                          
                          <p className={`
                            font-body text-sm transition-colors duration-300
                            ${isCurrent ? 'text-ink-600' : 'text-ink-500'}
                          `}>
                            {step.description}
                          </p>

                          {/* Progress indicator for current step */}
                          {isCurrent && (
                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex-1 h-1 bg-concrete-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-signal-amber to-signal-green rounded-full transition-all duration-1000"
                                  style={{ width: `${((activeStep + 1) / eventJourney.length) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-signal-amber whitespace-nowrap">
                                Step {activeStep + 1} of {eventJourney.length}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Icon */}
                        <div className={`flex-shrink-0 transition-all duration-300 ${isCurrent ? 'scale-110' : 'scale-90 opacity-50'}`}>
                          <div className={`inline-block rounded-xl bg-gradient-to-r ${step.color} p-2 text-white shadow-lg`}>
                            <step.icon size={20} />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Progress Bar */}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-signal-amber to-signal-green transition-all duration-1000" style={{ width: isActive ? `${((index + 1) / eventJourney.length) * 100}%` : '0%' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Pole with Cards (Headings Only) */}
        <div className="block sm:hidden">
          <div className="relative flex flex-col items-start gap-4">
            {/* Horizontal Timeline Pole - Top */}
            <div className="relative flex flex-row items-center w-full">
              {/* Horizontal Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-concrete-200 rounded-full">
                {/* Progress Fill - Horizontal */}
                <div 
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-signal-amber to-signal-green transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Step Indicators - Horizontal */}
              <div className="relative flex flex-row items-center justify-between w-full z-10 px-2">
                {eventJourney.map((step, index) => {
                  const isActive = index <= activeStep;
                  const isCurrent = index === activeStep;
                  
                  return (
                    <div
                      key={step.step}
                      className="flex items-center justify-center"
                      style={{ width: `${100 / eventJourney.length}%` }}
                    >
                      <div 
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 cursor-pointer
                          ${isActive ? 'bg-gradient-to-r from-signal-amber to-signal-green text-white shadow-lg scale-110' : 'bg-concrete-200 text-ink-400'}
                          ${isCurrent ? 'ring-4 ring-signal-amber/30 animate-pulse' : ''}
                        `}
                        onClick={() => {
                          setActiveStep(index);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                      >
                        {step.step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Cards - Headings Only */}
            <div className="w-full pt-2">
              {eventJourney.map((step, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;
                const isPrevious = index < activeStep;
                
                return (
                  <div
                    key={step.step}
                    className={`
                      transition-all duration-700 ease-in-out
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}
                      ${isPrevious ? 'opacity-70 scale-[0.97]' : ''}
                      ${isCurrent ? 'scale-100' : ''}
                      mb-3 last:mb-0
                    `}
                    style={{ 
                      transitionDelay: `${index * 0.15}s`,
                      minHeight: '50px'
                    }}
                  >
                    <div className={`
                      group relative overflow-hidden rounded-xl bg-white border p-3 shadow-md transition-all duration-500
                      ${isCurrent ? 'border-signal-amber shadow-xl scale-100' : 'border-concrete-200 shadow-sm'}
                      ${isPrevious ? 'hover:shadow-lg' : ''}
                    `}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`} />
                      
                      <div className="flex items-center gap-3">
                        {/* Mobile: Show step number badge only on current */}
                        <div className="flex-shrink-0">
                          {isCurrent && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-signal-amber to-signal-green text-white text-xs font-bold shadow-lg">
                              {step.step}
                            </div>
                          )}
                          {!isCurrent && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-concrete-100 text-ink-400 text-xs font-bold">
                              {step.step}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`
                              font-display text-sm font-bold transition-colors duration-300 truncate
                              ${isCurrent ? 'text-ink-900' : 'text-ink-600'}
                            `}>
                              {step.title}
                            </h3>
                            {isCurrent && (
                              <span className="text-[10px] font-medium text-signal-amber animate-pulse">Active</span>
                            )}
                            {isPrevious && (
                              <span className="text-[10px] font-medium text-signal-green">✓</span>
                            )}
                          </div>
                          
                          {/* Mobile progress indicator */}
                          {isCurrent && (
                            <div className="mt-1 flex items-center gap-2">
                              <div className="flex-1 h-0.5 bg-concrete-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-signal-amber to-signal-green rounded-full transition-all duration-1000"
                                  style={{ width: `${((activeStep + 1) / eventJourney.length) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-medium text-signal-amber whitespace-nowrap">
                                {activeStep + 1}/{eventJourney.length}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Icon - Smaller on mobile */}
                        <div className={`flex-shrink-0 transition-all duration-300 ${isCurrent ? 'scale-110' : 'scale-90 opacity-50'}`}>
                          <div className={`inline-block rounded-lg bg-gradient-to-r ${step.color} p-1.5 text-white shadow-lg`}>
                            <step.icon size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Progress Bar */}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-signal-amber to-signal-green transition-all duration-1000" style={{ width: isActive ? `${((index + 1) / eventJourney.length) * 100}%` : '0%' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Urania & Cresta Highlight Badge */}
        <ScrollFadeUp delay={0.3}>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-signal-amber/10 to-signal-green/10 px-6 py-3 border border-signal-amber/20">
              <span className="text-sm font-semibold text-ink-700">Premium Services in</span>
              <span className="rounded-full bg-signal-amber px-3 py-1 text-xs font-bold text-white">Urania</span>
              <span className="text-ink-400">&</span>
              <span className="rounded-full bg-signal-green px-3 py-1 text-xs font-bold text-white">Cresta</span>
            </div>
          </div>
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.5}>
          <div className="mt-8 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-amber to-signal-green px-8 py-3 font-body font-semibold text-ink-900 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Event Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}

// ============================================================
// STATS COUNTER SECTION
// ============================================================
function StatsSection() {
  const stats = [
    { value: 500, label: "Happy Clients in Urania & Cresta", suffix: "+", color: "text-signal-amber" },
    { value: 98, label: "Satisfaction Rate", suffix: "%", color: "text-signal-green" },
    { value: 200, label: "Luxury Vehicles in Urania & Cresta", suffix: "+", color: "text-signal-amber" },
    { value: 100, label: "Destinations from Urania & Cresta", suffix: "+", color: "text-signal-green" },
  ];

  return (
    <section className="bg-gradient-to-r from-signal-amber/5 via-signal-green/5 to-signal-amber/5 py-16 border-y border-signal-amber/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollPulse key={index} delay={index * 0.1}>
              <div className="text-center group">
                <p className={`font-display text-5xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 font-body text-sm text-ink-500">{stat.label}</p>
              </div>
            </ScrollPulse>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA SECTION
// ============================================================
function CTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 overflow-hidden">
      <FloatingParticles count={20} />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-signal-amber/10 via-transparent to-signal-green/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal-amber to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal-green to-transparent" />
      </div>

      <div className="relative">
        <ScrollGlow delay={0} duration={2.5}>
          <h2 className="font-display text-4xl font-bold uppercase text-ink-900 sm:text-5xl">
            Ready to Experience <br />
            <span className="text-signal-amber">Premium Travel</span> in Urania & Cresta?
          </h2>
        </ScrollGlow>
        
        <ScrollFadeUp delay={0.3}>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-ink-500">
            Choose from our premium fleet available in Urania & Cresta, enter your destination, 
            and get the fare instantly. Experience luxury travel like never before.
          </p>
        </ScrollFadeUp>
        
        <ScrollTada delay={0.6}>
          <Link
            href="/fare-calculator"
            className="group relative mt-8 inline-block overflow-hidden rounded-full bg-gradient-to-r from-signal-amber to-signal-green px-10 py-4 font-display text-lg font-semibold uppercase tracking-wide text-ink-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Book Now in Urania & Cresta</span>
            <div className="absolute inset-0 bg-gradient-to-r from-signal-green to-signal-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </ScrollTada>
        
        <ScrollSlideUp delay={0.9}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-signal-amber/10 px-5 py-2.5 text-sm font-medium text-signal-amber border border-signal-amber/20">
              <Car className="inline h-4 w-4 mr-2" />
              Luxury Cabs in Urania
            </span>
            <span className="rounded-full bg-signal-amber/10 px-5 py-2.5 text-sm font-medium text-signal-amber border border-signal-amber/20">
              <Bus className="inline h-4 w-4 mr-2" />
              Premium Buses in Cresta
            </span>
            <span className="rounded-full bg-signal-green/10 px-5 py-2.5 text-sm font-medium text-signal-green border border-signal-green/20">
              <StarIcon className="inline h-4 w-4 mr-2" />
              4.8/5 Rating in Urania & Cresta
            </span>
            <span className="rounded-full bg-signal-green/10 px-5 py-2.5 text-sm font-medium text-signal-green border border-signal-green/20">
              <AwardIcon className="inline h-4 w-4 mr-2" />
              Award Winning Service
            </span>
            <span className="rounded-full bg-signal-amber/10 px-5 py-2.5 text-sm font-medium text-signal-amber border border-signal-amber/20">
              <ShieldCheck className="inline h-4 w-4 mr-2" />
              Safety Certified
            </span>
          </div>
        </ScrollSlideUp>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE ITEMS
// ============================================================
const marqueeItems = [
  "Premium Tours and Travels in Urania & Cresta",
  "Luxury Outstation Cabs in Urania & Cresta",
  "Premium Bus Rentals in Urania & Cresta",
  "Airport Pick & Drop in Urania & Cresta",
  "Corporate Travel Solutions in Urania & Cresta",
  "Wedding Transport Services in Urania & Cresta",
  "Event Transport Solutions in Urania & Cresta",
  "Group Tour Packages from Urania & Cresta",
  "Tempo Traveller Rentals in Urania & Cresta",
  "Executive Chauffeur Service in Urania & Cresta",
  "500+ Happy Clients in Urania & Cresta",
  "98% Satisfaction Rate",
  "200+ Luxury Vehicles in Urania & Cresta",
  "100+ Destinations from Urania & Cresta",
  "24/7 Premium Support in Urania & Cresta",
  "Award-Winning Service in Urania & Cresta",
  "Trusted by Industry Leaders in Urania & Cresta"
];

// ============================================================
// MAIN HOME PAGE
// ============================================================
export default function HomePage() {
  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Dynamic Travels - Premium Tours and Travels in Urania & Cresta",
    "description": "Dynamic Travels offers premium outstation cabs, luxury bus rentals, airport pick & drop, corporate travel, wedding transport, event solutions, and group tour packages in Urania and Cresta, Bangalore.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Urania & Cresta",
      "addressRegion": "Bangalore",
      "addressCountry": "India"
    },
    "priceRange": "₹₹₹",
    "telephone": "+91 98450 12345",
    "openingHours": "Mo-Su 06:00-23:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500"
    },
    "areaServed": [
      "Urania",
      "Cresta",
      "Bangalore",
      "Coorg",
      "Mysore",
      "Ooty",
      "Wayanad",
      "Kerala",
      "Karnataka",
      "Tamil Nadu"
    ]
  };

  const seoKeywords = [
    "premium outstation cabs in Urania",
    "luxury bus rental in Cresta",
    "airport pick and drop in Urania",
    "corporate travel solutions in Cresta",
    "wedding transport services in Urania",
    "event transport solutions in Cresta",
    "group tour packages from Urania",
    "tempo traveller rental in Cresta",
    "executive chauffeur service in Urania",
    "luxury car rental in Cresta",
    "premium taxi service in Urania",
    "best travel agency in Cresta",
    "tours and travels in Urania",
    "cab service in Cresta",
    "Urania to Coorg taxi",
    "Cresta to Mysore cab",
    "Urania to Ooty travel",
    "Cresta to Bangalore airport taxi"
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />
      
      <div className="hidden" aria-hidden="true">
        {seoKeywords.map((keyword, index) => (
          <span key={index}>{keyword}</span>
        ))}
      </div>

      <div className="premium-container">
        <Marquee items={marqueeItems} />

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 text-concrete-50 overflow-hidden">
          <FloatingParticles count={40} />
          
          <div className="absolute inset-0 opacity-15 bg-ink-800">
            <div className="relative w-full h-full">
              <Image
                src="/images/hero/hero-bg.jpg"
                alt="Premium Tours and Travels in Urania & Cresta - Dynamic Travels"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/30" />

          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <ScrollFloat delay={0.2}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-signal-amber/10 px-4 py-1.5 border border-signal-amber/20">
                    <span className="h-2 w-2 rounded-full bg-signal-amber animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">
                      #1 Premium Travel Services in Urania & Cresta
                    </span>
                  </div>
                </ScrollFloat>
                
                <ScrollFadeUp delay={0.3}>
                  <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                    Luxury Travel in <br />
                    <span className="text-signal-amber">Urania & Cresta</span>
                    <br />
                    <span className="text-concrete-50/80">Premium Service Every Journey</span>
                  </h1>
                </ScrollFadeUp>
                
                <ScrollFadeUp delay={0.4}>
                  <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80">
                    Dynamic Travels is your premier travel partner in Urania and Cresta, offering luxury outstation cabs, 
                    premium bus rentals, airport pick & drop, corporate travel solutions, and event transport services 
                    with professional chauffeurs and a premium fleet.
                  </p>
                </ScrollFadeUp>
                
                <ScrollFadeUp delay={0.5}>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href="/fare-calculator"
                      className="group relative overflow-hidden rounded-sm bg-gradient-to-r from-signal-amber to-signal-green px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-ink-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <span className="relative z-10">Book Now in Urania & Cresta</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-signal-green to-signal-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                    <Link
                      href="/fleet"
                      className="rounded-sm border border-concrete-100/30 px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-concrete-50 transition-all duration-300 hover:border-concrete-100/60 hover:scale-105 hover:bg-concrete-50/10"
                    >
                      Explore Fleet in Urania & Cresta
                    </Link>
                  </div>
                </ScrollFadeUp>

                <ScrollSlideUp delay={0.6}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="rounded-full bg-signal-amber/10 px-4 py-2 text-xs font-medium text-signal-amber border border-signal-amber/20 backdrop-blur-sm">
                      <Car className="inline h-3 w-3 mr-1" />
                      Luxury Cabs in Urania
                    </span>
                    <span className="rounded-full bg-signal-amber/10 px-4 py-2 text-xs font-medium text-signal-amber border border-signal-amber/20 backdrop-blur-sm">
                      <Bus className="inline h-3 w-3 mr-1" />
                      Premium Buses in Cresta
                    </span>
                    <span className="rounded-full bg-signal-green/10 px-4 py-2 text-xs font-medium text-signal-green border border-signal-green/20 backdrop-blur-sm">
                      <StarIcon className="inline h-3 w-3 mr-1" />
                      4.8/5 Rating
                    </span>
                    <span className="rounded-full bg-signal-green/10 px-4 py-2 text-xs font-medium text-signal-green border border-signal-green/20 backdrop-blur-sm">
                      <AwardIcon className="inline h-3 w-3 mr-1" />
                      Award Winning
                    </span>
                  </div>
                </ScrollSlideUp>
              </div>

              <div className="hidden lg:grid grid-cols-3 gap-3">
                {heroImages.map((src, index) => (
                  <ScrollFloat key={index} delay={index * 0.3}>
                    <div className="relative h-40 rounded-xl overflow-hidden bg-ink-700 shadow-2xl">
                      <Image
                        src={src}
                        alt={`Premium tour from Urania & Cresta to ${index === 0 ? 'Coorg' : index === 1 ? 'Mysore' : 'Ooty'}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-medium text-concrete-100/80">
                          {index === 0 ? 'Coorg' : index === 1 ? 'Mysore' : 'Ooty'}
                        </span>
                      </div>
                    </div>
                  </ScrollFloat>
                ))}
              </div>
            </div>

            <ScrollSlideUp delay={0.8}>
              <div className="mt-16">
                <RouteDivider label="Urania & Cresta | Luxury Travel | Premium Service | Every Journey" />
              </div>
            </ScrollSlideUp>
          </div>
        </section>

        {/* TOP SERVICES */}
        <TopServicesSection />

        {/* LUXURY FLEET */}
        <LuxuryFleetSection />

        {/* EVENT JOURNEY - Restored Desktop with No Loop */}
        <EventJourneySection />

        {/* STATS */}
        <StatsSection />

        {/* TRUST BADGES */}
        <section className="bg-white py-12 border-b border-ink-100">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {trustImages.map((img, index) => (
                <ScrollFlip key={img.id} delay={index * 0.1}>
                  <div className="flex flex-col items-center gap-3 group">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden bg-concrete-100 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl">
                      <Image 
                        src={img.src} 
                        alt={`Premium ${img.alt} in Urania & Cresta`}
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="font-body text-sm font-medium text-ink-600 group-hover:text-signal-amber transition-colors duration-300">{img.alt}</span>
                  </div>
                </ScrollFlip>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </>
  );
}