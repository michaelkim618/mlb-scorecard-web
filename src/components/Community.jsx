import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

export default function Community() {
  const { user, signInWithGoogle } = useAuth();
  const [comments, setComments] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("comments")
      .select(`*, profiles(username, avatar_url)`)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setComments(data || []));
  }, []);

  useEffect(() => {
    const channel = supabase.channel("online-home", {
      config: { presence: { key: user?.id || "anon-" + Math.random() } },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        setOnlineCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") await channel.track({ online_at: new Date().toISOString() });
      });
    return () => supabase.removeChannel(channel);
  }, [user]);

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function getInitial(name) { return (name || "U")[0].toUpperCase(); }
  const colors = ["#0EA5E9", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444", "#F97316"];
  function colorFor(id) { return colors[(id || "").charCodeAt(0) % colors.length]; }

  return (
    <section id="community" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Community</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>What fans are saying about today's picks</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--color-canvas)", borderRadius: "var(--radius-full)",
            padding: "5px 14px", border: "1px solid var(--color-border)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A" }} />
            <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>
              {onlineCount || 1} fans online
            </span>
          </div>
        </div>

        {/* Recent Comments Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {comments.length === 0 ? (
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "40px", textAlign: "center", border: "1px solid var(--color-border)",
            }}>
              <p style={{ fontSize: 36, marginBottom: 8 }}>⚾</p>
              <p className="t-caption" style={{ color: "var(--color-muted)" }}>No comments yet — be the first!</p>
            </div>
          ) : comments.map((c) => (
            <div key={c.id} style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "16px 18px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: colorFor(c.user_id),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 13, overflow: "hidden",
                }}>
                  {c.profiles?.avatar_url
                    ? <img src={c.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : getInitial(c.profiles?.username)}
                </div>
                <span className="t-caption-strong" style={{ color: "var(--color-ink)", flex: 1 }}>
                  {c.profiles?.username || "Fan"}
                </span>
                <span className="t-micro" style={{ color: "var(--color-subtle)" }}>{timeAgo(c.created_at)}</span>
              </div>
              <p style={{ color: "var(--color-body)", fontSize: 14, lineHeight: 1.55 }}>{c.content}</p>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: "var(--color-muted)" }}>🤍 {c.likes_count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
          padding: "28px 32px", border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div>
            <p className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 4 }}>
              {user ? "Join the discussion →" : "Share your take on today's games"}
            </p>
            <p className="t-caption" style={{ color: "var(--color-muted)" }}>
              {user ? `Logged in as ${user.email}` : "Sign in with Google to post comments and likes"}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {!user && (
              <button
                onClick={signInWithGoogle}
                style={{
                  padding: "9px 18px", borderRadius: "var(--radius-full)",
                  background: "#fff", color: "#444", fontWeight: 600, fontSize: 13,
                  border: "1px solid var(--color-border)",
                  display: "flex", alignItems: "center", gap: 6,
                  cursor: "pointer", boxShadow: "var(--shadow-sm)",
                }}>
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
                </svg>
                Sign in
              </button>
            )}
            <button
              onClick={() => navigate("/community")}
              style={{
                padding: "9px 20px", borderRadius: "var(--radius-full)",
                background: "var(--color-primary)", color: "#fff",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
              }}>
              {comments.length > 0 ? `View All ${comments.length > 3 ? "Comments" : "& Post"} →` : "Join Discussion →"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
