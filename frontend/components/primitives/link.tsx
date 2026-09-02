import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type InlineLinkProps = ComponentProps<typeof Link>;

export function InlineLink({ className, ...props }: InlineLinkProps) {
  return (
    <Link
      className={cn(
        "text-link underline underline-offset-4 transition-colors duration-fast ease-brand",
        "hover:text-link-hover",
        className,
      )}
      {...props}
    />
  );
}

export type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const externalLinkStyles =
  "inline-flex items-center gap-1 text-link underline underline-offset-4 " +
  "transition-colors duration-fast ease-brand hover:text-link-hover";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5 shrink-0"
    >
      <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V10" />
      <path d="M9 2h5v5" />
      <path d="M14 2 7 9" />
    </svg>
  );
}

export function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(externalLinkStyles, className)}
      {...props}
    >
      {children}
      <ExternalIcon />
    </a>
  );
}
