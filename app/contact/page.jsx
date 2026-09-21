"use client";

import { useState, useEffect, useRef } from "react";
import RouteDivider from "@/components/RouteDivider";
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  ArrowRight, Star, Award, ShieldCheck, Car, Bus, 
  Users, Calendar, MessageCircle, User, FileText,
  ChevronRight, Globe, Heart, ThumbsUp, Sparkles,
  Crown, Diamond, Infinity, Flame, Rocket, Zap,
  Headphones, MessageSquare, MailCheck, PhoneCall,
  Navigation, Compass, Route, Map, Building, Home,
  Coffee, Camera, Video, Music, Gift, PartyPopper,
  Trophy, Medal, BadgeCheck, StarHalf, Smile, HandHeart,
  Plane, Briefcase, Users2, UserCheck, BusFront, CarFront,
  Users as UsersIcon, Clock as ClockIcon, MapPin as MapPinIcon,
  Phone as PhoneIcon, Mail as MailIcon, Check as CheckIcon,
  Award as AwardIcon, MessageCircle as WhatsAppIcon
} from "lucide-react";

// ============================================================
// SCROLL ANIMATION HOOK
// ============================================================
function useScrollAnimation() {
  const ref = useRef(null);
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
// ANIMATION COMPONENTS
// ============================================================

// 1. Fade Up with Scroll
function ScrollFadeUp({ children, className = "", delay = 0, duration = 0.8 }) {
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

// 2. Float with Scroll - Loop Animation
function ScrollFloat({ children, className = "", delay = 0 }) {
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

// 3. Scale with Scroll
function ScrollScale({ children, className = "", delay = 0, duration = 0.6 }) {
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

// 4. Slide Up with Scroll
function ScrollSlideUp({ children, className = "", delay = 0, duration = 0.6 }) {
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

// 5. Glow with Scroll - Loop Animation
function ScrollGlow({ children, className = "", delay = 0, duration = 2.5 }) {
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
          0%, 100% { filter: drop-shadow(0 0 10px rgba(201, 162, 39, 0.2)); }
          50% { filter: drop-shadow(0 0 30px rgba(201, 162, 39, 0.5)) drop-shadow(0 0 60px rgba(37, 99, 235, 0.2)); }
        }
      `}</style>
    </div>
  );
}

// 6. Pulse with Scroll - Loop Animation
function ScrollPulse({ children, className = "", delay = 0, duration = 2 }) {
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

// 7. Tada with Scroll - Loop Animation
function ScrollTada({ children, className = "", delay = 0 }) {
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

// 8. Bounce with Scroll - Loop Animation
function ScrollBounce({ children, className = "", delay = 0, duration = 2 }) {
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

// 9. Shimmer with Scroll - Loop Animation
function ScrollShimmer({ children, className = "" }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'opacity'
      }}
    >
      {children}
      {isVisible && (
        <div className="shimmer-overlay" />
      )}
      <style jsx>{`
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.15) 25%, 
            transparent 50%,
            rgba(255,255,255,0.15) 75%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmerPremium 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmerPremium {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// 10. Flip with Scroll
function ScrollFlip({ children, className = "", delay = 0, duration = 0.6 }) {
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

// ============================================================
// FLOATING PARTICLES
// ============================================================
function FloatingParticles({ count = 20 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = 2 + Math.random() * 4;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 6;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const colors = ['bg-[#C9A227]/20', 'bg-blue-500/20', 'bg-white/40', 'bg-[#C9A227]/10'];
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
// PREMIUM CONTACT PAGE
// ============================================================
export default function ContactPage() {
  // Form state - all empty by default
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    travelDate: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const { name, phone, pickup, destination, travelDate, message } = formData;
    
    // Format the message for WhatsApp
    const whatsappMessage = `*🚗 Premium Booking Enquiry - Dynamic Travels*\n\n` +
      `*👤 Name:* ${name || 'Not provided'}\n` +
      `*📱 Phone:* ${phone || 'Not provided'}\n` +
      `*📍 Pickup Location:* ${pickup || 'Not provided'}\n` +
      `*🎯 Destination:* ${destination || 'Not provided'}\n` +
      `*📅 Travel Date:* ${travelDate || 'Not provided'}\n` +
      `*📝 Special Requirements:* ${message || 'None'}\n\n` +
      `*🌟 Service:* Premium Luxury Travel in Bangalore`;
    
    // WhatsApp API URL - replacing with your number
    const phoneNumber = '917349016519'; // Remove + and spaces, keep only digits
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
  };

  // SEO Keywords
  const seoKeywords = [
    "premium contact dynamic travels",
    "book cab in Bangalore",
    "luxury transport enquiry Bangalore",
    "corporate travel booking",
    "premium chauffeur service contact",
    "24/7 travel support Bangalore",
    "executive car rental Bangalore",
    "best travel agency contact",
    "premium outstation cab booking",
    "event transport enquiry",
    "wedding car rental contact",
    "airport transfer booking",
    "group tour package enquiry",
    "tempo traveller rental contact",
    "luxury bus hire Bangalore"
  ];

  return (
    <>
      {/* Hidden SEO Keywords */}
      <div className="hidden" aria-hidden="true">
        {seoKeywords.map((keyword, index) => (
          <span key={index}>{keyword}</span>
        ))}
      </div>

      <div className="bg-white overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-white via-[#EEF6FF] to-[#FFF8E7] text-[#172033] overflow-hidden">
          <FloatingParticles count={30} />

          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#FFF8E7] blur-3xl pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <ScrollFloat delay={0.2}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 border border-[#C9A227]/30 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-[#C9A227] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9A227]">
                      Premium Contact - Bangalore
                    </span>
                  </div>
                </ScrollFloat>
                
                <ScrollFadeUp delay={0.3}>
                  <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                    Let's Plan Your <br />
                    <span className="text-[#C9A227]">Premium Journey</span>
                    <br />
                    <span className="text-blue-600 text-2xl sm:text-3xl">from Bangalore</span>
                  </h1>
                </ScrollFadeUp>
                
                <ScrollFadeUp delay={0.4}>
                  <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-slate-500">
                    Reach out to our premium concierge team in Bangalore for luxury outstation cabs,
                    executive bus rentals, airport transfers, corporate travel, and event transport solutions.
                    Experience unparalleled service across Bangalore and South India.
                  </p>
                </ScrollFadeUp>
                
                <ScrollFadeUp delay={0.5}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#C9A227] border border-[#C9A227]/25 shadow-sm">
                      <Car className="inline h-3 w-3 mr-1" />
                      Luxury Cabs in Bangalore
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#C9A227] border border-[#C9A227]/25 shadow-sm">
                      <Bus className="inline h-3 w-3 mr-1" />
                      Premium Buses
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600/20 shadow-sm">
                      <Star className="inline h-3 w-3 mr-1" />
                      4.8/5 Rating
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600/20 shadow-sm">
                      <Award className="inline h-3 w-3 mr-1" />
                      Award Winning
                    </span>
                  </div>
                </ScrollFadeUp>
              </div>

              <div className="hidden lg:grid grid-cols-3 gap-4">
                {[
                  { icon: Car, label: "Luxury Cabs" },
                  { icon: Bus, label: "Premium Buses" },
                  { icon: Crown, label: "Wedding Transport" },
                  { icon: Plane, label: "Airport Transfers" },
                  { icon: Briefcase, label: "Corporate Travel" },
                  { icon: Users, label: "Event Transport" },
                  { icon: Users2, label: "Group Tours" },
                  { icon: BusFront, label: "Tempo Traveller" },
                  { icon: UserCheck, label: "Chauffeur Service" }
                ].map((item, index) => (
                  <ScrollFloat key={index} delay={index * 0.12}>
                    <div className="group relative h-32 rounded-[24px] overflow-hidden bg-white shadow-[0_10px_30px_-12px_rgba(23,32,51,0.15)] border border-slate-100 flex items-center justify-center transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(201,162,39,0.25)] hover:-translate-y-1">
                      <div className="text-center">
                        <item.icon className="h-9 w-9 text-[#C9A227] mx-auto" strokeWidth={1.75} />
                        <p className="text-xs font-semibold text-[#172033] mt-3">{item.label}</p>
                      </div>
                    </div>
                  </ScrollFloat>
                ))}
              </div>
            </div>

            <ScrollSlideUp delay={0.8}>
              <div className="mt-16">
                <RouteDivider label="Premium Concierge | Bangalore | 24/7 Support" />
              </div>
            </ScrollSlideUp>
          </div>
        </section>

        {/* CONTACT FORM & INFO SECTION */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* LEFT - Contact Form */}
              <div>
                <ScrollFadeUp delay={0.1}>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9A227]">
                    Premium Booking
                  </p>
                </ScrollFadeUp>
                <ScrollFadeUp delay={0.2}>
                  <h2 className="mt-2 font-display text-4xl font-bold uppercase text-[#172033]">
                    Book Your <span className="text-[#C9A227]">Premium</span> Ride
                  </h2>
                </ScrollFadeUp>
                <ScrollFadeUp delay={0.3}>
                  <p className="mt-3 font-body text-slate-600">
                    Complete the form below and our premium concierge team in Bangalore
                    will confirm your luxury vehicle and fare instantly.
                  </p>
                </ScrollFadeUp>

                {/* Premium Features List */}
                <ScrollScale delay={0.4}>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      "Luxury Fleet in Bangalore",
                      "Premium Bus Rentals",
                      "24/7 Concierge Support",
                      "Instant Confirmation"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-blue-600" />
                        <span className="font-body text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </ScrollScale>

                <ScrollScale delay={0.5}>
                  <form onSubmit={handleWhatsAppSubmit} className="mt-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                          Full Name
                        </label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            placeholder="Your full name"
                            className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300" 
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                          Phone Number
                        </label>
                        <div className="relative mt-2">
                          <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                            placeholder="Your phone number"
                            className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="pickup" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                          Pickup Location
                        </label>
                        <div className="relative mt-2">
                          <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input 
                            id="pickup" 
                            name="pickup" 
                            value={formData.pickup}
                            onChange={handleChange}
                            placeholder="Your pickup location"
                            className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300" 
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="destination" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                          Destination
                        </label>
                        <div className="relative mt-2">
                          <Navigation className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input 
                            id="destination" 
                            name="destination" 
                            value={formData.destination}
                            onChange={handleChange}
                            required 
                            placeholder="Your destination"
                            className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300" 
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="travelDate" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                        Travel Date
                      </label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input 
                          id="travelDate" 
                          name="travelDate" 
                          type="date"
                          value={formData.travelDate}
                          onChange={handleChange}
                          required
                          className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300" 
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                        Special Requirements
                      </label>
                      <div className="relative mt-2">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={4} 
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any special requirements for your premium journey..."
                          className="w-full border border-slate-100 bg-[#F3F7FA] pl-10 pr-4 py-3 font-body outline-none focus:border-[#C9A227] rounded-lg transition-colors duration-300 resize-none" 
                        />
                      </div>
                    </div>

                    <ScrollTada delay={0.3}>
                      <button 
                        type="submit" 
                        className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-600/20 transition-shadow duration-300 hover:shadow-xl"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <WhatsAppIcon className="h-5 w-5" />
                          Send via WhatsApp
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </button>
                    </ScrollTada>
                    <p className="font-body text-xs text-slate-500 text-center">
                      Our premium concierge team will respond within 15 minutes via WhatsApp
                    </p>
                  </form>
                </ScrollScale>
              </div>

              {/* RIGHT - Contact Info */}
              <div>
                <ScrollFadeUp delay={0.2}>
                  <RouteDivider label="Premium Concierge" />
                </ScrollFadeUp>
                
                <ScrollFadeUp delay={0.3}>
                  <div className="mt-8 space-y-6">
                    {/* Premium Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "500+", label: "Happy Clients", icon: UsersIcon },
                        { value: "98%", label: "Satisfaction", icon: Heart },
                        { value: "200+", label: "Luxury Vehicles", icon: Car },
                        { value: "100+", label: "Destinations", icon: Globe }
                      ].map((stat, idx) => (
                        <ScrollScale key={idx} delay={idx * 0.1}>
                          <div className="rounded-xl bg-[#F3F7FA] p-4 text-center group hover:bg-[#C9A227]/5 transition-colors duration-300">
                            <stat.icon className="h-6 w-6 text-[#C9A227] mx-auto group-hover:scale-110 transition-transform duration-300" />
                            <p className="mt-2 font-display text-2xl font-bold text-[#172033]">{stat.value}</p>
                            <p className="text-xs text-slate-500">{stat.label}</p>
                          </div>
                        </ScrollScale>
                      ))}
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                      {[
                        { icon: PhoneIcon, label: "Phone", value: "+91 734 901 6519", description: "24/7 Premium Support" },
                        { icon: MailIcon, label: "Email", value: "premium@dynamictravels.com", description: "Bangalore Concierge" },
                        { icon: MapPinIcon, label: "Office", value: "Bangalore, Karnataka", description: "Premium Service Areas" },
                        { icon: ClockIcon, label: "Hours", value: "6:00 AM - 11:00 PM", description: "Daily. Trips run 24/7" }
                      ].map((item, idx) => (
                        <ScrollSlideUp key={idx} delay={idx * 0.1}>
                          <div className="group flex items-start gap-4 rounded-xl border border-slate-100 p-5 hover:border-[#C9A227]/50 transition-all duration-300 hover:shadow-lg">
                            <div className="rounded-full bg-gradient-to-br from-[#C9A227]/10 to-blue-500/10 p-3 group-hover:scale-110 transition-transform duration-300">
                              <item.icon className="h-5 w-5 text-[#C9A227]" />
                            </div>
                            <div>
                              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                              <p className="font-display text-lg font-bold text-[#172033]">{item.value}</p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                          </div>
                        </ScrollSlideUp>
                      ))}
                    </div>

                    {/* Premium Trust Badges */}
                    <ScrollFlip delay={0.5}>
                      <div className="rounded-xl bg-gradient-to-r from-[#C9A227]/5 to-blue-500/5 p-6 border border-[#C9A227]/10">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          {[
                            { icon: ShieldCheck, label: "ISO Certified" },
                            { icon: BadgeCheck, label: "Verified Service" },
                            { icon: Award, label: "Award Winning" },
                            { icon: Star, label: "4.8/5 Rating" }
                          ].map((item, idx) => (
                            <ScrollPulse key={idx} delay={idx * 0.1} duration={2}>
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-[#C9A227]" />
                                <span className="text-xs font-medium text-slate-600">{item.label}</span>
                              </div>
                            </ScrollPulse>
                          ))}
                        </div>
                      </div>
                    </ScrollFlip>
                  </div>
                </ScrollFadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#EEF6FF] to-[#FFF8E7]" />
          <FloatingParticles count={20} />
          
          <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8">
            <ScrollGlow delay={0} duration={2.5}>
              <h2 className="font-display text-4xl font-bold uppercase text-[#172033] sm:text-5xl">
                Ready for <span className="text-[#C9A227]">Premium</span> Travel <br />
                in Bangalore?
              </h2>
            </ScrollGlow>
            
            <ScrollFadeUp delay={0.3}>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-slate-500">
                Experience unparalleled luxury with our premium fleet. Contact our concierge team
                in Bangalore for instant bookings and personalized service.
              </p>
            </ScrollFadeUp>
            
            <ScrollTada delay={0.6}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+917349016519"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-white shadow-xl shadow-blue-600/25 transition-shadow duration-300 hover:shadow-2xl"
                >
                  <PhoneIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">Call Premium Concierge</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <a
                  href="https://wa.me/917349016519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-[#172033] transition-shadow duration-300 hover:border-[#C9A227]/50 hover:shadow-lg"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#C9A227]" />
                  WhatsApp Us
                </a>
                <a
                  href="mailto:premium@dynamictravels.com"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm px-8 py-4 font-display text-base font-semibold uppercase tracking-wide text-[#172033] transition-shadow duration-300 hover:border-[#C9A227]/50 hover:shadow-lg"
                >
                  <MailIcon className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </ScrollTada>

            <ScrollSlideUp delay={0.9}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <span className="rounded-full bg-[#C9A227]/10 px-5 py-2.5 text-sm font-medium text-[#C9A227] border border-[#C9A227]/20">
                  <Car className="inline h-4 w-4 mr-2" />
                  Luxury Cabs in Bangalore
                </span>
                <span className="rounded-full bg-[#C9A227]/10 px-5 py-2.5 text-sm font-medium text-[#C9A227] border border-[#C9A227]/20">
                  <Bus className="inline h-4 w-4 mr-2" />
                  Premium Buses
                </span>
                <span className="rounded-full bg-blue-600/10 px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-600/20">
                  <Star className="inline h-4 w-4 mr-2" />
                  24/7 Concierge Support
                </span>
              </div>
            </ScrollSlideUp>
          </div>
        </section>
      </div>
    </>
  );
}
