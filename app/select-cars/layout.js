import { SITE } from "@/lib/site";

// SEO metadata for /select-cars (the page itself is a client component).
export const metadata = {
  title: "Choose Your Vehicle",
  description: "Compare vehicles and fares for your trip.",
  alternates: { canonical: "/select-cars" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Choose Your Vehicle",
    description: "Compare vehicles and fares for your trip.",
    url: "/select-cars",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Select Vehicle", item: `${SITE.url}/select-cars` },
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
