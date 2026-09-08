"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { destinations } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export interface NavLinksProps {
  orientation?: "row" | "column";
}

export function NavLinks({ orientation = "row" }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex items-center",
        orientation === "row" && "flex-wrap gap-x-4 gap-y-1 sm:gap-x-7",
        orientation === "column" && "flex-col items-stretch gap-1",
      )}
    >
      {destinations.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative inline-flex items-center gap-1.5",
                "transition-colors duration-fast ease-brand",
                orientation === "row" && "py-2 text-sm",
                orientation === "column" && "w-full py-3 text-body-lg",
                active ? "font-medium text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {active ? (
                <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
              ) : null}
              {label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 h-px transition-colors duration-fast",
                  orientation === "row" ? "-bottom-0.5" : "bottom-0.5",
                  active ? "bg-link" : "bg-transparent group-hover:bg-border-strong",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
