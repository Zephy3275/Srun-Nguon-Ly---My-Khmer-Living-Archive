# CHANGES 4 — The doors: signup + login (Sprint 2)

Session log for **Lab 5, Task 2**: adding `/signup` and `/login` pages backed by
Supabase email/password auth, styled to match the existing archive. No existing
page was changed; the home page stays untouched by design (that is the
"signal" header work in Task 3).

---

## 1. New files (all new)

- `app/login/page.js` — the `/login` route. Thin server page: kicker, title,
  description, and renders `LoginForm`.
- `app/signup/page.js` — the `/signup` route. Thin server page rendering
  `SignupForm`.
- `components/LoginForm.js` — `"use client"` component. Calls
  `supabase.auth.signInWithPassword({ email, password })` via
  `utils/supabase/client.js`.
- `components/SignupForm.js` — `"use client"` component. Calls
  `supabase.auth.signUp({ email, password })`.

## 2. Auth flow

- **Login:** on success → `router.push("/")` + `router.refresh()` (redirect home
  and re-read the session server-side). On failure → a **fixed, non-specific**
  message is shown: `"Invalid email or password"`. It never reveals the real
  Supabase reason (wrong password, unknown email, unconfirmed account), so the
  page does not leak account details.
- **Signup:** this project has "Confirm email" **off** (per Lab 5 setup), so
  `signUp` returns a live session and the user is logged straight in and
  redirected home. A `data.session` null branch ("check your email") exists as a
  safety net only.
- **Error philosophy:** both forms show generic messages and never echo the
  specific Supabase error text.

## 3. Styling

- Matches `app/page.js`: dark `#14181F`, card/input `#1C222C`, border `#2E3644`,
  green accent `#2EE6A8`, Courier New monospace kickers, inputs styled like the
  existing search input (`components/SearchFilter.js`). Inline style objects,
  no CSS libraries.

## 4. Cross-links (unique to these pages)

- Each door page has a small link to the other: `/login ⇄ /signup`. These live
  **only inside the two pages** and are within-door navigation; they are
  separate from the homepage auth links that Task 3 ("the signal") will add.

## 5. Notes / assumptions

- Uses the browser client (`createClient`) already built in Task 1; the
  `@supabase/ssr` browser client writes the session cookie client-side, so no
  server-side cookie error can occur on these forms.
- The root middleware still runs (session refresh) but does **not** gate these
  routes — anyone can reach `/login` and `/signup`, which is correct for this
  task.
- Build success confirms the pages compile; a live email/password round-trip
  still needs a manual test against the real Supabase backend (sign up a
  throwaway account, then log in).

## Verification

- `npm run build` exit code 0; no lint/type errors.
- Build now lists `○ /login` and `○ /signup` routes (~176–177 kB first-load JS,
  the Supabase browser client bundled only into these client pages).
- `git status` shows only the four new files; no `.env` tracked.

## Commit status

- Not yet committed (student commits separately). Pending untracked:
  - `app/login/page.js`
  - `app/signup/page.js`
  - `components/LoginForm.js`
  - `components/SignupForm.js`

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES5_TheDoors.md`