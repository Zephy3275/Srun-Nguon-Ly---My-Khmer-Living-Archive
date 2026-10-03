# CHANGES 6 — The checklist, top to bottom (Sprint 2, Lab 7 Part 3)

Session log for **Lab 7, Part 3**. The student walked the Lab 7 Validation Checklist on their
own form on localhost, then added Postgres check constraints so the database refuses bad
data even from requests that never touch the form. **No repo code changed in this part.**
The SQL was run by hand in the Supabase SQL Editor (dashboard only, no repo file runs SQL).

## 1. Does the Canvas checklist (`Week7_Lab7/ValidationChecklist.md`) match the lab text?

The lab's six bullets are the browser tests. The Canvas checklist has seven items and adds
one the lab does not ask you to test: **owner comes from the session and the insert names
its columns.** Already true since Part 1 (grep: 0 hits for `...data` / `...values`;
`owner` is read from `getUser()` and never sent on update).

## 2. Browser checks (student, on localhost, as `archive.test.two`)

| Check | Result |
|---|---|
| Submit empty | Every required field complains, red border, nothing sent. |
| Very long title | Held a key down to 150 characters (limit 120): counter turns red, form refuses. The `navigator.clipboard` 5,000-character paste did not run; the 5,000-character case was covered by the scratch test below. |
| PDF | Refused, red border on the photo field. |
| Photo over 5 MB | Refused, red border on the photo field (a 6 MB `big.png` made with `fsutil`). |
| Khmer in every field | Saved and displayed correctly. |
| Title `<script>alert(1)</script>` | Saved; shows as plain text on the browse card and entry page. No pop-up. |
| Break something on purpose | Logged out in a second tab, submitted in the first: screen says "Your session has ended. Please log in again"; console shows the real `getUser failed: AuthSessionMissingError`. Fixed message on screen, details only in the console. |

Scratch pre-flight (throwaway Node script outside the repo, same validators as the form):
empty form lists every required field; 5,000-character title and Khmer title refused; 500
Khmer characters pass and 501 are refused; whitespace-only title refused; PDF and 6 MB PNG
refused by `checkPhoto`; the 9 seed entries all sit inside the new database limits (longest
description 494 characters against a 10,000 ceiling).

## 3. The SQL (run once in the SQL Editor)

```sql
alter table entries
  add constraint entries_title_length
    check (char_length(trim(title)) between 1 and 120),
  add constraint entries_title_khmer_length
    check (char_length(trim(title_khmer)) between 1 and 500),
  add constraint entries_description_length
    check (char_length(trim(description)) between 1 and 10000),
  add constraint entries_description_khmer_length
    check (char_length(trim(description_khmer)) between 1 and 6000),
  add constraint entries_source_length
    check (char_length(trim(source)) between 1 and 300),
  add constraint entries_filling_length
    check (char_length(trim(filling)) between 1 and 120),
  add constraint entries_shape_length
    check (char_length(trim(shape)) between 1 and 120),
  add constraint entries_color_length
    check (char_length(trim(color)) between 1 and 120),
  add constraint entries_texture_length
    check (texture is null or char_length(trim(texture)) between 1 and 120);
```

- One statement, so it applies all nine or none. No existing row broke a rule.
- **Verified** with a read-only query on `pg_constraint` for `public.entries`: 11 check rows
  (the 9 `entries_*_length` plus the two Lab 6 checks on `sweetness` and `saltiness`).
- Running the statement a second time fails with `42710: constraint "entries_title_length" ...
  already exists`. That confirms the first run succeeded; it changed nothing.
- Undo one: `alter table entries drop constraint entries_title_length;`

**Optional proof:** a `begin; insert ... repeat('x', 500) ...; rollback;` in the SQL Editor
(which bypasses the form entirely) was refused by the database:

```
ERROR: 23514: new row for relation "entries" violates check constraint "entries_title_length"
```

Nothing was saved (the transaction was rolled back). This is the point of the part: the
rule holds even for a request that never touched the form.

## 4. Decisions

- **Length-only constraints.** The letter, Khmer-only, Latin-only-inside-brackets and
  no-digits-in-texture rules stay in the form. Regex classes depend on the database locale and
  could misjudge Khmer, risking refusal of the student's own real entries.
- **Word count (1,000) stays in the form**; the database enforces the 10,000-character ceiling.
- **`trim()` in Postgres removes spaces only**; the form's JS `trim()` also removes tabs and
  newlines, so the form is slightly stricter than the database. Accepted.
- Constraints are named so each can be dropped on its own.

## 5. Known limits

- Orphaned photos in Storage after delete or replace (see `CHANGES6_EditDelete.md`).
- EXIF/GPS not stripped from photos (student's decision).
- Photo type/size are enforced by the form and by the bucket (Part 0); the bucket side is tested in Part 4.
- Throwaway test entries from this part were kept for now on `archive.test.two`.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES6_Validation.md`   (Lab 7 Part 3 — validation checklist + check constraints)
