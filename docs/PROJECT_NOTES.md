# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **SPRINT 2 (phase 2)**, week 6. Lab 5 (Supabase + Auth) complete, deployed and live-verified. Current task: Lab 6 - Intro to database (entries -> Supabase DB, SQL).

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript.

PHASE: SPRINT 2 (phase 2) - Supabase + Auth (login / signup), possibly security. Week 5 (Lab 5) done; current task is Week 6 (Lab 6) - Intro to database (entries -> DB, SQL).
This sprint is VOLATILE per the professor and can go sideways quickly. Build in
small committed steps, keep a revertible base, and if a fix breaks a second thing
follow "stop, revert to the last good commit, re-prompt smaller".

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (rules - hard requirements + the Sprint 2 dependency amendment).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Skim docs/CHANGES*.md, then data/entries.js, collection.config.js, and the
    components/ and app/ folders to confirm current state.

CURRENT STATE (Sprint 2, after Lab 5; into Lab 6):
  - Next.js 15 App Router app; homepage (/), browse (/browse with search), a per-entry
    route (/entries/[id]), and /login + /signup (Supabase email/password auth).
  - data/entries.js = 9 real entries (image, source, English description, Khmer
    fields). collection.config.js = archive identity.
  - Supabase INTEGRATED (plumbing / doors / signal done). Code reads env vars:
    NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (gitignored .env.local + Vercel).

SPRINT 2 FOCUS (Supabase + Auth):
  - Backend via Supabase; add login/signup; possibly security (e.g. RLS).
  - Dependency change: exactly TWO packages are now APPROVED for Sprint 2 only:
      @supabase/supabase-js   @supabase/ssr
    Do NOT add any other dependency without stopping and asking.
  - All other AGENTS.md hard rules still stand, especially rule 3: never put
    keys/tokens/passwords in any committed file.
  - Auth config lives in .env.local (local) + Vercel env vars (deploy).

NON-NEGOTIABLE RULES (from AGENTS.md, incl. Sprint 2 amendment):
  - Dependencies: next, react, react-dom + (Sprint 2 only) @supabase/supabase-js
    and @supabase/ssr. Nothing else.
  - Do NOT touch package.json / package-lock.json / next.config.mjs / .gitignore
    unless the current task explicitly names them.
  - NEVER write an API key/token/password into any file; .env.local stays
    gitignored. This repository is public.
  - Keep diffs scoped; say which file + why before editing beyond the ask.
  - One component per file, plain function components, ~80 lines or less.
  - Khmer text is first-class - never strip/transliterate/"fix" it; real student
    content, never invented.
  - Styling: inline style objects or plain CSS. No CSS/component libs.
  - JavaScript only. Plan first for anything beyond a one-file change.
  - Student reviews & approves every diff; code must be explainable line-by-line.

Working agreement: propose a short plan before writing, make small scoped steps,
commit early and often, keep each feature as its own commit, and surface what you
assume.
```
---

## Current repo state (accurate, Sprint 2 - after Lab 5)

```
Srun-Nguon-Ly---My-Khmer-Living-Archive\
+-- app
|   +-- layout.js      (root layout, dark theme)
|   +-- page.js        (homepage: identity + ContextAbout + all entries)
|   +-- browse
|   |   +-- page.js    (browse page -> SearchFilter)
|   +-- login
|   |   +-- page.js      (/login -> LoginForm)
|   +-- signup
|       +-- page.js      (/signup -> SignupForm)
|   +-- entries
|       +-- [id]
|           +-- page.js  (per-entry detail page, EN + Khmer, not-found fallback)
+-- components
|   +-- EntryCard.js        (clickable card; image/source/title/desc + Khmer; IMAGE PENDING fallback)
|   +-- EntryList.js        (grid: entries -> EntryCard)
|   +-- SearchFilter.js     ("use client" search: empty state + clear + dropdown)
|   +-- SearchSuggestions.js(as-you-type dropdown -> /entries/[id])
|   +-- ContextAbout.js     (homepage "About the Mooncake")
|   +-- LoginForm.js        ("use client" sign-in; fixed invalid message)
|   +-- SignupForm.js       ("use client" create account; min 6 password)
|   +-- AuthHeader.js       (server: email+logout OR /login+/signup links)
|   +-- LogoutButton.js     ("use client" sign out + refresh)
+-- data
|   +-- entries.js          (9 REAL entries: image, source, description, Khmer fields)
+-- public
|   +-- images              (9 photos)
+-- docs
|   +-- sprint 2           (Lab 5 changelogs)
|   +-- CHANGES*.md, PROJECT_NOTES.md (living handoff)
+-- collection.config.js    (archive identity)
+-- AGENTS.md               (rules + Sprint 2 dependency amendment)
+-- .env.local              (Supabase auth config - GITIGNORED, never commit)
+-- README.md, package.json, next.config.mjs, .gitignore
+-- utils
|   +-- supabase
|       +-- client.js         (browser client: createBrowserClient)
|       +-- server.js         (server client: reads cookies())
|       +-- middleware.js     (updateSession: token refresh)
+-- middleware.js             (root: runs updateSession; matcher skips static/img)
```

Key facts / Sprint 2 security posture:
- Existing deps: next, react, react-dom. Sprint 2 adds exactly @supabase/supabase-js
  and @supabase/ssr (approved).
- `.env.local` is present and GITIGNORED (`.env*` in .gitignore); verified NOT tracked
  by git. Keep it that way (AGENTS rule 3).
- Supabase INTEGRATED and Lab 5 done: plumbing, doors, signal (see changelogs).

---

## Sprint 1 - summary (complete)

Delivered and verified (separate commits): data fill (9 entries), page-per-entry
route, Khmer display + Khmer search, query-aware empty state, CLEAR x button,
suggestions dropdown.

---

## Sprint 2 progress (Lab 5)

Lab 5 shipped in small scoped steps (changelogs in docs/sprint 2/):
1. Task 1 "Plumbing" - deps @supabase/supabase-js + @supabase/ssr; utils/supabase/{client,server,middleware}.js + root middleware.js (session/token refresh). Pages untouched.
2. Task 2 "Doors" - /login + /signup (Supabase email/password). Failed login shows a fixed "Invalid email or password" (no user enumeration); redirect home on success. Signup password field enforces minLength 6 (added after a weak-password error surfaced behind the generic message).
3. Task 3 "Signal" - home page nav is auth-aware: logged-in -> email + LogoutButton; logged-out -> /login + /signup links (AuthHeader.js is a server component reading getUser()).

Confirm-email is OFF (per lab). Env vars the code reads: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.

Verification: login/logout confirmed working locally (test user created directly in the Supabase dashboard to avoid the public-signup rate limiter), then merged to main, deployed to Vercel, and the Lab 5 Part 3/4 attacker checklist passed on the live URL. Week 5 (Lab 5) complete; current work is Lab 6 (intro to database).

---
## Sprint 2 - scoped (Supabase + Auth)

Focus: Supabase backend, auth login / signup, possibly security (e.g. RLS).

Approved dependency change (AGENTS.md amendment):
- @supabase/supabase-js
- @supabase/ssr
- Only these two. Do not add any other package without stopping and asking.

Configuration / secrets:
- Local: .env.local (gitignored). Deploy: Vercel environment variables.
- Never read/print/commit .env.local contents. Confirm git status stays free of
  it before every commit.
- Env var names the code reads: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.

Professor's caution (quoting intent): this sprint is volatile and can go sideways
quickly. Mitigation: build in small committed steps, keep a revertible base, and
apply "stop / revert to last good commit / re-prompt smaller" on any fix chain.

Lab 5 (plumbing, doors, signal) complete: merged to main, deployed, and live-verified (incl. attacker checklist). Still in Sprint 2; current task is Week 6 / Lab 6 - intro to database (entries -> Supabase DB, SQL).
---

## Peer-review points (partner test) - status

Both Sprint 1 peer-review improvements are met: (1) empty cards / bilingual content /
UX, (2) search results in Khmer. Extra UX shipped (Lab 4): query-aware empty state,
CLEAR x, suggestions dropdown. Remaining "improve the UX/UI" is ongoing / optional.

---

## Stated rules & constraints (authoritative source: AGENTS.md + Sprint 2 amendment)

1. Dependencies: next, react, react-dom. Sprint 2 ADDS exactly two approved packages:
   @supabase/supabase-js and @supabase/ssr. Nothing else - if a task seems to need a
   package, stop and say so instead of installing it.
2. Do not touch package.json, package-lock.json, next.config.mjs, or .gitignore unless
   the current task explicitly names them.
3. NEVER write an API key, token, or password into any file. This repository is public.
   Auth config lives in .env.local (gitignored) and Vercel env vars.
4. Keep diffs scoped to what was asked. If the task honestly requires another file,
   say which file and why before editing it.
5. One component per file in components/, plain function components, ~80 lines or less.
6. Khmer text is first-class content, not an edge case. Never strip/transliterate/"fix"
   it. Sample data comes from the student's real entries, never lorem ipsum.

Also (README): "You own what you ship. Every line that lands in this repository is
   yours to explain, whoever or whatever wrote it."

---

## Soft context worth carrying forward

Carry:
- Build small & scoped; one step at a time. Especially this volatile sprint: commit
  early and often, keep a revertible base.
- Khmer/Chinese text comes from the student, not the model - never invent heritage
  strings.
- Own every line; student must be able to defend it in a code review.
- One feature = one commit; separate commits matter.
- Keep the changelog habit; each round documented in docs/.
- Styling consistency: dark #14181F, green accent #2EE6A8, Courier kickers.
- Security hygiene: .env.local stays gitignored; never print secrets.

Optional:
- Keep homepage lean. Empty-state text stays in the archive's voice.

Not worth carrying (moot): "don't touch EntryCard" / "image:'' broken slot"; past
   tooling/path fumbles.

---

## Changelog index (append as you go)

- docs/CHANGES.md, CHANGES_2_DataEntries.md, CHANGES2_Browse.md, CHANGES2_Search.md
- docs/CHANGES3_Description.md, CHANGES3_Description2.md, CHANGES3_SearchPolish.md
- docs/sprint 2/CHANGES4_SupaBasePlumbling.md   (Lab 5 Task 1 - Supabase plumbing)
- docs/sprint 2/CHANGES4_TheDoors.md            (Lab 5 Task 2 - login/signup pages)
- docs/sprint 2/CHANGES4_TheSignal.md           (Lab 5 Task 3 - auth-aware home header)

Next: week 6 (Lab 6) - add changelog entries for the new sprint's tasks as they land.
