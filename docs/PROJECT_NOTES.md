# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **START OF SPRINT 2 (phase 2)**. Sprint 1 shipped.

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript, exactly 3 dependencies.

PHASE: Catch up to the repo state below, then we start Sprint 2 (details to come
from the student).

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (rules - hard requirements).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Skim docs/CHANGES*.md, then data/entries.js, collection.config.js, and the
    components/ and app/ folders to confirm current state.

CURRENT STATE (as of end of Sprint 1):
  - app/page.js        homepage: identity + ContextAbout + lists all 9 entries
  - components/ContextAbout.js  homepage "About the Mooncake" section
  - app/browse/page.js browse page; renders SearchFilter
  - components/SearchFilter.js  client search: case-insensitive over title,
        description, titleKhmer, descriptionKhmer. Query-aware bilingual empty
        state, a CLEAR x button, and a suggestions dropdown (up to 5).
  - components/SearchSuggestions.js  as-you-type dropdown linking to /entries/[id]
  - components/EntryList.js          grid mapping entries -> EntryCard
  - components/EntryCard.js          clickable card (image/source/title/desc + Khmer)
  - app/entries/[id]/page.js         per-entry detail page (English + Khmer, not-found)
  - data/entries.js                  source of truth: 9 real entries (all with image,
        English description, titleKhmer, descriptionKhmer, real source)
  - collection.config.js             archive identity
  - public/images/                   9 real photos

SPRINT 1 DELIVERED: data fill (9 entries), page-per-entry detail route, Khmer
content, Khmer search, bilingual display, query-aware empty state, clear button,
suggestions dropdown.

SPRINT 2: student will specify details. Known outstanding item (announced): refine
/ proofread the Khmer descriptionKhmer text (family/native review).

NON-NEGOTIABLE RULES (from AGENTS.md):
  - Do NOT add dependencies (only next, react, react-dom allowed).
  - Do NOT touch package.json / package-lock.json / next.config.mjs / .gitignore
    unless the task explicitly names them.
  - NEVER write an API key/token/password into any file (repo is public).
  - Keep diffs scoped; say which file + why before editing beyond the ask.
  - One component per file, plain function components, ~80 lines or less.
  - Khmer text is first-class - never strip/transliterate/"fix" it; use real
    student content, never invented/lorem ipsum.
  - Styling: inline style objects or plain CSS. No CSS/component libs.
  - JavaScript only. Plan first for anything beyond a one-file change.
  - Student reviews & approves every diff; code must be explainable line-by-line.

Working agreement: propose a short plan before writing, make small scoped steps,
keep each feature as its own commit, and surface what you assume.
```
---

## Current repo state (accurate, end of Sprint 1)

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
|   +-- entries.js          (9 REAL entries: image, source, description,
|                            titleKhmer, descriptionKhmer, ingredients[], taste)
+-- docs
|   +-- CHANGES.md, CHANGES_2_DataEntries.md, CHANGES2_Browse.md, CHANGES2_Search.md
|   +-- CHANGES3_Description.md, CHANGES3_Description2.md, CHANGES3_SearchPolish.md
|   +-- PROJECT_NOTES.md     (THIS living handoff)
+-- public
|   +-- images               (9 photos: 2 egg, lotus x2, bean paste, pandan lotus,
|                             pia big / round / small)
+-- collection.config.js, AGENTS.md, README.md, package.json, ...
```

Key facts:
- Stack: Next.js 15 (App Router), React 19, JS only, inline styles. Deps: next / react / react-dom (only).
- Identity in collection.config.js.
- 9 entries, all real now (real image, source, description, Khmer fields). Sources filled
  (e.g. "My uncle's shop: Tea Tek Bouy Bakery").
- Search: case-insensitive substring over title / description / titleKhmer / descriptionKhmer;
  live count; query-aware bilingual empty state; CLEAR x; suggestions dropdown (<=5).
- Per-entry detail page at /entries/[id], linked from every card.
- Khmer descriptionKhmer is NOT yet family-proofread (Sprint 2 open item).

---

## Sprint 1 - summary (complete)

Delivered and verified (separate commits):
1. Data fill: 9 real entries (images, English descriptions, Khmer fields).
2. Page-per-entry: dynamic /entries/[id] route + clickable cards.
3. Khmer display + Khmer search (EntryCard, detail page, SearchFilter).
4. UX: query-aware empty state + CLEAR x button.
5. Suggestions dropdown (SearchSuggestions + SearchFilter wiring) - done at start of Sprint 2.

## Sprint 2 - upcoming (placeholder)

Details from the student to come. Outstanding items so far:
- Refine / proofread Khmer descriptionKhmer text (family/native review).
- (Anything else the student specifies - update this section when provided.)
---

## Peer-review points (partner test) - status

Both requested improvements from the Sprint 1 peer review are now met:
1. Empty cards / bilingual content / UX: DONE - IMAGE PENDING fallback, English +
   Khmer displayed on cards and detail page.
2. Search results in Khmer: DONE - Khmer fields are searched AND rendered.
Extra UX answered (Lab 4): query-aware empty state, CLEAR x button, suggestions dropdown.
Still to fully close peer-review note 1's "improve the UX/UI": ongoing, subjective - polish
as time allows in Sprint 2.

---

## Stated rules & constraints (authoritative source: AGENTS.md)

1. No new dependencies. The three in package.json are the whole list. If a task seems to
   need a package, stop and say so instead of installing it.
2. Do not touch package.json, package-lock.json, next.config.mjs, or .gitignore unless the
   task explicitly names them.
3. Never write an API key, token, or password into any file. This repository is public.
4. Keep diffs scoped to what was asked. If the task honestly requires another file, say
   which file and why before editing it.
5. One component per file in components/, plain function components, ~80 lines or less.
6. Khmer text is first-class content, not an edge case. Never strip/transliterate/"fix" it.
   Sample data comes from the student's real entries, never lorem ipsum.

Also (README): "You own what you ship. Every line that lands in this repository is yours
   to explain, whoever or whatever wrote it."

---

## Soft context worth carrying forward

Carry:
- Build small & scoped; one step at a time.
- Khmer/Chinese text comes from the student, not the model - never invent heritage strings.
- Own every line; student must be able to defend it in a code review.
- One feature = one commit; separate commits matter.
- Keep the changelog habit; each round documented in docs/.
- Styling consistency: dark #14181F, green accent #2EE6A8, Courier New monospace kickers.

Optional:
- Keep homepage lean.
- Empty-state text stays in the archive's voice.

Not worth carrying (moot):
- "Don't touch EntryCard" / "image:'' shows broken slot" - superseded.
- Past tooling/path fumbles.

---

## Changelog index (append as you go)

- docs/CHANGES.md                  - earliest (EntryCard, page updates)
- docs/CHANGES_2_DataEntries.md    - moving entries to data/entries.js
- docs/CHANGES2_Browse.md          - browse page + homepage nav link
- docs/CHANGES2_Search.md          - search feature (incl. Khmer/Chinese deferral note)
- docs/CHANGES3_Description.md     - real descriptions (EN+Khmer), data fields
- docs/CHANGES3_Description2.md    - session: page-per-entry, Khmer display/search, About
- docs/CHANGES3_SearchPolish.md    - query-aware empty state, clear button, suggestions dropdown

Next: add an entry for the Sprint 2 work once scoped.
