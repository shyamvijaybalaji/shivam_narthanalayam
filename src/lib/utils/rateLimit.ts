interface Entry { count: number; resetAt: number }

const store = new Map<string, Entry>();

// Prune expired entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [k, e] of store) if (now >= e.resetAt) store.delete(k);
}, 60_000);

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}
