# CHANGES9: Lab 10 Part 4, attack your own gate (Sprint 3, week 10)

No repo code changed in this part. The student attacked the live database from the browser console, as a stranger, to check that the gate built in `CHANGES9_TheGate.md` really holds. The attack kit is `Week10/Lab10_Part4_AttackKit.md` (outside the repo: it holds placeholders for the project URL and key, and the account password is typed into a pop-up, so none of those values is in this file).

## Setup
- Attacker: `archive.test.three` (the stranger; its uuid starts d0492a09). Not `archive.test.two`: that account is on the `reviewers` list, so attack 3 would have returned `true` and proven nothing.
- Where: the live site's browser console, with `@supabase/supabase-js` loaded from a CDN and a client made by hand. The attacks test the database (policies and functions), not the site's code, so they do not depend on which version of the site is deployed.
- Login check: `login error: null`, and a uuid that does not start with 02937456.
- Every insert carried all the columns this archive requires (`title, description, source, filling, shape, color, owner`), so the only errors are the gate's.

## Results

| # | Attack | Pass looks like | What it actually returned | Result |
|---|---|---|---|---|
| 1 | insert an entry with `status: 'published'` | row-level security error | HTTP 403 Forbidden, `data: null`. Message: `new row violates row-level security policy for table "entries"` | Pass |
| 2a | insert a normal entry (no status) | works, as `pending` | HTTP 201, one row created | Pass |
| 2b | update that entry to `published` | row-level security error | HTTP 403 Forbidden, `data: null`. Message: `new row violates row-level security policy for table "entries"` | Pass |
| 3 | call `review_entry` as a non-reviewer | `data: false` | `data: false`, `error: null`, HTTP 200 | Pass |
| 4 | insert into `reviewers` (put myself on the list) | row-level security error | HTTP 403 Forbidden, `data: null`. Message: `new row violates row-level security policy for table "reviewers"` | Pass |
| 5 | logged out, select entries that are not published | `data: []` | `data: Array(0)` (empty), `error: null`, HTTP 200 | Pass |

All five passed.

## What each result shows
1. **Insert as published is refused:** the insert policy requires `status = 'pending'`. The form never sends a status, and the console cannot get around the policy.
2. **The edit-to-published is refused:** the update policy only lets a non-reviewer save an entry whose status is `pending`. Owning the entry is not enough to publish it.
3. **`review_entry` returns `false` for a non-reviewer:** the function checks `is_reviewer()` itself and does nothing otherwise. It is `security definer`, so this check is the only protection, and it holds.
4. **The `reviewers` table refuses writes:** row-level security is on and there are no policies, so the API cannot add anyone. Only the SQL Editor can.
5. **A logged-out stranger sees no unpublished entries:** the select policy shows published entries to everyone, your own to you, and everything only to reviewers. Pending entries exist (the 8 test entries and "waiting politely"), and none came back.

## Left on purpose
The entry "waiting politely" (created by attack 2a, owned by `archive.test.three`, photo `/images/Mooncake_RoundPeah.jpg`) stays `pending`. It was not published from the console. Next Friday's review queue (week 11) needs something to practise on.

## Not covered by these attacks
The edit paths that need a published entry (a non-reviewer's edit of a published entry going back to pending; a reviewer's own edit staying published) were skipped on purpose; see the Verification section of `CHANGES9_TheGate.md`.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 3/CHANGES9_AttackOwnGate.md`   (Lab 10 Part 4: the five console attacks on the gate as `archive.test.three`, all refused as expected)
