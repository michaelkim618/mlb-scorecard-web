import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SEASON_RECORD } from "../data/mlbData";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu when route changes
  useEffect(() => { setMenuOpen(false); }, [location]);

  const pct = ((SEASON_RECORD.wins / (SEASON_RECORD.wins + SEASON_RECORD.losses)) * 100).toFixed(1);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + href);
    }
  };

  const navLinks = [
    { label: "Today's Picks", href: "#slate", page: false },
    { label: "Season Stats", href: "#stats", page: false },
    { label: "News", href: "#news", page: false },
    { label: "Blog", href: "/blog", page: true },
    { label: "Community", href: "/community", page: true },
  ];

  return (
    <>
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
          {/* Logo */}
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

          {/* Center Nav Links — desktop only */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {navLinks.map(({ label, href, page }) =>
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
          )}

          {/* Right: Season badge + Follow — desktop only */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "var(--color-canvas-muted)", borderRadius: "var(--radius-full)",
                padding: "5px 12px",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-win)" }} />
                <span className="t-caption-strong" style={{ color: "var(--color-win)" }}>{SEASON_RECORD.wins}W</span>
                <span className="t-caption" style={{ color: "var(--color-muted)" }}>–</span>
                <span className="t-caption-strong" style={{ color: "var(--color-loss)" }}>{SEASON_RECORD.losses}L</span>
                <span className="t-caption" style={{ color: "var(--color-muted)" }}>({pct}%)</span>
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
          )}

          {/* Hamburger button — mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px", display: "flex", flexDirection: "column",
                gap: 5, alignItems: "center", justifyContent: "center",
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: "block", width: 22, height: 2,
                background: "var(--color-ink)", borderRadius: 2,
                transition: "all 0.2s",
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                background: "var(--color-ink)", borderRadius: 2,
                transition: "all 0.2s",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                background: "var(--color-ink)", borderRadius: 2,
                transition: "all 0.2s",
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "var(--nav-height)", left: 0, right: 0, zIndex: 99,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "saturate(180%) blur(20px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 0,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          {navLinks.map(({ label, href, page }) => (
            page ? (
              <button
                key={label}
                onClick={() => { navigate(href); setMenuOpen(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", padding: "14px 0",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: 16, fontWeight: 600, color: "var(--color-ink)",
                }}
              >
                {label}
              </button>
            ) : (
              <a key={label} href={href}
                style={{
                  display: "block", padding: "14px 0",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: 16, fontWeight: 600, color: "var(--color-ink)",
                  textDecoration: "none",
                }}
                onClick={(e) => handleAnchorClick(e, href)}
              >
                {label}
              </a>
            )
          ))}

          {/* Season record in mobile menu */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-win)" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-win)" }}>{SEASON_RECORD.wins}W</span>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>–</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-loss)" }}>{SEASON_RECORD.losses}L</span>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>({pct}%)</span>
          </div>

          <a
            href="https://twitter.com/MLB_Scorecard"
            target="_blank" rel="noreferrer"
            style={{
              marginTop: 12,
              display: "block", textAlign: "center",
              background: "var(--color-ink)", color: "#fff",
              borderRadius: "var(--radius-full)", padding: "10px 16px",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}
          >
            Follow @MLB_Scorecard
          </a>
        </div>
      )}
    </>
  );
}
