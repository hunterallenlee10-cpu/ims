// Simple fixed-window rate limit, in memory. Each server instance keeps its own counts,
// which is enough to stop double submits and casual abuse of the checkout route.

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  if (windows.size > 5000) {
    for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
  }
  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (w.count >= limit) return { ok: false, retryAfter: Math.ceil((w.resetAt - now) / 1000) };
  w.count += 1;
  return { ok: true };
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
