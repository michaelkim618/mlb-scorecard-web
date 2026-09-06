import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CommunityPage() {
  const { user, profile, loading, signInWithGoogle, signOut } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState({});
  const [posting, setPosting] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
    const channel = supabase
      .channel("comments-page")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, fetchComments)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  useEffect(() => {
    if (user) fetchMyLikes();
  }, [user]);

  useEffect(() => {
    const channel = supabase.channel("online-community", {
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

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select(`*, profiles(username, avatar_url)`)
      .order("created_at", { ascending: false })
      .limit(100);
    setComments(data || []);
  }

  async function fetchMyLikes() {
    const { data } = await supabase.from("likes").select("comment_id").eq("user_id", user.id);
    const map = {};
    (data || []).forEach((l) => (map[l.comment_id] = true));
    setLikes(map);
  }

  async function handlePost() {
    if (!commentText.trim() || !user) return;
    setPosting(true);
    await supabase.from("comments").insert({ user_id: user.id, content: commentText.trim() });
    setCommentText("");
    setPosting(false);
  }

  async function handleLike(comment) {
    if (!user) return;
    if (likes[comment.id]) {
      await supabase.from("likes").delete().eq("user_id", user.id).eq("comment_id", comment.id);
      await supabase.from("comments").update({ likes_count: comment.likes_count - 1 }).eq("id", comment.id);
      setLikes((prev) => { const n = { ...prev }; delete n[comment.id]; return n; });
    } else {
      await supabase.from("likes").insert({ user_id: user.id, comment_id: comment.id });
      await supabase.from("comments").update({ likes_count: comment.likes_count + 1 }).eq("id", comment.id);
      setLikes((prev) => ({ ...prev, [comment.id]: true }));
    }
    fetchComments();
  }

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

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
    </svg>
  );

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "var(--color-canvas-muted)" }}>
      <NavBar />
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <button
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: 13, marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}
            >
              ← Back to Home
            </button>
            <h1 className="t-display-md" style={{ color: "var(--color-ink)" }}>Community</h1>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
              Share your thoughts on today's picks
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--color-canvas)", borderRadius: "var(--radius-full)",
            padding: "6px 16px", border: "1px solid var(--color-border)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A" }} />
            <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>
              {onlineCount || 1} fans online
            </span>
          </div>
        </div>

        <div className="community-layout" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>

          {/* Main: Compose + Comments */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Compose */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "20px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              {user ? (
                <>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: colorFor(user.id),
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 15, overflow: "hidden",
                    }}>
                      {profile?.avatar_url
                        ? <img src={profile.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : getInitial(profile?.username)}
                    </div>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your take on today's games..."
                      onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handlePost(); }}
                      style={{
                        flex: 1, border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)",
                        outline: "none", resize: "none", padding: "10px 14px",
                        fontFamily: "var(--font-text)", fontSize: 14, lineHeight: 1.6,
                        color: "var(--color-body)", background: "var(--color-canvas-muted)",
                        minHeight: 80,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="t-micro" style={{ color: "var(--color-subtle)" }}>⌘ + Enter to post</span>
                    <button
                      onClick={handlePost}
                      disabled={!commentText.trim() || posting}
                      style={{
                        background: "var(--color-primary)", color: "#fff",
                        borderRadius: "var(--radius-full)", padding: "8px 22px",
                        fontSize: 13, fontWeight: 600,
                        opacity: commentText.trim() && !posting ? 1 : 0.4,
                        cursor: commentText.trim() && !posting ? "pointer" : "default",
                      }}>
                      {posting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <p style={{ fontSize: 28, marginBottom: 8 }}>⚾</p>
                  <p className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 4 }}>Join the conversation</p>
                  <p className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 16 }}>Sign in to share your picks and analysis</p>
                  <button onClick={signInWithGoogle} style={{
                    padding: "10px 24px", borderRadius: "var(--radius-full)",
                    background: "#fff", color: "#444", fontWeight: 600, fontSize: 14,
                    border: "1px solid var(--color-border)",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    cursor: "pointer", boxShadow: "var(--shadow-sm)",
                  }}>
                    <GoogleIcon /> Sign in with Google
                  </button>
                </div>
              )}
            </div>

            {/* Comments count */}
            {comments.length > 0 && (
              <div className="t-caption" style={{ color: "var(--color-muted)", paddingLeft: 4 }}>
                {comments.length} comments
              </div>
            )}

            {/* Comments List */}
            {comments.length === 0 ? (
              <div style={{
                background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
                padding: "48px", textAlign: "center", border: "1px solid var(--color-border)",
              }}>
                <p style={{ fontSize: 40, marginBottom: 10 }}>⚾</p>
                <p className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 4 }}>No comments yet</p>
                <p className="t-caption" style={{ color: "var(--color-muted)" }}>Be the first to share your take!</p>
              </div>
            ) : comments.map((c) => (
              <div key={c.id} className="comment-card" style={{
                background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
                padding: "16px 20px", border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: colorFor(c.user_id),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 14, overflow: "hidden",
                  }}>
                    {c.profiles?.avatar_url
                      ? <img src={c.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : getInitial(c.profiles?.username)}
                  </div>
                  <div className="comment-author" style={{ flex: 1 }}>
                    <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>
                      {c.profiles?.username || "Fan"}
                    </span>
                  </div>
                  <span className="t-micro" style={{ color: "var(--color-subtle)" }}>{timeAgo(c.created_at)}</span>
                </div>
                <p style={{ color: "var(--color-body)", lineHeight: 1.6, fontSize: 14 }}>{c.content}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
                  <button
                    onClick={() => handleLike(c)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      color: likes[c.id] ? "var(--color-primary)" : "var(--color-muted)",
                      fontSize: 13, fontWeight: likes[c.id] ? 600 : 400,
                      transition: "color 0.15s", cursor: user ? "pointer" : "default",
                    }}>
                    {likes[c.id] ? "❤️" : "🤍"} {c.likes_count}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="community-sidebar" style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: "calc(var(--nav-height) + 24px)" }}>

            {/* User card or sign in */}
            {!loading && (
              <div style={{
                background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
                padding: "22px", border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}>
                {user ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: "50%",
                        background: colorFor(user.id),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: 18, overflow: "hidden",
                      }}>
                        {profile?.avatar_url
                          ? <img src={profile.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          : getInitial(profile?.username)}
                      </div>
                      <div>
                        <div className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{profile?.username || "Fan"}</div>
                        <div className="t-micro" style={{ color: "var(--color-muted)", overflowWrap: "anywhere" }}>{user.email}</div>
                      </div>
                    </div>
                    <button onClick={signOut} style={{
                      width: "100%", padding: "8px", borderRadius: "var(--radius-md)",
                      background: "var(--color-canvas-muted)", color: "var(--color-muted)",
                      fontWeight: 600, fontSize: 13, border: "1px solid var(--color-border)", cursor: "pointer",
                    }}>Sign Out</button>
                  </>
                ) : (
                  <>
                    <h3 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 6 }}>Join the Community</h3>
                    <p className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 16 }}>Sign in to share your picks and analysis</p>
                    <button onClick={signInWithGoogle} style={{
                      width: "100%", padding: "10px", borderRadius: "var(--radius-md)",
                      background: "#fff", color: "#444", fontWeight: 600, fontSize: 14,
                      border: "1px solid var(--color-border)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      cursor: "pointer", boxShadow: "var(--shadow-sm)",
                    }}>
                      <GoogleIcon /> Sign in with Google
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Stats */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "22px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div className="t-label" style={{ color: "var(--color-muted)", marginBottom: 16 }}>📊 Community Stats</div>
              {[
                { label: "Total Comments", value: comments.length },
                { label: "Fans Online", value: onlineCount || 1 },
                { label: "Total Likes", value: comments.reduce((s, c) => s + (c.likes_count || 0), 0) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span className="t-caption" style={{ color: "var(--color-muted)" }}>{label}</span>
                  <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Today's Poll */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "22px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div className="t-label" style={{ color: "var(--color-muted)", marginBottom: 14 }}>📊 Today's Poll</div>
              <p className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 16, lineHeight: 1.4 }}>Who wins today: BOS vs CWS?</p>
              {[
                { team: "BOS Red Sox", pct: 78, color: "#BD3039" },
                { team: "CWS White Sox", pct: 22, color: "#27251F" },
              ].map((opt, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span className="t-caption" style={{ color: "var(--color-ink)" }}>{opt.team}</span>
                    <span className="t-caption-strong" style={{ color: opt.color }}>{opt.pct}%</span>
                  </div>
                  <div style={{ height: 7, borderRadius: "var(--radius-full)", background: "var(--color-border)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${opt.pct}%`, background: opt.color, borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>
              ))}
              <div className="t-micro" style={{ color: "var(--color-subtle)", marginTop: 12 }}>247 votes · 6 hours left</div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
