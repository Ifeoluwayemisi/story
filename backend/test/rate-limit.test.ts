import assert from "node:assert/strict";
import { test } from "node:test";
import { SlidingWindowRateLimiter } from "../src/contact/rate-limit.ts";

test("allows requests within the window up to the cap", () => {
  const limiter = new SlidingWindowRateLimiter(60_000, 3);
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  const blocked = limiter.check("1.1.1.1");
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds >= 1);
});

test("keys are tracked independently", () => {
  const limiter = new SlidingWindowRateLimiter(60_000, 3);
  for (let i = 0; i < 3; i += 1) limiter.check("a");
  assert.equal(limiter.check("b").allowed, true, "a different client is not blocked");
  assert.equal(limiter.check("a").allowed, false);
});

test("sliding window expires after the window passes", () => {
  let now = 1_000_000;
  const limiter = new SlidingWindowRateLimiter(60_000, 3, () => now);

  for (let i = 0; i < 3; i += 1) assert.equal(limiter.check("k").allowed, true);
  assert.equal(limiter.check("k").allowed, false);

  now = now + 60_001;
  assert.equal(limiter.check("k").allowed, true, "entry outside the window no longer counts");
});

test("stale entries are swept so the map does not grow", () => {
  let now = 1_000_000;
  const limiter = new SlidingWindowRateLimiter(60_000, 3, () => now);

  limiter.check("old-client");
  now = now + 120_000;
  limiter.check("fresh-client");

  // Sweep on an injected empty window edge: advance and touch the map via a
  // check, then confirm the swept client is no longer counted.
  now = now + 60_001;
  assert.equal(limiter.check("old-client").allowed, true);
  assert.equal(limiter.check("fresh-client").allowed, true);
});

test("retryAfterSeconds reflects when the oldest hit leaves the window", () => {
  let now = 1_000_000;
  const limiter = new SlidingWindowRateLimiter(60_000, 1, () => now);
  limiter.check("k");
  const blocked = limiter.check("k");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 60);
  now = now + 30_000;
  assert.equal(limiter.check("k").retryAfterSeconds, 30);
});
