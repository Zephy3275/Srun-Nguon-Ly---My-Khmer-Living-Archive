# CHANGES10 - Lab 11 "The Queue" (Sprint 3, week 11)

The page a reviewer opens the Lab 10 gate from: `/review` lists the pending entries oldest first, each with a Publish and a Return button. No SQL, policies or functions were changed. All Khmer wording is the student's own (`Week11/Lab11_Part1_Answers.md`).

## What changed

| File | Change |
|---|---|
| `app/review/page.js` (new) | Server page. Calls `rpc('is_reviewer')` first; anything but exactly `true` shows only "This page is for reviewers only" (English + Khmer) and makes NO entries query. For a reviewer: `select` of the pending entries, `.eq('status', 'pending')`, `.order('created_at', { ascending: true })`. |
| `components/ReviewQueue.js` (new, client) | Holds the list in state. Calls `rpc('review_entry', { entry_id, decision })`. Removes an entry only when `data === true`; an error or `false` leaves it and shows the failure message (real error to `console.error`). Empty list shows the empty-queue message. |
| `components/ReviewEntryCard.js` (new) | One entry: photo, submitted date, source, contributed-by, titles, facts, full descriptions, buttons, failure message. The owner's id is never selected. |
| `components/ReviewButtons.js` (new, client) | PUBLISH ផ្សព្វផ្សាយ and RETURN ត្រឡប់មកវិញ. Reports which was pressed; makes no call itself. |
| `components/BilingualNotice.js` (new) | English line with the Khmer under it; used for the three messages. (Not in the first plan: added so the three messages share one look.) |
| `components/AuthHeader.js` (edited) | Logged-in users also ask `rpc('is_reviewer')`; only `true` shows a REVIEW link to `/review`. This adds one rpc call to every page load for logged-in users. |

## Choices worth knowing

- Success is `data === true` because `review_entry` returns `false` without an error when it refuses.
- Buttons are disabled while one call is in flight (no double press).
- The date is `created_at.slice(0, 10)` (UTC date) so server and browser always print the same text.
- The "queue could not be loaded" message (queue query failed) was English only at first; the student then gave the Khmer, and it now uses `BilingualNotice` like the others.
- After the student's first test: a pending counter ("N PENDING កំពុងរង់ចាំ") was added to `ReviewQueue.js`; it reuses the existing Khmer status word and drops as entries are reviewed.
- The reviewer card shows CONTRIBUTED BY (the public credit label); nothing public changed.

## Verification

Claude has not built or run the app (the student's dev server is theirs). Student tested locally as archive.test.two (2026-10-30): the REVIEW link shows in the header; /review lists the pending entries (the old tests first); both buttons show in Khmer and English; "waiting politely" is in the queue. Still to do: the Part 3 diff read, the Part 4 round trip (publish, return, edit, two tabs) and the stranger checks.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- docs/sprint 3/CHANGES10_ReviewQueue.md   (Lab 11 - the review queue: /review, Publish/Return via rpc, REVIEW header link)
