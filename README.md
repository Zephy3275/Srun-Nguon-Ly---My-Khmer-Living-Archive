# Khmer Living Archive: mooncakes from my uncle's shop

**Live:** https://srun-nguon-ly-my-khmer-living-archi.vercel.app/

Built by Ly Srun Nguon for ICT 340 at AUPP, Fall 2026.

## 1. What this is

A small archive of the mooncakes made by my uncle's mooncake shop in Phnom Penh, in English and Khmer. It holds nine mooncakes. Each has:
- a photo;
- its filling, shape, colour and texture;
- a sweetness score, except the three Peah (it depends on the filling, so their description gives it);
- a description in both languages.

What people can do:
- **Visitors** browse and search the collection in either language, and choose to see the site in English and Khmer together, English only or Khmer only.
- **Contributors** make an account and add an entry with a photo. It stays hidden until a reviewer publishes it.
- **The reviewer** publishes or returns new entries from a review queue.

The site's title and description still mention proverbs and Chinese. That is left over from the first week: the archive is mooncakes only, and the Chinese was dropped, with my instructor's agreement. The title will be renamed.

## 2. Who it's for

Anyone in Cambodia who is curious about mooncakes and the Khmer and Chinese traditions around them. My own family is Khmer-Chinese, and the shop is family. It is meant to be read in Khmer as easily as in English, on a phone.

What I did for them:
- **Khmer first.**
  - A switch in the header sets the whole interface to English and Khmer together (the default), English only, or Khmer only. Every interface string, 167 in all, has a Khmer version (`utils/strings.js`). The choice is kept in a `lang` cookie, which holds only the language.
  - In Khmer-only mode an entry shows its Khmer title and description, and falls back to English when an entry has none.
  - Khmer text is marked `lang="km"`, the page's `<html lang>` follows the mode, and Khmer gets its own fonts (Noto Sans Khmer, Noto Serif Khmer), no letter spacing and taller headings.
  - Search matches Khmer as well as English, and the "no match" message is in both languages.
  - The database's length limits count characters and do not check letters, so Khmer text is never rejected for being Khmer.
  - The Khmer fields on the add-entry form are optional. After a classmate tested the form, I saw that requiring them meant a contributor who doesn't know Khmer could not post at all.
- **Phones.** Every main page was checked at 390 px wide in all three language modes, logged out, as a contributor and as the reviewer: no sideways scrolling, and the header wraps.
- **Slow connections.**
  - The big hero picture comes in two sizes (900 and 2000 px wide), and the browser picks the one that fits its screen.
  - Photos are limited to 5 MB.
  - The pages are built on the server, so the entries arrive with the page.
- **Dates in Phnom Penh time.** The review queue shows dates in Phnom Penh time (UTC+7), not UTC.
- **Sources are named.**
  - Every entry must say where it came from (`source`), and can credit the person who contributed it (CONTRIBUTED BY, on the cards and the entry page).
  - The credit is a display name only. Who owns an entry is decided by the login, never by what is typed in the form.

## 3. How it works

- **Site:** Next.js 15 (App Router) and React 19, plain JavaScript, hosted on Vercel (deploys the `main` branch).
- **Accounts, data and photos:** Supabase (email and password login, a Postgres database, a Storage bucket).
- **Dependencies:** `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`. Nothing else.
- **Pages:**
  - `/`: home, published entries.
  - `/browse`: all published entries, with search.
  - `/entries/[id]`: one entry.
  - `/entries/[id]/edit`: owner only.
  - `/contribute`: logged in only.
  - `/my-entries`: your own entries and their status.
  - `/login` and `/signup`.
  - `/review`: reviewers only.

The full definitions, exported from the live database, are in [docs/database.md](docs/database.md).

**Tables**
- `entries`: one row per mooncake.
  - Content: title and description in English and Khmer, source, contributor, filling, shape, colour, texture, sweetness, saltiness, photo URL.
  - Bookkeeping: `owner` (the user id), `status`, `review_note`, `created_at`, `updated_at`.
- `reviewers`: the user ids allowed to review. Row-level security is on and it has no policies, so nobody can read or change it through the API. Reviewers are added in the Supabase SQL Editor.

**Statuses**

| Status | Meaning |
|---|---|
| `pending` | New or edited, waiting for a reviewer. The default. Hidden from the public. |
| `published` | Approved. Everyone can see it. |
| `returned` | Sent back by a reviewer, with an optional note: a pending entry from the queue, or a published one taken down from its page. Hidden from the public. The owner edits it, and saving sends it back to `pending`. |

**Who can read and write what** (row-level security policies on `entries`)

| Policy | Action | Rule |
|---|---|---|
| anyone can read published entries | read | the entry is published, OR it is yours, OR you are a reviewer |
| owners add their own entries | add | you are logged in, the owner is you, and the status is `pending` |
| owners edit their own entries | edit | it is yours, it stays yours, and the saved status is `pending`, unless you are a reviewer |
| owners delete their own entries | delete | it is yours (any status) |

**Photos:**
- The bucket `photos` is public, takes up to 5 MB, and accepts only JPEG, PNG and WebP.
- You can upload or delete only inside a folder named after your own user id.
- There is no read policy, so the files can't be listed. A photo opens only by its exact address.

**Database functions:**
- `is_reviewer()` says whether the logged-in user is on the `reviewers` list.
- `review_entry(entry_id, decision, note)` is how a reviewer publishes or returns a pending entry, or takes a published one down (next section).
- A trigger, `entries_set_updated_at`, sets `updated_at` itself, so the browser cannot. It changes only when the owner changes the content; a reviewer's decision does not count as an edit.

**The path of an entry:**
1. A contributor adds it on `/contribute`. It is saved as `pending` and they see a "waiting for review" message.
2. The reviewer opens `/review` (pending entries, oldest first) and presses PUBLISH or RETURN, with an optional note.
3. A returned entry shows on the owner's `/my-entries` with the reviewer's note.
4. When the owner edits it and saves, it goes back to `pending`.

## 4. Security decisions

**The gate: a stranger cannot publish their own entry.** Three rules in the database make sure of it:
- Adding an entry is only allowed with the status `pending`.
- Editing is only allowed if the saved status is `pending`, unless you are a reviewer.
- The only way to change someone else's entry is `review_entry`.

**Why `review_entry` lives in the database.** Publishing means changing a row you don't own, and the edit policy forbids that. So the function runs with the database's own rights (`security definer`), which skip the policies. Because it skips them, it does all its own checks:
1. Are you on the `reviewers` list?
2. Is the decision `published` or `returned`?
3. Is the entry still `pending`? A `published` entry is accepted only for `returned`, which takes it down.

If any answer is no, it returns `false` and changes nothing. It returns `true` only if a row really changed, and it never shows an error. It also runs with an empty `search_path`, so it can't be tricked into using a look-alike table. None of this can live in the browser, because anyone can change the code running in their own browser.

**What a hidden button does and doesn't protect:**
- The EDIT and DELETE buttons only show to the entry's owner. The REVIEW link and the `/review` page only show to reviewers.
- That is politeness: it keeps the page tidy and stops honest mistakes. It protects nothing.
- Anyone can open the browser console and call the database directly. The policies and `review_entry` are what refuse them.
- When a policy refuses an edit or a delete, Supabase does not send an error. It changes nothing and returns an empty list. So the code asks for the changed rows back and treats "no rows" as a failure (`utils/updateEntry.js`).

**Tested by attacking it** from the browser console on the live site, as a second account that is not a reviewer:

| Date | Attack | Result |
|---|---|---|
| 2026-10-25 | Add an entry as `published` | refused (row-level security error) |
| 2026-10-25 | Edit my own entry to `published` | refused (row-level security error) |
| 2026-10-25 | Call `review_entry` | returned `false` |
| 2026-10-25 | Add myself to `reviewers` | refused (row-level security error) |
| 2026-10-25 | Logged out, ask for unpublished entries | empty list |
| 2026-11-07 | Call `review_entry` again, after it was replaced to add the note | returned `false` |
| 2026-11-21 | Edit another account's published entry | empty list, nothing changed |
| 2026-11-22 | Take a published entry down with `review_entry`, after the function was changed to allow it | returned `false`, still published |

In Sprint 2 a classmate attacked the live site from their own account. Editing and deleting my entries returned empty lists, and uploading a `.txt` file was refused.

**Decisions the briefs left to me:**
- **What a returned entry says:**
  - On `/my-entries` it shows RETURNED, the line "This entry was returned. Edit it and save to send it for review again.", an EDIT link and the reviewer's note, if there is one.
  - I first shipped it without a note (Lab 10, because of the deadline) and added the note in Lab 11, because "returned" with no reason is frustrating.
  - Any save of a returned entry sends it back to review, even when the owner is a reviewer. An early version forgot that case, and a reviewer's own returned entry was stuck forever.
- **Can reviewers take down published entries? Yes, since the final sprint.**
  - At first the answer was no, and not by choice: the lab's `review_entry` only acted on `pending` entries, and the edit policy only lets you edit your own. I noticed it when I had published test entries on the public page and no way to remove them as the reviewer.
  - I changed `review_entry` so a reviewer can also return a `published` entry, with an optional note. It leaves the public pages at once, and its owner sees RETURNED and the note on `/my-entries`. Publishing still only works on `pending` entries.
  - The button is in a "FOR REVIEWERS" box at the bottom of a published entry's page, shown only to reviewers. As with the queue, that is politeness: the database function is what checks.
  - I chose "returned" rather than deleting, so the owner can fix the entry and send it again, and nothing is lost.
  - An owner can still delete their own entry at any status.
- **What search shows a contributor about their own pending entries: nothing.**
  - The home page and search only ask for `published` entries, even though the read policy would let you see your own pending ones.
  - Your pending and returned entries are listed on `/my-entries` instead, with their status. You can still open your own pending entry from there.
  - That way the public shelf looks the same to everyone.
- **An edit to a published entry goes back to review.** A gate that opens once and stays open is not a gate: someone could get a clean entry published, then swap in something else. Contributors are warned before they save. A reviewer's own edits stay published.
- **The form is politeness, the database is the rule.**
  - Every field has a length limit in the database, so a request that skips the form is still refused.
  - The limits check length only, not letters, so they can't misjudge Khmer.
  - Photos are checked by their first bytes, not their file name (`utils/photoCheck.js`), and saved under a random name in your own folder.
  - The owner always comes from the login session, never from the form.
- **Errors are plain words.** The screen shows a short, fixed message in the chosen language. The real error goes to the browser console, never on screen.

**Known gaps I chose to leave:**
- `photo_url` accepts any web address. A crafted entry could point at a picture on another server, which could change it after a reviewer approves it. The fix is one check constraint.
- The reviewer's note is limited to 500 characters in the browser only.
- Email confirmation is off, and there is no limit on how many entries one account can submit.
- One person can submit and review their own entries.
- Photos stay in Storage after their entry is deleted or the photo is replaced.
- Location data (EXIF/GPS) is not removed from uploaded photos; removing it means re-encoding them, which costs quality.
- Old test entries still exist in the database as pending or returned. They are hidden from the public; only their owners and the reviewer see them.
- One old test entry's photo is a screenshot of a test login (an email and a password). It is still in Storage. It can be opened only by its exact address, which appears only in that hidden test entry.

## 5. AI use

I used AI for almost all of the code, and I say so plainly. The model names are as I recorded them in my weekly logs.

| When | Tool and model | What it did | What I kept, changed or dropped |
|---|---|---|---|
| Weeks 1 and 2 | Gemini 3.6 and 3.7, ChatGPT 5.3 (in the browser) | Taught me git: push, pull, merging | Helpers for questions, not for code |
| Week 2 | Cline + OpenRouter: Nvidia Nemotron 3 Ultra (free) | Nothing: it kept failing, probably the free tier's limits | Dropped |
| Week 2 | Cline + OpenRouter: Ox Alpha (free at launch; it turned out to be Z ai 5.3) | The first entry card, the first two entries, a changelog, explanations | Kept; I moved on when it stopped being free |
| Weeks 3 to 5 | Cline + OpenRouter: DeepSeek flash v4 0731 | Moved the entries into `data/entries.js`; browse and search; a page for each entry; the Khmer fields; then Supabase, login and sign-up (Week 5) | Kept, but I rejected its edits when it guessed. It garbled its own changelog near a 200k-token context, and invented details when asked to describe the repo. Dropped when I needed a model that reads screenshots. |
| Week 4 | Claude Code, Claude Sonnet 5 | Wrote the first descriptions of my nine mooncakes in English and translated them into Khmer | Replaced on Nov 26 (the last two rows). Some of its general facts (Teochew-style Peah, the snow skin Pandan, a second yolk as a gift) are still in the new text: I kept them without checking them against the shop |
| Week 6 | Claude Code, Claude Sonnet 5 | Filled the gaps in my own data model worksheet; wrote the table, policy and insert SQL | Kept after reading; I ran all SQL by hand |
| Weeks 7 to 12 | Claude Code, Claude Sonnet 5.5 | Planning, SQL, the contribution form, edit and delete, the gate, the review queue, the fixes, the console attack kits, the changelogs in `docs/` | Kept after reviewing every change before I committed it; my AI-assisted commits say so |
| Week 8 | Gemini, in Antigravity | Painted the hero picture, from a brief Claude wrote | Kept, credited below |
| Week 8 onwards | Gemini, in the Gemini web app | Made the site icon and the loading animation's artwork; Claude Code (Sonnet 5.5) cut them out and added them to the site | Kept, credited below |
| Week 13 | Claude Code, Claude Opus 5.5 | The final checklist and scans, the language switch and the script that builds `utils/strings.js`, the reviewer's take-down (the SQL change and the button), this README and `docs/database.md` | Kept after testing each step |
| Week 13 | Gemini 4 Neon | Drafted the Khmer for 151 interface strings | I chose the key words (entry, publish, reviewer, return, MY ENTRIES), read some of the strings and changed several words. I have not read every one. |
| Nov 26 (after the deadline) | Claude Code, Claude Opus 5.5 | Rewrote the nine entry descriptions from my own edits and the facts I gave (sizes, yolks, sweetness, the Peah spelling); built the SQL that updated them | I edited two descriptions first and asked for one to be longer; I ran the SQL myself and checked the live site |
| Nov 26 (after the deadline) | Gemini 4 Neon | Translated the nine new descriptions into Khmer | I also tried Google Translate; Claude compared the two, and I chose Gemini's and changed four words |

**The Khmer, honestly:**
- The nine entries' Khmer descriptions were translated by Gemini 4 Neon on Nov 26, replacing Claude's Week 4 translation. I chose it over Google Translate's and changed four words.
- The interface Khmer from Sprints 2 and 3 is mine: the status words, the review buttons, the queue messages and the save notices.
- The rest of the interface Khmer was drafted by Gemini in the final sprint. I chose the key words and corrected the strings I read, but not every string.

**Where the AI got it wrong, and how I caught it:**
- **Sign-up hid the real error.** The login and sign-up forms show one fixed message, so they don't leak why an account failed. On sign-up that hid the real reason, a password that was too short. I noticed when my own sign-up failed with a vague error, and fixed it with a minimum length in the form.
- **One query credited every row.** When I added the contributor column, the AI wrote an `UPDATE ... WHERE contributor IS NULL` that credited all 17 rows, my 8 test entries included. I caught it by looking at the table. I previewed the wrong rows with a read-only query, then took the credit off only those.
- **Returned entries could get stuck.** The Lab 10 edit code only sent entries back to review for non-reviewers, so a reviewer's returned entry stayed returned forever. Nothing in the lab caught it; my own audit did.
- **Wrong dates.** It printed the "submitted" date in UTC, which shows the wrong day in Phnom Penh before 7 AM.
- **A false hint.** It wrote "Only you can see it for now" for pending entries. That is false, because reviewers can see them too.
- **An unannounced change.** It added a "queue could not be loaded" message without telling me. I found it later in the changelog.
- **A wrong model name.** Gemini's translated file said it was from "Gemini 3.1 Pro". It was Gemini 4 Neon.
- **One mistake was mine.** My first console attack used the placeholder id, returned a 400 and proved nothing. I re-ran it with a real id.

**How I checked the work:**
- I read every diff before committing it.
- I ran each change on my computer, then on the live site.
- I tested with three accounts: an owner, a stranger and the reviewer.
- I attacked the database from the browser console (section 4).
- The AI wrote a changelog for every change (`docs/`), and I checked them against what I saw.
- Classmates tested the live site in Sprints 2 and 3, and one attacked it from the console.

## 6. Sources and credits

- **The mooncakes:** my uncle's mooncake shop in Phnom Penh. My uncle agreed to the shop being credited.
- **The entry photos** (`public/images/`): taken from the shop's own listing on Grab, used with my uncle's permission. They are the shop's photos, not mine.
- **The entry descriptions:** first written by AI in Week 4 (English, and a Khmer translation) and left unchanged until Nov 26, after the final deadline. Then they were rewritten by AI from my own edits and what I know from the shop, and translated into Khmer by Gemini 4 Neon (section 5). A few general facts from the Week 4 text are still in them, unchecked (listed in `docs/final sprint/CHANGES13_RealEntryData.md`).
- **Artwork made with Gemini:**
  - the hero picture (`public/hero-moon-900.webp`, `public/hero-moon-2000.webp`), made in Antigravity;
  - the site icon (`app/icon.png`) and the loading animation (`public/loader-center.png`, `public/loader-rings.png`), made in the Gemini web app.
- **Fonts:** Cormorant Garamond, Jost, Noto Sans Khmer and Noto Serif Khmer, from Google Fonts, loaded with `next/font`.
- **The starter template and lab guides:** ICT 340, AUPP.
- **Testers:** two classmates, who tested the live site in Sprints 2 and 3; one also attacked it from the console (not named, because I have not asked them).

## 7. Running it locally

You need Node.js 18.18 or newer and a Supabase project.

```bash
git clone https://github.com/Zephy3275/Srun-Nguon-Ly---My-Khmer-Living-Archive.git
cd Srun-Nguon-Ly---My-Khmer-Living-Archive
npm install
```

Create a file called `.env.local` in the project folder with these two variables (names only here; the values are your own project's URL and publishable key, from the Supabase dashboard):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

- `.env*` files are ignored by git, so the values never reach the repo.
- The publishable key is public by design: every visitor's browser receives it. The data is protected by the row-level security policies, not by hiding the key.
- The live site's values are set in Vercel.

```bash
npm run dev
```

Then open http://localhost:3000.

The database has to exist first. The SQL is not a script in this repo. [docs/database.md](docs/database.md) has the table, the constraints, the policies, the functions, the trigger and the bucket as they run on the live project, so you can recreate them in your own project's SQL Editor. To make someone a reviewer, add their user id to `reviewers` in the SQL Editor.

## 8. Submission checklist

- Live URL loads logged out and shows published entries only: yes, https://srun-nguon-ly-my-khmer-living-archi.vercel.app/ (live check 2026-11-08; checked again after the final merge: NOT YET)
- A stranger cannot publish their own entry through the page or the console: yes, tested 2026-10-25 (section 4)
- Logged out, the API returns nothing pending or returned: yes, tested 2026-10-25 (section 4)
- Contributors can edit and delete only their own entries: yes, tested 2026-11-21 on the live site, and by a classmate in Sprint 2
- No secrets anywhere in the repo history: yes, checked 2026-11-21 by searching every commit on every branch for key patterns, a Supabase project URL and passwords (no match, and no `.env` file was ever committed)
- At least eight real entries, each with a credited source: yes, 9, from my uncle's shop (section 6)
- Khmer renders on every screen a user meets, including the queue: yes, the language switch covers every screen (2026-11-22)
- Works at phone width: yes, tested 2026-11-22 in the browser at 390 px wide, all three language modes
- No test entries, lorem ipsum or TODO comments in shipped pages: NOT YET. The published test entries were taken down on 2026-11-22 with the reviewer's RETURN button, but one, "Lab11 part 4", is still public (checked 2026-11-26). No lorem or TODO in the code (searched 2026-11-21). Old test entries still exist hidden (section 4).
- No console errors on the main pages: yes, 2026-11-22 (on my computer; live check after the merge: NOT YET)
- jesseorndorff is a collaborator on this repo: yes
- Supabase project restored and awake on (date): NOT YET
- Demo video link opens in a private window: NOT YET
- Reflection pasted in the Canvas submission: NOT YET
- Posted in the Show Your Archive discussion: NOT YET
- Q&A slot booked for (date and time): yes, December 4
