import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useBlogIndex } from "../hooks/useBlog";

const AUTHORS = ["All", "Stan", "Rico", "Hana", "Ace", "Doc", "Max"];
const TYPES = ["All", "daily", "weekly"];

const AUTHOR_META = {
  Stan:  { emoji: "📊", color: "#0EA5E9" },
  Rico:  { emoji: "🎭", color: "#DC2626" },
  Hana:  { emoji: "🌸", color: "#EC4899" },
  Ace:   { emoji: "🎙️", color: "#D97706" },
  Doc:   { emoji: "🧠", color: "#7C3AED" },
  Max:   { emoji: "📰", color: "#16A34A" },
};

function PostCard({ post, onClick }) {
  const [hovered, setHovered] = useState(false);
  const meta = AUTHOR_META[post.author] || { emoji: "✍️", color: "#64748B" };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--color-canvas-muted)" : "var(--color-canvas)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Tag + Read time */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
          color: post.tag_color || meta.color,
          background: `${post.tag_color || meta.color}18`,
          borderRadius: "var(--radius-full)",
          padding: "3px 10px",
        }}>
          {post.tag}
        </span>
        <span className="t-caption" style={{ color: "var(--color-subtle)" }}>
          {post.read_time}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: 17,
        fontWeight: 700,
        color: "var(--color-ink)",
        lineHeight: 1.35,
        letterSpacing: "-0.3px",
        margin: 0,
      }}>
        {post.title}
      </h3>

      {/* Summary */}
      <p className="t-caption" style={{ color: "var(--color-muted)", margin: 0, lineHeight: 1.55 }}>
        {post.summary}
      </p>

      {/* Author + Date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `${meta.color}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>
            {meta.emoji}
          </div>
          <div>
            <div className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{post.author}</div>
            <div className="t-micro" style={{ color: "var(--color-subtle)" }}>{post.author_role}</div>
          </div>
        </div>
        <span className="t-caption" style={{ color: "var(--color-subtle)" }}>
          {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const navigate = useNavigate();
  const { posts, loading, error } = useBlogIndex();
  const [authorFilter, setAuthorFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = posts.filter((p) => {
    const authorOk = authorFilter === "All" || p.author === authorFilter;
    const typeOk = typeFilter === "All" || p.type === typeFilter;
    return authorOk && typeOk;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-canvas-alt)", paddingTop: "var(--nav-height)" }}>
      <NavBar />

      {/* Hero header */}
      <div style={{
        background: "var(--color-canvas)",
        borderBottom: "1px solid var(--color-border)",
        padding: "40px 24px 32px",
      }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>⚾</span>
            <h1 className="t-display-md" style={{ color: "var(--color-ink)", margin: 0 }}>
              MLB Scorecard Blog
            </h1>
          </div>
          <p className="t-body" style={{ color: "var(--color-muted)", marginTop: 8 }}>
            Daily analysis, game reviews, and insider stories from our 6-writer team.
          </p>
        </div>
      </div>

      {/* Ad slot */}
      <div id="ad-slot-blog-top" style={{
        maxWidth: "var(--max-width)", margin: "0 auto", padding: "16px 24px 0",
      }} />

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          {/* Type filter */}
          <div style={{ display: "flex", gap: 4, background: "var(--color-canvas-muted)", borderRadius: "var(--radius-md)", padding: 4 }}>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: typeFilter === t ? "var(--color-canvas)" : "transparent",
                  color: typeFilter === t ? "var(--color-ink)" : "var(--color-muted)",
                  fontWeight: typeFilter === t ? 600 : 400,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: typeFilter === t ? "var(--shadow-sm)" : "none",
                  transition: "all 0.12s",
                }}
              >
                {t === "All" ? "All" : t === "daily" ? "Daily" : "Weekly"}
              </button>
            ))}
          </div>

          {/* Author filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {AUTHORS.map((a) => {
              const meta = AUTHOR_META[a];
              const active = authorFilter === a;
              return (
                <button
                  key={a}
                  onClick={() => setAuthorFilter(a)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    border: active ? `1.5px solid ${meta ? meta.color : "var(--color-primary)"}` : "1.5px solid var(--color-border)",
                    background: active && meta ? `${meta.color}12` : "var(--color-canvas)",
                    color: active && meta ? meta.color : "var(--color-muted)",
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.12s",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {meta && <span>{meta.emoji}</span>}
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        {/* Posts grid */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-muted)" }}>
            Loading posts...
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-loss)" }}>
            Error: {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-muted)" }}>
            No posts match your filters.
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {filtered.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                onClick={() => navigate(`/blog/${post.slug}`)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
