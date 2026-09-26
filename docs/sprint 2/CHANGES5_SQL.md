# CHANGES 5 — The worksheet becomes SQL: `entries` table + RLS (Sprint 2)

Session log for **Lab 6, Part 1 (Tasks 1 and 2)**: turning the Session 11 Data
Model Worksheet into a Postgres `entries` table, then locking it with Row Level
Security before any data exists. No application code or repo file was changed;
the SQL was run by hand in the Supabase dashboard SQL Editor.

---

## 1. What changed

- **Supabase (dashboard, not the repo):** a new `entries` table with 15 columns (3 fixed + 12 from the worksheet)
  and RLS enabled with four policies. The table is empty. The 9 entries in
  `data/entries.js` have **not** been moved yet (that is Lab 6 Part 2).
- **Repo:** only this changelog is new. `package.json`, `.env.local`, app code
  and `data/entries.js` are untouched.
- **Outside the repo:** the completed worksheet lives in
  `Week6_Lab6/Data_Model_Worksheet.md` (the design this SQL implements).

## 2. Task 1 — the table (from the worksheet)

The fixed columns (`id`, `created_at`, `owner`) come straight from the lab. The
other nine are the student's worksheet columns.

```sql
create table entries (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  owner             uuid not null references auth.users (id),

  title             text not null,
  title_khmer       text not null,
  description       text not null,
  description_khmer text not null,
  source            text not null,
  filling           text not null,
  shape             text not null,
  color             text not null,

  texture           text,
  sweetness         integer check (sweetness between 1 and 5),
  saltiness         integer check (saltiness between 1 and 5),

  photo_url         text
);
```

### Design decisions (how the worksheet was tailored)

- **Khmer fields added.** `title_khmer` and `description_khmer` were not in the
  student's first sketch. Every entry in `entries.js` already carries Khmer text,
  and AGENTS.md rule 6 makes Khmer first-class, so the schema models it.
- **`source` added.** Every entry credits a source, and the worksheet's own hint
  list names a missing source column as a common mistake for an archive that
  credits sources by name.
- **"Taste scale" split into three columns** (student's decision): `texture`
  (text), `sweetness` and `saltiness` (integers, 1 to 5 via `check`).
- **`filling`, `shape`, `color`** are the student's own columns, each a real
  distinguishing trait of the mooncakes. `filling` was renamed from "Paste
  filling" to match snake_case column naming.
- **Optional (nullable) columns:** `texture`, `sweetness`, `saltiness`,
  `photo_url`. The taste values are still placeholder in all 9 entries
  (`scale: 3, notes: ""`), so requiring them would be dishonest. `photo_url` is
  nullable because `entries.js` documents `image` as `""` until a photo exists.
- **Column count.** 12 worksheet columns (15 in the table with the 3 fixed
  ones), well past the worksheet's "fewer columns than you
  think." Kept because each maps to something real; `texture`, `sweetness` and
  `saltiness` are the easiest to drop or merge later.
- **`check` constraints** on `sweetness` and `saltiness` were the student's call
  and go beyond the lab's base prompt. A null passes the check, so they can stay
  empty.

### Edge case caught: Khmer-first

Everything in the table is plain `text`, which is Unicode-safe for Khmer. The
prompt explicitly told the generator not to add English-flavored defaults (a
`language` column, `default 'en'`, an English-only text-search config, or
Latin-only constraints). None were added.

## 3. Task 2 — the locks (RLS, appended exactly as written)

```sql
alter table entries enable row level security;

create policy "anyone can read entries"
  on entries for select using (true);

create policy "owners add their own entries"
  on entries for insert with check (auth.uid() = owner);

create policy "owners edit their own entries"
  on entries for update using (auth.uid() = owner);

create policy "owners delete their own entries"
  on entries for delete using (auth.uid() = owner);
```

| Policy | Rule | Effect |
|---|---|---|
| read | `using (true)` | Anyone, including logged-out visitors, can read every row (public archive). |
| insert | `auth.uid() = owner` | Only rows stamped with your own user id; logged-out users are refused (`auth.uid()` is null). |
| update | `auth.uid() = owner` | Only your own rows. |
| delete | `auth.uid() = owner` | Only your own rows. |

There is no edit form yet. The policies do not care; they will be in place when
week 7 builds one.

## 4. Caveats and things to know

- **Dashboard bypasses RLS.** The SQL Editor and Table Editor run as a
  privileged role, so a manual insert there succeeds regardless of policies. The
  policies are only truly exercised when the app writes as a logged-in user
  (week 7). A successful dashboard insert is not proof the policies work.
- **Update has `using` but no `with check`.** Postgres reuses the `using` rule
  for the new row, so an owner cannot edit a row and reassign it to someone
  else's id. Intended.
- **RLS with no policies denies everything.** Enabling RLS and creating the
  policies happened in the same script, so there was no locked or wide-open
  window.
- **Re-running fails.** `create table` and `create policy` error with "already
  exists" on a second run. Check the table is empty before any drop-and-recreate.
- **Why the dashboard, not the app:** this is raw SQL, which belongs where no
  user input can reach it. App code never builds SQL from strings; `supabase-js`
  parameterizes what it sends (the reading's injection warning, p. 144).

## 5. Heads-up for Part 2 (not blocking now)

- `filling`, `shape` and `color` are `not null`, and the 9 entries in
  `entries.js` do not have those as fields. Moving them in needs **real values
  from the student**; heritage content is never invented (AGENTS.md rule 6).
- `owner` is `not null`, so every seeded row needs a real user uuid from
  `auth.users` (for example the Lab 5 test user).
- `data/entries.js` uses camelCase (`titleKhmer`, `descriptionKhmer`, `image`);
  the table uses snake_case (`title_khmer`, `description_khmer`, `photo_url`).
  Mapping will be needed when the app reads from the database.
- The old `ingredients` and `taste: { scale, notes }` fields have no matching
  columns; `taste` became `texture` / `sweetness` / `saltiness`.

## Verification

- Student ran the script in the Supabase SQL Editor and confirmed the `entries`
  table appears in Table Editor.
- Student checked Authentication, Policies: the four `entries` policies are
  listed, and the page offers a "Disable RLS" button, which means RLS is
  currently enabled.
- Table Editor shows 15 columns, matching the script (3 fixed + 12 worksheet).
- No `npm run build` needed; no application code changed.

## Commit status

- Only this file is new in the repo (`docs/sprint 2/CHANGES5_SQL.md`), not yet
  committed (student commits separately).

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES5_SQL.md`   (Lab 6 Part 1 — `entries` table + RLS)
