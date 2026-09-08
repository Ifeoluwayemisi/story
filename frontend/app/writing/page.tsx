import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/primitives/tag";
import { ExternalLink } from "@/components/primitives/link";
import { writingEntries } from "@/lib/writing-content";

export const metadata: Metadata = {
  title: "Writing — Racheal",
  description:
    "Notes on learning and building — articles, retrospectives, lessons, and experiments. Sparse and excellent, never filler.",
};

export default function WritingPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        label="Writing"
        title="Notes on learning and building"
        description="Things I'm learning, building, and thinking about across software engineering, AI, data, and product development."
      />

      <ul className="mt-12 max-w-2xl">
        {writingEntries.map((entry) => (
          <li key={entry.slug} className="border-b border-border py-8 first:pt-0">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{entry.type}</Badge>
              {entry.date ? (
                <time className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {entry.date}
                </time>
              ) : null}
            </div>
            <h2 className="mt-4 font-display text-h3 font-medium text-ink">{entry.title}</h2>
            <p className="mt-3 text-body text-ink-muted">{entry.excerpt}</p>
            {entry.tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}
            {entry.externalUrl ? (
              <div className="mt-5">
                <ExternalLink href={entry.externalUrl}>Read on Medium</ExternalLink>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
