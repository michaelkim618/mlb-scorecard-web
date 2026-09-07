import { useEffect, useState } from "react";
import { USE_MOCK, supabase } from "../lib/supabase";
import { MOCK_USERS, mockSignInAs, mockReset } from "../lib/supabaseMock";

// Dev-only identity switcher. Renders nothing unless VITE_USE_MOCK=1.
export default function DevAuthSwitcher() {
  const [uid, setUid] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!USE_MOCK) return;
    supabase.auth.getSession().then(({ data: { session } }) => setUid(session?.user?.id ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setUid(session?.user?.id ?? null));
    return () => subscription.unsubscribe();
  }, []);

  if (!USE_MOCK) return null;

  const current = MOCK_USERS.find((u) => u.id === uid);
  const btn = {
    display: "block", width: "100%", textAlign: "left", padding: "6px 8px",
    borderRadius: 6, fontSize: 12, background: "none", color: "#e6e6e6",
    border: "none", cursor: "pointer", overflowWrap: "anywhere",
  };

  return (
    <div style={{
      position: "fixed", left: 12, bottom: 12, zIndex: 9999,
      width: open ? 240 : "auto", maxWidth: "calc(100vw - 24px)",
      background: "#16181d", color: "#e6e6e6", borderRadius: 8,
      border: "1px solid #333", boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12,
    }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ ...btn, fontWeight: 700, padding: "8px 10px" }}
      >
        🧪 mock · {current ? current.username.slice(0, 18) : "signed out"}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #333", padding: 6 }}>
          {MOCK_USERS.map((u) => (
            <button
              key={u.id}
              onClick={() => mockSignInAs(u.id)}
              style={{ ...btn, background: u.id === uid ? "#2b3240" : "none" }}
            >
              {u.id === uid ? "● " : "○ "}{u.username}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #333", marginTop: 6, paddingTop: 6 }}>
            <button onClick={() => supabase.auth.signOut()} style={btn}>↩ sign out</button>
            <button onClick={mockReset} style={btn}>⟲ reset data</button>
          </div>
        </div>
      )}
    </div>
  );
}
