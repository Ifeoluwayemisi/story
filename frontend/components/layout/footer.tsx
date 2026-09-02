import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { isDevPlaceholderEnabled } from "@/lib/dev";

const sitemap = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-paper">
      <div className="container-page flex flex-col gap-10 py-16 md:py-20">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
          <div>
            <p className="font-display text-lg font-medium tracking-tight text-ink">Racheal</p>
            <p className="mt-2 max-w-xs font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
              Product-minded full-stack software engineer
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors duration-fast ease-brand hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4">
            {isDevPlaceholderEnabled ? (
              // Dev-only placeholder — resume & contact channels ship after Phase 0
              // content sign-off. Compile-time no-op in production builds.
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                [DEV · channels &amp; resume pending content]
              </p>
            ) : null}
            <ThemeToggle />
          </div>
        </div>

        <p className="font-mono text-xs text-ink-faint">
          Designed &amp; built by Racheal &middot; 2026
        </p>
      </div>
    </footer>
  );
}
