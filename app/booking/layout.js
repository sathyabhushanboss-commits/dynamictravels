import { SITE } from "@/lib/site";

// SEO metadata for /booking (the page itself is a client component).
export const metadata = {
  title: "Review & Confirm Your Booking",
  description: "Review your fare and confirm your Dynamic Travels booking.",
  alternates: { canonical: "/booking" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Review & Confirm Your Booking",
    description: "Review your fare and confirm your Dynamic Travels booking.",
    url: "/booking",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Booking", item: `${SITE.url}/booking` },
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
