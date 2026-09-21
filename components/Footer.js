import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 73490 16519";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917349016519";

const EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
  "dynamictours76@gmail.com";

const COMPANY_NAME = "Dynamic Travels";

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
  { name: "Mini Bus", href: "/fleet#mini-bus" },
  { name: "Large Bus", href: "/fleet#large-bus" },
];

const serviceLinks = [
  "Airport Transfers",
  "Local Bengaluru Travel",
  "Outstation Cabs",
  "Corporate Travel",
  "Wedding Transportation",
  "Tour Packages",
];

export default function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Dynamic Travels, I would like to enquire about your travel services."
  )}`;

  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company Information */}

          <div>
            <Link href="/" className="inline-block">
              <div className="text-2xl font-black tracking-tight">
                DYNAMIC{" "}
                <span className="text-[#d4a017]">
                  TRAVELS
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Reliable car rentals, airport transfers,
              outstation cabs, and group transportation
              services across Bengaluru and South India.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d4a017] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#f0c75e]"
            >
              Enquire on WhatsApp

              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#d4a017]">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-[#d4a017]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#d4a017]">
              Our Fleet
            </h3>

            <ul className="mt-5 space-y-3">
              {fleetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-[#d4a017]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#d4a017]">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* Phone */}

              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="flex items-start gap-3 text-sm text-white/65 transition hover:text-[#d4a017]"
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#d4a017]"
                />

                <span>{PHONE}</span>
              </a>

              {/* Email */}

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 break-all text-sm text-white/65 transition hover:text-[#d4a017]"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#d4a017]"
                />

                <span>{EMAIL}</span>
              </a>

              {/* Address */}

              <div className="flex items-start gap-3 text-sm leading-6 text-white/65">

                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#d4a017]"
                />

                <span>
                  No 91, 1st Floor, 11th A Cross,
                  <br />
                  Dasarahalli Main Rd,
                  <br />
                  near Kemppapura,
                  <br />
                  near Muthoot Finance,
                  <br />
                  Bhuvaneshwari Nagar, Hebbal,
                  <br />
                  Kemppapura, Bengaluru,
                  <br />
                  Karnataka 560024
                </span>

              </div>

            </div>

            {/* Social Media */}

            <div className="mt-6 flex items-center gap-3">

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-white/15 p-2 text-white/65 transition hover:border-[#d4a017] hover:text-[#d4a017]"
              >
                <FaInstagram size={17} />
              </a>

              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/15 p-2 text-white/65 transition hover:border-[#d4a017] hover:text-[#d4a017]"
              >
                <FaFacebookF size={17} />
              </a>

              {/* LinkedIn */}

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border border-white/15 p-2 text-white/65 transition hover:border-[#d4a017] hover:text-[#d4a017]"
              >
                <FaLinkedinIn size={17} />
              </a>

            </div>
          </div>

        </div>

        {/* Services */}

        <div className="mt-14 border-t border-white/10 pt-8">

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4a017]">
            Services
          </h3>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">

            {serviceLinks.map((service) => (
              <span
                key={service}
                className="text-sm text-white/50"
              >
                {service}
              </span>
            ))}

          </div>

        </div>

        {/* Bottom Footer */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}.
            All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/privacy-policy"
              className="transition hover:text-[#d4a017]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition hover:text-[#d4a017]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#d4a017]"
            >
              Contact
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}