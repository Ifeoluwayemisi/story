import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps } from "react";
import { ExternalIcon } from "@/components/icons";
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

export function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(externalLinkStyles, className)}
      {...props}
    >
      {children}
      <ExternalIcon className="size-3.5 shrink-0" />
    </a>
  );
}
