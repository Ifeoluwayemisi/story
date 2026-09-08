import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/primitives/button";
import { ExternalLink, InlineLink } from "@/components/primitives/link";
import { Tag } from "@/components/primitives/tag";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/ui/project-card";
import { Metrics } from "@/components/ui/metrics";
import { Alert } from "@/components/ui/alert";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { CodeBlock } from "@/components/ui/code-block";
import { Prose } from "@/components/ui/prose";
import { Input } from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { Select } from "@/components/form/select";
import { Field } from "@/components/form/field";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { isDevPlaceholderEnabled } from "@/lib/dev";

export const metadata = {
  title: "Component review (DEV)",
  robots: { index: false, follow: false },
};

// Development-only component review surface. Compile-time no-op in production:
// the route returns notFound() so this surface can never be portfolio content.
export default function ComponentReviewPage() {
  if (!isDevPlaceholderEnabled) {
    notFound();
  }

  return (
    <div className="container-page py-16">
      <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
        [DEV REVIEW ONLY · never ships · docs/design-system.md]
      </p>
      <h1 className="mt-4 font-display text-display-lg font-medium text-ink">Component library</h1>
      <p className="mt-3 max-w-[70ch] text-body-lg text-ink-muted">
        All fixtures below are generic development placeholders. State review: default · hover ·
        focus-visible · active · disabled · loading · invalid · reduced-motion · light/dark.
      </p>

      <section aria-labelledby="heading-buttons" className="mt-16">
        <h2 id="heading-buttons" className="font-display text-h2 font-medium text-ink">
          Buttons
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button loading>Send message</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section aria-labelledby="heading-links" className="mt-16">
        <h2 id="heading-links" className="font-display text-h2 font-medium text-ink">
          Links
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <InlineLink href="/work">Inline link</InlineLink>
          <ExternalLink href="https://example.com">External link</ExternalLink>
        </div>
      </section>

      <section aria-labelledby="heading-markers" className="mt-16">
        <h2 id="heading-markers" className="font-display text-h2 font-medium text-ink">
          Tags &amp; badges
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Tag>TypeScript</Tag>
          <Tag href="/work">Linked tag</Tag>
          <Badge>Case study</Badge>
          <Badge>V1 · static-first</Badge>
        </div>
      </section>

      <section aria-labelledby="heading-forms" className="mt-16">
        <h2 id="heading-forms" className="font-display text-h2 font-medium text-ink">
          Forms
        </h2>
        <div className="mt-6 grid max-w-2xl gap-6">
          <Field id="review-name" label="Name" hint="Generic dev fixture.">
            <Input type="text" autoComplete="name" placeholder="Your name" />
          </Field>
          <Field id="review-email" label="Email" hint="Generic dev fixture.">
            <Input type="email" autoComplete="email" placeholder="you@example.com" />
          </Field>
          <Field id="review-reason" label="Reason" hint="Generic dev fixture.">
            <Select>
              <option value="">Select an option (dev fixture)</option>
              <option value="role">I have a role</option>
              <option value="build">Let&apos;s build together</option>
            </Select>
          </Field>
          <Field
            id="review-message"
            label="Message"
            required
            error="This field is required (dev fixture)."
          >
            <Textarea placeholder="Dev fixture message" />
          </Field>
          <Field id="review-disabled" label="Disabled">
            <Input type="text" value="Disabled control" disabled />
          </Field>
        </div>
      </section>

      <section aria-labelledby="heading-alerts" className="mt-16">
        <h2 id="heading-alerts" className="font-display text-h2 font-medium text-ink">
          Alerts
        </h2>
        <div className="mt-6 grid max-w-2xl gap-4">
          <Alert variant="success">Message sent — dev fixture.</Alert>
          <Alert variant="info">A note, dev fixture.</Alert>
          <Alert variant="warning">Rate limit approaching — dev fixture.</Alert>
          <Alert variant="error" role="alert">
            Couldn&apos;t send. Check your connection and try again — dev fixture.
          </Alert>
        </div>
      </section>

      <section aria-labelledby="heading-metrics" className="mt-16">
        <h2 id="heading-metrics" className="font-display text-h2 font-medium text-ink">
          Metrics block
        </h2>
        <div className="mt-6 max-w-3xl">
          <Metrics
            items={[
              { label: "Example metric", value: "n/a", note: "Dev fixture — real outcomes only." },
              { label: "Example metric", value: "n/a", note: "Dev fixture — never invented." },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="heading-article" className="mt-16">
        <h2 id="heading-article" className="font-display text-h2 font-medium text-ink">
          Article / case-study elements
        </h2>

        <div className="mt-8 max-w-[70ch]">
          <ChapterMarker label="Problem" index="01" />
          <Prose>
            <p>
              Dev fixture: the paragraph body renders at reading size with a measure under 70
              characters. Inline <code>code</code> and links like <Link href="/work">this one</Link>
              {""} are styled from tokens.
            </p>
            <blockquote>
              “A blockquote with a hairline rule and muted italic text.” — design system fixture
            </blockquote>
            <ul>
              <li>Bulleted list with accent markers</li>
              <li>Renders within the prose column</li>
            </ul>
            <hr />
            <p>Horizontal rules use the hairline border token.</p>
          </Prose>

          <CodeBlock title="example.ts" className="mt-8">
            {`// dev fixture — real case-study code ships with real content
export function example(): string {
  return "well-typed";
}`}
          </CodeBlock>
        </div>
      </section>

      <section aria-labelledby="heading-card" className="mt-16">
        <h2 id="heading-card" className="font-display text-h2 font-medium text-ink">
          Project card
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProjectCard
            href="/work"
            title="Demo project"
            role="Dev fixture — role"
            outcome="One-line outcome summary (dev fixture)."
            tags={["TypeScript", "Next.js", "Node.js"]}
          />
          <ProjectCard
            href="/work"
            title="Demo project"
            outcome="Card with a thumbnail slot (dev fixture)."
            tags={["Node.js"]}
          />
        </div>
      </section>

      <section aria-labelledby="heading-misc" className="mt-16">
        <h2 id="heading-misc" className="font-display text-h2 font-medium text-ink">
          Misc
        </h2>
        <div className="mt-6 flex items-center gap-6">
          <ThemeToggle />
        </div>
      </section>
    </div>
  );
}
