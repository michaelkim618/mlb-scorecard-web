import React from "react";
import { SEASON_RECORD, SEASON_STATS } from "../data/mlbData";

export default function SeasonStats() {
  const overall = SEASON_RECORD;
  const pct = ((overall.wins / (overall.wins + overall.losses)) * 100).toFixed(1);

  return (
    <section id="stats" style={{ background: "var(--color-canvas)", padding: "56px 0", borderTop: "1px solid var(--color-border)", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Season Accuracy</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>Every pick tracked. Updated daily.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
          {/* Big number */}
          <div style={{
            textAlign: "center", padding: "32px 40px",
            background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
            borderRadius: "var(--radius-xl)", boxShadow: "0 12px 40px rgba(14,165,233,0.25)",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 72, lineHeight: 1, color: "#fff", letterSpacing: "-3px" }}>
              {pct}
              <span style={{ fontSize: 36, color: "rgba(255,255,255,0.7)" }}>%</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Season Accuracy
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14,
              background: "rgba(255,255,255,0.18)", borderRadius: "var(--radius-full)", padding: "6px 16px",
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{overall.wins}W</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>–</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 16 }}>{overall.losses}L</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {SEASON_STATS.map((stat, i) => (
              <div key={i} style={{
                background: "var(--color-canvas-muted)", borderRadius: "var(--radius-md)",
                padding: "18px 20px", border: "1px solid var(--color-border)",
              }}>
                <div className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 10 }}>{stat.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--color-ink)", letterSpacing: "-1px" }}>
                    {stat.pct}
                  </span>
                  <span className="t-body" style={{ color: "var(--color-muted)" }}>%</span>
                  <span className="t-caption" style={{ color: "var(--color-subtle)", marginLeft: 4 }}>
                    {stat.wins}W–{stat.losses}L
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: "var(--radius-full)", background: "var(--color-border)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${stat.pct}%`,
                    background: stat.pct >= 90 ? "var(--color-win)" : stat.pct >= 75 ? "var(--color-primary)" : "var(--color-accent)",
                    borderRadius: "var(--radius-full)", transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
