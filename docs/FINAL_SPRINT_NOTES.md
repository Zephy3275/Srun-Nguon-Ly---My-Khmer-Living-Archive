# FINAL SPRINT NOTES - handoff for the final capstone (Weeks 13 to 16, due Sun 2026-11-22)

> **How to use this file**
> This is the live handoff for the final sprint. Read `AGENTS.md` first, then this file. `docs/PROJECT_NOTES.md` is now the history of Sprints 1 to 3 (large; read only the part you need, and treat anything it says about "next" as stale). **Update this file in place as work lands**, without asking the student.
> Written 2026-11-19. This file stays in `docs/` (the student's decision, 2026-11-21). The final sprint's changelogs go in `docs/final sprint/`, numbered by week like Sprint 3 (Week 13 = `CHANGES12_`).
>
> **Changelog index (final sprint):**
> - `docs/final sprint/CHANGES12_PolishChecklist.md`: Lab 13 (checks already proven, secret and TODO scans, ownership attack passed, B2/B4 decisions, the line-break fix).
> - `docs/final sprint/CHANGES12_LanguageToggle.md`: the three-way language toggle (in progress, step by step).

## Where we are (verified 2026-11-19)

- **Git (checked 2026-11-21, start of the toggle chat):** on `experiment` = `origin/experiment` = `d243146`, three commits ahead of `main` = `origin/main` = `7ca8ef9`: `384a283` (handoff: `AGENTS.md` amendment and these notes, docs only), `e3b51f3` (Lab 13 checklist, docs only) and `d243146` (the line-break fix, code). Working tree clean. Merge `experiment` into `main` before the deadline so the amended `AGENTS.md` and the README are on the default branch.
- **Week 12 / Sprint 3 code is DONE and live.** All Sprint 3 code is in `7ca8ef9` on `main`. Everything is merged and deployed on Vercel (Vercel deploys `main`). A live check on 2026-11-08 passed as a logged-out visitor, as archive.test.three and as the reviewer archive.test.two. Details: `docs/sprint 3/CHANGES11_ReviewFixes.md` (A1 to A3, A6, B1, B3, B5, Q3, Khmer for the two waiting messages).
- **Sprint 3 Canvas writing:** the submission, journal and reflection were drafted and finalized in `../Week12/Week12-SubmissionsForSprint3/Sprint3_Submissions.md` (outside the repo). The student submitted all of Sprint 3 on Canvas by the due date, 2026-11-08 (confirmed by the student on 2026-11-19). That file is useful source material for the README's AI-use section and the final reflection.
- **There is no Week 13 process log** (the final brief said one was due Nov 15; the instructor confirmed that was a mistake) **and no Prompt Journal for the final.** AI use goes in the README.
- **The ~80-line component rule no longer applies.** One component per file still does.

## What the final asks (from `../Week13/`, outside the repo)

Due **Sun 2026-11-22, 11:59 PM. There is no late window**; what is live and in the repo at that moment is what gets graded. The Final Project group is 30% of the course grade.

1. **Capstone (24 points):** live URL, repo with a README (eight sections, in order), and a four-question reflection in the Canvas text box.
2. **Demo video (4 points):** five minutes or less, screen and voice in English. Browse and search as a visitor, add an entry as a contributor, publish it as the reviewer, show ownership; name one decision and one place the AI got it wrong. Unlisted YouTube or Drive link, tested in a private window. Link goes in the Demo Video assignment and the Show Your Archive discussion. It is also the evidence if Supabase sleeps during grading.
3. **Q&A (4 points):** five minutes, one on one, Nov 27 to Dec 4 (booking required before Nov 22; section 002 together in B4 on Nov 27; section 001 on Dec 1, Dec 4 and extra afternoon slots). Three questions about the student's own code: where published-only is enforced, what a policy does, and what they changed in an AI-assisted commit. A weak Q&A puts the capstone on hold for an AI-use review.
4. **Show Your Archive discussion (10 points):** post the video link and two sentences by Nov 22; two replies to classmates by Sun Nov 29.

**Capstone rubric, six criteria, 4 points each** (full text: `../Week13/Course Final/How_Final_Is_Graded.md`): (1) it works end to end; (2) the gate holds, no secrets in the repo history; (3) the collection is real and Khmer is first-class (the queue, status words and error messages too); (4) the README is all eight sections and true to the code; (5) the reflection says something specific; (6) it is finished: empty states, plain error messages, phone width, no test entries, no TODO or lorem in shipped pages, no console errors on the main pages, English and Khmer each consistent.

**README, eight sections in this order** (guide: `../Week13/Course Final/ReadmeFile_Guide.md`): what this is; who it's for; how it works (tables, statuses, policies, true to the SQL actually run); security decisions (the gate, what `review_entry` does, what a hidden button does not protect, the decisions the briefs left open); AI use (models, what they wrote, what was kept or rewritten, how it was checked; a table works well); sources and credits; running it locally (env var NAMES only, never values); a submission checklist copied from the guide with yes and where to look. The guide warns that an AI-drafted README describes things that are not there: check every line against the code, and write `UNSURE` where unsure. **The instructor accepts AI use being stated plainly; credit it honestly.**

**Reflection, four questions** (short paragraph each): what was decided that the briefs did not decide; where the AI got it wrong and how it was caught (the example that taught most); who the archive is for in Cambodia, what was adapted, what the source said when shown it; what would be done differently, and what is next as a developer who works with AI.

**Lab 13 "Polish Checklist"** (`../Week13/Lab13_Guide.md`): nothing new gets built. The seven checks (phone width; a Khmer search and an empty state; a stranger's add-entry flow; console attacks and whether the site says anything; logged-out network tab shows nothing pending or returned; entries credited and none obviously test; a README that describes this app), then: queue publish/return, published edit goes back to pending (reviewer's stays published), every user-visible error in plain words, every empty state says something, search the repo for TODO, lorem, placeholder, sample and test, **search the git history for anything that looks like a secret (if one was ever committed, ask the instructor how to handle it before Nov 22)**, fix red console errors, Khmer on entries, the queue, status words and error messages. The Lab 13 Trade Archives discussion post is separate coursework, not graded, and does not touch the repo.

**Lab 13 progress (2026-11-21).** The student ran no browser checks. The Trade Archives post is ungraded; the guide itself says to run the checks on your own archive, so no partner is needed.
- **Done and clean (read-only, by the AI):**
  - Git-history secret scan, all branches: no JWT, `sb_secret_`, `sb_publishable_`, `service_role`, Google or OpenAI-style key, project URL or quoted password in any commit, and no `.env` file ever tracked.
  - Search of the shipped code for TODO, lorem, placeholder, sample and test: only input hint text and regex `.test()` calls.
  - Error messages read in the code: only fixed plain strings, no raw Supabase text.
  - Empty states read in the code: the queue (EN+KM), /my-entries, home, /browse and search (EN+KM) all say something.
- **Already proven by the changelogs (no re-run needed unless the code it covers changes):**
  - Stranger publishing their own entry (Lab 10 attacks 1 and 2b).
  - Logged out sees nothing unpublished (attack 5).
  - Add-entry waiting message (Lab 10/11, live check 2026-11-08).
  - Queue publish/return/resend and reviewer edit staying published (Lab 11, B1).
  - Published edit going back to pending (Lab 10, B5).
  - Khmer search and the bilingual no-match state (CHANGES3).
- **Ownership attack PASSED (2026-11-21, student, live site, console as archive.test.three, uid starts d0492a09):** an update of another account's published entry ("Mooncake Ngoyen Egg 1") with `{ title: <same title>, status: 'pending' }` returned `data: []`, `error: null`, status 200; nothing changed. This is the first run against the update policy Lab 10 rewrote (the last ownership attack was Lab 7).
- **Decided by the student:**
  - B2 is deferred to the test-entry cleanup. Low risk: Storage has no select policy, so files cannot be listed, and the link sits in a pending entry only the owner and reviewers can see. Delete the Storage file by hand too, because deleting an entry leaves its photo behind.
  - B4 is skipped (optional).
- **Lab 13 is DONE** except the two checks that wait for the toggle (below).
- **Bug fix, line breaks in descriptions (2026-11-21; PASSED on localhost, student-tested on the entry page and the edit form; /review skipped, no pending entry had line breaks, same one-line style):**
  - The bug: line breaks typed in the form were saved, but a `<p>` collapses them, so the entry page and the review queue showed one run of text.
  - The fix: `whiteSpace: "pre-wrap"` added to the description styles in `app/entries/[id]/page.js` (English and Khmer) and `components/ReviewEntryCard.js` (`text`, `textKhmer`), the same as the reviewer's note in `MyEntryRow.js`.
  - Home and browse cards are left squashed on purpose: they clamp to a few lines, and blank lines would waste them.
  - No database change.
- **Still open:**
  - Phone width 390: never tested live.
  - Red console errors: never recorded.
  - Khmer gaps: go to the toggle chat.
  - Test-entry cleanup: last stretch.
  - Phone and console checks are best run once, after the toggle lands, because the toggle touches every page.

**Language toggle progress (2026-11-21):**
- Three modes planned: both (today's look), English only, Khmer only.
- **String count done (read-only, by the AI):** 151 different English strings have no Khmer, used in about 200 spots. 16 strings already have the student's Khmer.
- The list is outside the repo: `../Week13/Language_Toggle_Files/Khmer_Strings_For_Gemini.md`. It has IDs, where each string appears, and a "words to keep the same" table, for Gemini to translate.
- The existing Khmer uses several words for one idea: four for "entry", two for MY ENTRIES, two for "publish", two for "reviewer", three for "return". Gemini is asked to recommend one each. The student decides.
- Spotted while counting (the student's call, English to fix first if wanted):
  - The home footer still says "under construction all semester. Come back in December."
  - The About text says "your uncle's shop".
  - The English uses both LOG IN and SIGN IN.
- **Later re-translation is expected.** The instructor allowed the student to rewrite the front page in English first: the title, the credit, some descriptions and wording, probably during the UX/UI work. The real entry data update also changes text. Changed English strings will go back to Gemini by ID. Entry text is separate: it lives in the entries' own Khmer fields, not in this list.
- **Gemini's Khmer is back:** `../Week13/Language_Toggle_Files/khmer_strings_translated.md` (Gemini 3.1 Pro). All 151 IDs came back, the English unchanged and the placeholders kept. **The student still has to read and correct every Khmer string** (AGENTS.md final-sprint rule).
- **Decisions (student, 2026-11-22):**
  - New strings use Gemini's words: ធាតុ (entry), ធាតុរបស់ខ្ញុំ (MY ENTRIES), ផ្សព្វផ្សាយ (publish), អ្នកពិនិត្យ (reviewer), បញ្ជូនត្រឡប់មកវិញ (return).
  - The student's 16 existing Khmer strings stay as written, except:
    - The RETURN button becomes បញ្ជូនត្រឡប់មកវិញ.
    - The PUBLISHED status becomes បានផ្សព្វផ្សាយ (to match the PUBLISH button).
    - The MY ENTRIES name inside the two save notices becomes «ធាតុរបស់ខ្ញុំ», so it matches the menu.
  - **Flagged for later:** the notices still say ការដាក់ស្នើ and ខ្លឹមសារ for "entry" (interchangeable, the student will decide). REVIEWER'S NOTE (អ្នកវាយតម្លៃ) and the reason label (ការប្រគល់ត្រឡប់) keep the student's words.
  - "both" mode = exactly the look before the toggle. The new Khmer shows only in Khmer-only mode.
  - Entry text: English-only hides an entry's Khmer title and description; Khmer-only shows them and falls back to English when an entry has none.
  - TEXTURE label = `សាច់នំ (វាយនភាព)`; the error message keeps សាច់នំ.
  - AB9: "your uncle's shop" becomes "my uncle's shop" (ហាងរបស់ពូខ្ញុំ).
- **Design:**
  - A `lang` cookie ("both", "en" or "km"; default "both"), read on the server by `utils/lang.js` (`getLang()`) and passed down as a `lang` prop.
  - `utils/strings.js` holds every string by ID (generated by script from Gemini's file, Khmer never retyped), with `t(lang, id, vars)` and the English fallback.
  - `components/LangSwitch.js`: three buttons in the header that set the cookie and call `router.refresh()`.
  - `<html lang>` follows the mode. One CSS rule in `app/globals.css`: `:lang(km)` gets no letter spacing.
- **Step 1 DONE and student-tested (2026-11-22, localhost, PASSED: switch, Khmer header logged out and in, the choice kept across refresh and pages):** `utils/strings.js`, `utils/lang.js` and `LangSwitch.js` added; `app/layout.js`, `SiteHeader.js`, `AuthHeader.js`, `LogoutButton.js` and `globals.css` changed. Checked by the AI on a throwaway dev server (port 3005, stopped afterwards): the home page in all three modes gave the right `<html lang>`, the right switch button pressed, and the header links in English or Khmer.
- **Next steps:** 2 public pages (home, browse and search, cards, entry page, collection identity, tab title); 3 login, sign-up and the add/edit form with its errors; 4 my entries, review queue, the existing bilingual parts; 5 the phone and console checks in all three modes. If time runs out, hide the switch and go to the README.

**Order of work from here (agreed 2026-11-21; one chat per job; the toggle is graded, the instructor wants it):**
1. **Lab 13: DONE.**
2. **Language toggle and Khmer, NEXT.** Start with Lab 13's Khmer gaps (listed below). If it is not done by Sunday morning, stop and do the README: an untouched README scores 0.
3. README.
4. Real entry data.
5. Reflection.
6. The last stretch: clear the test entries plus the B2 Storage file, phone and console checks, merge `experiment` into `main` (the line-break fix is not live until then), wake Supabase, the video, the Show Your Archive post, submit.
7. UX/UI only with time left.

The Q&A slot must be booked before Nov 22: do it now, not in the last stretch.

**Oldest-broken-thing-first rule from the brief:** a visitor who cannot search is worse than a queue with a rough edge; then the gate; then the README; then the video. (The brief also says "no new features in the polish weeks", but the student reports the instructor only cares that the deadline and the Final Capstone requirements are met and said to do whatever is necessary, so new work such as the three-way language toggle is fine. The brief's rules are guides, not limits.)

## Known open items carried from Sprint 3 (decisions, not bugs; several now count against the rubric)

Details and file:line in `../Week11/Week11-Review-3Lenses/OwnAuditFindings.md` and `docs/sprint 3/CHANGES11_ReviewFixes.md` ("Left open on purpose").

- **B2, a credential exposure:** one old test entry's photo is a console screenshot showing an email and a password, still publicly reachable in Storage bucket `photos` (the entry itself is pending). Fix: remove the Storage file and delete the entry by exact id; if the account is archive.test.two (the reviewer), change its password. Never a broad WHERE.
- **B4, the gate (rubric criterion 2):** `entries.photo_url` accepts any URL (proved from the console 2026-11-08, probe row deleted). Fix: one check constraint (null, `/images/%`, or this project's `photos` bucket URL), then the five Lab 10 attacks again.
- **Ownership attack: PASSED on the live site 2026-11-21** (see Lab 13 progress above). The five Lab 10 attacks were not re-run after the A6 trigger (it changed no policy or function).
- **Khmer gaps** (rubric criteria 3 and 6; Khmer comes from the student, or from a Gemini draft the student reads and corrects, per the AGENTS.md final-sprint amendment; Khmer the student already wrote stays as written): the two notice headings in `EntrySentNotice.js`, the two hints in `MyEntryRow.js` (the pending hint's wording changed 2026-11-08), the CONTRIBUTED BY label on cards, the /review heading, its sentence and the REVIEW header link, the MY ENTRIES link, and most menus and headings (English-only since the Week 8 decision to skip the language toggle). Also two different Khmer words for MY ENTRIES in the two notices, and different Khmer words for "publish" and "reviewer" in the same flow (audit B6).
- **Old test entries** are still pending in the database (about 9), plus any throwaway entries. Confirm nothing test-like is public.
- **Smaller, from the audit:** the form only fits mooncakes though the archive promises proverbs and Chinese (audit B1, the largest finding; a design decision); the word counter assumes spaces (B2); email confirmation is off with no submission limit; one person can submit and review their own entries; free-text credit; `review_note` has a 500-character limit only in the browser; orphan photos in Storage after delete or replace; EXIF/GPS not stripped; some failed queries are shown but not logged.
- **Sourcing:** the student's draft says some images are AI-generated (Gemini) and the hero is Gemini-painted. The README must say so plainly; the rubric wants real entries credited by name with permission (at least eight real entries, each with a credited source).

## State of the system (as built; verify against the code and the database before the README states it)

- Next.js 15 App Router, React 19, JavaScript only, plain React, inline styles plus CSS variables (Midnight and Gold theme). Dependencies: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`.
- Pages: `/`, `/browse`, `/entries/[id]` (owner-only EDIT and DELETE at the top), `/entries/[id]/edit`, `/contribute`, `/my-entries`, `/login`, `/signup`, `/review` (reviewers only).
- Supabase: table `entries` (status pending, published or returned; `review_note`; `updated_at` set by trigger `entries_set_updated_at`, which a browser cannot set); table `reviewers` (RLS on, no policies; archive.test.two is the only row); functions `is_reviewer()` and `review_entry(entry_id, decision, note default null)` (security definer, return true or false and no error); policies: select = published, or your own, or reviewer; insert = own and pending; update = own and (pending, or reviewer); delete = own; Storage bucket `photos` (public, 5 MB, JPEG/PNG/WebP). **The SQL is not in the repo.** For the README's "how it works" and "security decisions", ask the student to run a read-only export of the real policies and functions (`pg_policies`, `pg_get_functiondef`) and paste the result; do not describe policies from memory.
- Accounts: archive.test.two = the reviewer; archive.test.three = the second account and the stranger; archive.test.one owns the nine real entries.
- Env vars (names only): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, in a gitignored `.env.local` and in Vercel.

## Rules for this sprint

- **`AGENTS.md` now ends with a "Final sprint amendment" (appended 2026-11-19; nothing above it was changed).** It allows minimal, student-approved dependencies (propose one at a time), lifts the 80-line limit, relaxes the CSS and component library rule for approved libraries only, and lets Gemini draft Khmer translations that the student reads and corrects. Rules 3 (no secrets) and 4 (scoped diffs) and the review-every-diff working style still stand. The instructor also said the three-way language toggle is fine.
- Still true: no keys, tokens, passwords or project URL in any repo file; no `next build` while the student's `npm run dev` is running (check port 3000); never open `Week8/Gemini_models_from_API_keys.md` (contains an API key); Khmer text is never invented, translated or "fixed" by the AI; database changes are SQL the student runs by hand in `begin`/`commit` blocks, with code written after; the student commits (small commits, AI-assisted ones marked); say plainly when a skipped check covers something that changed; short answers (the student is often short on time); give exact numbered test steps with pass and fail, and say whether a step changes data.
- The UI/UX overhaul (`docs/UI-UX overhaul/OVERHAUL_NOTES.md`) is paused, and the student will resume it as polish. Do not touch styling unless asked.

## Where the sources are (outside the repo unless noted)

- `../Week13/`: `Lab13_Guide.md`, `Course Final/` (`FinalCapstone.md`, `How_Final_Is_Graded.md`, `ReadmeFile_Guide.md`, `VideoDemo.md`), `MyReadMeFile_Draft.md` (the student's rough notes), `MyPlanForThisWeek/MyPlan.md` (the student's own plan, written 2026-11-19: Lab 13 first, the language toggle, README, AGENTS.md update, UX/UI continuation, real entry data, reflection; `Week13_CurrentNotes.md` in the same folder holds the decisions, the graded items the plan misses and the working style; `HandoffFromWeek12Chat.md` there is only an archive of the Week 12 planning chat), `Lab13_TradeArchives_DiscussionPost.md`.
- The student will add a final-sprint folder with all the process logs and reflection logs submitted on Canvas; the README's AI-use section and the final reflection draw on them. Earlier ones: `../Week10/Week10_Submissions.md`, `../Week11/Week11_WritingsForCanvas.md`, `../Week12/Week12-SubmissionsForSprint3/Sprint3_Submissions.md`.
- AI-use history for the README (as the student gave it; unverified by the AI): Cline with OpenRouter in Weeks 1 to 5 (Ox Alpha, which was free at launch and turned out to be Z.ai, then DeepSeek V0731); from Sprint 2, Claude Code, on Sonnet 5.5 (the student needed image reading, which DeepSeek lacked). Peer reviewers: Lyching and Kimyoo. The repo changelogs (`docs/CHANGES*.md`, `docs/sprint 2/`, `docs/sprint 3/`) record what the AI wrote and what was changed; they are the best evidence for "what I kept and what I rewrote".

## Opening message for a new chat

```
Final sprint (Weeks 13 to 16; everything due Sun 2026-11-22, 11:59 PM, no late window): the Khmer Living Archive's polish,
cleanup, README, reflection and demo video. Read AGENTS.md (its last section is the final-sprint amendment), then docs/FINAL_SPRINT_NOTES.md, then check `git status` and `git log --oneline -5`. docs/PROJECT_NOTES.md is
the history of Sprints 1 to 3: read it only where needed. My plan for the week is in ../Week13/MyPlanForThisWeek/MyPlan.md
(read it, and Week13_CurrentNotes.md next to it, for the decisions and working style); my process and reflection logs will be in the final-sprint folder. Short plan first, small steps, I
commit and run all SQL by hand; all Khmer wording comes from me.
```
