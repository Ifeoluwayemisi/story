import { cn } from "@/lib/cn";

export interface ChapterMarkerProps {
  label: string;
  index?: string;
  className?: string;
}

// Case-study / article chapter marker (docs/design-system.md §6): mono label
// above the H2 — e.g. "01 · Problem". The index carries the accent note.
export function ChapterMarker({ label, index, className }: ChapterMarkerProps) {
  return (
    <p
      className={cn(
        "mb-3 font-mono text-label uppercase tracking-[0.12em] text-ink-faint",
        className,
      )}
    >
      {index ? (
        <>
          <span className="text-accent-strong">{index}</span>
          <span aria-hidden="true"> · </span>
        </>
      ) : null}
      {label}
    </p>
  );
}
