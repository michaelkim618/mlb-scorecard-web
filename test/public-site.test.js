// What makes the site discoverable at all: public routes stay outside the sign-in
// wall, the waitlist behaves, and the hosting config keeps direct links working.
// Each of these failed silently before (the whole app sat behind AuthGate, /blog
// answered with JSON, /blog/<slug> was a 404).

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mockSupabase as sb, mockReset } from "../src/lib/supabaseMock.js";
import { joinWaitlist, isValidEmail, readSource } from "../src/lib/waitlist.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

beforeEach(() => mockReset());

describe("routes", () => {
  const routes = read("src/main.jsx").split("\n").filter((l) => l.includes("<Route "));
  const line = (path) => routes.find((l) => l.includes(`path="${path}"`));

  test("the pages a stranger needs are not wrapped in AuthGate", () => {
    for (const p of ["/", "/record", "/articles", "/articles/:slug", "/privacy"]) {
      assert.ok(line(p), `route ${p} exists`);
      assert.ok(!line(p).includes("AuthGate"), `route ${p} must be public`);
    }
  });

  test("the community stays behind sign-in", () => {
    assert.ok(line("/community").includes("AuthGate"));
  });

  test("the footer has no dead '#' links", () => {
    assert.ok(!read("src/components/Footer.jsx").includes('href="#"'));
  });
});

describe("waitlist", () => {
  test("a valid address is stored with where it came from", async () => {
    const r = await joinWaitlist(sb, " Fan@Example.com ", { source: "instagram", campaign: "oct" });
    assert.deepEqual(r, { ok: true, already: false });
    const { data } = await sb.from("waitlist").select("*");
    assert.equal(data.length, 1);
    assert.equal(data[0].email, "Fan@Example.com", "trimmed, case kept");
    assert.equal(data[0].source, "instagram");
  });

  test("the same address again — in any case — is 'already', not an error", async () => {
    await joinWaitlist(sb, "fan@example.com");
    const r = await joinWaitlist(sb, "FAN@example.com");
    assert.deepEqual(r, { ok: true, already: true });
    const { data } = await sb.from("waitlist").select("*");
    assert.equal(data.length, 1, "no second row");
  });

  test("a bad address never reaches the database", async () => {
    for (const bad of ["", "nope", "a@b", "a b@c.com", "x@y.z"]) {
      assert.deepEqual(await joinWaitlist(sb, bad), { ok: false, error: "invalid" }, JSON.stringify(bad));
    }
    const { data } = await sb.from("waitlist").select("*");
    assert.equal(data.length, 0);
  });

  test("a failing insert is reported, not swallowed", async () => {
    const broken = { from: () => ({ insert: async () => ({ error: { code: "42P01", message: "relation does not exist" } }) }) };
    const r = await joinWaitlist(broken, "fan@example.com");
    assert.equal(r.ok, false);
    assert.match(r.error, /does not exist/);
  });

  test("isValidEmail", () => {
    assert.ok(isValidEmail("a@b.co"));
    assert.ok(!isValidEmail("a@b"));
    assert.ok(!isValidEmail("a".repeat(250) + "@b.co"), "over 254 chars");
  });
});

describe("readSource", () => {
  test("utm_source wins over the referrer", () => {
    assert.deepEqual(readSource("?utm_source=youtube&utm_campaign=shorts1", "https://www.google.com/"),
      { source: "youtube", campaign: "shorts1" });
  });
  test("falls back to the referring host, then to direct", () => {
    assert.equal(readSource("", "https://www.reddit.com/r/baseball").source, "reddit.com");
    assert.equal(readSource("", "").source, "direct");
    assert.equal(readSource("", "not a url").source, "direct");
  });
  test("is clipped to what the column accepts", () => {
    assert.equal(readSource("?utm_source=" + "x".repeat(300)).source.length, 100);
  });
});

describe("vercel.json", () => {
  const cfg = JSON.parse(read("vercel.json"));
  const rewrite = new RegExp("^" + cfg.rewrites[0].source + "$");

  test("client routes fall back to the app shell", () => {
    for (const p of ["record", "articles", "articles/2026-10-15-daily-ace", "privacy", "signin", "community"]) {
      assert.ok(rewrite.test("/" + p), `/${p} should reach index.html`);
    }
  });

  test("real files and data are not rewritten", () => {
    for (const p of ["assets/index-abc.js", "predictions.json", "blog/index.json", "blog/posts/x.json", "output/predictions_2026-10-16.js", "robots.txt", "sitemap.xml"]) {
      assert.ok(!rewrite.test("/" + p), `/${p} must be served as-is`);
    }
  });

  test("/blog (the old page URL, now shadowed by the data folder) redirects to /articles", () => {
    const sources = cfg.redirects.map((r) => r.source);
    assert.ok(sources.includes("/blog"));
    assert.ok(cfg.redirects.every((r) => r.destination.startsWith("/articles")));
  });
});
