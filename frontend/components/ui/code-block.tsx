import { cn } from "@/lib/cn";

export interface CodeBlockProps {
  children: string;
  title?: string;
  className?: string;
}

// Code excerpt for case studies / writing (docs/design-system.md §6):
// `--surface` block with a hairline frame in mono. Syntax highlighting is a
// later-phase concern; this carries the structural styling only.
export function CodeBlock({ children, title, className }: CodeBlockProps) {
  return (
    <figure className={cn("overflow-hidden rounded-md border border-border bg-surface", className)}>
      {title ? (
        <figcaption className="border-b border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
          {title}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm leading-relaxed text-ink">{children}</code>
      </pre>
    </figure>
  );
}
