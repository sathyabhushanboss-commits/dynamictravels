// Branded loading state: the logo with a cab driving along a road beneath it.
// Pure CSS animation (see "Cab loader" in app/globals.css), so it works in
// server components and before hydration.

export default function CabLoader({ label = 'Loading…', className = '' }) {
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <img src="/images/logo.webp" alt="Dynamic Travels" className="h-auto w-[220px] max-w-[70%] sm:w-[260px]" />

      <div className="relative mt-6 h-14 w-[280px] max-w-[85vw] overflow-hidden">
        <div className="cab-drive absolute bottom-[6px] left-0 w-[72px]">
          <svg viewBox="0 0 72 36" className="cab-bounce block w-full drop-shadow-[0_6px_8px_rgba(15,42,61,0.25)]" aria-hidden="true">
            {/* body */}
            <path d="M6 24 V18 Q6 15 9 14.5 L18 13 L25 6 Q27 4 30 4 H48 Q51 4 53 6 L60 13 Q66 14 67 18 V24 Q67 27 64 27 H9 Q6 27 6 24 Z" fill="#E67817" />
            {/* windows */}
            <path d="M22 13 L28 7.5 Q29 7 30 7 H38 V13 Z" fill="#DBF1FC" />
            <path d="M41 7 H48 Q49 7 50 7.8 L55.5 13 H41 Z" fill="#DBF1FC" />
            {/* taxi sign + light */}
            <rect x="33" y="0.5" width="10" height="4" rx="1.5" fill="#0F2A3D" />
            <rect x="63" y="17" width="4" height="3" rx="1" fill="#FFE8A3" />
            <rect x="8" y="19" width="56" height="2" rx="1" fill="#C2600B" opacity=".55" />
            {/* wheels */}
            <g className="cab-wheel">
              <circle cx="19" cy="27" r="6" fill="#0F2A3D" />
              <circle cx="19" cy="27" r="2.4" fill="#E7EDF1" />
              <rect x="18.4" y="22" width="1.2" height="10" fill="#0F2A3D" />
            </g>
            <g className="cab-wheel">
              <circle cx="54" cy="27" r="6" fill="#0F2A3D" />
              <circle cx="54" cy="27" r="2.4" fill="#E7EDF1" />
              <rect x="53.4" y="22" width="1.2" height="10" fill="#0F2A3D" />
            </g>
          </svg>
        </div>
        {/* road */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-ink/10" />
        <div className="cab-road absolute inset-x-0 bottom-0 h-[3px] rounded-full opacity-70" />
      </div>

      <p className="mt-4 text-sm font-semibold tracking-wide text-ink-mute">{label}</p>
    </div>
  );
}
