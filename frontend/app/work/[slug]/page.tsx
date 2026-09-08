import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { ButtonLink } from "@/components/primitives/button-link";
import { InlineLink } from "@/components/primitives/link";
import { Tag } from "@/components/primitives/tag";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Metrics } from "@/components/ui/metrics";
import { ProjectCard } from "@/components/ui/project-card";
import { Prose } from "@/components/ui/prose";
import { selectedProjects } from "@/lib/home-content";
import { getAllCaseStudies, getCaseStudy } from "@/lib/work-content";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${study.title} — Case Study | Racheal`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    notFound();
  }

  const related = selectedProjects.filter((project) => project.slug !== study.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: study.title,
    description: study.summary,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="border-b border-border">
          <div className="container-page py-16 md:py-24">
            <InlineLink href="/work">
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeftIcon className="size-4" />
                Back to Work
              </span>
            </InlineLink>

            <h1 className="mt-8 font-display text-display-lg font-medium tracking-tight text-ink">
              {study.title}
            </h1>
            <p className="mt-4 max-w-[70ch] text-body-lg text-ink-muted">{study.summary}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                {study.role}
              </p>
              {study.timeline ? (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {study.timeline}
                </p>
              ) : null}
            </div>

            {study.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        {study.image ? (
          <div className="container-page py-10 md:py-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.image.src}
              alt={study.image.alt}
              className="w-full rounded-md border border-border object-cover"
            />
          </div>
        ) : null}

        <div className="container-page pb-16 md:pb-24">
          <div className="max-w-[46rem]">
            {study.chapters.map((chapter, index) => {
              const headingId = `chapter-${index + 1}`;
              return (
                <section
                  key={chapter.marker}
                  aria-labelledby={headingId}
                  className="py-10 md:py-12 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
                >
                  <ChapterMarker label={chapter.title} index={`${index + 1}`.padStart(2, "0")} />
                  <h2 id={headingId} className="font-display text-h2 font-medium text-ink">
                    {chapter.title}
                  </h2>
                  <Prose className="mt-6">
                    {chapter.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </Prose>
                  {chapter.metrics ? <Metrics className="mt-8" items={chapter.metrics} /> : null}
                </section>
              );
            })}
          </div>
        </div>

        <footer className="border-t border-border">
          <div className="container-page py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-h2 font-medium text-ink">More case studies</h2>
              <Link href="/work" className="text-sm font-medium text-link hover:text-link-hover">
                Back to Work
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((project) => (
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

            <div className="mt-16 max-w-2xl">
              <h2 className="font-display text-h2 font-medium text-ink">
                Similar problems? Let&apos;s talk.
              </h2>
              <p className="mt-4 text-body-lg text-ink-muted">
                If what you&apos;re building has these stakes — money, safety, or security at the
                edge — I&apos;d like to hear about it.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact">Get in touch</ButtonLink>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
