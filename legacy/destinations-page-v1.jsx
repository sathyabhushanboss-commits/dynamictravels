"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917349016519";

const destinations = [
  {
    name: "Bengaluru",
    slug: "bengaluru",
    image: "/images/destinations/bengaluru.jpg",
    description: "Bengaluru city tours, airport transfers, business travel and local sightseeing.",
    highlights: ["Bangalore Palace", "Lalbagh", "Cubbon Park"],
  },
  {
    name: "Mysore",
    slug: "mysore",
    image: "/images/destinations/mysore.jpg",
    description: "Discover royal heritage, palaces, gardens and cultural attractions.",
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens"],
  },
  {
    name: "Coorg",
    slug: "coorg",
    image: "/images/destinations/coorg.jpg",
    description: "Explore coffee plantations, misty hills and peaceful nature escapes.",
    highlights: ["Abbey Falls", "Raja’s Seat", "Coffee Estates"],
  },
  {
    name: "Nagarhole",
    slug: "nagarhole",
    image: "/images/destinations/nagarhole.jpg",
    description: "Experience wildlife, forests and scenic national park surroundings.",
    highlights: ["Nagarhole National Park", "Safari", "Kabini Region"],
  },
  {
    name: "Wayanad",
    slug: "wayanad",
    image: "/images/destinations/wayanad.jpg",
    description: "Enjoy green hills, waterfalls, caves and beautiful countryside.",
    highlights: ["Edakkal Caves", "Soochipara Falls", "Banasura Sagar Dam"],
  },
  {
    name: "Ooty",
    slug: "ooty",
    image: "/images/destinations/ooty.jpg",
    description: "Travel through tea gardens, mountain roads and cool hill-station landscapes.",
    highlights: ["Ooty Lake", "Tea Gardens", "Doddabetta Peak"],
  },
  {
    name: "Bandipur",
    slug: "bandipur",
    image: "/images/destinations/bandipur.jpg",
    description: "Plan a wildlife and nature trip through the Bandipur region.",
    highlights: ["Bandipur National Park", "Safari", "Forest Routes"],
  },
  {
    name: "Shravanabelagola",
    slug: "shravanabelagola",
    image: "/images/destinations/shravanabelagola.jpg",
    description: "Visit historic Jain heritage sites and the famous monolithic statue.",
    highlights: ["Gommateshwara Statue", "Vindhyagiri Hill", "Chandragiri Hill"],
  },
  {
    name: "Belur",
    slug: "belur",
    image: "/images/destinations/belur.jpg",
    description: "Explore remarkable Hoysala architecture and historic temples.",
    highlights: ["Chennakeshava Temple", "Hoysala Architecture", "Heritage Walk"],
  },
  {
    name: "Halebidu",
    slug: "halebidu",
    image: "/images/destinations/halebidu.jpg",
    description: "Discover intricate temple architecture and Karnataka’s heritage history.",
    highlights: ["Hoysaleswara Temple", "Kedareshwara Temple", "Heritage Sites"],
  },
  {
    name: "Chikmagalur",
    slug: "chikmagalur",
    image: "/images/destinations/chikmagalur.jpg",
    description: "Enjoy coffee country, waterfalls and scenic mountain viewpoints.",
    highlights: ["Mullayanagiri", "Coffee Plantations", "Jhari Falls"],
  },
  {
    name: "Dharmasthala",
    slug: "dharmasthala",
    image: "/images/destinations/dharmasthala.jpg",
    description: "Visit a spiritual destination surrounded by culture and nature.",
    highlights: ["Manjunatha Temple", "Bahubali Statue", "Nethravathi River"],
  },
  {
    name: "St. Mary’s Island",
    slug: "st-marys-island",
    image: "/images/destinations/st-marys-island.jpg",
    description: "Explore coastal beauty, unique rock formations and island views.",
    highlights: ["Malpe Beach", "Basalt Rocks", "Boat Ride"],
  },
  {
    name: "Udupi",
    slug: "udupi",
    image: "/images/destinations/udupi.jpg",
    description: "Experience temple heritage, beaches and coastal Karnataka.",
    highlights: ["Sri Krishna Temple", "Malpe Beach", "St. Mary’s Island"],
  },
  {
    name: "Murdeshwar",
    slug: "murdeshwar",
    image: "/images/destinations/murdeshwar.jpg",
    description: "Enjoy coastal scenery, temple views and Arabian Sea beaches.",
    highlights: ["Murdeshwar Temple", "Shiva Statue", "Netrani Island"],
  },
  {
    name: "Jog Falls",
    slug: "jog-falls",
    image: "/images/destinations/jog-falls.jpg",
    description: "Visit one of Karnataka’s famous waterfalls and scenic viewpoints.",
    highlights: ["Jog Falls", "Sharavathi Valley", "Viewpoints"],
  },
  {
    name: "Chitradurga",
    slug: "chitradurga",
    image: "/images/destinations/chitradurga.jpg",
    description: "Explore historic forts, rocky landscapes and cultural heritage.",
    highlights: ["Chitradurga Fort", "Chandravalli", "Fort Viewpoints"],
  },
  {
    name: "Hampi",
    slug: "hampi",
    image: "/images/destinations/hampi.jpg",
    description: "Discover ancient ruins, temples and the historic Vijayanagara landscape.",
    highlights: ["Virupaksha Temple", "Vittala Temple", "Hampi Bazaar"],
  },
  {
    name: "Badami",
    slug: "badami",
    image: "/images/destinations/badami.jpg",
    description: "Explore cave temples, red sandstone cliffs and historic monuments.",
    highlights: ["Badami Caves", "Agastya Lake", "Bhoothnath Temple"],
  },
  {
    name: "Vijayapura / Bijapur",
    slug: "vijayapura",
    image: "/images/destinations/vijayapura.jpg",
    description: "Explore historic architecture and monuments in northern Karnataka.",
    highlights: ["Gol Gumbaz", "Ibrahim Rauza", "Jumma Masjid"],
  },
  {
    name: "Bidar",
    slug: "bidar",
    image: "/images/destinations/bidar.jpg",
    description: "Discover forts, monuments and the heritage of northern Karnataka.",
    highlights: ["Bidar Fort", "Bahmani Tombs", "Gurudwara Nanak Jhira"],
  },
  {
    name: "Kodaikanal",
    slug: "kodaikanal",
    image: "/images/destinations/kodaikanal.jpg",
    description: "Enjoy lakes, forests, viewpoints and refreshing hill-station weather.",
    highlights: ["Kodaikanal Lake", "Coaker’s Walk", "Pillar Rocks"],
  },
  {
    name: "Tirupati",
    slug: "tirupati",
    image: "/images/destinations/tirupati.jpg",
    description: "Plan a pilgrimage journey with comfortable travel and reliable transfers.",
    highlights: ["Tirumala Temple", "Kapila Theertham", "Sri Govindaraja Swamy Temple"],
  },
  {
    name: "Munnar",
    slug: "munnar",
    image: "/images/destinations/munnar.jpg",
    description: "Explore tea plantations, misty mountains and Kerala’s natural beauty.",
    highlights: ["Tea Gardens", "Eravikulam National Park", "Mattupetty Dam"],
  },
  {
    name: "Alleppey",
    slug: "alleppey",
    image: "/images/destinations/alleppey.jpg",
    description: "Experience Kerala backwaters, houseboats and relaxing coastal landscapes.",
    highlights: ["Backwaters", "Houseboat Cruise", "Alappuzha Beach"],
  },
  {
    name: "Thekkady",
    slug: "thekkady",
    image: "/images/destinations/thekkady.jpg",
    description: "Enjoy wildlife, spice plantations and scenic forest surroundings.",
    highlights: ["Periyar Wildlife Sanctuary", "Spice Gardens", "Boat Safari"],
  },
  {
    name: "Goa",
    slug: "goa",
    image: "/images/destinations/goa.jpg",
    description: "Plan beach holidays, coastal drives and memorable group trips.",
    highlights: ["Beaches", "Fort Aguada", "Panaji"],
  },
  {
    name: "Pondicherry",
    slug: "pondicherry",
    image: "/images/destinations/pondicherry.jpg",
    description: "Enjoy French-style streets, beaches and a relaxed coastal atmosphere.",
    highlights: ["Promenade Beach", "White Town", "Auroville"],
  },
  {
    name: "Rameswaram",
    slug: "rameswaram",
    image: "/images/destinations/rameswaram.jpg",
    description: "Visit important pilgrimage sites and beautiful coastal locations.",
    highlights: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi"],
  },
  {
    name: "Madurai",
    slug: "madurai",
    image: "/images/destinations/madurai.jpg",
    description: "Explore Tamil Nadu’s temple heritage, markets and cultural landmarks.",
    highlights: ["Meenakshi Temple", "Thirumalai Nayak Palace", "Gandhi Museum"],
  },
  {
    name: "Kanyakumari",
    slug: "kanyakumari",
    image: "/images/destinations/kanyakumari.jpg",
    description: "Experience the southern tip of India, coastal views and famous landmarks.",
    highlights: ["Vivekananda Rock", "Sunset Point", "Thiruvalluvar Statue"],
  }
];

function DestinationCard({ destination }) {
  const message = encodeURIComponent(
    `Hello Dynamic Travels, I would like to plan a trip to ${destination.name}. Please share packages and pricing.`
  );

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.07)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e9e3d7]">
        <img
          src={destination.image}
          alt={`${destination.name} travel destination`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-5 pt-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <MapPin size={14} />
            South India Tours
          </div>
          <h3 className="mt-2 text-2xl font-black text-white">{destination.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-7 text-black/65">{destination.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {destination.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-[#f5f1e8] px-3 py-2 text-xs font-medium text-black/65"
            >
              {highlight}
            </span>
          ))}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a27a20]"
        >
          Plan This Trip
          <MessageCircle size={16} />
        </a>
      </div>
    </article>
  );
}

export default function DestinationsPage() {
  return (
    <>
      <Header />

      <main className="bg-[#f8f6f1] text-[#171717]">
        <section className="bg-[#171717] px-6 py-24 text-white sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#d4af55]">
              <Sparkles size={15} />
              Explore with Dynamic Travels
            </p>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Explore South India
              <span className="block text-[#d4af55]">one journey at a time.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Discover cities, hill stations, heritage sites, pilgrimage
              destinations, beaches and wildlife locations with Dynamic Travels.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af55] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
              >
                Plan Your Journey
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              >
                View Fleet
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {[
              [ShieldCheck, "Safe & Comfortable", "Reliable vehicles and professional drivers."],
              [CalendarDays, "Flexible Planning", "Custom trips for families, groups and companies."],
              [Mountain, "All Over South India", "Travel across Karnataka, Kerala, Tamil Nadu and nearby destinations."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white p-6">
                <Icon className="text-[#a27a20]" size={24} />
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-black/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a27a20]">
              Popular destinations
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Your next journey starts here
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-black/60">
              Choose a destination and contact our team for vehicle options,
              route planning and booking details.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#d4af55] p-8 sm:p-12">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Have a different destination in mind?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/65">
              Share your destination, travel dates and group size. Our team
              will help you plan a suitable route and choose the right vehicle.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              Contact Dynamic Travels
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
