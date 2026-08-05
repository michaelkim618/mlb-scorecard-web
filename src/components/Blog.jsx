import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogIndex } from "../hooks/useBlog";

export default function Blog() {
  const navigate = useNavigate();
  const { posts, loading } = useBlogIndex();
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" style={{ background: "var(--color-canvas)", padding: "56px 0", borderTop: "1px solid var(--color-border)", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>From the Desk</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>Analysis · Game Reviews · Methodology</p>
          </div>
          <button
            onClick={() => navigate("/blog")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-primary)", fontSize: 13, fontWeight: 600, padding: 0,
            }}
          >
            View all posts →
          </button>
        </div>

        {loading && (
          <div className="t-caption" style={{ color: "var(--color-muted)", padding: "20px 0" }}>Loading posts...</div>
        )}

        {!loading && latest.length === 0 && (
          <div className="t-caption" style={{ color: "var(--color-muted)", padding: "20px 0" }}>No posts available.</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {latest.map((post) => (
            <div
              key={post.slug}
              onClick={() => navigate(`/blog/${post.slug}`)}
              style={{
                display: "grid", gridTemplateColumns: "80px 1fr auto",
                alignItems: "center", gap: 20,
                padding: "18px 20px", borderRadius: "var(--radius-md)",
                cursor: "pointer", transition: "background 0.12s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Author + Date */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, lineHeight: 1 }}>{post.author_emoji}</div>
                <div className="t-label" style={{ color: "var(--color-primary)", marginTop: 4 }}>
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>

              {/* Content */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                    color: post.tag_color || "var(--color-muted)",
                    background: `${post.tag_color || "#64748B"}15`,
                    borderRadius: "var(--radius-full)", padding: "2px 8px",
                  }}>
                    {post.tag}
                  </span>
                  <span className="t-label" style={{ color: "var(--color-subtle)" }}>by {post.author}</span>
                </div>
                <h3 className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 4 }}>{post.title}</h3>
                <p className="t-caption" style={{ color: "var(--color-muted)" }}>{post.summary}</p>
              </div>

              {/* Read time */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>{post.read_time} read →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--color-border)", margin: "4px 0 0" }} />
      </div>
    </section>
  );
}
