import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Car, CheckCircle2, MapPin, Route, Sun } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AUTHOR, POSTS, bookHref, formatDate, getPost, relatedPosts } from '@/lib/blog';
import { SITE, waLink } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const image = `${post.hero.img}.webp`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: AUTHOR.name }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [AUTHOR.name],
      images: [{ url: image, alt: post.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [image] },
  };
}

const anchor = (i) => `section-${i + 1}`;

function Figure({ img, alt, caption }) {
  return (
    <figure className="my-10">
      <img
        src={`${img}.webp`}
        srcSet={`${img}-sm.webp 800w, ${img}.webp 1600w`}
        sizes="(min-width: 1024px) 720px, 100vw"
        alt={alt}
        loading="lazy"
        className="w-full rounded-[24px] object-cover shadow-soft"
      />
      {caption && <figcaption className="mt-3 text-center text-sm italic text-ink-mute">{caption}</figcaption>}
    </figure>
  );
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = relatedPosts(post.slug);
  const url = `${SITE.url}/blog/${post.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: [`${SITE.url}${post.hero.img}.webp`, ...post.gallery.map((g) => `${SITE.url}${g.img}.webp`)],
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: AUTHOR.name },
        publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/images/dynamic-travels-logo.png` } },
        mainEntityOfPage: url,
        keywords: post.keywords.join(', '),
        about: { '@type': 'TouristDestination', name: post.place },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Travel Journal', item: `${SITE.url}/blog` },
          { '@type': 'ListItem', position: 3, name: post.place, item: url },
        ],
      },
    ],
  };

  const facts = [
    [Route, 'From Bengaluru', post.facts.distance],
    [Car, 'Drive time', post.facts.drive],
    [Sun, 'Best time', post.facts.best],
    [CalendarDays, 'Ideal stay', post.facts.stay],
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative isolate min-h-[68vh] overflow-hidden bg-ink">
        <img
          src={`${post.hero.img}.webp`}
          srcSet={`${post.hero.img}-sm.webp 800w, ${post.hero.img}.webp 1600w`}
          sizes="100vw"
          alt={post.hero.alt}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="mx-auto flex min-h-[68vh] max-w-4xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8">
          <Link href="/blog" className="glass mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-white">
            <ArrowLeft size={14} /> Travel Journal
          </Link>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <MapPin size={13} /> {post.place}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">SM</span>
              <span>
                By <strong className="text-white">{AUTHOR.name}</strong>
              </span>
            </span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-cream-line bg-cream-line shadow-soft md:grid-cols-4">
          {facts.map(([Icon, label, value]) => (
            <div key={label} className="bg-white p-5">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-mute">
                <Icon size={13} className="text-brand" /> {label}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_260px]">
        {/* Article */}
        <article className="min-w-0 max-w-[720px]">
          <p className="font-display text-xl leading-9 text-ink sm:text-2xl sm:leading-10">{post.excerpt}</p>

          {post.sections.map((s, i) => (
            <section key={s.h} id={anchor(i)} className="scroll-mt-28">
              <h2 className="mt-12 flex gap-3 font-display text-2xl font-extrabold leading-snug text-ink sm:text-[1.7rem]">
                <span className="mt-1 text-base font-bold text-brand">{String(i + 1).padStart(2, '0')}</span>
                {s.h}
              </h2>
              {s.p.map((para, j) => (
                <p key={j} className="mt-4 text-[17px] leading-8 text-ink-soft">
                  {para}
                </p>
              ))}
              {s.tips && (
                <div className="mt-6 rounded-[20px] border border-brand/20 bg-brand-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">Quick tips</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.tips.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm font-semibold text-ink">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {post.gallery.filter((g) => g.after === i + 1).map((g) => (
                <Figure key={g.img} {...g} />
              ))}
            </section>
          ))}

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-light">Plan this trip</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Ready for {post.place}?</h2>
            <p className="mt-2 max-w-lg text-white/75">
              A comfortable car, a driver who knows the route, and a fare you see before you book.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={bookHref(post)} className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white shadow-brand hover:bg-brand-dark">
                Book a cab to {post.place.split(' ')[0]} <ArrowRight size={17} />
              </Link>
              <a
                href={waLink(`Hello Dynamic Travels, I read your ${post.place} guide and would like to plan a trip.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/20"
              >
                Ask us on WhatsApp
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-10 flex gap-4 rounded-[24px] border border-cream-line bg-white p-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">SM</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Written by</p>
              <p className="font-display text-lg font-bold text-ink">{AUTHOR.name}</p>
              <p className="text-xs font-semibold text-brand-dark">{AUTHOR.role}</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{AUTHOR.bio}</p>
            </div>
          </div>
        </article>

        {/* Table of contents */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 rounded-[24px] border border-cream-line bg-white p-5" aria-label="In this guide">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">In this guide</p>
            <ol className="mt-3 space-y-2">
              {post.sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#${anchor(i)}`} className="flex gap-2 text-sm leading-5 text-ink-soft transition hover:text-brand-dark">
                    <span className="font-bold text-brand">{i + 1}.</span> {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>

      {/* Related */}
      <section className="border-t border-cream-line bg-white py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-extrabold text-ink">Keep exploring</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-[24px] border border-cream-line bg-cream shadow-soft">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={`${r.hero.img}-sm.webp`} alt={r.hero.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">{r.place}</p>
                  <p className="mt-1 font-display font-bold leading-snug text-ink">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
