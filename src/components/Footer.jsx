import React from "react";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-ink)", color: "rgba(255,255,255,0.6)",
      padding: "40px 0 28px",
    }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32, marginBottom: 36 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14,
              }}>⚾</div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: "-0.3px" }}>
                MLB<span style={{ color: "#0EA5E9" }}>Scorecard</span>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
              Data-driven MLB predictions, updated daily.
              Transparent, accurate analysis.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14 }}>
              Picks
            </div>
            {["Today's Picks", "Season Archive", "Top Picks", "Model Accuracy"].map(link => (
              <div key={link} style={{ marginBottom: 8 }}>
                <a href="#" style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>
                  {link}
                </a>
              </div>
            ))}
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14 }}>
              Content
            </div>
            {["Blog", "News", "Community", "Newsletter"].map(link => (
              <div key={link} style={{ marginBottom: 8 }}>
                <a href="#" style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Follow */}
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14 }}>
              Follow
            </div>
            <a href="https://twitter.com/MLB_Scorecard" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.1)", color: "#fff",
                borderRadius: "var(--radius-md)", padding: "9px 16px",
                fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 10,
                width: "100%",
              }}>
              𝕏 @MLB_Scorecard
            </a>
            <a href="https://instagram.com/MLB_Scorecard" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                color: "#fff", borderRadius: "var(--radius-md)", padding: "9px 16px",
                fontSize: 13, fontWeight: 600, textDecoration: "none", width: "100%",
              }}>
              📸 @MLB_Scorecard
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © 2026 MLBScorecard.com · For entertainment purposes only, not financial advice
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Powered by statsapi.mlb.com
          </span>
        </div>
      </div>
    </footer>
  );
}
