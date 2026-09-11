import Link from "next/link";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { contact, recruiter } from "@/lib/home-content";
import { destinations } from "@/lib/navigation";

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
              {destinations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors duration-fast ease-brand hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-ink-muted transition-colors duration-fast ease-brand hover:text-ink"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-sm text-ink-muted">
              <a
                href={`mailto:${contact.email}`}
                className="text-ink transition-colors duration-fast ease-brand hover:text-link"
              >
                {contact.email}
              </a>
            </p>
            <WhatsAppLink />
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
              Remote &amp; hybrid &middot; {recruiter.location}
            </p>
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
