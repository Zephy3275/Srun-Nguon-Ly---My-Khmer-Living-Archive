# Change Log & Explanations

This file documents the changes made to the archive and **why each change works**.

---

## 1. New component: `components/EntryCard.js`

**What changed:** Created a reusable card component that displays one archive entry: an image, a source label, a title, and (optionally) a description.

**Why it works:**

- React components are functions that take **props** (properties) and return JSX. `EntryCard` receives `title`, `source`, `description`, and `image` as props, so one component can render any number of entries — you just pass different data.
- The `styles` object uses **inline styles**, which React converts into real CSS at runtime. This was chosen deliberately: no CSS frameworks or extra packages are allowed for this task.
- The image uses a plain `<img>` tag with `/images/...` paths. Next.js serves everything in the `public/` folder from the site root, so `public/images/mooncake_egg_1.jpg` is reachable at `/images/mooncake_egg_1.jpg`.
- `{description && <p>...</p>}` is a **conditional render**: if `description` is missing/undefined, React renders nothing instead of an empty paragraph. This makes the component safe to reuse for entries without descriptions.

---

## 2. Updated page: `app/page.js`

**What changed:**

- Added an `entries` array holding the two mooncake records (title, source, description, image path).
- Imported `EntryCard` and rendered it once per entry with `.map()`.
- Replaced the hardcoded "0" count with `{entries.length}`.
- Added a `grid` style (flexbox row that wraps).

**Why it works:**

- `entries.map((entry) => <EntryCard key={entry.title} {...entry} />)` loops over the data array. The spread operator `{...entry}` passes every field of the object as an individual prop — this is why adding a new field like `description` only works after the component also accepts it (see review point #9).
- `key={entry.title}` gives React a stable identity for each list item so it can efficiently update the DOM when entries are added/removed/reordered.
- `{entries.length}` makes the counter dynamic — add a third entry to the array and the count updates automatically. No duplicated state to keep in sync.

---

## 3. Bug fix: City not displaying (`collection.config.js`)

**What changed:** Renamed the config key from `City:` (capital C) to `city:` (lowercase).

**Why it works:**

- JavaScript object keys are **case-sensitive**. The page reads `collection.city`, but the config defined `City`. Since no property named `city` existed, JavaScript returned `undefined`, and React renders `undefined` as nothing — hence the empty CITY card.
- After renaming, both sides reference the exact same key, so `"Phnom Penh"` flows through correctly.

---

## 4. Descriptions added to entries

**What changed:** Each entry in `app/page.js` now has a `description` string; `EntryCard` renders it under the title in smaller gray text.

**Why it works:** Same prop-passing mechanism as above — the data lives in one place (the `entries` array), and the component stays generic. Content changes never require touching component code.

---

## Known follow-ups (from code review)

- Extract shared colors/sizes into a single theme module so `page.js` and `EntryCard.js` don't duplicate them.
- Consider `next/image` later for automatic image optimization.
- Document required vs optional props on `EntryCard`.