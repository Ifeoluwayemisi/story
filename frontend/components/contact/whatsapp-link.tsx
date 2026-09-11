import { ExternalIcon } from "@/components/icons";
import { buttonBase, buttonVariants } from "@/components/primitives/button";
import { whatsapp, whatsappHref } from "@/lib/contact-config";
import { cn } from "@/lib/cn";

interface WhatsAppLinkProps {
  /** "button" styles the CTA as the secondary control (Contact); "link" keeps
   *  it quiet (footer). */
  variant?: "link" | "button";
  className?: string;
}

const externalLinkStyles =
  "inline-flex items-center gap-1 text-link underline underline-offset-4 " +
  "transition-colors duration-fast ease-brand hover:text-link-hover";

// Secondary direct-chat CTA (ADR-005): a real anchor to the wa.me deep link with
// an accessible label and external-app indication. Never a floating widget.
export function WhatsAppLink({ variant = "link", className }: WhatsAppLinkProps) {
  const classes = cn(
    variant === "button" ? cn(buttonBase, buttonVariants.secondary) : externalLinkStyles,
    className,
  );
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with me on WhatsApp (${whatsapp.number})`}
      className={classes}
    >
      {whatsapp.ctaLabel}
      <ExternalIcon className="size-3.5 shrink-0" />
    </a>
  );
}
