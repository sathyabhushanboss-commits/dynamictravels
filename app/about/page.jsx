"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bus,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description:
      "Professional service with a strong focus on passenger safety, comfort, and dependable travel.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description:
      "Planned pickups and timely coordination for airport transfers, local trips, and outstation journeys.",
  },
  {
    icon: Car,
    title: "Comfortable Fleet",
    description:
      "Choose from comfortable cars, premium vehicles, tempo travellers, and buses for different trip sizes.",
  },
  {
    icon: Users,
    title: "Customer Support",
    description:
      "Our team helps you select the right vehicle and coordinate your journey from booking to arrival.",
  },
];

const TRAVEL_MOMENTS = [
  "/images/web/1dd-sm.webp",
  "/images/web/2dd-sm.webp",
  "/images/web/3dd-sm.webp",
];

const services = [
  "Local Bangalore cab rentals",
  "Airport pickup and drop",
  "Outstation one-way trips",
  "Round-trip travel",
  "Corporate transportation",
  "Wedding and event transport",
  "Tempo traveller rentals",
  "Group bus bookings",
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-white text-ink">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-gradient-to-br from-sky-soft via-white to-cream">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-deep/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-deep/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-deep shadow-sm">
                <span className="h-2 w-2 rounded-full bg-sky" />
                About Dynamic Travels
              </div>

              <h1 className="max-w-3xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Travel With
                <span className="block text-sky-deep">
                  Comfort & Confidence
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Dynamic Travels provides dependable travel and transportation
                solutions in Bangalore and across South India. From daily city
                travel to airport transfers, outstation trips, and group
                journeys, we help make every ride simple and comfortable.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-ink"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/fleet"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-sky-deep hover:text-sky-deep"
                >
                  Explore Fleet
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_-25px_rgba(23,32,51,0.3)]">
                <img
                  src="/images/web/1.webp"
                  alt="Dynamic Travels vehicle"
                  className="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[430px]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="flex min-h-[340px] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-sky-deep to-ink px-8 text-center text-white sm:min-h-[430px]">
                  <div>
                    <Car className="mx-auto h-16 w-16 text-brand" />

                    <p className="mt-5 text-2xl font-bold uppercase">
                      Your Journey
                    </p>

                    <p className="mt-2 text-white/70">
                      Our responsibility
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-brand" />

                  <div>
                    <p className="text-sm font-bold">
                      Travel Made Simple
                    </p>

                    <p className="text-xs text-slate-500">
                      Bangalore & beyond
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-deep">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold uppercase leading-tight sm:text-4xl">
                A Travel Partner You Can Depend On
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                At Dynamic Travels, we believe transportation should be
                convenient, transparent, and comfortable. Our services are
                designed for individuals, families, businesses, tourists, and
                groups who need dependable travel arrangements.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                Whether you are travelling within Bangalore, heading to the
                airport, planning an outstation trip, or arranging transport
                for an event, our team works to provide a smooth booking and
                travel experience.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Flexible travel solutions",
                  "Multiple vehicle options",
                  "Clear booking coordination",
                  "Local and outstation travel",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-sky" />

                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-cream p-7 sm:p-9">
              <MapPin className="h-10 w-10 text-sky-deep" />

              <h3 className="mt-5 text-2xl font-bold">
                Based in Bangalore
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Serving Bangalore and travel destinations across Karnataka and
                South India with practical transportation solutions for every
                kind of journey.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-sky-deep">
                <Star className="h-4 w-4 fill-current" />
                Customer-focused travel service
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CREATIVE TRAVEL MOMENTS
            16:9 | NO MARQUEE
        ===================================================== */}

        <section className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* SECTION HEADER */}

            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-deep">
                  Our Travel Moments
                </p>

                <h2 className="mt-3 max-w-2xl text-3xl font-bold uppercase leading-tight text-ink sm:text-4xl">
                  Every Journey Deserves
                  <span className="block text-sky-deep">
                    A Beautiful Memory
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-500">
                From everyday city rides to memorable long-distance journeys,
                we make every trip comfortable and meaningful.
              </p>
            </div>

            {/* IMAGE CARDS */}

            <div className="grid gap-5 md:grid-cols-3">
              {TRAVEL_MOMENTS.map((image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_15px_45px_rgba(23,32,51,0.10)] ring-1 ring-black/5"
                >
                  {/* 16:9 IMAGE */}

                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      draggable="false"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* CARD FOOTER */}

                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm font-bold text-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-deep">
                      Travel Experience
                    </span>
                  </div>

                  {/* HOVER OVERLAY */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section className="bg-sky-deep text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
                Why Choose Us
              </p>

              <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
                Built Around Your Journey
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <Icon className="h-9 w-9 text-brand" />

                    <h3 className="mt-5 text-lg font-bold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-deep">
                Our Services
              </p>

              <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
                One Team. Many Travel Solutions.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Choose a travel service based on your route, group size,
                schedule, and vehicle requirements.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition hover:bg-sky-deep hover:text-white"
              >
                Plan Your Trip
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-deep" />

                  <span className="text-sm font-semibold text-slate-700">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-gradient-to-r from-ink to-sky-deep">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10">
            <div className="max-w-2xl text-white">
              <h2 className="text-3xl font-bold uppercase sm:text-4xl">
                Ready For Your Next Journey?
              </h2>

              <p className="mt-3 leading-7 text-white/70">
                Contact Dynamic Travels for vehicle availability, trip details,
                and booking assistance.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold text-ink transition hover:bg-white"
            >
              Contact Dynamic Travels
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <Footer />
    </>
  );
}