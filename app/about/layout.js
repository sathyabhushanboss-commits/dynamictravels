import { SITE } from "@/lib/site";

// SEO metadata for /about (the page itself is a client component).
export const metadata = {
  title: "About Us — Urbania, Innova Crysta & Hycross Rentals",
  description: "ISO 9001:2015 certified Bengaluru travel company renting Force Urbania, Innova Crysta and Innova Hycross with experienced drivers for tours and airport trips.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us — Urbania, Innova Crysta & Hycross Rentals",
    description: "ISO 9001:2015 certified Bengaluru travel company renting Force Urbania, Innova Crysta and Innova Hycross with experienced drivers for tours and airport trips.",
    url: "/about",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
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
