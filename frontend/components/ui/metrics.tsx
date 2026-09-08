import { cn } from "@/lib/cn";

export interface Metric {
  label: string;
  value: string;
  note?: string;
}

export interface MetricsProps {
  items: Metric[];
  className?: string;
}

// Evidence/metrics block (docs/design-system.md §6 Article elements): mono
// label + display value with hairline separators. Only genuine outcomes may
// ever be rendered as values — never invented numbers.
export function Metrics({ items, className }: MetricsProps) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0",
        className,
      )}
    >
      {items.map(({ label, value, note }) => (
        <div key={label} className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
          <dt className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
            {label}
          </dt>
          <dd className="font-display text-display font-medium tracking-tight text-ink">{value}</dd>
          {note ? <dd className="text-sm text-ink-muted">{note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}
