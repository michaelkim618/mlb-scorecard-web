import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SEASON_RECORD } from "../data/mlbData";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pct = ((SEASON_RECORD.wins / (SEASON_RECORD.wins + SEASON_RECORD.losses)) * 100).toFixed(1);

  // For anchor links: if already on home, scroll to section; otherwise navigate to /#section
  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    if (isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + href);
    }
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "var(--nav-height)",
      background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.98)",
      backdropFilter: "saturate(180%) blur(20px)",
      borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      transition: "all 0.2s ease",
    }}>
      <div style={{
        maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo — always goes to home */}
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(14,165,233,0.3)",
          }}>
            <span style={{ fontSize: 16 }}>⚾</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--color-ink)", letterSpacing: "-0.4px" }}>
            MLB<span style={{ color: "var(--color-primary)" }}>Scorecard</span>
          </span>
        </div>

        {/* Center Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Today's Picks", href: "#slate", page: false },
            { label: "Season Stats", href: "#stats", page: false },
            { label: "News", href: "#news", page: false },
            { label: "Blog", href: "/blog", page: true },
            { label: "Community", href: "#community", page: false },
          ].map(({ label, href, page }) =>
            page ? (
              <button
                key={label}
                onClick={() => navigate(href)}
                className="t-caption"
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  color: "var(--color-muted)", transition: "color 0.15s",
                }}
                onMouseEnter={e => e.target.style.color = "var(--color-ink)"}
                onMouseLeave={e => e.target.style.color = "var(--color-muted)"}
              >
                {label}
              </button>
            ) : (
              <a key={label} href={href} className="t-caption"
                style={{ color: "var(--color-muted)", textDecoration: "none", transition: "color 0.15s" }}
                onClick={(e) => handleAnchorClick(e, href)}
                onMouseEnter={e => e.target.style.color = "var(--color-ink)"}
                onMouseLeave={e => e.target.style.color = "var(--color-muted)"}
              >
                {label}
              </a>
            )
          )}
        </div>

        {/* Right: Season badge + Follow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--color-canvas-muted)", borderRadius: "var(--radius-full)",
            padding: "5px 12px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-win)" }} />
            <span className="t-caption-strong" style={{ color: "var(--color-win)" }}>
              {SEASON_RECORD.wins}W
            </span>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>–</span>
            <span className="t-caption-strong" style={{ color: "var(--color-loss)" }}>
              {SEASON_RECORD.losses}L
            </span>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>
              ({pct}%)
            </span>
          </div>

          <a
            href="https://twitter.com/MLB_Scorecard"
            target="_blank" rel="noreferrer"
            style={{
              background: "var(--color-ink)", color: "#fff",
              borderRadius: "var(--radius-full)", padding: "7px 16px",
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            Follow @MLB_Scorecard
          </a>
        </div>
      </div>
    </nav>
  );
}
