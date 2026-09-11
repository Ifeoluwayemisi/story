import type { Metadata } from "next";
import { ButtonLink } from "@/components/primitives/button-link";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { InlineLink } from "@/components/primitives/link";
import { contact } from "@/lib/home-content";
import { replyTimeline } from "@/lib/contact-config";

export const metadata: Metadata = {
  title: "Contact — Racheal",
  description:
    "Start a conversation — open to roles and to building together. Message directly or chat on WhatsApp.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <p className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">Contact</p>
      <h1 className="mt-6 max-w-[20ch] font-display text-display-lg font-medium tracking-tight text-ink">
        Say hello — and let&apos;s talk about what&apos;s next.
      </h1>
      <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
        Whether you have a role in mind or a product to build, pick the path that fits and I&apos;ll
        come back to you.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
        <div className="max-w-[44rem] rounded-md border border-border bg-paper p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-md border border-border bg-surface p-6">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
              What happens next
            </h2>
            <p className="mt-3 text-body text-ink">{replyTimeline}</p>
          </div>

          <div className="rounded-md border border-border bg-paper p-6">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
              Prefer a direct chat?
            </h2>
            <p className="mt-3 text-body text-ink-muted">
              Chat on WhatsApp for a quick conversation — or email me directly at{" "}
              <InlineLink href={`mailto:${contact.email}`}>{contact.email}</InlineLink>.
            </p>
            <WhatsAppLink variant="button" className="mt-5" />
          </div>

          <div className="rounded-md border border-border bg-paper p-6">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
              Resume
            </h2>
            <p className="mt-3 text-body text-ink-muted">
              A print-ready one-pager with the same claims, evidence, and availability you see here.
            </p>
            <ButtonLink href="/resume" variant="secondary" className="mt-5">
              View or download
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
