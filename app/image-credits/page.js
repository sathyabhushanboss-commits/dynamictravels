import Header from '@/components/Header';
import Footer from '@/components/Footer';
import credits from '@/data/image-credits.json';

// Destination photos come from Wikimedia Commons under Creative Commons /
// public-domain licences, which require crediting the author and licence.

export const metadata = { title: 'Photo Credits — Dynamic Travels' };

const entries = Object.values(credits).sort((a, b) => a.place.localeCompare(b.place));

export default function ImageCreditsPage() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-14">
        <div className="text-xs font-semibold uppercase tracking-wide text-route-teal">Legal</div>
        <h1 className="mt-1 font-display text-3xl font-bold text-asphalt">Photo Credits</h1>
        <p className="mt-3 text-sm leading-relaxed text-asphalt/70">
          Destination photos are from{' '}
          <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer" className="underline">
            Wikimedia Commons
          </a>{' '}
          and are used under the licences listed below. Images were resized and converted to WebP.
        </p>

        <ul className="mt-8 divide-y divide-asphalt/10 text-sm">
          {entries.map((c) => (
            <li key={c.source} className="py-3">
              <div className="font-semibold text-asphalt">{c.place}</div>
              <div className="text-asphalt/65">
                <a href={c.source} target="_blank" rel="noreferrer" className="underline">
                  {c.file}
                </a>{' '}
                by {c.author || 'unknown author'} · {c.license}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
