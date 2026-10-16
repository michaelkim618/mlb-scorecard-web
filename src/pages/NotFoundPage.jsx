import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  usePageMeta({ title: "Page not found — MLB Scorecard" });
  return (
    <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "var(--color-canvas-alt)" }}>
      <SiteNav />
      <main style={{ maxWidth: 560, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <h1 className="t-display-md" style={{ color: "var(--color-ink)" }}>That page isn't on the schedule.</h1>
        <p className="t-body" style={{ color: "var(--color-muted)", margin: "12px 0 24px" }}>
          The link may be old or mistyped.
        </p>
        <Link to="/" className="t-body-strong" style={{ color: "var(--color-primary)" }}>Back to MLB Scorecard →</Link>
      </main>
      <Footer />
    </div>
  );
}
