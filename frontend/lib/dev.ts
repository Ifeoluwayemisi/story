// Development-only placeholder gating. Any UI gated by this must never reach
// production (it is a no-op when NODE_ENV === "production" at build time).
export const isDevPlaceholderEnabled = process.env.NODE_ENV !== "production";
