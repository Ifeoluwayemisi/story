import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonBase, buttonVariants, type ButtonVariant } from "@/components/primitives/button";
import { cn } from "@/lib/cn";

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
}

// Anchor styled with the button system (docs/design-system.md §6 Buttons) for
// link-targeted primary/secondary/ghost actions. Shares the exact variant
// classes with <Button> so the two never drift.
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonBase, buttonVariants[variant], className)} {...props} />;
}
