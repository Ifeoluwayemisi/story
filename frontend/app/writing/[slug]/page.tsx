import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { InlineLink } from "@/components/primitives/link";
import { Prose } from "@/components/ui/prose";
import { Tag } from "@/components/primitives/tag";
import { getWritingPost, writingEntries } from "@/lib/writing-content";

interface WritingPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return writingEntries.filter((entry) => entry.body).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} | Racheal`,
    description: post.excerpt,
  };
}

export default async function WritingPostPage({ params }: WritingPostPageProps) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(post.date ? { datePublished: post.date } : {}),
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
            <InlineLink href="/writing">
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeftIcon className="size-4" />
                Back to Writing
              </span>
            </InlineLink>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge>{post.type}</Badge>
              {post.date ? (
                <time className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {post.date}
                </time>
              ) : null}
            </div>
            <h1 className="mt-4 max-w-[24ch] font-display text-display-lg font-medium tracking-tight text-ink">
              {post.title}
            </h1>
            <p className="mt-4 max-w-[70ch] text-body-lg text-ink-muted">{post.excerpt}</p>
            {post.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        <div className="container-page py-16 md:py-24">
          <div className="max-w-[46rem]">
            <ChapterMarker label="Body" />
            <Prose>
              {post.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
        </div>

        <footer className="border-t border-border">
          <div className="container-page py-16 md:py-24">
            <InlineLink href="/writing">
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeftIcon className="size-4" />
                Back to Writing
              </span>
            </InlineLink>
          </div>
        </footer>
      </article>
    </>
  );
}
