import type { ReactNode } from "react";
import { CheckIcon, ErrorIcon, InfoIcon, WarningIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type AlertVariant = "success" | "warning" | "error" | "info";

export interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
  role?: "alert" | "status";
  className?: string;
}

const tone = {
  success: {
    icon: CheckIcon,
    panel:
      "border-[color-mix(in_srgb,var(--success)_45%,transparent)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-success",
  },
  warning: {
    icon: WarningIcon,
    panel:
      "border-[color-mix(in_srgb,var(--warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--warning)_12%,transparent)] text-warning",
  },
  error: {
    icon: ErrorIcon,
    panel:
      "border-[color-mix(in_srgb,var(--error)_45%,transparent)] bg-[color-mix(in_srgb,var(--error)_12%,transparent)] text-error",
  },
  info: {
    icon: InfoIcon,
    panel:
      "border-[color-mix(in_srgb,var(--info)_45%,transparent)] bg-[color-mix(in_srgb,var(--info)_12%,transparent)] text-info",
  },
} as const;

// Tinted surface from the semantic token itself (design-system §6 Alerts), so
// both themes derive their tint from the theme's own status hue. Icon + text +
// border carry the meaning — color is never the only signal.
export function Alert({ variant, children, role, className }: AlertProps) {
  const { icon: Icon, panel } = tone[variant];
  return (
    <div
      role={role ?? (variant === "error" || variant === "warning" ? "alert" : "status")}
      className={cn("flex items-start gap-3 rounded-md border p-4", panel, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="text-body">{children}</div>
    </div>
  );
}
