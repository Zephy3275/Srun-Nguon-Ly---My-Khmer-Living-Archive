# CHANGES9: Lab 10 "The Gate" (Sprint 3, week 10)

Every new entry now waits for review. The public sees published entries only, and nobody can publish their own entry from the console. The review page itself is next Friday (week 11). Lab text: `Week10/Lab10_Guide.md` (outside the repo). Part 1 answers: `Week10/Lab10_Part1_Answers.md` (outside the repo).

## Part 2: the database (SQL run by hand in the Supabase SQL Editor, 2026-10-25)

One `begin ... commit` block, exactly the guide's, with two choices of ours:

- Step 2 published **only the 9 real entries** (`where photo_url like '/images/%'`), not everything. The 8 test entries stay `pending`: hidden from the public, still visible to their owners and to reviewers.
- The reviewer is the `archive.test.two` account (its uuid went into the `reviewers` insert; the uuid is not repeated here). `archive.test.three` is the stranger for the Part 4 attacks.

The four policy names matched the guide before the block ran. Checks afterwards: `published` 9, `pending` 8; one row in `reviewers`; four policies on `entries` (the select one is now "anyone can read published entries"). Logged out, the live site showed the same 9 entries as before.

Until this code is deployed, a non-reviewer's edit is refused by the new update policy ("That change wasn't saved.").

## Part 3: the code

**1. Public pages show published entries only** (politeness; the database already hides pending entries from strangers, but a logged-in owner would see their own pending ones)
- `app/page.js`, `app/browse/page.js`: `.eq("status", "published")` on the entries query.

**2. After adding, a waiting message instead of the entry page**
- `components/ContributeForm.js`: on success, shows `EntrySentNotice` instead of `router.push`. The add path sends no `status` (the column default makes it `pending`; `entryColumns` and `submitEntry.js` were not touched).
- `components/EntrySentNotice.js` (new): the waiting message (Part 1 answer 1) and the "sent back for review" message after an edit, with links to MY ENTRIES and home.

**3. `/my-entries`**
- `app/my-entries/page.js` (new): logged-in users only (logged out: a log-in link); lists the session user's own entries (`.eq("owner", user.id)`). The filter matters here: a reviewer's account can read everyone's entries.
- `components/MyEntryRow.js` (new): title, Khmer title, status, a one-line hint; returned entries also get an EDIT link.
- `components/StatusBadge.js` (new): the three statuses in English and Khmer. The Khmer words are the student's.

**4. Edits go back to review**
- `utils/updateEntry.js`: asks `supabase.rpc("is_reviewer")`. A non-reviewer's update carries `status: "pending"`; a reviewer's does not (their entry stays published). If the rpc itself fails, the editor is treated as a non-reviewer (the safe answer). The zero-row check is unchanged. Returns `{ id, backToReview }`.
- `components/ContributeForm.js`: a non-reviewer's edit shows the "sent back for review" message; a reviewer's edit still opens the entry.

**5. Header link**
- `components/AuthHeader.js`: MY ENTRIES link for logged-in users.

No package, no `dangerouslySetInnerHTML`, no SQL or policy change in the code, no styling change beyond the existing variables and classes.

## The three things the guide says to check in the diff
1. The public filters: `.eq("status", "published")` is on both public queries.
2. The form never sends `status` when adding: `entryColumns` has no `status`, `submitEntry.js` is unchanged.
3. `status: "pending"` is in the update for non-reviewers: `utils/updateEntry.js`.

## Files outside the ask, flagged
The guide's five Part 3 changes name no new components. Three were added so that no file grows past the one-component-per-file / about-80-lines rule (AGENTS.md rule 5), and they are the only files beyond the ask:
- `components/EntrySentNotice.js`: the two messages, instead of growing `ContributeForm.js`.
- `components/MyEntryRow.js`: one row of `/my-entries`, instead of growing the page.
- `components/StatusBadge.js`: the status words, in one place.

## Notes
- `ContributeForm.js` was already over the 80-line guideline; the new message went into its own component to keep the addition small.
- The entry detail page was not changed: for a stranger, a pending entry is "not found" (the database hides it); the owner and reviewers can still open it.
- Not done (optional stretch): `review_note` column and a note on returned entries.

## Verification

**Checked by Claude (2026-10-25, a temporary dev server on port 3100, stopped afterwards; logged-out requests only, no passwords involved):**
- `/`, `/browse`, `/my-entries`, `/contribute`, `/login`, an entry page and its `/edit` page all compile and return HTTP 200 (this also compiles `ContributeForm`, `EntrySentNotice`, `MyEntryRow`, `StatusBadge`).
- Logged out, the home page says `entries in the archive: 9` and Browse lists 9 entries: the 8 pending test entries are not shown.
- Logged out, `/my-entries` shows "You need to be logged in" with a log-in link (no entries); the header has no MY ENTRIES link.
- Code search: no `status` in `entryWrite.js` or `submitEntry.js`; no `dangerouslySetInnerHTML`; no dependency or config file changed.

**Checked by the student on localhost, as `archive.test.three` (stranger) and `archive.test.two` (reviewer):**
- [x] Add an entry as `archive.test.three`: the thank-you (waiting) message shows.
- [x] `/my-entries` lists the new entry as PENDING with the Khmer status word (កំពុងរង់ចាំ).
- [x] Logged out, the new entry is not on the home page.
- [x] Logged in as `archive.test.two` (the reviewer), the new entry is still not on the home page (the published filter works, even though the database would show it to a reviewer).
- [x] Edit a pending entry as a non-reviewer and save: the "sent back for review" message shows.
- [x] After the Part 4 attacks (localhost, `npm run dev`): MY ENTRIES appears in the header when logged in, and archive.test.three's "waiting politely" and its other entry both show as pending on `/my-entries`.

**Checked by the student on the live site after the merge (Part 5, 2026-10-25):** logged out, the 9 real entries show and nothing else; logged in, MY ENTRIES appears in the header; `archive.test.three`'s two pending entries are still listed as pending.

**Skipped on purpose (the student's decision; the lab does not require them):**
- A non-reviewer editing an already **published** entry (the case policy 7 exists for): the edited entry was already pending, so pending to pending passes with or without `status: "pending"` in the update. The code for it is in `utils/updateEntry.js` and was read in the diff review, but not run. To cover it later: publish one of `archive.test.three`'s entries as the reviewer, edit it as `archive.test.three`, and it should go back to pending.
- A reviewer's own edit staying published (needs an entry added by `archive.test.two` and published first).

## Part 4: attack your own gate (run by the student in the live site's browser console)

Run by the student as `archive.test.three`; **all five attacks were refused as expected.** Setup, the results table with the exact messages, and what each result shows are in `docs/sprint 3/CHANGES9_AttackOwnGate.md`. The entry "waiting politely" was left `pending` for next Friday's review queue.

**Still to do:**
- Submit on Canvas (the merge, push and live check are done; see above).

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 3/CHANGES9_TheGate.md`   (Lab 10: status column + review policies SQL, public pages show published only, waiting message, /my-entries, edits go back to review)
