import { Link } from "react-router-dom";

const links = [
  { to: "/record", label: "Track Record" },
  { to: "/articles", label: "Articles" },
];

/** Nav for visitors who are not signed in. The signed-in NavBar points at
 *  sections of the members' home page (#slate, #stats…) that a visitor does not
 *  have, so it cannot be reused here. */
export default function PublicNav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "var(--nav-height)",
      background: "rgba(255,255,255,0.96)", backdropFilter: "saturate(180%) blur(20px)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <div style={{
        maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #0EA5E9, #0284C7)", fontSize: 16,
          }}>⚾</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--color-ink)", letterSpacing: "-0.4px" }}>
            MLB<span style={{ color: "var(--color-primary)" }}>Scorecard</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="t-caption public-nav-link"
              style={{ color: "var(--color-muted)", textDecoration: "none", whiteSpace: "nowrap" }}>
              {label}
            </Link>
          ))}
          <Link to="/signin" className="t-caption-strong" style={{
            color: "var(--color-primary)", textDecoration: "none", whiteSpace: "nowrap",
            border: "1px solid var(--color-primary)", borderRadius: 999, padding: "6px 14px",
          }}>
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
