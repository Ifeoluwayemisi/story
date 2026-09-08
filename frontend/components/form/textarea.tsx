"use client";

import type { ComponentPropsWithoutRef } from "react";
import { fieldControlClass, useFieldContext } from "@/components/form/field";
import { cn } from "@/lib/cn";

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

// Comfortable reading height (8rem+) per docs/design-system.md §6.
export function Textarea({ id, className, ...props }: TextareaProps) {
  const ctx = useFieldContext();
  return (
    <textarea
      id={ctx?.id ?? id}
      aria-invalid={ctx?.isInvalid || undefined}
      aria-describedby={ctx?.descriptionId}
      className={cn(fieldControlClass(ctx?.isInvalid), "min-h-[8rem] resize-y", className)}
      {...props}
    />
  );
}
