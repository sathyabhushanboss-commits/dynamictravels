import { Suspense } from "react";
import FareCalculator from "@/components/FareCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fare Calculator | Dynamic Travels",
  description: "Pick a vehicle category, enter the distance, and get an instant total with 5% GST included. No booking required.",
};

export default function FareCalculatorPage() {
  return (
    <div>
      <section className="bg-ink-900 text-concrete-50">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-amber">Fare calculator</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            See the total
            <br /> before you call.
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-concrete-100/80">
            Category rate × distance, plus base fare, plus 5% GST. That&apos;s
            the whole formula — nothing added later.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Suspense fallback={<div className="font-body text-ink-400">Loading calculator…</div>}>
          <FareCalculator />
        </Suspense>
      </section>
    </div>
  );
}
