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
   MAIN IMAGES
========================================================= */

const HERO_IMAGES = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

const TRAVEL_MOMENTS = [
  "/images/1dd.jpeg",
  "/images/2dd.jpeg",
  "/images/3dd.jpeg",
];

const SHOWCASE_IMAGES = [
  "/images/1dt.jpeg",
  "/images/2dt.jpeg",
  "/images/3dt.jpeg",
  "/images/4dt.jpeg",
  "/images/5dt.jpeg",
];

const AUTO_SLIDE_TIME = 2000;

/* =========================================================
   ALL VEHICLES
========================================================= */

const FLEET_DATA = [
  {
    name: "Sedan",
    images: [
      "/images/sedan11.png",
      "/images/sedan12.png",
      "/images/sedan13.png",
      "/images/sedan14.png",
    ],
  },

  {
    name: "Innova",
    images: [
      "/images/innova11.png",
      "/images/innova12.png",
      "/images/innova13.png",
      "/images/innova14.png",
    ],
  },

  {
    name: "Innova Crysta",
    images: [
      "/images/crysta11.png",
      "/images/crysta12.png",
      "/images/crysta13.png",
      "/images/crysta14.png",
    ],
  },

  {
    name: "Innova Hycross / Hybrid",
    images: [
      "/images/hybrid11.png",
      "/images/hybrid12.png",
      "/images/hybrid13.png",
      "/images/hybrid14.png",
    ],
  },

  {
    name: "Force Urbania",
    images: [
      "/images/urbania11.png",
      "/images/urbania12.png",
      "/images/urbania13.png",
      "/images/urbania14.png",
    ],
  },

  {
    name: "Tempo Traveller",
    images: [
      "/images/tt11.png",
      "/images/tt12.png",
      "/images/tt13.png",
      "/images/tt14.png",
    ],
  },

  {
    name: "Mini Bus",
    images: [
      "/images/mini11.png",
      "/images/mini12.png",
      "/images/mini13.png",
      "/images/mini14.png",
    ],
  },

  {
    name: "Bus",
    images: [
      "/images/bus11.png",
      "/images/bus12.png",
      "/images/bus13.png",
      "/images/bus14.png",
    ],
  },
];

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      <TravelExpertPopup />

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative w-full overflow-hidden bg-[#f4f5f6]">
        <PremiumHeroSlider />
      </section>

      {/* =====================================================
          BOOKING
      ===================================================== */}

      <div
        id="book"
        className="relative z-20 mx-auto -mt-8 max-w-6xl scroll-mt-24 px-4 sm:-mt-12 sm:px-6 lg:px-8"
      >
        <SearchForm />
      </div>

      {/* =====================================================
          TRUST BAR
      ===================================================== */}

      <div className="relative z-10">
        <TrustBar />
      </div>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <ServicesGrid />

      {/* =====================================================
          PROMO
      ===================================================== */}

      <PromoStrip />

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

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

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <AboutSeo />

      {/* =====================================================
          FAQ
      ===================================================== */}

      <Faq />

      {/* =====================================================
          POPULAR ROUTES
      ===================================================== */}

      <PopularRoutes />

      {/* =====================================================
          ALL VEHICLES
      ===================================================== */}

      <VehicleFleetSection />

      {/* =====================================================
          TRAVEL MOMENTS
      ===================================================== */}

      <TravelMomentsSection />

      {/* =====================================================
          SHOWCASE
      ===================================================== */}

      <TravelShowcaseGallery />

      {/* =====================================================
          CERTIFICATE
      ===================================================== */}

      <DynamicTravelsCertificate />

      {/* =====================================================
          FOOTER
      ===================================================== */}

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
    setActiveIndex(
      (current) =>
        (current + 1) % HERO_IMAGES.length
    );
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + HERO_IMAGES.length) %
        HERO_IMAGES.length
    );
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

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
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
      touchStartX.current -
      touchEndX.current;

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

      {/* HERO IMAGE */}

      <div className="relative aspect-video w-full overflow-hidden bg-[#f3f4f6]">

        {HERO_IMAGES.map((image, index) => {

          const isActive =
            index === activeIndex;

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

      {/* PREVIOUS */}

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl text-white backdrop-blur-md hover:bg-black/50 md:flex lg:left-7"
      >
        ‹
      </button>

      {/* NEXT */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-3xl text-white backdrop-blur-md hover:bg-black/50 md:flex lg:right-7"
      >
        ›
      </button>

      {/* INDICATORS */}

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">

        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show image ${
              index + 1
            }`}
            onClick={() =>
              setActiveIndex(index)
            }
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/60"
            }`}
          />
        ))}

      </div>

    </div>
  );
}

/* =========================================================
   WHY CHOOSE US
========================================================= */

function FeatureItem({
  title,
  description,
}) {
  return (
    <div className="border-b border-white/10 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:py-10 first:lg:pl-0 last:lg:border-r-0">

      <h3 className="font-display text-base font-bold">
        {title}
      </h3>

      <p className="mt-1.5 text-sm leading-6 text-white/70">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   ALL VEHICLES SECTION
========================================================= */

function VehicleFleetSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

      <div className="mx-auto max-w-7xl">

        {/* HEADING */}

        <div className="mb-10 text-center sm:mb-14">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#087f9f]">
            Our Fleet
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#172033] sm:text-4xl lg:text-5xl">
            Vehicles for Every Journey
          </h2>

        </div>

        {/* ALL VEHICLES */}

        <div className="space-y-14 sm:space-y-16 lg:space-y-20">

          {FLEET_DATA.map(
            (vehicle, vehicleIndex) => (
              <VehicleGallery
                key={vehicle.name}
                vehicle={vehicle}
                vehicleIndex={vehicleIndex}
              />
            )
          )}

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   INDIVIDUAL VEHICLE GALLERY
========================================================= */

function VehicleGallery({
  vehicle,
  vehicleIndex,
}) {
  const [activeImage, setActiveImage] =
    useState(0);

  /* =====================================================
     AUTO ROTATE EVERY 4 SECONDS
  ===================================================== */

  useEffect(() => {

    const timer = window.setInterval(() => {

      setActiveImage((current) => {
        return (
          (current + 1) %
          vehicle.images.length
        );
      });

    }, 4000);

    return () => {
      window.clearInterval(timer);
    };

  }, [vehicle.images.length]);

  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const changeImage = (index) => {
    setActiveImage(index);
  };

  /* =====================================================
     THREE THUMBNAILS
  ===================================================== */

  const thumbnails = vehicle.images
    .map((image, index) => ({
      image,
      index,
    }))
    .filter(
      (item) =>
        item.index !== activeImage
    );

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* =================================================
          VEHICLE TITLE
      ================================================= */}

      <div className="mb-5 flex items-center gap-4">

        <div className="h-px flex-1 bg-slate-200" />

        <h3 className="whitespace-nowrap text-xl font-bold text-[#172033] sm:text-2xl lg:text-3xl">
          {vehicle.name}
        </h3>

        <div className="h-px flex-1 bg-slate-200" />

      </div>

      {/* =================================================
          GALLERY CONTAINER
      ================================================= */}

      <div className="overflow-hidden rounded-3xl bg-[#f7fafb] p-2 shadow-xl ring-1 ring-black/5 sm:p-4">

        {/* =================================================
            LARGE IMAGE
        ================================================= */}

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white">

          {vehicle.images.map(
            (image, index) => (

              <div
                key={image}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                  index === activeImage
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0"
                }`}
              >

                <img
                  src={image}
                  alt={`${vehicle.name} image ${
                    index + 1
                  }`}
                  draggable="false"
                  className="h-full w-full object-contain"
                />

              </div>

            )
          )}

          {/* IMAGE COUNT */}

          <div className="absolute right-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md sm:right-5 sm:top-5 sm:text-xs">
            {String(
              activeImage + 1
            ).padStart(2, "0")}{" "}
            / 04
          </div>

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() =>
              changeImage(
                (activeImage -
                  1 +
                  vehicle.images.length) %
                  vehicle.images.length
              )
            }
            aria-label={`Previous ${vehicle.name} image`}
            className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-md transition hover:bg-black/70 sm:left-5 sm:h-11 sm:w-11"
          >
            ‹
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={() =>
              changeImage(
                (activeImage + 1) %
                  vehicle.images.length
              )
            }
            aria-label={`Next ${vehicle.name} image`}
            className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-md transition hover:bg-black/70 sm:right-5 sm:h-11 sm:w-11"
          >
            ›
          </button>

        </div>

        {/* =================================================
            THREE SMALL IMAGES
        ================================================= */}

        <div className="mt-2 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-4">

          {thumbnails.map(
            ({ image, index }) => (

              <button
                key={image}
                type="button"
                onClick={() =>
                  changeImage(index)
                }
                className="group relative overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
              >

                <div className="relative aspect-video">

                  <img
                    src={image}
                    alt={`${vehicle.name} image ${
                      index + 1
                    }`}
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-contain p-1 sm:p-2"
                  />

                </div>

                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-1 text-[8px] font-bold text-white backdrop-blur-md sm:bottom-2 sm:left-2 sm:px-2.5 sm:text-[10px]">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

              </button>

            )
          )}

        </div>

        {/* =================================================
            DOTS
        ================================================= */}

        <div className="mt-4 flex justify-center gap-1.5 sm:mt-5 sm:gap-2">

          {vehicle.images.map(
            (_, index) => (

              <button
                key={index}
                type="button"
                onClick={() =>
                  changeImage(index)
                }
                aria-label={`Show ${
                  vehicle.name
                } image ${
                  index + 1
                }`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeImage
                    ? "w-8 bg-[#087f9f]"
                    : "w-2.5 bg-slate-300"
                }`}
              />

            )
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   TRAVEL MOMENTS
========================================================= */

function TravelMomentsSection() {
  return (
    <section className="bg-[#f7fafb] px-5 py-16 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#087f9f]">
              Our Travel Moments
            </p>

            <h2 className="mt-3 text-3xl font-bold uppercase leading-tight text-[#172033] sm:text-4xl">

              Every Journey Deserves

              <span className="block text-[#087f9f]">
                A Beautiful Memory
              </span>

            </h2>

          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-500">
            From city rides to unforgettable
            getaways, every journey is planned
            with comfort, care, and a memorable
            experience.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {TRAVEL_MOMENTS.map(
            (image, index) => (

              <div
                key={image}
                className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5"
              >

                <div className="flex aspect-video items-center justify-center overflow-hidden bg-white">

                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    draggable="false"
                    className="block h-full w-full object-contain"
                  />

                </div>

                <div className="flex items-center justify-between px-5 py-4">

                  <span className="text-sm font-bold text-[#172033]">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#087f9f]">
                    Travel Experience
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   PORTRAIT SHOWCASE
========================================================= */

function TravelShowcaseGallery() {
  const images = [
    ...SHOWCASE_IMAGES,
    ...SHOWCASE_IMAGES,
  ];

  return (
    <section className="overflow-hidden bg-white py-16">

      <div className="mb-10 px-5 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#087f9f]">
          Explore With Us
        </p>

        <h2 className="mt-3 text-3xl font-bold text-[#172033] sm:text-4xl">
          Moments That Stay With You
        </h2>

      </div>

      <div className="showcase-marquee flex w-max gap-5">

        {images.map(
          (image, index) => (

            <div
              key={`${image}-${index}`}
              className="w-[180px] overflow-hidden rounded-2xl bg-white sm:w-[220px]"
            >

              <div className="aspect-[9/16] overflow-hidden">

                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  draggable="false"
                  className="block h-full w-full object-contain"
                />

              </div>

            </div>

          )
        )}

      </div>

      <style jsx>{`

        .showcase-marquee {
          animation:
            slow-marquee
            75s
            linear
            infinite;
        }

        .showcase-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes slow-marquee {

          from {
            transform: translateX(0);
          }

          to {
            transform:
              translateX(
                calc(-50% - 10px)
              );
          }

        }

        @media (max-width: 640px) {

          .showcase-marquee {
            animation-duration: 65s;
          }

        }

      `}</style>

    </section>
  );
}

/* =========================================================
   CERTIFICATE
========================================================= */

function DynamicTravelsCertificate() {
  return (
    <section className="bg-[#f7f4ef] px-5 py-16 sm:px-8 lg:px-10">

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

        <div>

          <span className="inline-flex rounded-full bg-[#087f9f]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#087f9f]">
            Quality & Trust
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#172033] sm:text-4xl">

            Quality you can trust.

            <span className="block text-[#087f9f]">
              Journeys you can enjoy.
            </span>

          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Dynamic Travels proudly showcases
            its ISO 9001:2015 certification for
            car rental services, reflecting our
            commitment to dependable service
            and consistent quality.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            From city rides to outstation
            journeys, we combine comfortable
            vehicles, professional service,
            and thoughtful travel support for
            every customer.
          </p>

        </div>

        <div className="rounded-3xl bg-white p-3 shadow-xl ring-1 ring-black/5">

          <img
            src="/images/dynamic-travels-certificate.jpg"
            alt="Dynamic Travels ISO 9001:2015 certificate"
            loading="lazy"
            draggable="false"
            className="block h-auto w-full object-contain"
          />

        </div>

      </div>

    </section>
  );
}