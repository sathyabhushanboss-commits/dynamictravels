import { SITE } from "@/lib/site";

// SEO metadata for /destinations (the page itself is a client component).
export const metadata = {
  title: "Tour Destinations from Bengaluru \u2014 Mysore, Coorg, Ooty, Goa & More",
  description: "Plan road trips from Bengaluru to Mysore, Coorg, Ooty, Chikmagalur, Hampi, Goa, Kerala and Tamil Nadu with Dynamic Travels cabs, Tempo Travellers and buses.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Tour Destinations from Bengaluru \u2014 Mysore, Coorg, Ooty, Goa & More",
    description: "Plan road trips from Bengaluru to Mysore, Coorg, Ooty, Chikmagalur, Hampi, Goa, Kerala and Tamil Nadu with Dynamic Travels cabs, Tempo Travellers and buses.",
    url: "/destinations",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Destinations", item: `${SITE.url}/destinations` },
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
