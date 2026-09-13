# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> This is the project's living handoff note. It captures *where the project is*, the *plan for the next feature*, *peer-review notes*, and the *rules/constraints*, so any chat (old or new) can get oriented fast instead of starting from scratch.
>
> **For a new chat:** read `AGENTS.md` (auto-loaded by the agent), then read **this file**. Use the paste-ready opening message below.
> **When progress happens:** update this file in place so the handoff never goes stale.

---

## Pasting opening message for the new chat

Copy everything in the block below into the new chat:

```
Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript, exactly 3 dependencies.

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (the rules - hard requirements, do not violate).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Skim docs/CHANGES*.md for history, then data/entries.js, collection.config.js,
    and the components/ and app/ folders to confirm current state.

CURRENT STATE:
  - app/page.js        homepage: collection identity + lists all entries + nav link to /browse
  - app/browse/page.js browse page; renders SearchFilter
  - components/SearchFilter.js  client-side search: filters title+description,
                                case-insensitive, as-you-type, with a custom empty state
  - components/EntryList.js     grid mapping entries -> EntryCard
  - components/EntryCard.js     one card: image, source, title, description
  - data/entries.js             source of truth: 7 entries (2 real mooncakes, 5 placeholders
                                with image:"")
  - collection.config.js        archive identity (name/description/curator/source/city)
  - public/images/              real photos (9 images incl. new mooncake variants)

NEXT FEATURE (page-per-entry) - the plan:
  - Make each entry card clickable -> open its own page (route like /entries/[id])
    showing full details: multiple images, longer description, more of everything.
  - Fill placeholders with real data/images (images are already in public/images/).
  - Richer descriptions per entry are coming (student is gathering real content).
  - Khmer + Chinese text will be added later once real heritage data is gathered.

PEER-REVIEW NOTES (partner test) - improvements to address later:
  1. Prepare for empty entry cards; give content title + description in BOTH English
     and Khmer; improve UX/UI.
  2. Search results should also display in Khmer, not English only.
  Positives to preserve: live filtered count, source shown per entry, good empty
  state on no-match, clean one-feature-per-commit history.

NON-NEGOTIABLE RULES (from AGENTS.md):
  - Do NOT add dependencies (only next, react, react-dom allowed).
  - Do NOT touch package.json / package-lock.json / next.config.mjs / .gitignore
    unless the task explicitly names them.
  - NEVER write an API key/token/password into any file (repo is public).
  - Keep diffs scoped; say which file + why before editing beyond the ask.
  - One component per file, plain function components, ~80 lines or less.
  - Khmer text is first-class content - never strip/transliterate/"fix" it; sample
    data comes from the student's real entries, never invented/lorem ipsum.
  - Styling: inline style objects (or a plain CSS file). No CSS/component libs.
  - JavaScript only. Plan first for anything beyond a one-file change.
  - Student reviews & approves every diff; code must be explainable line-by-line.

Working agreement: propose a short plan before writing, make small scoped steps,
keep each feature as its own commit, and surface what you assume.
```
---

## Current repo state (snapshot - update as you go)

```
Srun-Nguon-Ly---My-Khmer-Living-Archive\
+-- app
|   +-- layout.js      (root layout, dark theme)
|   +-- page.js        (homepage: identity cards + full entry list + nav to /browse)
|   +-- browse
|       +-- page.js    (browse page -> SearchFilter)
+-- components
|   +-- EntryCard.js   (single card: image, source, title, description)
|   +-- EntryList.js   (grid: maps entries -> EntryCard)
|   +-- SearchFilter.js(use client search box + empty state)
+-- data
|   +-- entries.js     (single source of truth; 7 entries)
+-- docs
|   +-- CHANGES.md
|   +-- CHANGES_2_DataEntries.md
|   +-- CHANGES2_Browse.md
|   +-- CHANGES2_Search.md
|   +-- PROJECT_NOTES.md  (THIS living handoff)
+-- public
|   +-- images
|       mooncake_egg_1.jpg, mooncake_egg_2.jpg
|       Mooncake_LotusPaste_Egg1.jpg, Mooncake_LotusPaste_Egg2.jpg
|       Mooncake_BeanPaste_Egg1.jpg, Mooncake_PandanLotusPaste_Egg1.jpg
|       Moocake_BigPeah.jpg, Mooncake_RoundPeah.jpg, Mooncake_SmallPeah.jpg
+-- collection.config.js (archive identity - single source)
+-- AGENTS.md, README.md
+-- package.json / package-lock.json / next.config.mjs / .gitignore
```

Key facts:
- Stack: Next.js 15 (App Router), React 19, JS only, plain React, inline styles. Dependencies: next, react, react-dom - that is all.
- Identity lives in collection.config.js (never hard-code those values).
- Entries: 7 entries. 2 real mooncakes (mooncake-egg-1, mooncake-egg-2, source "My uncle's shop"). 5 placeholders (entry-3..entry-7) with image:"".
- Search (SearchFilter.js) filters title+description, case-insensitive, client-side (no server/packages/fetch). Live count + custom empty state.
- Khmer/Chinese: mechanism is Unicode-safe, but there is no Khmer/Chinese content in the data yet.
- Changelogs live in docs/; each feature is committed separately (peer reviewer noted this as a strength).

---

## Next feature: page-per-entry

1. Make each entry card clickable -> open its own page (route like /entries/[id]).
2. That page shows the entry's full details - more images, longer description, more of everything.
3. Fill the placeholder entries with real data/images (images are already in public/images/).
4. Add richer/fuller descriptions per entry. Student gathers real content; an AI may help draft,
   but the student verifies all facts and supplies any family/Khmer content.

Scope reminders:
- data/entries.js is the source of truth - new fields (e.g. images[], longer description, Khmer
  fields) belong there, then components read them.
- This is a NEW route, so it intentionally goes wider than the lab's "touch page.js only" scoping
  - approved direction from the student.
- Keep each feature as its own commit.

---

## Peer-review points (partner test)

Strengths noted:
- Shows the number of entries filtered live while typing; source shown per entry.
- Khmer search failing expected (no Khmer content yet) - but the empty-state message was praised.
- Search with nonsense filters correctly. Edge cases (empty string, spaced string) behave well.
- Clean one-feature-per-commit history with AI-assisted references.

Improvements to act on later:
1. Prepare for empty entry cards; give content title + description in BOTH English and Khmer;
   improve the UX/UI.
2. Search results should display in Khmer too, not English only. (Tied to adding real Khmer
   content - student will supply it; AI must not invent heritage text.)

---

## Stated rules & constraints (authoritative source: AGENTS.md)

1. No new dependencies. The three in package.json are the whole list. If a task seems to need a
   package, stop and say so instead of installing it.
2. Do not touch package.json, package-lock.json, next.config.mjs, or .gitignore unless the task
   explicitly names them.
3. Never write an API key, token, or password into any file. This repository is public.
4. Keep diffs scoped to what was asked. If the task honestly requires another file, say which file
   and why before editing it.
5. One component per file in components/, plain function components, ~80 lines or less. Split if
   bigger.
6. Khmer text is first-class content, not an edge case. Never strip, transliterate, or "fix" it.
   Sample data comes from the student's real entries, never lorem ipsum.

Also (README): "You own what you ship. Every line that lands in this repository is yours to
explain, whoever or whatever wrote it."

---

## Soft context worth carrying forward

Carry (shape how future work should go):
- Build small & scoped. Student prefers small isolated steps, one step at a time.
- Khmer/Chinese text comes from the student, not the model. Never invent heritage strings.
- Own every line. Student must be able to defend each line in a code review.
- One feature = one commit; separate commits matter.
- Keep the changelog habit. Each work round gets documented in docs/.
- Styling consistency: dark #14181F, green accent #2EE6A8, Courier New monospace kickers.

Optional:
- Keep homepage lean (student liked / separate from /browse for a while).
- Empty-state text stays in the archive's voice, not generic "No results".

Not worth carrying (one-off resolutions, now moot):
- "Don't touch EntryCard this round" and "image:"" shows a broken slot" - superseded by
  page-per-entry (EntryCard will change).
- Past tooling/path fumbles - already fixed and documented; don't carry forward.

---

## Changelog index (append as you go)

- docs/CHANGES_2_DataEntries.md - moving entries to data/entries.js
- docs/CHANGES2_Browse.md     - browse page + homepage nav link
- docs/CHANGES2_Search.md     - search feature (incl. Khmer/Chinese deferral note)
- docs/CHANGES.md             - earliest changes (EntryCard, page updates)

Next: add an entry for the page-per-entry feature, then search polish (Khmer display), then
UX/UI improvements per peer review.
