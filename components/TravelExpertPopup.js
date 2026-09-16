'use client';

import { useEffect, useState } from 'react';

const PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ||
  '+917975630631';

const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY ||
  '079756 30631';

export default function TravelExpertPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ntt_popup_shown')) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);

      sessionStorage.setItem(
        'ntt_popup_shown',
        '1'
      );
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#102c46]/70
        px-5
        backdrop-blur-[6px]
      "
      onClick={() => setOpen(false)}
    >

      {/* =================================================
          PREMIUM POPUP
      ================================================= */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[520px]
          overflow-hidden
          rounded-[28px]
          border
          border-[#e7d7c2]
          bg-[#fffaf2]
          shadow-[0_30px_90px_rgba(0,0,0,0.24)]
        "
      >

        {/* =================================================
            TOP ORANGE ACCENT
        ================================================= */}

        <div className="h-1.5 w-full bg-[#f47a20]" />


        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#e6d8c7]
            bg-[#fffdf9]
            text-xl
            font-light
            leading-none
            text-[#102c46]
            transition-all
            duration-200
            hover:border-[#f47a20]
            hover:bg-[#fff3e5]
            hover:text-[#e56814]
          "
        >
          ×
        </button>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            px-7
            pb-9
            pt-9
            sm:px-10
            sm:pb-10
            sm:pt-10
          "
        >

          {/* =================================================
              LARGE LOGO — 200%
          ================================================= */}

          <div className="flex justify-center">

            <img
              src="/images/logo.png"
              alt="Dynamic Travels"
              className="
                h-auto
                w-[300px]
                max-w-[88%]
                object-contain
                sm:w-[360px]
              "
            />

          </div>


          {/* =================================================
              LABEL
          ================================================= */}

          <div className="mt-7 text-center">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#e56814]
              "
            >
              Premium Travel Assistance
            </p>


            {/* =================================================
                HEADING
            ================================================= */}

            <h2
              className="
                mt-3
                font-display
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                text-[#102c46]
                sm:text-4xl
              "
            >
              Your Travel Expert
            </h2>


            {/* =================================================
                24×7
            ================================================= */}

            <div className="mt-2">

              <span
                className="
                  font-display
                  text-lg
                  font-bold
                  text-[#f47a20]
                "
              >
                Available 24×7
              </span>

            </div>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mx-auto
                mt-4
                max-w-sm
                text-sm
                leading-6
                text-[#756c61]
              "
            >
              Need help choosing the right vehicle,
              planning your journey or arranging
              transportation for your group?
              Speak with our travel team.
            </p>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              my-7
              flex
              items-center
              gap-3
            "
          >

            <div className="h-px flex-1 bg-[#e7d9c7]" />

            <div className="h-1.5 w-1.5 rounded-full bg-[#f47a20]" />

            <div className="h-px flex-1 bg-[#e7d9c7]" />

          </div>


          {/* =================================================
              PHONE LABEL
          ================================================= */}

          <div className="text-center">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#8b7e6e]
              "
            >
              Call Our Travel Desk
            </p>


            {/* =================================================
                PHONE NUMBER
            ================================================= */}

            <a
              href={`tel:${PHONE}`}
              className="
                mt-2
                block
                font-display
                text-2xl
                font-extrabold
                tracking-wide
                text-[#102c46]
                transition-colors
                hover:text-[#e56814]
                sm:text-3xl
              "
            >
              {PHONE_DISPLAY}
            </a>

          </div>


          {/* =================================================
              CALL BUTTON
          ================================================= */}

          <div className="mt-7">

            <a
              href={`tel:${PHONE}`}
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#f47a20]
                px-7
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.08em]
                text-white
                shadow-[0_10px_25px_rgba(244,122,32,0.24)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#df6816]
                hover:shadow-[0_14px_30px_rgba(244,122,32,0.30)]
                active:translate-y-0
              "
            >
              Talk to Our Travel Expert
            </a>

          </div>


          {/* =================================================
              SERVICES LINE
          ================================================= */}

          <p
            className="
              mt-5
              text-center
              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-[#a09588]
            "
          >
            Airport · Local · Outstation · Events
          </p>

        </div>


        {/* =================================================
            BOTTOM NAVY ACCENT
        ================================================= */}

        <div className="h-1 w-full bg-[#102c46]" />

      </div>

    </div>
  );
}