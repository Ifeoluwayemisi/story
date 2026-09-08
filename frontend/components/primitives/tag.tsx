import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TagProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

const tagStyles =
  "inline-flex items-center gap-1 rounded-sm bg-tag-bg px-2 py-0.5 " +
  "font-mono text-xs font-normal text-tag-ink";

// Semantic chips (docs/design-system.md §6). A Tag is a span by default; when an
// href is given it behaves as a link to its target (e.g. a case study).
export function Tag({ children, href, className }: TagProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          tagStyles,
          "underline-offset-2 transition-colors duration-fast ease-brand hover:bg-surface-2",
          className,
        )}
      >
        {children}
      </a>
    );
  }
  return <span className={cn(tagStyles, className)}>{children}</span>;
}
