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

      {/* SHOWCASE GALLERY */}
      <TravelShowcaseGallery />

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

    return () => window.clearInterval(timer);
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
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1200ms] ${
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
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl text-white backdrop-blur-md transition hover:bg-black/50 md:flex"
      >
        ‹
      </button>

      {/* NEXT BUTTON */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl text-white backdrop-blur-md transition hover:bg-black/50 md:flex"
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
              onClick={() => setActiveIndex(index)}
              className="flex h-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? "h-1.5 w-8 bg-white"
                    : "h-1.5 w-2.5 bg-white/60"
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
========================================================= */

function TravelShowcaseGallery() {
  const images = [
    ...SHOWCASE_IMAGES,
    ...SHOWCASE_IMAGES,
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16">
      <div className="showcase-track">
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
        .showcase-track {
          display: flex;
          width: max-content;
          gap: 18px;
          animation: showcase-scroll 35s linear infinite;
        }

        .showcase-track:hover {
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
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
          transition: transform 0.35s ease;
        }

        .showcase-card:hover {
          transform: scale(1.035);
        }

        .showcase-card img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          user-select: none;
        }

        @keyframes showcase-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 9px));
          }
        }

        @media (max-width: 640px) {
          .showcase-track {
            gap: 12px;
            animation-duration: 28s;
          }

          .showcase-card {
            width: 185px;
            border-radius: 14px;
          }
        }
      `}</style>
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