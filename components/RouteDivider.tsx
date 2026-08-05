type Props = {
  label?: string;
  className?: string;
};

export default function RouteDivider({ label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="route-dot" aria-hidden="true" />
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="route-line flex-1" aria-hidden="true" />
    </div>
  );
}
