import "@fontsource-variable/outfit";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import CookieConsent from "@/components/CookieConsent";
import { ScrollProgress } from "@/components/Motion";
import { SITE, fullAddress } from "@/lib/site";

/* =========================================================
   ON-PAGE SEO — site-wide defaults. Each page overrides title,
   description and canonical through its own metadata / layout.js.
========================================================= */

const KEYWORDS = [
  "Dynamic Travels",
  "cab booking Bangalore",
  "taxi service Bengaluru",
  "airport taxi Bangalore",
  "Bangalore airport cab",
  "outstation cabs from Bangalore",
  "Innova Crysta rental Bangalore",
  "Tempo Traveller rental Bangalore",
  "Force Urbania on rent Bangalore",
  "mini bus rental Bangalore",
  "bus hire Bengaluru",
  "car rental with driver Bangalore",
  "one way taxi Bangalore",
  "Bangalore to Mysore cab",
  "Bangalore to Coorg taxi",
  "Bangalore to Ooty cab",
  "corporate cab service Bangalore",
  "wedding car rental Bangalore",
  "travel agency Bengaluru",
];

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Dynamic Travels | Cab, Tempo Traveller & Bus Booking in Bengaluru",
    template: "%s | Dynamic Travels Bengaluru",
  },
  description: SITE.description,
  keywords: KEYWORDS,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "travel",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "Dynamic Travels — Premium Cabs, Tempo Travellers & Buses in Bengaluru",
    description: SITE.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dynamic Travels fleet at Mysore Palace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic Travels — Premium Travel in Bengaluru",
    description: SITE.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    // Paste the codes from Google Search Console / Bing Webmaster Tools into .env.local
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2A3D" },
  ],
};

/* =========================================================
   STRUCTURED DATA (JSON-LD) — helps Google show the business
   name, phone, address, hours and services in search results.
========================================================= */

const sameAs = Object.values(SITE.social).filter(Boolean);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "TaxiService", "LocalBusiness"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/images/dynamic-travels-logo.png`,
      image: [`${SITE.url}/og-image.jpg`, `${SITE.url}/images/web/1.webp`, `${SITE.url}/images/web/4.webp`],
      description: SITE.description,
      telephone: SITE.phone,
      email: SITE.email,
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "State", name: "Karnataka" },
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "State", name: "Kerala" },
        { "@type": "State", name: "Goa" },
      ],
      hasCredential: { "@type": "EducationalOccupationalCredential", name: "ISO 9001:2015 — Car Rental Service" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Travel services",
        itemListElement: [
          "Airport Taxi",
          "Local Cab Rental",
          "Outstation Round Trip",
          "One Way Drop",
          "Tempo Traveller Rental",
          "Force Urbania Rental",
          "Mini Bus & Bus Rental",
          "Corporate & Wedding Transportation",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#business` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preload" as="image" href="/images/web/1.webp" type="image/webp" />
        <meta name="address" content={fullAddress} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <ScrollProgress />
        {children}
        <FloatingContact />
        <CookieConsent />
      </body>
    </html>
  );
}
