import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link
          href="/"
          className="shrink-0 font-display text-xl font-medium tracking-tight text-ink transition-colors duration-fast ease-brand hover:text-interactive"
        >
          Racheal
        </Link>
        <nav aria-label="Primary" className="flex flex-1 items-center justify-end">
          <NavLinks />
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
