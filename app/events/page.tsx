// app/events/page.tsx
import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Event Transport Services | Dynamic Travels",
  description: "Specialized in corporate and event bulk vehicle bookings. Comprehensive transportation solutions for conferences, weddings, concerts, and all types of events.",
  keywords: "event transport, corporate event transportation, bulk vehicle booking, wedding transport, conference transport, group transportation, event logistics",
  openGraph: {
    title: "Event Transport Services | Dynamic Travels",
    description: "Specialized in corporate and event bulk vehicle bookings. Get seamless transportation for your events.",
    type: "website",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}