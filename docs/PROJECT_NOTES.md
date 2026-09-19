# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **SPRINT 2 (phase 2) - Supabase + Auth**, started week 5.

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript.

PHASE: SPRINT 2 (phase 2) - Supabase + Auth (login / signup), possibly security.
This sprint is VOLATILE per the professor and can go sideways quickly. Build in
small committed steps, keep a revertible base, and if a fix breaks a second thing
follow "stop, revert to the last good commit, re-prompt smaller".

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (rules - hard requirements + the Sprint 2 dependency amendment).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Skim docs/CHANGES*.md, then data/entries.js, collection.config.js, and the
    components/ and app/ folders to confirm current state.

CURRENT STATE (as of start of Sprint 2):
  - Next.js 15 App Router app; homepage (/), browse (/browse with search), and a
    per-entry detail route (/entries/[id]).
  - data/entries.js = 9 real entries (image, source, English description, Khmer
    fields). collection.config.js = archive identity.
  - Supabase is NOT integrated yet. A gitignored `.env.local` exists for auth
    keys; Vercel env vars for deploy. NEVER read/commit its contents.

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

## Current repo state (accurate, start of Sprint 2)

```
Srun-Nguon-Ly---My-Khmer-Living-Archive\
+-- app
|   +-- layout.js      (root layout, dark theme)
|   +-- page.js        (homepage: identity + ContextAbout + all entries)
|   +-- browse
|   |   +-- page.js    (browse page -> SearchFilter)
|   +-- entries
|       +-- [id]
|           +-- page.js  (per-entry detail page, EN + Khmer, not-found fallback)
+-- components
|   +-- EntryCard.js        (clickable card; image/source/title/desc + Khmer; IMAGE PENDING fallback)
|   +-- EntryList.js        (grid: entries -> EntryCard)
|   +-- SearchFilter.js     ("use client" search: empty state + clear + dropdown)
|   +-- SearchSuggestions.js(as-you-type dropdown -> /entries/[id])
|   +-- ContextAbout.js     (homepage "About the Mooncake")
+-- data
|   +-- entries.js          (9 REAL entries: image, source, description, Khmer fields)
+-- public
|   +-- images              (9 photos)
+-- docs
|   +-- CHANGES*.md, PROJECT_NOTES.md (living handoff)
+-- collection.config.js    (archive identity)
+-- AGENTS.md               (rules + Sprint 2 dependency amendment)
+-- .env.local              (Supabase auth config - GITIGNORED, never commit)
+-- README.md, package.json, next.config.mjs, .gitignore
```

Key facts / Sprint 2 security posture:
- Existing deps: next, react, react-dom. Sprint 2 adds exactly @supabase/supabase-js
  and @supabase/ssr (approved).
- `.env.local` is present and GITIGNORED (`.env*` in .gitignore); verified NOT tracked
  by git. Keep it that way (AGENTS rule 3).
- Supabase integration not started yet - first task comes from Lab 5.

---

## Sprint 1 - summary (complete)

Delivered and verified (separate commits): data fill (9 entries), page-per-entry
route, Khmer display + Khmer search, query-aware empty state, CLEAR x button,
suggestions dropdown.

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
- The task (Lab 5) will define exactly which env var names are required.

Professor's caution (quoting intent): this sprint is volatile and can go sideways
quickly. Mitigation: build in small committed steps, keep a revertible base, and
apply "stop / revert to last good commit / re-prompt smaller" on any fix chain.

Known first task: from the student's Lab 5 (pending - add once shared).
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

Next: add an entry for the Sprint 2 Supabase/auth work once Lab 5 scopes it.
