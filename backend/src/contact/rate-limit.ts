// In-memory sliding-window rate limiter for the contact endpoint (ADR-002).
// Keyed per client (IP), bounded in memory, with a periodic cleanup sweep so the
// process never grows without bound. Single-node only — intentionally not
// distributed (no external service in v1; the portfolio does not need it).

export interface RateLimitOutcome {
  allowed: boolean;
  retryAfterSeconds: number;
}

// Documented baseline ceilings, tuned at implementation (config decision
// recorded in docs/environment.md — no env vars in v1). 10/min is generous for
// a human visitor while still throttling bots; local dev also shares the
// loopback IP with any smoke-test POSTs, so a 3-cap chokes real retries.
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_HITS = 10;
export const RATE_LIMIT_MAX_KEYS = 10_000;

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();
  private readonly cleanupTimer: ReturnType<typeof setInterval> | undefined;
  private readonly windowMs: number;
  private readonly maxHits: number;
  private readonly now: () => number;

  constructor(
    windowMs = RATE_LIMIT_WINDOW_MS,
    maxHits = RATE_LIMIT_MAX_HITS,
    now: () => number = Date.now,
  ) {
    this.windowMs = windowMs;
    this.maxHits = maxHits;
    this.now = now;
    // Sweep stale entries on an interval so the map cannot grow forever.
    // `unref()` keeps the timer from holding the process open in tests/tools.
    const timer = setInterval(() => this.sweep(), Math.max(windowMs, 60_000));
    timer.unref?.();
    this.cleanupTimer = timer;
  }

  check(key: string): RateLimitOutcome {
    const t = this.now();
    const current = (this.hits.get(key) ?? []).filter((timestamp) => timestamp > t - this.windowMs);

    if (current.length >= this.maxHits) {
      const oldest = current[0];
      if (oldest !== undefined) {
        this.hits.set(key, current);
        const retryAfterSeconds = Math.max(1, Math.ceil((oldest + this.windowMs - t) / 1000));
        return { allowed: false, retryAfterSeconds };
      }
    }

    current.push(t);
    this.hits.set(key, current);
    this.boundMemory();
    return { allowed: true, retryAfterSeconds: 0 };
  }

  private sweep(): void {
    const t = this.now();
    for (const [key, entries] of this.hits) {
      const live = entries.filter((timestamp) => timestamp > t - this.windowMs);
      if (live.length === 0) this.hits.delete(key);
      else this.hits.set(key, live);
    }
  }

  private boundMemory(): void {
    if (this.hits.size <= RATE_LIMIT_MAX_KEYS) return;
    this.sweep();
    // Map preserves insertion order — drop the oldest keys first.
    let excess = this.hits.size - RATE_LIMIT_MAX_KEYS;
    for (const key of this.hits.keys()) {
      if (excess <= 0) break;
      this.hits.delete(key);
      excess -= 1;
    }
  }
}
