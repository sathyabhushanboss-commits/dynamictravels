"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal, Stagger, StaggerItem, ParallaxImage } from "@/components/Motion";
import { WhatsAppIcon } from "@/components/FloatingContact";
import { waLink, telLink } from "@/lib/site";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Mountain,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* =========================================================
   DESTINATIONS — same list as before, plus region / type /
   approximate road distance from Bengaluru for each.
========================================================= */

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

const DEST_META = {
  "bengaluru": {
    "region": "Karnataka",
    "type": "City",
    "km": "Local"
  },
  "mysore": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "145"
  },
  "coorg": {
    "region": "Karnataka",
    "type": "Hills",
    "km": "250"
  },
  "nagarhole": {
    "region": "Karnataka",
    "type": "Wildlife",
    "km": "230"
  },
  "wayanad": {
    "region": "Kerala",
    "type": "Hills",
    "km": "280"
  },
  "ooty": {
    "region": "Tamil Nadu",
    "type": "Hills",
    "km": "270"
  },
  "bandipur": {
    "region": "Karnataka",
    "type": "Wildlife",
    "km": "220"
  },
  "shravanabelagola": {
    "region": "Karnataka",
    "type": "Pilgrimage",
    "km": "145"
  },
  "belur": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "220"
  },
  "halebidu": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "210"
  },
  "chikmagalur": {
    "region": "Karnataka",
    "type": "Hills",
    "km": "245"
  },
  "dharmasthala": {
    "region": "Karnataka",
    "type": "Pilgrimage",
    "km": "300"
  },
  "st-marys-island": {
    "region": "Karnataka",
    "type": "Beach",
    "km": "400"
  },
  "udupi": {
    "region": "Karnataka",
    "type": "Pilgrimage",
    "km": "400"
  },
  "murdeshwar": {
    "region": "Karnataka",
    "type": "Beach",
    "km": "480"
  },
  "jog-falls": {
    "region": "Karnataka",
    "type": "Nature",
    "km": "400"
  },
  "chitradurga": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "200"
  },
  "hampi": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "340"
  },
  "badami": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "450"
  },
  "vijayapura": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "520"
  },
  "bidar": {
    "region": "Karnataka",
    "type": "Heritage",
    "km": "690"
  },
  "kodaikanal": {
    "region": "Tamil Nadu",
    "type": "Hills",
    "km": "465"
  },
  "tirupati": {
    "region": "Andhra Pradesh",
    "type": "Pilgrimage",
    "km": "250"
  },
  "munnar": {
    "region": "Kerala",
    "type": "Hills",
    "km": "480"
  },
  "alleppey": {
    "region": "Kerala",
    "type": "Beach",
    "km": "560"
  },
  "thekkady": {
    "region": "Kerala",
    "type": "Wildlife",
    "km": "440"
  },
  "goa": {
    "region": "Goa",
    "type": "Beach",
    "km": "560"
  },
  "pondicherry": {
    "region": "Puducherry",
    "type": "Beach",
    "km": "310"
  },
  "rameswaram": {
    "region": "Tamil Nadu",
    "type": "Pilgrimage",
    "km": "600"
  },
  "madurai": {
    "region": "Tamil Nadu",
    "type": "Pilgrimage",
    "km": "435"
  },
  "kanyakumari": {
    "region": "Tamil Nadu",
    "type": "Beach",
    "km": "680"
  }
};

/* Photos: /public/images/destinations/<slug>.jpg is used when it exists.
   Until real photos are added there, each card falls back to one of the
   existing Dynamic Travels photos that matches the trip type. */
const FALLBACKS = {
  City: ["2"],
  Heritage: ["1", "urbania11", "mini11"],
  Hills: ["crysta11", "3", "hybrid11"],
  Wildlife: ["3", "innova11"],
  Nature: ["3", "crysta13"],
  Pilgrimage: ["tt11", "5", "sedan11"],
  Beach: ["4", "urbania12"],
};

const enriched = destinations.map((d, i) => {
  const m = DEST_META[d.slug] || { region: "South India", type: "Heritage", km: "" };
  const pool = FALLBACKS[m.type] || FALLBACKS.Heritage;
  return { ...d, ...m, fallback: `/images/web/${pool[i % pool.length]}-sm.webp` };
});

const REGIONS = ["All", "Karnataka", "Kerala", "Tamil Nadu", "Goa & more"];
const TYPES = ["All", "Hills", "Heritage", "Beach", "Pilgrimage", "Wildlife"];

const inRegion = (d, r) =>
  r === "All" || (r === "Goa & more" ? !["Karnataka", "Kerala", "Tamil Nadu"].includes(d.region) : d.region === r);

function DestinationCard({ destination: d }) {
  // Start with the fallback photo; switch to the real destination photo only
  // once it has loaded (an SSR'd <img> can miss onError before hydration).
  const [src, setSrc] = useState(d.fallback);
  useEffect(() => {
    if (!d.image) return;
    const probe = new Image();
    probe.onload = () => setSrc(d.image);
    probe.src = d.image;
  }, [d.image]);
  const bookHref = `/?tripType=${d.slug === "bengaluru" ? "local" : "outstation"}&drop=${encodeURIComponent(d.name.split(" /")[0])}#book`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-cream-line bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[16/11] overflow-hidden bg-cream-deep">
        <img
          src={src}
          alt={`${d.name} trip from Bengaluru with Dynamic Travels`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex justify-between">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-sky-deep">{d.type}</span>
          {d.km && (
            <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
              {d.km === "Local" ? "Local" : `~${d.km} km`}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <MapPin size={13} /> {d.region}
          </p>
          <h3 className="mt-1 font-display text-2xl font-extrabold text-white">{d.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-7 text-ink-soft">{d.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {d.highlights.map((h) => (
            <span key={h} className="rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink/70">
              {h}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
          <Link
            href={bookHref}
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
          >
            Book a Cab <ArrowRight size={16} />
          </Link>
          <a
            href={waLink(`Hello Dynamic Travels, I would like to plan a trip to ${d.name}. Please share vehicle options and pricing.`)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Plan a ${d.name} trip on WhatsApp`}
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-white transition hover:opacity-90"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DestinationsPage() {
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      enriched.filter(
        (d) =>
          inRegion(d, region) &&
          (type === "All" || d.type === type || (type === "Hills" && d.type === "Nature")) &&
          (!q.trim() ||
            `${d.name} ${d.description} ${d.highlights.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [region, type, q]
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular road-trip destinations from Bengaluru",
    itemListElement: enriched.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "TouristDestination", name: d.name, description: d.description },
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main className="bg-cream text-ink">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 -z-10">
            <ParallaxImage
              src="/images/web/4.webp"
              alt="Coastal road trip with Dynamic Travels"
              strength={14}
              className="h-full"
              overlay="bg-gradient-to-r from-ink/95 via-ink/70 to-sky-deep/30"
            />
          </div>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-36">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-brand-light">
                <Sparkles size={15} /> Explore with Dynamic Travels
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Explore South India <span className="text-gradient">one journey at a time.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                30+ hill stations, heritage sites, beaches, temples and wildlife parks — all a comfortable drive from Bengaluru
                in our sedans, Innovas, Urbanias, Tempo Travellers and buses.
              </p>
            </Reveal>

            {/* Search */}
            <Reveal delay={0.15} className="mt-10 max-w-2xl">
              <label className="glass-light flex items-center gap-3 rounded-full px-5 py-2 text-ink shadow-lift">
                <Search size={20} className="shrink-0 text-brand" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Coorg, temples, beaches…"
                  className="w-full bg-transparent py-3 text-base outline-none placeholder:text-ink/40"
                  aria-label="Search destinations"
                />
              </label>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto -mt-10 max-w-7xl px-5 sm:px-8">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {[
              [ShieldCheck, "Safe & Comfortable", "Reliable vehicles and verified, experienced drivers."],
              [CalendarDays, "Flexible Planning", "Day trips or multi-day tours for families, groups and companies."],
              [Mountain, "All Over South India", "Karnataka, Kerala, Tamil Nadu, Goa, Puducherry and beyond."],
            ].map(([Icon, title, text]) => (
              <StaggerItem key={title}>
                <div className="flex h-full gap-4 rounded-3xl border border-cream-line bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-soft text-sky-deep">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* FILTERS + GRID */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">Popular destinations</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                Your next journey <span className="text-gradient">starts here</span>
              </h2>
            </div>
            <p className="text-sm font-semibold text-ink-mute">
              Showing {list.length} of {enriched.length} destinations
            </p>
          </Reveal>

          <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  region === r ? "bg-brand text-white shadow-brand" : "bg-white text-ink/70 hover:bg-brand-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  type === t ? "border-sky bg-sky text-white" : "border-ink/10 bg-white text-ink/60 hover:border-sky/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-10 rounded-3xl border-2 border-dashed border-cream-line bg-white p-12 text-center">
              <p className="font-display text-xl font-bold">No destination matches that search.</p>
              <p className="mt-2 text-ink-soft">We go almost everywhere — tell us where you want to go.</p>
              <a href={waLink()} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
                <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
              </a>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 3) * 0.08} y={30}>
                  <DestinationCard destination={d} />
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:px-8">
          <Reveal>
            <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-[32px] bg-sky-gradient p-8 text-white shadow-glow sm:p-12 md:flex-row md:items-center">
              <div className="dot-grid absolute inset-0" />
              <div className="relative">
                <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Planning a custom multi-city tour?
                </h2>
                <p className="mt-3 max-w-xl text-white/85">
                  Tell us your dates and group size — we’ll suggest the route, vehicle and a clear all-inclusive quote.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-brand hover:bg-brand-dark">
                  Plan My Trip <ArrowRight size={17} />
                </Link>
                <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-sky-deep hover:bg-cream">
                  <Phone size={17} /> Call Us
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
