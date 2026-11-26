# FINAL SPRINT NOTES - handoff for the final capstone (Weeks 13 to 16, due Sun 2026-11-22)

> **How to use this file**
> This is the live handoff for the final sprint. Read `AGENTS.md` first, then this file. `docs/PROJECT_NOTES.md` is now the history of Sprints 1 to 3 (large; read only the part you need, and treat anything it says about "next" as stale). **Update this file in place as work lands**, without asking the student.
> Written 2026-11-19. This file stays in `docs/` (the student's decision, 2026-11-21). The final sprint's changelogs go in `docs/final sprint/`, numbered by week like Sprint 3 (Week 13 = `CHANGES12_`).
>
> **Changelog index (final sprint):**
> - `docs/final sprint/CHANGES12_PolishChecklist.md`: Lab 13 (checks already proven, secret and TODO scans, ownership attack passed, B2/B4 decisions, the line-break fix).
> - `docs/final sprint/CHANGES12_LanguageToggle.md`: the three-way language toggle (DONE 2026-11-22: steps 1 to 5, what each changed and how it was tested, and what the README should say about it).
> - `docs/final sprint/CHANGES12_ReviewerTakeDown.md`: a reviewer can return a published entry (the `review_entry` change and the button; all tests passed 2026-11-22).
> - `docs/final sprint/CHANGES13_RealEntryData.md`: after the deadline, the nine entries' new descriptions, Khmer titles, source and sweetness (SQL run 2026-11-26; FLAG: Week 4 facts kept unchecked).
> - Also: `README.md` (eight sections, a living document) and `docs/database.md` (the live database's definitions).

## AFTER THE DEADLINE (updated 2026-11-23, 00:15)

- **Submitted on time (student):** the capstone (live URL, repo, reflection) and the Week 13 process log. The last commit before the deadline is `a192b50` (22:45, take-down button), on `main` = `experiment`, live.
- **NOT submitted: the demo video.** The student could not record (a technical problem) and emailed the instructor; waiting for the reply. The script is ready: `../Week13/VideoDemo_Script.md` (the "AI got it wrong" example is now the Sprint 2 `UPDATE ... WHERE contributor IS NULL` that credited all 17 rows).
- **One published test entry is still on the live home page** (left on purpose to take down on camera). If the video is delayed, take it down now (reviewer, the entry's page, RETURN), because the instructor grades the live URL.
- **Still open:** the Show Your Archive post (it needs the video link; replies due Sun 2026-11-29); keeping Supabase awake during grading; Q&A prep for **Dec 4**; README checklist lines (video, Supabase, live re-check, reflection pasted = yes) once the instructor replies.
- **After-deadline wish list (student):** the title rename (mooncakes only), the source line, combining CURATED BY / SOURCE / CITY on the home page, real entry data (the AI-written descriptions), maybe an Ingredients field, the UX/UI continuation, the queue's old test entries, the B2 screenshot file.

## Real entry data chat: start here (written 2026-11-25)

**Context:** the Water Festival break (about 3 to 4 days from 2026-11-25; the instructor is away). The student works on the project meanwhile and is still trying to fix the video recording (the script is ready). Git: `main` = `experiment` = `a192b50`, clean apart from this file. Nothing is due during the break; the Show Your Archive replies are due Sun 2026-11-29 and the Q&A is on **Dec 4**.

**PROGRESS (2026-11-26):**
- **Student's answers:** the test entry was NOT taken down yet (the instructor is away until Fri 2026-11-27). The instructor replied about the video: thanks for communicating, he will see what he can do. Changelog name `docs/final sprint/CHANGES13_<Name>.md` is OK, but **show the student the changelog text in chat before creating the file.** The home footer (HM6 "under construction... Come back in December") and the unused `data/entries.js` are left alone (student's call).
- **The student's plan for the entries:** Claude gathers everything; the student gives what facts they can (from the shop); Claude rewrites the descriptions to read "exquisite and premium", from the student's facts only (nothing invented). Khmer still comes from the student or a Gemini draft they correct.
- **The live database has 10 published entries:** the nine real ones (contributor Ly Srun Nguon, all added 2026-09-25, never edited: `updated_at` is null) and **one test entry, "Lab11 part 4"** (contributor តេណា, archive.test.three, 2026-10-30). That one is the published test entry still on the home page.
- **Review sheet made:** `../Week14/RealEntryData/Entries_Current.md` (outside the repo). For each of the nine it has every field, the entry id, both descriptions copied verbatim from the database (read-only fetch with the publishable key as a logged-out visitor), and a "Facts from the shop" box for the student. **Texture, sweetness and saltiness are empty on all nine**; every one has a Khmer title and a Khmer description.
- **Student's changes (2026-11-26), now in the sheet (NOT on the live site yet):**
  - Khmer titles: នំព្រះច័ន្ទ became នំព្រះខែ; the two Ngoyen titles got ង៉ូវយ៉េង after it (no space; the student's words). Peah titles unchanged.
  - Shapes: the student's list (Peah and Lotus round; Ngoyen and Pandan square) already matches the database. No change.
  - Sweetness: Ngoyen 5, Lotus 3, Pandan 4, Bean Paste 2. The Peah score depends on the filling (taro 4, bean 2, winter melon 3). The `sweetness` column is one integer from 1 to 5, so neither three values nor "2-4" fits without changing the column. Proposed: leave it empty (the page hides it) and say it per filling in the description. Waiting for the student. Saltiness is left empty for now.
  - New English descriptions: Claude rewrote the student's edited text in a more premium style, with no new facts. Lotus Paste Egg 2 is fully new: two yolks, a bit bigger, otherwise the same as Egg 1. Pia became Peah, and "above" was removed. The student's edited version is backed up only in the session scratchpad.
  - `../Week14/RealEntryData/Descriptions_ForTranslation.md` holds the nine new English descriptions plus a word list (mooncake = នំព្រះខែ, Ngoyen = ង៉ូវយ៉េង, Peah = ពា, 福 kept). The student translates them with Google Translate or Gemini, then pastes the Khmer into the sheet's "New Khmer description" boxes.
- **More decisions from the student (2026-11-26), now in the sheet:**
  - Khmer titles: សាច់ became ស្នូល.
  - The source of all nine is "My uncle's shop: Tea Tek Bouy Bakery". The two Ngoyen entries said only "My uncle's shop".
  - Peah sweetness stays empty.
  - The Week 4 facts are kept (no time to check them).
  - Lotus Paste Egg 2 was expanded to 98 words at the student's request.
- **Two translations made by the student**, in the same folder: `Descriptions_TranslatedByGoogleTranslate.md` and `mooncake_descriptions_khmer.md`. Claude compared them. Google's has ពងមាន់ (chicken egg) in Ngoyen 2, «ពៀ» for Peah, three different words for "mooncake", and English left in brackets. **The student chose Gemini's** with four word fixes: បោះពុម្ព became បោះត្រា, សម្បក became សំបក, and ស្លឹកតយ and ទាជីវ were kept. The Pandan title's ស្លឹកតី also became ស្លឹកតយ.
  - Result: `../Week14/RealEntryData/Descriptions_Khmer_Final.md` (made by script; the student's Gemini file is unchanged). All nine paragraphs are copied verbatim into the sheet's "Description (Khmer), NEW" blocks.
- **Model name confirmed by the student: "Gemini 4 Neon"** (not "Gemini Neon 4"). Corrected 2026-11-26 in `README.md` (2 lines), `docs/final sprint/CHANGES12_LanguageToggle.md` (2 lines) and this file. The already submitted reflection draft and the README working notes in `../Week13/` still say "Neon 4" and were left alone.
- **STEP 5 (the nine descriptions) DONE and LIVE (2026-11-26).**
  - The student ran `../Week14/RealEntryData/Update_Entries.sql` ("Success. No rows returned") and checked the live site.
  - The AI re-fetched read-only: all nine match the SQL, are still published, `updated_at` = 2026-11-26.
  - Changelog: `docs/final sprint/CHANGES13_RealEntryData.md`. It has a FLAG section: the Week 4 facts kept unchecked.
  - README updated: section 1 (sweetness line), section 5 (Week 4 row, two Nov 26 rows, "The Khmer, honestly"), section 6 (descriptions), section 8 (the test-entry line now says NOT YET: "Lab11 part 4" is still public).
  - **The student no longer wants to preview changelogs: write them directly.**
- **The student is leaving "Lab11 part 4" published for now** (may come back to it). When it is taken down, update README section 8 and CHANGES13 "Still open".
- **Next (the student's list): the small home-page fixes.** Step 1 (title rename), step 2 (source line), step 3 (combine CURATED BY / SOURCE / CITY). Then step 4 (Ingredients) and saltiness, if wanted. All uncommitted so far: README, CHANGES12 (model name), CHANGES13 and this file.

**Ask first, in one short message:**
1. Was the last published test entry taken down (reviewer, its page, RETURN)? If not, do it before anything else: the instructor grades the live URL.
2. Did the instructor answer about the video?
3. The real facts for the entries: the student provides them (from the uncle's shop). The AI never invents descriptions, ingredients or Khmer.

**The job, in the student's order (one step at a time: plan, approve, build, student tests, student commits):**
1. **Title rename** to a mooncake collection (proverbs and Chinese were dropped, with the instructor's agreement).
   - `collection.config.js`: `name` and `description`, and their Khmer in the `km` block. The new Khmer comes from the student, or from a Gemini draft the student corrects.
   - The title is also the browser tab title (`app/layout.js` reads it) and the /browse heading.
2. **Source line:** `collection.config.js` `source` says "my mom, uncle and grandma"; everything came from the uncle's shop. The `km.source` changes too.
3. **Combine CURATED BY, SOURCE and CITY on the home page.** Today they are three separate cards in `app/page.js` (about lines 110-121), with labels HM1, P6 and HM2 and values `collection.curator`, `archive(lang, "source")` and `archive(lang, "city")`. Styling only, no data change. The UI/UX overhaul is paused, so propose one small layout first.
4. **Ingredients field (new).** Order: SQL first, then code.
   - SQL (the student runs it): `alter table entries add column ingredients text` (nullable), plus a length constraint like the others (null, or 1 to N).
   - Also add `ingredients` to the trigger function `set_entry_updated_at`'s two content lists. Otherwise an edit that only changes ingredients would not count as an edit. That means `create or replace` with the full function from `docs/database.md`.
   - Code: `utils/entryWrite.js` `entryColumns`; `utils/validateEntry.js`; `utils/entryFields.js` (the form field); the entry page `app/entries/[id]/page.js` (select and show); `components/ReviewEntryCard.js` and `app/review/page.js` (select); the edit page's select.
   - New strings: the label, hint and error in English and Khmer. **Add them as lines in `../Week13/Language_Toggle_Files/gen_strings.js`** (like the student's decisions there, `all.XX = { en, km }`) and re-run it. Never hand-edit `utils/strings.js`, or the next re-run loses it. The run command is under "Generator script" below.
   - Docs: README sections 3 and 6, `docs/database.md`.
5. **Update the nine entry descriptions** (English and Khmer, plus sweetness, saltiness and the new ingredients) with the student's real facts, replacing what Claude wrote in Week 4.
   - **Watch out:** archive.test.one owns the nine real entries and is not a reviewer. An edit through the site's form sends each entry back to `pending`, so it disappears from the public pages until the reviewer publishes it again (the same rule the video shows).
   - Either edit through the form and republish each one from /review, or the student runs an `update ... where id = '<exact id>'` per entry in the SQL Editor. That keeps `published` and still bumps `updated_at`. Never a broad WHERE: see the Sprint 2 `contributor IS NULL` mistake.

**After it lands, update these living lines:**
- README: section 1 (the title note goes); section 3 (the `ingredients` column); section 5 (the Week 4 row: descriptions replaced); section 6 (descriptions from the shop; the AI only formatted them, if that is what happened); the checklist.
- `docs/database.md`: column, constraint, trigger.
- This file.
- Changelogs: `docs/final sprint/CHANGES13_<Name>.md` (post-deadline work; confirm the number with the student).

**Also still open (not this chat unless asked):** the video, the Show Your Archive post and replies, keeping Supabase awake, Q&A prep (Dec 4), the UX/UI continuation (`docs/UI-UX overhaul/OVERHAUL_NOTES.md`), the queue's old test entries, the B2 screenshot file in Storage.

## Where we were (2026-11-22, evening)

- **MERGED AND LIVE (2026-11-22):** `main` = `experiment` = `817f97b` (README, `docs/database.md`, the toggle, the line-break fix) pushed by the student; the live site serves the toggle (checked by fetching the home page). **The Q&A slot is booked** (date and time still to get from the student for the README checklist).
- **Reviewer take-down (2026-11-22, the student's own decision, done before the video):** the SQL was run (`review_entry` can now return a published entry). The code is written and AI-checked logged out: `TakeDownButton.js` (new), `ReviewButtons.js` (`showPublish`), `app/entries/[id]/page.js`. The README (sections 3, 4 and 5, Q&A Dec 4), `docs/database.md` and `docs/final sprint/CHANGES12_ReviewerTakeDown.md` are updated. **Student tests ALL PASSED (2026-11-22):** the stranger's `review_entry` returned `false`; both published test entries were taken down, so **the public shelf has only the nine real entries**; the owner sees RETURNED with the note; a non-reviewer sees no box. The README attack table and checklist were updated. **The student chose to leave** the old pending tests in the queue and the B2 screenshot in Storage; README section 4 says both honestly. The video script now shows the take-down as the "one decision" (it also hides the demo entry again). Next: commit, merge, record. **At 22:40 the student chose (on advice) to leave for after the deadline:** the title rename, the source line, and combining CURATED BY / SOURCE / CITY on the home page (`app/page.js` lines ~112-120, `collection.config.js` and its `km` block; the Khmer comes from the student). One published test entry was left on purpose to take down on camera; the demo entry is taken down right after recording.
- **New order (student, 2026-11-22):** test-entry cleanup, then the **demo video** (script: `../Week13/VideoDemo_Script.md`), the Show Your Archive post, then real entry data only if time is left (the instructor said it is not required). Q&A prep comes later (nothing to submit).
- **Two test entries are PUBLISHED on the live home page:** "test entry for lab 12 return for reviewer" and "waiting politely". The old pending tests also fill the reviewer's queue. Both would show in the video, so the cleanup goes first.
- **Ingredients field: not tonight** (the student asked). It needs a column, a constraint, the trigger's content list, the form, validation, the entry page, the review card, strings (EN and KM) and the README and database.md: about an hour and a half with testing.

## Where we were (end of the toggle chat)

- **Git (checked 2026-11-22):** on `experiment` = `origin/experiment`, last code commit `57a2871` (toggle step 4). With the step 5 docs commit it is **8 commits ahead of `main` = `origin/main` = `7ca8ef9`** (Sprint 3):
  - the handoff and Lab 13 docs;
  - the line-break fix;
  - the toggle, steps 1 to 5.
- **`README.md` is still the course starter** (unchanged since the template's first commit).
- **Vercel deploys `main`, so nothing since Sprint 3 is live yet.** Merge `experiment` into `main` and push before the deadline, so the toggle, the line-break fix, the amended `AGENTS.md` and the README are live and on the default branch.
- **Week 12 / Sprint 3 code is DONE and live.** All Sprint 3 code is in `7ca8ef9` on `main`. Everything is merged and deployed on Vercel (Vercel deploys `main`). A live check on 2026-11-08 passed as a logged-out visitor, as archive.test.three and as the reviewer archive.test.two. Details: `docs/sprint 3/CHANGES11_ReviewFixes.md` (A1 to A3, A6, B1, B3, B5, Q3, Khmer for the two waiting messages).
- **Sprint 3 Canvas writing:** the submission, journal and reflection were drafted and finalized in `../Week12/Week12-SubmissionsForSprint3/Sprint3_Submissions.md` (outside the repo). The student submitted all of Sprint 3 on Canvas by the due date, 2026-11-08 (confirmed by the student on 2026-11-19). That file is useful source material for the README's AI-use section and the final reflection.
- **CORRECTED 2026-11-22 (student): there IS a Week 13 process log, due Sun 2026-11-22**, extended by the instructor to cover Weeks 13 and 14 (the "Nov 15" date was his mistake). Same five questions as the earlier logs (learn, try, worked, didn't, models). Drafted in a Week folder, never in the repo. **There is no Prompt Journal for the final.** AI use goes in the README. Weeks 8, 9 (Pchum Ben holidays) and 12 had no process log.
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
- **Lab 13 is DONE.** Its last two checks, phone width and the console, ran with the toggle's step 5 (2026-11-22, localhost) and passed.
- **Bug fix, line breaks in descriptions (2026-11-21; PASSED on localhost, student-tested on the entry page and the edit form; /review skipped, no pending entry had line breaks, same one-line style):**
  - The bug: line breaks typed in the form were saved, but a `<p>` collapses them, so the entry page and the review queue showed one run of text.
  - The fix: `whiteSpace: "pre-wrap"` added to the description styles in `app/entries/[id]/page.js` (English and Khmer) and `components/ReviewEntryCard.js` (`text`, `textKhmer`), the same as the reviewer's note in `MyEntryRow.js`.
  - Home and browse cards are left squashed on purpose: they clamp to a few lines, and blank lines would waste them.
  - No database change.
- **Phone width 390 and the console: PASSED** (localhost, all three modes; details under step 5 of the toggle below). On the live site they are checked once more after the merge, in the last stretch.
- **Khmer gaps: DONE** through the toggle. Every interface string now has Khmer, shown in Khmer-only mode.
- **Still open:** test-entry cleanup, in the last stretch.

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
- **Gemini's Khmer is back:** `../Week13/Language_Toggle_Files/khmer_strings_translated.md` (Gemini 4 Neon; the file's own footer wrongly says "Gemini 3.1 Pro", Gemini's mistake). All 151 IDs came back, the English unchanged and the placeholders kept. **The student still has to read and correct every Khmer string** (AGENTS.md final-sprint rule).
- **Decisions (student, 2026-11-22):**
  - New strings use Gemini's words: ធាតុ (entry), ធាតុរបស់ខ្ញុំ (MY ENTRIES), ផ្សព្វផ្សាយ (publish), អ្នកពិនិត្យ (reviewer), បញ្ជូនត្រឡប់មកវិញ (return).
  - The student's 16 existing Khmer strings stay as written, except:
    - The RETURN button becomes បញ្ជូនត្រឡប់ទៅវិញ. It was first បញ្ជូនត្រឡប់មកវិញ; after the step 4 test the student changed មក to ទៅ. The RETURNED status and the returned hint (M8) still say មក.
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
- **Step 1 committed:** `b06f831`.
- **Step 2 DONE (2026-11-22; AI-checked on a throwaway dev server; student-tested on localhost, PASSED in all three modes):**
  - Covers home, browse and search, cards, an entry's page with EDIT/DELETE, the loading text and the tab title.
  - The archive's identity now has a `km` block in `collection.config.js`.
  - A second CSS rule gives Khmer h1/h2 a line height of 1.5.
  - Details in the changelog.
  - **A published test entry, "test entry for lab 12 return for reviewer", is on the public home page.** Add it to the test-entry cleanup.
- **Step 2 committed:** `94f7309`.
- **Step 3 DONE (2026-11-22; AI-checked logged out on a throwaway dev server; student-tested on localhost, PASSED in all three modes; the add-entry notice was skipped, same component as the edit notice):**
  - Covers login, sign-up, add and edit with all labels, hints, counters, errors, stages and save notices.
  - The form helpers in `utils/` now return string IDs instead of English. No rule or saving behaviour changed.
  - New helper `sentenceCase`. `BilingualNotice` takes an optional `lang`.
  - Details in the changelog.
- **Step 3 committed:** `b6879db`.
- **Step 4 DONE (2026-11-22; AI-checked logged out; student-tested on localhost, PASSED in all three modes; afterwards the RETURN button's Khmer became បញ្ជូនត្រឡប់ទៅវិញ):** /my-entries and /review, the status badges, review buttons, counter and messages. A scan found no interface text left outside `utils/strings.js`. All 167 IDs are used.
- **Step 4 committed:** `57a2871`.
- **Step 5 DONE (2026-11-22): the checks only, no code.**
  - AI: every main page (home, browse, an entry, its edit page, not found, login, signup, contribute, my-entries, review) loaded in all three modes on a throwaway dev server, 30 requests, all 200, no server errors or warnings.
  - Student, localhost, 390px wide, console open: PASSED.
    - No sideways scroll and no cut-off text, Khmer included. The header wraps cleanly, everything can be read and tapped without zooming, and there are no red console messages.
    - Pass 2 (EN + ខ្មែរ) covered /review as the reviewer, where the two-language buttons wrap onto their own lines (expected).
    - Pass 1 was also run logged in as archive.test.three and as archive.test.two (the student confirmed afterwards). Every page, the add form and /my-entries included, worked normally at 390px.
- **THE LANGUAGE TOGGLE IS DONE (code).** What is left is not code:
  1. The student reads Gemini's Khmer and corrects any string in `khmer_strings_translated.md`. The generator script re-runs it into `utils/strings.js`.
  2. Flagged words: ការដាក់ស្នើ / ខ្លឹមសារ in the two save notices; អ្នកវាយតម្លៃ in REVIEWER'S NOTE.
  3. Optional: Khmer for L4, the switch's "Language" label for screen readers.
  4. The toggle goes live only when `experiment` is merged into `main` (last stretch).
- **Generator script:** `../Week13/Language_Toggle_Files/gen_strings.js` (outside the repo). Checked: it reproduces `utils/strings.js` exactly.
  - Run from the repo: `node ../Week13/Language_Toggle_Files/gen_strings.js ../Week13/Language_Toggle_Files/khmer_strings_translated.md ../Week13/Language_Toggle_Files/Khmer_Strings_For_Gemini.md utils/strings.js`.
  - The student's word decisions (K2, K5, K14, K15, FL9, AB9) are lines in the script, so a re-run keeps them.

**Order of work from here (agreed 2026-11-21; one chat per job; the toggle is graded, the instructor wants it):**
1. **Lab 13: DONE.**
2. **Language toggle and Khmer: DONE (2026-11-22),** code and checks. The student's Khmer read-through is still to do.
3. **README: DONE (drafted and corrected 2026-11-22; living lines listed in "README chat: start here").** Then, by the student's choice, the **reflection and the Week 13 process log came before real entry data**: drafted 2026-11-22 in `../Week13/WeeklyProcessLogs+ReflectionLogs/Final_Reflection_Draft.md` (outside the repo; `[CHECK]` marks what only the student can confirm). The uncle has not been shown the archive yet (reflection Q3 says so).
   README (history of this item): (due today, Sun 2026-11-22, 11:59 PM; an untouched README scores 0). It now has the toggle to describe in "who it's for" (language) and in "AI use" (Gemini drafted the interface Khmer, the student corrected it).
4. Real entry data.
5. Reflection, and the **Week 13 process log** (due today too, covers Weeks 13 and 14).
6. The last stretch: clear the test entries plus the B2 Storage file (including the published "test entry for lab 12 return for reviewer"), merge `experiment` into `main` (the line-break fix and the whole toggle are not live until then), a quick phone and console look on the live URL, wake Supabase, the video, the Show Your Archive post, submit.
7. UX/UI only with time left.

The Q&A slot must be booked before Nov 22: do it now, not in the last stretch.

**Oldest-broken-thing-first rule from the brief:** a visitor who cannot search is worse than a queue with a rough edge; then the gate; then the README; then the video. (The brief also says "no new features in the polish weeks", but the student reports the instructor only cares that the deadline and the Final Capstone requirements are met and said to do whatever is necessary, so new work such as the three-way language toggle is fine. The brief's rules are guides, not limits.)

## Known open items carried from Sprint 3 (decisions, not bugs; several now count against the rubric)

Details and file:line in `../Week11/Week11-Review-3Lenses/OwnAuditFindings.md` and `docs/sprint 3/CHANGES11_ReviewFixes.md` ("Left open on purpose").

- **B2, a credential exposure:** one old test entry's photo is a console screenshot showing an email and a password, still publicly reachable in Storage bucket `photos` (the entry itself is pending). Fix: remove the Storage file and delete the entry by exact id; if the account is archive.test.two (the reviewer), change its password. Never a broad WHERE.
- **B4, the gate (rubric criterion 2):** `entries.photo_url` accepts any URL (proved from the console 2026-11-08, probe row deleted). Fix: one check constraint (null, `/images/%`, or this project's `photos` bucket URL), then the five Lab 10 attacks again.
- **Ownership attack: PASSED on the live site 2026-11-21** (see Lab 13 progress above). The five Lab 10 attacks were not re-run after the A6 trigger (it changed no policy or function).
- **Khmer gaps: RESOLVED by the language toggle (2026-11-22).** Every interface string now has Khmer, shown in Khmer-only mode; the default "both" mode looks as it did before. The text below is the history of the gap. Khmer comes from the student, or from a Gemini draft the student reads and corrects, per the AGENTS.md final-sprint amendment; Khmer the student already wrote stays as written): the two notice headings in `EntrySentNotice.js`, the two hints in `MyEntryRow.js` (the pending hint's wording changed 2026-11-08), the CONTRIBUTED BY label on cards, the /review heading, its sentence and the REVIEW header link, the MY ENTRIES link, and most menus and headings (English-only since the Week 8 decision to skip the language toggle). Also two different Khmer words for MY ENTRIES in the two notices, and different Khmer words for "publish" and "reviewer" in the same flow (audit B6).
- **Old test entries** are still pending in the database (about 9), plus any throwaway entries. Confirm nothing test-like is public.
- **Smaller, from the audit:** the form only fits mooncakes though the archive promises proverbs and Chinese (audit B1, the largest finding; a design decision); the word counter assumes spaces (B2); email confirmation is off with no submission limit; one person can submit and review their own entries; free-text credit; `review_note` has a 500-character limit only in the browser; orphan photos in Storage after delete or replace; EXIF/GPS not stripped; some failed queries are shown but not logged.
- **Sourcing:** the student's draft says some images are AI-generated (Gemini) and the hero is Gemini-painted. The README must say so plainly; the rubric wants real entries credited by name with permission (at least eight real entries, each with a credited source).

## State of the system (as built; verify against the code and the database before the README states it)

- Next.js 15 App Router, React 19, JavaScript only, plain React, inline styles plus CSS variables (Midnight and Gold theme). Dependencies: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`.
- Pages: `/`, `/browse`, `/entries/[id]` (owner-only EDIT and DELETE at the top), `/entries/[id]/edit`, `/contribute`, `/my-entries`, `/login`, `/signup`, `/review` (reviewers only).
- Supabase: table `entries` (status pending, published or returned; `review_note`; `updated_at` set by trigger `entries_set_updated_at`, which a browser cannot set); table `reviewers` (RLS on, no policies; archive.test.two is the only row); functions `is_reviewer()` and `review_entry(entry_id, decision, note default null)` (security definer, return true or false and no error); policies: select = published, or your own, or reviewer; insert = own and pending; update = own and (pending, or reviewer); delete = own; Storage bucket `photos` (public, 5 MB, JPEG/PNG/WebP). **The SQL is not in the repo.** For the README's "how it works" and "security decisions", ask the student to run a read-only export of the real policies and functions (`pg_policies`, `pg_get_functiondef`) and paste the result; do not describe policies from memory.
- **Language (added 2026-11-22):**
  - A three-way switch in the header: EN + ខ្មែរ (the default), EN, ខ្មែរ. The choice is kept in a `lang` cookie (language only, nothing about the user).
  - The server reads the cookie (`utils/lang.js`), and every page passes `lang` down.
  - All interface text is in `utils/strings.js` by ID, with an English fallback. The archive's identity in Khmer is a `km` block in `collection.config.js`.
  - Entries: EN hides their Khmer fields; ខ្មែរ shows them in the English's place, falling back to English.
  - `<html lang>` follows the mode.
  - No package and no database change. Full description: `docs/final sprint/CHANGES12_LanguageToggle.md`.
- Accounts: archive.test.two = the reviewer; archive.test.three = the second account and the stranger; archive.test.one owns the nine real entries.
- Env vars (names only): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, in a gitignored `.env.local` and in Vercel.

## Rules for this sprint

- **`AGENTS.md` now ends with a "Final sprint amendment" (appended 2026-11-19; nothing above it was changed).** It allows minimal, student-approved dependencies (propose one at a time), lifts the 80-line limit, relaxes the CSS and component library rule for approved libraries only, and lets Gemini draft Khmer translations that the student reads and corrects. Rules 3 (no secrets) and 4 (scoped diffs) and the review-every-diff working style still stand. The instructor also said the three-way language toggle is fine.
- Still true: no keys, tokens, passwords or project URL in any repo file; no `next build` while the student's `npm run dev` is running (check port 3000); never open `Week8/Gemini_models_from_API_keys.md` (contains an API key); Khmer text is never invented, translated or "fixed" by the AI; database changes are SQL the student runs by hand in `begin`/`commit` blocks, with code written after; the student commits (small commits, AI-assisted ones marked); say plainly when a skipped check covers something that changed; short answers (the student is often short on time); give exact numbered test steps with pass and fail, and say whether a step changes data.
- The UI/UX overhaul (`docs/UI-UX overhaul/OVERHAUL_NOTES.md`) is paused, and the student will resume it as polish. Do not touch styling unless asked.

## Where the sources are (outside the repo unless noted)

- `../Week13/`: `Lab13_Guide.md`, `Course Final/` (`FinalCapstone.md`, `How_Final_Is_Graded.md`, `ReadmeFile_Guide.md`, `VideoDemo.md`), `MyReadMeFile_Draft.md` (the student's rough notes), `MyPlanForThisWeek/MyPlan.md` (the student's own plan, written 2026-11-19: Lab 13 first, the language toggle, README, AGENTS.md update, UX/UI continuation, real entry data, reflection; `Week13_CurrentNotes.md` in the same folder holds the decisions, the graded items the plan misses and the working style; `HandoffFromWeek12Chat.md` there is only an archive of the Week 12 planning chat), `Lab13_TradeArchives_DiscussionPost.md`.
- **The process and reflection logs are in `../Week13/WeeklyProcessLogs+ReflectionLogs/`** (added by the student 2026-11-22; outside the repo, keep them there: some screenshots show a project URL, a key and a test login). Folders `Sprint 1/`, `Sprint 2/`, `Sprint 3/`, the raw Canvas files (Google Docs `.docx` exports and PDFs, some duplicates). Read by the AI 2026-11-22: process logs for weeks 1 to 7, 10 and 11, and the three sprint reflections (Sprint 1: the PDF and the docx say the same; Sprint 2: use the `(Updated)` PDF). The Prompt Journals are there too; the student said to skip them. **No log for weeks 8, 9, 12, 13** (12 and 13 had none by design; ask about 8 and 9). To read a `.docx`: its main part is `word/document2.xml` (Google export), not `document.xml`. Earlier Canvas drafts: `../Week10/Week10_Submissions.md`, `../Week11/Week11_WritingsForCanvas.md`, `../Week12/Week12-SubmissionsForSprint3/Sprint3_Submissions.md`.
- AI-use history for the README, **as the logs record it (read 2026-11-22; model names are the student's own words in the logs)**:
  - Weeks 1 and 2 (learning git, no agent): Gemini 3.6 / 3.7 and ChatGPT 5.3 in the browser.
  - Week 2: Cline + OpenRouter. Nvidia Nemotron 3 Ultra (free) failed with errors; Ox Alpha (free, recommended by the instructor; "turned out to be Z ai 5.3") built the entry card, the first 2 entries and the changelog.
  - Weeks 3 to 5: Cline with **DeepSeek flash v4 0731** (Gemini 3.7 recommended it): `data/entries.js`, browse, search (week 3); entry pages, the search query echo, the Khmer fields (week 4); Supabase plumbing, login and sign-up (week 5, DeepSeek only, Cline plan mode).
  - **Week 4: Claude Code first appears, Claude Sonnet 5 (high effort): "I let claude do the descriptions for me" and "adding description to my entries plus translating it from english to khmer".** So the nine entries' English and Khmer descriptions were AI-written. This contradicts the old "all Khmer is the student's" line (which is true from Lab 7/Sprint 3 for interface text). Ask the student whether they corrected that Khmer; the README must say it plainly.
  - Week 6: Claude Code, Sonnet 5 (high): the data model worksheet gaps, the table and policy SQL, the entries insert.
  - Week 7 onwards: Claude Code, **Sonnet 5.5** (high), chosen because it reads images (screenshots of errors and attacks) and DeepSeek in Cline could not.
  - Weeks 10 to 12: Claude Code, Sonnet 5.5 only (planning, SQL, code, attack kits, changelogs, Canvas drafts). The student kept Sonnet because "it knows when to stop".
  - Final sprint (Week 13): Claude Code on Opus 5.5 (Lab 13, the language toggle, the README).
  - Mistakes the logs name (README/reflection material): DeepSeek garbled its own changelog at about 200k context (week 4); DeepSeek "assuming and hallucinating" in the repo-state update (week 5); the one fixed sign-up message hid "password too short" (Sprint 2); `UPDATE ... WHERE contributor IS NULL` credited all 17 rows including 8 test entries (Sprint 2); returned entries of a reviewer never re-queued, a UTC "submitted" date, the false "Only you can see it" hint, a "queue could not be loaded" message added without telling the student (Sprint 3). The student's own miss: a console attack with the placeholder id (400, proved nothing).
  - In the logs, Sprint 2 had **two outside testers**; the partner attack (week 7) passed: update and delete `Array(0)`, `.txt` upload refused.
  - **Student's answers (2026-11-22):** yes, Claude Code (Week 4) wrote the nine entries' descriptions and translated them to Khmer, and **the student never corrected them**; they are unchanged since. The Sprint 3 reflection's "I wrote all the Khmer myself" means the Sprint 3 interface strings (queue, review, hints, notices). The README says both plainly. Weeks 8 and 9 (Pchum Ben) and 12 had no process log. **Leave Lyching and Kimyoo out of the README** (no consent asked); say "two classmates". The entries come from the student's uncle's mooncake shop (sold on Grab); whether to name the shop is open. Gemini images = the UX/UI work from Week 8 (per `docs/UI-UX overhaul/`: the hero `public/hero-moon-*.webp`, the favicon `app/icon.png`, the loader `public/loader-*.png`, the hero made with Gemini in Antigravity; the favicon and loader made in the Gemini web app, model UNSURE (the student thinks "flash 3.8 routing to nano banana pro"), then cut out and added by Claude Code, Sonnet 5.5). The student read some of Gemini's 151 Khmer strings, not all, and the README says so. Who took the nine entry photos in `public/images/` is still to ask. Q&A not booked yet (the student wants to finish the README and reflection first).
  - Before the logs were read, the student's summary was: Cline + OpenRouter weeks 1 to 5 (Ox Alpha = Z.ai, then DeepSeek V0731), then Claude Code on Sonnet 5.5 from Sprint 2. The logs refine it as above. Gemini 4 Neon drafted the toggle's interface Khmer from a list the AI made; the student chose the terms and corrected words. Gemini also painted the hero and some images (see Sourcing above). Peer reviewers: Lyching and Kimyoo. The repo changelogs (`docs/CHANGES*.md`, `docs/sprint 2/`, `docs/sprint 3/`) record what the AI wrote and what was changed; they are the best evidence for "what I kept and what I rewrote".

## README chat: start here (written 2026-11-22)

The README is due tonight (Sun 2026-11-22, 11:59 PM). An untouched README scores 0.

- **Guide and rubric:**
  - `../Week13/Course Final/ReadmeFile_Guide.md`: eight sections in order, and the submission checklist to copy.
  - `How_Final_Is_Graded.md`, criterion 4.
  - The student's rough notes: `../Week13/MyReadMeFile_Draft.md`.
- **The current `README.md` is the course starter's** ("Khmer Living Archive — starter", the Lab 1 steps; unchanged since the template's first commit). It gets replaced.
- **PROGRESS (2026-11-22): step 1 DONE.** The database export was run by the student (read-only) and saved as `../Week13/WeeklyProcessLogs+ReflectionLogs/Supabase Snippet Week 13 - database export.csv`. It matches the changelogs: the 4 entries policies, the 2 Storage policies, `is_reviewer`, the 3-argument `review_entry`, the trigger, the bucket. It confirms there is no `photo_url` constraint and no `review_note` length limit. The section-by-section evidence map, decisions and open questions are in `../Week13/WeeklyProcessLogs+ReflectionLogs/README_WorkingNotes.md` (outside the repo). **Step 2 DONE (draft, 2026-11-22):** `README.md` rewritten (eight sections, 263 lines) and the new `docs/database.md` (the export written up as tables and verbatim functions; definitions only). Both secret-scanned clean. The student's answers used: the uncle agreed to the credit and to the Grab photos; "who it's for" = anyone interested in mooncakes and Khmer and Chinese traditions; reviewers cannot take down published entries (not planned, the lab's SQL); the archive is mooncakes only (proverbs and Chinese dropped with the instructor's agreement; the rename and its re-translation come with the real-entry-data job); `jesseorndorff` is a collaborator; the live URL is in the README. **Step 3: the student reads it and marks corrections.** **Living lines to update later:** the AI-use and sources lines about the Week 4 entry descriptions (after the real-entry-data job); the Gemini 4 Neon "still reading the rest" line; the test-entry and screenshot lines in section 4 and the checklist (after the cleanup); every NOT YET in the checklist (merge, live recheck, Supabase awake, video, reflection, post, Q&A); the title note in section 1 (after the rename); section 6 if UX/UI adds Gemini images.
- **Ask the student first, in one message (done, answers in the working notes):**
  1. To run a read-only export of the real policies and functions in the Supabase SQL Editor (give them the query, `pg_policies` for `entries`, `reviewers` and `storage.objects`, and `pg_get_functiondef` for `is_reviewer` and `review_entry`), and paste the result. The README describes the SQL that was actually run, never from memory.
  2. ~~Where the process and reflection logs are~~ DONE: `../Week13/WeeklyProcessLogs+ReflectionLogs/`, read 2026-11-22 (see "Where the sources are").
  3. Who and where the real entries came from, with permission, and which photos are Gemini-made.
  4. Whether the Q&A slot is booked (it must be before Nov 22).
- **Sources the README can draw on:**
  - The changelogs: `docs/CHANGES*.md`, `docs/sprint 2/`, `docs/sprint 3/`, `docs/final sprint/`.
  - "State of the system" above.
  - The AI-use history above.
  - The toggle changelog's "For the README" lines.
- **Rules:**
  - Write `UNSURE` where unsure.
  - Env var names only, never values.
  - No keys, emails, passwords or the project URL.
  - Every claim checked against the code.
- **After the README:** the reflection, then the last stretch (see "Order of work").

## Opening message for a new chat

```
Khmer Living Archive, after the final deadline (submitted 2026-11-22 except the demo video; Water Festival break now;
Q&A on Dec 4). Read AGENTS.md (its last section is the final-sprint amendment), then docs/FINAL_SPRINT_NOTES.md
(start with "AFTER THE DEADLINE" and "Real entry data chat: start here"), then check `git status` and
`git log --oneline -5`. docs/PROJECT_NOTES.md is the history of Sprints 1 to 3: read it only where needed.
My plan is in ../Week13/MyPlanForThisWeek/MyPlan.md (and Week13_CurrentNotes.md next to it for the working style).
My process and reflection logs are in ../Week13/WeeklyProcessLogs+ReflectionLogs/. Short plan first, small steps;
I commit and run all SQL by hand; all Khmer wording and all entry facts come from me (or a Gemini draft I correct).
This chat's job: real entry data and the small UI around it: the title rename, the source line, combining
CURATED BY / SOURCE / CITY, the Ingredients field, then the nine entry descriptions.
```
