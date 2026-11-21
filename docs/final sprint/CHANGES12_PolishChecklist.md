# CHANGES12 - Polish checklist (Week 13, Lab 13)

Guide: `../Week13/Lab13_Guide.md` (outside the repo). The lab builds nothing new: it is a checklist of what a stranger would trip on. Most of its checks were already proven by earlier labs, so they were not re-run (table below). New work: two read-only scans, one console attack, and one bug fix. No database change, no new package. No keys, passwords, project URL or email addresses are recorded here (the repo is public).

Commits: `e3b51f3` (checklist, scans, ownership attack), then the line-break fix and this changelog.

## 1. Checks already proven earlier (not re-run)

The code and the policies these cover have not changed since they passed.

| Lab 13 check | Where it passed |
|---|---|
| A stranger cannot publish their own entry from the console | Lab 10 attacks 1 and 2b (`docs/sprint 3/CHANGES9_AttackOwnGate.md`) |
| Logged out, nothing pending or returned comes back | Lab 10 attack 5 (`data: []`) |
| Adding an entry shows that it waits for review | Lab 10 and 11, live check 2026-11-08 |
| Queue: publish, return, the returned entry can be resent | Lab 11 (`CHANGES10_ReviewQueue.md`), B1 (`CHANGES11_ReviewFixes.md`) |
| A contributor's edit to a published entry goes back to pending; the reviewer's stays published | Lab 10, B1 and B5 (`CHANGES11_ReviewFixes.md`) |
| Khmer search, and the English and Khmer no-match message | `docs/CHANGES3_Description2.md`, `docs/CHANGES3_SearchPolish.md` |

## 2. Read-only checks (by the AI, 2026-11-21)

- **Secrets in the git history (all branches):** searched every commit's diff for a JWT, `sb_secret_`, `sb_publishable_`, `service_role`, Google and OpenAI-style keys, a Supabase project URL and a quoted password. No match. No `.env` file was ever committed. The last check like this was in Sprint 2 (2026-10-09).
- **TODO, lorem, placeholder, sample, test in the shipped code** (`app/`, `components/`, `utils/`, `middleware.js`, `collection.config.js`): only input hint text (`you@example.com`, the search box hint) and the regular-expression `.test()` calls in `utils/validateEntry.js`. Nothing to remove.
- **Error messages a user can see:** every one is a fixed short sentence (for example "Invalid email or password", "That change wasn't saved."); no raw Supabase error text is shown. Real errors go to `console.error`, the Lab 7 design.
- **Empty states:** the queue (English and Khmer), /my-entries ("You haven't added any entries yet"), home and /browse ("No entries in the archive yet") and search (English and Khmer) all say something.

## 3. Ownership attack on the live site: PASSED (2026-11-21, student)

**Why it was run:** Lab 10 replaced the update policy (from "your own entries" to "your own entries, only while pending, unless you are a reviewer"). The ownership attack had last run in Lab 7, against the old policy, so the owner check in the new policy had never been attacked. No policy has changed since Lab 10 (Lab 11 changed the `review_entry` function, Week 12 added a date trigger).

**How:** live site, console, the setup block from the Lab 10 attack kit, logged in as archive.test.three (uid starts d0492a09). The attack picked one published entry owned by another account ("Mooncake Ngoyen Egg 1") and tried to update it with its own title and `status: 'pending'`, which is exactly what an owner's edit sends.

| Attack | Pass looks like | What it returned | Result |
|---|---|---|---|
| Update another account's published entry | `data: []` or a row-level security error | `data: []`, `error: null`, status 200 | Pass |

`data: []` means the update policy hid the row from this user, so nothing was changed. The entry is still published.

## 4. Left open (the student's decisions)

- **B2, the old credentials screenshot:** deferred to the test-entry cleanup in the last stretch. Low risk for now:
  - Storage has no select policy, so nobody can list the files.
  - The link sits in a pending entry that only its owner and the reviewers can see.
  - When the entry is deleted, delete the Storage file by hand too: deleting an entry leaves its photo behind.
- **B4, the `photo_url` check constraint:** skipped (optional; it exposes nothing).
- **Phone width (390px) and red console errors:** never tested on the live site. They run once, after the language toggle, because the toggle changes every page.
- **Khmer on the queue, the status words, the menus and the error messages:** moved to the language-toggle work.
- **The Lab 13 Trade Archives discussion post:** not graded, not done.

## 5. Bug fix: line breaks in descriptions disappeared

**Found by the student** during an earlier partner test and never fixed until now.

**The bug:** pressing Enter in the description field kept the line breaks in the database (the edit form showed them), but the entry page showed the whole description as one run of text.

**Cause:** the description is shown in a `<p>`, and a browser squashes line breaks inside a paragraph into a single space unless told otherwise. The form's text box keeps them, which is why the edit page looked right.

**Fix (one style line, four places):** `whiteSpace: "pre-wrap"` (keep the text's line breaks and spaces as typed):
- `app/entries/[id]/page.js`: the `description` and `descriptionKhmer` styles.
- `components/ReviewEntryCard.js`: the `text` and `textKhmer` styles, so the reviewer sees the text as written.

`components/MyEntryRow.js` already used the same line for the reviewer's note. The `description` style is also used by the two one-line messages ("Entry not found", "Couldn't load this entry"); they look the same.

**Not changed on purpose:** the home and /browse cards (`components/EntryCard.js`) stay squashed. They cut the text off after a few lines, and blank lines would use those lines up.

**Tested (student, localhost, 2026-11-21): PASSED.**
- The test entry with line breaks now shows each line and the blank line, on the entry page and in the edit form.
- /review was not checked: no pending entry had line breaks, and it is the same one-line style.
