# CHANGES 3 — Descriptions (English + Khmer)
// This changelog was documented by claude code

Session log for writing real descriptions into the 9 mooncake entries, and adding a first pass of Khmer text. Only `data/entries.js` was touched — no components, no pages, no rendering changes.

---

## 1. English descriptions filled in

**What changed:** Every entry in `data/entries.js` now has a real `description` instead of a placeholder.

- `mooncake-egg-1` and `mooncake-egg-2` already had short descriptions written by the student. Those were **kept as-is** and a longer, researched continuation was appended to the same string (same field, same paragraph — not a new field, not a replacement). This was a deliberate choice after going back and forth on it: merging into one paragraph or a true second paragraph would have meant changing how `EntryCard.js` and `app/entries/[id]/page.js` render `description` (currently a single string → single `<p>`), which was ruled out to keep this round scoped to the data file only.
- The other 7 entries (`mooncake-bean-paste-egg-1`, `mooncake-lotus-paste-egg-1`, `mooncake-lotus-paste-egg-2`, `mooncake-pandan-lotus-paste-egg-1`, `mooncake-big-peah`, `mooncake-round-peah`, `mooncake-small-peah`) went from `description: ""` to a full paragraph each.

**Where the content came from:**
- Visual inspection of each photo in `public/images/` — crust type, filling color/texture, egg yolk count, stamps/seals visible on the pastry.
- Web research on mooncake styles in general: baked Cantonese-style construction, lotus/bean/five-kernel fillings, salted egg yolk symbolism, snow skin mooncakes, and Teochew flaky-layer pastries (locally called Pia, from Teochew 饼).
- Family-supplied facts from the student mid-session: the "Ngoyen" filling is likely a mixed nut/five-kernel blend (exact recipe still pending); all three Pia sizes (Big/Round/Small) are sold in the same three fillings — taro, bean paste, winter melon — as a customer's choice, not one fixed filling per size; Big Pia is made with 2 egg yolks, Round and Small Pia with 1 each.

**Deliberately left pending, not guessed:**
- `source` on the 7 non-egg entries is still `"Pending"` — the student is filling this in themselves (uncle's shop, "Tea Tek Bouy").
- The exact ingredient list behind "Ngoyen" (five-kernel mix) — flagged in the description text itself as still being confirmed with family, rather than stated as fact.
- Which specific filling (taro / bean paste / winter melon) is pictured in each Pia photo — not claimed, since the shop sells all three sizes in all three fillings and the photos don't reliably disambiguate.

---

## 2. Khmer fields added: `titleKhmer` and `descriptionKhmer`

**What changed:** Two new fields added to every entry — `titleKhmer` (a Khmer name for the item) and `descriptionKhmer` (a Khmer translation of the English description). Placed directly after `title` and `description` respectively so the English/Khmer pairs stay visually adjacent in the file.

**How the Khmer was produced:**
- `descriptionKhmer` is a translation of the finished English description, not an independent write-up — written to read naturally rather than word-for-word literal.
- `titleKhmer` for the 6 baked/snow-skin entries was cross-checked against the actual Khmer captions burned into their catalog photos (e.g. the bean paste photo's caption reads roughly "សាច់សណ្ដែកពងទា១"), which gave more confidence in the filling vocabulary used.
- `titleKhmer` for the three Pia entries (ពាធំ / ពាមូល / ពាតូច) are constructed names, not photo transcriptions — those three images either had no legible Khmer caption or the stamped text was too stylized to transcribe reliably, and inventing an uncertain reading into the archive was avoided on purpose.

**Known caveat — this is a draft, not verified:** The Khmer text (both fields, all 9 entries) was AI-translated and has **not** been proofread by a native speaker. Specific terminology choices that should be checked with family before treating this as final:
- "នំព្រះច័ន្ទ" used throughout for "mooncake" generally.
- "ត្រាវ" for taro, "ត្រឡាច" for winter melon, in the Pia filling descriptions.
- "ពា" kept as the Khmer spelling for Pia (not translated further).

**Nothing renders this yet.** `EntryCard.js`, `app/entries/[id]/page.js`, and `SearchFilter.js` still only read the English `title`/`description`. Wiring the Khmer fields into the UI is a separate, not-yet-started step.

---

## Still open

- Native-speaker proofread of all Khmer text (both fields, all 9 entries).
- `source` still `"Pending"` on 7 entries — student to fill in.
- Ingredient specifics for the Ngoyen (five-kernel) filling, and which Pia filling is in which photo, both pending a conversation with the uncle.
- Deciding how (or whether) `titleKhmer` / `descriptionKhmer` show up in `EntryCard.js` and the entry detail page — no component changes have been made yet.
- `PROJECT_NOTES.md`'s changelog index has not been updated with this file — left for the student to fold in when they next touch that file.
