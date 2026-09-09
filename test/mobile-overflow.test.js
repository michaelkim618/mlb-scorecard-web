// Guards the mobile horizontal-overflow fixes.
//
// WHAT THIS DOES NOT DO: prove the page does not scroll sideways. That needs a
// real layout engine. jsdom has none — `scrollWidth` and `clientWidth` are
// always 0 there, so an overflow assertion written against it passes on a
// broken page as readily as a fixed one. Measure in a real browser with
//   document.documentElement.scrollWidth - document.documentElement.clientWidth
// or say plainly that the layout is unverified. See CLAUDE.md.
//
// What it does do: hold the *mechanism* those fixes depend on. Each fix is a
// `className` on an inline-styled element plus an override in the 768px block
// of mobile.css. Nothing links the two — rename or drop the className and the
// override silently stops applying, with no error anywhere and the overflow
// back. These tests are that link.
//
// Parsed, not pattern-matched: JSX through rolldown/parseAst, CSS through
// postcss. A regex over either would re-learn the lesson in supabase-mock.test.js.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseAst } from "rolldown/parseAst";
import postcss from "postcss";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const MOBILE_CSS = join(SRC, "styles", "mobile.css");
const rel = (f) => relative(ROOT, f);

function walkDir(dir) {
  return readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walkDir(p) : [p];
  });
}

/** Every node in an ESTree/JSX tree. */
function* nodes(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) yield* nodes(n);
    return;
  }
  if (typeof node.type === "string") yield node;
  for (const key of Object.keys(node)) {
    if (key !== "type") yield* nodes(node[key]);
  }
}

// ── Gather the JSX side once ────────────────────────────────────────
const classNames = new Set();
const dynamicClassNames = [];
const gridTemplates = [];

for (const file of walkDir(SRC).filter((f) => [".js", ".jsx"].includes(extname(f)))) {
  const ast = parseAst(readFileSync(file, "utf8"), { filename: file, lang: "jsx" });

  for (const node of nodes(ast)) {
    if (node.type === "JSXAttribute" && node.name?.name === "className") {
      if (node.value?.type === "Literal" && typeof node.value.value === "string") {
        for (const c of node.value.value.split(/\s+/).filter(Boolean)) classNames.add(c);
      } else {
        // A computed className defeats the static scan below; see the
        // completeness test.
        dynamicClassNames.push(rel(file));
      }
    }

    if (
      node.type === "Property" &&
      (node.key?.name ?? node.key?.value) === "gridTemplateColumns" &&
      node.value?.type === "Literal"
    ) {
      gridTemplates.push({ file: rel(file), value: node.value.value });
    }
  }
}

// ── Gather the CSS side ─────────────────────────────────────────────
const mobileClasses = new Set();
postcss.parse(readFileSync(MOBILE_CSS, "utf8")).walkRules((rule) => {
  for (const selector of rule.selectors) {
    for (const m of selector.matchAll(/\.([A-Za-z0-9_-]+)/g)) mobileClasses.add(m[1]);
  }
});

// Rules already orphaned before this suite existed (added in 9b9d6c0, whose
// elements are long gone). Unrelated to the overflow work, so they are recorded
// rather than deleted here — a baseline, not an endorsement. This list may
// shrink, never grow: a new orphan is a regression and must fail.
const KNOWN_DEAD = new Set([
  "game-card-detail-grid",
  "game-card-scorecard-grid",
  "season-history-grid",
]);

describe("mobile overflow fixes stay wired up", () => {
  test("the className scan is complete — no computed class expressions", () => {
    // The orphan test below reads `className="..."` literals. One
    // `className={...}` and it would start under-reporting silently, so the
    // assumption is asserted rather than trusted.
    assert.deepEqual(
      [...new Set(dynamicClassNames)],
      [],
      "computed className found — the static scan can no longer see every class",
    );
  });

  test("every class in mobile.css targets an element that still exists", () => {
    // A rule whose element lost its className is dead CSS, and the layout it
    // was correcting has quietly reverted.
    const orphans = [...mobileClasses]
      .filter((c) => !classNames.has(c) && !KNOWN_DEAD.has(c))
      .sort();
    assert.deepEqual(
      orphans,
      [],
      `mobile.css rules with no matching element:\n  ${orphans.join("\n  ")}\n` +
        "Either the className was dropped or renamed in JSX, or the rule is dead and should go.",
    );
  });

  test("the known-dead list has not gone stale", () => {
    // Guards the baseline itself. Once a rule above is cleaned up or wired to
    // an element, its entry here must go — otherwise the list quietly starts
    // excusing classes that are live again, and the check above weakens.
    const resurrected = [...KNOWN_DEAD].filter((c) => classNames.has(c)).sort();
    assert.deepEqual(resurrected, [], "no longer dead — remove from KNOWN_DEAD");

    const absent = [...KNOWN_DEAD].filter((c) => !mobileClasses.has(c)).sort();
    assert.deepEqual(absent, [], "no longer in mobile.css — remove from KNOWN_DEAD");
  });

  test("no grid track has a fixed minimum that can exceed the viewport", () => {
    // `minmax(320px, 1fr)` cannot shrink below 320px, so on a 375px screen the
    // track plus padding overflows. `minmax(min(320px, 100%), 1fr)` can.
    const fixed = gridTemplates.filter((g) => /minmax\(\s*\d/.test(g.value));
    assert.deepEqual(
      fixed.map((g) => `${g.file}: ${g.value}`),
      [],
      "wrap the minimum in min(..., 100%) so the track can collapse",
    );
  });

  test("html/body never get overflow-x: hidden", () => {
    // Deliberate: it hides the symptom instead of fixing the cause, and it
    // breaks `position: sticky` on the community sidebar.
    const found = [];
    for (const file of walkDir(join(SRC, "styles")).filter((f) => extname(f) === ".css")) {
      postcss.parse(readFileSync(file, "utf8")).walkDecls(/^overflow(-x)?$/, (decl) => {
        const onRoot = (decl.parent.selectors ?? []).some((s) => /^(html|body)\b/.test(s.trim()));
        if (onRoot && /\bhidden\b/.test(decl.value)) {
          found.push(`${rel(file)}: ${decl.parent.selector} { ${decl.prop}: ${decl.value} }`);
        }
      });
    }
    assert.deepEqual(found, [], "clip the overflowing child instead");
  });
});
