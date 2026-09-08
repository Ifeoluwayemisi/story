// Writing content — structured source of truth (docs/content-model.md,
// docs/ux.md §6). Only genuinely useful entries are listed; the index prefers
// sparse and excellent over filler. Internal posts get a `body`; published
// elsewhere get an `externalUrl`.

export interface WritingEntry {
  slug: string;
  title: string;
  type: "article" | "retrospective" | "lesson" | "experiment";
  excerpt: string;
  date?: string;
  tags: string[];
  body?: string[];
  externalUrl?: string;
}

export const writingEntries: WritingEntry[] = [
  {
    slug: "starting-my-data-science-journey-with-dataraflow",
    title: "What I Learned Starting My Data Science Journey with DataFlow",
    type: "article",
    excerpt:
      "A genuine article from the beginning of my data science journey with DataFlow — shared originally on Medium.",
    tags: ["Data Science", "DataFlow"],
    externalUrl:
      "https://medium.com/@destinifeoluwa/what-i-learned-starting-my-data-science-journey-with-dataraflow-5e7d9497a0fc?sharedUserId=destinifeoluwa",
  },
];

export const writingHighlight = writingEntries[0] as WritingEntry | undefined;

export function getWritingPost(slug: string): WritingEntry | undefined {
  return writingEntries.find((entry) => entry.slug === slug && entry.body);
}
