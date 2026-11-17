import { SITE } from "@/lib/site";

// SEO metadata for /contact (the page itself is a client component).
export const metadata = {
  title: "Book Urbania, Innova Crysta or Hycross — Contact 24/7",
  description: "Call or WhatsApp Dynamic Travels to book a Force Urbania, Innova Crysta or Innova Hycross with driver in Bengaluru. Quick replies, 24/7.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book Urbania, Innova Crysta or Hycross — Contact 24/7",
    description: "Call or WhatsApp Dynamic Travels to book a Force Urbania, Innova Crysta or Innova Hycross with driver in Bengaluru. Quick replies, 24/7.",
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
