"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlaceInput from "@/components/PlaceInput";
import ConfirmationCard from "@/components/ConfirmationCard";
import { Reveal, ParallaxImage, Stagger, StaggerItem } from "@/components/Motion";
import { TRIP_TYPES, calculatePrice, formatINR } from "@/lib/pricing";
import { calcRouteKm } from "@/lib/geo";
import { getCustomer, saveCustomer, saveBookingRef } from "@/lib/cookies";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Loader2,
  MessageCircle,
  Route,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917349016519";

/* =========================================================
   FLEET DATA

   images  → real files in /public/images (the old code pointed at
             /public/images/fleet/<folder>/1.jpg, which don't exist, so every
             card showed the "Add vehicle images" placeholder).
   options → which admin rate card(s) price this vehicle. The first rateId
             that exists in /admin/rates is used. If none exists, the vehicle
             is still bookable as a "quote request" (saved to admin + email +
             WhatsApp). To give a vehicle live pricing, add it in /admin/rates
             with the exact name shown on the card (e.g. "Urbania 12 Seater").
========================================================= */

const slug = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

// Optimized WebP copies (public/images/web) — originals stay in /images.
const imgs = (prefix) =>
  [11, 12, 13, 14].map((n) => `/images/web/${prefix}${n}-sm.webp`);

const fleetCategories = [
  {
    category: "Force Urbania",
    anchor: "urbania",
    description:
      "Premium Urbania vehicles for airport transfers, corporate travel, family tours and outstation journeys.",
    vehicles: [
      { name: "Urbania 9 Seater", folder: "urbania-9-seater", seats: 9, images: imgs("urbania") },
      { name: "Urbania 12 Seater", folder: "urbania-12-seater", seats: 12, images: imgs("urbania") },
      { name: "Urbania 16 Seater", folder: "urbania-16-seater", seats: 16, images: imgs("urbania") },
      { name: "Urbania 17 Seater", folder: "urbania-17-seater", seats: 17, images: imgs("urbania") },
      { name: "Urbania Luxury", folder: "urbania-luxury", seats: 10, images: imgs("urbania") },
    ],
  },
  {
    category: "Sedan",
    anchor: "sedan",
    description:
      "Comfortable sedans for airport transfers, city rides, business travel and outstation journeys.",
    vehicles: [
      { name: "Sedan", folder: "sedan", seats: 4, images: imgs("sedan"), options: [{ label: "Standard", rateIds: ["sedan"] }] },
      { name: "Swift Dzire", folder: "swift-dzire", seats: 4, images: imgs("sedan"), options: [{ label: "Standard", rateIds: ["swift_dzire", "sedan"] }] },
      { name: "Toyota Etios", folder: "toyota-etios", seats: 4, images: imgs("sedan"), options: [{ label: "Standard", rateIds: ["toyota_etios", "sedan"] }] },
    ],
  },
  {
    category: "Toyota Innova Crysta",
    anchor: "innova-crysta",
    description:
      "Comfortable and reliable premium MPVs for family trips, business travel and long-distance journeys.",
    vehicles: [
      { name: "Innova Crysta", folder: "innova-crysta", seats: 7, images: imgs("crysta"), options: [{ label: "Standard", rateIds: ["innova_crysta", "crysta"] }] },
      { name: "Toyota Innova", folder: "toyota-innova", seats: 7, images: imgs("innova"), options: [{ label: "Standard", rateIds: ["toyota_innova", "innova", "suv"] }] },
    ],
  },
  {
    category: "Toyota Innova Hycross / Hybrid",
    anchor: "innova-hycross",
    description:
      "Spacious hybrid-friendly travel comfort for city rides, airport transfers and outstation trips.",
    vehicles: [
      { name: "Innova Hycross Hybrid", folder: "innova-hycross", seats: 7, images: imgs("hybrid"), options: [{ label: "Standard", rateIds: ["innova_hycross_hybrid", "innova_hycross", "hycross"] }] },
    ],
  },
  {
    category: "Tempo Traveller",
    anchor: "tempo-traveller",
    description:
      "Practical group transportation for pilgrimages, tours, corporate outings and family vacations.",
    vehicles: [
      {
        name: "Tempo Traveller 12 Seater", folder: "tt-12-seater", seats: 12, images: imgs("tt"),
        options: [
          { label: "AC", rateIds: ["tempo_traveller_12_seater_ac", "tt_ac"] },
          { label: "Non AC", rateIds: ["tempo_traveller_12_seater_non_ac", "tt_non_ac"] },
        ],
      },
      {
        name: "Tempo Traveller 17 Seater", folder: "tt-17-seater", seats: 17, images: imgs("tt"),
        options: [
          { label: "AC", rateIds: ["tempo_traveller_17_seater_ac", "tt_ac"] },
          { label: "Non AC", rateIds: ["tempo_traveller_17_seater_non_ac", "tt_non_ac"] },
        ],
      },
      {
        name: "Tempo Traveller 20 Seater", folder: "tt-20-seater", seats: 20, images: imgs("tt"),
        options: [
          { label: "AC", rateIds: ["tempo_traveller_20_seater_ac"] },
          { label: "Non AC", rateIds: ["tempo_traveller_20_seater_non_ac"] },
        ],
      },
    ],
  },
  {
    category: "Bus",
    anchor: "bus",
    description:
      "Group travel solutions for schools, events, corporate trips, tours and large families.",
    vehicles: [
      {
        name: "Mini Bus", folder: "mini-bus", seats: 33, images: imgs("mini"),
        options: [
          { label: "21 Seater AC", rateIds: ["mini_bus_21_ac"] },
          { label: "21 Seater Non AC", rateIds: ["mini_bus_21_non_ac"] },
          { label: "33 Seater AC", rateIds: ["mini_bus_33_ac"] },
          { label: "33 Seater Non AC", rateIds: ["mini_bus_33_non_ac"] },
        ],
      },
      {
        name: "Large Bus", folder: "large-bus", seats: 50,
        // No bus photos in /public/images yet — add bus11.png…bus14.png and
        // switch this to imgs("bus").
        images: [],
        options: [
          { label: "50 Seater AC", rateIds: ["bus_50_ac"] },
          { label: "50 Seater Non AC", rateIds: ["bus_50_non_ac"] },
        ],
      },
    ],
  },
];

// Vehicles without explicit options get one derived from their name.
function optionsFor(vehicle) {
  return vehicle.options?.length
    ? vehicle.options
    : [{ label: "Standard", rateIds: [slug(vehicle.name)] }];
}

function resolveRate(option, rates) {
  const id = option.rateIds.find((rid) => rates?.vehicles?.[rid]);
  return id ? { rateId: id, def: rates.vehicles[id] } : { rateId: null, def: null };
}

function getImages(folder) {
  return [1, 2, 3, 4].map(
    (number) => `/images/fleet/${folder}/${number}.jpg`
  );
}

const todayStr = () => new Date().toISOString().slice(0, 10);

const BOOKABLE_TRIP_TYPES = TRIP_TYPES.filter((t) => t.id !== "group");

/* =========================================================
   VEHICLE CARD
========================================================= */

function VehicleCard({ vehicle, rates, onBook }) {
  const images = useMemo(
    () => (vehicle.images?.length ? vehicle.images : getImages(vehicle.folder)),
    [vehicle.images, vehicle.folder]
  );
  const [activeImage, setActiveImage] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  // "From ₹X" teaser, using the cheapest priced option (airport or local)
  const fromPrice = useMemo(() => {
    if (!rates) return null;
    let best = null;
    for (const opt of optionsFor(vehicle)) {
      const { def } = resolveRate(opt, rates);
      if (!def || def.enquiryOnly) continue;
      const pkg = def.local?.packages?.[0]?.price;
      const air = def.airport?.flat || (def.airport ? def.airport.minKm * def.airport.ratePerKm : null);
      [pkg, air].forEach((p) => {
        if (p && (best === null || p < best)) best = p;
      });
    }
    return best;
  }, [rates, vehicle]);

  const bookingMessage = encodeURIComponent(
    `Hello Dynamic Travels, I would like to book ${vehicle.name}. Please share availability and pricing.`
  );

  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-deep">
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
                Photos coming soon
              </p>
              <p className="mt-2 text-lg font-bold text-black/75">
                {vehicle.name}
              </p>
            </div>
          </div>
        )}

        {vehicle.seats && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-black">
            Up to {vehicle.seats} seats
          </span>
        )}

        {!imageFailed && (
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
                  className={`h-2 rounded-full transition-all ${
                    activeImage === index ? "w-6 bg-white" : "w-2 bg-white/50"
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
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          <Users size={14} />
          Premium Fleet
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-ink">
            {vehicle.name}
          </h3>
          {fromPrice ? (
            <div className="shrink-0 text-right">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">
                From
              </div>
              <div className="text-lg font-black text-ink">
                {formatINR(fromPrice)}
              </div>
            </div>
          ) : (
            <span className="shrink-0 rounded-full bg-sky-soft px-3 py-1 text-[11px] font-bold text-brand">
              Quote on request
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-black/65">
          <span className="rounded-full bg-sky-soft px-3 py-2">
            Clean & Comfortable
          </span>
          <span className="rounded-full bg-sky-soft px-3 py-2">
            Professional Driver
          </span>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => onBook(vehicle)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full btn-shine bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand"
          >
            Book This Vehicle
            <ArrowRight size={17} />
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${bookingMessage}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`WhatsApp us about ${vehicle.name}`}
            className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-3 text-ink transition hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   FLEET BOOKING MODAL
   Priced vehicles → collects trip details, shows live fare,
                     then continues to /booking (payment + confirm).
   Unpriced / bus   → quote request saved directly via /api/book.
========================================================= */

function FleetBookingModal({ vehicle, rates, onClose }) {
  const router = useRouter();
  const options = optionsFor(vehicle);

  const [optionIdx, setOptionIdx] = useState(0);
  const { rateId, def } = resolveRate(options[optionIdx], rates);
  const priced = !!def && !def.enquiryOnly;

  const tripTypes = priced
    ? BOOKABLE_TRIP_TYPES.filter((t) => def.tripTypes?.includes(t.id))
    : BOOKABLE_TRIP_TYPES;

  const [tripType, setTripType] = useState(tripTypes[0]?.id || "airport");
  const [pickup, setPickup] = useState("");
  const [pickupPlace, setPickupPlace] = useState(null);
  const [drop, setDrop] = useState("");
  const [dropPlace, setDropPlace] = useState(null);
  const [date, setDate] = useState(todayStr());
  const [time, setTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState(todayStr());
  const [localPackageIdx, setLocalPackageIdx] = useState(0);
  const [km, setKm] = useState(0);
  const [kmStatus, setKmStatus] = useState("idle"); // idle | calculating | auto | error

  // Quote-request fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Prefill contact details for returning customers (cookie)
  useEffect(() => {
    const c = getCustomer();
    if (c?.name) setName(c.name);
    if (c?.phone) setPhone(c.phone);
  }, []);

  // Keep trip type valid when the AC / seater option changes
  useEffect(() => {
    if (!tripTypes.some((t) => t.id === tripType)) {
      setTripType(tripTypes[0]?.id || "airport");
    }
    setLocalPackageIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionIdx, rateId]);

  // Lock page scroll + close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const needsDrop = tripType !== "local";
  const usesRoute = tripType === "airport" || tripType === "outstation" || tripType === "oneway";

  // Auto distance (same services as the home search form)
  useEffect(() => {
    if (!usesRoute || !pickupPlace || !dropPlace) {
      setKm(0);
      setKmStatus("idle");
      return;
    }
    let cancelled = false;
    setKmStatus("calculating");
    (async () => {
      try {
        const result =
          tripType === "outstation"
            ? await calcRouteKm(pickupPlace, pickupPlace, [dropPlace]) // round trip
            : await calcRouteKm(pickupPlace, dropPlace);
        if (!cancelled) {
          setKm(result);
          setKmStatus("auto");
        }
      } catch {
        if (!cancelled) setKmStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [usesRoute, tripType, pickupPlace, dropPlace]);

  const days = useMemo(() => {
    if (tripType !== "outstation" || !date || !returnDate) return 1;
    const diff = Math.round((new Date(returnDate) - new Date(date)) / 86400000);
    return diff > 0 ? diff + 1 : 1;
  }, [tripType, date, returnDate]);

  const price = useMemo(() => {
    if (!priced) return null;
    return calculatePrice({
      vehicles: rates.vehicles,
      vehicleId: rateId,
      tripType,
      km,
      days,
      localPackageIdx,
      gstRate: rates.settings?.gstRate,
    });
  }, [priced, rates, rateId, tripType, km, days, localPackageIdx]);

  const optionSuffix = options.length > 1 ? ` — ${options[optionIdx].label}` : "";
  const displayName = `${vehicle.name}${optionSuffix}`;
  const tripTypeLabel = TRIP_TYPES.find((t) => t.id === tripType)?.label || tripType;

  function validate() {
    if (!pickup.trim()) return "Please enter a pickup location.";
    if (needsDrop && !drop.trim()) return "Please enter a drop location.";
    if (!date) return "Please choose a travel date.";
    if (date < todayStr()) return "Travel date can't be in the past.";
    if (tripType === "outstation" && returnDate < date)
      return "Return date cannot be earlier than the start date.";
    if (priced && usesRoute) {
      if (!pickupPlace || !dropPlace)
        return "Please pick your pickup and drop from the suggestions so we can calculate the distance.";
      if (kmStatus === "calculating") return "Still calculating distance — one moment.";
      if (kmStatus !== "auto")
        return "We couldn't calculate this route. Please re-select pickup and drop.";
    }
    return "";
  }

  // Priced → hand over to the existing /booking review + payment step
  function continueToBooking() {
    const msg = validate();
    if (msg) return setError(msg);
    if (price?.error) return setError(price.error);
    setError("");

    const routePts =
      usesRoute && pickupPlace && dropPlace
        ? [
            { lat: pickupPlace.lat, lng: pickupPlace.lng },
            { lat: dropPlace.lat, lng: dropPlace.lng },
          ]
        : [];

    const qs = new URLSearchParams({
      tripType,
      pickup,
      drop: needsDrop ? drop : "",
      date,
      time,
      returnDate: tripType === "outstation" ? returnDate : "",
      km: usesRoute ? String(km) : "0",
      stops: "[]",
      routePts: JSON.stringify(routePts),
      vehicleId: rateId,
      localPackageIdx: String(localPackageIdx),
      fleetVehicle: displayName,
    });
    router.push(`/booking?${qs.toString()}`);
  }

  // Not priced → save a quote request straight away
  async function sendQuoteRequest() {
    const msg = validate();
    if (msg) return setError(msg);
    if (!name.trim()) return setError("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 10)
      return setError("Please enter a valid 10-digit phone number.");
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          tripType,
          tripTypeLabel: `${tripTypeLabel} (Quote request)`,
          vehicleId: rateId || slug(displayName),
          vehicleLabel: displayName,
          fleetVehicle: displayName,
          source: "fleet",
          pickup,
          drop: needsDrop ? drop : "",
          stops: [],
          date,
          time,
          returnDate: tripType === "outstation" ? returnDate : "",
          days,
          km,
          passengers,
          notes,
          price: { enquiryOnly: true },
          payment: { optionId: "later" },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data.booking);
      saveCustomer({ name: name.trim(), phone: phone.trim(), email: "" });
      saveBookingRef(data.booking);
    } catch (err) {
      setError(`${err.message} — please call or WhatsApp us instead.`);
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-black/35 focus:border-sky";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${vehicle.name}`}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]">
        {/* Header strip */}
        <div className="flex items-center gap-4 border-b border-black/10 bg-ink px-5 py-4 text-white sm:px-7">
          {vehicle.images?.[0] && (
            <img
              src={vehicle.images[0]}
              alt=""
              className="h-12 w-16 shrink-0 rounded-xl object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-light">
              {priced ? "Book online" : "Request a quote"}
            </p>
            <h2 className="truncate text-lg font-black tracking-tight">{displayName}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          {result ? (
            <ConfirmationCard booking={result} onReset={onClose} />
          ) : (
            <div className="space-y-5">
              {/* Variant (AC / seater) */}
              {options.length > 1 && (
                <div>
                  <Label>Choose type</Label>
                  <div className="flex flex-wrap gap-2">
                    {options.map((o, i) => (
                      <Pill key={o.label} active={optionIdx === i} onClick={() => setOptionIdx(i)}>
                        {o.label}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Trip type */}
              <div>
                <Label>Trip type</Label>
                <div className="flex flex-wrap gap-2">
                  {tripTypes.map((t) => (
                    <Pill key={t.id} active={tripType === t.id} onClick={() => setTripType(t.id)}>
                      {t.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Places */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={needsDrop ? "" : "sm:col-span-2"}>
                  <Label>Pickup location</Label>
                  <PlaceInput
                    value={pickup}
                    onChange={setPickup}
                    onPlaceSelect={setPickupPlace}
                    placeholder="Area, landmark or address"
                    className={inputCls}
                  />
                </div>
                {needsDrop && (
                  <div>
                    <Label>{tripType === "outstation" ? "Destination" : "Drop location"}</Label>
                    <PlaceInput
                      value={drop}
                      onChange={setDrop}
                      onPlaceSelect={setDropPlace}
                      placeholder={tripType === "airport" ? "e.g. Bangalore Airport" : "City or address"}
                      className={inputCls}
                    />
                  </div>
                )}
              </div>

              {/* Date / time */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label icon={CalendarDays}>{tripType === "outstation" ? "Start date" : "Date"}</Label>
                  <input type="date" min={todayStr()} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <Label icon={Clock}>Pickup time</Label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
                </div>
                {tripType === "outstation" && (
                  <div>
                    <Label icon={CalendarDays}>Return date</Label>
                    <input type="date" min={date} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
                  </div>
                )}
              </div>

              {/* Local package picker */}
              {priced && tripType === "local" && def.local?.packages?.length > 0 && (
                <div>
                  <Label>Package</Label>
                  <div className="flex flex-wrap gap-2">
                    {def.local.packages.map((p, i) => (
                      <Pill key={i} active={localPackageIdx === i} onClick={() => setLocalPackageIdx(i)}>
                        {p.hrs} hrs / {p.km} km · {formatINR(p.price)}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Distance status */}
              {usesRoute && kmStatus !== "idle" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-black/55">
                  {kmStatus === "calculating" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Route size={14} className="text-brand" />
                  )}
                  {kmStatus === "calculating" && "Calculating distance…"}
                  {kmStatus === "auto" && `${km} km ${tripType === "outstation" ? "round trip" : "by road"}`}
                  {kmStatus === "error" && "Couldn't calculate the route — please re-select the places."}
                </div>
              )}

              {/* Quote-request contact fields */}
              {!priced && (
                <>
                  <div className="flex gap-3 rounded-2xl border border-brand/40 bg-brand/10 p-4 text-sm leading-6 text-black/70">
                    <Info size={18} className="mt-0.5 shrink-0 text-brand" />
                    Fares for this vehicle depend on the route and season. Send your trip details and our team will call you with the best quote — no payment needed now.
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Full name</Label>
                      <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <Label>Phone number</Label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="10-digit mobile" className={inputCls} />
                    </div>
                    <div>
                      <Label icon={Users}>Passengers</Label>
                      <input value={passengers} onChange={(e) => setPassengers(e.target.value)} type="number" min="1" max={vehicle.seats || 60} placeholder={`Up to ${vehicle.seats || ""}`} className={inputCls} />
                    </div>
                    <div>
                      <Label>Notes (optional)</Label>
                      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Luggage, stops, occasion…" className={inputCls} />
                    </div>
                  </div>
                </>
              )}

              {/* Live fare */}
              {priced && price && !price.error && (
                <div className="rounded-2xl bg-ink p-5 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-light">
                        Estimated fare
                      </p>
                      <p className="mt-1 text-3xl font-black">{formatINR(price.total)}</p>
                      <p className="mt-1 text-xs text-white/55">
                        incl. {Math.round((price.gstRate || 0) * 100)}% GST
                        {tripType === "outstation" ? ` · ${days} day(s)` : ""}
                      </p>
                    </div>
                    <p className="max-w-[45%] text-right text-[11px] leading-5 text-white/50">
                      Pay later, 25% advance or in full on the next step
                    </p>
                  </div>
                  <ul className="mt-4 space-y-1 border-t border-white/10 pt-3 text-xs text-white/65">
                    {price.breakdown.map((b, i) => (
                      <li key={i} className="flex justify-between gap-4">
                        <span>{b.label}</span>
                        {b.amount !== null && <span>{formatINR(b.amount)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              <button
                type="button"
                disabled={submitting}
                onClick={priced ? continueToBooking : sendQuoteRequest}
                className="inline-flex w-full items-center justify-center gap-2 btn-shine rounded-full bg-brand px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-brand transition hover:bg-brand-dark disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Sending…
                  </>
                ) : priced ? (
                  <>
                    Continue to Booking <ArrowRight size={17} />
                  </>
                ) : (
                  <>
                    Send Quote Request <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children, icon: Icon }) {
  return (
    <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-black/50">
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
        active
          ? "border-ink bg-ink text-white"
          : "border-black/15 bg-white text-black/65 hover:border-black/40"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function FleetPage() {
  const [rates, setRates] = useState(null);
  const [bookingVehicle, setBookingVehicle] = useState(null);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then(setRates)
      .catch(() => setRates({ vehicles: {}, settings: {} }));
  }, []);

  return (
    <>
      <Header />

      <main className="bg-cream text-ink">
        <section className="relative isolate overflow-hidden bg-ink px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <ParallaxImage
              src="/images/web/1.webp"
              alt="Dynamic Travels fleet lined up at Mysore Palace"
              strength={14}
              className="h-full"
              overlay="bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30"
            />
          </div>
          <div className="dot-grid absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-light">
              Dynamic Travels Fleet
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Vehicles for every
              <span className="block text-brand-light">kind of journey.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Explore our premium cars, Urbania vehicles, Tempo Travellers and
              buses for local travel, airport transfers, corporate journeys
              and outstation tours.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#fleet-list"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-white hover:text-brand"
              >
                Book a Vehicle
                <ArrowRight size={17} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              >
                Request a Booking
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

        <section id="fleet-list" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16">
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
                <CheckCircle2 className="text-brand" size={21} />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          {fleetCategories.map((category) => (
            <section key={category.category} id={category.anchor} className="mb-20 scroll-mt-28 last:mb-0">
              <Reveal className="mb-8 max-w-3xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  Our Fleet
                </p>
                <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                  {category.category}
                </h2>
                <p className="mt-4 leading-7 text-black/60">
                  {category.description}
                </p>
              </Reveal>

              <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.vehicles.map((vehicle) => (
                  <StaggerItem key={vehicle.folder}>
                    <VehicleCard
                      vehicle={vehicle}
                      rates={rates}
                      onBook={setBookingVehicle}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ))}
        </section>

        <section className="px-6 pb-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-sky-gradient p-8 text-white shadow-glow sm:p-12 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                <ShieldCheck size={16} />
                Travel with confidence
              </div>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Need help choosing the right vehicle?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
                Tell us your destination, travel date and group size. Our team
                will help you select a suitable vehicle.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-white hover:text-brand"
            >
              Contact Our Team
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {bookingVehicle && rates && (
        <FleetBookingModal
          key={bookingVehicle.folder}
          vehicle={bookingVehicle}
          rates={rates}
          onClose={() => setBookingVehicle(null)}
        />
      )}
    </>
  );
}
