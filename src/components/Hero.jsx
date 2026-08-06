import React from "react";
import { usePredictions } from "../hooks/usePredictions";
import { TEAM_COLORS } from "../data/mlbData";

/* ── 팀 매핑 ─────────────────────────────────────────────────── */
const TEAM_ABBR = {
  "Los Angeles Dodgers":"LAD","San Francisco Giants":"SF","San Diego Padres":"SD",
  "Arizona Diamondbacks":"ARI","Colorado Rockies":"COL","Los Angeles Angels":"LAA",
  "Athletics":"OAK","Oakland Athletics":"OAK","Seattle Mariners":"SEA",
  "Houston Astros":"HOU","Texas Rangers":"TEX","Kansas City Royals":"KC",
  "Minnesota Twins":"MIN","Chicago White Sox":"CWS","Cleveland Guardians":"CLE",
  "Detroit Tigers":"DET","Milwaukee Brewers":"MIL","Chicago Cubs":"CHC",
  "Cincinnati Reds":"CIN","Pittsburgh Pirates":"PIT","St. Louis Cardinals":"STL",
  "New York Yankees":"NYY","Boston Red Sox":"BOS","Tampa Bay Rays":"TB",
  "Baltimore Orioles":"BAL","Toronto Blue Jays":"TOR","Philadelphia Phillies":"PHI",
  "New York Mets":"NYM","Atlanta Braves":"ATL","Miami Marlins":"MIA",
  "Washington Nationals":"WSH",
};
const TEAM_CITY = {
  LAD:"Los Angeles",SF:"San Francisco",SD:"San Diego",ARI:"Arizona",COL:"Colorado",
  LAA:"Los Angeles",OAK:"Oakland",SEA:"Seattle",HOU:"Houston",TEX:"Texas",
  KC:"Kansas City",MIN:"Minnesota",CWS:"Chicago",CLE:"Cleveland",DET:"Detroit",
  MIL:"Milwaukee",CHC:"Chicago",CIN:"Cincinnati",PIT:"Pittsburgh",STL:"St. Louis",
  NYY:"New York",BOS:"Boston",TB:"Tampa Bay",BAL:"Baltimore",TOR:"Toronto",
  PHI:"Philadelphia",NYM:"New York",ATL:"Atlanta",MIA:"Miami",WSH:"Washington",
};
const TEAM_NICKNAME = {
  LAD:"Dodgers",SF:"Giants",SD:"Padres",ARI:"Diamondbacks",COL:"Rockies",
  LAA:"Angels",OAK:"Athletics",SEA:"Mariners",HOU:"Astros",TEX:"Rangers",
  KC:"Royals",MIN:"Twins",CWS:"White Sox",CLE:"Guardians",DET:"Tigers",
  MIL:"Brewers",CHC:"Cubs",CIN:"Reds",PIT:"Pirates",STL:"Cardinals",
  NYY:"Yankees",BOS:"Red Sox",TB:"Rays",BAL:"Orioles",TOR:"Blue Jays",
  PHI:"Phillies",NYM:"Mets",ATL:"Braves",MIA:"Marlins",WSH:"Nationals",
};

function abbr(full) { return TEAM_ABBR[full] || full.slice(0,3).toUpperCase(); }
function color(full) { return TEAM_COLORS[abbr(full)] || "#334155"; }

/* ── 오늘 날짜 (브라우저 로컬 기준) ─────────────────────────── */
const TODAY_DATE    = new Date().toLocaleDateString("en-CA");
const TODAY_DISPLAY = new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" });

/* ── 스탯 카드 (하단 3개) ────────────────────────────────────── */
function StatCard({ label, value, frac, bg, big }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 20,
      padding: big ? "20px 28px 22px" : "16px 22px 18px",
      width: big ? 210 : 180,
      transform: big ? "translateY(-24px)" : undefined,
      boxShadow: big ? "0 16px 48px rgba(0,0,0,0.22)" : "0 10px 28px rgba(0,0,0,0.16)",
      flexShrink: 0,
    }}>
      <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>
        {label}
      </div>
      <div style={{ display:"flex", alignItems:"flex-start", gap:2 }}>
        <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize: big ? 64 : 52, lineHeight:1, color:"#fff", letterSpacing:"-2px" }}>
          {value}
        </span>
        {frac && (
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize: big ? 28 : 24, lineHeight:1, color:"rgba(255,255,255,0.6)", marginTop: big ? 6 : 4 }}>
            {frac}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── 메인 ────────────────────────────────────────────────────── */
export default function Hero() {
  const { games, loading } = usePredictions(TODAY_DATE);

  /* 최고 신뢰도 게임 선택 */
  const topGame = React.useMemo(() => {
    if (!games || games.length === 0) return null;
    const valid = games.filter(g => g.win_prob);
    if (valid.length === 0) return games[0];
    const consensus = valid.find(g => g.consensus === true);
    if (consensus) return consensus;
    return valid.reduce((best, g) => {
      const bMax = Math.max(best.win_prob.away, best.win_prob.home);
      const gMax = Math.max(g.win_prob.away, g.win_prob.home);
      return gMax > bMax ? g : best;
    }, valid[0]);
  }, [games]);

  /* 로딩 */
  if (loading) {
    return (
      <section style={{ background:"#fff", borderBottom:"1px solid var(--color-border)", height:200, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"var(--color-muted)", fontSize:14 }}>Loading today's top pick…</span>
      </section>
    );
  }
  if (!topGame) {
    return (
      <section style={{ background:"#fff", borderBottom:"1px solid var(--color-border)", padding:"40px 32px", textAlign:"center" }}>
        <span style={{ color:"var(--color-muted)", fontSize:14 }}>No games scheduled for today.</span>
      </section>
    );
  }

  /* 데이터 파싱 */
  const awayFull = topGame.away || "";
  const homeFull = topGame.home || "";
  const awayAbbr = abbr(awayFull);
  const homeAbbr = abbr(homeFull);
  const awayColor = color(awayFull);
  const homeColor = color(homeFull);

  const awayPct = topGame.win_prob?.away ?? 50;
  const homePct = topGame.win_prob?.home ?? 50;
  const pickIsHome = homePct >= awayPct;
  const pickAbbr   = pickIsHome ? homeAbbr  : awayAbbr;
  const pickPct    = pickIsHome ? homePct   : awayPct;

  /* 어웨이 SP (픽팀이 away면 away SP가 주인공) */
  const pickPitcherName  = pickIsHome ? (topGame.home_pitcher || "TBD") : (topGame.away_pitcher || "TBD");
  const oppPitcherName   = pickIsHome ? (topGame.away_pitcher || "TBD") : (topGame.home_pitcher || "TBD");

  const pickSpDetail     = pickIsHome
    ? topGame.scorecard?.home?.sp_detail
    : topGame.scorecard?.away?.sp_detail;
  const oppSpDetail      = pickIsHome
    ? topGame.scorecard?.away?.sp_detail
    : topGame.scorecard?.home?.sp_detail;

  const pickEraRaw = pickSpDetail?.era  ?? topGame[pickIsHome ? "home_pitcher_stats" : "away_pitcher_stats"]?.era ?? "--";
  const pickWhip   = pickSpDetail?.whip ?? "--";
  const pickK9     = pickSpDetail?.k9   ?? "--";
  const pickTrend  = pickSpDetail?.trend ?? "stable";

  const oppEraRaw  = oppSpDetail?.era   ?? topGame[pickIsHome ? "away_pitcher_stats" : "home_pitcher_stats"]?.era ?? "--";
  const oppTrend   = oppSpDetail?.trend ?? "stable";

  /* ERA 표시 포맷 (2.85 → value="2" frac=".85") */
  function splitEra(raw) {
    const s = typeof raw === "number" ? raw.toFixed(2) : String(raw);
    const parts = s.split(".");
    return { int: parts[0] ?? "--", dec: parts[1] ? `.${parts[1]}` : "" };
  }
  function splitFloat(raw) {
    const s = typeof raw === "number" ? raw.toFixed(2) : String(raw);
    const parts = s.split(".");
    return { int: parts[0] ?? "--", dec: parts[1] ? `.${parts[1]}` : "" };
  }

  const pickEra   = splitEra(pickEraRaw);
  const pickWhipF = splitFloat(pickWhip);
  const pickK9F   = splitFloat(pickK9);

  /* 트렌드 뱃지 */
  function trendBadge(trend) {
    if (trend === "hot")  return { label:"🔥 HOT",  bg:"#FEF3C7", fg:"#92400E" };
    if (trend === "cold") return { label:"❄️ COLD", bg:"#FEE2E2", fg:"#991B1B" };
    return { label:"📊 OK", bg:"#F1F5F9", fg:"#475569" };
  }
  const pickBadge = trendBadge(pickTrend);
  const oppBadge  = trendBadge(oppTrend);

  /* 레코드 */
  const awayW = topGame.away_standing?.wins   ?? "--";
  const awayL = topGame.away_standing?.losses ?? "--";
  const homeW = topGame.home_standing?.wins   ?? "--";
  const homeL = topGame.home_standing?.losses ?? "--";

  /* 픽팀 기준 */
  const pickW = pickIsHome ? homeW : awayW;
  const pickL = pickIsHome ? homeL : awayL;
  const pickColor_ = pickIsHome ? homeColor : awayColor;
  const pickCityFull = TEAM_CITY[pickAbbr] || "";
  const pickNickFull = TEAM_NICKNAME[pickAbbr] || "";

  /* 첫자/성 분리 */
  const nameParts = pickPitcherName.split(" ");
  const spFirst = nameParts[0] || "";
  const spLast  = nameParts.slice(1).join(" ") || "";

  /* 오퍼넌트 정보 */
  const oppAbbr  = pickIsHome ? awayAbbr : homeAbbr;
  const oppCity  = TEAM_CITY[oppAbbr] || "";

  /* 워드마크(배경 팀명) */
  const bgWord = pickNickFull.toUpperCase();

  return (
    <section style={{ background:"#fff", borderBottom:"1px solid var(--color-border)", overflow:"hidden" }}>

      {/* ── 헤더 ── */}
      <div style={{ maxWidth:"var(--max-width)", margin:"0 auto", padding:"28px 32px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{
            background:"linear-gradient(135deg, #F59E0B, #D97706)",
            color:"#fff", borderRadius:"var(--radius-full)",
            padding:"4px 14px", fontSize:11, fontWeight:700, letterSpacing:"0.8px",
            textTransform:"uppercase", boxShadow:"0 2px 10px rgba(245,158,11,0.35)",
          }}>
            ⭐ Today's High Confidence Pick
          </span>
          <span className="t-caption" style={{ color:"var(--color-muted)" }}>{TODAY_DISPLAY}</span>
        </div>
        <span className="t-caption" style={{ color:"var(--color-muted)" }}>
          {topGame.game_time ? `${topGame.game_time} · ` : ""}{awayAbbr} @ {homeAbbr}
        </span>
      </div>

      {/* ── 스테이지 ── */}
      <div style={{ position:"relative", height:520, maxWidth:"var(--max-width)", margin:"0 auto", padding:"0 32px" }}>

        {/* 배경 워드마크 */}
        <div style={{
          position:"absolute", left:0, right:0, top:24,
          textAlign:"center", pointerEvents:"none", zIndex:0, overflow:"hidden",
        }}>
          <span style={{
            fontFamily:"var(--font-display)", fontWeight:900,
            fontSize:200, lineHeight:0.85, letterSpacing:"-10px",
            color: pickColor_, opacity:0.07, whiteSpace:"nowrap",
            userSelect:"none",
          }}>
            {bgWord}
          </span>
        </div>

        {/* 선수 사진 영역 (중앙) — MLB headshot (없으면 generic) */}
        <div style={{
          position:"absolute", left:"50%", transform:"translateX(-50%)",
          bottom:0, zIndex:1, pointerEvents:"none", width:380,
        }}>
          {/* 글로우 헤일로 */}
          <div style={{
            position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)",
            width:320, height:320, borderRadius:"50%",
            background:`radial-gradient(circle, ${pickColor_}22 0%, transparent 70%)`,
            filter:"blur(32px)",
          }} />
          {/* 사진 */}
          <div style={{ position:"relative" }}>
            <img
              src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_640,q_auto:best/v1/people/${topGame.away_pitcher_id || topGame.home_pitcher_id || "generic"}/headshot/67/current`}
              alt={pickPitcherName}
              style={{ width:"100%", height:460, objectFit:"cover", objectPosition:"top center", borderRadius:"28px 28px 0 0", display:"block" }}
              onError={e => {
                e.target.src = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_640,q_auto:best/v1/people/1/headshot/67/current";
                e.target.onerror = null;
              }}
            />
            {/* 하단 페이드 */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:160, background:"linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }} />
          </div>
        </div>

        {/* ── 왼쪽 패널: 투수 정보 ── */}
        <div style={{ position:"absolute", left:32, top:36, width:280, zIndex:2 }}>
          {/* 팀 도트 + 이름 */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ width:10, height:10, borderRadius:"50%", background:pickColor_, flexShrink:0 }} />
            <span className="t-caption-strong" style={{ color:pickColor_ }}>{pickCityFull} {pickNickFull}</span>
            <span className="t-caption" style={{ color:"var(--color-muted)" }}>{pickW}-{pickL}</span>
          </div>

          {/* SP 이니셜 (저지번호 대신) */}
          <div style={{
            fontFamily:"var(--font-display)", fontWeight:900,
            fontSize:110, lineHeight:0.85, letterSpacing:"-5px",
            color: pickColor_, marginBottom:10, opacity:0.85,
          }}>
            {spFirst.slice(0,1)}{spLast.slice(0,1) || ""}
          </div>

          {/* 이름 */}
          <div style={{ marginBottom:14 }}>
            <div className="t-display-lg" style={{ color:"var(--color-ink)", lineHeight:1.05 }}>
              {spFirst}
            </div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:40, lineHeight:1.0, color:"var(--color-ink)", letterSpacing:"-1px" }}>
              {spLast}
            </div>
          </div>

          {/* 포지션 + 트렌드 */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", border:"1px solid var(--color-border)", borderRadius:"var(--radius-full)" }}>
            <span className="t-caption" style={{ color:"var(--color-muted)" }}>SP · Starting Pitcher</span>
            <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", background:pickBadge.bg, color:pickBadge.fg, borderRadius:"var(--radius-full)" }}>
              {pickBadge.label}
            </span>
          </div>
        </div>

        {/* ── 오른쪽 패널: 매치업 + 예측 ── */}
        <div style={{ position:"absolute", right:32, top:36, width:272, zIndex:2 }}>
          {/* 매치업 팩트 그리드 */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            {[
              { label:"ERA (Season)", value: typeof pickEraRaw === "number" ? pickEraRaw.toFixed(2) : pickEraRaw },
              { label:"K/9",          value: typeof pickK9 === "number" ? pickK9.toFixed(1) : pickK9 },
              { label:"Opponent",    value: oppAbbr, sub: oppCity, color: pickIsHome ? awayColor : homeColor },
              { label:"Season",      value:`${pickW}-${pickL}` },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ fontSize:9, fontWeight:700, color:"var(--color-subtle)", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:4 }}>
                  {f.label}
                </div>
                <div className="t-caption-strong" style={{ color:f.color || "var(--color-ink)" }}>{f.value}</div>
                {f.sub && <div className="t-micro" style={{ color:"var(--color-muted)" }}>{f.sub}</div>}
              </div>
            ))}
          </div>

          {/* 예측 카드 */}
          <div style={{ background:pickColor_, borderRadius:18, padding:"18px 20px", boxShadow:`0 12px 36px ${pickColor_}35` }}>
            <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:10 }}>
              Model Prediction
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:12 }}>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:36, color:"#fff", lineHeight:1 }}>
                {pickPct.toFixed(0)}%
              </span>
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:20 }}>–</span>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:36, color:"rgba(255,255,255,0.45)", lineHeight:1 }}>
                {(100 - pickPct).toFixed(0)}%
              </span>
              <span className="t-micro" style={{ color:"rgba(255,255,255,0.5)", marginLeft:"auto" }}>
                {awayAbbr} @ {homeAbbr}
              </span>
            </div>
            {/* 확률 바 */}
            <div style={{ height:7, borderRadius:"var(--radius-full)", background:"rgba(255,255,255,0.2)", overflow:"hidden", marginBottom:10 }}>
              <div style={{ height:"100%", width:`${pickPct}%`, background:"#fff", borderRadius:"var(--radius-full)" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>Pick: {pickAbbr}</span>
              {topGame.edge != null && (
                <span style={{ fontSize:11, color:"#fff", fontWeight:600 }}>+{Number(topGame.edge).toFixed(1)}%p edge</span>
              )}
            </div>
          </div>

          {/* 상대 SP 카드 */}
          <div style={{ marginTop:14, background:"var(--color-canvas-muted)", borderRadius:12, padding:"12px 14px", border:"1px solid var(--color-border)" }}>
            <div style={{ fontSize:9, fontWeight:700, color:"var(--color-subtle)", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>
              vs · {oppAbbr} SP
            </div>
            <div className="t-caption-strong" style={{ color: pickIsHome ? awayColor : homeColor, marginBottom:4 }}>{oppPitcherName}</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span className="t-caption" style={{ color:"var(--color-muted)" }}>ERA {typeof oppEraRaw === "number" ? oppEraRaw.toFixed(2) : oppEraRaw}</span>
              <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:"var(--radius-full)", background:oppBadge.bg, color:oppBadge.fg }}>
                {oppBadge.label}
              </span>
            </div>
          </div>
        </div>

        {/* ── 하단 스탯 카드 3개 ── */}
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"flex-end", gap:16, zIndex:3 }}>
          <StatCard label="ERA · Season"  value={pickEra.int}   frac={pickEra.dec}   bg={`${pickColor_}cc`} />
          <StatCard label="K/9 · Season"  value={pickK9F.int}   frac={pickK9F.dec}   bg={pickColor_} big />
          <StatCard label="WHIP"          value={pickWhipF.int} frac={pickWhipF.dec} bg={`${pickColor_}cc`} />
        </div>

      </div>
    </section>
  );
}
