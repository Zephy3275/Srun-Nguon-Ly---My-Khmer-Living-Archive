# CHANGES 2 — Search feature

Part 3 of the lab: a search box that filters the archive's entries as you type.

## Changes made

1. **`components/SearchFilter.js` (new)** — a client-side ("use client") component that owns the search experience:
   - A text input styled to match the archive theme.
   - **Filters as you type** — no submit button, no page reload.
   - Matches each entry's **title + description**, case-insensitive, using a simple in-memory filter over the array that is already imported by the page.
   - Shows a live result count ("N matches for '<query>'").
   - Shows a short empty state in the archive's own voice when nothing matches, instead of a bare "No results".
   - Renders the matching entries through the existing `EntryList` → `EntryCard`, so the cards and the way they look are completely reused.

2. **`app/browse/page.js` (modified)** — dropped the direct `EntryList` rendering and now renders `SearchFilter` (passing the full `entries` array down as a prop). The page keeps its "BROWSE THE COLLECTION" kicker and collection title.

## Scope note (what stayed the same)

- **No new packages.** This is plain React state + a `.filter()` call. The lab constraint (no server, no fetch, no new dependencies) is respected — it filters the array the page already has.
- **`data/entries.js` untouched.**
- **`components/EntryCard.js` and `components/EntryList.js` untouched** — search reuses them as-is.
- The default `/` (homepage) page was not changed for this feature; search lives on `/browse`.

## How the filtering works

```
const q = query.trim().toLowerCase();
const matches = (entry) =>
  (entry.title + " " + entry.description).toLowerCase().includes(q);
const filtered = q === "" ? entries : entries.filter(matches);
```

- Empty query → all entries are shown (everything visible, as a visitor expects when they clear the box).
- Non-empty query → only entries whose title or description contains the typed substring (ignoring case).
- Zero matches → the archive's own message appears.

## Visitor-style testing (done against the real data)

| Input | Expected / observed |
|-------|---------------------|
| `mooncake` | 2 results (the two real mooncake entries) |
| `placeholder` | 5 results (the placeholder entries) |
| a word that matches nothing (e.g. `zzzzno_match`) | 0 → empty state shown |
| empty string | all 7 entries shown |
| a single letter (`e`) | broad match (valid — many entries share that letter) |

Also confirmed in the browser (`npm run dev` → `/browse`) that the box filters live as you type.

## Khmer / Chinese text search (deferred, by design)

Rationale recorded here so it is not lost:
- The search **mechanism is already Unicode-safe** — `.includes()` matches Khmer and Chinese strings natively, and `.toLowerCase()` is a no-op for scripts without case, so it cannot corrupt them. This was verified against real Khmer strings.
- However, `data/entries.js` currently contains **no Khmer or Chinese text**, so those searches have nothing to match yet. Making Khmer/Chinese search fully visible will follow the same path later:
  - Add real Khmer (and eventually Chinese) content, either inside the existing `title`/`description` fields or as new fields (e.g. `titleKhmer`, `descriptionKhmer`, and later Chinese), and
  - if separate fields are used, extend the single `matches()` line in `SearchFilter.js` to also check them.
- This is intentionally left for when more real heritage data has been gathered, rather than forcing it now.

## Manual verification
- Ran `npm run build` — completed with exit code 0; `/browse` compiled with the client search component.
- Tested the filter logic directly with the archive's real entries for each of the four cases above.
- Confirmed interactively on `localhost:3000/browse`.

## Still open
- A separate git commit for this feature has not been made yet (the lab asks for separate commits).