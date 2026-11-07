# CHANGES11 - Review fixes (Week 12, Lab 12)

Work list: `../Week12/Week12FixList.md` (outside the repo). Part A is the partner's (Lyching's) six findings from his Tuesday test; Part B is the picks from the student's own 3 lenses audit. Commits: `review fix: <what> (AI-assisted)`, one fix per commit, made by the student. No new dependency, no SQL in A1 to A3.

## A1. Clicking anywhere on an entry row on /my-entries does nothing but the title text

**Finding (Lyching):** on a pending entry, only the title text opened the entry.

**Cause:** `MyEntryRow.js` made only the title a link.

**Fix (`components/MyEntryRow.js` only):** the `<li>` is `position: relative`; an empty `<span>` inside the existing title link is stretched over the whole row (`position: absolute`, all four edges 0), so the row is one link, not two. The EDIT link (returned entries) gets `position: relative` and `zIndex: 1` so it stays above the cover and is not nested inside another link. Inline styles only. Side effect: text in the row (hint, reviewer's note) can no longer be selected by dragging, because the cover is on top.

## A2. EDIT and DELETE sat at the bottom of the entry page

**Finding (Lyching):** he had to scroll down to find them.

**Fix:** `app/entries/[id]/page.js`: the `EntryOwnerActions` line (same owner-only check) moved from the end of the page to just under the BackLink. Still politeness only; the owner-only policies are the real refusal.

**Extra file touched (said before editing, AGENTS rule 4):** `components/EntryOwnerActions.js`: its row had a 40px top margin, 24px top padding and a divider line, made for the bottom of the page. At the top that left a stray line, so it is now `marginTop: 20` with no border or padding. The component is used only by the entry page.

## A3. CONTRIBUTED BY on the entry cards

**Finding (Lyching, and the student's chosen audit fix):** the credit showed on the entry page but not on the cards.

**Fix:** `app/page.js` adds `contributor` to the home page's select (browse already selected it); `components/EntryCard.js` takes a `contributor` prop and shows `CONTRIBUTED BY: <name>` under the SOURCE line, only when it is set. `EntryList` and the home page both spread every selected field into `EntryCard`, so no other file changed. The label is English only, like the entry page's; the name shows exactly as typed (Khmer included). A Khmer label is for the later UX/UI polish week, and its wording would come from the student.

## A6. An "updated" date below the submitted date (database change)

**Finding (Lyching):** there was no edited date, only the submitted one.

**SQL (student ran it by hand in the SQL Editor, one `begin`/`commit` block, 2026-11-08; success):** `entries.updated_at timestamptz` (nullable; existing rows stay null) and a `before insert or update` trigger `entries_set_updated_at` (function `set_entry_updated_at`, `search_path = ''`, no `security definer`). The trigger always writes the column itself, so the browser cannot set it: on insert it sets null; on update it sets `now()` only when one of the content fields changed (title, title_khmer, description, description_khmer, source, contributor, filling, shape, color, texture, sweetness, saltiness, photo_url), otherwise it keeps the old value. So a reviewer's PUBLISH or RETURN (which change only `status` and `review_note`) never bumps the date; only an owner's edit of the content does. A save with no changed field does not count as an edit (the student's decision). No policy or function was changed.

**Code:** `app/review/page.js` adds `updated_at` to the select (extra file, needed for the line); `components/ReviewEntryCard.js` shows `UPDATED: <date>` under SUBMITTED, only when `updated_at` is set. In the same lines both dates now go through one helper that prints the date in Asia/Phnom_Penh (UTC+7) with `Intl.DateTimeFormat("en-CA")` instead of `created_at.slice(0, 10)`, which printed the UTC date.

## A4 and A5 (replies, no code)

- **A4 (refresh while submitting):** reply to Lyching, no code: the photo upload and the insert run in the browser, so a refresh cancels them and the entry never reaches My entries. The edit that survived was timing (the request had already left the browser); it is not guaranteed. A refresh between the photo upload and the insert can leave an orphan photo in Storage (a known leftover).
- **A5 (reason for a returned entry):** already done and live (`review_note`, `docs/sprint 3/CHANGES10_ReviewNote.md`); the note is optional, so a return can still come with no reason.

## B1. A reviewer's own returned entry never re-entered the queue

**Cause (from the student's own 3 lenses audit, Q1):** `updateEntry` sent `status: 'pending'` only for non-reviewers. A reviewer returning one of their own entries and then editing it left it `returned`, so it could never be resent. Lyching's audit also found that the redirect branch in `ContributeForm` never called `setLoading(false)`.

**Fix (three files):** `app/entries/[id]/edit/page.js` adds `status` to its select; `components/ContributeForm.js` passes `entry.status` to `updateEntry` and calls `setLoading(false)` in the redirect branch (so the form is not left locked if the user comes back to it with the Back button); `utils/updateEntry.js` takes `currentStatus` as a new last argument and now sets `backToReview = isReviewer !== true || currentStatus === "returned"`. So a returned entry always goes back to pending and shows the "sent back for review" notice, for reviewers too; a reviewer's edit of a published or pending entry still keeps its status and opens the entry. `entryColumns` is untouched, so `status` is still not a form field. No SQL: the update policy already lets the owner set `pending`.

## B3. `lang="km"` on the displayed Khmer

**Why (bias lens of the student's own audit):** the Khmer text had no language tag, so screen readers read it with the page's English voice, and the browser could pick a non-Khmer font for it.

**Fix (eight one-attribute edits, nothing else changed):** `lang="km"` on the Khmer title and description in `components/EntryCard.js` (2), `app/entries/[id]/page.js` (2), `components/ReviewEntryCard.js` (2), the Khmer title in `components/SearchSuggestions.js` and `components/MyEntryRow.js`. The status words, review-note label and buttons already had `lang="km"`. Caveat: the Khmer fields accept any language (Week 7 decision), so an entry whose "Khmer" field holds English would be tagged `km`; that is a small mislabel, not a display problem.

## B2 and the five Lab 10 attacks: SKIPPED by the student's decision

- **B2 (credentials screenshot):** not done; the student chose to skip it. It remains the one item that exposes a real credential (a console screenshot with an email and a password, publicly reachable in Storage). The fix is to remove that Storage file and delete its entry by exact id.
- **Five-attack re-run after A6:** skipped on purpose. The A6 SQL added a column and a trigger only; no policy, grant or function was changed, and the trigger writes only `updated_at` (it cannot change `status` or `owner`). The student's edit tests after A6 (add, edit, edit again) passed, which covers the trigger breaking inserts or edits.

## B4 (photo_url constraint): SKIPPED by the student's decision

Proved the gap as archive.test.three on 2026-11-08: an insert with `photo_url: 'https://example.com/x.png'` came back with a row and `error: null`. The probe row was deleted right away (the delete returned one row). Existing `photo_url` values were checked first: null, `/images/...` and this project's own `photos` bucket only (a check query for anything else returned 0). The constraint itself was not added: the student judged it not worth the retest time tonight. Why the risk is limited: an owner's console update has to set `status` to pending, so a changed entry goes back to review; what stays open is a reviewer approving an entry whose image is hosted elsewhere and that host swapping the picture later. The fix is one check constraint (null, `/images/%`, or this project's `photos` bucket URL). Material for reflection question 3.

## Verification

- **A6 PASSED (2026-11-08):** an owner's edit shows `UPDATED` on /review; entries nobody edited show only SUBMITTED; both dates show the Phnom Penh date. A return followed by an edit with no change left the date as it was (inconclusive by itself; the trigger code is what guarantees it).
- **B1 PASSED (2026-11-08):** as archive.test.two, a new entry was edited and returned; on /my-entries it showed RETURNED; editing and saving showed the "sent back for review" notice; it then showed PENDING, appeared on /review again and was published; editing the published entry as the reviewer kept it published.
- **B3 PASSED (2026-11-08):** the Khmer text looks the same on the pages checked, and `lang="km"` shows on the elements when inspected.
- **A4 and A5:** no reply drafted; the student decided none was needed (A5 was already live-checked in Lab 11; A4 is an expected behaviour, not a bug).

Student browser test, 2026-11-08, local `npm run dev`:

- **A1 PASSED:** clicking anywhere on a row on /my-entries, whatever its status, opens the entry; EDIT on a returned entry still opens the edit page.
- **A2 PASSED:** EDIT and DELETE sit under "BACK TO BROWSE"; clicking DELETE shows the two-step confirm (not confirmed, nothing deleted); no EDIT or DELETE on entries the user does not own.
- **A3 PASSED:** every card on the home page and on /browse shows CONTRIBUTED BY under SOURCE, except the "waiting politely" entry, which has no contributor; no visible card-height change.
