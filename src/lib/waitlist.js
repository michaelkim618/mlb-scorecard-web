// No import of the Supabase client here: the caller passes it in. That keeps this
// module free of `import.meta.env`, so node:test can run it against the mock.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email.trim());
}

/** Where a signup came from, so a month of posting can be judged by signups
 *  per channel instead of by likes. utm_source wins; otherwise the referring
 *  host; otherwise "direct". Always short enough for the column's check. */
export function readSource(search = "", referrer = "") {
  const params = new URLSearchParams(search);
  const clip = (s) => (s ? s.slice(0, 100) : null);
  let source = params.get("utm_source") || params.get("ref");
  if (!source && referrer) {
    try { source = new URL(referrer).hostname.replace(/^www\./, ""); } catch { /* ignore */ }
  }
  return { source: clip(source) || "direct", campaign: clip(params.get("utm_campaign")) };
}

/** Insert one row. A duplicate address is a success from the visitor's point of
 *  view — they are on the list — so it comes back as { ok: true, already: true }
 *  rather than as an error (the table has a unique index on lower(email)). */
export async function joinWaitlist(client, email, { source = "direct", campaign = null } = {}) {
  const clean = String(email).trim();
  if (!isValidEmail(clean)) return { ok: false, error: "invalid" };
  const { error } = await client.from("waitlist").insert({ email: clean, source, campaign });
  if (!error) return { ok: true, already: false };
  if (error.code === "23505") return { ok: true, already: true };
  return { ok: false, error: error.message || "failed" };
}
