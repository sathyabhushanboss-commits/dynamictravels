export default function TrustBar() {
  const topVehicles = [
    'URBANIA',
    'INNOVA CRYSTA',
    'HYCROSS / HYBRID',
    'TEMPO TRAVELLER',
    'LUXURY BUS',
    'INNOVA',
    'ERTIGA',
    'SEDAN',
  ];

  const bottomVehicles = [
    'SUV',
    'MINI BUS',
    'EXECUTIVE VAN',
    'AIRPORT TRANSFER',
    'OUTSTATION CAB',
    'CORPORATE TRAVEL',
    'TOYOTA RUMION',
    'PREMIUM CABS',
  ];

  const topMarquee = [...topVehicles, ...topVehicles];
  const bottomMarquee = [...bottomVehicles, ...bottomVehicles];

  return (
    <section className="w-full bg-[#fffaf2] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl space-y-4">

        {/* =================================================
            TAPE 1
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border-2
            border-[#f47a20]
            bg-[#fff3df]
            shadow-[0_8px_25px_rgba(16,44,70,0.08)]
          "
        >
          {/* Orange inner line */}

          <div className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-[#f47a20]/25" />

          <div className="relative flex h-[64px] items-center overflow-hidden sm:h-[70px]">

            <div className="trust-marquee-left flex w-max items-center">

              {topMarquee.map((vehicle, index) => (
                <div
                  key={`${vehicle}-${index}`}
                  className="flex items-center"
                >
                  <span
                    className="
                      whitespace-nowrap
                      px-7
                      font-display
                      text-[12px]
                      font-extrabold
                      tracking-[0.12em]
                      text-[#102c46]
                      sm:px-10
                      sm:text-sm
                    "
                  >
                    {vehicle}
                  </span>

                  <span
                    className="
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-[#f47a20]
                    "
                  />
                </div>
              ))}

            </div>

            {/* Left fade */}

            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-10
                h-full
                w-14
                bg-gradient-to-r
                from-[#fff3df]
                to-transparent
              "
            />

            {/* Right fade */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-10
                h-full
                w-14
                bg-gradient-to-l
                from-[#fff3df]
                to-transparent
              "
            />

          </div>
        </div>


        {/* =================================================
            TAPE 2
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border-2
            border-[#f47a20]
            bg-[#fff3df]
            shadow-[0_8px_25px_rgba(16,44,70,0.08)]
          "
        >
          {/* Orange inner line */}

          <div className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-[#f47a20]/25" />

          <div className="relative flex h-[64px] items-center overflow-hidden sm:h-[70px]">

            <div className="trust-marquee-right flex w-max items-center">

              {bottomMarquee.map((vehicle, index) => (
                <div
                  key={`${vehicle}-${index}`}
                  className="flex items-center"
                >
                  <span
                    className="
                      whitespace-nowrap
                      px-7
                      font-display
                      text-[12px]
                      font-extrabold
                      tracking-[0.12em]
                      text-[#102c46]
                      sm:px-10
                      sm:text-sm
                    "
                  >
                    {vehicle}
                  </span>

                  <span
                    className="
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-[#f47a20]
                    "
                  />
                </div>
              ))}

            </div>

            {/* Left fade */}

            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-10
                h-full
                w-14
                bg-gradient-to-r
                from-[#fff3df]
                to-transparent
              "
            />

            {/* Right fade */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-10
                h-full
                w-14
                bg-gradient-to-l
                from-[#fff3df]
                to-transparent
              "
            />

          </div>
        </div>

      </div>


      {/* ===================================================
          MARQUEE ANIMATION
      =================================================== */}

      <style jsx>{`

        .trust-marquee-left {
          animation: trust-left 32s linear infinite;
          will-change: transform;
        }

        .trust-marquee-right {
          animation: trust-right 32s linear infinite;
          will-change: transform;
        }

        @keyframes trust-left {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes trust-right {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        .trust-marquee-left:hover,
        .trust-marquee-right:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {

          .trust-marquee-left {
            animation-duration: 25s;
          }

          .trust-marquee-right {
            animation-duration: 25s;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          .trust-marquee-left,
          .trust-marquee-right {
            animation: none;
          }

        }

      `}</style>

    </section>
  );
}