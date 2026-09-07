// Behaviour tests for the dev mock. It only earns its keep if it answers the
// same shapes the real client does, so each test mirrors a call the app makes.

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  mockSupabase as sb, mockSignInAs, mockReset, MOCK_USERS,
} from "../src/lib/supabaseMock.js";

const EMBED = "*, profiles(username, avatar_url)";
const newestFirst = (limit) =>
  sb.from("comments").select(EMBED).order("created_at", { ascending: false }).limit(limit);

beforeEach(async () => {
  mockReset();
  await sb.auth.signOut();
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

  test("presence sync fires and presenceState is keyed", async () => {
    let synced = false;
    const ch = sb.channel("online-home");
    ch.on("presence", { event: "sync" }, () => { synced = true; })
      .subscribe(async (status) => { if (status === "SUBSCRIBED") await ch.track({}); });

    await new Promise((r) => setTimeout(r, 10));
    assert.ok(synced, "presence sync never fired");
    assert.equal(Object.keys(ch.presenceState()).length, 1);
    sb.removeChannel(ch);
  });
});

describe("module hygiene", () => {
  test("importing the module does no work until it is used", async () => {
    // This is what lets production drop the module entirely. If someone
    // reintroduces top-level state, the bundle guard will fail too — but this
    // fails faster and says why.
    const source = await import("node:fs").then(({ readFileSync }) =>
      readFileSync(new URL("../src/lib/supabaseMock.js", import.meta.url), "utf8"));
    // `new Set()` and friends are pure and get dropped fine. What must not come
    // back is work the bundler cannot prove is safe to skip: building the seed,
    // or reading the clock, at module scope.
    const topLevel = source
      .split("\n")
      .filter((l) => /^(const|let|var)\s+\w+\s*=/.test(l))
      .filter((l) => !/=>/.test(l))
      .filter((l) => /\b(seed|Date\.now)\s*\(/.test(l));
    assert.deepEqual(topLevel, [], `impure work at import time:\n${topLevel.join("\n")}`);
  });

  test("mockReset restores the seed", async () => {
    await sb.from("comments").insert({ user_id: "u1", content: "scratch" });
    mockReset();
    const { data } = await sb.from("comments").select("*");
    assert.equal(data.length, 4);
  });
});
