import { SITE } from "@/lib/site";

// SEO metadata for /my-bookings (the page itself is a client component).
export const metadata = {
  title: "My Bookings \u2014 Track Your Ride",
  description: "Track your Dynamic Travels booking with the phone number you booked with.",
  alternates: { canonical: "/my-bookings" },
  openGraph: {
    title: "My Bookings \u2014 Track Your Ride",
    description: "Track your Dynamic Travels booking with the phone number you booked with.",
    url: "/my-bookings",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "My Bookings", item: `${SITE.url}/my-bookings` },
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
