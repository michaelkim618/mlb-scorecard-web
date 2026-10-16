// The numbers on the public track record. A visitor is asked to believe them, so
// the arithmetic gets pinned: what counts as graded, how a band is cut, and that
// a game on the boundary lands in exactly one band.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { gradedGames, tally, calibration, monthly, BUCKETS } from "../src/lib/record.js";

const g = (date, prob, correct, extra = {}) => ({
  date, pick_prob: prob, correct, actual_winner: correct ? "A" : "B", ...extra,
});

describe("gradedGames", () => {
  test("today's games and unfinished games never count", () => {
    const games = [
      g("2026-10-14", 60, true),
      g("2026-10-15", 60, false, { actual_winner: undefined }), // no result yet
      g("2026-10-16", 60, true),                                 // today
    ];
    assert.deepEqual(gradedGames(games, "2026-10-16").map((x) => x.date), ["2026-10-14"]);
  });
});

describe("tally", () => {
  test("wins, losses and rate", () => {
    const t = tally([g("d", 60, true), g("d", 60, true), g("d", 60, false)]);
    assert.deepEqual([t.wins, t.losses, t.games], [2, 1, 3]);
    assert.ok(Math.abs(t.pct - 66.666) < 0.01);
  });
  test("no games gives null, not NaN or 0%", () => {
    assert.equal(tally([]).pct, null);
  });
});

describe("calibration", () => {
  test("a game on a band edge lands in exactly one band", () => {
    const games = [55, 60, 65].map((p) => g("d", p, true));
    const bands = calibration(games);
    assert.equal(bands.reduce((n, b) => n + b.games, 0), games.length);
    assert.deepEqual(bands.map((b) => b.games), [0, 1, 1, 1]);
  });
  test("stated is the mean pick_prob and actual the hit rate", () => {
    const b = calibration([g("d", 60, true), g("d", 62, false)])[2]; // 60–64.9
    assert.equal(b.games, 2);
    assert.equal(b.avgStated, 61);
    assert.equal(b.hitRate, 50);
  });
  test("an empty band reports null rather than 0%", () => {
    const b = calibration([])[0];
    assert.equal(b.hitRate, null);
    assert.equal(b.avgStated, null);
  });
  test("the bands tile the whole range with no gap", () => {
    for (let i = 1; i < BUCKETS.length; i++) assert.equal(BUCKETS[i].lo, BUCKETS[i - 1].hi);
    assert.equal(BUCKETS[0].lo, 0);
    assert.equal(BUCKETS.at(-1).hi, Infinity);
  });
});

describe("monthly", () => {
  test("groups by calendar month, oldest first", () => {
    const rows = monthly([g("2026-09-30", 60, true), g("2026-08-04", 60, false), g("2026-09-01", 60, false)]);
    assert.deepEqual(rows.map((r) => r.month), ["2026-08", "2026-09"]);
    assert.deepEqual([rows[1].wins, rows[1].losses], [1, 1]);
  });
});
