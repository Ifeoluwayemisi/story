import { cn } from "@/lib/cn";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "focus:fixed focus:left-4 focus:top-4 focus:z-50",
        "focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2",
        "focus:text-sm focus:font-medium focus:text-ink focus:shadow-elevated",
      )}
    >
      Skip to content
    </a>
  );
}
