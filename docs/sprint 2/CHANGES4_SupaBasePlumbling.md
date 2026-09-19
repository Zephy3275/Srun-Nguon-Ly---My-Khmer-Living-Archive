# CHANGES 4 — Supabase plumbing (Sprint 2)

Session log for **Lab 5, Task 1**: wiring Supabase into the Next.js 15 App Router.
Adds the two approved dependencies and the canonical `@supabase/ssr` client
setup (server + client + session middleware). No existing page was changed.

---

## 1. Dependencies added

- `@supabase/supabase-js` (`^2.116.0`)
- `@supabase/ssr` (`^0.12.7`)

Both are explicitly approved for Sprint 2 in `AGENTS.md`; these are the only
two allowed this sprint. No other dependency was added, and `next`, `react`,
`react-dom` are unchanged. No config files were touched (`next.config.mjs`,
`.gitignore`).

## 2. New files (all new — no existing page touched)

- `utils/supabase/client.js` — browser client via `createBrowserClient`. For
  client components (`"use client"`). Uses the **publishable** key, which is
  safe to expose in the browser.
- `utils/supabase/server.js` — server client via `createServerClient`, using
  Next 15's async `cookies()` API from `next/headers` so a session cookie set by
  login/signup is readable on the server. The `setAll` callback swallows errors
  that occur when called from a Server Component (there, cookies can only be
  written by a Server Action or a Route Handler).
- `utils/supabase/middleware.js` — `updateSession(request)` factory. On matching
  requests it refreshes the session token if it is near expiry and writes the
  updated auth cookies onto a `NextResponse`.
- `middleware.js` (project root) — registers the Supabase middleware with a
  matcher that skips `_next`, favicon, and image files so static assets are not
  sent through session handling.

## 3. Security / hygiene

- Clients read credentials **only** from environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- No API key, token, or password is written into any committed file.
- Credentials live in `.env.local` (gitignored) locally and in Vercel
  environment variables for deploy. Confirmed this branch tracks no
  `.env` / `.env.local` file.

## 4. Notes / assumptions

- Used **relative imports** (no `@/*` alias) so no `jsconfig.json` was required.
- Build success does not yet prove the runtime auth round-trip; that proof lands
  in Lab 5 Task 2, when pages begin calling these clients.
- `npm audit` reports vulnerabilities in the dependency tree, but per project
  rules no `npm audit fix` was run (it could change dependency versions).

## Verification

- `npm run build` exit code 0; no lint/type errors.
- Build output lists a new `ƒ Middleware  94.5 kB` row, confirming the root
  middleware compiled and was wired in.

## Commit status

- Not yet committed (student commits separately). Pending:
  - `package.json`, `package-lock.json` (updated by the approved install)
  - new `utils/supabase/client.js`, `utils/supabase/server.js`,
    `utils/supabase/middleware.js`
  - new root `middleware.js`
- The pre-existing uncommitted edit to `docs/PROJECT_NOTES.md` is separate and
  was intentionally left untouched.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES4_SupaBasePlumbling.md`