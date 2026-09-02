"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const destinations = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-7">
      {destinations.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative inline-flex items-center gap-1.5 py-2 text-sm",
                "transition-colors duration-fast ease-brand",
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
                  "absolute inset-x-0 -bottom-0.5 h-px transition-colors duration-fast",
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
