import type { Metadata } from "next";
import { ButtonLink } from "@/components/primitives/button-link";
import { PrintResumeButton } from "@/components/contact/print-resume-button";
import { InlineLink } from "@/components/primitives/link";
import {
  experience,
  projects,
  recognitions,
  resumeContact,
  resumeEducation,
  resumeIdentity,
  skills,
} from "@/lib/resume";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume — Racheal",
  description:
    "A print-ready, brand-consistent resume — the same claims, evidence, and availability as the portfolio, in one page.",
};

export default function ResumePage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="resume-toolbar flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
            The one-sheet version of this site
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/resume/racheal-resume.pdf" download>
              Download PDF
            </ButtonLink>
            <PrintResumeButton />
          </div>
        </div>

        <div className="resume-document rounded-md border border-border bg-paper p-6 sm:p-10 md:p-14">
          <header>
            <h1 className="font-display text-display-lg font-medium tracking-tight text-ink">
              {resumeIdentity.name}
            </h1>
            <p className="mt-2 font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
              {resumeIdentity.headline}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-ink-muted">
              <div className="flex gap-2">
                <dt className="text-ink-faint">Email</dt>
                <dd>{resumeContact.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink-faint">Location</dt>
                <dd>{resumeContact.location}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink-faint">Availability</dt>
                <dd>{resumeContact.availability}</dd>
              </div>
            </dl>
          </header>

          <section className="resume-section mt-12 border-t border-border pt-8 md:mt-14 md:pt-10">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
              Experience
            </h2>
            <ul className="mt-6 flex flex-col gap-6">
              {experience.map((entry) => (
                <li key={entry.organization}>
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
                  <p className="mt-3 max-w-[68ch] text-body text-ink-muted">{entry.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section mt-12 border-t border-border pt-8 md:mt-14 md:pt-10">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
              Selected work
            </h2>
            <ul className="mt-6 flex flex-col gap-6">
              {projects.map((project) => (
                <li key={project.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-h4 font-medium text-ink">
                      <InlineLink href={`/work/${project.slug}`}>{project.title}</InlineLink>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                      {project.role}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[68ch] text-body text-ink-muted">{project.summary}</p>
                  {project.tags.length > 0 ? (
                    <p className="mt-2 font-mono text-xs text-ink-faint">
                      {project.tags.join(" · ")}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section mt-12 border-t border-border pt-8 md:mt-14 md:pt-10">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
              Skills
            </h2>
            <dl className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category}>
                  <dt className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
                    {group.category}
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="font-mono text-sm text-ink">
                        {skill.name}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="resume-section mt-12 border-t border-border pt-8 md:mt-14 md:pt-10">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
              Recognitions
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {recognitions.map((item) => (
                <li key={item.label}>
                  <h3 className="font-medium text-ink">{item.label}</h3>
                  <p className="mt-1 max-w-[68ch] text-body text-ink-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section mt-12 border-t border-border pt-8 md:mt-14 md:pt-10">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
              Education
            </h2>
            <div className="mt-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-h4 font-medium text-ink">
                  {resumeEducation.program} ({resumeEducation.degree})
                </h3>
                <span className="font-mono text-label uppercase tracking-[0.12em] text-ink-faint">
                  {resumeEducation.institution} · {resumeEducation.status}
                </span>
              </div>
              <p className="mt-3 max-w-[68ch] text-body text-ink-muted">{resumeEducation.note}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
