// Central content data for Dynamic Travels.
// Edit rates, categories, or destinations here — every page reads from this file.

export const GST_RATE = 0.05; // 5% tax applied to every fare

export type VehicleCategory = {
  id: string;
  name: string;
  tagline: string;
  examples: string;
  seats: number;
  luggage: string;
  ratePerKm: number; // ₹ per km
  baseFare: number; // ₹ flat pickup/base charge
  minKm: number; // minimum billable km per day
  bestFor: string;
};

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    tagline: "Light, quick, easy to park",
    examples: "Swift, i20 or similar",
    seats: 4,
    luggage: "2 bags",
    ratePerKm: 12,
    baseFare: 500,
    minKm: 80,
    bestFor: "Solo trips and city-to-city hops",
  },
  {
    id: "sedan",
    name: "Sedan",
    tagline: "The all-round comfort pick",
    examples: "Dzire, Etios or similar",
    seats: 4,
    luggage: "3 bags",
    ratePerKm: 15,
    baseFare: 700,
    minKm: 80,
    bestFor: "Couples and small families",
  },
  {
    id: "suv",
    name: "SUV",
    tagline: "Room to stretch, room to pack",
    examples: "Innova, Ertiga or similar",
    seats: 6,
    luggage: "4 bags",
    ratePerKm: 20,
    baseFare: 1000,
    minKm: 100,
    bestFor: "Family trips and hill routes",
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    tagline: "Built for the whole group",
    examples: "12-seater or similar",
    seats: 12,
    luggage: "10+ bags",
    ratePerKm: 28,
    baseFare: 1800,
    minKm: 150,
    bestFor: "Group tours and events",
  },
];

export type Destination = {
  id: string;
  name: string;
  region: string;
  distanceKm: number;
  description: string;
};

export const destinations: Destination[] = [
  {
    id: "coorg",
    name: "Coorg",
    region: "Karnataka",
    distanceKm: 265,
    description:
      "Coffee estates, misty ghats, and a slow-down-the-clock kind of quiet.",
  },
  {
    id: "ooty",
    name: "Ooty",
    region: "Tamil Nadu",
    distanceKm: 290,
    description:
      "Hairpin bends, tea gardens, and the toy train winding through the Nilgiris.",
  },
  {
    id: "gokarna",
    name: "Gokarna",
    region: "Karnataka",
    distanceKm: 480,
    description: "Quieter beaches than Goa, with cliffside walks between coves.",
  },
  {
    id: "hampi",
    name: "Hampi",
    region: "Karnataka",
    distanceKm: 350,
    description: "Boulder-strewn ruins of an empire, best seen at first light.",
  },
  {
    id: "wayanad",
    name: "Wayanad",
    region: "Kerala",
    distanceKm: 275,
    description: "Rainforest, spice plantations, and waterfalls after monsoon.",
  },
  {
    id: "pondicherry",
    name: "Pondicherry",
    region: "Tamil Nadu",
    distanceKm: 320,
    description: "French quarter streets, seaside promenade, good coffee.",
  },
];

export function computeFare(category: VehicleCategory, km: number) {
  const billableKm = Math.max(km, category.minKm);
  const distanceCharge = billableKm * category.ratePerKm;
  const subtotal = distanceCharge + category.baseFare;
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;
  return {
    billableKm,
    distanceCharge,
    baseFare: category.baseFare,
    subtotal,
    gst,
    total,
  };
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
