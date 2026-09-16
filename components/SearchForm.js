'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TRIP_TYPES } from '@/lib/pricing';
import PlaceInput from './PlaceInput';
import { geocodeAddress, calcRouteKm } from '@/lib/geo';

const todayStr = () => new Date().toISOString().slice(0, 10);

/*
=========================================================
HOME TRIP TYPES

Only:
- Airport Transfer
- Local / Sightseeing
- Outstation Round Trip

One Way and Group are removed from this form.
=========================================================
*/

const HOME_TRIP_TYPES = TRIP_TYPES.filter(
  (t) => t.id !== 'group' && t.id !== 'oneway'
);

let stopIdCounter = 0;

const newStop = () => ({
  _id: ++stopIdCounter,
  address: '',
  place: null,
});

/*
=========================================================
SEARCH FORM
=========================================================
*/

function SearchFormInner() {
  const router = useRouter();
  const params = useSearchParams();

  /*
  =======================================================
  TRIP TYPE
  =======================================================
  */

  const [tripType, setTripType] = useState(
    params.get('tripType') || 'airport'
  );

  /*
  =======================================================
  PICKUP
  =======================================================
  */

  const [pickup, setPickup] = useState(
    params.get('pickup') || ''
  );

  const [pickupPlace, setPickupPlace] = useState(null);

  /*
  =======================================================
  DROP
  =======================================================
  */

  const [drop, setDrop] = useState(
    params.get('drop') || ''
  );

  const [dropPlace, setDropPlace] = useState(null);

  /*
  =======================================================
  STOPS
  =======================================================
  */

  const [stops, setStops] = useState([]);

  /*
  =======================================================
  DATE / TIME
  =======================================================
  */

  const [date, setDate] = useState(todayStr());

  const [time, setTime] = useState('09:00');

  const [returnDate, setReturnDate] = useState(
    todayStr()
  );

  /*
  =======================================================
  DISTANCE
  =======================================================
  */

  const [km, setKm] = useState(0);

  // idle | calculating | auto | error
  const [kmStatus, setKmStatus] = useState('idle');

  /*
  =======================================================
  ERROR
  =======================================================
  */

  const [error, setError] = useState('');

  /*
  =======================================================
  ROUTE TYPES
  =======================================================
  */

  const usesRoute =
    tripType === 'airport' ||
    tripType === 'outstation';

  /*
  =======================================================
  RESOLVE PREFILLED LOCATIONS
  =======================================================
  */

  useEffect(() => {
    if (pickup && !pickupPlace) {
      geocodeAddress(pickup)
        .then(setPickupPlace)
        .catch(() => {});
    }

    if (drop && !dropPlace) {
      geocodeAddress(drop)
        .then(setDropPlace)
        .catch(() => {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  =======================================================
  AUTO CALCULATE DISTANCE
  =======================================================
  */

  useEffect(() => {
    if (!usesRoute) {
      setKmStatus('idle');
      return;
    }

    if (!pickupPlace || !dropPlace) {
      setKmStatus('idle');
      return;
    }

    const unresolvedStop = stops.some(
      (s) =>
        s.address.trim() &&
        !s.place
    );

    if (unresolvedStop) {
      setKmStatus('idle');
      return;
    }

    let cancelled = false;

    setKmStatus('calculating');

    (async () => {
      try {
        const stopPlaces = stops
          .filter((s) => s.place)
          .map((s) => s.place);

        /*
        ---------------------------------------------------
        OUTSTATION = ROUND TRIP

        pickup
          ↓
        stops
          ↓
        destination
          ↓
        pickup
        ---------------------------------------------------
        */

        const destination =
          tripType === 'outstation'
            ? pickupPlace
            : dropPlace;

        const waypoints =
          tripType === 'outstation'
            ? [...stopPlaces, dropPlace]
            : [];

        const result = await calcRouteKm(
          pickupPlace,
          destination,
          waypoints
        );

        if (cancelled) {
          return;
        }

        setKm(result);
        setKmStatus('auto');
      } catch {
        if (!cancelled) {
          setKmStatus('error');
        }
      }
    })();

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tripType,
    pickupPlace,
    dropPlace,
    JSON.stringify(
      stops.map((s) => s.place)
    ),
  ]);

  /*
  =======================================================
  CHANGE TRIP TYPE
  =======================================================
  */

  function handleTripTypeChange(type) {
    setTripType(type);
    setError('');

    /*
    Clear stops when leaving outstation.
    */

    if (type !== 'outstation') {
      setStops([]);
    }

    /*
    Reset distance status.
    */

    setKm(0);
    setKmStatus('idle');
  }

  /*
  =======================================================
  ADD STOP
  =======================================================
  */

  function addStop() {
    setStops((currentStops) => {
      if (currentStops.length >= 5) {
        return currentStops;
      }

      return [
        ...currentStops,
        newStop(),
      ];
    });
  }

  /*
  =======================================================
  UPDATE STOP
  =======================================================
  */

  function updateStop(id, patch) {
    setStops((currentStops) =>
      currentStops.map((stop) =>
        stop._id === id
          ? {
              ...stop,
              ...patch,
            }
          : stop
      )
    );
  }

  /*
  =======================================================
  REMOVE STOP
  =======================================================
  */

  function removeStop(id) {
    setStops((currentStops) =>
      currentStops.filter(
        (stop) => stop._id !== id
      )
    );
  }

  /*
  =======================================================
  SUBMIT
  =======================================================
  */

  function handleSubmit(e) {
    e.preventDefault();

    /*
    -------------------------------------------------------
    PICKUP VALIDATION
    -------------------------------------------------------
    */

    if (!pickup.trim()) {
      setError(
        'Please enter a pickup location.'
      );

      return;
    }

    /*
    -------------------------------------------------------
    DROP VALIDATION
    -------------------------------------------------------
    */

    if (
      tripType !== 'local' &&
      !drop.trim()
    ) {
      setError(
        'Please enter a drop location.'
      );

      return;
    }

    /*
    -------------------------------------------------------
    ROUTE VALIDATION
    -------------------------------------------------------
    */

    if (usesRoute) {
      if (
        !pickupPlace ||
        !dropPlace
      ) {
        setError(
          'Please select your pickup and drop location from the suggestions so we can calculate the exact distance.'
        );

        return;
      }

      if (
        kmStatus === 'calculating'
      ) {
        setError(
          'Still calculating distance. Please wait a moment and try again.'
        );

        return;
      }

      if (kmStatus !== 'auto') {
        setError(
          "We couldn't calculate the distance for this route. Please re-select the pickup and drop locations."
        );

        return;
      }
    }

    /*
    -------------------------------------------------------
    OUTSTATION DATE VALIDATION
    -------------------------------------------------------
    */

    if (
      tripType === 'outstation' &&
      returnDate < date
    ) {
      setError(
        'Return date cannot be earlier than the start date.'
      );

      return;
    }

    setError('');

    /*
    -------------------------------------------------------
    STOP ADDRESSES
    -------------------------------------------------------
    */

    const stopAddresses = stops
      .map((s) => s.address.trim())
      .filter(Boolean);

    /*
    -------------------------------------------------------
    ROUTE COORDINATES
    -------------------------------------------------------
    */

    const routePts = [];

    if (
      usesRoute &&
      pickupPlace &&
      dropPlace
    ) {
      routePts.push({
        lat: pickupPlace.lat,
        lng: pickupPlace.lng,
      });

      stops
        .filter((s) => s.place)
        .forEach((s) => {
          routePts.push({
            lat: s.place.lat,
            lng: s.place.lng,
          });
        });

      routePts.push({
        lat: dropPlace.lat,
        lng: dropPlace.lng,
      });
    }

    /*
    -------------------------------------------------------
    SEARCH PARAMETERS
    -------------------------------------------------------
    */

    const searchParams =
      new URLSearchParams({
        tripType,
        pickup,
        drop,
        date,
        time,

        returnDate:
          tripType === 'outstation'
            ? returnDate
            : '',

        km: usesRoute
          ? String(km)
          : '0',

        stops:
          JSON.stringify(stopAddresses),

        routePts:
          JSON.stringify(routePts),
      });

    /*
    -------------------------------------------------------
    NAVIGATE
    -------------------------------------------------------
    */

    router.push(
      `/select-cars?${searchParams.toString()}`
    );
  }

  /*
  =======================================================
  UI
  =======================================================
  */

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        rounded-[28px]
        border
        border-[#eadfce]
        bg-[#fffaf2]
        p-5
        shadow-[0_20px_60px_rgba(58,42,25,0.14)]
        sm:p-7
        lg:p-8
      "
    >

      {/* =================================================
          TRIP TYPE TABS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        {HOME_TRIP_TYPES.map((t) => {
          const active =
            tripType === t.id;

          return (
            <button
              type="button"
              key={t.id}
              onClick={() =>
                handleTripTypeChange(t.id)
              }
              className={`
                min-h-[58px]
                w-full
                rounded-2xl
                border
                px-4
                py-3
                text-center
                text-xs
                font-bold
                uppercase
                tracking-[0.04em]
                transition-all
                duration-200
                sm:text-sm

                ${
                  active
                    ? `
                      border-[#f47a20]
                      bg-[#f47a20]
                      text-white
                      shadow-[0_8px_24px_rgba(244,122,32,0.22)]
                    `
                    : `
                      border-[#e4d9ca]
                      bg-[#fffdf9]
                      text-[#5e554b]
                      hover:border-[#f47a20]
                      hover:bg-[#fff6eb]
                      hover:text-[#d96512]
                    `
                }
              `}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* =================================================
          FORM FIELDS
      ================================================= */}

      <div
        className="
          mt-7
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {/* ===============================================
            PICKUP
        =============================================== */}

        <Field label="Pickup Location">
          {usesRoute ? (
            <PlaceInput
              value={pickup}
              onChange={(value) => {
                setPickup(value);
                setKmStatus('idle');
              }}
              onPlaceSelect={(place) => {
                setPickupPlace(place);
                setKmStatus('idle');
              }}
              placeholder="e.g. Manyata Tech Park"
              required
            />
          ) : (
            <input
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setKmStatus('idle');
              }}
              placeholder="e.g. Manyata Tech Park"
              className="ntt-input premium-input"
              required
            />
          )}
        </Field>

        {/* ===============================================
            DROP
        =============================================== */}

        {tripType !== 'local' && (
          <Field
            label={
              tripType === 'outstation'
                ? 'Destination'
                : 'Drop Location'
            }
          >
            <PlaceInput
              value={drop}
              onChange={(value) => {
                setDrop(value);
                setKmStatus('idle');
              }}
              onPlaceSelect={(place) => {
                setDropPlace(place);
                setKmStatus('idle');
              }}
              placeholder="e.g. Mysore"
              required
            />
          </Field>
        )}

        {/* ===============================================
            DATE
        =============================================== */}

        <Field
          label={
            tripType === 'outstation'
              ? 'Start Date'
              : 'Date'
          }
        >
          <input
            type="date"
            value={date}
            min={todayStr()}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="ntt-input premium-input"
            required
          />
        </Field>

        {/* ===============================================
            RETURN DATE / TIME
        =============================================== */}

        {tripType === 'outstation' ? (
          <Field label="Return Date">
            <input
              type="date"
              value={returnDate}
              min={date}
              onChange={(e) =>
                setReturnDate(
                  e.target.value
                )
              }
              className="ntt-input premium-input"
              required
            />
          </Field>
        ) : (
          <Field label="Pickup Time">
            <input
              type="time"
              value={time}
              onChange={(e) =>
                setTime(
                  e.target.value
                )
              }
              className="ntt-input premium-input"
              required
            />
          </Field>
        )}

        {/* ===============================================
            DISTANCE
        =============================================== */}

        {usesRoute &&
          kmStatus === 'idle' && (
            <Field label="Distance">
              <div
                className="
                  premium-input
                  flex
                  min-h-[52px]
                  items-center
                  rounded-xl
                  border
                  border-[#e4d9ca]
                  bg-[#fffdf9]
                  px-4
                  text-sm
                  text-[#9a8f82]
                "
              >
                Select pickup &amp; drop first
              </div>
            </Field>
          )}

        {usesRoute &&
          kmStatus === 'calculating' && (
            <Field label="Distance">
              <div
                className="
                  premium-input
                  flex
                  min-h-[52px]
                  items-center
                  rounded-xl
                  border
                  border-[#e4d9ca]
                  bg-[#fffdf9]
                  px-4
                  text-sm
                  text-[#8c8174]
                "
              >
                Calculating distance...
              </div>
            </Field>
          )}

        {usesRoute &&
          kmStatus === 'error' && (
            <Field label="Distance">
              <div
                className="
                  premium-input
                  flex
                  min-h-[52px]
                  items-center
                  rounded-xl
                  border
                  border-[#efc9a9]
                  bg-[#fff8f0]
                  px-4
                  text-sm
                  text-[#c45e13]
                "
              >
                Couldn&apos;t calculate. Try again.
              </div>
            </Field>
          )}

        {usesRoute &&
          kmStatus === 'auto' && (
            <Field label="Distance">
              <div
                className="
                  premium-input
                  flex
                  min-h-[52px]
                  items-center
                  rounded-xl
                  border
                  border-[#f2c49f]
                  bg-[#fff6eb]
                  px-4
                  text-sm
                  font-bold
                  text-[#e56814]
                "
              >
                {km} km
              </div>
            </Field>
          )}
      </div>

      {/* =================================================
          OUTSTATION STOPS
      ================================================= */}

      {tripType === 'outstation' && (
        <div className="mt-6">

          <div
            className="
              mb-3
              text-xs
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#8a7d6d]
            "
          >
            Stops Along the Way
            <span className="ml-2 font-normal normal-case tracking-normal text-[#aaa094]">
              Optional
            </span>
          </div>

          <div className="space-y-3">

            {stops.map(
              (stop, index) => (
                <div
                  key={stop._id}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#f8eadb]
                      text-xs
                      font-bold
                      text-[#d96512]
                    "
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <PlaceInput
                      value={
                        stop.address
                      }
                      onChange={(value) =>
                        updateStop(
                          stop._id,
                          {
                            address:
                              value,
                            place:
                              null,
                          }
                        )
                      }
                      onPlaceSelect={(
                        place
                      ) =>
                        updateStop(
                          stop._id,
                          {
                            place,
                          }
                        )
                      }
                      placeholder="Enter stop location"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeStop(
                        stop._id
                      )
                    }
                    className="
                      shrink-0
                      rounded-xl
                      border
                      border-[#e6d8c8]
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      font-semibold
                      text-[#8a7d6d]
                      transition
                      hover:border-[#f0b98e]
                      hover:bg-[#fff5eb]
                      hover:text-[#d96512]
                    "
                  >
                    Remove
                  </button>

                </div>
              )
            )}

          </div>

          {/* ADD STOP */}

          {stops.length < 5 && (
            <button
              type="button"
              onClick={addStop}
              className="
                mt-3
                rounded-xl
                border
                border-[#f2a56e]
                bg-[#fff8f0]
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#df6816]
                transition
                hover:bg-[#fff0df]
              "
            >
              + Add Stop
            </button>
          )}

        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-[#efc9a9]
            bg-[#fff5eb]
            px-4
            py-3
            text-center
            text-sm
            font-medium
            text-[#c45e13]
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          SUBMIT
      ================================================= */}

      <div className="mt-8 flex justify-center">

        <button
          type="submit"
          className="
            w-full
            rounded-full
            bg-[#f47a20]
            px-12
            py-4
            text-center
            text-sm
            font-bold
            uppercase
            tracking-[0.06em]
            text-white
            shadow-[0_10px_28px_rgba(244,122,32,0.25)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#df6816]
            hover:shadow-[0_14px_32px_rgba(244,122,32,0.30)]
            active:translate-y-0
            sm:w-auto
            sm:min-w-[250px]
          "
        >
          Explore Cabs
        </button>

      </div>

      {/* =================================================
          GROUP BOOKING
      ================================================= */}

      <p
        className="
          mt-4
          text-center
          text-xs
          leading-5
          text-[#9a8f82]
        "
      >
        Booking a bus or tempo traveller
        for a large group?{' '}

        <a
          href="/group-booking"
          className="
            font-bold
            text-[#e56814]
            transition
            hover:text-[#c9560d]
            hover:underline
          "
        >
          Enquire here
        </a>
      </p>

    </form>
  );
}

/*
=========================================================
FIELD COMPONENT
=========================================================
*/

function Field({
  label,
  children,
}) {
  return (
    <label className="block w-full">

      <span
        className="
          mb-2
          block
          text-[11px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#817567]
        "
      >
        {label}
      </span>

      {children}

    </label>
  );
}

/*
=========================================================
EXPORT
=========================================================
*/

export default function SearchForm() {
  return (
    <Suspense fallback={null}>
      <SearchFormInner />
    </Suspense>
  );
}