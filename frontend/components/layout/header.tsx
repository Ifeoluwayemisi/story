import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link
          href="/"
          className="shrink-0 font-display text-xl font-medium tracking-tight text-ink transition-colors duration-fast ease-brand hover:text-link"
        >
          Racheal
        </Link>

        {/* Inline top-bar nav (all viewports without JS; ≥lg always with JS).
            Below lg with JS this collapses into the MobileNav sheet. */}
        <nav
          aria-label="Primary"
          className="nav-inline-desktop flex flex-1 items-center justify-end"
        >
          <NavLinks />
        </nav>

        <div className="hidden lg:block">
          <ThemeToggle />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
