# CHANGES 6 — Attack a classmate's archive (Sprint 2, Lab 7 Part 4)

Session log for **Lab 7, Part 4**. The student and a classmate (the teammate) swapped live
URLs and each played a stranger on the other's site. **No repo code changed in this part.**
No keys, passwords, project URLs or email addresses are recorded here (the repo is public).

## 1. Before the swap

- Merged `experiment` into `main` and pushed (fast-forward, `main` = `16cc987`); Vercel deployed.
  The teammate's Lab 7 site was live too.
- Read-only self-check in the SQL Editor (`pg_policies`, `storage.buckets`):
  - `entries`: `select` for anyone; `insert` with check `auth.uid() = owner`; `update` and
    `delete` using `auth.uid() = owner`.
  - `storage.objects`: insert and delete only inside a folder named after your own user id
    (policies for the `photos` bucket).
  - Bucket `photos`: public, `file_size_limit` 5242880 (5 MB), `allowed_mime_types`
    `image/jpeg`, `image/png`, `image/webp`.

## 2. Attacker on the teammate's archive (student)

Signed up as a stranger with a real email, then:

| Attack | Result | Pass? |
|---|---|---|
| Open their entries in the interface | No Edit or Delete buttons | Yes |
| Add own entry titled `<script>alert(1)</script>` with a real photo | Saved; displays as text, no pop-up; Edit and Delete show on it (it is the student's own) | Yes |
| Console: sign in | `data: {…}`, `error: null` | Yes |
| Console: read their entries | 5 rows, `status: 200` (reading is public by design) | Yes |
| Console: update their throwaway entry | `data: []` (`success: true`, `status: 200`) | Yes |
| Console: delete their throwaway entry | `data: []` (`success: true`, `status: 200`) | Yes |
| Console: upload `test.txt` to the student's own folder | `400`, `StorageApiError: mime type text/plain is not supported` | Yes |
| Refresh their site | Their throwaway entry exactly as it was | Yes |
| Delete the student's own entry through their interface | Deleted | Yes |

**Reading the result:** `success: true` and `status: 200` only mean the request was valid. The
proof is the empty `data: []`: the database refused to change anything without raising an
error. The optional extra check (select the id first to rule out a typo) was skipped.

Console note: pasting a key with a line break in it gave `Uncaught SyntaxError: Invalid or
unexpected token`. Fixed by wrapping the key in backticks and calling `.replace(/\s/g, '')`.

## 3. Teammate attacking the student's archive

Console results reported by the teammate (as a table of what each result means):

| Attack on the student's archive | Result shown | Pass? |
|---|---|---|
| Sign in as a classmate | `error: null` | Yes |
| Read entries | `data: Array(5)` (public read, expected) | Yes |
| Update the student's entry | `data: Array(0)` | Yes |
| Delete the student's entry | `data: Array(0)` | Yes |
| Upload `test.txt` | `mime type text/plain is not supported` | Yes |

The teammate also said the delete "returned success" but the entries were not deleted, which
matches the student's own result. The teammate did not report the interface steps (no
Edit/Delete buttons on the student's entries, the `<script>` title entry), so those are **not
recorded as tested** on the student's site.

## 4. Leftovers to clean up

- The student's test account still exists in the teammate's Supabase project (and the
  teammate's test account in the student's). Delete in the dashboard under Authentication.
- A deleted entry's photo stays in the bucket (photo cleanup was skipped on purpose; see
  `CHANGES6_EditDelete.md`). The `.txt` upload was refused, so nothing from it was stored.

## 5. Teammate's feedback (received; no action taken yet)

1. Make the Khmer fields not required (a contributor may not know a Khmer word and would
   write it in English, and so couldn't post).
2. Add a "go back to the homepage" arrow on the Browse page.
3. The console delete returned success but nothing was deleted (see section 3: this is the
   policy working, not a bug).
4. The teammate's entries have a contributor-name field; should the student add one?

Decisions: 1 (Khmer fields optional) and 2 (Browse back link) were done; 4 (contributor
name) was skipped on purpose. See `CHANGES6_AttackFeedback.md`.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES6_AttackLog.md`   (Lab 7 Part 4 — attack a classmate's archive)
