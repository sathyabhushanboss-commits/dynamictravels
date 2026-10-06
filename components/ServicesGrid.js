'use client';

const services = [
  {
    number: '01',
    title: 'Airport Transfers',
    body: 'Reliable airport taxi and airport transfer services in Bangalore for Kempegowda International Airport. Comfortable vehicles, professional drivers and convenient pickup options for business and family travel.',
    tags: ['Airport Taxi', 'Flight Pickup', '24/7 Service'],
  },
  {
    number: '02',
    title: 'Local Rentals',
    body: 'Book chauffeur-driven cabs for local travel in Bangalore. Ideal for meetings, shopping, sightseeing, family outings and full-day city travel with flexible hourly rental options.',
    tags: ['4 / 8 / 12 Hours', 'Multiple Stops', 'City Travel'],
  },
  {
    number: '03',
    title: 'Outstation Trips',
    body: 'Comfortable outstation taxi services from Bangalore to Mysore, Coorg, Ooty, Chennai, Tirupati, Goa and destinations across Karnataka and South India.',
    tags: ['Round Trips', 'Long Distance', 'Professional Drivers'],
  },
];

const eventCategories = [
  {
    number: '01',
    title: 'Corporate Events',
    body: 'Transportation for conferences, seminars, business meetings, corporate gatherings and employee travel with organized pickup and drop arrangements.',
    tags: ['Conferences', 'Seminars', 'Business Meetings'],
  },
  {
    number: '02',
    title: 'Social Gatherings',
    body: 'Comfortable event transportation for weddings, reunions, family functions and private parties with options ranging from premium cars to tempo travellers.',
    tags: ['Weddings', 'Reunions', 'Private Parties'],
  },
  {
    number: '03',
    title: 'Public Events',
    body: 'Reliable group transportation for concerts, festivals, sports events and large public gatherings with scalable vehicle options for different group sizes.',
    tags: ['Concerts', 'Festivals', 'Sports Events'],
  },
  {
    number: '04',
    title: 'Educational Events',
    body: 'Safe and comfortable transportation for campus tours, field trips, workshops and educational excursions with suitable vehicles for students and groups.',
    tags: ['Campus Tours', 'Field Trips', 'Workshops'],
  },
];

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="bg-[#fffaf2] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e56814]">
            Premium Travel Services
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#102c46] sm:text-4xl lg:text-5xl">
            Travel Made Simple.
            <span className="block text-[#e56814]">
              Every Journey Covered.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#756c61] sm:text-base">
            From airport transfers and local cab rentals to
            outstation journeys and event transportation,
            we provide comfortable and reliable travel
            solutions across Bangalore and beyond.
          </p>

        </div>


        {/* =================================================
            SERVICES
        ================================================= */}

        <div className="mt-16">

          <div className="mb-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e56814]">
              What We Offer
            </p>

            <h3 className="mt-2 font-display text-2xl font-bold text-[#102c46] sm:text-3xl">
              Our Travel Services
            </h3>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {services.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
              />
            ))}

          </div>

        </div>


        {/* =================================================
            EVENT CATEGORIES
        ================================================= */}

        <div className="mt-24">

          <div className="mb-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e56814]">
              Event Transportation
            </p>

            <h3 className="mt-2 font-display text-2xl font-bold text-[#102c46] sm:text-3xl">
              Types of Events We Service
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756c61]">
              From corporate functions to large social gatherings,
              we provide specialized transportation solutions
              for various event types.
            </p>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {eventCategories.map((event) => (
              <EventCard
                key={event.title}
                event={event}
              />
            ))}

          </div>

        </div>


        {/* =================================================
            SEO CONTENT
        ================================================= */}

        <div className="mx-auto mt-16 max-w-4xl text-center">

          <p className="text-sm leading-7 text-[#81776b]">
            Looking for a{' '}
            <strong className="font-semibold text-[#102c46]">
              reliable cab service in Bangalore
            </strong>
            ? Choose comfortable airport taxis, local cab
            rentals, outstation taxis, tempo travellers,
            luxury buses and professional event transportation
            for business, family and group travel.
          </p>

        </div>

      </div>
    </section>
  );
}


/*
===========================================================
SERVICE CARD
===========================================================
*/

function ServiceCard({ service }) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#e8dac7]
        bg-[#fffdf9]
        p-7
        shadow-[0_10px_35px_rgba(16,44,70,0.06)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#f0ad78]
        hover:shadow-[0_22px_50px_rgba(16,44,70,0.13)]
      "
    >

      {/* Premium orange accent */}

      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-[#f47a20]
          opacity-80
        "
      />

      {/* Number */}

      <div className="flex items-center justify-between">

        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e56814]">
          Service
        </span>

        <span className="font-display text-4xl font-extrabold text-[#102c46]/10">
          {service.number}
        </span>

      </div>


      {/* Title */}

      <h4 className="mt-7 font-display text-xl font-bold text-[#102c46] transition-colors duration-300 group-hover:text-[#e56814]">
        {service.title}
      </h4>


      {/* Body */}

      <p className="mt-3 min-h-[132px] text-sm leading-6 text-[#756c61]">
        {service.body}
      </p>


      {/* Tags */}

      <div className="mt-5 flex flex-wrap gap-2">

        {service.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              border
              border-[#e8dac7]
              bg-[#fff7ec]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-[#102c46]
            "
          >
            {tag}
          </span>
        ))}

      </div>


      {/* Bottom accent */}

      <div
        className="
          mt-7
          h-[2px]
          w-10
          rounded-full
          bg-[#f47a20]
          transition-all
          duration-300
          group-hover:w-20
        "
      />

    </article>
  );
}


/*
===========================================================
EVENT CARD
===========================================================
*/

function EventCard({ event }) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#e8dac7]
        bg-[#fffdf9]
        p-6
        shadow-[0_10px_30px_rgba(16,44,70,0.05)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#f0ad78]
        hover:bg-white
        hover:shadow-[0_20px_45px_rgba(16,44,70,0.11)]
      "
    >

      {/* Orange top line */}

      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-[#f47a20]
          opacity-70
          transition-opacity
          group-hover:opacity-100
        "
      />

      {/* Header */}

      <div className="flex items-center justify-between">

        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e56814]">
          Event
        </span>

        <span className="font-display text-3xl font-extrabold text-[#102c46]/10">
          {event.number}
        </span>

      </div>


      {/* Title */}

      <h4 className="mt-6 font-display text-lg font-bold text-[#102c46] transition-colors duration-300 group-hover:text-[#e56814]">
        {event.title}
      </h4>


      {/* Body */}

      <p className="mt-3 min-h-[150px] text-sm leading-6 text-[#756c61]">
        {event.body}
      </p>


      {/* Tags */}

      <div className="mt-5 flex flex-wrap gap-2">

        {event.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              border
              border-[#e8dac7]
              bg-[#fff7ec]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-[#102c46]
            "
          >
            {tag}
          </span>
        ))}

      </div>


      {/* Accent */}

      <div
        className="
          mt-6
          h-[2px]
          w-8
          rounded-full
          bg-[#f47a20]
          transition-all
          duration-300
          group-hover:w-16
        "
      />

    </article>
  );
}