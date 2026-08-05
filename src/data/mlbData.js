/* ============================================================
   MLB Scorecard — Mock Data (wire predictions.json API here)
   ============================================================ */

export const TODAY = "August 5, 2026";
export const TODAY_SHORT = "AUG 5";
export const SEASON_RECORD = { wins: 13, losses: 2 };
export const SEASON_PCT = ((13 / 15) * 100).toFixed(1); // "86.7"

/* --- Team colors ------------------------------------------- */
export const TEAM_COLORS = {
  LAD: "#005A9C", SF:  "#FD5A1E", SD:  "#2F241D", ARI: "#A71930",
  COL: "#33006F", LAA: "#BA0021", OAK: "#003831", SEA: "#0C2C56",
  HOU: "#EB6E1F", TEX: "#003278", KC:  "#004687", MIN: "#002B5C",
  CWS: "#27251F", CLE: "#00385D", DET: "#0C2340", MIL: "#FFC52F",
  CHC: "#0E3386", CIN: "#C6011F", PIT: "#FDB827", STL: "#C41E3A",
  NYY: "#003087", BOS: "#BD3039", TB:  "#092C5C", BAL: "#DF4601",
  TOR: "#134A8E", PHI: "#E81828", NYM: "#002D72", ATL: "#CE1141",
  MIA: "#00A3E0", WSH: "#AB0003",
};

export const TEAM_ALT = {
  MIL: "#12284B", DET: "#FA4616", CWS: "#C4162A",
};

/* --- Today's Top Pick (고신뢰) ------------------------------ */
export const TOP_PICK = {
  away: { abbr: "BOS", name: "Red Sox",     city: "Boston",       color: TEAM_COLORS.BOS, rec: "58-49" },
  home: { abbr: "CWS", name: "White Sox",   city: "Chicago",      color: TEAM_COLORS.CWS, rec: "27-79" },
  awayProb: 67,
  homeProb: 33,
  pick: "BOS",
  pickProb: 67,
  awayPitcher: { name: "Garrett Crochet", era: "2.85", status: "HOT",  player_id: 676979 },
  homePitcher: { name: "Sean Burke",      era: "5.12", status: "COLD", player_id: 680732 },
  scorecard: { sp: 72, bp: 68, bat: 75, sit: 65 },
  gameTime: "7:10 PM ET",
  network: "NESN",
  notes: "BOS 5연승 · CWS 리그 최다 패 · 불펜 우위",
  edge: 4.2,   // vs Kalshi
  bat_source: "lineup",
};

/* --- Today's Full Slate ------------------------------------ */
export const TODAYS_GAMES = [
  {
    away: { abbr: "LAA", name: "Angels",    city: "Los Angeles", color: TEAM_COLORS.LAA, rec: "39-68", rank: "#27" },
    home: { abbr: "BAL", name: "Orioles",   city: "Baltimore",   color: TEAM_COLORS.BAL, rec: "62-45", rank: "#5"  },
    awayProb: 38, homeProb: 62, pick: "BAL", gameTime: "7:05 PM", network: "MASN",
    notes: "BAL 홈 강세", correct: true,
  },
  {
    away: { abbr: "NYM", name: "Mets",      city: "New York",    color: TEAM_COLORS.NYM, rec: "61-47", rank: "#6"  },
    home: { abbr: "CLE", name: "Guardians", city: "Cleveland",   color: TEAM_COLORS.CLE, rec: "59-49", rank: "#9"  },
    awayProb: 53, homeProb: 47, pick: "NYM", gameTime: "7:10 PM", network: "STO",
    notes: "NYM 선발 우위", correct: true,
  },
  {
    away: { abbr: "OAK", name: "Athletics", city: "Oakland",     color: TEAM_COLORS.OAK, rec: "38-69", rank: "#28" },
    home: { abbr: "CIN", name: "Reds",      city: "Cincinnati",  color: TEAM_COLORS.CIN, rec: "55-52", rank: "#16" },
    awayProb: 37, homeProb: 63, pick: "CIN", gameTime: "6:40 PM", network: "BSOH",
    notes: "CIN 타선 우세", correct: true,
  },
  {
    away: { abbr: "WSH", name: "Nationals", city: "Washington",  color: TEAM_COLORS.WSH, rec: "33-74", rank: "#29" },
    home: { abbr: "PHI", name: "Phillies",  city: "Philadelphia",color: TEAM_COLORS.PHI, rec: "67-41", rank: "#2"  },
    awayProb: 37, homeProb: 63, pick: "PHI", gameTime: "7:05 PM", network: "NBCSP",
    notes: "PHI 홈 7연승", correct: true,
  },
  {
    away: { abbr: "STL", name: "Cardinals", city: "St. Louis",   color: TEAM_COLORS.STL, rec: "44-63", rank: "#23" },
    home: { abbr: "NYY", name: "Yankees",   city: "New York",    color: TEAM_COLORS.NYY, rec: "64-43", rank: "#3"  },
    awayProb: 36, homeProb: 64, pick: "NYY", gameTime: "7:05 PM", network: "YES",
    notes: "NYY 선발 Cole", correct: true,
  },
  {
    away: { abbr: "CWS", name: "White Sox", city: "Chicago",     color: TEAM_COLORS.CWS, rec: "27-79", rank: "#30" },
    home: { abbr: "BOS", name: "Red Sox",   city: "Boston",      color: TEAM_COLORS.BOS, rec: "58-49", rank: "#14" },
    awayProb: 33, homeProb: 67, pick: "BOS", gameTime: "7:10 PM", network: "NESN",
    notes: "⭐ 고신뢰", correct: null,  // today
    isTopPick: true,
  },
  {
    away: { abbr: "MIA", name: "Marlins",   city: "Miami",       color: TEAM_COLORS.MIA, rec: "32-75", rank: "#29" },
    home: { abbr: "ATL", name: "Braves",    city: "Atlanta",     color: TEAM_COLORS.ATL, rec: "65-42", rank: "#3"  },
    awayProb: 28, homeProb: 72, pick: "ATL", gameTime: "7:20 PM", network: "BSSE",
    notes: "ATL 압도적 우위", correct: null,
  },
  {
    away: { abbr: "MIN", name: "Twins",     city: "Minnesota",   color: TEAM_COLORS.MIN, rec: "51-56", rank: "#19" },
    home: { abbr: "KC",  name: "Royals",    city: "Kansas City", color: TEAM_COLORS.KC,  rec: "56-51", rank: "#15" },
    awayProb: 45, homeProb: 55, pick: "KC", gameTime: "8:10 PM", network: "BSKC",
    notes: "KC 홈 우세", correct: null,
  },
];

/* --- Season Stats ------------------------------------------ */
export const SEASON_STATS = [
  { label: "Overall", wins: 13, losses: 2, pct: 86.7 },
  { label: "60%+ picks", wins: 11, losses: 1, pct: 91.7 },
  { label: "⭐ 고신뢰", wins: 8, losses: 0, pct: 100.0 },
  { label: "Home fav", wins: 9, losses: 1, pct: 90.0 },
];

/* --- News -------------------------------------------------- */
export const NEWS = [
  {
    tag: "Injury",
    title: "Shohei Ohtani exits early with forearm tightness",
    summary: "LAD's superstar left Tuesday's game after 4 innings. MRI results expected Wednesday.",
    time: "2h ago",
    color: "#DC2626",
  },
  {
    tag: "Trade",
    title: "Cubs acquire reliever from Tigers at deadline",
    summary: "Chicago bolsters bullpen heading into second-half push with top-10 bullpen ERA addition.",
    time: "4h ago",
    color: "#0E3386",
  },
  {
    tag: "Standings",
    title: "Phillies extend NL East lead to 8.5 games",
    summary: "PHI's 7th straight home win pushes division gap to season-high. Wheeler dominant.",
    time: "6h ago",
    color: "#E81828",
  },
  {
    tag: "Hot Streak",
    title: "Astros win 6 straight, closing in on AL West lead",
    summary: "Houston's rotation has allowed just 2 ER over last 3 games. Bullpen ERA 1.84 in July.",
    time: "8h ago",
    color: "#EB6E1F",
  },
];

/* --- Blog -------------------------------------------------- */
export const BLOG_POSTS = [
  {
    date: "AUG 4",
    title: "8/4 결과 분석: 13W-2L, 역대 최고 성적",
    summary: "13경기 예측 성공, 시즌 최고 단일일 성적. 어떤 요소가 성공을 만들었나.",
    tag: "결과 분석",
    readTime: "3 min",
  },
  {
    date: "AUG 3",
    title: "에두아르도 로드리게스의 패턴: 붕괴→회복→최고→붕괴",
    summary: "ARI 선발의 5경기 ERA 추이를 분석. 구속 저하와 피안타율의 상관관계.",
    tag: "선발 분석",
    readTime: "5 min",
  },
  {
    date: "AUG 1",
    title: "고신뢰(⭐) 픽의 조건: 4가지 기준 완전 해설",
    summary: "라인업 확정 + 모델 60%↑ + Kalshi 동의 + edge ≤8%p. 왜 이 기준인가.",
    tag: "방법론",
    readTime: "4 min",
  },
];

/* --- Community Comments (mock) ----------------------------- */
export const COMMUNITY = [
  {
    user: "ScoreCardFan",
    avatar: "S",
    color: "#0EA5E9",
    text: "BOS 픽 동의합니다. Crochet 폼 진짜 좋아요. 오늘도 완봉은 아니더라도 7이닝 2실점 이내 갈 거 같아요",
    time: "10m ago",
    likes: 12,
  },
  {
    user: "BaseballNerd",
    avatar: "B",
    color: "#F59E0B",
    text: "PHI 픽도 강하게 동의. WSH 원정에서 PHI 홈이면 얘기가 달라지죠. Wheeler 선발이면 더욱.",
    time: "23m ago",
    likes: 8,
  },
  {
    user: "MLBAnalyst",
    avatar: "M",
    color: "#16A34A",
    text: "어제 13승 2패 진짜 대박이었음. 특히 DET vs SEA 맞춘 거 신기했어요. 모델 근거 궁금합니다",
    time: "45m ago",
    likes: 19,
  },
];
