"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ErrorIcon } from "@/components/icons";
import { Label } from "@/components/form/label";
import { cn } from "@/lib/cn";

interface FieldContextValue {
  id: string;
  descriptionId: string | undefined;
  isInvalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

// Shared control treatment (docs/design-system.md §6 Forms): control fill,
// strong hairline border (visible pre-focus), 2px interactive focus ring,
// `--ink-faint` placeholder. Invalid swaps to the error border + ring — the
// error is also carried by the error text and icon, never color alone.
const controlBase =
  "w-full rounded-md border bg-control-fill px-3 py-3 text-body text-ink " +
  "placeholder:text-ink-faint transition-[border-color,box-shadow] duration-fast ease-brand " +
  "focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-link " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export function fieldControlClass(isInvalid: boolean | undefined): string {
  return cn(
    controlBase,
    isInvalid ? "border-error focus:border-error focus:ring-error" : "border-border-strong",
  );
}

export interface FieldProps {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

// Form field: label + control + hint/error with explicit id wiring. The error
// is announced via aria-describedby on the control and rendered with icon +
// text so the state is never communicated by color alone.
export function Field({ id, label, children, hint, error, required, className }: FieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const descriptionParts = [error ? errorId : null, !error && hint ? hintId : null].filter(Boolean);

  const context: FieldContextValue = {
    id,
    descriptionId: descriptionParts.length > 0 ? descriptionParts.join(" ") : undefined,
    isInvalid: Boolean(error),
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      <FieldContext.Provider value={context}>{children}</FieldContext.Provider>

      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm text-error">
          <ErrorIcon className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
