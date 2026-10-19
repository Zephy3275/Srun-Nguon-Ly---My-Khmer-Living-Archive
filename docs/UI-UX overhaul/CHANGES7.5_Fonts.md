# CHANGES 7.5 — Overhaul P3: typography (Sprint 2, Week 8, UI/UX overhaul)

Third code step of the UI/UX overhaul (phase **P3 "Typography"** in `OVERHAUL_NOTES.md`). Still the Week 8
workflow, hence 7.5. Follows `CHANGES7.5_CssVariables.md` (P1) and `CHANGES7.5_Retheme.md` (P2). No
database change, no new dependency (`next/font` is part of Next.js itself; `package.json` and
`package-lock.json` were not touched), no text changed.

The student left the choice of fonts to the AI ("do what you believe would fit perfectly").

## 1. The fonts

| Role | Font | Why |
|---|---|---|
| Headings and entry titles | **Cormorant Garamond** (500, 600, 700) | an elegant, calligraphic serif: the biggest single "premium" signal, and it replaces the typewriter look |
| Body text and small labels, buttons, links | **Jost** (variable) | a clean geometric sans that pairs with Cormorant and replaces Courier New |
| Khmer in headings and card titles | **Noto Serif Khmer** (variable) | a serif Khmer that matches the serif headings |
| Khmer in body text | **Noto Sans Khmer** (variable) | a proper Khmer font in place of whatever the visitor's system happened to have |

Loaded with `next/font/google`: the fonts are downloaded when the site is built and served from the site
itself, not requested from Google when someone visits. All four have Khmer or Latin support as needed
(checked in Next's font list before use).

**How Khmer and English share a line:** each font list is tried per character. English letters use the
first font (Cormorant or Jost); a Khmer character is not in those, so the browser falls to the Khmer font.
A title that mixes both is therefore handled correctly without any code. Safe system fonts end every list.

## 2. What changed

| File | Change |
|---|---|
| `app/layout.js` | Imports and configures the four fonts (each sets a CSS variable on `<html>`), adds them to `<html className>`, and the body now uses `var(--font-body)`. Page background and text colour were already variables. |
| `app/globals.css` | New font tokens in the `:root` block: `--font-heading`, `--font-body`, `--font-label` (the label font is the body font; its own name so it can change on its own). The `.nav-link` / `.nav-btn` font line uses `--font-label`. |
| 17 files in `app/` and `components/` | Every `'Courier New', monospace` (26 uses) became `var(--font-label)`: `app/page.js`, `app/entries/[id]/page.js`, and `components/` `AuthHeader`, `BackLink`, `ContextAbout`, `DeleteEntryButton`, `EntryCard`, `EntryOwnerActions`, `FieldCounter`, `FormField`, `Loader`, `LoginForm`, `PageHeading`, `PhotoPreview`, `SearchFilter`, `SignupForm`, `SiteHeader`. |
| `app/page.js`, `components/PageHeading.js`, `app/entries/[id]/page.js`, `components/ContextAbout.js`, `components/EntryCard.js` | Headings use `var(--font-heading)`, weight 600, and a bigger size because Cormorant has a smaller x-height than a sans font at the same size. Home title 48 to 60; page titles (browse, login, signup, contribute, edit) 40 to 48; entry-page title 40 to 48 and its Khmer title 22 to 24; "What is a mooncake?" 24 to 32; card title 18 to 24 and card Khmer title 15 to 16. Card Khmer titles use the serif Khmer too. |

No `'Courier New'` remains anywhere in `app/` or `components/` (searched).

## 3. How it was checked

- A throwaway dev server on port 3100 (the student's port 3000 was not running) rendered `/`, `/browse`,
  `/login`, `/signup`, `/contribute` (200) and an unknown URL (404).
- The `<html>` tag carries the four font classes; the served CSS defines all four families (28 `@font-face`
  blocks including the Khmer range `U+1780...`); all 12 listed font files returned 200 with real sizes
  (10 KB to 83 KB each; the largest is the Khmer file). The server was stopped and `.next` deleted.
- **Student's visual check (browser, passed):** all text looks clean; entries with Khmer render with no
  issues and the new Khmer fonts look good; text is easier to read (some of it is bolder now); the form text
  is much better; shrinking the browser zoom does not break the text.
- Not checked: a real phone (only a narrowed desktop window).

## 4. Things to know

- **Internet needed the first time.** `npm run dev` downloads the fonts the first time it runs (cached
  afterwards); Vercel does it during the deploy. Offline, the site falls back to the system fonts listed
  at the end of each list and nothing breaks.
- **Weight on phones:** about 200 KB of fonts load for a normal page (Latin and Khmer files only when the
  page uses them). `display: "swap"` shows text immediately in a fallback and swaps when the font arrives.
- **If one font looks wrong** (for example Khmer in the headings), it is a one-line change in
  `app/globals.css` (`--font-heading` or `--font-body`), with no component edits.
- Rule for new code: use `var(--font-heading)`, `var(--font-body)` or `var(--font-label)`; never a raw
  font name in a component.

## 5. Revert

All font changes are in this one commit. Reverting it returns the typewriter and system fonts and the old
heading sizes; P1 and P2 are unaffected.

## 6. Next

**P4 "Layout and ornament":** a glowing moon hero, a richer blue gradient sky behind it, gold hairlines and
a lattice strip, arch-shaped photo frames and moon-phase dividers. Gemini image briefs will be written for
anything that cannot be done in plain CSS.
