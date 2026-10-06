import { SITE } from '@/lib/site';

// Generates /sitemap.xml — submit this URL in Google Search Console.
export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/fleet', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/destinations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/group-booking', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/my-bookings', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cancellation-policy', priority: 0.2, changeFrequency: 'yearly' },
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
