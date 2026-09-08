import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

// Compact mono status/phase marker (docs/design-system.md §6 Badges) —
// e.g. "V1 · static-first", "Case study". Same tag surfaces, uppercase label.
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-tag-bg px-2 py-0.5 font-mono",
        "text-label uppercase tracking-[0.12em] text-tag-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
