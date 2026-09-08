// Case-study content — structured source of truth (docs/content-model.md,
// docs/ux.md §4). Every claim below is traceable to the Portfolio Content
// Source of Truth; chapters with no sourced material are omitted outright
// (Lumora's build details are pending owner input). No invented metrics,
// numbers, links, or timelines.

import type { Metric } from "@/components/ui/metrics";
import type { HomeProjectImage } from "@/lib/home-content";

export interface CaseStudyChapter {
  marker: string;
  title: string;
  body: string[];
  metrics?: Metric[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  role: string;
  tags: string[];
  image?: HomeProjectImage;
  timeline?: string;
  chapters: CaseStudyChapter[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "sabiget",
    title: "SabiGet",
    summary:
      "A location-aware, multi-vendor food marketplace with guest-first checkout, server-authoritative payments, and real-time order tracking — built from scratch.",
    role: "Full-Stack Developer · Client work",
    tags: ["Next.js", "TypeScript", "Node.js", "Express", "Paystack", "Socket.IO", "PostgreSQL"],
    image: {
      src: "/projects/sabiget.png",
      alt: "SabiGet — food marketplace interface",
      aspect: "16-9",
    },
    chapters: [
      {
        marker: "01 · Problem",
        title: "The problem",
        body: [
          "The marketplace has to win two different crowds at once: customers who expect to order in seconds without creating an account, and vendors whose menu, availability, and order state must stay consistent across a marketplace's worth of interactions.",
          "The single biggest design risk was money. A checkout where the frontend and the backend disagree about whether a payment happened is not a bug — it's a trust failure.",
        ],
      },
      {
        marker: "02 · Context",
        title: "Context",
        body: [
          "A from-scratch build for a client: a Next.js and TypeScript storefront over a Node/Express API, PostgreSQL for persistence, Paystack for payments, and Socket.IO for real-time order tracking.",
        ],
      },
      {
        marker: "03 · My role",
        title: "My role",
        body: [
          "Full-stack developer on client work — decisions made across the product, the API, and the systems underneath both.",
        ],
      },
      {
        marker: "04 · Constraints",
        title: "Constraints",
        body: [
          "Location awareness had to feel genuinely useful without over-promising GPS-level precision — availability is neighbourhood-aware, not turn-by-turn.",
        ],
      },
      {
        marker: "05 · Thinking",
        title: "Thinking",
        body: [
          "The guiding principle was server-authoritative state: the client is never the source of truth about money or order state. If a customer's screen says the order is confirmed, the backend has to be able to prove it — because that is where the money actually moves.",
        ],
      },
      {
        marker: "06 · Technical decisions",
        title: "Technical decisions",
        body: [
          "Idempotent checkout — every attempt carries a stable idempotency key, so a retry after a network blip can never double-charge a guest.",
          "A server-authoritative payment lifecycle with Paystack — the frontend starts and reflects payment events, but the API reconciles actual status before an order counts as paid.",
          "Real-time order tracking over Socket.IO — vendors and customers watch the same state transition instead of polling for it.",
        ],
      },
      {
        marker: "07 · Trade-offs",
        title: "Trade-offs",
        body: [
          "Idempotency guarantees and a reconciling server add ceremony to the checkout path in exchange for eliminating the one failure mode that matters — a payment both sides can't agree on.",
          "Live re-rendering beats polling in feel; the cost is connection management and ordering guarantees, taken on deliberately for an inherently real-time feature.",
        ],
      },
      {
        marker: "08 · Implementation",
        title: "Implementation",
        body: [
          "A Next.js storefront over an Express API backed by PostgreSQL. Checkout is a state machine persisted server-side; payment events flow through Paystack webhooks; Socket.IO fans out order updates to vendor and customer clients.",
        ],
      },
      {
        marker: "09 · Outcome",
        title: "Outcome",
        body: [
          "The marketplace MVP is live for the client. I'm deliberately not putting numbers here — usage and revenue are the client's to report, and I'd rather under-claim than invent.",
        ],
      },
      {
        marker: "10 · Lessons",
        title: "Lessons",
        body: [
          "When money is involved, the server is the source of truth, and idempotency is cheaper than reconciliation.",
          "'Location-aware' is a product promise that has to be earned in the copy as much as the code.",
        ],
      },
    ],
  },
  {
    slug: "alafia",
    title: "Alafia",
    summary:
      "An AI-powered emergency-care coordination platform that turns voice or text symptoms into explainable, deterministic triage and capability-based facility recommendations.",
    role: "Backend Engineer / Full-Stack Developer",
    tags: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Python", "Whisper", "AI integrations"],
    image: {
      src: "/projects/alafia.png",
      alt: "Alafia — emergency-care coordination interface",
      aspect: "16-9",
    },
    chapters: [
      {
        marker: "01 · Problem",
        title: "The problem",
        body: [
          "In an emergency, the first minutes decide a lot. Alafia helps people and responders act on symptoms fast — but medical-adjacent input means the system cannot bluff. A triage answer that can't explain itself is worse than no answer.",
        ],
      },
      {
        marker: "02 · Context",
        title: "Context",
        body: [
          "An AI-powered coordination platform: symptoms arrive as voice or text, get structured, and become triage guidance plus facility recommendations.",
          "One line held from day one: this is coordination and triage support, not a diagnosis — and nothing in the product gets presented as one.",
        ],
      },
      {
        marker: "03 · My role",
        title: "My role",
        body: [
          "Backend Engineer / Full-Stack Developer — the API, the triage pipeline, and the integration with speech-to-text.",
        ],
      },
      {
        marker: "04 · Constraints",
        title: "Constraints",
        body: [
          "Nothing gets a medical verdict. Scope stays on triage and coordination — no blood-work or payment integrations — and every AI decision is explainable rather than a black box.",
        ],
      },
      {
        marker: "05 · Thinking",
        title: "Thinking",
        body: [
          "AI should structure the problem, not decide it: symptoms in, structured facts out, then deterministic rules and a capability score the user can read and question.",
        ],
      },
      {
        marker: "06 · Technical decisions",
        title: "Technical decisions",
        body: [
          "Speech-to-text in a Python microservice built on faster-whisper, so voice input is transcribed close to the model instead of being routed through the web stack.",
          "Deterministic triage with capability-based facility matching — a weighted 60/40 score in which what a facility can actually handle is the dominant factor.",
          "A Node/Express REST API with Sequelize over PostgreSQL holding patients, cases, facilities, and triage history, so the deterministic rules stay inspectable.",
        ],
      },
      {
        marker: "07 · Trade-offs",
        title: "Trade-offs",
        body: [
          "We accepted a less 'magical' product than raw open-ended AI would feel, in exchange for rules that can be audited and defended — the right trade when a false assurance has real stakes.",
          "Maintaining a Python service alongside the Node stack costs an extra runtime; it keeps speech-to-text close to the model.",
        ],
      },
      {
        marker: "08 · Implementation",
        title: "Implementation",
        body: [
          "Voice or text symptoms enter the API; the Python microservice transcribes audio; triage rules structure the result; and the matching score surfaces ranked facilities with the reasoning visible.",
        ],
      },
      {
        marker: "09 · Outcome",
        title: "Outcome",
        body: [
          "Alafia shipped as the platform behind this architecture. I won't dress this up with patient or response numbers — if real deployment figures exist, someone cleared to report them should own that narrative.",
        ],
      },
      {
        marker: "10 · Lessons",
        title: "Lessons",
        body: [
          "In high-stakes domains the boundary is the feature: deciding where the system stops ('coordination here, diagnosis never') is what makes the rest defencible.",
          "Deterministic, explainable rules beat magical ones when a false answer has a cost.",
        ],
      },
    ],
  },
  {
    slug: "lumora",
    title: "Lumora",
    summary:
      "A team project built at the GESP Hackathon at YABATECH, placed 2nd, and recognised by UNICEF representatives during their visit.",
    role: "GESP Hackathon · Team project",
    tags: [],
    image: {
      src: "/projects/lumora.png",
      alt: "Lumora — hackathon project interface",
      aspect: "16-9",
    },
    chapters: [
      {
        marker: "01 · The project",
        title: "The project",
        body: [
          "Lumora is a team project built at the GESP Hackathon at YABATECH.",
          "This case study is deliberately thin: the build details — what was built, the stack, and each member's contribution — are pending owner input, and nothing has been invented to fill that gap.",
        ],
      },
      {
        marker: "02 · Result",
        title: "Result",
        body: [
          "The project placed 2nd at the GESP Hackathon and was recognised by UNICEF representatives during their visit to GESP YABATECH.",
        ],
        metrics: [
          { label: "Placement", value: "2nd", note: "GESP Hackathon at YABATECH" },
          { label: "Recognition", value: "UNICEF", note: "During their visit to GESP YABATECH" },
        ],
      },
    ],
  },
  {
    slug: "myguestly-ai",
    title: "MyGuestly AI",
    summary:
      "An event-management SaaS with TOTP dynamic QR gate verification, secure media-upload signing, and real-time guest media and memories.",
    role: "Lead Backend & API Architect",
    tags: ["Node.js", "Prisma", "PostgreSQL", "JWT", "TOTP", "Cloudinary", "REST APIs"],
    chapters: [
      {
        marker: "01 · Problem",
        title: "The problem",
        body: [
          "Events need to feel exclusive without chaos at the gate. The product problem: organisers manage guests, ticketing, and media, while attendees check in fast and securely — and walk away with the memories from the evening.",
        ],
      },
      {
        marker: "02 · Context",
        title: "Context",
        body: [
          "An event-management SaaS. As Lead Backend & API Architect I owned the API surface and the security-sensitive paths — gate verification and media uploads.",
        ],
      },
      {
        marker: "03 · My role",
        title: "My role",
        body: [
          "Lead Backend & API Architect — the API, the auth and verification flows, and the upload pipeline.",
        ],
      },
      {
        marker: "04 · Constraints",
        title: "Constraints",
        body: [
          "Gate security has to be real without friction: verification must invalidate if a pass is replayed or shared, and uploaded media must never fight the signed-upload flow.",
          "And no load numbers here — if a benchmark exists that can be traced, it belongs in the owner's story, not mine.",
        ],
      },
      {
        marker: "05 · Thinking",
        title: "Thinking",
        body: [
          "Treat the guest pass like a capability, not a URL: verifiable, revocable, and single-use at the moment of entry. Treat media uploads as untrusted input from an authenticated guest — never a free write to storage.",
        ],
      },
      {
        marker: "06 · Technical decisions",
        title: "Technical decisions",
        body: [
          "TOTP dynamic QR gate verification — entry codes are short-lived and time-based, so replayed screenshots and stale badges don't work.",
          "Cloudinary signed uploads — the client never touches storage credentials; the backend signs every upload so guests post directly to storage under an authenticated, expiring signature.",
          "Token rotation for API sessions — short-lived auth tokens with refresh rotation rather than long-lived credentials.",
        ],
      },
      {
        marker: "07 · Trade-offs",
        title: "Trade-offs",
        body: [
          "Short-lived TOTP windows trade a little convenience at the door for the guarantee that a leaked snapshot of a screen is useless by the time it's shared.",
          "Signing every upload adds a request hop; it removes a whole class of credential-exposure bugs.",
        ],
      },
      {
        marker: "08 · Implementation",
        title: "Implementation",
        body: [
          "Prisma and PostgreSQL hold guest, event, and media state; JWT-based auth rotates refresh tokens; a TOTP-verified flow gates entry; and the signed-upload path to Cloudinary drives the real-time guest-media experience.",
        ],
      },
      {
        marker: "09 · Outcome",
        title: "Outcome",
        body: [
          "The verification, auth, and upload paths shipped as described. Where the product stands today is for the owner to narrate — I never publish usage claims I can't trace.",
        ],
      },
      {
        marker: "10 · Lessons",
        title: "Lessons",
        body: [
          "The most valuable security work isn't exotic: it's deciding the trust boundary — what the client can touch, what only the server touches — and making the boring parts (short-lived keys, signed writes, rotation) non-negotiable.",
          "Architecture work is mostly about making hard guarantees feel boring to the user.",
        ],
      },
    ],
  },
];

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
