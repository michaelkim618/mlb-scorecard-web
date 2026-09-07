// Guards the dev-only mock backend out of production builds.
//
// The forbidden strings are derived from the mock source at run time rather
// than hard-coded, so seed data added later is covered automatically: any
// string literal that appears in the mock but nowhere else in src/ is treated
// as mock-only and must not survive into a build.

import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

// pathname percent-encodes spaces; fileURLToPath does not.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = "dist-test";
const MOCK_FILES = ["src/lib/supabaseMock.js", "src/components/DevAuthSwitcher.jsx"];
const TEXT = new Set([".js", ".css", ".html", ".json", ".svg", ".map", ".txt"]);

function build(env, extraArgs = []) {
  execFileSync(
    "npx",
    ["vite", "build", "--outDir", OUT, "--emptyOutDir", "--logLevel", "error", ...extraArgs],
    { cwd: ROOT, env: { ...process.env, ...env }, stdio: "pipe" },
  );
}

function walk(dir) {
  return readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

/** Every emitted text file, concatenated, plus the file list. */
function readBuild() {
  const files = walk(join(ROOT, OUT));
  const text = files
    .filter((f) => TEXT.has(extname(f)))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
  return { files, text };
}

const src = (f) => readFileSync(join(ROOT, f), "utf8");

// Read once — @supabase alone is ~8.6 MB and this is called several times.
const memo = (fn) => { let v; return () => (v ??= fn()); };

const otherSrc = memo(() =>
  walk(join(ROOT, "src"))
    .filter((f) => !MOCK_FILES.some((m) => f.endsWith(m.replace("src/", ""))))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n"));

// Dependencies ship their own strings (supabase-js has "SIGNED_OUT",
// "postgres_changes", ...). A literal only counts as mock-only if no
// dependency contains it either, or the test reports its own false positives.
const deps = memo(() =>
  walk(join(ROOT, "node_modules/@supabase"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n"));

/** String literals in `file` that appear nowhere else under src/ or in deps. */
function mockOnlyStrings(file) {
  const literals = [...src(file).matchAll(/["'`]([^"'`\n]{10,})["'`]/g)].map((m) => m[1]);
  return [...new Set(literals)].filter(
    (s) =>
      !otherSrc().includes(s) &&
      !deps().includes(s) &&
      !/^[\s\W]+$/.test(s) &&
      !s.startsWith("./") &&
      !s.startsWith("../"),
  );
}

describe("production bundle excludes the dev mock", () => {
  let plain;

  before(() => {
    build({ VITE_USE_MOCK: "" });
    plain = readBuild();
  });

  test("build is real, not empty", () => {
    assert.ok(plain.text.includes("supabase.co"), "real Supabase client should be wired in");
    assert.ok(plain.files.some((f) => f.endsWith(".js")), "expected a JS bundle");
  });

  // Minification renames every module-level identifier, so asserting their
  // absence in a minified bundle passes even on a real leak. Build once with
  // minification off, where the names survive if the module ships at all.
  test("no mock module identifiers ship (unminified build)", () => {
    build({ VITE_USE_MOCK: "" }, ["--minify", "false"]);
    const readable = readBuild();

    assert.ok(
      readable.text.includes("createClient"),
      "unminified build should preserve identifiers — if this fails the assertions below prove nothing",
    );

    for (const id of ["mockSupabase", "supabaseMock", "MOCK_USERS", "mockSignInAs", "mockReset", "DevAuthSwitcher"]) {
      assert.ok(!readable.text.includes(id), `"${id}" leaked into the build`);
    }
  });

  test("no mock-only string literals ship", () => {
    for (const file of MOCK_FILES) {
      const forbidden = mockOnlyStrings(file);
      assert.ok(forbidden.length > 0, `expected to derive strings from ${file}`);
      for (const s of forbidden) {
        assert.ok(!plain.text.includes(s), `${file}: "${s.slice(0, 48)}" leaked into the build`);
      }
    }
  });

  test("no source maps (they would ship the mock verbatim)", () => {
    assert.ok(!plain.files.some((f) => f.endsWith(".map")), "source map emitted");
    assert.ok(!plain.text.includes("sourceMappingURL"), "sourceMappingURL comment emitted");
  });

  test("the DEV guard is still in place", () => {
    // A build-time constant is what makes the flag inert in production; if
    // someone drops it, the next test still catches it, but this says why.
    assert.match(src("src/lib/supabase.js"), /import\.meta\.env\.DEV\s*&&/);
  });

  test("setting VITE_USE_MOCK=1 cannot enable the mock in a build", () => {
    build({ VITE_USE_MOCK: "1" });
    const forced = readBuild();
    // Identifier checks are meaningless in a minified bundle (see above); the
    // string literals are what actually survive and what actually catch a leak.
    for (const s of mockOnlyStrings(MOCK_FILES[0])) {
      assert.ok(!forced.text.includes(s), `"${s.slice(0, 48)}" shipped when the flag was set`);
    }
    assert.ok(forced.text.includes("supabase.co"), "real client should still be wired in");
  });

  after(() => rmSync(join(ROOT, OUT), { recursive: true, force: true }));
});
