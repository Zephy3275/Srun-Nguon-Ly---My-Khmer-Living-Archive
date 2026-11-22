# CHANGES12 - A reviewer can take a published entry down (Week 13, final sprint)

**Why:** the README guide asks "whether reviewers can take down published entries". Until now the answer was no, and it was not a decision: the lab's `review_entry` only acted on pending entries, and the update policy only lets you edit your own. The student chose to add it (2026-11-22), so a reviewer can remove something from the public shelf, including the two test entries that were still published.

## SQL (run by the student, 2026-11-22, one `begin`/`commit` block; "Success. No rows returned")

`create or replace function public.review_entry(entry_id uuid, decision text, note text default null)`, the same as before except the `where` line:

- before: `where id = entry_id and status = 'pending'`
- after: `where id = entry_id and (status = 'pending' or (status = 'published' and decision = 'returned'))`

**Unchanged:**
- The reviewer check runs first.
- Only `published` or `returned` are accepted as decisions.
- `security definer`, `search_path = ''`.
- It returns true only if a row changed, and never raises an error.
- Publishing is still only possible from pending.

No policy, table, trigger or grant changed. The trigger keeps `updated_at` as it was, because only `status` and `review_note` move.

## Code

| File | Change |
|---|---|
| `components/TakeDownButton.js` (new) | A "FOR REVIEWERS" box with the note field and RETURN. It calls `rpc('review_entry', { entry_id, decision: 'returned', note })`. Success is exactly `data === true`; then it goes to the home page. Otherwise it shows the queue's failure message (K12) and logs the real error. |
| `components/ReviewButtons.js` | A new `showPublish` prop (default true). The take-down box passes false, so only the note field and RETURN show. The queue is unchanged. |
| `app/entries/[id]/page.js` | Selects `status`. When the visitor is logged in and the entry is published, it asks `rpc('is_reviewer')` (a failed check counts as no). It shows the box at the bottom only for a reviewer. |

No new strings: the kicker (R1 "FOR REVIEWERS"), the note label (K6), RETURN (K5) and the failure message (K12) already exist in English and Khmer. No package.

**What a returned entry does (unchanged behaviour):** it leaves the home page and search (they show `published` only), and shows as RETURNED with the note on its owner's MY ENTRIES. It goes back to the queue only when the owner edits and saves it.

## Checks

- **AI, 2026-11-22:** a throwaway dev server on port 3005, logged out. An entry page, `/` and `/review` all returned 200, with no server errors. The box is not shown to a logged-out visitor. The server was stopped afterwards.
- **Student, 2026-11-22, localhost (the live database): ALL PASSED.**
  1. The stranger console attack: `archive.test.three` called `review_entry(<"waiting politely" id>, 'returned')` and got `data: false`, `error: null`, status 200. The entry stayed published.
  2. As `archive.test.two`, the box showed at the bottom of "waiting politely". RETURN with a note landed on the home page with the entry gone. The same for "test entry for lab 12 return for reviewer". The student then left one published test entry on purpose, to take it down on camera in the demo video; after that, the public shelf has only the nine real entries.
  3. The box also shows on a real entry the reviewer does not own (expected: like PUBLISH, a take-down is the reviewer's power over any entry's status. The owner-only policies still guard the content).
  4. As `archive.test.three`, MY ENTRIES showed "waiting politely" RETURNED with the note, and a real entry showed no box.
- **Left by the student's choice:** the old pending test entries stay in the queue; the B2 screenshot file stays in Storage (README section 4 says so).

## For the README

Section 4's "can reviewers take down published entries" now says yes: a decision the student made, not one the briefs made. `docs/database.md` shows the new `where` line.
