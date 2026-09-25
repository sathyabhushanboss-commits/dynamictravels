"use client";

const stats = [
  {
    number: "20K+",
    label: "HAPPY CUSTOMERS",
    title: "Trusted by Bengaluru Travelers",
    description:
      "Serving thousands of customers across Bengaluru with reliable airport transfers, local travel, corporate transportation, and outstation journeys.",
  },
  {
    number: "10K+",
    label: "SUCCESSFUL TRIPS",
    title: "Journeys Across Bangalore",
    description:
      "Thousands of completed journeys covering airport transfers, city travel, family trips, business transportation, and outstation routes.",
  },
  {
    number: "18+",
    label: "YEARS EXPERIENCE",
    title: "18+ Years in Travel",
    description:
      "More than 18 years of travel experience serving individuals, families, businesses, and groups across Bengaluru and beyond.",
  },
  {
    number: "50+",
    label: "TRAVEL ROUTES",
    title: "Routes Across Bengaluru",
    description:
      "Convenient travel connections across Bengaluru for local destinations, airports, business areas, sightseeing locations, and nearby cities.",
  },
  {
    number: "365",
    label: "DAYS A YEAR",
    title: "Travel Services All Year",
    description:
      "Plan airport transfers, local rides, corporate travel, family journeys, group tours, and outstation trips throughout the year.",
  },
  {
    number: "100%",
    label: "TRAVEL FOCUSED",
    title: "Built Around Your Journey",
    description:
      "Travel solutions designed around comfort, convenience, timely transportation, and different passenger requirements.",
  },
  {
    number: "30+",
    label: "VEHICLE OPTIONS",
    title: "Vehicles for Every Group",
    description:
      "Choose from sedans, Innova, Crysta, Hycross, Urbania, Tempo Travellers, mini buses, and buses for different travel requirements.",
  },
  {
    number: "18+",
    label: "YEARS OF SERVICE",
    title: "Serving Bangalore",
    description:
      "Long-standing travel service experience supporting individuals, families, companies, and groups across Bengaluru.",
  },
];

export default function Faq() {
  return (
    <section className="w-full overflow-hidden bg-[#fffaf2] px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-route-teal">
            By The Numbers
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-asphalt sm:text-4xl">
            Travel Experience Across Bengaluru
          </h2>

          <p className="mt-4 text-sm leading-7 text-asphalt/60 sm:text-base">
            Reliable travel services across Bengaluru and Bangalore for airport
            transfers, local transportation, corporate travel, family
            journeys, group tours, and outstation trips.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="stat-card group relative min-h-[270px] overflow-hidden rounded-[24px] border border-black/10 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]"
            >
              {/* CARD NUMBER */}
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold tracking-[0.18em] text-asphalt/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-9 w-9 items-center justify-center">
                  <span className="absolute h-9 w-9 rounded-full border border-route-teal/20 transition-all duration-500 group-hover:scale-125 group-hover:border-route-teal/40" />

                  <span className="h-2 w-2 rounded-full bg-route-teal" />
                </div>
              </div>

              {/* BIG STAT */}
              <div className="mt-8">
                <div className="stat-number font-display text-5xl font-black leading-none tracking-[-0.04em] text-route-teal transition-transform duration-500 sm:text-[52px]">
                  {stat.number}
                </div>

                <div className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-asphalt/40">
                  {stat.label}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="mt-7 font-display text-lg font-bold leading-snug text-asphalt">
                {stat.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm leading-6 text-asphalt/55">
                {stat.description}
              </p>

              {/* BOTTOM LINE */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-route-teal transition-all duration-700 group-hover:w-full" />

              {/* BACKGROUND NUMBER */}
              <span className="pointer-events-none absolute -bottom-8 -right-2 select-none font-display text-[110px] font-black leading-none text-route-teal/[0.035]">
                {index + 1}
              </span>
            </article>
          ))}
        </div>

        {/* BENGALURU SEO TEXT */}
        <div className="mt-12 border-t border-black/10 pt-8">
          <p className="text-center text-sm leading-7 text-asphalt/55">
            Serving{" "}
            <strong className="font-semibold text-asphalt">
              Bengaluru and Bangalore
            </strong>{" "}
            with airport taxi services, local car rentals, outstation cabs,
            corporate transportation, Tempo Traveller rentals, mini bus
            rentals, bus rentals, sightseeing trips, and group travel.
          </p>
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          animation: statFloat 6s ease-in-out infinite;
          will-change: transform;
        }

        .stat-card:nth-child(1) {
          animation-delay: 0s;
        }

        .stat-card:nth-child(2) {
          animation-delay: 0.35s;
        }

        .stat-card:nth-child(3) {
          animation-delay: 0.7s;
        }

        .stat-card:nth-child(4) {
          animation-delay: 1.05s;
        }

        .stat-card:nth-child(5) {
          animation-delay: 1.4s;
        }

        .stat-card:nth-child(6) {
          animation-delay: 1.75s;
        }

        .stat-card:nth-child(7) {
          animation-delay: 2.1s;
        }

        .stat-card:nth-child(8) {
          animation-delay: 2.45s;
        }

        @keyframes statFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-card {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}