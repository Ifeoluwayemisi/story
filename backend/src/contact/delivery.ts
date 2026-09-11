// Contact delivery abstraction (docs/decisions.md ADR-004).
// The contact endpoint depends on this interface, never on a provider. Any
// provider (Brevo today, a different one later) implements `send` and the rest
// of the backend is unchanged.

export type ContactContext = "role" | "build";

export interface ContactMessage {
  context: ContactContext;
  name: string;
  email: string;
  message: string;
}

// Stable, human labels for the two approved in-form paths (docs/ux.md §7,
// docs/requirements.md F3). Reused for email subject lines and the contact page.
export const contextLabels: Record<ContactContext, string> = {
  role: "I have a role",
  build: "Let's build together",
};

export type DeliveryResult = { ok: true } | { ok: false; kind: "config" | "provider" };

export interface ContactDelivery {
  readonly name: string;
  /** Delivers a validated contact message. Never throws: failures are an
   *  explicit `{ ok: false }` result. `kind: "config"` means required
   *  environment variables are missing (fails closed). */
  send(message: ContactMessage): Promise<DeliveryResult>;
}
