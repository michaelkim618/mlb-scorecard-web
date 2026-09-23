import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
  </svg>
);

export default function AuthGate({ children }) {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw]       = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 인증 확인 중 — 스피너
  if (loading) {
    return (
      <div style={styles.overlay}>
        <div style={styles.spinner} />
      </div>
    );
  }

  // 로그인 됨 — 원래 페이지 표시
  if (user) return children;

  // 미로그인 — 로그인 게이트 표시
  async function handleEmailAction() {
    setError("");
    if (!email || !pw) { setError("Please enter your email and password."); return; }
    if (isSignup && !name) { setError("Please enter your name."); return; }

    setSubmitting(true);
    if (isSignup) {
      const { error: e } = await supabase.auth.signUp({
        email, password: pw,
        options: { data: { full_name: name } },
      });
      if (e) { setError(e.message); setSubmitting(false); return; }
      setError("✅ Account created! Please check your email.");
    } else {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (e) { setError("Invalid email or password."); setSubmitting(false); return; }
    }
    setSubmitting(false);
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.logo}>⚾</div>
        <h1 style={styles.title}>MLB Scorecard</h1>
        <p style={styles.sub}>
          Data-driven MLB game predictions<br />
          Sign in to access today's picks
        </p>

        {/* Google 로그인 */}
        <button style={styles.btnGoogle} onClick={signInWithGoogle}>
          <GoogleIcon />
          Continue with Google
        </button>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with email</span>
          <span style={styles.dividerLine} />
        </div>

        {/* 이메일 폼 */}
        {isSignup && (
          <input
            style={styles.input}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
        )}
        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password (6+ characters)"
          value={pw}
          onChange={e => setPw(e.target.value)}
          autoComplete="current-password"
          onKeyDown={e => e.key === "Enter" && handleEmailAction()}
        />
        <button style={styles.btnEmail} onClick={handleEmailAction} disabled={submitting}>
          {submitting ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
        </button>

        <div style={styles.toggle}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={styles.toggleLink} onClick={() => { setIsSignup(!isSignup); setError(""); }}>
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>

        {error && (
          <div style={{ ...styles.error, color: error.startsWith("✅") ? "#22c55e" : "#ef4444" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #0a1628 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  spinner: {
    width: 36, height: 36,
    border: "3px solid rgba(14,165,233,0.2)",
    borderTopColor: "#0ea5e9",
    borderRadius: "50%",
    animation: "spin .7s linear infinite",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(14,165,233,0.3)",
    borderRadius: 20,
    padding: "48px 40px",
    maxWidth: 420, width: "90%",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
  },
  logo:  { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: -0.5 },
  sub:   { color: "#94a3b8", fontSize: 15, marginBottom: 32, lineHeight: 1.6 },
  btnGoogle: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    width: "100%", padding: "14px 20px",
    background: "#fff", color: "#1e293b",
    border: "none", borderRadius: 12,
    fontSize: 15, fontWeight: 600, cursor: "pointer",
    marginBottom: 12,
  },
  divider: {
    display: "flex", alignItems: "center", gap: 8,
    margin: "16px 0", color: "#475569", fontSize: 13,
  },
  dividerLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.1)" },
  dividerText: { whiteSpace: "nowrap" },
  input: {
    width: "100%", padding: "13px 16px", marginBottom: 10,
    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10, color: "#fff", fontSize: 14, outline: "none",
    boxSizing: "border-box",
  },
  btnEmail: {
    width: "100%", padding: 13, background: "#0ea5e9", color: "#fff",
    border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600,
    cursor: "pointer", marginBottom: 10,
  },
  toggle: { color: "#94a3b8", fontSize: 13 },
  toggleLink: { color: "#0ea5e9", textDecoration: "underline", cursor: "pointer" },
  error: { fontSize: 13, marginTop: 8 },
};
