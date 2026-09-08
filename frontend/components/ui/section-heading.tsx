import type { ReactNode } from "react";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  label: string;
  title?: string;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

// Editorial section header (docs/design-system.md §6 Article elements): mono
// chapter-marker label + optional display H2, description lead, and a
// right-aligned contextual link (e.g. "View all work").
export function SectionHeading({
  label,
  title,
  description,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-[52ch]">
          <ChapterMarker label={label} />
          {title ? <h2 className="font-display text-h2 font-medium text-ink">{title}</h2> : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {description ? (
        <p className="max-w-[70ch] text-body-lg text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
