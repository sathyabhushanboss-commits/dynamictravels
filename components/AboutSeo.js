"use client";

import { useState } from "react";

const SECTIONS = [
  {
    number: "01",
    label: "Dynamic Travels",
    title: "Best Tours and Travels in Bengaluru",
    text: "Dynamic Travels provides reliable tours, travel and cab services in Bengaluru, Karnataka, for individuals, families, businesses and groups. If you are searching for the best tours and travels in Bengaluru or a dependable Bangalore taxi service, we provide comfortable transportation for airport travel, local journeys, outstation trips and group transportation.",
  },
  {
    number: "02",
    label: "Airport Travel",
    title: "Airport Taxi Service in Bengaluru",
    text: "Convenient airport taxi services for passengers travelling to and from Kempegowda International Airport Bengaluru — comfortable pickups, drops and scheduled journeys, based on your passenger count and luggage.",
  },
  {
    number: "03",
    label: "Local Travel",
    title: "Bangalore Taxi Service for City Travel",
    text: "Travel conveniently across Bengaluru for business meetings, shopping, appointments, family journeys and everyday transportation — across North, central and surrounding areas.",
  },
  {
    number: "04",
    label: "Outstation Travel",
    title: "Outstation Cab Service from Bangalore",
    text: "Weekend getaways, family holidays, pilgrimages and intercity travel. Popular routes: Mysore, Coorg, Chikmagalur, Ooty, Wayanad, Tirupati, Chennai, Mangalore, Udupi, Gokarna.",
  },
  {
    number: "05",
    label: "Group Transportation",
    title: "Tempo Traveller & Urbania for Groups",
    text: "Tempo Travellers, Force Urbania, Innova Crysta and other group transportation, subject to availability — for corporate events, weddings, social gatherings and educational trips.",
  },
  {
    number: "06",
    label: "Your Travel Partner",
    title: "A Dependable Travel Partner in Bengaluru",
    text: "Tell us your pickup location, destination, travel date, vehicle requirement and group size. Our team coordinates the right transportation for your journey.",
  },
];

export default function AboutSeo() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#fffaf2] py-20 sm:py-28">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[#5bc0eb]/7 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#f47b20]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#a84409]">
            Dynamic Travels
          </div>

          <h2 className="font-display mt-4 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[#102a43] sm:text-5xl">
            A Dependable Travel Partner in Bengaluru
          </h2>
        </div>

        {/* Expandable list */}
        <div className="mt-16 border-t border-[#102a43]/12">
          {SECTIONS.map((section, index) => (
            <Row
              key={section.number}
              section={section}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function Row({ section, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#102a43]/12">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
      >
        <span className="font-display shrink-0 text-sm font-bold text-[#a84409] sm:text-base">
          {section.number}
        </span>

        <span
          className={`font-display flex-1 text-xl font-bold leading-tight transition-colors duration-300 sm:text-2xl lg:text-3xl ${
            isOpen ? "text-[#102a43]" : "text-[#102a43]/45"
          }`}
        >
          {section.title}
        </span>

        <span
          className={`shrink-0 text-2xl font-light text-[#a84409] transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-3 pb-7 pl-0 sm:flex-row sm:gap-8 sm:pb-8 sm:pl-[52px]">
            <div className="text-[9px] font-black uppercase tracking-[0.25em] text-[#a84409] sm:w-40 sm:shrink-0 sm:pt-1">
              {section.label}
            </div>

            <p className="max-w-xl text-sm leading-6 text-[#102a43]/60 sm:text-base sm:leading-7">
              {section.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}