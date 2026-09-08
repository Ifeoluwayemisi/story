import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-interactive text-on-brand hover:bg-interactive-hover active:bg-interactive-active",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:bg-surface hover:text-link hover:border-link active:bg-surface-2",
  ghost:
    "text-link underline-offset-4 hover:text-link-hover hover:underline active:text-interactive-active",
  danger: "border border-error text-error hover:bg-error/10 active:bg-error/20",
} as const;

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 " +
  "font-body text-base font-medium transition-colors duration-fast ease-brand select-none " +
  "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

export const buttonBase = base;
export const buttonVariants = variants;
export type ButtonVariant = keyof typeof buttonVariants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}

export function Button({
  variant = "primary",
  type = "button",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}
