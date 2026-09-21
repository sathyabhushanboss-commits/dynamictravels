"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import TrustBar from "@/components/TrustBar";
import ServicesGrid from "@/components/ServicesGrid";
import PromoStrip from "@/components/PromoStrip";
import AboutSeo from "@/components/AboutSeo";
import Faq from "@/components/Faq";
import PopularRoutes from "@/components/PopularRoutes";
import TravelExpertPopup from "@/components/TravelExpertPopup";

/* =========================================================
   HERO IMAGES
========================================================= */

const HERO_IMAGES = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

const AUTO_SLIDE_TIME = 2000;

/* =========================================================
   SHOWCASE IMAGES
========================================================= */

const SHOWCASE_IMAGES = [
  "/images/1dt.jpeg",
  "/images/2dt.jpeg",
  "/images/3dt.jpeg",
  "/images/4dt.jpeg",
  "/images/5dt.jpeg",
];

/* =========================================================
   CERTIFICATE IMAGE
========================================================= */

const CERTIFICATE_IMAGE =
  "/images/dynamic-travels-certificate.jpg";

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <TravelExpertPopup />

      <Header />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#f4f5f6]">
        <PremiumHeroSlider />
      </section>

      {/* BOOKING FORM */}
      <div
        id="book"
        className="relative z-20 mx-auto -mt-8 max-w-6xl scroll-mt-24 px-4 sm:-mt-12 sm:px-6 lg:px-8"
      >
        <SearchForm />
      </div>

      {/* TRUST BAR */}
      <div className="relative z-10">
        <TrustBar />
      </div>

      {/* SERVICES */}
      <ServicesGrid />

      {/* PROMO */}
      <PromoStrip />

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-[#087f9f] text-white">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#2fbf8f]/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          <FeatureItem
            title="Pay your way"
            description="After the ride, 25% or full advance"
          />

          <FeatureItem
            title="Real people, fast replies"
            description="Call or WhatsApp a local team"
          />

          <FeatureItem
            title="Transparent billing"
            description="What you see is what you pay"
          />

          <FeatureItem
            title="Every trip type"
            description="Local, outstation & one-way"
          />
        </div>
      </section>

      {/* ABOUT SEO */}
      <AboutSeo />

      {/* FAQ */}
      <Faq />

      {/* POPULAR ROUTES */}
      <PopularRoutes />

      {/* SLOW MARQUEE GALLERY */}
      <TravelShowcaseGallery />

      {/* DYNAMIC TRAVELS CERTIFICATE */}
      <DynamicTravelsCertificate />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

/* =========================================================
   PREMIUM HERO SLIDER
========================================================= */

function PremiumHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => {
      return (current + 1) % HERO_IMAGES.length;
    });
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => {
      return (
        (current - 1 + HERO_IMAGES.length) %
        HERO_IMAGES.length
      );
    });
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_TIME);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused, nextSlide]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [nextSlide, previousSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchEndX.current = null;
  };

  const handleTouchMove = (event) => {
    touchEndX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    if (Math.abs(distance) >= 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#f3f4f6]">
        {HERO_IMAGES.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={image}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1200ms] ease-in-out ${
                isActive
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
            >
              <img
                src={image}
                alt=""
                draggable="false"
                className="h-full w-full object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* PREVIOUS BUTTON */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 md:flex"
      >
        ‹
      </button>

      {/* NEXT BUTTON */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 md:flex"
      >
        ›
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {HERO_IMAGES.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
              onClick={() => setActiveIndex(index)}
              className="flex h-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive
                    ? "h-1.5 w-8 bg-white shadow-md"
                    : "h-1.5 w-2.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   TRAVEL SHOWCASE GALLERY
   SLOW MARQUEE
========================================================= */

function TravelShowcaseGallery() {
  const images = [
    ...SHOWCASE_IMAGES,
    ...SHOWCASE_IMAGES,
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-16">
      <div className="showcase-marquee">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="showcase-card"
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .showcase-marquee {
          display: flex;
          width: max-content;
          gap: 20px;
          animation: slow-marquee 75s linear infinite;
          will-change: transform;
        }

        .showcase-marquee:hover {
          animation-play-state: paused;
        }

        .showcase-card {
          width: 220px;
          aspect-ratio: 9 / 16;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 18px;
          background: #f3f4f6;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .showcase-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          pointer-events: none;
        }

        @keyframes slow-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        @media (max-width: 640px) {
          .showcase-marquee {
            gap: 12px;
            animation-duration: 65s;
          }

          .showcase-card {
            width: 180px;
            border-radius: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .showcase-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   DYNAMIC TRAVELS CERTIFICATE
========================================================= */

function DynamicTravelsCertificate() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ef] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* CERTIFICATE IMAGE */}
        <div className="overflow-hidden rounded-3xl border border-[#d7c7ae] bg-white p-3 shadow-[0_18px_60px_rgba(74,55,30,0.12)]">
          <img
            src={CERTIFICATE_IMAGE}
            alt="Dynamic Travels ISO 9001:2015 certificate"
            loading="lazy"
            className="h-auto w-full rounded-2xl object-contain"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <span className="inline-flex rounded-full border border-[#c9a66b] bg-[#fffaf0] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9b6b2d]">
            Quality & Trust
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#172b35] sm:text-4xl">
            Quality you can trust. Journeys you can enjoy.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Dynamic Travels proudly showcases its ISO 9001:2015 certification for car rental services, reflecting our commitment to dependable service and consistent quality.
          </p>

          <p className="mt-3 max-w-xl text-base leading-8 text-slate-600">
            From city rides to outstation journeys, we combine comfortable vehicles, professional service, and thoughtful travel support for every customer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURE ITEM
========================================================= */

function FeatureItem({ title, description }) {
  return (
    <div className="group border-b border-white/10 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:py-10 first:lg:pl-0 last:lg:border-r-0">
      <h3 className="font-display text-base font-bold">
        {title}
      </h3>

      <p className="mt-1.5 text-sm leading-6 text-white/70">
        {description}
      </p>
    </div>
  );
}