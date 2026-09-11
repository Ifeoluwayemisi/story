// Brevo implementation of the ContactDelivery interface (ADR-004).
// Uses Brevo's transactional email API via global fetch — no SDK dependency.
// The API key and sender/recipient config come from the server environment only,
// never from the frontend. All failures are mapped to explicit, safe results.

import {
  contextLabels,
  type ContactDelivery,
  type ContactMessage,
  type DeliveryResult,
} from "./delivery.ts";

export interface BrevoDeliveryOptions {
  apiKey: string | undefined;
  fromEmail: string | undefined;
  fromName: string | undefined;
  toEmail: string | undefined;
  /** Injectable fetch for tests; defaults to the platform fetch. */
  fetchImpl?: typeof fetch;
  /** Optional hook to observe provider status without leaking it outward. */
  onProviderStatus?: (status: number) => void;
}

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

export class BrevoDelivery implements ContactDelivery {
  readonly name = "brevo";

  readonly options: BrevoDeliveryOptions;

  constructor(options: BrevoDeliveryOptions) {
    this.options = options;
  }

  async send(message: ContactMessage): Promise<DeliveryResult> {
    const { apiKey, fromEmail, fromName, toEmail } = this.options;
    // Fail closed: if required configuration is missing, no send is attempted
    // and the caller reports a non-deliverable result (no email is faked).
    if (!apiKey || !fromEmail || !toEmail) {
      return { ok: false, kind: "config" };
    }

    const payload = buildEmailPayload({ message, fromEmail, fromName, toEmail });

    const fetchImpl = this.options.fetchImpl ?? fetch;
    let response: Response;
    try {
      response = await fetchImpl(BREVO_SEND_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Network/provider failure — mapped, never leaked.
      return { ok: false, kind: "provider" };
    }

    this.options.onProviderStatus?.(response.status);

    if (!response.ok) {
      return { ok: false, kind: "provider" };
    }
    return { ok: true };
  }
}

interface BuildEmailInput {
  message: ContactMessage;
  fromEmail: string;
  fromName: string | undefined;
  toEmail: string;
}

interface BrevoEmailPayload {
  sender: { email: string; name: string };
  to: Array<{ email: string }>;
  replyTo: { email: string };
  subject: string;
  textContent: string;
  htmlContent: string;
}

const DEFAULT_FROM_NAME = "Racheal Portfolio";

// HTML-escape untrusted input before it ever reaches email markup.
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailPayload({
  message,
  fromEmail,
  fromName,
  toEmail,
}: BuildEmailInput): BrevoEmailPayload {
  const pathLabel = contextLabels[message.context];
  const name = escapeHtml(message.name);
  const email = escapeHtml(message.email);
  const path = escapeHtml(pathLabel);
  // Message body: escaped with newlines preserved as <br>, wrapped in a
  // paragraph — never injected as a raw HTML fragment.
  const bodyHtml = escapeHtml(message.message).replaceAll("\n", "<br />");
  const bodyText = message.message;

  return {
    sender: { email: fromEmail, name: fromName || DEFAULT_FROM_NAME },
    to: [{ email: toEmail }],
    // Reply-To is the visitor's (validated) email so Racheal can reply
    // naturally; the authenticated sender remains the verified Brevo sender.
    replyTo: { email: message.email },
    subject: `Portfolio message — ${pathLabel}`,
    textContent: [
      `Path: ${pathLabel}`,
      `From: ${message.name} <${message.email}>`,
      "",
      bodyText,
    ].join("\n"),
    htmlContent: [
      `<p><strong>${name}</strong> &lt;${email}&gt;</p>`,
      `<p><em>Path: ${path}</em></p>`,
      `<p>${bodyHtml}</p>`,
    ].join(""),
  };
}
