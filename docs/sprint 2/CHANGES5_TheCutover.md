# CHANGES 5 — The cutover: the site reads entries from Supabase (Sprint 2)

Session log for **Lab 6, Part 3**: the home page, browse/search and the
per-entry detail page now read from the Supabase `entries` table instead of
importing `data/entries.js`. Layout, styling and components are unchanged. No
package was added.

---

## 1. What changed

- `app/page.js` (edited) — home page. Replaces the data-file import with a
  Supabase query (all entries, newest first). Now an `async` server component.
- `app/browse/page.js` (edited) — browse page. Same query; passes the result to
  `SearchFilter` exactly as before. Now `async`.
- `app/entries/[id]/page.js` (edited) — detail page. Looks the entry up by id
  with `.eq("id", id).maybeSingle()` instead of `entries.find(...)`.
- `app/loading.js` (new) — a small "LOADING THE ARCHIVE…" screen in the existing
  style, shown by Next.js while a page waits on the database.
- **Untouched:** `data/entries.js` (kept on purpose, see below), every component
  (`EntryCard`, `EntryList`, `SearchFilter`, `SearchSuggestions`), `package.json`,
  `package-lock.json`, `next.config.mjs`, `.gitignore`, `.env.local`.

## 2. How it works

- **Client:** the existing server client, `createClient()` from
  `utils/supabase/server.js`. No new dependency.
- **Query:** `select(...)` with column aliases,
  `titleKhmer:title_khmer`, `descriptionKhmer:description_khmer`,
  `image:photo_url`, so the rows arrive with the same field names the components
  already use. That is why no component needed to change.
- **Ordering:** `order("created_at", { ascending: false })` (newest first), as the
  lab asks. All 9 rows were inserted in one statement and share a timestamp, so
  their order among themselves is not guaranteed; no tiebreaker was added (see
  Notes).
- **Search:** unchanged. `SearchFilter` still filters the array it receives in
  the browser; only the source of the array moved. Khmer search and the
  suggestions dropdown work as before.
- **RLS:** the "anyone can read entries" policy (`using (true)`) lets these
  server reads work for logged-out visitors and logged-in users alike.

## 3. The three states the pages handle

| State | Home / Browse | Detail page |
|---|---|---|
| Entries found | renders as before | renders as before |
| **Zero entries** | "No entries in the archive yet." | not applicable |
| **Query error** (Supabase slow, asleep or down) | "We couldn't load the archive right now. Please try again in a moment." | "Couldn't load this entry" page |
| **Loading** | `app/loading.js` | `app/loading.js` |

- An error is shown separately from "zero entries" on purpose: saying the archive
  is empty when the database is merely unreachable would be false.
- On the detail page, Postgres error code `22P02` (the id is not a valid uuid,
  e.g. an old slug link) is treated as **not found**, not as a failure, so old
  links show "Entry not found" and do not crash.
- This answers the lab's question, "does the code assume the database answers?":
  it no longer does. Before, `entries.map(null)` would have crashed the page.

## 4. Scope note: the detail page

The lab's task text names only the home page and search. The detail page was
included because cards now link to database uuids, and the old lookup searched
the data file (whose ids are slugs), so every card would have opened "Entry not
found." The student approved touching this file (AGENTS.md rule 4).

## 5. Decision: the data file stays

Lab step 4 (retire `data/entries.js` in its own commit) was **deliberately
skipped**. The student wants to keep the file as the place new entries are
drafted before they go into the database. Nothing imports it any more, so it is
harmless; Next.js only bundles imported files. Consequences:

- The file is now a separate copy the site does not read. Editing it changes
  nothing on the site, and nothing keeps it in sync with the database.
- New entries only appear on the site once they are inserted into Supabase (as
  in Part 2).

## 6. Notes / trade-offs

- **Ordering ties:** no second sort key was added, since the lab asks only for
  newest first. Entries added at different times will sort correctly; if the 9
  original entries ever look shuffled, add a tiebreaker such as `title`.
- **Old links break:** saved URLs like `/entries/mooncake-egg-1` now show "Entry
  not found." The site's own cards link to the new uuid URLs.
- **Dynamic rendering:** `/browse` and `/entries/[id]` are now server-rendered on
  demand (they read cookies through the server client), like the home page
  already was.
- **Duplicated select string:** the same `select(...)` column list appears in the
  three pages. Left as three copies to keep each diff small and scoped.

## Verification

- `npm run build` exit code 0; no lint or type errors. `/login` and `/signup`
  remain static (`○`), so `loading.js` did not affect them.
- Fetched from a local production build against the live Supabase data: home
  showed "entries in the archive: 9" with 9 card links and Khmer text present;
  browse rendered 9 entries; the detail page for a real uuid returned 200 with the
  right title; the old slug `/entries/mooncake-egg-1` showed "Entry not found";
  `/login` and `/signup` returned 200.
- **Student checked in `npm run dev`:** 9 entries showing, search unaffected,
  Khmer text rendering correctly, and detail pages loading properly.
- **Not tested:** the loading screen, the zero-entries message and the "couldn't
  load" messages. Simulating an empty table or a Supabase outage was not
  practical, so those code paths are unverified.

## Commit status

- Not yet committed (student commits separately). Pending:
  - `app/page.js` (modified)
  - `app/browse/page.js` (modified)
  - `app/entries/[id]/page.js` (modified)
  - `app/loading.js` (new)
  - `docs/sprint 2/CHANGES5_TheCutover.md` (new)
- `git status` also shows `docs/PROJECT_NOTES.md` modified (student's own edit,
  not part of this change) and the two earlier Lab 6 changelogs untracked.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES5_TheCutover.md`   (Lab 6 Part 3 — site reads from Supabase)
