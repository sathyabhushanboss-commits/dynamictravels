'use client';

import { useMemo, useState } from 'react';
import { Snowflake, Users } from 'lucide-react';
import { calculatePrice, formatINR } from '@/lib/pricing';
import { VEHICLE_ICON_MAP } from './Icons';

// Photo for each vehicle (optimized WebP in /public/images/web). Matches on
// the vehicle id or name, so vehicles added in /admin/rates get a photo too.
function vehiclePhoto(vehicle) {
  const key = `${vehicle?.id || ''} ${vehicle?.label || ''}`.toLowerCase();
  if (key.includes('urbania')) return 'urbania11';
  if (key.includes('hycross') || key.includes('hybrid')) return 'hybrid11';
  if (key.includes('crysta')) return 'crysta11';
  if (key.includes('tempo') || /\btt_/.test(key)) return 'tt11';
  if (key.includes('mini_bus') || key.includes('mini bus')) return 'mini11';
  if (key.includes('bus')) return 'mini12';
  if (key.includes('suv') || key.includes('innova') || key.includes('ertiga')) return 'innova11';
  if (key.includes('sedan') || key.includes('dzire') || key.includes('etios')) return 'sedan11';
  return null;
}

export default function VehicleCard({ vehicle, vehicles, tripType, km, days, gstRate, onSelect }) {
  const [localPackageIdx, setLocalPackageIdx] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const Icon = VEHICLE_ICON_MAP(vehicle);
  const photo = vehiclePhoto(vehicle);
  const isAc = /\bac\b/i.test(vehicle.label || '') && !/non ac/i.test(vehicle.label || '');

  const price = useMemo(
    () =>
      calculatePrice({
        vehicles,
        vehicleId: vehicle.id,
        tripType,
        km,
        days,
        localPackageIdx,
        gstRate,
      }),
    [vehicles, vehicle.id, tripType, km, days, localPackageIdx, gstRate]
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-cream-line bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:flex-row">
      {/* Photo */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-cream-deep sm:aspect-auto sm:w-64">
        {photo && !photoFailed ? (
          <img
            src={`/images/web/${photo}-sm.webp`}
            alt={`${vehicle.label} — Dynamic Travels`}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-[140px] items-center justify-center text-sky-deep">
            <Icon className="h-14 w-14" />
          </div>
        )}
        {price?.enquiryOnly && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold text-white">
            Group travel
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-bold text-asphalt">{vehicle.label}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-route-teal">
              <Users size={12} /> {vehicle.seats} seats
            </span>
            {isAc && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-soft px-2.5 py-0.5 text-[11px] font-semibold text-sky-deep">
                <Snowflake size={12} /> AC
              </span>
            )}
          </div>
          <div className="text-sm text-asphalt/50">{vehicle.subLabel}</div>

          {tripType === 'local' && vehicle.local?.packages?.length > 1 && !price?.enquiryOnly && (
            <div className="mt-3 flex flex-wrap gap-2">
              {vehicle.local.packages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLocalPackageIdx(idx)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    localPackageIdx === idx
                      ? 'border-route-teal bg-route-teal/10 text-route-teal'
                      : 'border-black/10 text-asphalt/60 hover:border-asphalt/30'
                  }`}
                >
                  {p.hrs} hrs / {p.km} km
                </button>
              ))}
            </div>
          )}

          {price?.error && <p className="mt-2 text-xs font-medium text-amber-dark">{price.error}</p>}
        </div>

        <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
          {price?.enquiryOnly ? (
            <div className="sm:text-right">
              <span className="block font-display text-base font-bold text-asphalt">Price on request</span>
              <span className="text-[11px] text-asphalt/40">Our team calls you with a quote</span>
            </div>
          ) : price?.subtotal !== undefined ? (
            <div className="sm:text-right">
              <span className="block font-display text-2xl font-extrabold text-asphalt">{formatINR(price.subtotal)}</span>
              <span className="text-[11px] text-asphalt/40">+ GST · choose payment at checkout</span>
            </div>
          ) : null}
          <button
            type="button"
            disabled={!!price?.error}
            onClick={() => onSelect({ vehicleId: vehicle.id, localPackageIdx, price })}
            className={`focus-ring btn-shine rounded-full px-6 py-2.5 text-sm font-bold text-white disabled:opacity-40 ${
              price?.enquiryOnly ? 'bg-sky hover:bg-sky-deep' : 'bg-amber shadow-brand hover:bg-amber-dark'
            }`}
          >
            {price?.enquiryOnly ? 'Request Quote' : 'Select Car'}
          </button>
        </div>
      </div>
    </div>
  );
}
