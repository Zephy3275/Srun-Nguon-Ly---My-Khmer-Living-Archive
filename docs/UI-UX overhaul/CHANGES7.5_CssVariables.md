# CHANGES 7.5 — Overhaul P1: colours moved into CSS variables (Sprint 2, Week 8, UI/UX overhaul)

First code step of the UI/UX overhaul (phase **P1 "Tokens"** in `OVERHAUL_NOTES.md`). It is numbered
7.5 because it is still the Week 8 workflow, not a new week. The tester fixes are `CHANGES7_*.md` in
`docs/sprint 2/`.

**No visual change, on purpose.** Every colour got a name and the same value it had before. The next
step (P2) changes the values in one place and the whole site follows. No database change (no SQL to
run), no new dependency, and none of `package.json`, `package-lock.json`, `next.config.mjs`,
`.gitignore` was touched. No Khmer or other text was changed.

## 1. Why

Before this step the site had **119 hard-coded colour uses** (11 distinct hex colours, plus one
`rgba()` for the header) spread over **24 files**. Changing the look meant editing every one of them.
Doing the rename first, with no visual change, means that if something looks wrong after the retheme
we know it is the new palette and not a half-finished refactor, and P2 can be reverted alone.

## 2. The variables (all defined once, in `app/globals.css`)

| Variable | Old value | Role |
|---|---|---|
| `--bg` | `#14181F` | page background (also the image-pending box) |
| `--surface` | `#1C222C` | cards, inputs, panels, search dropdown |
| `--border` | `#2E3644` | hairlines and outlines |
| `--text` | `#E8EDF2` | main text |
| `--text-soft` | `#C7CFDB` | Khmer titles, labels |
| `--muted` | `#97A1B3` | secondary text |
| `--muted-dim` | `#7C8698` | hints, counters, Khmer card text |
| `--faint` | `#5A6373` | footer, "IMAGE PENDING" |
| `--accent` | `#2EE6A8` | kickers, links, focus ring |
| `--button` | `#2EE6A8` | **new:** main button fill |
| `--on-button` | `#14181F` | **new:** text on the main button |
| `--danger` | `#E86A5A` | errors, delete, required `*` |
| `--danger-soft` | `#F0998D` | label of a required field |
| `--header-bg` | `rgba(20, 24, 31, 0.94)` | **new:** sticky header, slightly see-through |

`--button`, `--on-button` and `--header-bg` did not exist as separate colours before. The main button
used to borrow the accent (`#2EE6A8` with `#14181F` text) and the header had its own `rgba()`. Giving
them their own names means P2 can make the button red while the accent turns gold. Today they hold
the same values as before, so nothing moves.

`color-scheme: dark` moved into the same `:root` block (it was already there; only its position
changed).

## 3. What changed

| File(s) | Change |
|---|---|
| `app/globals.css` | New `:root` block with the 14 variables above (and a comment on each). The old hex values inside the autofill, focus ring, `.nav-link`, `.btn-filled`, `.btn-outline` rules now read `var(--...)`. `.btn-filled` uses `--button` / `--on-button` instead of `--accent` / `--bg`. |
| 23 files in `app/` and `components/` | Every `"#xxxxxx"` colour string in an inline style object became `"var(--name)"` (borders keep their shape, for example `"1px solid var(--border)"`). Files: `app/page.js`, `app/layout.js`, `app/loading.js`, `app/browse/page.js`, `app/contribute/page.js`, `app/entries/[id]/page.js`, `app/entries/[id]/edit/page.js`, and `components/` `AuthHeader`, `BackLink`, `ContextAbout`, `ContributeForm`, `DeleteEntryButton`, `EntryCard`, `EntryOwnerActions`, `FieldCounter`, `FormField`, `LoginForm`, `PageHeading`, `PhotoPreview`, `SearchFilter`, `SearchSuggestions`, `SignupForm`, `SiteHeader`. |

Total: **120 replacements in 24 files** (119 hex colours + the header `rgba()`). Only line contents
changed; no layout, size, spacing, class name, logic or text.

Left as it is on purpose: `boxShadow: "0 8px 24px rgba(0,0,0,0.4)"` in `SearchSuggestions.js`. It is
a plain black shadow that works on any palette, so it needs no variable.

## 4. How it was done

A one-off Node script (kept outside the repo, in the AI's scratchpad, not a project file) matched
the 11 exact hex values case-insensitively and the one `rgba()` and swapped each for its variable.
It printed any hex value it did not recognise; none appeared. Doing it by script rather than by
hand means no occurrence was missed or mistyped. The two edits in `globals.css` (the new block and
the `.btn-filled` rule) were made by hand.

## 5. How it was checked

- A search of `app/` and `components/` for any hex or `rgb(a)` value outside the `:root` block finds
  only the black shadow above. No named colours (`white`, `red`, ...) are used anywhere.
- A throwaway dev server on **port 3100** (the student's port 3000 was not running) rendered `/`,
  `/browse`, `/login`, `/signup`, `/contribute` (all 200) and an unknown URL (404, the default Next.js
  page). The rendered HTML contained `var(--...)` references and **none** of the old hex values. The
  server was then stopped and `.next` deleted.
- The student ran `npm run dev` and looked at the pages: everything still renders fine, no issues.
- Not checked from outside: how it looks. Since nothing was meant to change, the student's eyes are
  the check.

## 6. Rules and notes

- Inline styles and plain CSS only: CSS variables are plain CSS, no library, no dependency.
- Rule for new code from here on: **never write a raw hex colour in a component**; use a variable
  from the `:root` block (add one there if a new role is truly needed).
- Not in this step: the new palette (P2), fonts (P3), layout and ornament (P4). The colour values are
  still the old dark gray and mint green.

## 7. Next

**P2 "Retheme":** change only the values in the `:root` block to the chosen Midnight & Gold / cinnabar
palette (navy page, cream text, moon-gold accent, cinnabar main button, adjusted error colour), and
fix anything that clashes (autofill, loader, borders). One commit, revertible on its own.
