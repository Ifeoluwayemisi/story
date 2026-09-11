// Resume assembly — the resume's structured source of truth
// (docs/content-model.md §2, docs/requirements.md RESUME/CV REQUIREMENTS).
// Experience, skills, work, and achievements are referenced directly from the
// site's content modules (about-content / work-content / home-content), so the
// resume structurally cannot drift from the portfolio's claims. Fields the
// owner has not supplied (role dates, LinkedIn/GitHub, portrait) are omitted,
// never invented.

import { achievements, journey, skillGroups } from "@/lib/about-content";
import { contact, recruiter } from "@/lib/home-content";
import { caseStudies } from "@/lib/work-content";

export interface ResumeProject {
  slug: string;
  title: string;
  role: string;
  summary: string;
  tags: string[];
}

export const resumeIdentity = {
  name: "Racheal",
  headline: "Product-minded full-stack software engineer",
} as const;

export const resumeContact = {
  email: contact.email,
  location: recruiter.location,
  availability: recruiter.availability,
} as const;

// Single verified fact (About page body copy): the B.NSc. UNILAG line.
export const resumeEducation = {
  program: "Bachelor of Nursing Science",
  degree: "B.NSc.",
  institution: "University of Lagos",
  status: "In progress",
  note: "A perspective on people that keeps the products I build grounded in who actually uses them.",
} as const;

// References to the verified site modules — one source, no drift.
export const experience = journey;
export const recognitions = achievements;
export const skills = skillGroups;

export const projects: ResumeProject[] = caseStudies.map((study) => ({
  slug: study.slug,
  title: study.title,
  role: study.role,
  summary: study.summary,
  tags: study.tags,
}));
