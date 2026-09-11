import assert from "node:assert/strict";
import { test } from "node:test";
import { BrevoDelivery } from "../src/contact/brevo.ts";
import type { ContactMessage } from "../src/contact/delivery.ts";

const message: ContactMessage = {
  context: "role",
  name: "Amina Lawal",
  email: "amina@example.com",
  message: "Hello, I would like to discuss a backend role with you.",
};

function stubFetch(options: {
  status: number;
  onRequest?: (url: string, init: RequestInit) => void;
  responses?: Response[];
}) {
  let calls = 0;
  return async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
    calls += 1;
    if (options.onRequest) options.onRequest(String(url), init as RequestInit);
    if (options.responses)
      return options.responses[Math.min(calls - 1, options.responses.length - 1)];
    return new Response("{}", { status: options.status });
  };
}

const validEnv = {
  apiKey: "xkeysib-test-secret",
  fromEmail: "hello@example.com",
  fromName: "Racheal Portfolio",
  toEmail: "destinifeoluwa@gmail.com",
};

test("send() posts the correct Brevo transactional payload", async () => {
  let captured: { url: string; init: RequestInit } | undefined;
  const fetchImpl = stubFetch({
    status: 200,
    onRequest: (url, init) => {
      captured = { url, init };
    },
  });
  const delivery = new BrevoDelivery({ ...validEnv, fetchImpl });

  const result = await delivery.send(message);
  assert.deepEqual(result, { ok: true });
  assert.ok(captured);
  assert.equal(captured.url, "https://api.brevo.com/v3/smtp/email");

  const headers = captured.init.headers as Record<string, string>;
  assert.equal(headers["api-key"], "xkeysib-test-secret");
  assert.equal(headers["content-type"], "application/json");

  const body = JSON.parse(captured.init.body as string) as {
    sender: { email: string; name: string };
    to: Array<{ email: string }>;
    replyTo: { email: string };
    subject: string;
    htmlContent: string;
    textContent: string;
  };
  assert.deepEqual(body.sender, { email: "hello@example.com", name: "Racheal Portfolio" });
  assert.deepEqual(body["to"], [{ email: "destinifeoluwa@gmail.com" }]);
  // Reply-To is the visitor so Racheal can reply naturally.
  assert.deepEqual(body.replyTo, { email: "amina@example.com" });
  assert.ok(body.subject.includes("I have a role"));
  assert.ok(body.textContent.includes("Hello, I would like to discuss a backend role with you."));
});

test("send() escapes untrusted input in the HTML email", async () => {
  let html: string | undefined;
  const fetchImpl = stubFetch({
    status: 200,
    onRequest: (_url, init) => {
      html = (JSON.parse(init.body as string) as { htmlContent: string }).htmlContent;
    },
  });
  const delivery = new BrevoDelivery({ ...validEnv, fetchImpl });

  await delivery.send({
    ...message,
    name: "<script>alert('x')</script> & friends",
    message: "line one\n<script>x</script>",
  });

  assert.ok(html);
  assert.ok(!html.includes("<script>"), "script tag is escaped");
  assert.ok(html.includes("&lt;script&gt;"), "script tag appears escaped");
  assert.ok(html.includes("<br />"), "newlines are preserved as breaks");
});

test("send() maps a provider error to a safe failure without leaking internals", async () => {
  const statuses: number[] = [];
  const delivery = new BrevoDelivery({
    ...validEnv,
    fetchImpl: stubFetch({ status: 500 }),
    onProviderStatus: (status) => statuses.push(status),
  });

  const result = await delivery.send(message);
  assert.deepEqual(result, { ok: false, kind: "provider" });
  assert.deepEqual(statuses, [500]);
});

test("send() fails closed (no network call) when required config is missing", async () => {
  const delivery = new BrevoDelivery({
    apiKey: undefined,
    fromEmail: "hello@example.com",
    fromName: undefined,
    toEmail: "destinifeoluwa@gmail.com",
    // If the adapter tried to reach the network, the test would fail loudly.
    fetchImpl: async () => {
      throw new Error("network must not be hit when config is missing");
    },
  });

  const result = await delivery.send(message);
  assert.deepEqual(result, { ok: false, kind: "config" });
});

test("send() does not expose the API key in the request body", async () => {
  let bodyText = "";
  const fetchImpl = stubFetch({
    status: 200,
    onRequest: (_url, init) => {
      bodyText = init.body as string;
    },
  });
  const delivery = new BrevoDelivery({ ...validEnv, fetchImpl });

  await delivery.send(message);
  assert.ok(!bodyText.includes("xkeysib-test-secret"), "api key never appears in the payload");
});
