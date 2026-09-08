import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ProseProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

// Article / case-study prose column (docs/design-system.md §6, docs/ux.md §4):
// measure ≤ 70ch, body-lg reading size. Block elements (blockquote, code, hr,
// lists, images) are composed from tokens in globals.css `.prose-body`.
export function Prose({ children, as: Component = "div", className }: ProseProps) {
  return (
    <Component className={cn("prose-body text-body-lg leading-[1.7]", className)}>
      {children}
    </Component>
  );
}
