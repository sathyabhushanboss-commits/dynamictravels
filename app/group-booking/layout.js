import { SITE } from "@/lib/site";

// SEO metadata for /group-booking (the page itself is a client component).
export const metadata = {
  title: "Group Travel \u2014 Mini Bus, 33 & 50 Seater Bus Hire in Bengaluru",
  description: "Hire mini buses, 33-seater and 50-seater coaches in Bengaluru for schools, weddings, pilgrimages, corporate events and tours. Get a quick quote.",
  alternates: { canonical: "/group-booking" },
  openGraph: {
    title: "Group Travel \u2014 Mini Bus, 33 & 50 Seater Bus Hire in Bengaluru",
    description: "Hire mini buses, 33-seater and 50-seater coaches in Bengaluru for schools, weddings, pilgrimages, corporate events and tours. Get a quick quote.",
    url: "/group-booking",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Group Travel", item: `${SITE.url}/group-booking` },
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
