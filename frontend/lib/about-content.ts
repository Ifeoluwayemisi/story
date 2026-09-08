// About content — structured source of truth (docs/content-model.md,
// docs/ux.md §5). Everything here is traceable to the Portfolio Content
// Source of Truth; dates, portrait, and resume are not yet supplied and are
// omitted rather than invented.

export interface JourneyEntry {
  role: string;
  organization: string;
  current?: boolean;
  summary: string;
}

export interface Achievement {
  label: string;
  detail: string;
  href?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; slugs: string[] }[];
}

export const journey: JourneyEntry[] = [
  {
    role: "Frontend Developer Intern",
    organization: "Cyncra Technologies",
    current: true,
    summary: "Remote — building product surfaces with React and Tailwind CSS.",
  },
  {
    role: "Lagos City Lead",
    organization: "TechCrush Community",
    summary: "Community coordination and admin for the TechCrush community.",
  },
];

export const achievements: Achievement[] = [
  {
    label: "GESP Hackathon — 2nd place",
    detail: "The Lumora project (team achievement).",
    href: "/work/lumora",
  },
  {
    label: "UNICEF recognition",
    detail: "Lumora recognised by UNICEF representatives during their visit to GESP YABATECH.",
    href: "/work/lumora",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", slugs: ["sabiget", "alafia", "myguestly-ai"] },
      { name: "Python", slugs: ["alafia"] },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", slugs: ["sabiget"] },
      { name: "React", slugs: ["sabiget"] },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Node.js", slugs: ["sabiget", "alafia", "myguestly-ai"] },
      { name: "Express", slugs: ["sabiget", "alafia"] },
      { name: "REST APIs", slugs: ["sabiget", "alafia", "myguestly-ai"] },
      { name: "Socket.IO", slugs: ["sabiget"] },
      { name: "Paystack", slugs: ["sabiget"] },
      { name: "PostgreSQL", slugs: ["sabiget", "alafia", "myguestly-ai"] },
      { name: "Sequelize", slugs: ["alafia"] },
      { name: "Prisma", slugs: ["myguestly-ai"] },
      { name: "JWT", slugs: ["myguestly-ai"] },
      { name: "TOTP", slugs: ["myguestly-ai"] },
      { name: "Cloudinary", slugs: ["myguestly-ai"] },
    ],
  },
  {
    category: "Data & AI",
    skills: [
      { name: "Speech-to-text (faster-whisper)", slugs: ["alafia"] },
      { name: "AI integrations", slugs: ["alafia"] },
    ],
  },
];
