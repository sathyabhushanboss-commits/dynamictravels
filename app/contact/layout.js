import { SITE } from "@/lib/site";

// SEO metadata for /contact (the page itself is a client component).
export const metadata = {
  title: "Contact Dynamic Travels \u2014 Call, WhatsApp or Email 24/7",
  description: "Contact Dynamic Travels in Bengaluru for cab, Tempo Traveller and bus bookings. Call, WhatsApp or email us any time \u2014 we reply fast.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Dynamic Travels \u2014 Call, WhatsApp or Email 24/7",
    description: "Contact Dynamic Travels in Bengaluru for cab, Tempo Traveller and bus bookings. Call, WhatsApp or email us any time \u2014 we reply fast.",
    url: "/contact",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.url}/contact` },
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
