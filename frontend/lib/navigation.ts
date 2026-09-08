// Approved primary navigation contract (docs/information-architecture.md,
// docs/ux.md §1): Work · About · Writing · Contact. Single source of truth for
// the header, mobile sheet, and footer.
export const destinations = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export type Destination = (typeof destinations)[number];
