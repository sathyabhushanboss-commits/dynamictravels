import { SITE } from "@/lib/site";

// SEO metadata for /about (the page itself is a client component).
export const metadata = {
  title: "About Dynamic Travels \u2014 ISO 9001:2015 Certified Travel Company",
  description: "Dynamic Travels is an ISO 9001:2015 certified travel and transportation company in Bengaluru, serving families, corporates and tourists across South India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dynamic Travels \u2014 ISO 9001:2015 Certified Travel Company",
    description: "Dynamic Travels is an ISO 9001:2015 certified travel and transportation company in Bengaluru, serving families, corporates and tourists across South India.",
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
