import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Dynamic Travels",
  description: "Discover our story, mission, and the team behind your travel experiences",
};

export default function AboutPage() {
  return <AboutClient />;
}