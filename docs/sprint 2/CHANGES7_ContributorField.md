# CHANGES 7 — Contributor (credit) field (Sprint 2, Week 8)

The professor confirmed on 2026-10-09 that a contributor field is necessary: each entry must be
"correctly credited" and "a single name gets through the form" (Sprint 2 review checklist).
Until now an entry only showed `source`, which says where the information came from, not who
added it. This is the one Week 8 item that changes the database. The testers' list is in
`Week8/Tester_Feedback_Triage.md` (outside the repo); this item came from the professor, not from
the testers (it was suggested by a classmate in Lab 7 and skipped then, see `CHANGES6_AttackFeedback.md`).

Decisions (student, 2026-10-18):
- **Required in the form, optional in the database.** The column allows `null`, so nothing that
  already exists can break, and nothing about the 9 old entries is complicated.
- The 9 existing entries are credited with the student's name by a one-time `UPDATE`.
- The credit shows on the **entry page only** (not on cards).
- The contributor name is **searchable** on Browse.
- Label `CONTRIBUTOR`, in capitals like the other labels.

`contributor` is a display label typed by the contributor. **It is not identity.** `owner` (taken
from the login session, never from the form) is still the real accountability.

## 1. The SQL (run once, in a fresh SQL Editor tab, before the code is used)

The local site and the live site share one database, and code that reads a column that does not
exist would fail, so the SQL had to run first. The live site (old code) is unaffected by the new
column: it never reads or writes it.

```sql
begin;

-- the new column: optional in the database, so nothing breaks for existing rows
alter table entries add column contributor text;

-- same style as the nine length checks: empty is allowed, otherwise 1 to 120 characters
alter table entries add constraint entries_contributor_length
  check (contributor is null or char_length(trim(contributor)) between 1 and 120);

-- credit the rows that exist now
update entries set contributor = 'Ly Srun Nguon' where contributor is null;

commit;
```

- Result: "Success. No rows returned" (normal). `select title, contributor from entries order by
  created_at` returned 17 rows, all credited. The constraint query returned
  `entries_contributor_length`.
- The `check` row count on `entries` is now 12 (ten length checks + the two Lab 6 `sweetness` /
  `saltiness` checks).

**Correction.** The `update` credited all 17 rows, but only 9 are the student's real entries; the
other 8 are test entries (the "Test Entry", the `<script>` and "Attack this entry" rows and other
throwaways). That was warned about beforehand; the student ran the fix right after and confirmed it (see section 3). The real entries
have photos stored as `/images/…` paths (uploads made through the form are full Storage URLs),
which separates the two groups. A preview query was run first and listed only test entries:

```sql
-- preview (read-only): should list only test entries, none of the 9 real ones
select title, photo_url, contributor
from entries
where photo_url is null or photo_url not like '/images/%';

-- then take the credit back off those rows
update entries
set contributor = null
where photo_url is null or photo_url not like '/images/%';
```

The test entries are deleted in the final cleanup anyway.

## 2. Code

| File | Change |
|---|---|
| `utils/entryFields.js` | New field `contributor` (`CONTRIBUTOR`, after `source`): required, `maxLength` 120, live counter, hint "Required. Your name, as you want it shown. Up to 120 characters." Because it is in the field list it also appears in the edit form, with the red `*`, the hard stop and the counter, without more code. |
| `utils/validateEntry.js` | `plain("contributor", 120, "Add the contributor's name (up to 120 characters).")`. **One name is enough** (no first + last rule); it only needs at least one letter in any script, so Khmer and Chinese names pass; no control characters. |
| `utils/entryWrite.js` | `entryColumns` names `contributor` (add and edit both use it). `owner` is still not in it. |
| `app/entries/[id]/edit/page.js` | `contributor` added to the column list of its `select`. That page lists its columns by hand; without this the edit form would open with a blank name and saving would overwrite the stored one. |
| `app/entries/[id]/page.js` | Reads `contributor` and shows `CONTRIBUTED BY: <name>` under the source line, in the same style. Skipped when there is no name. |
| `app/browse/page.js` | Reads `contributor` so the search can match it. |
| `components/SearchFilter.js` | The contributor is part of the searchable text (alongside title, description and both Khmer fields); the placeholder now reads "Search by title, description or contributor…". |

Not changed: the home page and the cards (the credit is not shown there, so the home page does
not read the column), `SearchSuggestions` (still shows titles), and the "nothing matches"
message: its English text and the student's Khmer translation still say "title or description"
(a contributor match still works; the Khmer sentence is the student's and was left alone).

## 3. Verification

- Scratch test (throwaway script outside the repo), all 11 pass: single name, two names, Khmer
  name, Chinese name and a name with surrounding spaces pass; empty, spaces only, `;;;`, 121
  characters and a control character are refused; exactly 120 passes. `entryColumns` contains
  `contributor` and not `owner`; the field is required with limit 120; the edit form pre-fills it
  (and a `null` becomes an empty box).
- `next build` passes (dev server stopped first).
- On a throwaway server (stopped and cleaned up afterwards): home, Browse and Contribute return
  200 with no "couldn't load the archive" notice, so the new column is being read fine; the Browse
  placeholder shows the new text; the entry pages carry `CONTRIBUTED BY: …` (17 of 17 at that
  moment, before the correction query above was run).

**Correction query, confirmed by the student:** the preview listed only the 8 test entries (made by
the student and the friends who tested), none of the 9 real ones. After the update, both the
test-entries-only query and the full 17-row `select` showed `NULL` contributors on the test
entries only, and the student's name on the 9 real ones.

**Student's browser test on localhost (all OK):**
- A real entry shows `CONTRIBUTED BY` with the name.
- Add form: `CONTRIBUTOR` appears with the red `*`; it stops typing at 120 characters; leaving it
  blank shows the red "required" message; a Khmer name saves and displays correctly.
- Editing a test entry: the contributor box is empty (expected: those rows were set back to
  `NULL` by the correction), saving is refused until it is filled in (it is required), then
  saving works and the name shows on the entry page.
- Search: typing part of the student's name on Browse returns all 9 real entries.
- Sweetness and saltiness show on the entry page when they were added.

Deliberately not tested: editing one of the 9 real entries. They already show the name, so the
edit pre-fill is covered by the scratch test (a stored name loads into the box, a `NULL` loads as
empty) and the real entries were left untouched on purpose.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES7_ContributorField.md`   (Week 8: contributor field, the only Week 8 change that touched the database)
