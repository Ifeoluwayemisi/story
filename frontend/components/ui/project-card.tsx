import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Tag } from "@/components/primitives/tag";
import { cn } from "@/lib/cn";

export interface ProjectCardImage {
  src: string;
  alt: string;
  aspect?: "3-2" | "16-9";
}

export interface ProjectCardProps {
  title: string;
  outcome: string;
  tags: string[];
  href: string;
  role?: string;
  image?: ProjectCardImage;
  className?: string;
}

// Whole-card link to the case study (docs/design-system.md §6 Project cards,
// docs/ux.md §3). Accessible name = project title; hover raises the surface
// and strengthens the hairline; arrow nudges — no heavy animation.
export function ProjectCard({
  title,
  outcome,
  tags,
  href,
  role,
  image,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      aria-label={title}
      className={cn(
        "group block rounded-md border border-border bg-paper transition-colors duration-base ease-brand",
        "hover:border-border-strong hover:bg-surface",
        className,
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "w-full rounded-t-md border-b border-border object-cover",
            image.aspect === "16-9" ? "aspect-video" : "aspect-[3/2]",
          )}
        />
      ) : null}

      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-h4 font-medium text-ink">{title}</h3>
          {role ? <p className="mt-1 font-mono text-xs text-ink-faint">{role}</p> : null}
        </div>

        <p className="text-body text-ink-muted">{outcome}</p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-link transition-colors duration-fast ease-brand group-hover:text-link-hover">
            Read the case study
            <ArrowRightIcon className="size-4 transition-transform duration-fast ease-brand group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
