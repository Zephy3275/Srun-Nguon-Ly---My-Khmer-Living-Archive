# CHANGES3 — All changes made by the AI partner this session
// This changelog was codumented by the cline new chat that we talked about

This log covers every change the AI partner made in this working session: the page-per-entry scaffold, the homepage "About the Mooncake" context, and the bilingual display + Khmer search. It documents only the AI partner's own edits.

## Changes made

### 1. Page-per-entry scaffold (route + clickable cards)

- `app/entries/[id]/page.js` (new): dynamic-route detail page. It reads an entry's `id` from the URL params, finds that entry in `data/entries.js`, and shows its title, source, image, and description. If the id isn't in the data it renders a friendly "not found" fallback with a back link. Nothing is hard-coded — it reads from the data.
- `components/EntryCard.js`: wrapped each card in a real `next/link` to `/entries/{id}` (a semantic link rather than a clickable div), and added an `IMAGE PENDING` fallback so an entry with an empty image never shows a broken-image icon.

### 2. Homepage "About the Mooncake" context

- `components/ContextAbout.js` (new): a section on the homepage that walks visitors through what the mooncake is — the Mid-Autumn Festival intro, four bolded points (shape & symbolism, the rebellion legend, reaching Southeast Asia, egg yolks), and a personal closing note. Content is rendered in the archive's existing theme/voice.
- `app/page.js`: imported `<ContextAbout />` and rendered it right before the "entries in the archive" count, above the entry grid.

### 3. Bilingual display + Khmer search

- `components/EntryCard.js`: additionally renders `titleKhmer` under the English title and `descriptionKhmer` below the English description, only when those fields are present.
- `app/entries/[id]/page.js`: renders the entry's `titleKhmer` as an `<h2>` under the English heading and `descriptionKhmer` below the English description.
- `components/SearchFilter.js`: `matches()` now searches `title`, `description`, `titleKhmer`, and `descriptionKhmer` in one string, so typing a Khmer term finds the matching entry.

### 4. Data wiring (structural edits only)

- `data/entries.js`: replaced the 5 placeholder entries and added 2 more so all 9 images map 1:1 to entries; set each entry's `image` path to its real photo and gave provisional titles derived from the filenames. Only this structural wiring (ids, image paths, titles) is listed here.

## How it works

- **Cards / detail page** read `title`, `titleKhmer`, `description`, `descriptionKhmer`, `image`, etc. straight from the entry object pulled from `data/entries.js`, so the data stays the single source of truth.
- **Search:**
  ```js
  const matches = (entry) => {
    const searchable = [entry.title, entry.description, entry.titleKhmer, entry.descriptionKhmer]
      .filter(Boolean).join(" ").toLowerCase();
    return searchable.includes(q);
  };
  ```
  Missing fields are dropped by `.filter(Boolean)`, so entries without Khmer text still search exactly as before.

## Styling / design

- Khmer text is rendered as first-class content (never stripped/transliterated), styled as a supporting language (`#C7CFDB` titles, `#7C8698` body, Courier dividers).
- Reuses the existing dark `#14181F` / `#2EE6A8` theme; no new dependencies, no CSS library.

## Verification

- `npm run build` passes (exit code 0); route table shows `/`, `/browse`, `/entries/[id]`.
- Manual checks in `npm run dev`:
  - `/` -> homepage shows the "About the Mooncake" context above the entries, and each card shows Khmer title + description where present.
  - `/entries/mooncake-big-peah` -> detail page shows the Khmer title + description.
  - `/browse` -> typing a Khmer word (e.g. `សណ្ដែក` "bean paste" or `ឈូក` "lotus") returns the matching card.

## Not part of this change (left untouched)

- No edits to content fields inside `data/entries.js` beyond the structural wiring in item 4 (`source`, `ingredients`, and `taste` remain as they were).
- No other files changed beyond those listed above.
- No commits made yet.

## Changelog index

- docs/CHANGES3_Description2.md  <- this file (AI-partner session changes)
