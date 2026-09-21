"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917349016519";

const fleetCategories = [
  {
    category: "Force Urbania",
    description:
      "Premium Urbania vehicles for airport transfers, corporate travel, family tours and outstation journeys.",
    vehicles: [
      { name: "Urbania 9 Seater", folder: "urbania-9-seater" },
      { name: "Urbania 12 Seater", folder: "urbania-12-seater" },
      { name: "Urbania 16 Seater", folder: "urbania-16-seater" },
      { name: "Urbania 17 Seater", folder: "urbania-17-seater" },
      { name: "Urbania Luxury", folder: "urbania-luxury" },
    ],
  },
  {
    category: "Sedan",
    description:
      "Comfortable sedans for airport transfers, city rides, business travel and outstation journeys.",
    vehicles: [
      { name: "Sedan", folder: "sedan" },
      { name: "Swift Dzire", folder: "swift-dzire" },
      { name: "Toyota Etios", folder: "toyota-etios" },
    ],
  },
  {
    category: "Toyota Innova Crysta",
    description:
      "Comfortable and reliable premium MPVs for family trips, business travel and long-distance journeys.",
    vehicles: [{ name: "Innova Crysta", folder: "innova-crysta" }],
  },
  {
    category: "Toyota Innova Hycross / Hybrid",
    description:
      "Spacious hybrid-friendly travel comfort for city rides, airport transfers and outstation trips.",
    vehicles: [{ name: "Innova Hycross Hybrid", folder: "innova-hycross" }],
  },
  {
    category: "Tempo Traveller",
    description:
      "Practical group transportation for pilgrimages, tours, corporate outings and family vacations.",
    vehicles: [
      { name: "Tempo Traveller 12 Seater", folder: "tt-12-seater" },
      { name: "Tempo Traveller 17 Seater", folder: "tt-17-seater" },
      { name: "Tempo Traveller 20 Seater", folder: "tt-20-seater" },
    ],
  },
  {
    category: "Bus",
    description:
      "Group travel solutions for schools, events, corporate trips, tours and large families.",
    vehicles: [
      { name: "Mini Bus", folder: "mini-bus" },
      { name: "Large Bus", folder: "large-bus" },
    ],
  },
];

function getImages(folder) {
  return [1, 2, 3, 4].map(
    (number) => `/images/fleet/${folder}/${number}.jpg`
  );
}

function VehicleCard({ vehicle }) {
  const images = useMemo(() => getImages(vehicle.folder), [vehicle.folder]);
  const [activeImage, setActiveImage] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  const bookingMessage = encodeURIComponent(
    `Hello Dynamic Travels, I would like to book ${vehicle.name}. Please share availability and pricing.`
  );

  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eee8dd]">
        {!imageFailed ? (
          <img
            src={images[activeImage]}
            alt={vehicle.name}
            className="h-full w-full object-cover transition-all duration-700"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
                Add vehicle images
              </p>
              <p className="mt-2 text-lg font-bold text-black/75">
                {vehicle.name}
              </p>
              <p className="mt-2 text-xs text-black/50">
                {`public/images/fleet/${vehicle.folder}/1.jpg`}
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12">
          <button
            type="button"
            onClick={() =>
              setActiveImage((current) =>
                current === 0 ? images.length - 1 : current - 1
              )
            }
            className="rounded-full bg-white/90 p-2 text-black transition hover:bg-white"
            aria-label={`Previous image of ${vehicle.name}`}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeImage === index ? "w-7 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveImage((current) => (current + 1) % images.length)
            }
            className="rounded-full bg-white/90 p-2 text-black transition hover:bg-white"
            aria-label={`Next image of ${vehicle.name}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a27a20]">
          <Users size={14} />
          Premium Fleet
        </div>

        <h3 className="text-xl font-bold tracking-tight text-[#171717]">
          {vehicle.name}
        </h3>

        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-black/65">
          <span className="rounded-full bg-[#f5f1e8] px-3 py-2">
            Clean & Comfortable
          </span>
          <span className="rounded-full bg-[#f5f1e8] px-3 py-2">
            Professional Driver
          </span>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${bookingMessage}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a27a20]"
        >
          <MessageCircle size={17} />
          Book This Vehicle
        </a>
      </div>
    </article>
  );
}

export default function FleetPage() {
  return (
    <>
      <Header />

      <main className="bg-[#f8f6f1] text-[#171717]">
        <section className="relative overflow-hidden bg-[#171717] px-6 py-24 text-white sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af55]">
              Dynamic Travels Fleet
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Vehicles for every
              <span className="block text-[#d4af55]">kind of journey.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Explore our premium cars, Urbania vehicles, Tempo Travellers and
              buses for local travel, airport transfers, corporate journeys
              and outstation tours.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af55] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
              >
                Request a Booking
                <ArrowRight size={17} />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              >
                <MessageCircle size={17} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              "Well-maintained vehicles",
              "Experienced professional drivers",
              "Local and outstation bookings",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-5"
              >
                <CheckCircle2 className="text-[#a27a20]" size={21} />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          {fleetCategories.map((category) => (
            <section key={category.category} className="mb-20 last:mb-0">
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#a27a20]">
                  Our Fleet
                </p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {category.category}
                </h2>
                <p className="mt-4 leading-7 text-black/60">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.folder} vehicle={vehicle} />
                ))}
              </div>
            </section>
          ))}
        </section>

        <section className="px-6 pb-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#d4af55] p-8 sm:p-12 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                <ShieldCheck size={16} />
                Travel with confidence
              </div>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Need help choosing the right vehicle?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">
                Tell us your destination, travel date and group size. Our team
                will help you select a suitable vehicle.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              Contact Our Team
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
