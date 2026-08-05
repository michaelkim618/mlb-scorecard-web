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
  notes: "BOS 5-game win streak · CWS most losses in league · Bullpen edge",
  edge: 4.2,   // vs Kalshi
  bat_source: "lineup",
};

/* --- Today's Full Slate ------------------------------------ */
export const TODAYS_GAMES = [
  {
    away: { abbr: "LAA", name: "Angels",    city: "Los Angeles", color: TEAM_COLORS.LAA, rec: "39-68", rank: "#27" },
    home: { abbr: "BAL", name: "Orioles",   city: "Baltimore",   color: TEAM_COLORS.BAL, rec: "62-45", rank: "#5"  },
    awayProb: 38, homeProb: 62, pick: "BAL", gameTime: "7:05 PM", network: "MASN",
    notes: "BAL strong at home", correct: true,
  },
  {
    away: { abbr: "NYM", name: "Mets",      city: "New York",    color: TEAM_COLORS.NYM, rec: "61-47", rank: "#6"  },
    home: { abbr: "CLE", name: "Guardians", city: "Cleveland",   color: TEAM_COLORS.CLE, rec: "59-49", rank: "#9"  },
    awayProb: 53, homeProb: 47, pick: "NYM", gameTime: "7:10 PM", network: "STO",
    notes: "NYM SP advantage", correct: true,
  },
  {
    away: { abbr: "OAK", name: "Athletics", city: "Oakland",     color: TEAM_COLORS.OAK, rec: "38-69", rank: "#28" },
    home: { abbr: "CIN", name: "Reds",      city: "Cincinnati",  color: TEAM_COLORS.CIN, rec: "55-52", rank: "#16" },
    awayProb: 37, homeProb: 63, pick: "CIN", gameTime: "6:40 PM", network: "BSOH",
    notes: "CIN batting advantage", correct: true,
  },
  {
    away: { abbr: "WSH", name: "Nationals", city: "Washington",  color: TEAM_COLORS.WSH, rec: "33-74", rank: "#29" },
    home: { abbr: "PHI", name: "Phillies",  city: "Philadelphia",color: TEAM_COLORS.PHI, rec: "67-41", rank: "#2"  },
    awayProb: 37, homeProb: 63, pick: "PHI", gameTime: "7:05 PM", network: "NBCSP",
    notes: "PHI 7-game home win streak", correct: true,
  },
  {
    away: { abbr: "STL", name: "Cardinals", city: "St. Louis",   color: TEAM_COLORS.STL, rec: "44-63", rank: "#23" },
    home: { abbr: "NYY", name: "Yankees",   city: "New York",    color: TEAM_COLORS.NYY, rec: "64-43", rank: "#3"  },
    awayProb: 36, homeProb: 64, pick: "NYY", gameTime: "7:05 PM", network: "YES",
    notes: "NYY SP: Cole", correct: true,
  },
  {
    away: { abbr: "CWS", name: "White Sox", city: "Chicago",     color: TEAM_COLORS.CWS, rec: "27-79", rank: "#30" },
    home: { abbr: "BOS", name: "Red Sox",   city: "Boston",      color: TEAM_COLORS.BOS, rec: "58-49", rank: "#14" },
    awayProb: 33, homeProb: 67, pick: "BOS", gameTime: "7:10 PM", network: "NESN",
    notes: "⭐ High Confidence", correct: null,  // today
    isTopPick: true,
  },
  {
    away: { abbr: "MIA", name: "Marlins",   city: "Miami",       color: TEAM_COLORS.MIA, rec: "32-75", rank: "#29" },
    home: { abbr: "ATL", name: "Braves",    city: "Atlanta",     color: TEAM_COLORS.ATL, rec: "65-42", rank: "#3"  },
    awayProb: 28, homeProb: 72, pick: "ATL", gameTime: "7:20 PM", network: "BSSE",
    notes: "ATL overwhelming advantage", correct: null,
  },
  {
    away: { abbr: "MIN", name: "Twins",     city: "Minnesota",   color: TEAM_COLORS.MIN, rec: "51-56", rank: "#19" },
    home: { abbr: "KC",  name: "Royals",    city: "Kansas City", color: TEAM_COLORS.KC,  rec: "56-51", rank: "#15" },
    awayProb: 45, homeProb: 55, pick: "KC", gameTime: "8:10 PM", network: "BSKC",
    notes: "KC home advantage", correct: null,
  },
];

/* --- Season Stats ------------------------------------------ */
export const SEASON_STATS = [
  { label: "Overall", wins: 13, losses: 2, pct: 86.7 },
  { label: "60%+ picks", wins: 11, losses: 1, pct: 91.7 },
  { label: "⭐ High Confidence", wins: 8, losses: 0, pct: 100.0 },
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
    title: "8/4 Results: 13W-2L, Best Single-Day Record",
    summary: "13 correct predictions, the best single-day result of the season. What factors drove the success?",
    tag: "Results",
    readTime: "3 min",
  },
  {
    date: "AUG 3",
    title: "Eduardo Rodriguez's Pattern: Collapse → Recovery → Peak → Collapse",
    summary: "Analyzing the ARI starter's 5-game ERA trend. The correlation between velocity decline and BABIP.",
    tag: "SP Analysis",
    readTime: "5 min",
  },
  {
    date: "AUG 1",
    title: "High Confidence (⭐) Pick Criteria: A Complete Breakdown",
    summary: "Confirmed lineup + model 60%↑ + Kalshi agreement + edge ≤8%p. Why these four conditions?",
    tag: "Methodology",
    readTime: "4 min",
  },
];

/* --- Community Comments (mock) ----------------------------- */
export const COMMUNITY = [
  {
    user: "ScoreCardFan",
    avatar: "S",
    color: "#0EA5E9",
    text: "Agree on the BOS pick. Crochet has been on fire. I don't see a complete game but I'd expect 7 innings, 2 ER or better.",
    time: "10m ago",
    likes: 12,
  },
  {
    user: "BaseballNerd",
    avatar: "B",
    color: "#F59E0B",
    text: "Strong agree on PHI too. Home at Citizens Bank vs WSH is totally different than a road series. Wheeler on the mound seals it.",
    time: "23m ago",
    likes: 8,
  },
  {
    user: "MLBAnalyst",
    avatar: "M",
    color: "#16A34A",
    text: "13W-2L yesterday was incredible. Especially DET vs SEA — wasn't expecting that one. Curious what the model's edge was there.",
    time: "45m ago",
    likes: 19,
  },
];
