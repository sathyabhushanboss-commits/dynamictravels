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
    <footer className="bg-[#fff7ed] text-[#292524]">

      {/* =================================================
          MAIN FOOTER
      ================================================= */}

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              COMPANY INFORMATION
          ================================================= */}

          <div>
            <Link
              href="/"
              className="inline-block"
              aria-label="Dynamic Travels Home"
            >
              <div className="text-2xl font-black tracking-tight text-[#292524]">
                DYNAMIC{" "}
                <span className="text-[#ea580c]">
                  TRAVELS
                </span>
              </div>
            </Link>

            <div className="mt-3 h-1 w-16 rounded-full bg-[#ea580c]" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#78716c]">
              Reliable car rentals, airport transfers, outstation
              cabs, and group transportation services across
              Bengaluru and South India.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ea580c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c2410c]"
            >
              Enquire on WhatsApp

              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#ea580c]">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-[#78716c] transition hover:text-[#ea580c]"
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
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#ea580c]">
              Our Fleet
            </h3>

            <ul className="mt-5 space-y-3">
              {fleetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-[#78716c] transition hover:text-[#ea580c]"
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
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#ea580c]">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* PHONE */}

              <a
                href={phoneLink}
                className="flex items-start gap-3 text-sm text-[#78716c] transition hover:text-[#ea580c]"
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#ea580c]"
                />

                <span>{PHONE}</span>
              </a>

              {/* EMAIL */}

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 break-all text-sm text-[#78716c] transition hover:text-[#ea580c]"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#ea580c]"
                />

                <span>{EMAIL}</span>
              </a>

              {/* ADDRESS */}

              <div className="flex items-start gap-3 text-sm leading-6 text-[#78716c]">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#ea580c]"
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
                className="rounded-full border border-[#fed7aa] bg-white p-2 text-[#78716c] transition hover:border-[#ea580c] hover:bg-[#ea580c] hover:text-white"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-[#fed7aa] bg-white p-2 text-[#78716c] transition hover:border-[#ea580c] hover:bg-[#ea580c] hover:text-white"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border border-[#fed7aa] bg-white p-2 text-[#78716c] transition hover:border-[#ea580c] hover:bg-[#ea580c] hover:text-white"
              >
                <FaLinkedinIn size={17} />
              </a>

            </div>
          </div>

        </div>

        {/* =================================================
            SERVICES
        ================================================= */}

        <div className="mt-14 border-t border-[#fed7aa] pt-8">

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">
            Our Services
          </h3>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {serviceLinks.map((service) => (
              <span
                key={service}
                className="text-sm text-[#78716c]"
              >
                {service}
              </span>
            ))}
          </div>

        </div>

        {/* =================================================
            SEO SERVICE AREAS
        ================================================= */}

        <div className="mt-10 border-t border-[#fed7aa] pt-8">

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">
            Areas We Serve in Bengaluru
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#78716c]">
            Dynamic Travels provides car rental services, airport
            transfers, local travel, outstation cab services,
            corporate transportation, and group travel solutions
            across Bengaluru and nearby areas.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {bangaloreAreas.map((area, index) => (
              <span
                key={`${area}-${index}`}
                className="text-sm text-[#78716c] transition hover:text-[#ea580c]"
              >
                {area}
              </span>
            ))}
          </div>

        </div>

        {/* =================================================
            SEO KEYWORD DESCRIPTION
        ================================================= */}

        <div className="mt-10 rounded-2xl border border-[#fed7aa] bg-white p-6">

          <h3 className="text-base font-bold text-[#292524]">
            Car Rental and Travel Services in Bengaluru
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#78716c]">
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

        <div className="mt-10 flex flex-col gap-5 border-t border-[#fed7aa] pt-7 text-xs text-[#78716c] sm:flex-row sm:items-center sm:justify-between">

          <div className="space-y-2">

            <p>
              © {new Date().getFullYear()} {COMPANY_NAME}.
              All rights reserved.
            </p>

            {/* DEVELOPER CREDIT */}

            <p className="text-sm font-medium text-[#57534e]">
              Designed, Developed and Maintained by{" "}
              <a
                href="https://www.sathyaenterprises.com"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#ea580c] transition hover:text-[#c2410c]"
              >
                Sathya Enterprises
              </a>
            </p>

          </div>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/privacy-policy"
              className="transition hover:text-[#ea580c]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition hover:text-[#ea580c]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#ea580c]"
            >
              Contact
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}