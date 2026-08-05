import Link from "next/link";
import RouteDivider from "./RouteDivider";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-concrete-100/70">
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <RouteDivider label="End of route" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold uppercase text-concrete-50">
            Dynamic Travels
          </p>
          <p className="mt-2 max-w-xs font-body text-sm leading-relaxed">
            Outstation cabs and group travel across South India, booked in
            minutes, priced upfront.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Navigate
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm">
            <li><Link href="/fleet" className="hover:text-concrete-50">Fleet & rates</Link></li>
            <li><Link href="/destinations" className="hover:text-concrete-50">Destinations</Link></li>
            <li><Link href="/fare-calculator" className="hover:text-concrete-50">Fare calculator</Link></li>
            <li><Link href="/contact" className="hover:text-concrete-50">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Reach us
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm">
            <li>+91 98450 12345</li>
            <li>hello@dynamictravels.example</li>
            <li>Bengaluru, Karnataka</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-600 px-5 py-4 text-center font-mono text-xs text-steel sm:px-8">
        © {new Date().getFullYear()} Dynamic Travels. All fares include 5% GST.
      </div>
    </footer>
  );
}
