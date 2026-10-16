import usePageMeta from "../hooks/usePageMeta";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

const H2 = { color: "var(--color-ink)", margin: "32px 0 8px" };

export default function PrivacyPage() {
  usePageMeta({
    title: "Privacy — MLB Scorecard",
    description: "What MLB Scorecard collects, why, and how to have it removed.",
    path: "/privacy",
  });
  return (
    <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "var(--color-canvas-alt)" }}>
      <SiteNav />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 72px" }}>
        <h1 className="t-display-md" style={{ color: "var(--color-ink)" }}>Privacy</h1>
        <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>Last updated October 2026</p>

        <div className="t-body" style={{ color: "var(--color-body)" }}>
          <h2 className="t-headline" style={H2}>What we collect</h2>
          <p>
            <strong>Waitlist.</strong> If you join the waitlist we store your email address, and where you
            arrived from (for example “instagram” or a referring site) so we can tell which channels work.
            We use it to email you about the launch of MLB Scorecard memberships — nothing else — and we
            do not sell or share it.
          </p>
          <p>
            <strong>Accounts.</strong> If you create an account we store the email address, name and
            profile details you provide, and the comments you post. Sign-in with Google shares your name, email
            address and profile picture with us; we receive nothing else from your Google account.
          </p>
          <p>
            <strong>Usage statistics.</strong> We use privacy-friendly analytics that count page views and
            referrers. They do not use cookies to follow you across other sites.
          </p>

          <h2 className="t-headline" style={H2}>Who processes it</h2>
          <p>
            Accounts, comments and the waitlist are stored with Supabase. The site is hosted and its
            analytics are provided by Vercel.
          </p>

          <h2 className="t-headline" style={H2}>Removal</h2>
          <p>
            To be removed from the waitlist, or to delete an account and its comments, message us at{" "}
            <a href="https://x.com/MLB_Scorecard" style={{ color: "var(--color-primary)" }}>@MLB_Scorecard on X</a> or{" "}
            <a href="https://instagram.com/MLB_Scorecard" style={{ color: "var(--color-primary)" }}>Instagram</a>{" "}
            and we will do it.
          </p>

          <h2 className="t-headline" style={H2}>Not betting advice</h2>
          <p>
            MLB Scorecard publishes probabilities from a statistical model for information and entertainment.
            It is not betting, investment or financial advice, and past results do not guarantee future ones.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
