import { useState } from "react";
import { track } from "@vercel/analytics";
import { supabase } from "../lib/supabase";
import { joinWaitlist, readSource } from "../lib/waitlist";

const MESSAGES = {
  done: "You're on the list. We'll email you before the 2027 season opens.",
  already: "You're already on the list — nothing more to do.",
  invalid: "That doesn't look like an email address.",
  error: "Something went wrong saving that. Please try again in a minute.",
};

/** Email capture. `dark` is for the landing hero. The hidden `company` field is
 *  a honeypot: real visitors never see it, form-filling bots fill it, and a
 *  filled one is told it worked without anything being stored. */
export default function WaitlistForm({ dark = false, id }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | already | invalid | error

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    if (honeypot) { setState("done"); return; }
    setState("sending");
    const result = await joinWaitlist(supabase, email, readSource(window.location.search, document.referrer));
    if (result.ok) {
      track("waitlist_signup");
      setState(result.already ? "already" : "done");
    } else {
      setState(result.error === "invalid" ? "invalid" : "error");
    }
  }

  const finished = state === "done" || state === "already";
  const ink = dark ? "#fff" : "var(--color-ink)";

  return (
    <form id={id} onSubmit={onSubmit} noValidate style={{ width: "100%", maxWidth: 480 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email" inputMode="email" autoComplete="email" required
          placeholder="you@example.com" aria-label="Email address"
          value={email} onChange={(e) => setEmail(e.target.value)} disabled={finished}
          style={{
            flex: "1 1 220px", minWidth: 0, padding: "14px 16px", fontSize: 16,
            borderRadius: 12, outline: "none", color: ink,
            background: dark ? "rgba(255,255,255,0.1)" : "#fff",
            border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid var(--color-border-strong)",
          }}
        />
        {/* Honeypot — off-screen rather than display:none, which bots skip. */}
        <input
          type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <button
          type="submit" disabled={state === "sending" || finished}
          style={{
            flex: "0 0 auto", padding: "14px 22px", fontSize: 15, fontWeight: 700,
            border: "none", borderRadius: 12, cursor: finished ? "default" : "pointer",
            background: finished ? "var(--color-win)" : "var(--color-primary)", color: "#fff",
          }}
        >
          {state === "sending" ? "Saving…" : finished ? "Joined ✓" : "Join the waitlist"}
        </button>
      </div>
      <p
        role="status" aria-live="polite"
        style={{
          margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, minHeight: 20,
          color: state === "invalid" || state === "error"
            ? "var(--color-loss)"
            : finished ? "var(--color-win)" : dark ? "rgba(255,255,255,0.6)" : "var(--color-muted)",
        }}
      >
        {MESSAGES[state] ?? "One email when the 2027 season opens. No spam — unsubscribe any time."}
      </p>
    </form>
  );
}
