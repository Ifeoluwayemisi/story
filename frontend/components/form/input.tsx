"use client";

import type { ComponentPropsWithoutRef } from "react";
import { fieldControlClass, useFieldContext } from "@/components/form/field";
import { cn } from "@/lib/cn";

export type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ id, className, ...props }: InputProps) {
  const ctx = useFieldContext();
  return (
    <input
      id={ctx?.id ?? id}
      aria-invalid={ctx?.isInvalid || undefined}
      aria-describedby={ctx?.descriptionId}
      className={cn(fieldControlClass(ctx?.isInvalid), className)}
      {...props}
    />
  );
}
