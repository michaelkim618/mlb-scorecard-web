// In-memory stand-in for the Supabase client, used only when VITE_USE_MOCK=1.
// Implements just the surface the app actually calls — see src/lib/supabase.js.
// State lives in module scope, so a page reload resets everything to the seed.

const now = Date.now();
const iso = (minsAgo) => new Date(now - minsAgo * 60000).toISOString();

// ── Seed ────────────────────────────────────────────────────────────
// Deliberately includes the adversarial content that broke mobile layout:
// a long unbroken URL token and a long unbroken display name.
export const MOCK_USERS = [
  { id: "u1", email: "normal.fan@example.com", username: "normal_fan" },
  {
    id: "u2",
    email: "bartholomew.longbottom.the.third.of.his.name@example.com",
    username: "Bartholomew_Longbottom_TheThirdOfHisName_2026",
  },
  { id: "u3", email: "a@b.co", username: "ab" },
];

const seed = () => ({
  profiles: MOCK_USERS.map((u) => ({ id: u.id, username: u.username, avatar_url: null })),
  comments: [
    {
      id: "c1", user_id: "u1", likes_count: 3, created_at: iso(5),
      content: "check this out https://mlbscorecard.example.com/analysis?ref=aVeryLongUnbrokenTrackingTokenABCDEF0123456789",
    },
    { id: "c2", user_id: "u2", likes_count: 1, created_at: iso(20), content: "short comment" },
    { id: "c3", user_id: "u3", likes_count: 7, created_at: iso(90), content: "LAD looked sharp tonight. Betts is locked in." },
    { id: "c4", user_id: "u1", likes_count: 0, created_at: iso(240), content: "Anyone else fading the Nats here?" },
  ],
  likes: [{ user_id: "u1", comment_id: "c3" }],
});

let db = seed();
let seq = 100;

// ── Realtime (postgres_changes + presence) ──────────────────────────
const tableSubs = new Set();
const notify = (table) => tableSubs.forEach((s) => s.table === table && s.cb({ table }));

// ── Auth ────────────────────────────────────────────────────────────
let session = null;
const authSubs = new Set();
const emitAuth = (event) => authSubs.forEach((cb) => cb(event, session));

function toAuthUser(u) {
  return { id: u.id, email: u.email, user_metadata: { full_name: u.username } };
}

export function mockSignInAs(userId) {
  const u = MOCK_USERS.find((x) => x.id === userId) || MOCK_USERS[0];
  session = { user: toAuthUser(u) };
  emitAuth("SIGNED_IN");
}

export function mockCurrentUserId() {
  return session?.user?.id ?? null;
}

export function mockReset() {
  db = seed();
  notify("comments");
}

// ── Query builder ───────────────────────────────────────────────────
// Thenable so both `await q` and `q.then(...)` work, matching the real client.
class Query {
  constructor(table) {
    this.table = table;
    this.filters = [];
    this.op = "select";
    this.cols = "*";
  }
  select(cols = "*") { this.cols = cols; return this; }
  insert(payload) { this.op = "insert"; this.payload = payload; return this; }
  update(patch) { this.op = "update"; this.payload = patch; return this; }
  delete() { this.op = "delete"; return this; }
  eq(col, val) { this.filters.push([col, val]); return this; }
  order(col, { ascending = true } = {}) { this.sort = { col, ascending }; return this; }
  limit(n) { this.max = n; return this; }
  single() { this.singleRow = true; return this; }

  match(row) {
    return this.filters.every(([c, v]) => row[c] === v);
  }

  run() {
    const rows = db[this.table] || [];

    if (this.op === "insert") {
      const list = Array.isArray(this.payload) ? this.payload : [this.payload];
      list.forEach((r) => rows.push({
        id: r.id ?? `gen-${++seq}`,
        created_at: r.created_at ?? new Date().toISOString(),
        likes_count: r.likes_count ?? 0,
        ...r,
      }));
      notify(this.table);
      return { data: list, error: null };
    }

    if (this.op === "update") {
      rows.filter((r) => this.match(r)).forEach((r) => Object.assign(r, this.payload));
      notify(this.table);
      return { data: null, error: null };
    }

    if (this.op === "delete") {
      db[this.table] = rows.filter((r) => !this.match(r));
      notify(this.table);
      return { data: null, error: null };
    }

    let out = rows.filter((r) => this.match(r));
    if (this.sort) {
      const { col, ascending } = this.sort;
      out = [...out].sort((a, b) =>
        (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (ascending ? 1 : -1));
    }
    if (this.max != null) out = out.slice(0, this.max);

    // Emulate the embedded resource in `*, profiles(username, avatar_url)`
    if (this.cols.includes("profiles(")) {
      out = out.map((r) => ({
        ...r,
        profiles: db.profiles.find((p) => p.id === r.user_id) ?? null,
      }));
    }

    return { data: this.singleRow ? (out[0] ?? null) : out, error: null };
  }

  then(resolve, reject) {
    return Promise.resolve().then(() => this.run()).then(resolve, reject);
  }
}

// ── Channel ─────────────────────────────────────────────────────────
function makeChannel(name) {
  const presence = { [name]: [{}] };
  const ch = {
    on(kind, opts, cb) {
      if (kind === "postgres_changes") tableSubs.add({ table: opts.table, cb, ch });
      else if (kind === "presence") ch._presenceCb = cb;
      return ch;
    },
    subscribe(cb) {
      Promise.resolve().then(() => {
        cb?.("SUBSCRIBED");
        ch._presenceCb?.();
      });
      return ch;
    },
    track: async () => {},
    presenceState: () => presence,
  };
  return ch;
}

// ── Client ──────────────────────────────────────────────────────────
export const mockSupabase = {
  from: (table) => new Query(table),
  channel: (name) => makeChannel(name),
  removeChannel: (ch) => {
    [...tableSubs].forEach((s) => s.ch === ch && tableSubs.delete(s));
  },
  auth: {
    getSession: async () => ({ data: { session } }),
    onAuthStateChange: (cb) => {
      authSubs.add(cb);
      return { data: { subscription: { unsubscribe: () => authSubs.delete(cb) } } };
    },
    // The app calls signInWithOAuth({ provider: "google" }); there is no OAuth
    // here, so sign in as whoever the dev switcher last picked, else the first user.
    signInWithOAuth: async () => mockSignInAs(session?.user?.id ?? MOCK_USERS[0].id),
    signOut: async () => { session = null; emitAuth("SIGNED_OUT"); },
  },
};
