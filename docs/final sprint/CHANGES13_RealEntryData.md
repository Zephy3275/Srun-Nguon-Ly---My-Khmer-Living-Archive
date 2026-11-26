# CHANGES13: Real entry data (2026-11-26, after the final deadline)

The nine real entries' content, changed in the live database only. No code, table, constraint, policy or function changed.

## What changed

- **description (English):** rewritten by Claude Code (Opus 5.5) from the student's own edits and the facts the student gave. No new facts were added.
  - The student's edits: removed "still being confirmed with family" (Ngoyen Egg 1) and "milder than the nut filling above" (Bean Paste). Bean Paste now says "lighter and milder than the Ngoyen".
  - Lotus Paste Egg 2 is new: two yolks, a bit bigger, otherwise the same as Egg 1. The student asked for it to be expanded (41 words became 98).
  - "Pia" became "Peah".
  - "Above" was removed: the home page lists entries newest first, so "the mooncakes above" pointed at the wrong ones.
- **description_khmer:** translated by Gemini 4 Neon, replacing Claude's Week 4 translation.
  - The student also ran Google Translate, and Claude compared the two. Google's had ពងមាន់ (a chicken egg) in Ngoyen Egg 2, «ពៀ» for Peah, three different words for "mooncake", and English left in brackets.
  - The student chose Gemini's and changed four words: បោះពុម្ព became បោះត្រា ("stamped"), សម្បក became សំបក (the old spelling), and ស្លឹកតយ and ទាជីវ were kept.
- **title_khmer:**
  - នំព្រះច័ន្ទ became នំព្រះខែ.
  - ង៉ូវយ៉េង was added after it in both Ngoyen titles.
  - សាច់ became ស្នូល.
  - ស្លឹកតី became ស្លឹកតយ in the Pandan title.
  - The three Peah titles are unchanged.
- **source:** all nine now say "My uncle's shop: Tea Tek Bouy Bakery". The two Ngoyen entries said only "My uncle's shop".
- **sweetness:** Ngoyen Egg 1 and 2: 5; Pandan: 4; Lotus Paste Egg 1 and 2: 3; Bean Paste: 2.
  - The three Peah have none (null, so the page hides the line). Their sweetness depends on the filling: taro 4, bean 2, winter melon 3. The column holds one number from 1 to 5, so their description says it instead ("Taro is the sweetest of the three, winter melon sits in the middle, and bean paste is the gentlest.").
- **Not changed:** the English titles, shape (the student's list already matched the database), filling, colour, texture, saltiness (left empty for now), the photos, status.

## FLAG: facts kept without checking

These general facts came from Claude's Week 4 descriptions, not from the shop. Before translating, the AI asked the student to confirm them. **The student chose to keep them unchecked for now (no time).** If anyone questions an entry, check these first:
- The Peah are Teochew-style pastries made of layered water dough and oil dough (Big Peah, Round Peah).
- The Pandan Lotus Paste Egg 1 is a snow skin mooncake: not baked, a glutinous-rice skin, served chilled, with a salted egg custard center. This is the one most likely to be wrong.
- A second yolk has long marked a richer mooncake, often given as a gift (Ngoyen Egg 2, Lotus Paste Egg 2).
- Bean paste is one of the oldest mooncake fillings still made (Bean Paste Egg 1).
- Lotus paste is the filling most associated with mooncakes, and the refined, formal choice (Lotus Paste Egg 1 and 2).

## How it was done

1. Claude fetched the published entries read-only with the publishable key, the same view as a logged-out visitor. It wrote them into a review sheet outside the repo: `../Week14/RealEntryData/Entries_Current.md`.
2. The student edited the descriptions, gave the facts and chose the Khmer words.
3. A script built the SQL: `../Week14/RealEntryData/Update_Entries.sql`, outside the repo. The Khmer was copied by the script from the student's files, never retyped.
   - It is one `do` block with nine `update`s. Each matches an exact id and the entry's English title.
   - After each update, `get diagnostics` checks the row count. Anything other than exactly 1 row raises an error, which rolls back the whole block.
   - Status is not set, so all nine stayed published. The SQL Editor runs as the database owner, so the site's policies do not apply. That is why this path was chosen over the edit form, which sends an owner's edit back to pending.
   - The trigger `entries_set_updated_at` set `updated_at`, because the content changed.
4. The student ran it in the SQL Editor on 2026-11-26. Result: "Success. No rows returned".

## Checks

- **Student, live site:** the descriptions changed. Passed.
- **AI, read-only re-fetch after the run:** all nine match the SQL exactly (Khmer title, source, both descriptions). All are still `published`, `updated_at` is 2026-11-26, and sweetness is as listed above.
- **Not re-run: the console attacks.** No policy, function, constraint or code changed.

## Docs updated

- `README.md`:
  - Section 1: the sweetness line.
  - Section 5: the Week 4 row, two new rows, and "The Khmer, honestly".
  - Section 6: the descriptions line.
  - Section 8: the test-entry line, now honest that "Lab11 part 4" is still public.
- The same day, the Gemini model name was corrected to **Gemini 4 Neon** (the student confirmed it): `README.md` and `CHANGES12_LanguageToggle.md`.

## Still open

- The published test entry "Lab11 part 4" (contributor តេណា, archive.test.three), left for now by the student's choice.
- The title rename, the source line and combining CURATED BY / SOURCE / CITY on the home page.
- The Ingredients field.
- Saltiness.
