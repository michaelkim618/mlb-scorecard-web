import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import useSeasonResults from "../hooks/useSeasonResults";
import { useBlogIndex } from "../hooks/useBlog";
import { gradedGames, tally, fmtPct } from "../lib/record";
import PublicNav from "../components/PublicNav";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";

const wrap = { maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" };

const FACTORS = [
  { title: "Starting pitching", body: "Recent form and matchup history of the starter — the single biggest swing in a baseball game." },
  { title: "Bullpen & batting", body: "How rested the relievers are, who is in tonight's confirmed lineup, and how that lineup hits." },
  { title: "Situational", body: "Park, rest, travel and the other context that moves a single game more than a season-long rating does." },
];

function Stat({ label, value, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "20px 22px", flex: "1 1 180px" }}>
      <div className="t-label" style={{ color: "var(--color-muted)" }}>{label}</div>
      <div className="t-display-md" style={{ color: "var(--color-ink)", marginTop: 6 }}>{value}</div>
      <div className="t-caption" style={{ color: "var(--color-muted)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

export default function LandingPage() {
  usePageMeta({
    title: "MLB Scorecard — MLB predictions with a public track record",
    description: "Daily MLB win probabilities from a pitching, bullpen, batting and situational model — with every graded game, hit or miss, on the public record.",
    path: "/",
  });

  const { games, pstToday, loading } = useSeasonResults();
  const { posts } = useBlogIndex();
  const graded = gradedGames(games, pstToday);
  const overall = tally(graded);
  const sixty = tally(graded.filter((g) => (g.pick_prob ?? 0) >= 60));
  const latest = posts.slice(0, 3);

  return (
    <div style={{ paddingTop: "var(--nav-height)", background: "var(--color-canvas-alt)" }}>
      <PublicNav />

      <header style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2040 55%, #0a1628 100%)", color: "#fff" }}>
        <div style={{ ...wrap, padding: "72px 24px 64px" }}>
          <p className="t-label" style={{ color: "var(--color-primary)", letterSpacing: 1.2 }}>MLB · DATA-DRIVEN PREDICTIONS</p>
          <h1 className="t-display-lg" style={{ margin: "12px 0 16px", maxWidth: 760 }}>
            Win probabilities for every MLB game — with the whole record in the open.
          </h1>
          <p className="t-body" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 620, marginBottom: 28 }}>
            Free to join during the beta — sign in to see each day's picks and the reasoning behind them.
            Anyone can check how the model has actually done: every graded game, hit or miss, is listed on
            the track record.
          </p>
          <WaitlistForm dark id="waitlist" />
          <p className="t-caption" style={{ marginTop: 18 }}>
            <Link to="/signin" style={{ color: "rgba(255,255,255,0.8)" }}>Free during the beta — sign in or create an account →</Link>
          </p>
        </div>
      </header>

      <main>
        <section style={{ ...wrap, padding: "48px 24px 8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>The record so far</h2>
            <Link to="/record" className="t-caption-strong" style={{ color: "var(--color-primary)" }}>Full track record →</Link>
          </div>
          {loading ? (
            <p className="t-caption" style={{ color: "var(--color-muted)" }}>Loading the record…</p>
          ) : (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Stat label="All graded games" value={fmtPct(overall.pct)} sub={`${overall.wins}–${overall.losses} over ${overall.games} games`} />
              <Stat label="Picks at 60%+" value={fmtPct(sixty.pct)} sub={`${sixty.wins}–${sixty.losses} over ${sixty.games} games`} />
            </div>
          )}
          <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 12 }}>
            Counts games that are final and before today. Past results do not guarantee future ones.
          </p>
        </section>

        <section style={{ ...wrap, padding: "40px 24px 8px" }}>
          <h2 className="t-display-md" style={{ color: "var(--color-ink)", marginBottom: 20 }}>What goes into a pick</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 14 }}>
            {FACTORS.map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px" }}>
                <h3 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 6 }}>{f.title}</h3>
                <p className="t-body" style={{ color: "var(--color-muted)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {latest.length > 0 && (
          <section style={{ ...wrap, padding: "40px 24px 8px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>From the desk</h2>
              <Link to="/articles" className="t-caption-strong" style={{ color: "var(--color-primary)" }}>All articles →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {latest.map((p) => (
                <Link key={p.slug} to={`/articles/${p.slug}`} style={{
                  display: "block", padding: "16px 4px", textDecoration: "none",
                  borderBottom: "1px solid var(--color-border)",
                }}>
                  <div className="t-caption" style={{ color: "var(--color-muted)" }}>
                    {new Date(p.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {p.author}
                  </div>
                  <div className="t-body-strong" style={{ color: "var(--color-ink)", marginTop: 2 }}>{p.title}</div>
                  {p.summary && <div className="t-caption" style={{ color: "var(--color-muted)", marginTop: 2 }}>{p.summary}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ ...wrap, padding: "48px 24px 64px" }}>
          <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "36px 28px", textAlign: "center" }}>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Free to join during the beta. Paid memberships are planned for the 2027 season.</h2>
            <p className="t-body" style={{ color: "var(--color-muted)", margin: "8px auto 22px", maxWidth: 520 }}>
              Join the waitlist and you'll hear first — one email, before anything changes.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}><WaitlistForm /></div>
          </div>
          <p className="t-caption" style={{ color: "var(--color-muted)", textAlign: "center", marginTop: 20 }}>
            For information and entertainment only — not betting or financial advice.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
