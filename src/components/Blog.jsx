import React from "react";
import { BLOG_POSTS } from "../data/mlbData";

const TAG_COLORS = {
  "결과 분석": "#0EA5E9",
  "선발 분석": "#8B5CF6",
  "방법론": "#16A34A",
};

export default function Blog() {
  return (
    <section id="blog" style={{ background: "var(--color-canvas)", padding: "56px 0", borderTop: "1px solid var(--color-border)", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>From the Desk</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>분석 · 경기 리뷰 · 방법론</p>
          </div>
          <a href="#" className="t-caption-strong" style={{ color: "var(--color-primary)" }}>모든 글 보기 →</a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {BLOG_POSTS.map((post, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "80px 1fr auto",
              alignItems: "center", gap: 20,
              padding: "18px 20px", borderRadius: "var(--radius-md)",
              cursor: "pointer", transition: "background 0.12s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Date */}
              <div style={{ textAlign: "center" }}>
                <div className="t-label" style={{ color: "var(--color-primary)" }}>{post.date}</div>
              </div>

              {/* Content */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                    color: TAG_COLORS[post.tag] || "var(--color-muted)",
                    background: `${TAG_COLORS[post.tag] || "#64748B"}15`,
                    borderRadius: "var(--radius-full)", padding: "2px 8px",
                  }}>
                    {post.tag}
                  </span>
                </div>
                <h3 className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 4 }}>{post.title}</h3>
                <p className="t-caption" style={{ color: "var(--color-muted)" }}>{post.summary}</p>
              </div>

              {/* Read time */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>{post.readTime} read →</span>
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
