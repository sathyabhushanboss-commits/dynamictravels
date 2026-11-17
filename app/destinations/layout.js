import { SITE } from "@/lib/site";

// SEO metadata for /destinations (the page itself is a client component).
export const metadata = {
  title: "Road Trips in Urbania, Innova Crysta & Hycross",
  description: "Plan trips from Bengaluru to Mysore, Coorg, Ooty, Chikmagalur, Hampi and Kerala in a Force Urbania, Innova Crysta or Innova Hycross with a driver.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Road Trips in Urbania, Innova Crysta & Hycross",
    description: "Plan trips from Bengaluru to Mysore, Coorg, Ooty, Chikmagalur, Hampi and Kerala in a Force Urbania, Innova Crysta or Innova Hycross with a driver.",
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
