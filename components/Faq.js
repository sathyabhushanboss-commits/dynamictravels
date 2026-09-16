const fleet = [
  {
    type: 'Sedan',
    capacity: '4 Seater',
    idealFor: 'Airport transfers, local city rides, solo & small family trips',
  },
  {
    type: 'Innova',
    capacity: '7 Seater',
    idealFor: 'Family outings, outstation trips, extra luggage space',
  },
  {
    type: 'Innova Crysta',
    capacity: '7 Seater',
    idealFor: 'Premium comfort for family & corporate outstation travel',
  },
  {
    type: 'Innova Hycross / Hybrid',
    capacity: '7 Seater',
    idealFor: 'Smooth, fuel-efficient rides for longer outstation trips',
  },
  {
    type: 'Force Urbania',
    capacity: '13–17 Seater',
    idealFor: 'Corporate offsites, medium group tours, airport group transfers',
  },
  {
    type: 'Tempo Traveller',
    capacity: '12 / 17 / 20 Seater',
    idealFor: 'Group tours, corporate offsites, wedding parties',
  },
  {
    type: 'Mini Bus',
    capacity: '21 / 33 Seater',
    idealFor: 'School trips, corporate events, larger group travel',
  },
  {
    type: 'Bus',
    capacity: '50 Seater',
    idealFor: 'Large events, conferences, big group outstation travel',
  },
];

export default function Fleet() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-route-teal">Our Fleet</div>
        <h2 className="mt-1 font-display text-3xl font-bold text-asphalt">Vehicles for every trip</h2>
      </div>
      <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
        {fleet.map((vehicle) => (
          <div
            key={vehicle.type}
            className="flex flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-route-teal" />
              <span className="font-display text-lg font-bold text-asphalt">{vehicle.type}</span>
              <span className="shrink-0 rounded-full bg-route-teal/10 px-2.5 py-0.5 text-xs font-semibold text-route-teal">
                {vehicle.capacity}
              </span>
            </div>
            <p className="pl-5 text-sm text-asphalt/60 sm:pl-0 sm:text-right">{vehicle.idealFor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}