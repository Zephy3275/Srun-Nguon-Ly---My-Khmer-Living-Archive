# CHANGES 6 — The contribution form, with a photo (Sprint 2, Lab 7 Part 1)

Session log for **Lab 7, Part 1**: a `/contribute` page where a logged-in user adds an
entry with a photo. Part 0 (the `photos` bucket and its two storage policies) was run
by hand in the Supabase SQL Editor before this part; it is not a repo file.

---

## 1. What changed

New files only. No existing file was edited, no dependency added.

| File | Purpose |
|---|---|
| `app/contribute/page.js` | Server page. `getUser()`: logged-out visitors see a "Log in" link, logged-in users see the form. |
| `components/ContributeForm.js` | `"use client"`. State, submit flow, disables the button while checking/uploading/saving. |
| `components/FormField.js` | One label + control + hint; the error message replaces the hint, in red, next to the field. |
| `utils/entryFields.js` | The field list (drives both the form and its starting state). |
| `utils/validateEntry.js` | Pure text validation + `trimValues`. Rules from `Week7_Lab7/TableRule_Refined.md`. |
| `utils/photoCheck.js` | Photo checks: size, and real type from the file's first bytes. |
| `utils/submitEntry.js` | Upload the photo, then insert the row. Returns `{ id }` or `{ error }`. |

## 2. Submit flow

1. Button disabled. Trim every text field, validate, check the photo. Any failure: a
   message next to that field, button re-enabled, nothing sent.
2. `supabase.auth.getUser()` gives the user. `owner` is `user.id` from the session.
3. Upload to `photos/<user id>/<random uuid>.<ext>`, `upsert: false`. The extension and
   content type come from the detected type, never from the original filename.
4. `getPublicUrl(path)` becomes `photo_url`.
5. `insert` names all 13 columns explicitly, then `.select("id").single()`.
6. If the insert fails, the just-uploaded photo is removed (the delete policy allows it).
7. Success: `router.push("/entries/<new id>")`.

Every failure shows a short fixed message ("Your photo didn't upload. Check your
connection and try again.", etc.). The real error goes to `console.error` only.

## 3. Rules enforced (summary of TableRule_Refined.md)

- All text trimmed; at least one letter in every text field (rejects `;;;;`, spaces-only,
  zero-width-space-only); control characters rejected.
- title 1–120, source 1–300, filling/shape/color 1–120, texture (optional) 1–120 with no
  digits (0–9 or Khmer ០–៩).
- title_khmer: 1–500, needs a Khmer letter, **no Latin letters**.
- description: max 1,000 words and 10,000 characters.
- description_khmer: max 6,000 characters, needs a Khmer letter, Latin letters **only inside
  ( )** (the real entry `mooncake-big-peah` contains "(Pia)" and "(Teochew)").
- sweetness / saltiness: optional dropdown 1–5; empty is saved as `null`.
- photo: required; JPEG/PNG/WebP by magic bytes; 1 byte to 5 MB (same limits as the bucket).

## 4. Lab step 2 — the four holes + grep

- **Owner:** from `supabase.auth.getUser()` in `submitEntry.js`. There is no owner field in the form.
- **Insert:** names every column; no `...data` / `...values` spread (grep: 0 hits).
- **Errors:** no `error.message` anywhere (grep: 0 hits); real errors only reach `console.error`.
- **Upload path:** `<user id>/<crypto.randomUUID()>.<ext>`; the file's own name is never used.
- **`dangerouslySetInnerHTML`:** grep over the project (excluding node_modules/.next): 0 hits.

## 5. Lab step 3 — old photos vs new photos

Old rows store `/images/<file>.jpg` in `photo_url`; new rows store a full
`https://….supabase.co/storage/v1/object/public/photos/…` URL. Every page already does
`<img src={image}>` with the column value as-is (no string-gluing), so both forms render.
Not changed. **To be confirmed by eye** on the live pages (see Verification).

## 6. Verification

Done in the session:
- `npm run build` passes; `/contribute` is listed as a dynamic route.
- A scratch test (not in the repo) ran `validateEntry` on all 9 existing entries (all pass)
  and on ~20 bad/edge inputs (spaces-only, symbols, zero-width space, Latin in Khmer title,
  Latin outside brackets, unclosed bracket, 1,001 words, 6,001 Khmer chars, one 11k-char
  "word", Khmer digit in texture, sweetness `abc`/`9`/`2.5`, null byte, 121-char title). All
  behaved as specified. `checkPhoto` correctly accepted JPEG/PNG/WebP bytes and rejected a
  renamed text file, a HEIC-style header, an empty file and a 6 MB file.
- `git status`: only new files plus `docs/PROJECT_NOTES.md`; `package.json`, `.env.local`
  and `.gitignore` untouched.

**Not done here (needs the student, in a browser):**
- Real test: one real entry, real Khmer text, real photo; logged out vs logged in on `/contribute`.
- Open an old entry and the new one side by side; both photos should show.
- Confirm in the Supabase Table Editor that `owner` is your user id and the Storage
  `photos/<your id>/` folder holds the new file.

## 7. Follow-up after the student's first local test

The student added an entry on localhost: it rendered on the home page, the detail page opened,
and Storage showed `photos/<own user id>/<uuid>.jpg`. Requested additions, done:

- **Nav link** `ADD AN ENTRY +` on the home page nav (`app/page.js`, next to BROWSE, same
  style). Shown to everyone; logged-out visitors land on the "log in" prompt.
- **Live counters** under `title` (characters, max 120), `title_khmer` (characters, max 500;
  added in a second small follow-up), `description` (words, max 1,000) and
  `description_khmer` (characters, max 6,000), via a `counter` entry in `utils/entryFields.js`
  and a new `components/FieldCounter.js`. Counts the trimmed text with the same `size` /
  `words` functions validation uses (now exported from `utils/validateEntry.js`), and turns
  red past the limit. The max numbers are written in both `entryFields.js` and
  `validateEntry.js` and must be kept in sync.
- The test row ("Test Entry") is a real row on the shared Supabase database, so it also
  appears on the deployed site. The student is to replace it with a real entry.

## 8. Known limits

- The form is the only enforcer of length / letter rules. The database has no length checks
  (deferred, optional later hardening in `TableRule_Refined.md` section 4).
- Phone photos can contain GPS location in EXIF data and are not stripped (student's decision).
- Edit and delete of your own entries are later Lab 7 parts.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES6_ContributionForm.md`   (Lab 7 Part 1 — `/contribute` form + photo upload)
