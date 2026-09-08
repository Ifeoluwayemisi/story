"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Accessible mobile navigation sheet (docs/ux.md §1). Rendered below <lg as a
// modal dialog: labelled opener with aria-expanded, focus is moved into the
// panel and trapped, Escape closes and restores focus to the opener, body
// scroll is locked while open, and the theme toggle stays reachable inside.
// The inline top-bar nav remains the no-JS fallback (see globals.css nav-js).
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Progressive enhancement marker: JS is live, so the sheet may replace the
  // wrapping inline nav below lg without ever orphaning navigation.
  useEffect(() => {
    document.documentElement.classList.add("nav-js");
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;

    panel.focus();

    const getFocusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled"),
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = getFocusables();
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      // Restore focus to the opener after the panel is hidden.
      requestAnimationFrame(() => trigger?.focus());
    };
  }, [open]);

  const toggle = () => {
    if (window.matchMedia("(min-width: 64rem)").matches) return;
    setOpen((v) => !v);
  };

  return (
    <>
      <div className="lg:hidden">
        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-haspopup="dialog"
          aria-label={open ? "Close menu" : "Open menu"}
          className="nav-menu-button inline-flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors duration-fast ease-brand hover:bg-surface hover:text-ink"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col overflow-y-auto border-t border-border bg-paper p-6 lg:hidden"
      >
        <nav aria-label="Primary" className="flex-1 pt-2">
          <NavLinks orientation="column" />
        </nav>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">Theme</p>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
