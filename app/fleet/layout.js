import { SITE } from "@/lib/site";

// SEO metadata for /fleet (the page itself is a client component).
export const metadata = {
  title: "Force Urbania, Innova Crysta & Hycross Rental Fleet",
  description: "Rent Force Urbania (9–17 seater), Innova Crysta and Innova Hycross with driver in Bengaluru, plus sedans, Fortuner and Tempo Travellers. Live fares 24/7.",
  alternates: { canonical: "/fleet" },
  openGraph: {
    title: "Force Urbania, Innova Crysta & Hycross Rental Fleet",
    description: "Rent Force Urbania (9–17 seater), Innova Crysta and Innova Hycross with driver in Bengaluru, plus sedans, Fortuner and Tempo Travellers. Live fares 24/7.",
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
