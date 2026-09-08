import type { Metadata } from "next";
import { ButtonLink } from "@/components/primitives/button-link";
import { ExternalLink, InlineLink } from "@/components/primitives/link";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact, credibilityItems, recruiter, selectedProjects } from "@/lib/home-content";
import { writingHighlight } from "@/lib/writing-content";

export const metadata: Metadata = {
  title: "Racheal — Product-Minded Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building real-world web products, reliable APIs, and systems that solve real problems. Open to remote & hybrid opportunities.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
              Full-Stack Software Engineer
            </p>
            <h1 className="mt-6 font-display text-display-xl font-medium tracking-tight text-ink">
              Racheal
            </h1>
            <p className="mt-6 max-w-[30ch] font-display text-display-lg text-ink-muted">
              I build thoughtful web products, reliable APIs, and systems that solve real problems.
            </p>
            <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
              I design and ship real-world software end-to-end — from idempotent checkout and
              payment lifecycles to AI-powered emergency-care coordination — and I own the outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/work">View my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <aside aria-label="Availability" className="rounded-md border border-border p-6 md:p-8">
              <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
                Recruiter facts
              </p>
              <dl className="mt-6 grid gap-5">
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
                  <dd className="text-body text-ink">Open to relevant opportunities</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Selected Work"
            title="A selection of my strongest builds"
            description="Full-stack products and backend systems with real engineering decisions behind them — checkout and payment lifecycles, deterministic emergency triage, and dynamic event-access verification."
            aside={
              <ButtonLink href="/work" variant="ghost">
                View all work
              </ButtonLink>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {selectedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                href={`/work/${project.slug}`}
                title={project.title}
                role={project.role}
                outcome={project.outcome}
                tags={project.tags}
                image={project.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Now band */}
      <section className="border-t border-border">
        <div className="container-page py-10 md:py-12">
          <div className="max-w-3xl">
            <p className="font-mono text-label uppercase tracking-[0.12em] text-accent-strong">
              Now
            </p>
            <p className="mt-3 text-body-lg text-ink">
              Building the <InlineLink href="/work/sabiget">SabiGet</InlineLink> food-marketplace
              MVP — guest checkout, payments, and real-time order tracking — and open to full-stack
              &amp; backend opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Evidence"
            title="Signals beyond the code"
            description="Quiet, verifiable signals — kept restrained, never a wall of certificates."
          />
          <dl className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {credibilityItems.map((item) => (
              <div key={item.label} className="bg-paper p-6">
                <dt className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
                  {item.label}
                </dt>
                <dd className="mt-2 text-body text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About preview */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-2xl">
            <SectionHeading label="About" title="A product-minded engineer" />
            <div className="mt-8 flex flex-col gap-5 text-body-lg text-ink-muted">
              <p>
                I build real-world web products, RESTful APIs, and complex application workflows —
                with a focus on the backend decisions that keep them trustworthy: security
                boundaries, idempotency, deterministic rules, and honest constraints over invented
                capacity.
              </p>
              <p>
                I care about how software is built — and why. I&apos;m particularly drawn to
                AI-powered systems and the engineering discipline around them.
              </p>
              <p>
                Alongside engineering, I&apos;m working toward a Bachelor of Nursing Science at the
                University of Lagos.
              </p>
            </div>
            <div className="mt-8">
              <InlineLink href="/about">More about me</InlineLink>
            </div>
          </div>
        </div>
      </section>

      {/* Writing teaser */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            label="Writing &amp; Notes"
            title="Notes on learning and building"
            description="Things I'm learning, building, and thinking about across software engineering, AI, data, and product development."
          />
          {writingHighlight ? (
            <div className="mt-12 max-w-2xl border-b border-border pb-8">
              <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
                Medium · {writingHighlight.type}
              </p>
              <h3 className="mt-3 font-display text-h3 font-medium text-ink">
                {writingHighlight.title}
              </h3>
              <p className="mt-3 text-body text-ink-muted">{writingHighlight.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                {writingHighlight.externalUrl ? (
                  <ExternalLink href={writingHighlight.externalUrl}>Read on Medium</ExternalLink>
                ) : (
                  <InlineLink href={`/writing/${writingHighlight.slug}`}>Read the note</InlineLink>
                )}
                <InlineLink href="/writing">All writing</InlineLink>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-2xl">
            <SectionHeading label="Contact" title="Let's build something thoughtful." />
            <p className="mt-8 text-body-lg text-ink-muted">
              I&apos;m open to full-stack, backend, and frontend software engineering opportunities
              — remote or hybrid, based in {recruiter.location}.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={`mailto:${contact.email}`}>Email me</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Use the contact page
              </ButtonLink>
            </div>
            <p className="mt-6 font-mono text-sm text-ink-faint">{contact.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
