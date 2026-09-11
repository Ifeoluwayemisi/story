// Server-side validation of the contact payload (docs/ux.md §7, ADR-002).
// The server is authoritative: every field the frontend sends is re-validated
// here with its own rules, lengths, formats, and allowed values.

import type { ContactContext, ContactMessage } from "./delivery.ts";

export const CONTEXT_VALUES: ContactContext[] = ["role", "build"];

export const limits = {
  nameMax: 100,
  emailMax: 254,
  messageMax: 2000,
  messageMin: 10,
} as const;

// Honeypot field (docs/ux.md §7 Abuse protection): a real-named input that real
// visitors never see. If a client submits a value here it is an automated bot.
export const HONEYPOT_FIELD = "website";

export type FieldErrorCode = "required" | "invalid" | "too_long" | "too_short" | "not_supported";

export type ValidationFields = Partial<
  Record<"context" | "name" | "email" | "message", FieldErrorCode>
>;

export type ValidationResult =
  { ok: true; data: ContactMessage } | { ok: false; errors: ValidationFields };

function isString(value: unknown): value is string {
  return typeof value === "string";
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, errors: { message: "invalid" } };
  }

  const record = input as Record<string, unknown>;
  const errors: ValidationFields = {};

  const context = record["context"];
  const name = record["name"];
  const email = record["email"];
  const message = record["message"];

  if (!isString(context) || !(CONTEXT_VALUES as readonly string[]).includes(context)) {
    errors.context = "required";
  }

  if (!isString(name)) {
    errors.name = "required";
  } else {
    const trimmed = name.trim();
    if (trimmed.length === 0) errors.name = "required";
    else if (trimmed.length > limits.nameMax) errors.name = "too_long";
  }

  if (!isString(email)) {
    errors.email = "required";
  } else {
    const trimmed = email.trim();
    if (trimmed.length === 0) errors.email = "required";
    else if (trimmed.length > limits.emailMax) errors.email = "too_long";
    else if (!emailPattern.test(trimmed)) errors.email = "invalid";
  }

  if (!isString(message)) {
    errors.message = "required";
  } else {
    const trimmed = message.trim();
    if (trimmed.length === 0) errors.message = "required";
    else if (trimmed.length < limits.messageMin) errors.message = "too_short";
    else if (trimmed.length > limits.messageMax) errors.message = "too_long";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      context: context as ContactContext,
      name: (name as string).trim(),
      email: (email as string).trim(),
      message: (message as string).trim(),
    },
  };
}

/** True when the honeypot field was filled — automated submission. */
export function isHoneypotFilled(input: unknown): boolean {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return false;
  }
  const value = (input as Record<string, unknown>)[HONEYPOT_FIELD];
  return isString(value) && value.trim().length > 0;
}
