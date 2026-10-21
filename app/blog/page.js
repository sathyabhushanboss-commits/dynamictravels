import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AUTHOR, POSTS, formatDate } from '@/lib/blog';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Travel Journal — Road Trips from Bengaluru',
  description:
    'Honest, detailed travel guides to Mysore, Coorg, Ooty, Hampi, Chikmagalur, Gokarna, Wayanad, Munnar, Pondicherry and the Hoysala temples — by Sathyabhushan M N.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Travel Journal — Road Trips from Bengaluru',
    description: 'Detailed guides to the best road trips from Bengaluru, by Sathyabhushan M N.',
    url: '/blog',
    images: ['/images/destinations/mysore.webp'],
  },
};

function Card({ post, big = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-cream-line bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
        big ? 'lg:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-cream-deep ${big ? 'aspect-[16/10] lg:aspect-auto lg:w-[58%]' : 'aspect-[16/10]'}`}>
        <img
          src={`${post.hero.img}${big ? '' : '-sm'}.webp`}
          alt={post.hero.alt}
          loading={big ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition duration-[1.2s] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
          <MapPin size={12} className="text-brand" /> {post.place}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${big ? 'lg:justify-center lg:p-10' : ''}`}>
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-mute">
          {formatDate(post.date)}
        </p>
        <h2 className={`mt-3 font-display font-extrabold leading-snug text-ink ${big ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'}`}>
          {post.title}
        </h2>
        <p className={`mt-3 text-ink-soft ${big ? 'text-base leading-7' : 'line-clamp-3 text-sm leading-6'}`}>{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-brand-dark">
          Read the guide <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Travel Journal`,
    url: `${SITE.url}/blog`,
    author: { '@type': 'Person', name: AUTHOR.name },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Person', name: AUTHOR.name },
    })),
  };

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">The Travel Journal</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Places worth <span className="text-gradient">the drive.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Unhurried, practical guides to the road trips we love most from Bengaluru — written by {AUTHOR.name}.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Card post={featured} big />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Card key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
