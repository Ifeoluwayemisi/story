import type { Metadata } from "next";
import { ButtonLink } from "@/components/primitives/button-link";
import { InlineLink } from "@/components/primitives/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { achievements, journey, skillGroups } from "@/lib/about-content";
import { contact, recruiter } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "About — Racheal",
  description:
    "Product-minded full-stack software engineer — the journey, the evidence, and how I work.",
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="container-page pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">About</p>
        <h1 className="mt-6 max-w-[18ch] font-display text-display-lg font-medium tracking-tight text-ink">
          A product-minded engineer who cares how things are built — and why.
        </h1>
        <div className="mt-8 flex max-w-[60ch] flex-col gap-5 text-body-lg text-ink-muted">
          <p>
            I build real-world web products, RESTful APIs, and complex application workflows — with
            a focus on the backend decisions that keep them trustworthy: security boundaries,
            idempotency, deterministic rules, and honest constraints over invented capacity.
          </p>
          <p>
            I&apos;m drawn to AI-powered systems and the engineering discipline around them — the
            part where a model&apos;s output has to be explainable, verifiable, and safe to act on.
          </p>
          <p>
            Alongside engineering, I&apos;m working toward a Bachelor of Nursing Science at the
            University of Lagos — a perspective on people that keeps the products I build grounded
            in who actually uses them.
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Journey"
            title="Where I've been building"
            description="The roles behind the work. Dates and detail will be added as the source-of-truth material arrives — nothing here is invented."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {journey.map((entry) => (
              <li key={entry.organization} className="rounded-md border border-border bg-paper p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-h4 font-medium text-ink">{entry.role}</h3>
                  {entry.current ? (
                    <span className="font-mono text-label uppercase tracking-[0.12em] text-accent-strong">
                      Current
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {entry.organization}
                </p>
                <p className="mt-3 text-body text-ink-muted">{entry.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Achievements */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Achievements"
            title="Receipts, not trophies"
            description="Verifiable achievements, each traceable to its source."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {achievements.map((item) => (
              <li key={item.label} className="rounded-md border border-border bg-paper p-6">
                <h3 className="font-mono text-label uppercase tracking-[0.12em] text-ink">
                  {item.label}
                </h3>
                <p className="mt-2 text-body text-ink-muted">{item.detail}</p>
                {item.href ? (
                  <div className="mt-4">
                    <InlineLink href={item.href}>Read the Lumora case study</InlineLink>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Skills"
            title="With the receipts attached"
            description="Every skill links to the case study that demonstrates it. No bars, no percentages — just evidence."
          />
          <dl className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <dt className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
                  {group.category}
                </dt>
                <dd className="mt-4 flex flex-col gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill.name} className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-sm text-ink">{skill.name}</span>
                      <span className="flex flex-wrap gap-x-2 gap-y-0.5">
                        {skill.slugs.map((slug) => (
                          <InlineLink
                            key={slug}
                            href={`/work/${slug}`}
                            className="text-xs text-ink-muted"
                          >
                            {slug}
                          </InlineLink>
                        ))}
                      </span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How I work */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-2xl">
            <SectionHeading label="How I work" title="A few principles I keep" />
            <ul className="mt-10 flex flex-col gap-5 text-body-lg text-ink-muted">
              <li className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-3 size-1.5 shrink-0 rounded-full bg-accent-strong"
                />
                <span>
                  <strong className="font-medium text-ink">
                    The server is the source of truth.
                  </strong>{" "}
                  If a screen says it happened, the backend can prove it — with money, orders, or
                  access, that boundary is where trust lives.
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-3 size-1.5 shrink-0 rounded-full bg-accent-strong"
                />
                <span>
                  <strong className="font-medium text-ink">
                    AI structures the problem, it doesn&apos;t decide it.
                  </strong>{" "}
                  Deterministic, explainable rules beat magical answers when a false one has a cost.
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-3 size-1.5 shrink-0 rounded-full bg-accent-strong"
                />
                <span>
                  <strong className="font-medium text-ink">
                    Half of security is deciding the boundary.
                  </strong>{" "}
                  What the client can touch, what only the server touches — then making the boring
                  parts (short-lived keys, signed writes, rotation) non-negotiable.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recruiter clarity */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionHeading label="Recruiter facts" title="What I'm looking for" />
            <dl className="mt-10 grid gap-6 rounded-md border border-border bg-paper p-6 sm:grid-cols-2 md:p-8">
              <div className="grid gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  Roles
                </dt>
                <dd className="text-body text-ink">Full-stack · Backend · Frontend</dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  Location
                </dt>
                <dd className="text-body text-ink">{recruiter.location}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  Format
                </dt>
                <dd className="text-body text-ink">Remote · Hybrid</dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  Availability
                </dt>
                <dd className="text-body text-ink">{recruiter.availability}</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/work">See the work</ButtonLink>
              <ButtonLink href="/resume" variant="secondary">
                View resume
              </ButtonLink>
              <ButtonLink href={`mailto:${contact.email}`} variant="ghost">
                Email me
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
