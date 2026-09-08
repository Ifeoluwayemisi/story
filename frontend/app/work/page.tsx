import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { selectedProjects } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "Work — Case Studies | Racheal",
  description:
    "Full case studies on the products I've engineered — the problem, the technical decisions, the trade-offs, and the lessons. No one-line brags.",
};

export default function WorkPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        label="Work"
        title="Enough depth to judge"
        description="Every project below opens a full case study — the problem, the decisions, the trade-offs, and the lessons. Nothing is a one-line brag."
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
    </section>
  );
}
