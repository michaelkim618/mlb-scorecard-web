import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useBlogPost, useBlogIndex } from "../hooks/useBlog";

const AUTHOR_META = {
  Stan:  { emoji: "📊", color: "#0EA5E9", role: "Data Analyst" },
  Rico:  { emoji: "🎭", color: "#DC2626", role: "Drama Critic" },
  Hana:  { emoji: "🌸", color: "#EC4899", role: "Story Writer" },
  Ace:   { emoji: "🎙️", color: "#D97706", role: "Former Pitcher" },
  Doc:   { emoji: "🧠", color: "#7C3AED", role: "Sabermetrician" },
  Max:   { emoji: "📰", color: "#16A34A", role: "Senior Reporter" },
};

/* ---- Markdown-lite renderer ---- */
function renderMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} style={{
          fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
          color: "var(--color-ink)", marginTop: 32, marginBottom: 12, letterSpacing: "-0.3px",
        }}>{line.slice(3)}</h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} style={{
          fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600,
          color: "var(--color-ink)", marginTop: 24, marginBottom: 8,
        }}>{line.slice(4)}</h3>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} style={{ height: 8 }} />);
    } else {
      // inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((p, j) =>
        j % 2 === 1 ? <strong key={j}>{p}</strong> : p
      );
      elements.push(
        <p key={i} style={{ color: "var(--color-body)", lineHeight: 1.7, margin: "4px 0", fontSize: 15 }}>
          {rendered}
        </p>
      );
    }
    i++;
  }
  return elements;
}

/* ---- Content block renderers ---- */
function TextBlock({ block }) {
  return <div style={{ marginBottom: 4 }}>{renderMarkdown(block.value)}</div>;
}

function StatRow({ block }) {
  return (
    <div style={{
      display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16, marginBottom: 16,
    }}>
      {block.stats.map((s, i) => (
        <div key={i} style={{
          flex: "1 1 120px",
          background: "var(--color-canvas-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "14px 16px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--color-ink)", letterSpacing: "-0.5px" }}>
            {s.value}
          </div>
          <div className="t-label" style={{ color: "var(--color-muted)", marginTop: 4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function ChartBlock({ block }) {
  const { chart_type = "bar", title, data, x_key, bars, lines } = block;
  return (
    <div style={{
      background: "var(--color-canvas-muted)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding: "20px",
      marginTop: 16, marginBottom: 16,
    }}>
      {title && (
        <div className="t-caption-strong" style={{ color: "var(--color-ink)", marginBottom: 16 }}>{title}</div>
      )}
      <ResponsiveContainer width="100%" height={220}>
        {chart_type === "line" ? (
          <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey={x_key} tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-border)" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {(lines || []).map((l) => (
              <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} name={l.label} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey={x_key} tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-border)" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {(bars || []).map((b) => (
              <Bar key={b.key} dataKey={b.key} fill={b.color} name={b.label} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function TableBlock({ block }) {
  return (
    <div style={{ overflowX: "auto", marginTop: 16, marginBottom: 16 }}>
      {block.title && (
        <div className="t-caption-strong" style={{ color: "var(--color-ink)", marginBottom: 10 }}>{block.title}</div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--color-canvas-muted)" }}>
            {block.headers.map((h, i) => (
              <th key={i} style={{
                padding: "8px 12px", textAlign: "left",
                color: "var(--color-muted)", fontWeight: 600,
                borderBottom: "1px solid var(--color-border)",
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid var(--color-border)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "8px 12px", color: "var(--color-body)" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HighlightBox({ block }) {
  return (
    <div style={{
      background: `${block.color}10`,
      border: `1.5px solid ${block.color}40`,
      borderLeft: `4px solid ${block.color}`,
      borderRadius: "var(--radius-md)",
      padding: "18px 20px",
      marginTop: 20, marginBottom: 20,
    }}>
      {block.title && (
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: block.color, marginBottom: 6 }}>
          {block.title}
        </div>
      )}
      <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--color-ink)", letterSpacing: "-0.4px" }}>
        {block.value}
      </div>
      {block.sub && (
        <div className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>{block.sub}</div>
      )}
    </div>
  );
}

function ContentBlock({ block }) {
  switch (block.type) {
    case "text":         return <TextBlock block={block} />;
    case "stat_row":     return <StatRow block={block} />;
    case "chart":        return <ChartBlock block={block} />;
    case "table":        return <TableBlock block={block} />;
    case "highlight_box": return <HighlightBox block={block} />;
    default:             return null;
  }
}

function AuthorCard({ post, style }) {
  const meta = AUTHOR_META[post.author] || { emoji: "✍️", color: "#64748B" };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "var(--color-canvas-muted)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding: "16px 20px",
      ...style,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: `${meta.color}18`,
        border: `2px solid ${meta.color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, flexShrink: 0,
      }}>
        {meta.emoji}
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-ink)" }}>
          {post.author}
          <span style={{
            marginLeft: 8, fontSize: 11, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.5px", color: meta.color,
            background: `${meta.color}15`, borderRadius: "var(--radius-full)", padding: "2px 8px",
          }}>{post.tag}</span>
        </div>
        <div className="t-caption" style={{ color: "var(--color-muted)", marginTop: 2 }}>
          {post.author_role} · {post.read_time} read
        </div>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug);
  const { posts: allPosts } = useBlogIndex();

  // Prev / Next
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-canvas-alt)", paddingTop: "var(--nav-height)" }}>
      <NavBar />

      <div style={{ maxWidth: 740, margin: "0 auto", padding: "32px 24px 60px" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-muted)" }}>Loading post...</div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ color: "var(--color-loss)", marginBottom: 16 }}>Post not found.</div>
            <button onClick={() => navigate("/blog")} style={{
              background: "var(--color-primary)", color: "#fff",
              border: "none", borderRadius: "var(--radius-full)", padding: "10px 20px",
              fontWeight: 600, cursor: "pointer",
            }}>Back to Blog</button>
          </div>
        )}

        {!loading && !error && post && (
          <>
            {/* Back button */}
            <button onClick={() => navigate("/blog")} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-muted)", fontSize: 13, fontWeight: 500,
              marginBottom: 24, padding: 0,
            }}>
              ← Back to Blog
            </button>

            {/* Post header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                  color: post.tag_color || "#0EA5E9",
                  background: `${post.tag_color || "#0EA5E9"}18`,
                  borderRadius: "var(--radius-full)", padding: "3px 10px",
                }}>{post.tag}</span>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>·</span>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>{post.read_time}</span>
              </div>
              <h1 style={{
                fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800,
                color: "var(--color-ink)", lineHeight: 1.25, letterSpacing: "-0.5px",
                margin: "0 0 14px",
              }}>{post.title}</h1>
              <p style={{ color: "var(--color-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{post.summary}</p>
            </div>

            {/* Author card top */}
            <AuthorCard post={post} style={{ marginBottom: 28 }} />

            {/* Ad slot mid */}
            <div id="ad-slot-post-mid" />

            {/* Content */}
            <div style={{
              background: "var(--color-canvas)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "28px 32px",
              marginBottom: 28,
            }}>
              {(post.content || []).map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {/* Editor note (weekly) */}
            {post.editor_note && (
              <div style={{
                background: "#7C3AED10", border: "1px solid #7C3AED30",
                borderRadius: "var(--radius-md)", padding: "14px 18px", marginBottom: 20,
              }}>
                <div className="t-label" style={{ color: "#7C3AED", marginBottom: 4 }}>Editor's Note</div>
                <div className="t-caption" style={{ color: "var(--color-muted)" }}>{post.editor_note}</div>
              </div>
            )}

            {/* Author card bottom */}
            <AuthorCard post={post} style={{ marginBottom: 24 }} />

            {/* Ad slot bottom */}
            <div id="ad-slot-post-bottom" style={{ marginBottom: 24 }} />

            {/* Prev / Next navigation */}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {prevPost && (
                <button onClick={() => navigate(`/blog/${prevPost.slug}`)} style={{
                  flex: 1, textAlign: "left", background: "var(--color-canvas)",
                  border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)",
                  padding: "14px 16px", cursor: "pointer", transition: "all 0.12s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--color-canvas)"}
                >
                  <div className="t-label" style={{ color: "var(--color-muted)", marginBottom: 4 }}>← Previous Post</div>
                  <div className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{prevPost.title}</div>
                </button>
              )}
              {nextPost && (
                <button onClick={() => navigate(`/blog/${nextPost.slug}`)} style={{
                  flex: 1, textAlign: "right", background: "var(--color-canvas)",
                  border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)",
                  padding: "14px 16px", cursor: "pointer", transition: "all 0.12s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--color-canvas)"}
                >
                  <div className="t-label" style={{ color: "var(--color-muted)", marginBottom: 4 }}>Next Post →</div>
                  <div className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{nextPost.title}</div>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
