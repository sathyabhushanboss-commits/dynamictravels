import Link from "next/link";
import { destinations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Dynamic Travels",
  description: "Popular outstation routes from Bengaluru, with approximate one-way distances.",
};

export default function DestinationsPage() {
  return (
    <div>
      <section className="bg-ink-900 text-concrete-50">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">Destinations</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Six routes,
            <br /> one starting point.
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80">
            All distances below are approximate one-way km from Bengaluru.
            Use them directly in the fare calculator to see a total.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <div key={d.id} className="flex flex-col border border-ink-100 bg-concrete-50 p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-ink-900">{d.name}</h2>
                <span className="font-mono text-sm text-signal-green">{d.distanceKm} km</span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-steel">{d.region}</p>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-400">{d.description}</p>
              <Link
                href={`/fare-calculator?km=${d.distanceKm}`}
                className="mt-5 font-body text-sm underline underline-offset-4 text-signal-green"
              >
                Price this route →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
