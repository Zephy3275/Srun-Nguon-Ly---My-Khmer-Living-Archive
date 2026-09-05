# Change Log & Explanations (Part 2)

This file documents the second round of changes made to the archive and **why each change works**.

---

## 1. New data file: `data/entries.js`

**What changed:** Moved the archive entries out of `app/page.js` and into their own file, `data/entries.js`. This file exports an array of entry objects.

The two existing mooncake entries were carried over unchanged, and **5 placeholder entries** were added (ids `entry-3` through `entry-7`), ready to be filled in with real content later.

Every entry now has the same shape:

```js
{
  id: "mooncake-egg-1",          // unique, stable string
  title: "Mooncake Ngoyen Egg 1", // display title
  source: "My uncle's shop",      // where the knowledge came from
  description: "...",             // a sentence or two
  image: "/images/mooncake_egg_1.jpg", // image path or "" until an image is added
  ingredients: [],                // recipe ingredients; [] until filled in
  taste: { scale: 3, notes: "" }, // taste scale 1-5 plus a short flavor note
}
```

**Why it works:**

- **Separation of concerns.** The data no longer lives inside a view file (`page.js`). Keeping content and presentation apart means we can later swap the array for a database without rewriting the page logic. This was the stated goal: `data/entries.js` is ready to become the single source the database layer reads from.
- **Consistent schema.** Because every object follows the same shape, the component that renders entries always knows what fields exist. Adding `ingredients` and `taste` as placeholders (`[]` and `{ scale: 3, notes: "" }`) means the structure is already there for the real data; we only have to fill in values, not change code.
- **`id` field.** A unique, stable string per entry gives React a reliable key for list items and gives us a natural primary key to map to a database later.
- **Khmer/real content preserved.** The two real entries kept their exact titles, sources, and descriptions. Placeholder entries are clearly marked so they don't get mistaken for real content.

---

## 2. Updated page: `app/page.js`

**What changed:**

- Removed the inline `const entries = [...]` array that used to live in this file.
- Added `import entries from "../data/entries.js";` at the top.
- Changed the list key from `key={entry.title}` to `key={entry.id}`.

**Why it works:**

- Since the entries moved to their own file, `page.js` must import them — otherwise the homepage would have no data to render. The import line pulls the array in from `data/entries.js` the same way the page already imports `collection` from `collection.config.js`.
- `entry.id` is a better `key` than `entry.title` because keys must be unique and stable. Two entries could theoretically share a title, but their `id` values are always unique. This keeps React's list rendering fast and correct as entries are added, removed, or reordered.
- Everything else — the cards, the response grid, and the `entries.length` counter — was left untouched, so the page looks exactly the same as before.

---

## Note on image placeholders

The new placeholder entries use `image: ""`. The `EntryCard` component still renders an `<img>` tag for every entry, so these placeholders will show a broken-image slot until real images are uploaded. This was a deliberate choice to avoid touching `EntryCard.js` and introducing unnecessary changes now.