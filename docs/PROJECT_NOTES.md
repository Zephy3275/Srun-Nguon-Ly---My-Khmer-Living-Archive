# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **SPRINT 2 (phase 2)**, between week 7 and week 8. Lab 5 (Supabase + Auth), Lab 6 (Intro to database) and **Lab 7 ("The Doors Open") are complete, merged to `main`, deployed to Vercel and live-verified.** Any account holder can add an entry with a photo and edit/delete their own entries; nobody can touch anyone else's (attack-tested by a classmate). **Next: Week 8 / Lab 8 - details not received yet** (see the placeholder section "Lab 8" below). Lab 7's Canvas submission, discussion post and journal are separate coursework, drafted in chat, not stored in this repo.

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Current: Sprint 2 - Lab 7 ("The Doors Open") is COMPLETE (all 5 parts), merged to main, deployed to Vercel, live-verified. Next is Week 8 / Lab 8 - the student has NOT received its details yet: ask for the exact text of Part 1 before writing anything, and work it part by part, same pattern as Labs 6 and 7.

Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript.

PHASE: SPRINT 2 (phase 2) - Supabase + Auth + contributor write-access. Week 5
(Lab 5, auth), Week 6 (Lab 6, database) and Week 7 (Lab 7, "The Doors Open":
contribution form + photo upload, edit/delete own entries, validation, attack
test) are all done: merged to main, pushed, deployed to Vercel, live-verified.
Any account holder can add an entry with a photo and edit/delete their own
entries; nobody can touch anyone else's. WEEK 8 / LAB 8: not received yet - ask
the student for the exact text of its first part before writing anything.
This sprint is VOLATILE per the professor and can go sideways quickly. Build in
small committed steps, keep a revertible base, and if a fix breaks a second thing
follow "stop, revert to the last good commit, re-prompt smaller".

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (rules - hard requirements + the Sprint 2 dependency amendment).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Skim docs/CHANGES*.md and docs/sprint 2/CHANGES5_*.md, then data/entries.js
    (kept but no longer read by the app - see below), collection.config.js, and
    the components/ and app/ folders to confirm current state.

CURRENT STATE (Sprint 2, after Lab 7):
  - Next.js 15 App Router app; homepage (/), browse (/browse with search and a
    back-to-archive link), a per-entry route (/entries/[id]), /login + /signup
    (Supabase email/password auth), /contribute (add an entry + photo, login-gated)
    and /entries/[id]/edit (owner-only edit). The entry page shows EDIT and DELETE
    only to the entry's owner.
  - Home, browse and the entry-detail page READ FROM SUPABASE (table
    `entries`, 15 columns, RLS enabled with 4 policies, 9 length check constraints,
    Storage bucket `photos`), not from the data file. All handle a query error
    and a zero-rows case, and app/loading.js covers the loading state.
  - Form rules live in utils/validateEntry.js; the two Khmer fields are OPTIONAL
    and accept any language; empty optional fields are saved as null.
  - data/entries.js is KEPT ON PURPOSE (student's own decision) as a staging
    file for drafting new entries before they go into Supabase. Nothing imports
    it any more; it is inert. New entries only appear on the site once inserted
    into Supabase.
  - collection.config.js = archive identity (unaffected by the database work).
  - Supabase INTEGRATED (plumbing / doors / signal from Lab 5; table / RLS /
    seed / cutover / security checklist from Lab 6). Code reads env vars:
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

## Current repo state (accurate, Sprint 2 - after Lab 7)

```
Srun-Nguon-Ly---My-Khmer-Living-Archive\
+-- app
|   +-- layout.js      (root layout, dark theme)
|   +-- loading.js     (Lab 6: "LOADING THE ARCHIVE..." while a page awaits Supabase)
|   +-- page.js        (homepage: identity + ContextAbout + all entries; READS SUPABASE;
|   |                   nav has BROWSE + ADD AN ENTRY +)
|   +-- browse
|   |   +-- page.js    (browse page -> SearchFilter; READS SUPABASE; BACK TO ARCHIVE link)
|   +-- contribute
|   |   +-- page.js    (Lab 7: /contribute; logged-out -> log-in link, logged-in -> ContributeForm)
|   +-- login
|   |   +-- page.js      (/login -> LoginForm)
|   +-- signup
|   |   +-- page.js      (/signup -> SignupForm)
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
|   +-- AuthHeader.js       (server: email+logout OR /login+/signup links)
|   +-- LogoutButton.js     ("use client" sign out + refresh)
|   +-- ContributeForm.js   (Lab 7: "use client" add/edit form; optional `entry` prop = edit mode)
|   +-- EntryFormFields.js  (Lab 7: the field list rendered; shows current photo when editing)
|   +-- FormField.js        (Lab 7: one label + control + hint/error)
|   +-- FieldCounter.js     (Lab 7: live "used / max" counter under a field)
|   +-- EntryOwnerActions.js(Lab 7: EDIT link + DeleteEntryButton, owner only)
|   +-- DeleteEntryButton.js(Lab 7: "use client" inline two-step delete confirm, zero-row check)
+-- data
|   +-- entries.js          (9 REAL entries; KEPT ON PURPOSE as a drafting file - nothing
|                            imports it any more since Lab 6's cutover; not synced with Supabase)
+-- public
|   +-- images              (9 photos)
+-- docs
|   +-- sprint 2           (Lab 5, 6 and 7 changelogs)
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
- Table `entries`, 15 columns: `id, created_at, owner` (given) + `title, description,
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

## Week 8 / Lab 8 - PLACEHOLDER (details not received yet)

Not yet known: the lab's title, how many parts it has, what it builds, or whether it is
still "Sprint 2" or the start of what AGENTS.md calls the next skeleton feature (the
project's four features: browse/search, contributor accounts, own-your-entries,
submit-review-publish; the first three now exist in some form, the fourth, a
review/publish step, does not). Don't assume. When the student pastes the lab text:
1. Ask for the exact text of Part 1 (and each part in turn) before writing anything.
2. Propose a short plan first, make small scoped steps, one commit per step.
3. Check AGENTS.md for any new dependency approval (still only @supabase/supabase-js and
   @supabase/ssr) before installing anything.
4. Add a section here titled "Sprint 2 progress (Lab 8)" and a changelog file per part
   (`docs/sprint 2/CHANGES7_*.md` if the student keeps the week-number prefix convention;
   ask which prefix to use).

Lab 8 progress: _(none yet)_

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

Lab 5 (plumbing, doors, signal) complete: merged to main, deployed, and live-verified (incl. attacker checklist). Lab 6 (intro to database: table, RLS, seed, cutover, security checklist, ship) complete: merged to main, deployed, and live-verified. Lab 7 ("The Doors Open": contribution form + photo, edit/delete own entries, validation, attack test, ship) complete: merged to main, deployed, and live-verified. Current: waiting for Week 8 / Lab 8 (see the placeholder section above).
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

Lab 7 Part 5 (ship + write) has no changelog file of its own: it was the merge/push/deploy/
live-check plus a Canvas submission, discussion post and journal kept outside this repo.

Next: Lab 8. Add changelog entries for each part as they land, same pattern as
`docs/sprint 2/CHANGES5_*.md` for Lab 6 and `CHANGES6_*.md` for Lab 7.
