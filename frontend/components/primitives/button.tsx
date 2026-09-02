import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-interactive text-on-brand hover:bg-interactive-hover active:bg-brand",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:bg-surface hover:text-interactive hover:border-interactive",
  ghost: "text-link underline-offset-4 hover:text-link-hover hover:underline",
  danger: "border border-error text-error hover:bg-error/10",
} as const;

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 " +
  "font-body text-base font-medium transition-colors duration-fast ease-brand select-none " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export type ButtonVariant = keyof typeof variants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />;
}
