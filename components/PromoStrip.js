"use client";

import { useEffect, useState } from "react";

const promos = [
  {
    number: "01",
    title: "Book now, pay later",
    body: "Confirm your ride free and settle conveniently with cash or UPI after your journey.",
  },
  {
    number: "02",
    title: "Free cancellations",
    body: "Plans changed? Cancel up to 1 hour before pickup with simple, flexible booking.",
  },
  {
    number: "03",
    title: "24×7 travel support",
    body: "Our travel assistance team is available around the clock for your journey needs.",
  },
  {
    number: "04",
    title: "Bangalore-wide service",
    body: "Airport transfers, local rentals and outstation travel across Bengaluru and beyond.",
  },
  {
    number: "05",
    title: "Professional chauffeurs",
    body: "Travel comfortably with experienced drivers and dependable pickup coordination.",
  },
  {
    number: "06",
    title: "Premium travel experience",
    body: "Clean vehicles, transparent booking and comfortable journeys for every occasion.",
  },
];

export default function PromoStrip() {
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const timers = [];

    promos.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCards(index + 1);
      }, 500 + index * 650);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fffaf2] py-20 sm:py-24 lg:py-28">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            -left-40
            -top-40
            h-[480px]
            w-[480px]
            rounded-full
            bg-[#f47b20]/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            h-[480px]
            w-[480px]
            rounded-full
            bg-[#5bc0eb]/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[650px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#102a43]/5
          "
        />

      </div>


      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-14 flex items-end gap-8">

          <div>

            <p
              className="
                text-[12px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#b94d0b]
              "
            >
              The Dynamic Standard
            </p>

            <h2
              className="
                mt-4
                font-display
                text-4xl
                font-black
                leading-[0.98]
                tracking-[-0.05em]
                text-[#102a43]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Travel should feel

              <span className="block text-[#d85b0b]">
                effortless.
              </span>
            </h2>

          </div>


          <div
            className="
              mb-3
              hidden
              h-px
              flex-1
              bg-[#b94d0b]/20
              lg:block
            "
          />


          <div className="mb-2 hidden text-right lg:block">

            <div
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.25em]
                text-[#102a43]/35
              "
            >
              Dynamic Travels
            </div>

            <div
              className="
                mt-1
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[#102a43]/25
              "
            >
              Bengaluru
            </div>

          </div>

        </div>


        {/* ===================================================
            3 × 2 GRID
        ==================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {promos.map((promo, index) => {

            const isVisible = visibleCards > index;

            return (
              <article
                key={promo.number}
                className={`promo-card ${
                  isVisible ? "promo-card-visible" : ""
                }`}
                style={{
                  transitionDelay: isVisible
                    ? `${index * 80}ms`
                    : "0ms",
                }}
              >

                {/* =========================================
                    DARK ORANGE OUTLINE
                ========================================== */}

                <div className="promo-border" />


                {/* =========================================
                    TOP
                ========================================== */}

                <div className="relative z-10 flex items-center justify-between">

                  <span className="promo-number">
                    {promo.number}
                  </span>

                  <span className="promo-status">
                    <span />
                  </span>

                </div>


                {/* =========================================
                    MAIN CONTENT
                ========================================== */}

                <div className="relative z-10 mt-12">

                  <h3 className="promo-title">
                    {promo.title}
                  </h3>

                  <p className="promo-body">
                    {promo.body}
                  </p>

                </div>


                {/* =========================================
                    FOOTER
                ========================================== */}

                <div className="relative z-10 mt-auto pt-10">

                  <div className="flex items-center gap-4">

                    <div className="h-px flex-1 bg-[#102a43]/10" />

                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.22em]
                        text-[#102a43]/35
                      "
                    >
                      Dynamic
                    </span>

                  </div>


                  <div className="mt-5 flex items-center justify-between">

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#b94d0b]
                      "
                    >
                      Travel Service
                    </span>

                    <span
                      className="
                        text-2xl
                        font-light
                        text-[#102a43]/25
                      "
                    >
                      →
                    </span>

                  </div>

                </div>


                {/* =========================================
                    PEACOCK FEATHER DESIGN
                ========================================== */}

                <div className="feather-design">

                  <div className="feather-outer">
                    <div className="feather-middle">
                      <div className="feather-inner">
                        <div className="feather-core" />
                      </div>
                    </div>
                  </div>

                </div>


                {/* =========================================
                    LARGE NUMBER
                ========================================== */}

                <div className="promo-background-number">
                  {promo.number}
                </div>


                {/* =========================================
                    BOTTOM ACCENT
                ========================================== */}

                <div className="promo-orange-line" />

              </article>
            );
          })}

        </div>


        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-[#b94d0b]/15
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p
            className="
              max-w-2xl
              text-sm
              leading-7
              text-[#102a43]/55
              sm:text-base
            "
          >
            Airport transfers, local cab rentals, outstation journeys and
            premium group transportation across Bengaluru and Karnataka.
          </p>


          <div className="flex shrink-0 items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#b94d0b]" />

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#102a43]/40
              "
            >
              Premium Travel
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx>{`

        /* ===================================================
           CARD
        ==================================================== */

        .promo-card {
          position: relative;

          display: flex;

          min-height: 380px;

          flex-direction: column;

          overflow: hidden;

          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              #ffffff 0%,
              #fffaf2 100%
            );

          padding: 34px;

          opacity: 0;

          transform:
            translateY(100px)
            scale(0.92);

          filter: blur(5px);

          box-shadow:
            0 18px 50px rgba(16,42,67,0.06);

          transition:
            opacity 0.7s cubic-bezier(0.22,1,0.36,1),
            transform 0.85s cubic-bezier(0.22,1,0.36,1),
            filter 0.7s ease,
            box-shadow 0.6s ease;
        }


        /* ===================================================
           DARK ORANGE OUTLINE
        ==================================================== */

        .promo-border {
          position: absolute;

          inset: 0;

          z-index: 5;

          pointer-events: none;

          border: 2px solid #a84409;

          border-radius: 30px;

          opacity: 0.72;

          transition:
            opacity 0.5s ease,
            box-shadow 0.5s ease;
        }


        .promo-card-visible:hover .promo-border {
          opacity: 1;

          box-shadow:
            inset 0 0 0 1px rgba(216,91,11,0.18),
            0 0 25px rgba(216,91,11,0.08);
        }


        /* ===================================================
           RISE ANIMATION
        ==================================================== */

        .promo-card-visible {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);

          filter: blur(0);

          box-shadow:
            0 25px 60px rgba(16,42,67,0.09);
        }


        /* ===================================================
           HOVER
        ==================================================== */

        .promo-card-visible:hover {
          transform:
            translateY(-9px)
            scale(1.012);

          box-shadow:
            0 35px 75px rgba(16,42,67,0.14);
        }


        /* ===================================================
           NUMBER
        ==================================================== */

        .promo-number {
          font-family: var(--font-display, inherit);

          font-size: 14px;

          font-weight: 900;

          letter-spacing: 0.25em;

          color: #a84409;
        }


        /* ===================================================
           STATUS
        ==================================================== */

        .promo-status {
          display: flex;

          align-items: center;

          justify-content: center;

          width: 14px;
          height: 14px;

          border-radius: 999px;

          background:
            rgba(91,192,235,0.12);

          border:
            1px solid rgba(91,192,235,0.35);
        }


        .promo-status span {
          width: 5px;
          height: 5px;

          border-radius: 999px;

          background: #3ba9d4;

          box-shadow:
            0 0 8px rgba(59,169,212,0.45);
        }


        /* ===================================================
           TITLE
        ==================================================== */

        .promo-title {
          max-width: 100%;

          font-family: var(--font-display, inherit);

          font-size: 36px;

          font-weight: 950;

          line-height: 1.02;

          letter-spacing: -0.045em;

          color: #102a43;

          transition:
            transform 0.5s ease,
            color 0.5s ease;
        }


        .promo-card-visible:hover .promo-title {
          transform: translateX(4px);

          color: #b94d0b;
        }


        /* ===================================================
           BODY
        ==================================================== */

        .promo-body {
          max-width: 330px;

          margin-top: 20px;

          font-size: 16px;

          line-height: 1.8;

          color:
            rgba(16,42,67,0.58);
        }


        /* ===================================================
           PEACOCK FEATHER
        ==================================================== */

        .feather-design {
          position: absolute;

          right: -70px;
          top: -60px;

          width: 240px;
          height: 290px;

          transform:
            rotate(28deg);

          opacity: 0.7;

          pointer-events: none;

          transition:
            transform 1s cubic-bezier(0.22,1,0.36,1),
            opacity 0.6s ease;
        }


        .feather-outer {
          position: absolute;

          width: 190px;
          height: 250px;

          left: 20px;
          top: 20px;

          border-radius:
            70% 35% 70% 35%;

          border:
            2px solid rgba(168,68,9,0.22);

          transform:
            rotate(-12deg);

          background:
            linear-gradient(
              135deg,
              rgba(244,123,32,0.035),
              rgba(91,192,235,0.05)
            );
        }


        .feather-middle {
          position: absolute;

          left: 38px;
          top: 42px;

          width: 115px;
          height: 165px;

          border-radius:
            60% 40% 65% 35%;

          border:
            2px solid rgba(91,192,235,0.35);

          transform:
            rotate(4deg);

          background:
            rgba(91,192,235,0.045);
        }


        .feather-inner {
          position: absolute;

          left: 23px;
          top: 25px;

          width: 70px;
          height: 105px;

          border-radius:
            55% 45% 60% 40%;

          border:
            2px solid rgba(59,169,212,0.48);

          background:
            rgba(91,192,235,0.08);
        }


        .feather-core {
          position: absolute;

          left: 20px;
          top: 22px;

          width: 30px;
          height: 48px;

          border-radius:
            50% 50% 55% 45%;

          background:
            radial-gradient(
              circle at 50% 40%,
              rgba(16,42,67,0.55) 0 15%,
              rgba(59,169,212,0.65) 16% 38%,
              rgba(91,192,235,0.3) 39% 60%,
              transparent 61%
            );

          box-shadow:
            0 0 18px rgba(91,192,235,0.15);
        }


        /* Feather movement */
        .promo-card-visible:hover .feather-design {
          transform:
            rotate(35deg)
            scale(1.08);

          opacity: 1;
        }


        /* ===================================================
           BACKGROUND NUMBER
        ==================================================== */

        .promo-background-number {
          position: absolute;

          right: -10px;
          bottom: -50px;

          font-family: var(--font-display, inherit);

          font-size: 170px;

          font-weight: 950;

          line-height: 1;

          letter-spacing: -0.08em;

          color:
            rgba(16,42,67,0.025);

          user-select: none;

          pointer-events: none;
        }


        /* ===================================================
           ORANGE BOTTOM LINE
        ==================================================== */

        .promo-orange-line {
          position: absolute;

          left: 50%;
          bottom: 0;

          width: 90px;
          height: 4px;

          transform:
            translateX(-50%);

          background:
            #a84409;

          opacity: 0.9;
        }


        /* ===================================================
           TABLET
        ==================================================== */

        @media (max-width: 1023px) {

          .promo-card {
            min-height: 350px;
          }

          .promo-title {
            font-size: 32px;
          }

        }


        /* ===================================================
           MOBILE
        ==================================================== */

        @media (max-width: 640px) {

          .promo-card {
            min-height: 320px;

            padding: 28px;

            border-radius: 26px;
          }

          .promo-border {
            border-radius: 26px;
          }

          .promo-title {
            font-size: 30px;
          }

          .promo-body {
            font-size: 15px;

            line-height: 1.7;
          }

          .promo-background-number {
            font-size: 130px;
          }

          .feather-design {
            right: -90px;
            top: -65px;

            transform:
              rotate(28deg)
              scale(0.82);
          }

        }


        /* ===================================================
           REDUCED MOTION
        ==================================================== */

        @media (prefers-reduced-motion: reduce) {

          .promo-card {
            opacity: 1;

            transform: none;

            filter: none;

            transition: none;
          }

          .feather-design {
            transition: none;
          }

        }

      `}</style>

    </section>
  );
}