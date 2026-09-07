// Behaviour tests for the dev mock. It only earns its keep if it answers the
// same shapes the real client does, so each test mirrors a call the app makes.

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseAst } from "rolldown/parseAst";
import {
  mockSupabase as sb, mockSignInAs, mockReset, MOCK_USERS,
} from "../src/lib/supabaseMock.js";

const EMBED = "*, profiles(username, avatar_url)";
const newestFirst = (limit) =>
  sb.from("comments").select(EMBED).order("created_at", { ascending: false }).limit(limit);

beforeEach(() => {
  mockReset(); // resets seeded data and auth together
});

describe("reads", () => {
  test("Community.jsx: newest 3 with profiles embedded", async () => {
    const { data } = await newestFirst(3);
    assert.equal(data.length, 3);
    assert.equal(data[0].id, "c1", "newest first");
    assert.equal(data[0].profiles.username, "normal_fan", "embedded profile resolved");
  });

  test("CommunityPage.jsx: full list", async () => {
    const { data } = await newestFirst(100);
    assert.equal(data.length, 4);
  });

  test("useAuth.js: profiles.select().eq().single() returns one row, not an array", async () => {
    const { data } = await sb.from("profiles").select("*").eq("id", "u2").single();
    assert.ok(data && !Array.isArray(data));
    assert.equal(data.id, "u2");
  });

  test("seed still contains the layout-breaking content it exists to provide", async () => {
    const { data } = await newestFirst(100);
    assert.ok(
      data.some((c) => /\S{40,}/.test(c.content)),
      "expected a comment with a long unbroken token",
    );
    assert.ok(
      MOCK_USERS.some((u) => /^\S{40,}$/.test(u.username)),
      "expected a user with a long unbroken username",
    );
  });
});

describe("auth", () => {
  test("starts signed out", async () => {
    const { data: { session } } = await sb.auth.getSession();
    assert.equal(session, null);
  });

  test("sign in / sign out emit events and update the session", async () => {
    const events = [];
    const { data: { subscription } } = sb.auth.onAuthStateChange((e, s) =>
      events.push([e, s?.user?.id ?? null]));

    mockSignInAs("u2");
    assert.deepEqual(events.at(-1), ["SIGNED_IN", "u2"]);
    assert.equal((await sb.auth.getSession()).data.session.user.id, "u2");

    await sb.auth.signOut();
    assert.deepEqual(events.at(-1), ["SIGNED_OUT", null]);
    assert.equal((await sb.auth.getSession()).data.session, null);

    subscription.unsubscribe();
  });

  test("signInWithOAuth returns to the last picked user, not always the first", async () => {
    // The app's own "Sign in with Google" button routes here. signOut nulls the
    // session, so the last identity has to be tracked separately or the button
    // always lands on MOCK_USERS[0] and the long-username seed is unreachable.
    mockSignInAs("u2");
    await sb.auth.signOut();
    await sb.auth.signInWithOAuth({ provider: "google" });
    assert.equal((await sb.auth.getSession()).data.session.user.id, "u2");
  });

  test("signInWithOAuth defaults to the first user before any pick", async () => {
    await sb.auth.signInWithOAuth({ provider: "google" });
    assert.equal((await sb.auth.getSession()).data.session.user.id, MOCK_USERS[0].id);
  });

  test("unsubscribe stops events", async () => {
    let n = 0;
    const { data: { subscription } } = sb.auth.onAuthStateChange(() => n++);
    subscription.unsubscribe();
    mockSignInAs("u1");
    assert.equal(n, 0);
  });
});

describe("writes", () => {
  test("handlePost: insert adds a row with id and created_at", async () => {
    mockSignInAs("u2");
    await sb.from("comments").insert({ user_id: "u2", content: "posted from a test" });
    const { data } = await newestFirst(100);
    const posted = data.find((c) => c.content === "posted from a test");
    assert.ok(posted, "inserted row not found");
    assert.ok(posted.id && posted.created_at, "insert should fill id and created_at");
    assert.equal(data.length, 5);
  });

  test("handleLike: like, count update, then unlike", async () => {
    await sb.from("likes").insert({ user_id: "u2", comment_id: "c3" });
    await sb.from("comments").update({ likes_count: 8 }).eq("id", "c3");

    const { data: liked } = await sb.from("likes").select("comment_id").eq("user_id", "u2");
    assert.equal(liked.length, 1);
    const { data: c3 } = await sb.from("comments").select("*").eq("id", "c3").single();
    assert.equal(c3.likes_count, 8);

    await sb.from("likes").delete().eq("user_id", "u2").eq("comment_id", "c3");
    const { data: after } = await sb.from("likes").select("comment_id").eq("user_id", "u2");
    assert.equal(after.length, 0);
  });

  test("a write to an unmodelled table fails loudly", async () => {
    // Silently succeeding here is the worst thing a mock can do: the dev sees a
    // green write and an empty read, and debugs the wrong layer.
    // The query builder is a thenable, not a Promise, so await it inside async fns.
    await assert.rejects(
      async () => { await sb.from("bookmarks").insert({ user_id: "u1", game_id: "g1" }); },
      /unmodelled table "bookmarks"/,
    );
    await assert.rejects(
      async () => { await sb.from("commnets").select("*"); },
      /unmodelled table "commnets"/,
    );
  });

  test("fetchMyLikes: filters by user", async () => {
    const { data } = await sb.from("likes").select("comment_id").eq("user_id", "u1");
    assert.deepEqual(data.map((l) => l.comment_id), ["c3"]);
  });
});

describe("realtime", () => {
  test("postgres_changes fires on write and stops after removeChannel", async () => {
    let hits = 0;
    const ch = sb.channel("comments-page")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, () => hits++)
      .subscribe();

    await sb.from("comments").insert({ user_id: "u1", content: "triggers realtime" });
    assert.ok(hits >= 1, "expected a change notification");

    const before = hits;
    sb.removeChannel(ch);
    await sb.from("comments").insert({ user_id: "u1", content: "after unsubscribe" });
    assert.equal(hits, before, "removeChannel should stop notifications");
  });

  test("presence is keyed by the configured presence key, not the channel name", async () => {
    // Both call sites pass config.presence.key; the real client keys state by it.
    // Asserting only Object.keys(...).length hid the wrong shape here.
    let synced = false;
    const ch = sb.channel("online-home", { config: { presence: { key: "u2" } } });
    ch.on("presence", { event: "sync" }, () => { synced = true; })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") await ch.track({ online_at: "2026-09-06T00:00:00Z" });
      });

    await new Promise((r) => setTimeout(r, 10));
    assert.ok(synced, "presence sync never fired");

    const state = ch.presenceState();
    assert.deepEqual(Object.keys(state), ["u2"], "should key by presence key");
    assert.equal(state.u2[0].online_at, "2026-09-06T00:00:00Z", "track payload should be retained");
    sb.removeChannel(ch);
  });
});

describe("module hygiene", () => {
  test("importing the module does no work until it is used", () => {
    // Parsed, not pattern-matched. Three review rounds found holes in a
    // line-based regex — multi-line declarations, `export`, arrows in
    // parameter defaults — because text scanning cannot see structure.
    const src = readFileSync(new URL("../src/lib/supabaseMock.js", import.meta.url), "utf8");
    const ast = parseAst(src, { filename: "supabaseMock.js" });

    const PURE_CTORS = new Set(["Set", "Map", "WeakSet", "WeakMap"]);

    /** Does evaluating this expression at module scope do observable work? */
    function impure(node) {
      if (!node) return null;
      switch (node.type) {
        case "Literal":
        case "Identifier":
        case "ArrowFunctionExpression":
        case "FunctionExpression":
        case "ClassExpression":
          return null;
        case "ArrayExpression":
          return node.elements.map(impure).find(Boolean) ?? null;
        case "ObjectExpression":
          return node.properties.map((p) => impure(p.value)).find(Boolean) ?? null;
        case "TemplateLiteral":
          return node.expressions.map(impure).find(Boolean) ?? null;
        case "UnaryExpression":
          return impure(node.argument);
        case "BinaryExpression":
        case "LogicalExpression":
          return impure(node.left) ?? impure(node.right);
        case "NewExpression":
          // `new Set()` is pure; `new Thing(work())` is not.
          return PURE_CTORS.has(node.callee.name) && node.arguments.length === 0
            ? null
            : "new " + (node.callee.name ?? "?") + "()";
        case "CallExpression":
          return "a call";
        case "MemberExpression":
          // A property read can invoke a getter.
          return "member access";
        default:
          return node.type;
      }
    }

    const offenders = [];
    for (const node of ast.body) {
      const decl = node.type === "ExportNamedDeclaration" ? node.declaration : node;
      if (decl?.type !== "VariableDeclaration") continue;
      for (const d of decl.declarations) {
        const why = impure(d.init);
        if (why) offenders.push(`${d.id.name}: ${why}`);
      }
    }

    assert.deepEqual(offenders, [], `work runs at import time:\n${offenders.join("\n")}`);
  });

  test("mockReset restores the seed and signs out", async () => {
    // Data and auth reset together — clearing one and not the other left the
    // panel showing a user the mock had already forgotten.
    mockSignInAs("u2");
    await sb.from("comments").insert({ user_id: "u1", content: "scratch" });
    mockReset();

    const { data } = await sb.from("comments").select("*");
    assert.equal(data.length, 4);
    assert.equal((await sb.auth.getSession()).data.session, null, "reset should sign out");
  });
});
