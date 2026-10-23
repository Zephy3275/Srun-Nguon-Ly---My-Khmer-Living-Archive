# PROJECT NOTES - Living Context & Handoff

> **How to use this file**
> Living handoff note for the project. Read `AGENTS.md` first (auto-loaded), then this file.
> **Update this file in place as progress happens** so the handoff never goes stale.
> Current phase: **SPRINT 2 (phase 2)**, between week 7 and week 8. Lab 5 (Supabase + Auth), Lab 6 (Intro to database) and **Lab 7 ("The Doors Open") are complete, merged to `main`, deployed to Vercel and live-verified.** Any account holder can add an entry with a photo and edit/delete their own entries; nobody can touch anyone else's (attack-tested by a classmate). **Now: Week 8, "The Proof" - the last week of Sprint 2.** No lab guide. ALL fixes from the two outside testers, plus the professor-required contributor field, are DONE, tested and committed on branch `experiment` (see "Week 8" below). **A whole-site UI/UX OVERHAUL is IN PROGRESS** (the professor said to get off the default design; the student wants a Chinese-style mooncake theme): the colours, fonts and a Gemini-painted home-page hero are built and committed (steps P1 to P4a). Its living note, which holds the CURRENT overhaul state, is `docs/UI-UX overhaul/OVERHAUL_NOTES.md`: read it (top status, sections 9b and 11) before touching any styling. As of 2026-10-20 everything up to that point is merged into `main` and pushed (both branches at `97e1a73`; Vercel builds `main`); still unconfirmed: the test-data cleanup, a live pass on the Vercel URL and a tag. Lab 7's Canvas submission, discussion post and journal are separate coursework, drafted in chat, not stored in this repo.

---

## Pasting opening message for a new chat

Copy everything in the block below into the new chat:

```
Current: Sprint 2, Week 8 ("The Proof"). ALL tester fixes and the contributor field are DONE, tested and committed (branch `experiment`, merged into `main` on 2026-10-20). NOW: the UI/UX OVERHAUL, in progress (colours, fonts and a painted hero are done; the rest of the site is next): the professor said to get off the default design (the dark gray + mint-green look); the student wants the WHOLE site redesigned with a Chinese-style mooncake theme. Read docs/UI-UX overhaul/OVERHAUL_NOTES.md (top status, sections 9b and 11), then propose a short plan and wait for approval before changing anything.

Project: "Khmer Living Archive" - a student's archive of Khmer/Chinese heritage
(mooncakes + proverbs), built in ICT 340 at AUPP. Next.js 15, App Router, React 19,
JavaScript only, plain React, no TypeScript.

PHASE: SPRINT 2 (phase 2) - Supabase + Auth + contributor write-access. Week 5
(Lab 5, auth), Week 6 (Lab 6, database) and Week 7 (Lab 7, "The Doors Open":
contribution form + photo upload, edit/delete own entries, validation, attack
test) are all done: merged to main, pushed, deployed to Vercel, live-verified.
Any account holder can add an entry with a photo and edit/delete their own
entries; nobody can touch anyone else's. WEEK 8: the testers' fix list is received and
triaged in Week8/Tester_Feedback_Triage.md (outside the repo): read it first.
This sprint is VOLATILE per the professor and can go sideways quickly. Build in
small committed steps, keep a revertible base, and if a fix breaks a second thing
follow "stop, revert to the last good commit, re-prompt smaller".

STEP 1 - Orient yourself (don't skip):
  - Read AGENTS.md (rules - hard requirements + the Sprint 2 dependency amendment).
  - Read this living context file: docs/PROJECT_NOTES.md
  - Read docs/UI-UX overhaul/OVERHAUL_NOTES.md (the overhaul's own living note; not mirrored here on purpose)
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
  - Week 8 additions (after Lab 7): a sticky SiteHeader on every page, shared PageHeading/BackLink,
    a mooncake Loader, a required CONTRIBUTOR field (shown on the entry page, searchable), hard-stop
    input limits, photo preview, a favicon; see the Week 8 section and docs/sprint 2/CHANGES7_*.md.
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
|   +-- loading.js     (Lab 6, redone in Week 8: turning mooncake Loader + "LOADING THE ARCHIVE...")
|   +-- icon.png       (Week 8: favicon, 128x128; Next.js picks it up by name)
|   +-- globals.css    (Week 8: plain CSS for what inline styles can't do: dark autofill, disabled look; imported in layout.js)
|   +-- page.js        (homepage: identity + ContextAbout + all entries; READS SUPABASE;
|   |                   the nav now lives in the sitewide SiteHeader, see components/)
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
+-- data
|   +-- entries.js          (9 REAL entries; KEPT ON PURPOSE as a drafting file - nothing
|                            imports it any more since Lab 6's cutover; not synced with Supabase)
+-- public
|   +-- images              (9 photos)
|   +-- loader-rings.png, loader-center.png   (Week 8: the two layers of the big page-load loader)
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

## Week 8, "The Proof" (last week of Sprint 2) - TESTER FIXES DONE; OVERHAUL NEXT

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
Khmer correctly). Current look: dark `#14181F` background, green accent `#2EE6A8`, Courier
kickers; a redesign may change this, so ask before replacing the palette.

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
