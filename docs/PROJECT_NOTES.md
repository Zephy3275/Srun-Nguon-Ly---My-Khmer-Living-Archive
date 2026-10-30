# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **SPRINT 3 (phase 3, "submit, review, publish"), Week 11, Lab 11 "The Queue"** (Friday 2026-10-30). **Sprint 2 and Lab 10 are COMPLETE and shipped:** Lab 10 "The Gate" (every new entry waits for review, the public sees published entries only, nobody can publish their own entry from the console) is merged into `main` (`5be7951`), live on Vercel and verified, and its Canvas writing was submitted on time on 2026-10-25. `experiment` is one docs-only commit ahead of `main` (`ee2d8ef`, already pushed). **This week's scope (Lab 11): build the review queue: a /review page for reviewers only, listing the pending entries oldest first, each with a Publish and a Return button that call `rpc('review_entry')`, plus a /review link in the header that only reviewers see.** See "Sprint 3, Lab 11" below; the full lab text is `../Week11/Lab11_Guide.md` (in the parent folder, OUTSIDE the repo): read it when working on the lab. **Lab 11 code is WRITTEN but not yet browser-tested or committed (2026-10-30): `app/review/page.js`, `components/{ReviewQueue,ReviewEntryCard,ReviewButtons,BilingualNotice}.js` and a REVIEW link in `components/AuthHeader.js`; no SQL. Part 1 answers (with the student's Khmer) are in `../Week11/Lab11_Part1_Answers.md`. Next: the student reads the diff (Part 3), runs Part 4, commits; then the changelog `docs/sprint 3/CHANGES10_ReviewQueue.md` gets its Verification section.** There is nothing to submit on Canvas for Lab 11: the queue is graded as part of Sprint 3 (due Sunday 2026-11-08); the week 11 process log is due Sunday 2026-11-01, 11:59 PM; Tuesday 2026-11-03 is review day (the student's partner will go straight for /review). The **UI/UX overhaul is IN PROGRESS but PAUSED** (the student's choice): do not touch styling unless asked; its living note is `docs/UI-UX overhaul/OVERHAUL_NOTES.md`. Canvas submissions, discussion posts, journals and process logs are separate coursework, drafted in chat or in the Week folders, not stored in this repo. Open leftovers (none blocking): the CONTRIBUTED BY line on the entry cards (the student's chosen audit fix for Sprint 3), the English-only waiting messages, the old test entries still pending on the live database, orphaned photos in Storage after delete/replace, EXIF/GPS not stripped.

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Current: Sprint 3 (submit, review, publish), Week 11, Lab 11 "The Queue" (Fri 2026-10-30). Lab 10 "The Gate" is
complete and shipped (main = 5be7951; `experiment` is one docs-only commit ahead, ee2d8ef). THIS WEEK: build the
review page /review: reviewers only, the pending entries oldest first, a Publish and a Return button on each
(both call rpc('review_entry')), and a header link to /review shown only to reviewers. The full lab text is
Week11/Lab11_Guide.md (in the PARENT folder of the repo, outside it): read it when working on the lab. Nothing is
due on Canvas for Lab 11 (it is graded inside Sprint 3, due Sun 2026-11-08); the week 11 process log is due Sun
2026-11-01, 11:59 PM; review day is Tue 2026-11-03. The UI/UX overhaul (docs/UI-UX overhaul/OVERHAUL_NOTES.md) is
IN PROGRESS but PAUSED: do not touch styling unless I ask.

Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript.

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (hard rules + the Sprint 2 dependency amendment).
  - Read this file: docs/PROJECT_NOTES.md, especially "Sprint 3, Lab 11" (scope, plan, heads-ups).
  - Read ../Week11/Lab11_Guide.md (the lab, exact words) when we start the lab itself, and skim
    docs/sprint 3/CHANGES9_TheGate.md (the gate this page opens).
  - Run `git status` and `git log --oneline -5`; skim app/, components/ and utils/ to confirm the state.
  - Do NOT read ../Week8/Gemini_models_from_API_keys.md (it contains an API key).

CURRENT STATE (after Lab 10, 2026-10-30; no Lab 11 code yet):
  - Next.js 15 App Router app. Pages: / and /browse (published entries only), /entries/[id] (detail, EN +
    Khmer, EDIT/DELETE for the owner only), /entries/[id]/edit (owner-only; an edit sends status 'pending'
    unless the editor is a reviewer), /contribute (login-gated; after saving it shows a waiting message instead
    of the entry), /my-entries (logged in: your own entries with their status in English + Khmer), /login,
    /signup. A sticky SiteHeader on every page (MY ENTRIES for logged-in users). NO /review page yet: that is
    this lab.
  - Database (Supabase): table `entries`, 17 columns incl. `status` (pending / published / returned, default
    pending); table `reviewers` (RLS on, NO policies: only the SQL Editor changes it; one row: archive.test.two);
    functions `is_reviewer()` and `review_entry(entry_id, decision)` (security definer; they refuse non-reviewers,
    any decision but published/returned, and entries that are not pending; they return true/false and NO error
    when they refuse). RLS on entries: select = published, or your own, or reviewer; insert = own and pending;
    update = own and (pending, or reviewer); delete = own. Storage bucket `photos`.
  - Accounts: archive.test.two = the REVIEWER (the guide's "yourself"; uid starts 02937456); archive.test.three =
    the second account / the stranger (uid starts d0492a09); archive.test.one owns the 9 real entries.
  - Pending right now: "waiting politely" and one more entry (both archive.test.three) plus the 8 old test
    entries (about 10 in total; check the Table Editor).
  - Form rules: utils/validateEntry.js; the two Khmer fields are optional; CONTRIBUTOR is required.
    `owner` always comes from the login session, never the form; inserts/updates name their columns.
  - Look: Midnight & Gold theme via CSS variables in app/globals.css, Cormorant Garamond + Jost + Noto Khmer
    fonts (next/font), a Gemini-painted hero (public/hero-moon-*.webp). Components use var(--...), never raw
    colours or font names.
  - data/entries.js is kept on purpose as an inert drafting file (nothing imports it).
  - Env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (gitignored .env.local + Vercel).

NON-NEGOTIABLE RULES (AGENTS.md):
  - Dependencies: next, react, react-dom, @supabase/supabase-js, @supabase/ssr (the Sprint 2 amendment).
    AGENTS.md has NOT been amended for Sprint 3: no other dependency without the instructor naming it.
  - Do NOT touch package.json / package-lock.json / next.config.mjs / .gitignore unless the task names them.
  - NEVER write an API key, token, password or the project's keys into any file; this repository is public.
    (The attack kits use the project URL, the publishable key and account passwords: keep them out of
    every repo file, like docs/sprint 2/CHANGES6_AttackLog.md and docs/sprint 3/CHANGES9_AttackOwnGate.md did.)
  - Keep diffs scoped; say which file + why before editing beyond the ask.
  - One component per file, plain function components, about 80 lines or less.
  - Khmer text is first-class: never strip, transliterate, "fix" or invent it. Any Khmer wording (for example
    the status words on /my-entries, the Publish/Return labels on /review) comes from the student.
  - Styling: inline style objects or plain CSS with the existing variables. No CSS/component libraries.
  - Database changes are SQL the STUDENT runs by hand in the Supabase SQL Editor (begin/commit blocks);
    code that depends on the SQL is written after it has run. JavaScript only.
  - The student reviews and approves every diff and commits it; code must be explainable line by line.

Working agreement: propose a short plan before writing, small scoped steps, one feature per commit, surface
what you assume, never run `next build` while the student's `npm run dev` is running. Update
docs/PROJECT_NOTES.md and the changelog yourself when something changes: do not ask the student first.
```

---

## Current repo state (tree updated 2026-10-25 with the Lab 10 files)

```
Srun-Nguon-Ly---My-Khmer-Living-Archive\
+-- app
|   +-- layout.js      (root layout: loads the fonts with next/font, renders SiteHeader; body uses the CSS variables)
|   +-- loading.js     (Lab 6, redone in Week 8: turning mooncake Loader + "LOADING THE ARCHIVE...")
|   +-- icon.png       (Week 8: favicon, 128x128; Next.js picks it up by name)
|   +-- globals.css    (CSS tokens in :root (colours, fonts, scrim), the night-sky background, autofill/disabled rules, shared button/link classes, loader keyframes; imported in layout.js)
|   +-- page.js        (homepage: HeroBanner + MoonPhases + info cards + ContextAbout + all entries; READS SUPABASE;
|   |                   the nav now lives in the sitewide SiteHeader, see components/)
|   +-- browse
|   |   +-- page.js    (browse page -> SearchFilter; READS SUPABASE; BACK TO ARCHIVE link)
|   +-- contribute
|   |   +-- page.js    (Lab 7: /contribute; logged-out -> log-in link, logged-in -> ContributeForm)
|   +-- login
|   |   +-- page.js      (/login -> LoginForm)
|   +-- signup
|   |   +-- page.js      (/signup -> SignupForm)
|   +-- my-entries
|   |   +-- page.js      (Lab 10: /my-entries, logged-in only: the user's own entries (owner filter) with their status; MyEntryRow per entry)
|   +-- entries
|       +-- [id]
|           +-- page.js  (per-entry detail page, EN + Khmer; READS SUPABASE by uuid; EDIT/DELETE
|           |             shown only when user.id === entry.owner; not-found fallback also
|           |             covers invalid/old slug ids)
|           +-- edit
|               +-- page.js (Lab 7: owner-only edit page; same form, pre-filled)
+-- components
|   +-- EntryCard.js        (clickable card; image/source/title/desc + Khmer; IMAGE PENDING fallback)
|   +-- EntryList.js        (grid: entries -> EntryCard)
|   +-- SearchFilter.js     ("use client" search: empty state + clear + dropdown)
|   +-- SearchSuggestions.js(as-you-type dropdown -> /entries/[id])
|   +-- ContextAbout.js     (homepage "About the Mooncake")
|   +-- LoginForm.js        ("use client" sign-in; fixed invalid message)
|   +-- SignupForm.js       ("use client" create account; min 6 password)
|   +-- SiteHeader.js       (Week 8: sticky bar on every page, rendered by layout.js: brand, BROWSE, ADD AN ENTRY +, AuthHeader)
|   +-- PageHeading.js      (Week 8: back link + label + title + sentence, shared by browse/login/signup/contribute/edit)
|   +-- BackLink.js         (Week 8: the "BACK TO ..." link, one look everywhere)
|   +-- Loader.js           (Week 8: turning mooncake + optional text; big size = rich two-layer picture, small = plain icon; used by loading.js, forms, logout, delete)
|   +-- AuthHeader.js       (server: the account part of SiteHeader: email+SIGN OUT OR LOG IN + SIGN UP)
|   +-- LogoutButton.js     ("use client" sign out + refresh)
|   +-- ContributeForm.js   (Lab 7: "use client" add/edit form; optional `entry` prop = edit mode)
|   +-- EntryFormFields.js  (Lab 7: the field list rendered; photo preview when adding/editing)
|   +-- PhotoPreview.js     (Week 8: previews the chosen photo, or the current one when editing)
|   +-- FormField.js        (Lab 7: one label + control + hint/error)
|   +-- FieldCounter.js     (Lab 7: live "used / max" counter under a field)
|   +-- EntryOwnerActions.js(Lab 7: EDIT link + DeleteEntryButton, owner only)
|   +-- DeleteEntryButton.js(Lab 7: "use client" inline two-step delete confirm, zero-row check)
|   +-- HeroBanner.js       (overhaul P4a: the home page's painted hero: full-width picture, title over the mountains)
|   +-- MoonPhases.js       (overhaul P4a: a row of moon phases between two gold lines, decoration)
|   +-- EntrySentNotice.js  (Lab 10: the "waiting for review" / "sent back for review" message ContributeForm shows after a save)
|   +-- MyEntryRow.js       (Lab 10: one row of /my-entries: title, status badge, hint, EDIT on returned entries)
|   +-- StatusBadge.js      (Lab 10: pending / published / returned in English + Khmer (the student's words))
+-- data
|   +-- entries.js          (9 REAL entries; KEPT ON PURPOSE as a drafting file - nothing
|                            imports it any more since Lab 6's cutover; not synced with Supabase)
+-- public
|   +-- images              (9 photos)
|   +-- loader-rings.png, loader-center.png   (Week 8: the two layers of the big page-load loader)
|   +-- hero-moon-2000.webp, hero-moon-900.webp   (overhaul: the Gemini-painted hero, desktop and phone sizes)
+-- docs
|   +-- sprint 2           (Lab 5, 6, 7 and Week 8 changelogs)
|   +-- UI-UX overhaul     (OVERHAUL_NOTES.md living note (PAUSED), CHANGES7.5_*.md, GEMINI_BRIEFS.md, MOCKUP_BRIEFS.md)
|   +-- CHANGES*.md, PROJECT_NOTES.md (living handoff)
+-- collection.config.js    (archive identity)
+-- AGENTS.md               (rules + Sprint 2 dependency amendment)
+-- .env.local              (Supabase auth config - GITIGNORED, never commit)
+-- README.md, package.json, next.config.mjs, .gitignore
+-- utils
|   +-- entryFields.js        (Lab 7: the form's field list + starting values + hints/counters)
|   +-- validateEntry.js      (Lab 7: pure text validation + trimValues; Khmer fields optional)
|   +-- photoCheck.js         (Lab 7: photo size + real type from the file's first bytes)
|   +-- entryWrite.js         (Lab 7: shared by add + edit: getSessionUser, entryColumns,
|   |                          uploadPhoto, removeUploadedPhoto)
|   +-- submitEntry.js        (Lab 7: add = upload photo, then insert; owner from the session)
|   +-- updateEntry.js        (Lab 7: edit = optional new photo, update, zero-row check)
|   +-- supabase
|       +-- client.js         (browser client: createBrowserClient)
|       +-- server.js         (server client: reads cookies(); used by the server pages)
|       +-- middleware.js     (updateSession: token refresh)
+-- middleware.js             (root: runs updateSession; matcher skips static/img)
```

Database (Supabase, created in Labs 6-7 - dashboard only, not repo files):
- **Lab 10 SQL RUN (2026-10-25):** `entries.status` (pending / published / returned, default pending) is now a 17th column; the 9 real entries are published, the 8 test entries pending; table `reviewers` (RLS on, no policies; one row: archive.test.two); functions `is_reviewer()` and `review_entry()`; select policy renamed "anyone can read published entries", insert and update policies replaced (insert must be `pending`; update must be `pending` unless reviewer). The column list below predates this (it has no `status`). Details: `docs/sprint 3/CHANGES9_TheGate.md`. Accounts: archive.test.two = reviewer; archive.test.three = the stranger for the Part 4 attacks.
- **Week 8 update:** `entries` now has **16 columns**: `contributor` (text, nullable in the database, REQUIRED in the form), plus check `entries_contributor_length` (`null`, or `char_length(trim(contributor))` 1-120), so 12 check rows in total (ten length + the two Lab 6 sweetness/saltiness checks). The 9 seed entries were credited with the student's name by an `UPDATE`. Current rules file: `Week7_Lab7/TableRule_Refined3.md`. Details and the SQL: `docs/sprint 2/CHANGES7_ContributorField.md`.
- Table `entries`, 15 columns (as of Lab 7): `id, created_at, owner` (given) + `title, description,
  source, filling, shape, color` (not null) + `title_khmer, description_khmer`
  (nullable since the Lab 7 follow-up: Khmer is optional) + `texture, sweetness,
  saltiness, photo_url` (nullable).
- Row Level Security ON, 4 policies: anyone can `select`; `insert`/`update`/`delete`
  each gated on `auth.uid() = owner`.
- Check constraints (Lab 7 Part 3): `entries_{title,title_khmer,description,
  description_khmer,source,filling,shape,color,texture}_length` using
  `char_length(trim(col))` (title 1-120, title_khmer 1-500 or null, description 1-10000,
  description_khmer 1-6000 or null, source 1-300, filling/shape/color 1-120, texture
  null or 1-120), plus the Lab 6 `sweetness`/`saltiness` 1-5 checks (11 check rows total).
  Length-only on purpose (no regex/letter rules in the database).
- Storage bucket `photos` (Lab 7 Part 0): public, 5 MB max, jpeg/png/webp only. Storage
  policies on `storage.objects`: authenticated users can insert and delete only inside a
  folder named after their own `auth.uid()`. No update policy (uploads use `upsert: false`).
- Seeded with the 9 Sprint 1 entries, all owned by the Lab 5 `archive.test.one` test user
  (uid starts de54d832). `archive.test.two` is the account used for testing add/edit/delete.
- Design worksheet: `Week6_Lab6/Data_Model_Worksheet.md` (outside the repo, on disk).

Key facts / Sprint 2 security posture:
- Existing deps: next, react, react-dom. Sprint 2 adds exactly @supabase/supabase-js
  and @supabase/ssr (approved). No package added for Lab 6.
- `.env.local` is present and GITIGNORED (`.env*` in .gitignore); verified NOT tracked
  by git, including across all of git history (re-checked in Lab 6 Part 4). Keep it
  that way (AGENTS rule 3).
- Supabase INTEGRATED: Lab 5 (plumbing, doors, signal) + Lab 6 (table, RLS, seed,
  cutover, security checklist) - see changelogs.
- Lab 7 security posture (three layers): the FORM is politeness (validation, counters, hidden
  buttons); the POLICIES decide who (owner-only RLS + folder-per-user storage policies);
  the CONSTRAINTS decide what (length checks + bucket type/size limits). `owner` always comes
  from the login session, never the form; inserts/updates name their columns (no spreads);
  errors show short fixed messages, real errors go to `console.error`; no
  `dangerouslySetInnerHTML` anywhere. A classmate attacked the live site from the console
  (update/delete -> `data: []`, `.txt` upload refused) - see `CHANGES6_AttackLog.md`.
  Known, deliberate gaps: photos are not deleted from Storage on entry delete/replace;
  EXIF/GPS is not stripped from photos; the form's trim is stricter than the database's.
- Lab 6 Part 4 security checklist: logged-out browse/search pass; a logged-out
  REST POST to `entries` was refused by RLS (screenshotted); repo + full git history
  clean of the publishable key; the seed owner's uuid appears once, in a changelog,
  which the lab itself calls harmless. Phone-on-mobile-data test deferred - site
  isn't deployed yet, so there's nothing live to test from a phone.

---

## Sprint 3, Lab 11 "The Queue" (Week 11, Friday 2026-10-30) - SCOPE AND PLAN, NOT STARTED

**Source:** `../Week11/Lab11_Guide.md` (the professor's exact words, outside the repo, about 130 lines; read it when working on the lab). Sprint 3 = submit, review, publish (weeks 9-11). Lab 10 built the gate (the `status` column, the reviewers list, `is_reviewer()`, `review_entry()`); this lab builds the page a reviewer opens it from. **Status (2026-10-30): nothing built or written yet. No SQL is needed: the guide says "Do not change any SQL, policies or functions".**

**Goal of this lab:** by the end of class "waiting politely" is published, an entry has been returned to the second account and has come back fixed, and the queue has been attacked as a stranger.

**Due:** nothing to submit on Canvas for Lab 11; the queue is graded inside Sprint 3 (due Sunday 2026-11-08). The week 11 process log is due Sunday 2026-11-01, 11:59 PM. Tuesday 2026-11-03 is review day: the student's partner "will go straight for this page".

### The parts (as the guide gives them)

- **Part 0 (before class):** Supabase project not paused (click Restore if offered); `git status` clean and `npm run dev` runs; "waiting politely" still pending (it is: see heads-up 1); know the second account's email and password (they never go into a repo file).
- **Part 1 (on paper; the student's own answers; in Lab 10 the student asked Claude to propose them and approved, and they were saved outside the repo in `Week10/Lab10_Part1_Answers.md`; do the same in `Week11/Lab11_Part1_Answers.md`):** five answers that get pasted into the Part 2 prompt. (1) What a reviewer needs to see about each pending entry to decide. (2) What the two buttons say, in Khmer and English. (3) What the page says when a button press fails. (4) What it says when the queue is empty. (5) What someone who is not a reviewer sees at /review. One thing to leave out: who submitted it, by name (see heads-up 3).
- **Part 2 (code; a new task for the AI; do not change SQL, policies or functions):**
  1. A page at `/review`. On the SERVER call `supabase.rpc('is_reviewer')`; if it does not return true, show only the answer to question 5 and no entries.
  2. For reviewers: entries where `status` is 'pending', ordered by `created_at` ASCENDING (oldest first), showing the answer to question 1.
  3. Two buttons per entry (the question 2 labels). Each calls `supabase.rpc('review_entry', { entry_id: entry.id, decision })` with 'published' or 'returned'. Never `.from('entries').update(...)`.
  4. If the call returns true, remove the entry from the list. If it returns false or an error, leave the entry where it is and show the answer to question 3.
  5. When there are no pending entries, show the answer to question 4.
  6. A link to /review in the header only when `is_reviewer` returns true. No package, no `dangerouslySetInnerHTML`.
  Then run it locally as the reviewer: "waiting politely" should be in the queue.
- **Part 3 (read the diff, four checks):** (1) the reviewer check runs on the server before any entries load (politeness: if missing, a stranger would see a short queue of their own pending entries and every button would fail; the database is the gate); (2) the buttons call `rpc('review_entry'`, NOT `.from('entries').update({ status })` (a reviewer updating someone else's entry directly gets zero rows and no error: the button looks like it worked and nothing changed); (3) success means `data === true`, because `review_entry` returns false WITHOUT an error when it refuses, so code that only checks for an error would remove the entry from the screen anyway; (4) the order is oldest first, and the labels and messages are in Khmer where the rest of the archive is. The guide quotes Osmani p. 145 ("It's easy for an AI to omit a check because it doesn't truly 'understand' the context unless told"). Commit suggestion: `sprint 3: review queue (AI-assisted)` (the student's own style is `Sprint 3, week N/labN: ... (AI-assisted)`).
- **Part 4 (the round trip, then the stranger; two browsers, or a normal and a private window):** (1) as the reviewer publish "waiting politely"; logged out it is on the home page. (2) As the second account add a new entry with real content; as the reviewer refresh /review: it is there; press Return. (3) As the second account /my-entries shows it as returned; edit and save: pending again (Lab 10's edit rule) and back in the queue in its ORIGINAL place, because the queue sorts by when it was first submitted. (4) As the reviewer open /review in two tabs; publish the entry in one, press Return in the other: the failure message shows and the entry stays put until a refresh (`review_entry` refuses an entry that is no longer pending). (5) As the second account open /review: only the question 5 message. Then the browser console (the same setup as Lab 10 Part 4): (a) `select('id, title, status').eq('status', 'pending')` returns only the stranger's own pending entries; (b) `rpc('review_entry', { entry_id: 'ANY-PENDING-ENTRY-ID', decision: 'published' })` returns `data: false`. If (b) returns true, stop and run `select * from reviewers;` in the SQL Editor: only the reviewer's uuid (archive.test.two) should be there.
- **Part 5:** push; check /review on the live URL as the reviewer; journal entry: the Part 2 prompt, what came back, and what the Part 3 checks found, including any check that came up clean and how the student knows. Nothing goes on Canvas for Lab 11.
- **If you finish early (optional stretch, the same one Lab 10 offered):** a nullable `review_note` column and a new `review_entry(entry_id, decision, note default null)`. The SQL is in the guide; the student runs it by hand; it DROPS the old two-argument function and creates a three-argument one (read it all first; `begin`/`commit` keep it all-or-nothing); the Publish button keeps working because the note defaults to null. Then a note box next to Return that passes `note` in the same rpc call, and `/my-entries` shows `review_note` on returned entries (`components/MyEntryRow.js` and the select in `app/my-entries/page.js`). Re-run Part 4 step 5(b) afterwards: it must still return false.

### Repo touchpoints (from reading the code, not from the guide)

| File | Expected change |
|---|---|
| `app/review/page.js` (new) | server component: `getUser`, `rpc('is_reviewer')`; not true -> only the question 5 message and NO query; true -> select the pending entries oldest first and render the queue |
| `components/ReviewQueue.js` (new, `"use client"`) | holds the list in state; removes an entry only when `data === true`; shows the question 3 message otherwise; shows the question 4 message when empty |
| `components/ReviewEntryCard.js`, `components/ReviewButtons.js` (new) | one entry's details (question 1) and its two rpc buttons; split so every component stays about 80 lines or less |
| `components/AuthHeader.js` | for a logged-in user also ask `rpc('is_reviewer')`; true -> a link to /review |
| `components/MyEntryRow.js`, `app/my-entries/page.js` | only for the optional `review_note` stretch |
| everything else | no change: no SQL, no `utils/entryWrite.js`, no styling work (reuse `.btn-filled`, `.btn-outline`, `.nav-link` and the CSS variables) |

### Heads-ups for the student to decide (analysis, not decisions)

1. **The queue will not hold one entry.** Oldest first puts the 8 OLD TEST ENTRIES (from Labs 6-8) BEFORE "waiting politely", and archive.test.three's other pending entry after it: about 10 pending in total (check the Table Editor). One old entry has a photo that is a console screenshot showing an email and a password, and the reviewer page will display that photo. The guide's "waiting politely should be at the top" assumes a small queue. Options: (a) Return the junk entries from the new queue as part of testing (they leave the queue and show as returned to their owners); (b) clean them first by exact id (delete the rows and remove the screenshot's file from Storage); (c) leave them. Never a broad WHERE. Decide before Part 4.
2. **Accounts.** The reviewer ("yourself" in the guide) is archive.test.two (uid starts 02937456); the second account is archive.test.three (uid starts d0492a09). Some old test entries are owned by archive.test.two itself: `review_entry` checks the role, not ownership, so a reviewer can review their own entries.
3. **"Who submitted it".** The guide says to leave it out because the table only holds the contributor's id. This archive also has a `contributor` text column (the credited display name, required in the form since Week 8). Decide whether the reviewer card shows it (it is the public credit label, not an identity); the owner uuid stays out either way.
4. **Khmer wording** (the two button labels and the three messages) is the student's: the AI never invents it. The existing Khmer status words are in `Week10/Lab10_Part1_Answers.md`; the unverified Khmer draft there is not approved for code.
5. **Structure.** The server page does the checks and the fetch; the buttons need a client component (rpc plus state). On a failure use `console.error` and a short fixed message, never `error.message` on screen (the pattern used everywhere in this repo). The reviewer sees every pending entry through RLS, so `.eq('status', 'pending')` is the real filter on this page (unlike the Lab 10 public pages, where it was politeness), and a non-reviewer must trigger NO entries query at all.
6. **The guide mentions Cline;** the AI assistant here is Claude Code. The Part 2 prompt can be given as written once the five answers are filled in.
7. **Lab 10 carry-overs, NOT part of this lab (do not build ahead):** a CONTRIBUTED BY line on the entry cards (the student's chosen audit fix; the home page query does not select `contributor` yet); the English-only waiting messages; two untested edit cases (a non-reviewer editing a published entry; a reviewer's own edit staying published); cleaning the old test entries (overlaps heads-up 1).
8. **Git.** `experiment` is one docs-only commit (`ee2d8ef`) ahead of `main` (`5be7951`) and both are pushed; Vercel deploys `main`, so the live check in Part 5 needs the code merged into `main` and pushed first. Merging and committing stay the student's job.

### Changelog convention

Week N -> CHANGES(N-1), as in Lab 10 (`CHANGES9_TheGate.md`, `CHANGES9_AttackOwnGate.md`). For Lab 11: `docs/sprint 3/CHANGES10_ReviewQueue.md`, ending with the "Changelog index (append to `docs/PROJECT_NOTES.md`)" section like the older ones; add a Verification section with what Claude checked and what the student tested, and a separate file only if Part 4's attack deserves one. Update this file and the changelog when something changes, without asking.

---

## Sprint 3, Lab 10 "The Gate" (Week 10, Friday 2026-10-23) - COMPLETE (history: the scope and plan as first written)

**Source:** `../Week10/Lab10_Guide.md` (the professor's exact words, outside the repo, 197 lines; read it when
working the lab). Sprint 3 = submit, review, publish (weeks 9-11). The brief for Sprint 2 said a review
workflow was NOT part of Sprint 2; this is where it starts. **Status: COMPLETE (Parts 1-5 done and the Canvas writing submitted on 2026-10-25; the results are in `docs/sprint 3/CHANGES9_TheGate.md` and `CHANGES9_AttackOwnGate.md`). The rest of this section is the original scope and plan, kept as history.**

**Goal of this lab:** every new entry waits for review, the public sees published entries only, and nobody
can publish their own entry from the console. The review page itself is NEXT Friday (Week 11; a `Week11`
folder exists, empty); this week builds the gate it will open.

**Due:** Sunday 2026-10-25, 11:59 PM: the Lab 10 live URL and the Part 4 attack table (what each attack actually
returned), the week 10 discussion post, the week 10 process log. The Sprint 2 late window also closes Sunday.

### The parts (as the guide gives them)

- **Part 0 (before Friday):** Supabase project not paused (click Restore if offered); Sprint 2 pushed, `git status`
  clean, `npm run dev` runs; copy your own user id (dashboard, Authentication, Users); make a SECOND account on
  the live site (the stranger you attack with). If the Sprint 2 ownership test had failed, fix that first.
- **Part 1 (on paper, the student's own answers; never answered by the AI):** (1) what should a contributor see
  while their entry waits? (2) when an entry is returned, what should the contributor see, and should it carry a
  note? (3) should an edit to a published entry go live straight away? (The SQL answers #3: an edit goes back to
  review unless the editor is a reviewer.) These feed Sprint 3's first reflection question.
- **Part 2 (the database; SQL the student runs by hand in one `begin ... commit` block):**
  first run `select policyname, cmd from pg_policies where tablename = 'entries';` and make the policy names match
  the block (ours should be the Lab 6 names: "anyone can read entries", "owners add their own entries",
  "owners edit their own entries", "owners delete their own entries"). The block then: adds `entries.status`
  (`text not null default 'pending'`, check in 'pending' / 'published' / 'returned'); publishes everything that
  exists; creates table `reviewers (user_id uuid primary key references auth.users)` with RLS on and NO policies
  (only the SQL Editor can change it), seeded with the student's uuid; creates `is_reviewer()` and
  `review_entry(entry_id, decision)` (both `security definer`, `search_path = ''`; `review_entry` refuses
  non-reviewers, refuses any decision except published/returned, only moves entries that are pending, and is
  executable only by authenticated users); replaces the select policy (published, or your own, or reviewer),
  the insert policy (own, and `status = 'pending'`), and the update policy (own, and the new status must be
  pending unless the editor is a reviewer). The delete policy is untouched. Afterwards the live site, logged out,
  should look exactly the same.
- **Part 3 (code, a new task for the AI; do not change SQL or policies):**
  1. home page and search show only published entries (`.eq('status', 'published')`; this is politeness, because
     RLS already hides pending ones from strangers, but the owner is logged in while testing and would otherwise
     see their own pending entries on the public pages);
  2. after the contribution form is submitted, show a message (the student's answer to Part 1 question 1)
     instead of going to the entry; the form must NOT send `status` (the default sets pending, and sending
     'published' would be refused);
  3. a new page `/my-entries` (logged-in users only) listing the user's own entries (filter `owner` = session user)
     with the status in plain words (the student's words, Khmer and English: pending, published, returned);
  4. when an owner saves an edit, send `status: 'pending'` in the update unless `supabase.rpc('is_reviewer')`
     returns true; keep the existing zero-row check;
  5. a header link to `/my-entries` for logged-in users; no package, no `dangerouslySetInnerHTML`.
  Then read the diff for the three things the guide names (the public filters, no `status` sent by the form,
  `status: 'pending'` in non-reviewer edits), test as the second account, and commit (the guide suggests
  `sprint 3: entries wait for review (AI-assisted)`; the student's own style so far is
  `Sprint 2, week8/PartN: ... (AI-assisted)`).
- **Part 4 (attack your own gate, from the browser console as the second account):** five attacks, expected
  results: (1) insert with `status: 'published'` -> row-level security error; (2) update your own entry to
  published -> RLS error; (3) call `review_entry` -> `data: false`; (4) insert into `reviewers` -> RLS error;
  (5) logged out, ask for unpublished entries -> `data: []`. Leave the "waiting politely" entry pending for next
  Friday's queue. Until the review page exists, the student publishes from the console as themselves with
  `sb.rpc('review_entry', { entry_id, decision: 'published' })`.
- **Part 5:** push; logged out the archive looks the same as this morning; Canvas: live URL + the Part 4 table
  with the real results; journal entry: the Part 3 prompt, what came back, one thing checked in the diff.
- **Optional stretch (if finished early):** a nullable `review_note text` column, `/my-entries` shows the note on
  returned entries, and `review_entry` is changed to accept and save a note (re-run attack 3 afterwards).

### Repo touchpoints for Part 3 (from reading the code, not from the guide)

| File | Expected change |
|---|---|
| `app/page.js`, `app/browse/page.js` | add `.eq('status', 'published')` to the entries query (browse feeds search and the suggestions) |
| `app/entries/[id]/page.js` | probably none: RLS already returns nothing to a stranger for a pending entry, so it shows "Entry not found"; the owner and reviewers still see it. Decide whether the owner should see a status note here. |
| `utils/submitEntry.js`, `components/ContributeForm.js` | do not send `status`; after success show the waiting message instead of `router.push` to the entry |
| `utils/entryWrite.js` (`entryColumns`) | must NOT gain `status` (it names columns on purpose) |
| `utils/updateEntry.js` | add `status: 'pending'` to the update unless `is_reviewer` is true; keep the zero-row check |
| `app/entries/[id]/edit/page.js` | its hand-written `select` may need `status` if the edit page should show it |
| `app/my-entries/page.js` (new) and `components/SiteHeader.js` / `components/AuthHeader.js` | the new page and the link for logged-in users |

### Heads-ups for the student to decide (analysis, not decisions)

1. **The "publish everything that exists" line also publishes the 8 junk test entries** (the `<script>` title, the
   "Attack this entry" row, the console-screenshot photo that shows an email and a password, and others). They are
   public today as well, so nothing new leaks, but this is the moment to choose: (a) clean them first (list ids,
   delete by those exact ids; remove the screenshot's file from Storage too); or (b) change the UPDATE so it
   publishes only the 9 real entries (their `photo_url` starts with `/images/`) and the test entries stay
   pending: hidden from the public, still visible to their owners and to reviewers. Do not use a broad rule that
   could match a future real entry with an uploaded photo.
2. **Which account is the reviewer?** The 9 real entries are owned by `archive.test.one` (uid starts de54d832);
   `archive.test.two` is the existing test account. The guide wants the student's own uuid on the reviewers list
   and a different account as the stranger. Pick the pair before Part 2.
3. **The attack inserts need this archive's required columns:** `title, description, source, filling, shape, color`
   plus `owner` (the Khmer fields, `contributor`, `texture`, ratings and `photo_url` are nullable), and they must
   satisfy the check constraints. A "not-null" or check error there is the student's own rules working; add the
   column and retry.
4. **Never commit the attack kit's values:** the project URL, publishable key and account passwords stay out of
   every repo file and every changelog.
5. **Khmer wording** for the status words (and the waiting message) is the student's; the AI never invents it.
6. The guide mentions Cline; the AI assistant here is Claude Code. The Part 3 prompt can be given as written.

### Changelog convention

Files so far follow "week N -> CHANGES(N-1)" (Lab 5 -> CHANGES4, Lab 6 -> CHANGES5, Lab 7 -> CHANGES6, Week 8 ->
CHANGES7, overhaul -> CHANGES7.5). Lab 10: `docs/sprint 3/CHANGES9_TheGate.md` and `CHANGES9_AttackOwnGate.md` (confirmed by the student).

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

Verification: login/logout confirmed working locally (test user created directly in the Supabase dashboard to avoid the public-signup rate limiter), then merged to main, deployed to Vercel, and the Lab 5 Part 3/4 attacker checklist passed on the live URL. Week 5 (Lab 5) complete.

---

## Sprint 2 progress (Lab 6)

Lab 6 shipped in 4 parts, each its own commit (changelogs in docs/sprint 2/):
1. Part 1 "The worksheet becomes SQL" - `Week6_Lab6/Data_Model_Worksheet.md` completed first (student's own design, extended with title_khmer/description_khmer/source after review), then turned into a `create table entries` statement (15 columns) plus RLS: enable + 4 policies (select: anyone; insert/update/delete: `auth.uid() = owner`). Run by hand in the Supabase SQL Editor - dashboard only, no repo file runs SQL.
2. Part 2 "Your entries move in" - the 9 Sprint 1 entries generated into INSERT statements from `data/entries.js` (Khmer text copied and verified byte-for-byte by script, not retyped), `filling`/`shape`/`color` proposed from the 9 photos + descriptions and approved by the student (these three didn't exist as fields before), all rows owned by the Lab 5 `archive.test.one` test user. Run in the SQL Editor; Table Editor confirmed 9 rows with Khmer intact.
3. Part 3 "The cutover" - `app/page.js`, `app/browse/page.js`, `app/entries/[id]/page.js` now read Supabase instead of importing `data/entries.js`; column aliases (`titleKhmer:title_khmer` etc.) keep every component unchanged. Handles zero-entries and query-error states distinctly, plus a new `app/loading.js`. The data file was deliberately KEPT (student wants it as a staging area for future entries before they go into Supabase) - lab's own step 4 (retire the file) was skipped on purpose. Detail page was also brought into scope beyond the lab's literal text, since cards now link to uuids the old data-file lookup couldn't find.
4. Part 4 "Verify like an attacker" - full checklist run on localhost (site wasn't deployed yet at that point): logged-out browse/search pass; a logged-out REST `POST` to `entries` was refused by RLS, screenshotted; repo + full git history confirmed clean of the publishable key; the seed owner's uuid appears once, in a changelog, which the lab calls harmless. Phone/mobile-data step deferred at the time (LAN test to the dev server failed to connect; real version needed the deploy anyway).
5. Part 5 "Ship and write" - merged `experiment` into `main`, pushed, Vercel deployed. Live-verified by the student on the real URL: entries load, search works. Canvas submission (live URL + 2-3 sentences) and the week's discussion post (an assumption caught in the cutover code, and why the AI made it) are separate coursework, drafted in chat but intentionally not stored in this repo.

Confirm-email is still OFF. Week 6 (Lab 6) COMPLETE end to end: merged, pushed, deployed, live-verified.

---

## Sprint 2 progress (Lab 7, "The Doors Open") - COMPLETE

Professor's framing: contribution form + photo, login, rules for the database,
edit + delete entries. 5 parts (0-5). End-of-lab goal, met: anyone with an account can
add an entry with a photo and edit or delete their own entries; nobody can touch anyone
else's. Everything is merged to `main` (03c5d24 at the time of writing), pushed, deployed
to Vercel and live-verified. Student's commit style: `Sprint 2, week7/lab7: <what>
(AI-assisted)`.

### Lab 7 progress

- **Part 0 (before class, student ran it in the SQL Editor):** public Storage bucket `photos`
  (5 MB max, jpeg/png/webp only) + two storage policies: authenticated users can insert/delete
  only inside a folder named after their own `auth.uid()`. No update policy, so uploads use
  `upsert: false`. Dashboard only, not a repo file.
- **Part 1 "The contribution form, with a photo" - DONE, committed as 35dedc2**
  (`docs/sprint 2/CHANGES6_ContributionForm.md`). `/contribute` form with photo upload;
  live counters on title, title_khmer, description, description_khmer; "ADD AN ENTRY +" nav
  link on the home page. New: `app/contribute/page.js`, `components/ContributeForm.js`,
  `components/FormField.js`, `utils/entryFields.js`, `utils/validateEntry.js`,
  `utils/photoCheck.js`, `utils/submitEntry.js`. Validation rules:
  `Week7_Lab7/TableRule_Refined.md` (outside the repo, refined from the student's Tuesday
  draft `TableRule.md`; later changed for the Khmer fields, see the Part 4 follow-up). Old
  photos are `/images/...` paths, new ones are full Supabase Storage URLs; pages render
  `photo_url` as-is so both work. The "Test Entry" on the shared database also appears on
  the deployed site. EXIF/GPS not stripped (student's decision).
- **Part 2 "Edit and delete, your own only" - DONE: built, browser-tested by the student as
  test.two, committed** (`docs/sprint 2/CHANGES6_EditDelete.md`). Owner-only EDIT/DELETE on the entry page,
  `/entries/[id]/edit` (same form, pre-filled, new photo optional), inline delete confirm,
  zero-row check ("That change wasn't saved.") on both update and delete. Photo cleanup on
  delete/replace SKIPPED on purpose. Test with `archive.test.two` (owns nothing real); the 9
  real entries + Test Entry belong to `archive.test.one` (uid starts de54d832). Student uses
  their own commit-message style.
- **Part 3 "The checklist, top to bottom" - DONE: browser checklist passed, 9 length check
  constraints added in the SQL Editor and verified (11 check rows on `entries`); no repo code
  changed** (`docs/sprint 2/CHANGES6_Validation.md`). Length-only on purpose (no regex rules).
  Constraint names: `entries_{title,title_khmer,description,description_khmer,source,filling,
  shape,color,texture}_length`. Throwaway test entries kept on `archive.test.two`.
- **Part 4 "Attack a classmate's archive" - DONE for the student's attack on the teammate's
  site: every attack refused as expected (update/delete `data: []`, `.txt` upload refused for
  mime type); no repo code changed** (`docs/sprint 2/CHANGES6_AttackLog.md`). `experiment`
  was merged into `main` (16cc987) and deployed before the swap. The teammate's
  console results on the student's site (read ok, update/delete `data: []`, `.txt` refused)
  came as a result table; he also said afterwards, in conversation, that the interface steps
  worked (no Edit/Delete on entries that aren't his, `/edit` by id refused, `<script>` title
  entry fine) - second-hand, no screenshots. Teammate feedback logged: Khmer fields optional?,
  back-to-home arrow on Browse, contributor-name field (decisions below).
  **Follow-up (done, browser-tested, SQL run):** the student chose to make `title_khmer` and
  `description_khmer` OPTIONAL (SQL: drop not null + two constraints now `is null or ...`;
  code: validateEntry/entryFields/entryWrite) and added the Browse back link; contributor-name
  field skipped on purpose (`docs/sprint 2/CHANGES6_AttackFeedback.md`). The Khmer fields now
  accept any language; the old Khmer-only/brackets rules no longer apply to them.
- **Part 5 "Ship and write" - DONE.** `experiment` merged into `main` (fast-forward) and
  pushed; Vercel built and deployed. Live-verified by the student on the real URL: back arrow
  on Browse; added an entry with a photo (Khmer fields empty), edited it (added Khmer +
  English text), then deleted an entry; all worked. Photos from deleted/replaced entries stay
  in Storage as expected. The Canvas submission (live URL + 2-3 sentences), the Week 7
  discussion post and the journal entry are separate coursework, drafted in chat, not stored
  in this repo. No changelog file of its own (no new code).

Open items / leftovers (none blocking):
- Test data: throwaway entries on `archive.test.two`; the "Test Entry" owned by `test.one`;
  the teammate's test account on the student's project and the student's on the teammate's
  (delete from the Supabase dashboard when done).
- Photo orphans in Storage after delete/replace (see above); EXIF/GPS not stripped.
- A contributor-name field was suggested by the teammate and skipped on purpose (nothing in
  Lab 7 asks for it; would be one nullable column + constraint + form field).
- `Week7_Lab7/TableRule_Refined2.md` (outside the repo) is the CURRENT rules file, written at
  the end of Lab 7. `TableRule_Refined.md` (Part 1) still describes the old Khmer-only rules
  and is kept as history; the code is the final source of truth.
- The student's real archive is still the 9 Sprint 1 entries (owned by `archive.test.one`);
  adding real contributions is up to the student.

---

## Week 8, "The Proof" (last week of Sprint 2) - COMPLETE (tester fixes and overhaul P1-P4a shipped; the overhaul is now paused)

**What it is (from the student, 2026-10-09):** there is NO lab guide this week. Officially it
is a re-test to "prove" everything works, but the student stressed that is NOT the important
part. The real work: the student got **two outside people to test the live archive** and
wrote down their feedback: **10+ fixes**, roughly **3-4 functional fixes** and the rest
**mostly UI redesign**. A week of iteration, bug fixes, maintenance and redesign. It will be
messier than Labs 6-7 (no parts, no fixed order), so it gets its own new chat.

**Source document on disk:** `Week8/Sprint2_Review_Checklist.md` (outside the repo, pasted
from Canvas). It is the REVIEWER'S checklist for Sprint 2 (used twice: on a partner's archive
on Tuesday, and on your own archive before submitting). It is NOT the fix list. Its sections:
stranger (logged out), new contributor, the ownership attack, the repository, "ask the
author". Reviewers end with their three most useful findings, ordered; those are the
author's fix list ("Friday exists to burn it down"). It mostly repeats Week 7 (validation,
ownership attack) and the student considers it LOW PRIORITY for this week (the testers' fix
list is what matters). For awareness only, these points differ slightly from Week 7:
- Logged-out: Khmer renders everywhere a visitor looks; photos load in reasonable time on a
  phone; **no unreviewed junk, lorem ipsum or placeholder entries visible anywhere** (the
  shared database still has the "Test Entry" and throwaway test entries - clean them up
  before submitting).
- Contributor: an added entry should appear "**correctly credited**", and "**a single name
  gets through the form**". The archive has no contributor-name field (it was suggested by a
  teammate and skipped on purpose in Week 7; entries only show `source`). **CONFIRMED by the
  professor (2026-10-09): the contributor field IS necessary.** See "Confirmed requirement"
  below.
- Repository: no secrets at any point in history (re-checked 2026-10-09: no secret-key, JWT or
  password patterns in any commit, no `.env*` file tracked); small commits with AI-assisted
  work marked; the instructor (GitHub user jesseorndorff) is a collaborator (the student must
  confirm in the repo's Settings -> Collaborators; not verifiable from the CLI).
- "Ask the author": the student should be ready to explain ONE ownership rule (a policy or a
  constraint): what it does, why it's there, what breaks without it.

**Confirmed requirement - contributor (credit) field (professor, 2026-10-09; DONE
2026-10-19, see "Week 8 progress"):** add a contributor name to the add-entry form
(`/contribute`) so each entry is credited. Expected scope (plan and ask before building):
- Database (SQL run by hand, in a fresh SQL Editor tab, BEFORE deploying the code): a new
  `contributor` column on `entries` plus a length check constraint (same
  `char_length(trim(...))` style as the nine existing ones). Open decisions to ask the
  student: required or optional? (if required, the existing 9 + test rows need a value first,
  or the column must allow null / get a default); label and length limit (suggest up to
  ~120); no new table needed.
- Code: `utils/entryFields.js` (field + hint), `utils/validateEntry.js` (**a single name must
  pass** - no first+last rule; Khmer names must pass; any language), `utils/entryWrite.js`
  (`entryColumns` names the column; empty -> null if optional), the edit form pre-fills
  automatically from the field list, and DISPLAY the credit on the entry page and probably on
  cards. Check `owner` is still never taken from the form (contributor is a display label,
  not identity; `owner` stays the real accountability).
- Docs: rules file (`Week7_Lab7/TableRule_Refined2.md` is current; write a new version, e.g.
  `TableRule_Refined3.md`, mention it was made for the Week 8 contributor field), a changelog
  file, and this notes file (DB section + repo tree).
- Test: add an entry with a single name and with Khmer text; edit it; confirm it shows on the
  entry page; run the length constraint test.

**Received (2026-10-16):** the testers' list (Lyching + Kimyoo, 14 points) is in
`Week8/Tester_Feedback_Triage.md` (outside the repo): original list, sorted groups, decisions,
open questions and a status table. Keep that table updated. Order agreed: group A bugs and
behavior -> group B small UI polish -> group C redesign -> contributor field -> (language
toggle SKIPPED by the student). Changelog prefix for Week 8: `CHANGES7_`.

**How to run the week (agree with the student, same working style as Labs 6-7):**
1. Read the pasted feedback, then triage into three buckets: (a) functional bugs / behavior
   changes, (b) UI/visual redesign, (c) things that need the database (SQL run by hand by the
   student in a fresh SQL Editor tab, BEFORE the code that depends on it) or that touch
   security. Say which items are risky or ambiguous and ask before assuming.
2. Propose a plan: order (functional fixes first, then UI), grouping into small steps, what
   each step touches. Wait for approval. Show each diff; the student reviews and approves.
3. One fix (or one tight group) = one commit, in the student's style
   (`Sprint 2, week8: <what> (AI-assisted)`). The student commits and pushes; I do not.
4. Keep the changelog habit: `docs/sprint 2/` files per round of fixes. ASK the student which
   filename prefix to use (Lab 7 used `CHANGES6_*`; the next one may be `CHANGES7_*`).
5. Update this section as fixes land (a checklist below), and fill the repo tree / database
   sections above if files or schema change.

**Rules that still apply (AGENTS.md):** no new dependencies (only next, react, react-dom,
@supabase/supabase-js, @supabase/ssr); do not touch package.json / package-lock.json /
next.config.mjs / .gitignore without the task naming them; no keys/tokens/passwords in any
file (public repo); one component per file in `components/`, ~80 lines or less (a redesign
tends to bloat components: split them); plain React, no CSS frameworks or component libs
(inline style objects or a plain CSS file); JavaScript only; Khmer text is first-class and
must never be stripped, transliterated or "fixed" (check that any new font/CSS still renders
Khmer correctly). Current look (since the overhaul, 2026-10-20): the "Midnight & Gold" theme: midnight-blue page, cream text, gold accent, cinnabar-red main button, set by CSS variables in `app/globals.css` (never a raw colour or font name in a component); Cormorant Garamond headings, Jost body, Noto Khmer fonts. The old dark gray + mint green + Courier look is gone. New UI work in Sprint 3 uses the existing variables and classes; the overhaul itself is paused.

**Light regression guard (secondary, not the focus: glance at these after changes and do a
quick pass on the LIVE URL at the end; full list in `Week7_Lab7/ValidationChecklist.md`):**
- Required fields are required and say so before submit; text trimmed and length-limited
  (form + the 9 database check constraints); Khmer fields optional, any language.
- Photos: JPG/PNG/WebP by magic bytes, 5 MB max, upload to `<user id>/<random uuid>.<ext>`.
- `owner` comes from the login session, never the form; inserts/updates name their columns.
- Error messages are short and fixed; real errors go to `console.error` (no `error.message`
  on screen); no `dangerouslySetInnerHTML` anywhere.
- A title of `<script>alert(1)</script>` shows as plain text.
- Owner-only Edit/Delete buttons AND owner-only RLS: a stranger's console update/delete
  returns `data: []`; a `.txt` upload is refused (the attack kit is in
  `docs/sprint 2/CHANGES6_AttackLog.md`).
Any fix that adds a field or changes how data is saved must also be checked against these
(validator, `entryColumns`, the database constraints, edit mode, search, cards).

**Where the code stands (updated 2026-10-20):** the student works on branch `experiment` and holds
every Week 8 commit (group A, group B, group C, contributor field, then the overhaul steps P1 to P4a;
commit messages `Sprint 2, week8/...: ... (AI-assisted)`). **`experiment` was merged into `main` and pushed
on 2026-10-20 (both at `97e1a73`, nothing unmerged)**; `main` is what Vercel deploys. The contributor SQL
was run on the shared database before the merge. Merging stays the student's job. Check the real state with
`git log main..experiment` and `git status` before asserting anything.

**Known leftovers that testers may also hit (from Week 7):** photos of deleted/replaced
entries stay in Storage; EXIF/GPS is not stripped from photos; test data still around
(throwaway entries on `archive.test.two`, cross-project test accounts); as of 2026-10-19 the live site still showed 8 test entries (cleanup status unconfirmed since; one of them has a photo that is a console screenshot showing an email and password, so remove its Storage file too) (the 9 real entries are the Sprint 1 ones and now carry the contributor credit).

**Week 8 progress:**
- **The UI/UX overhaul is IN PROGRESS (P1 to P4a done, 2026-10-20).** Current state, next steps and decisions are in `docs/UI-UX overhaul/OVERHAUL_NOTES.md`; the old planning detail follows. Everything is in `docs/UI-UX overhaul/OVERHAUL_NOTES.md`
  (decisions are open: palette A Midnight & Gold recommended / B / C, typography, ornament level).
  Rules already settled for it: the UI libraries the student looked at (Magic UI, React Bits, Motion)
  are NOT used because they break AGENTS.md (they need Tailwind/shadcn or a new dependency, and "no CSS
  frameworks, no component libraries"); every effect is done in plain CSS. A real image-generation route
  exists via Antigravity's built-in sub-agent; a Google AI Studio key has no free image quota (HTTP 429
  tested). Khmer/English text never goes inside generated images.
- **Merge: DONE 2026-10-20** (`experiment` -> `main`, pushed). **Still to confirm with the student:** a final live pass on the Vercel URL; test-data cleanup (delete the 8 test entries by listing their ids
  first, not with a broad WHERE; deleting a row does not remove its Storage photo); a tag for the submitted state.
- **Deadline was Monday 2026-10-19, 11:59 PM** (the student's plan was to submit the minimum, then keep
  working on the overhaul; the Canvas reflection was written in chat). The overhaul continues on `experiment`.
  Details in `docs/UI-UX overhaul/OVERHAUL_NOTES.md`.
- **Group A (bugs/behavior): DONE and browser-tested by the student (2026-10-17); all in
  `docs/sprint 2/CHANGES7_FunctionalFixes.md`; one commit by the student.** Not browser-tested:
  long paste into the description, a levels line with a real value (final pass).
  #13 autofill white box fixed (new `app/globals.css`, imported in `layout.js`; student-tested);
  #14 form locked while logging in / signing up / saving (`fieldset disabled`); #7 hard stop at
  the limits (`maxLength` + `clipWords` for the 1,000-word description, counters on the five
  fields that had none); small extra: sweetness/saltiness shown on the entry page.
- **Group B (small UI polish): DONE, `next build` passes (dev server stopped first) and the
  student browser-tested every item (2026-10-18); one commit by the student.** All in
  `docs/sprint 2/CHANGES7_UIPolish.md`: #2 "Back to homepage"; #12 "ARCHIVE ENTRY" label removed;
  #1 card line clamp (3 lines, English and Khmer separately); #4+8 `required` flag, red `*` and
  coral label on the entry form only (not login/signup); #5 `PhotoPreview` on add + edit; #6
  favicon `app/icon.png`.
- **Group C (redesign): DONE and browser-tested by the student (2026-10-18): header, sign out,
  login, save/edit progress text, delete, page load. The rich page-load loader (the student's
  Gemini image in two layers, rings turning around a still mooncake) was added afterwards and
  also checked: "looks great". Group C is closed; committed by the student.** All in `docs/sprint 2/CHANGES7_Redesign.md`:
  #11 sticky `SiteHeader` on every page, shared `PageHeading`/`BackLink`, bigger headings, filled
  green main buttons, login/signup inputs; #9 mooncake `Loader` for page load, login, signup,
  save (with step text via an optional `onStage`), sign out (which had no loading state) and
  delete. Back links on login/signup/contribute now say BACK TO HOMEPAGE. NOTE: the student plans
  a bigger UI/UX overhaul later (professor: get off the default design); keep the shared pieces
  central and easy to restyle.
- **Contributor field (professor requirement): DONE and browser-tested by the student (2026-10-19). SQL run (column, constraint, credit on the 9 real entries); the first UPDATE also credited 8 test entries, corrected back to NULL and verified.** In `docs/sprint 2/CHANGES7_ContributorField.md`: required form field `CONTRIBUTOR` (one name passes, any language), saved via `entryColumns`, shown as `CONTRIBUTED BY` on the entry page only (not on cards), searchable on Browse; the edit page's hand-written `select` includes it so editing never blanks the name. `owner` still never comes from the form.
- **#3 (make sweetness/saltiness required) DROPPED by the student:** ratings are subjective;
  they stay optional.
- **#10 language toggle SKIPPED by the student** (whole-interface Khmer would need every UI
  string translated).
- **Working rule learned in Week 8:** never run `next build` while the student's `npm run dev` is
  running (both write `.next`; the build broke the student's session once). Check port 3000
  first; verify by requesting pages from the running dev server instead. Story in section 6 of
  `CHANGES7_FunctionalFixes.md`.

Fix list / status (fill in once received):
| # | Fix | Type (functional / UI / DB) | Status |
|---|---|---|---|
| C | Contributor (credit) field on the add/edit form + display + SQL + rules file (professor-confirmed requirement) | functional + DB | not started (student will do it later this week) |
| 13 | Autofill white box (Kimyoo) | functional (CSS) | done, student-tested |
| 14 | Lock form while logging in / saving (Kimyoo) | functional | done, student-tested |
| 7 | Hard stop at character/word limit (Lyching) | functional | done, student-tested on the title field (word clip script-tested only) |
| 3 | Sweetness/saltiness required (Lyching) | functional | DROPPED (stays optional) |
| 10 | English/Khmer toggle (Lyching) | feature | SKIPPED by the student |
| 2, 12, 1, 4+8, 5, 6 | Group B small UI polish (Lyching + Kimyoo) | UI | done, student-tested |
| 11, 9 | Group C redesign: sticky header, shared headings, login/signup look, mooncake loader + save progress (Kimyoo, Lyching) | UI | done, student-tested incl. the rich page-load loader |
| C | Contributor field (professor requirement) | functional + DB | done, student-tested (SQL run, test rows corrected) |

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

Lab 5 (plumbing, doors, signal) complete: merged to main, deployed, and live-verified (incl. attacker checklist). Lab 6 (intro to database: table, RLS, seed, cutover, security checklist, ship) complete: merged to main, deployed, and live-verified. Lab 7 ("The Doors Open": contribution form + photo, edit/delete own entries, validation, attack test, ship) complete: merged to main, deployed, and live-verified. Current: Week 8, "The Proof" (see the Week 8 section above) - no lab guide, a fix-and-redesign week driven by two outside testers' feedback.
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
- Styling consistency: use the CSS variables in app/globals.css (Midnight & Gold theme), no raw colours or font names in components.
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
- docs/sprint 2/CHANGES5_SQL.md                 (Lab 6 Part 1 - entries table + RLS)
- docs/sprint 2/CHANGES5_SQLAddEntries.md       (Lab 6 Part 2 - 9 entries inserted)
- docs/sprint 2/CHANGES5_TheCutover.md          (Lab 6 Part 3 - site reads from Supabase)
- docs/sprint 2/CHANGES5_VerifyLikeAttacker.md  (Lab 6 Part 4 - security checklist)

Lab 6 Part 5 (ship + write) has no changelog file of its own — it was the
merge/push/deploy/live-check plus a Canvas submission and discussion post kept
outside this repo, not new code.

- docs/sprint 2/CHANGES6_ContributionForm.md    (Lab 7 Part 1 - /contribute form + photo upload)

- docs/sprint 2/CHANGES6_EditDelete.md          (Lab 7 Part 2 - edit + delete own entries)

- docs/sprint 2/CHANGES6_Validation.md          (Lab 7 Part 3 - validation checklist + check constraints)

- docs/sprint 2/CHANGES6_AttackLog.md           (Lab 7 Part 4 - attack a classmate's archive)
- docs/sprint 2/CHANGES6_AttackFeedback.md      (after Part 4 - optional Khmer fields + Browse back link)
- docs/sprint 2/CHANGES7_ContributorField.md    (Week 8 - contributor field: the one Week 8 change that touched the database; includes the SQL)
- docs/sprint 2/CHANGES7_Redesign.md            (Week 8 group C - sticky header, shared headings, login/signup look, mooncake loader and save progress text)
- docs/sprint 2/CHANGES7_UIPolish.md            (Week 8 group B - homepage link, label removal, card line clamp, required asterisks, photo preview, favicon)
- docs/sprint 2/CHANGES7_FunctionalFixes.md     (Week 8 group A - autofill + global CSS, lock while saving, hard-stop limits, levels on entry page)

Lab 7 Part 5 (ship + write) has no changelog file of its own: it was the merge/push/deploy/
live-check plus a Canvas submission, discussion post and journal kept outside this repo.

- docs/UI-UX overhaul/MOCKUP_BRIEFS.md          (the three palette mockup prompts for Antigravity)
- docs/UI-UX overhaul/OVERHAUL_NOTES.md        (the overhaul's living note: facts, decisions, phases, rules; not a changelog)

- docs/UI-UX overhaul/CHANGES7.5_CssVariables.md   (overhaul P1: colours moved into CSS variables)
- docs/UI-UX overhaul/CHANGES7.5_Retheme.md        (P2: the "Midnight & Gold" palette)
- docs/UI-UX overhaul/CHANGES7.5_Fonts.md          (P3: Cormorant Garamond, Jost, Noto Khmer)
- docs/UI-UX overhaul/CHANGES7.5_HeroSky.md        (P4a: night-sky background, first moon hero)
- docs/UI-UX overhaul/CHANGES7.5_Atmosphere.md     (P4a-2: richer blue sky, glass cards)
- docs/UI-UX overhaul/CHANGES7.5_HeroPainting.md   (P4a-3: Gemini-painted hero banner)
- docs/UI-UX overhaul/GEMINI_BRIEFS.md             (image prompts, how to run them, results so far)

The overhaul's changelogs are numbered `CHANGES7.5_*` (still the Week 8 workflow) and live in `docs/UI-UX overhaul/`. The overhaul's living note (state, decisions, next steps) is `docs/UI-UX overhaul/OVERHAUL_NOTES.md`; this file is deliberately not mirrored for it.

- docs/sprint 3/CHANGES9_TheGate.md             (Lab 10 - the gate: status column + policies SQL, public filters, waiting message, /my-entries, edits go back to review)
- docs/sprint 3/CHANGES9_AttackOwnGate.md       (Lab 10 Part 4 - the five console attacks as archive.test.three, all refused; results table with the exact messages)

Sprint 3 changelogs live in `docs/sprint 3/` with the prefix `CHANGES9_` (week 10 -> CHANGES9; confirmed by the student 2026-10-25). The Lab 10 guide is `../Week10/Lab10_Guide.md` and the Part 1 answers are `../Week10/Lab10_Part1_Answers.md` (both outside the repo).

Sprint 3, Lab 11 (week 11): no changelog exists yet. Planned: `docs/sprint 3/CHANGES10_ReviewQueue.md` (week 11 -> CHANGES10). The Lab 11 guide is `../Week11/Lab11_Guide.md` (outside the repo).
