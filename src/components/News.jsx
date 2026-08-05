import React from "react";
import { NEWS } from "../data/mlbData";

export default function News() {
  return (
    <section id="news" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Around the League</h2>
          <a href="#" className="t-caption-strong" style={{ color: "var(--color-primary)" }}>All news →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {NEWS.map((item, i) => (
            <div key={i} style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "20px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)", cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px",
                  background: `${item.color}18`, color: item.color,
                  borderRadius: "var(--radius-full)", padding: "3px 8px",
                }}>
                  {item.tag}
                </span>
                <span className="t-micro" style={{ color: "var(--color-subtle)" }}>{item.time}</span>
              </div>
              <h3 className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 8, lineHeight: 1.35 }}>
                {item.title}
              </h3>
              <p className="t-caption" style={{ color: "var(--color-muted)", lineHeight: 1.5 }}>
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
