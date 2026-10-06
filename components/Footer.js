"use client";

import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

/* =========================================================
   BUSINESS DETAILS
========================================================= */

const PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 73490 16519";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917349016519";

const EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
  "dynamictours76@gmail.com";

const COMPANY_NAME = "Dynamic Travels";

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Fleet", href: "/fleet" },
  { name: "Destinations", href: "/destinations" },
  { name: "Contact", href: "/contact" },
];

const fleetLinks = [
  { name: "Sedan Cars", href: "/fleet#sedan" },
  { name: "Innova Crysta", href: "/fleet#innova-crysta" },
  { name: "Urbania", href: "/fleet#urbania" },
  { name: "Tempo Traveller", href: "/fleet#tempo-traveller" },
  { name: "Mini Bus", href: "/fleet#bus" },
  { name: "Large Bus", href: "/fleet#bus" },
];

const serviceLinks = [
  "Airport Transfers",
  "Local Bengaluru Travel",
  "Outstation Cabs",
  "Corporate Travel",
  "Wedding Transportation",
  "Tour Packages",
];

/* =========================================================
   TOP 100 BENGALURU AREAS
========================================================= */

const bangaloreAreas = [
  "Hebbal",
  "Kemppapura",
  "Manyata Tech Park",
  "Thanisandra",
  "Nagawara",
  "HBR Layout",
  "Kalyan Nagar",
  "HRBR Layout",
  "Banaswadi",
  "Kammanahalli",
  "Kalyan Nagar",
  "Horamavu",
  "Ramamurthy Nagar",
  "Kasturi Nagar",
  "Lingarajapuram",
  "Frazer Town",
  "Shivajinagar",
  "Vasanth Nagar",
  "Cunningham Road",
  "Sadashivanagar",
  "Malleshwaram",
  "Rajajinagar",
  "Basaveshwaranagar",
  "Vijayanagar",
  "Nagarbhavi",
  "Kamakshipalya",
  "Kengeri",
  "Rajarajeshwari Nagar",
  "Uttarahalli",
  "Banashankari",
  "Jayanagar",
  "JP Nagar",
  "BTM Layout",
  "Bommanahalli",
  "HSR Layout",
  "Koramangala",
  "Ejipura",
  "Adugodi",
  "Agaram",
  "Wilson Garden",
  "Shantinagar",
  "Richmond Town",
  "Langford Town",
  "Anepalya",
  "Kalabyraveshwara Nagar",
  "Electronic City",
  "Hosur Road",
  "Bommasandra",
  "Singasandra",
  "Begur",
  "Akshayanagar",
  "Bannerghatta Road",
  "Arekere",
  "Hulimavu",
  "Gottigere",
  "JP Nagar Phase 6",
  "JP Nagar Phase 7",
  "J P Nagar Phase 8",
  "Kumaraswamy Layout",
  "Padmanabhanagar",
  "Girinagar",
  "Chikkalsandra",
  "Konanakunte",
  "Yelachenahalli",
  "Kanakapura Road",
  "Doddakallasandra",
  "Sarjapur Road",
  "Bellandur",
  "Marathahalli",
  "Brookefield",
  "Whitefield",
  "ITPL",
  "Kadugodi",
  "Varthur",
  "Gunjur",
  "Panathur",
  "HSR Sector 1",
  "HSR Sector 2",
  "HSR Sector 4",
  "HSR Sector 6",
  "Indiranagar",
  "Domlur",
  "HAL",
  "CV Raman Nagar",
  "Kaggadasapura",
  "Mahadevapura",
  "Doddanekkundi",
  "KR Puram",
  "Hoodi",
  "Devasandra",
  "Yelahanka",
  "Yelahanka New Town",
  "Jakkur",
  "Sahakar Nagar",
  "Vidyaranyapura",
  "Doddaballapur Road",
  "Peenya",
  "Yeshwanthpur",
  "Tumkur Road",
  "Dasarahalli",
];

/* =========================================================
   FOOTER COMPONENT
========================================================= */

export default function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Dynamic Travels, I would like to enquire about your travel services."
  )}`;

  const phoneLink = `tel:${PHONE.replace(/\s+/g, "")}`;

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="h-1.5 w-full bg-gradient-to-r from-brand via-brand-light to-sky" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl" />

      {/* =================================================
          MAIN FOOTER
      ================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              COMPANY INFORMATION
          ================================================= */}

          <div>
            <Link
              href="/"
              className="inline-block rounded-2xl bg-white px-4 py-3"
              aria-label="Dynamic Travels Home"
            >
              <img
                src="/images/web/dynamic-travels-logo.webp"
                alt="Dynamic Travels logo"
                width={543}
                height={100}
                loading="lazy"
                className="h-10 w-auto"
              />
            </Link>

            <div className="mt-3 h-1 w-16 rounded-full bg-brand" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Reliable car rentals, airport transfers, outstation
              cabs, and group transportation services across
              Bengaluru and South India.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              Enquire on WhatsApp

              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-light">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-white/65 transition hover:text-brand-light"
                  >
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              OUR FLEET
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-light">
              Our Fleet
            </h3>

            <ul className="mt-5 space-y-3">
              {fleetLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-white/65 transition hover:text-brand-light"
                  >
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-light">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* PHONE */}

              <a
                href={phoneLink}
                className="flex items-start gap-3 text-sm text-white/65 transition hover:text-brand-light"
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-brand-light"
                />

                <span>{PHONE}</span>
              </a>

              {/* EMAIL */}

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 break-all text-sm text-white/65 transition hover:text-brand-light"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-brand-light"
                />

                <span>{EMAIL}</span>
              </a>

              {/* ADDRESS */}

              <div className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-brand-light"
                />

                <span>
                  No 91, 1st Floor, 11th A Cross,
                  <br />
                  Dasarahalli Main Rd,
                  <br />
                  Near Kemppapura,
                  <br />
                  Near Muthoot Finance,
                  <br />
                  Bhuvaneshwari Nagar, Hebbal,
                  <br />
                  Kemppapura, Bengaluru,
                  <br />
                  Karnataka 560024
                </span>
              </div>

            </div>

            {/* SOCIAL MEDIA */}

            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <FaLinkedinIn size={17} />
              </a>

            </div>
          </div>

        </div>

        {/* =================================================
            SERVICES
        ================================================= */}

        <div className="mt-14 border-t border-white/10 pt-8">

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
            Our Services
          </h3>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {serviceLinks.map((service) => (
              <span
                key={service}
                className="text-sm text-white/65"
              >
                {service}
              </span>
            ))}
          </div>

        </div>

        {/* =================================================
            SEO SERVICE AREAS
        ================================================= */}

        <div className="mt-10 border-t border-white/10 pt-8">

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
            Areas We Serve in Bengaluru
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65">
            Dynamic Travels provides car rental services, airport
            transfers, local travel, outstation cab services,
            corporate transportation, and group travel solutions
            across Bengaluru and nearby areas.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {bangaloreAreas.map((area, index) => (
              <span
                key={`${area}-${index}`}
                className="text-sm text-white/65 transition hover:text-brand-light"
              >
                {area}
              </span>
            ))}
          </div>

        </div>

        {/* =================================================
            SEO KEYWORD DESCRIPTION
        ================================================= */}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

          <h3 className="text-base font-bold text-white">
            Car Rental and Travel Services in Bengaluru
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/65">
            Looking for reliable car rental services in Bengaluru?
            Dynamic Travels offers airport taxi services, local
            sightseeing cabs, outstation car rentals, corporate
            travel transportation, wedding vehicles, tempo
            travellers, Innova Crysta rentals, Urbania rentals,
            mini buses, and large bus transportation services.
            We serve customers across North Bengaluru, South
            Bengaluru, East Bengaluru, West Bengaluru, and Central
            Bengaluru.
          </p>

        </div>

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">

          <div className="space-y-2">

            <p>
              © {new Date().getFullYear()} {COMPANY_NAME}.
              All rights reserved.
            </p>

            {/* DEVELOPER CREDIT */}

            <p className="text-sm font-medium text-white/70">
              Designed, Developed and Maintained by{" "}
              <a
                href="https://www.sathyaenterprises.com"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-brand-light transition hover:text-brand"
              >
                Sathya Enterprises
              </a>
            </p>

          </div>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/privacy"
              className="transition hover:text-brand-light"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-brand-light"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/cancellation-policy"
              className="transition hover:text-brand-light"
            >
              Cancellation Policy
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-brand-light"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("dt-open-cookies"))}
              className="transition hover:text-brand-light"
            >
              Cookie Settings
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
}