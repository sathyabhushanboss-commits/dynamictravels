"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { vehicleCategories, computeFare, formatINR, GST_RATE } from "@/lib/data";

export default function FareCalculator() {
  const searchParams = useSearchParams();
  const prefillCategory = searchParams.get("category");
  const prefillKm = searchParams.get("km");

  const [categoryId, setCategoryId] = useState(
    vehicleCategories.some((v) => v.id === prefillCategory)
      ? (prefillCategory as string)
      : vehicleCategories[1].id // Sedan default
  );
  const [km, setKm] = useState<string>(prefillKm ?? "");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  const category = vehicleCategories.find((v) => v.id === categoryId)!;
  const kmValue = Math.max(0, Number(km) || 0);
  const effectiveKm = tripType === "round-trip" ? kmValue * 2 : kmValue;

  const fare = useMemo(() => computeFare(category, effectiveKm), [category, effectiveKm]);

  const belowMinimum = effectiveKm > 0 && effectiveKm < category.minKm;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <label className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Vehicle category
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {vehicleCategories.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setCategoryId(v.id)}
                aria-pressed={categoryId === v.id}
                className={`border px-3 py-3 text-left transition-colors ${
                  categoryId === v.id
                    ? "border-signal-green bg-signal-green text-concrete-50"
                    : "border-ink-100 bg-concrete-50 text-ink-900 hover:border-ink-400"
                }`}
              >
                <p className="font-display text-lg font-bold uppercase leading-none">{v.name}</p>
                <p
                  className={`mt-1 font-mono text-xs ${
                    categoryId === v.id ? "text-concrete-100" : "text-steel"
                  }`}
                >
                  ₹{v.ratePerKm}/km
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="km" className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Distance (km)
          </label>
          <input
            id="km"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="e.g. 265"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            className="mt-3 w-full border border-ink-100 bg-concrete-50 px-4 py-3 font-mono odometer text-xl text-ink-900 outline-none focus:border-signal-green"
          />
          <p className="mt-2 font-body text-xs text-steel">
            One-way distance to your destination.
          </p>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Trip type
          </label>
          <div className="mt-3 flex gap-2">
            {(["one-way", "round-trip"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTripType(t)}
                aria-pressed={tripType === t}
                className={`flex-1 border px-3 py-2.5 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  tripType === t
                    ? "border-signal-green bg-signal-green text-concrete-50"
                    : "border-ink-100 bg-concrete-50 text-ink-900 hover:border-ink-400"
                }`}
              >
                {t === "one-way" ? "One way" : "Round trip"}
              </button>
            ))}
          </div>
        </div>

        {belowMinimum && (
          <p className="border-l-2 border-signal-amber bg-signal-amber/10 px-4 py-3 font-body text-sm text-ink-600">
            {category.name} bills a minimum of {category.minKm} km/day. Your
            fare below is calculated on that minimum, not the {effectiveKm}{" "}
            km entered.
          </p>
        )}
      </div>

      {/* Result — the signature "toll board" readout */}
      <div className="lg:col-span-3">
        <div className="bg-ink-900 p-6 text-concrete-50 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-amber">
              Fare estimate
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
              {category.name} · {tripType.replace("-", " ")}
            </p>
          </div>

          <div className="mt-2 route-line" style={{ backgroundImage: "repeating-linear-gradient(to right, #333B47 0, #333B47 10px, transparent 10px, transparent 20px)" }} />

          <dl className="mt-6 space-y-3 font-body text-sm">
            <Row label={`Billable distance (${fare.billableKm} km × ₹${category.ratePerKm})`} value={formatINR(fare.distanceCharge)} />
            <Row label="Base fare" value={formatINR(fare.baseFare)} />
            <Row label="Subtotal" value={formatINR(fare.subtotal)} strong />
            <Row label={`GST (${(GST_RATE * 100).toFixed(0)}%)`} value={formatINR(fare.gst)} />
          </dl>

          <div className="mt-6 border-t border-ink-600 pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Total payable</p>
            <p className="mt-1 font-mono odometer text-5xl font-medium text-signal-amber sm:text-6xl">
              {formatINR(fare.total)}
            </p>
          </div>
        </div>

        <p className="mt-4 font-body text-xs text-steel">
          Estimate only. Tolls, parking, state permits, and night driver
          allowance (11pm–6am) are billed at actuals and not included above.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? "text-concrete-50" : "text-concrete-100/70"}>{label}</dt>
      <dd className={`font-mono odometer ${strong ? "text-concrete-50 font-medium" : "text-concrete-100/90"}`}>
        {value}
      </dd>
    </div>
  );
}
