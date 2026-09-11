"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Field } from "@/components/form/field";
import { Input } from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { Button } from "@/components/primitives/button";
import { InlineLink } from "@/components/primitives/link";
import { Alert } from "@/components/ui/alert";
import { contact } from "@/lib/home-content";
import { cn } from "@/lib/cn";

type ContactContext = "role" | "build";
type SubmitStatus = "idle" | "submitting" | "success" | "error" | "rateLimited";
type FieldName = "context" | "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const contextOptions: Array<{ value: ContactContext; label: string; description: string }> = [
  {
    value: "role",
    label: "I have a role",
    description: "Recruiters, hiring managers, internships, employment, collaborations.",
  },
  {
    value: "build",
    label: "Let's build together",
    description: "Clients, founders, businesses, product collaborations, development work.",
  },
];

interface FieldValue {
  context: ContactContext | "";
  name: string;
  email: string;
  message: string;
}

const emptyValues: FieldValue = { context: "", name: "", email: "", message: "" };

function messageTooShortHint(): string {
  return "Your message is a little short — tell me a bit more.";
}

function validate(values: FieldValue): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.context) {
    errors.context = "Choose a path to continue.";
  }

  const name = values.name.trim();
  if (!name) errors.name = "Please add your name.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  const email = values.email.trim();
  if (!email) errors.email = "Please add your email so I can reply.";
  else if (email.length > 254) errors.email = "That email address is too long.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "That email doesn't look right.";

  const message = values.message.trim();
  if (!message) errors.message = "Please write a short message.";
  else if (message.length < 10) errors.message = messageTooShortHint();
  else if (message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";

  return errors;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL?.replace(/\/+$/, "");
const endpoint = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "";

type ServerErrorCode = "required" | "invalid" | "too_long" | "too_short";

// The server is authoritative: if it rejects fields, map its codes to the same
// friendly copy the client used, without trusting the server's raw wording.
function serverFieldMessage(field: FieldName, code: ServerErrorCode | string): string {
  switch (code) {
    case "required":
      if (field === "context") return "Choose a path to continue.";
      if (field === "email") return "Please add your email so I can reply.";
      if (field === "message") return "Please write a short message.";
      return "Please add your name.";
    case "invalid":
      return "That email doesn't look right.";
    case "too_long":
      if (field === "message") return "Message must be 2000 characters or fewer.";
      if (field === "name") return "Name must be 100 characters or fewer.";
      return "That email address is too long.";
    case "too_short":
      return messageTooShortHint();
    default:
      return "Please check this field.";
  }
}

export function ContactForm() {
  const [values, setValues] = useState<FieldValue>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number | undefined>(undefined);
  const [honeypot, setHoneypot] = useState("");
  const submittingRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    else if (Object.keys(fieldErrors).length > 0) summaryRef.current?.focus();
  }, [status, fieldErrors]);

  function updateField<K extends keyof FieldValue>(field: K, value: FieldValue[K]): void {
    setValues((current) => ({ ...current, [field]: value }));
  }

  const contextError = fieldErrors.context;
  const ids = {
    name: "contact-name",
    email: "contact-email",
    message: "contact-message",
    contextError: "contact-context-error",
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (submittingRef.current || status === "submitting") return;

    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          context: values.context,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: honeypot,
        }),
      });

      if (response.ok) {
        setValues((current) => ({ ...current, name: "", email: "", message: "" }));
        setFieldErrors({});
        setStatus("success");
        return;
      }

      let body: {
        error?: string;
        fields?: Partial<Record<FieldName, ServerErrorCode | string>>;
        retryAfterSeconds?: number;
      } = {};
      try {
        body = (await response.json()) as typeof body;
      } catch {
        body = {};
      }

      if (response.status === 400 && body.error === "validation") {
        const serverErrors: FieldErrors = {};
        for (const [field, code] of Object.entries(body.fields ?? {})) {
          if (code) {
            serverErrors[field as FieldName] = serverFieldMessage(field as FieldName, code);
          }
        }
        setFieldErrors(serverErrors);
        setStatus("idle");
        return;
      }

      if (response.status === 429) {
        setRetryAfterSeconds(body.retryAfterSeconds);
        setStatus("rateLimited");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <fieldset
        aria-describedby={contextError ? ids.contextError : undefined}
        className="space-y-3"
      >
        <legend className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
          What&apos;s this about?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {contextOptions.map((option) => {
            const selected = values.context === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-md border bg-paper p-5 transition-colors duration-fast ease-brand",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus-ring has-[:focus-visible]:border-link",
                  selected
                    ? "border-interactive bg-surface"
                    : "border-border-strong hover:bg-surface",
                )}
              >
                <input
                  type="radio"
                  name="context"
                  value={option.value}
                  checked={selected}
                  onChange={() => updateField("context", option.value)}
                  className="sr-only"
                />
                <span className="font-display text-h4 font-medium text-ink">{option.label}</span>
                <span className="mt-1 block text-sm text-ink-muted">{option.description}</span>
              </label>
            );
          })}
        </div>
        {contextError ? (
          <p id={ids.contextError} className="text-sm text-error">
            {contextError}
          </p>
        ) : null}
      </fieldset>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        className={cn(
          "rounded-md border border-error p-4",
          Object.keys(fieldErrors).length === 0 && "hidden",
        )}
      >
        <p className="font-medium text-ink">A few details need attention:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-error">
          {Object.values(fieldErrors).map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <Field id={ids.name} label="Name" required error={fieldErrors.name}>
          <Input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder="Your name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field id={ids.email} label="Email" required error={fieldErrors.email}>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </Field>

        <Field id={ids.message} label="Message" required error={fieldErrors.message}>
          <Textarea
            name="message"
            autoComplete="off"
            maxLength={2000}
            placeholder="What would you like to talk about?"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
        </Field>
      </div>

      {/* Honeypot — visually hidden and aria-hidden (docs/ux.md §7). Real users
          never see it; automated submissions fill it and are short-circuited. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div>
        <Button type="submit" variant="primary" loading={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
          No attachments · replies go to the email you enter
        </p>
      </div>

      {status === "submitting" ? (
        <p role="status" aria-live="polite" className="text-body text-ink-muted">
          Sending your message…
        </p>
      ) : null}

      {status === "success" ? (
        <div ref={successRef} tabIndex={-1}>
          <Alert variant="success" role="status">
            Message sent — your note goes straight to Racheal. She typically replies within 1–2
            business days.
          </Alert>
        </div>
      ) : null}

      {status !== "success" && status !== "submitting" ? (
        <div role="status" aria-live="polite" className="space-y-4">
          {status === "error" ? (
            <Alert variant="error" role="alert">
              Couldn&apos;t send. Check your connection and try again, or reach me directly.
            </Alert>
          ) : null}

          {status === "rateLimited" ? (
            <Alert variant="warning">
              You&apos;ve sent a few messages in a short window. Please wait{" "}
              {retryAfterSeconds ? `about ${retryAfterSeconds} seconds` : "a moment"} and try again
              — or reach me directly.
            </Alert>
          ) : null}

          {status === "idle" ? (
            <p className="text-body text-ink-muted">
              Or reach me directly —{" "}
              <InlineLink href={`mailto:${contact.email}`}>{contact.email}</InlineLink> or{" "}
              <WhatsAppLink className="inline-flex" variant="link" />
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
