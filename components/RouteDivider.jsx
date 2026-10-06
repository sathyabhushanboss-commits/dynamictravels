"use client";

export default function RouteDivider({ label = "Dynamic Travels" }) {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Left Line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A227] to-[#C9A227]" />

      {/* Center Label */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />

        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] text-center">
          {label}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
      </div>

      {/* Right Line */}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A227] to-[#C9A227]" />
    </div>
  );
}