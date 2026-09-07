# CLAUDE.md — mlb-scorecard-web

React + Vite front end for MLB Scorecard. Data comes from a hosted Supabase
project (comments, likes, profiles) and from static JSON in `public/`.

---

## Local development

```bash
npm run dev        # real Supabase — read-only work, signed-out states
npm run dev:mock   # in-memory fake backend — use this by default
npm test           # required before every commit
npm run build      # production build
npm run lint       # oxlint
```

### Use `npm run dev:mock` for anything involving auth or comments

`npm run dev` talks to the **live production Supabase project**. Posting a
comment there is visible to real visitors. There is no staging project.

`npm run dev:mock` swaps the Supabase client for an in-memory fake
(`src/lib/supabaseMock.js`) and shows a 🧪 panel bottom-left that signs you in
as any seeded user in one click — no Google OAuth round trip, which is
otherwise the only way to reach a signed-in state.

Seeded users exist to reproduce specific layout failures, so keep them:

| User | Why it exists |
|---|---|
| `normal_fan` | owns a comment with a long unbroken URL token |
| `Bartholomew_Longbottom_TheThirdOfHisName_2026` | 45-char unbroken display name |
| `ab` | ordinary control |

Long unbroken tokens are what break mobile layout — a grid or flex track's
automatic minimum is its min-content width, so one unbreakable string widens
the track and scrolls the whole page sideways. `overflow-wrap: anywhere` plus
`min-width: 0` is the fix; see the rules at the end of `src/styles/mobile.css`.

State is in-memory and resets on reload. The 🧪 panel also has **reset data**.

### What the mock does not cover

Row-level security, real auth, real realtime, and anything server-side. It is a
layout and flow harness. Claims about permissions or multi-client sync need a
real Supabase and cannot be verified here.

---

## Testing

`npm test` runs Node's built-in test runner (no test framework dependency).

| File | Covers |
|---|---|
| `test/supabase-mock.test.js` | the mock answers the same shapes the real client does |
| `test/production-bundle.test.js` | the mock cannot reach a production build |

**Run `npm test` before every commit.** The bundle suite runs two real
production builds, so the whole run takes a couple of seconds — cheap enough
that there is no reason to skip it. A `.githooks/pre-commit` hook enforces this
once configured (see below).

### The production-bundle suite is a safety guard, not a formality

The mock is dev-only, but it is imported by shipped code. An earlier version
leaked 504 bytes of fake usernames into the production bundle: the `DEV` guard
correctly killed every code path, but an `import` also *evaluates* a module,
and `supabaseMock.js` did work at import time (`Date.now()`, building the
seed). A bundler keeps any module whose top level it cannot prove is pure.

The fix was to build the seed lazily. **Do not reintroduce top-level work in
`src/lib/supabaseMock.js`** — assign lazily, behind a function.

`src/lib/supabase.js` must keep the `import.meta.env.DEV &&` half of `USE_MOCK`.
Vite replaces `DEV` with `false` at build time, which is what makes the flag
inert in production. Without it, `VITE_USE_MOCK=1` in a build environment would
ship the fake backend.

The suite derives its forbidden strings from the mock source at run time, so
seed data added later is covered automatically — no test edit needed.

---

## Rules for changes

- **Never post to the live Supabase from local dev.** Use `dev:mock`.
- **Extend the mock when you add a Supabase call.** `supabaseMock.js` implements
  only the surface the app uses. A new `.from(...)` chain, auth method, or
  channel event needs a matching branch there, plus a test in
  `test/supabase-mock.test.js` — otherwise `dev:mock` silently breaks.
- **Add a regression test with a bug fix.** For layout bugs that means seeding
  the triggering content in the mock so the failure is reproducible; for logic
  bugs, a case in the relevant suite.
- **Do not add a test framework.** `node:test` is deliberate — this project has
  no test dependencies and should stay that way.
- Failing tests stop the run. Do not commit, push, or open a PR on red.

## Verification standards

Do not report a visual fix as verified from a build succeeding. `vite build`
passing means it compiled, not that the page is correct. Either measure it —

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth  // 0 = no overflow
```

— or say plainly which part is unverified. DevTools responsive mode does not
always reflow after a CSS hot-update; reload before trusting what you see.

---

## CI

`.github/workflows/ci.yml` runs `npm test`, `npm run lint` and `npm run build`
on every pull request and every push to `main`, across Node 22 and 24. Local
dev runs a newer Node, which is what the matrix is there to catch.

CI is the enforcement that cannot be bypassed — the pre-commit hook below is
clone-local and `--no-verify` skips it. Do not merge a PR with CI red.

## The pre-commit hook

`npm install` enables it automatically (the `prepare` script points
`core.hooksPath` at `.githooks`). To enable it by hand in an existing clone:

```bash
git config core.hooksPath .githooks
```

The hook runs `npm test` and blocks the commit on failure. `--no-verify`
bypasses it; do not use it to get past a red suite.

Verify it is active with `git config core.hooksPath` — it should print
`.githooks`. Hook config is local to each clone and is never committed, so an
agent working in a fresh checkout that has not run `npm install` is not
protected by it. Run `npm test` before committing regardless.
