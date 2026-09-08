import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

// Mono uppercase field label (docs/design-system.md §6 Forms). The required
// marker is decorative; requiredness is exposed to assistive tech via the
// control's native required/aria-required so the label never double-announces.
export function Label({ children, required, className, ...props }: LabelProps) {
  const extra: ReactNode | undefined = required ? <span aria-hidden="true"> *</span> : undefined;
  return (
    <label
      className={cn("font-mono text-label uppercase tracking-[0.12em] text-ink-muted", className)}
      {...props}
    >
      {children}
      {extra}
    </label>
  );
}
