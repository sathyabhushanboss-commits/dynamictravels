import { SITE } from "@/lib/site";

// SEO metadata for /fleet (the page itself is a client component).
export const metadata = {
  title: "Our Fleet \u2014 Sedan, Innova Crysta, Urbania, Tempo Traveller & Bus Rental",
  description: "Book sedans, Innova Crysta, Innova Hycross, Force Urbania, Tempo Travellers, mini buses and coaches in Bengaluru with live fares, professional drivers and 24/7 support.",
  alternates: { canonical: "/fleet" },
  openGraph: {
    title: "Our Fleet \u2014 Sedan, Innova Crysta, Urbania, Tempo Traveller & Bus Rental",
    description: "Book sedans, Innova Crysta, Innova Hycross, Force Urbania, Tempo Travellers, mini buses and coaches in Bengaluru with live fares, professional drivers and 24/7 support.",
    url: "/fleet",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Fleet", item: `${SITE.url}/fleet` },
  ],
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
