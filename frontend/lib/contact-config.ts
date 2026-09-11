// Public contact configuration — single source of truth (docs/content-model.md
// contact site-config, docs/environment.md). The WhatsApp number lives here and
// nowhere else; links are built from it so the destination can never drift.
// Owner-approved Phase 8 values (ADR-005).

export const replyTimeline =
  "Your message goes directly to Racheal. She typically replies within 1–2 business days.";

export const whatsapp = {
  number: "+2349152026763",
  ctaLabel: "Chat on WhatsApp",
  prefilledText:
    "Hi Racheal, I came across your portfolio and would like to discuss an opportunity with you.",
} as const;

/** `wa.me` deep link in international-digit format. Optional prefilled text is
 *  encoded; without it, the plain deep link ships (ADR-005). */
export function whatsappHref(): string {
  const digits = whatsapp.number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return whatsapp.prefilledText.length > 0
    ? `${base}?text=${encodeURIComponent(whatsapp.prefilledText)}`
    : base;
}
