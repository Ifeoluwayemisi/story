import { Button } from "@/components/primitives/button";
import { InlineLink } from "@/components/primitives/link";
import { Tag } from "@/components/primitives/tag";
import { isDevPlaceholderEnabled } from "@/lib/dev";

export default function HomePage() {
  if (!isDevPlaceholderEnabled) {
    // Dev-only stub — homepage content is gated by real content from Phase 0.
    return null;
  }

  return (
    <section className="container-page">
      <div className="py-24 md:py-32">
        {/* DEV stub — demonstrates the type scale and primitives; never ships. */}
        <p className="font-mono text-label uppercase text-ink-faint">
          [DEV STUB · homepage content follows in Phase 5]
        </p>
        <h1 className="mt-6 max-w-[20ch] font-display text-display-xl font-medium text-ink">
          Racheal
        </h1>
        <p className="mt-4 max-w-[70ch] font-display text-display-lg text-ink-muted">
          Product-minded full-stack software engineer.
        </p>
        <p className="mt-8 max-w-[70ch] text-body-lg text-ink-muted">
          I build thoughtful, well-architected software, and I own outcomes end-to-end.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button>View my work</Button>
          <Button variant="secondary">Contact me</Button>
          <Button variant="danger" disabled>
            Disabled demo
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Tag>TypeScript</Tag>
          <Tag>Next.js</Tag>
          <Tag>Node.js</Tag>
        </div>
        <p className="mt-10 text-body text-ink-muted">
          An <InlineLink href="https://nextjs.org/docs">inline link</InlineLink> demonstrates the
          inline-link primitive.
        </p>
      </div>
    </section>
  );
}
