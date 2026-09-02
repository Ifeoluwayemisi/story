import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-tag-bg px-2 py-0.5",
        "font-mono text-xs font-normal text-tag-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
