// Homepage content — structured source of truth (docs/content-model.md).
// Every value here is real material from the Portfolio Content Source of
// Truth. Missing evidence is omitted, never invented.

export interface HomeProjectImage {
  src: string;
  alt: string;
  aspect: "3-2" | "16-9";
}

export interface HomeProject {
  slug: string;
  title: string;
  role: string;
  outcome: string;
  tags: string[];
  image?: HomeProjectImage;
}

export const selectedProjects: HomeProject[] = [
  {
    slug: "sabiget",
    title: "SabiGet",
    role: "Full-Stack Developer · Client work",
    outcome:
      "A location-aware, multi-vendor food marketplace with guest-first checkout, server-authoritative payments, and real-time order tracking — built from scratch.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express", "Paystack", "Socket.IO", "PostgreSQL"],
    image: {
      src: "/projects/sabiget.png",
      alt: "SabiGet — food marketplace interface",
      aspect: "16-9",
    },
  },
  {
    slug: "alafia",
    title: "Alafia",
    role: "Backend Engineer / Full-Stack Developer",
    outcome:
      "An AI-powered emergency-care coordination platform that turns voice or text symptoms into explainable, deterministic triage and capability-based facility recommendations.",
    tags: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Python", "Whisper", "AI integrations"],
    image: {
      src: "/projects/alafia.png",
      alt: "Alafia — emergency-care coordination interface",
      aspect: "16-9",
    },
  },
  {
    slug: "lumora",
    title: "Lumora",
    role: "GESP Hackathon · Team project",
    outcome:
      "Placed 2nd at the GESP Hackathon and was recognized by UNICEF representatives during their visit to GESP YABATECH.",
    tags: [],
    image: {
      src: "/projects/lumora.png",
      alt: "Lumora — hackathon project interface",
      aspect: "16-9",
    },
  },
  {
    slug: "myguestly-ai",
    title: "MyGuestly AI",
    role: "Lead Backend & API Architect",
    outcome:
      "An event-management SaaS with TOTP dynamic QR gate verification, secure media-upload signing, and real-time guest media and memories.",
    tags: ["Node.js", "Prisma", "PostgreSQL", "JWT", "TOTP", "Cloudinary", "REST APIs"],
  },
];

export interface CredibilityItem {
  label: string;
  detail: string;
}

// Restrained credibility signals — not an award wall.
export const credibilityItems: CredibilityItem[] = [
  {
    label: "GESP Hackathon",
    detail: "2nd place — the Lumora project (team achievement).",
  },
  {
    label: "UNICEF recognition",
    detail: "Lumora was recognized by UNICEF representatives during their visit to GESP YABATECH.",
  },
  {
    label: "Cyncra Technologies",
    detail: "Frontend developer intern — React & Tailwind CSS (remote).",
  },
  {
    label: "TechCrush Community",
    detail: "Lagos City Lead — community coordination and admin.",
  },
];

export const contact = {
  email: "destinifeoluwa@gmail.com",
} as const;

export const recruiter = {
  location: "Lagos / Ogun State, Nigeria",
  availability: "Remote & hybrid · open to opportunities",
} as const;
