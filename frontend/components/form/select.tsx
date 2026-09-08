"use client";

import type { ComponentPropsWithoutRef } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { fieldControlClass, useFieldContext } from "@/components/form/field";
import { cn } from "@/lib/cn";

export type SelectProps = ComponentPropsWithoutRef<"select">;

export function Select({ id, className, children, ...props }: SelectProps) {
  const ctx = useFieldContext();
  return (
    <div className="relative">
      <select
        id={ctx?.id ?? id}
        aria-invalid={ctx?.isInvalid || undefined}
        aria-describedby={ctx?.descriptionId}
        className={cn(fieldControlClass(ctx?.isInvalid), "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-faint" />
    </div>
  );
}
