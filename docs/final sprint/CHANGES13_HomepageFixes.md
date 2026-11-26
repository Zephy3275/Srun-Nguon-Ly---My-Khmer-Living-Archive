# CHANGES13: Home page fixes (2026-11-26 to 27, after the final deadline)

The archive's title, caption and source were renamed (they had not changed since Week 1). The three boxes under the hero became one. No database change and no new strings.

## The archive's identity (`collection.config.js`)

| | Before (Week 1) | Now |
|---|---|---|
| name | Khmer Archive Proverbs and Mooncake Recipes | Khmer Archive - Mooncake Collection (first "Khmer Archive Mooncakes Collection", changed on Nov 27) |
| description | A living archive of a piece of my family's heritage showcasing varying mooncake recipes and proverbs in both khmer and chinese. | A living archive of a piece of my family's heritage showcasing varying mooncake collections in both English and Khmer. |
| source | The knowledge will come from my family, my mom, uncle and grandma. My family is hybrid between khmer and chinese, so they have a unique blend of culture | The knowledge and source will come from my uncle, who owns a local bakery in Phnom Penh that also makes mooncakes during the festive season of the Mid-Autumn Festival. |

- The English is the student's own wording. The AI only capitalized English, Khmer, Phnom Penh and Mid-Autumn.
- **Why the title is general (student):** the archive is for anyone's mooncakes. The uncle's shop is only the first contributor, so naming the archive after it would defeat the purpose.
- **A mistake caught before translating:** the student first wrote that the bakery makes mooncakes for the "Chinese Lunar New Year". The AI pointed out that the site's own About text (AB3) says mooncakes belong to the Mid-Autumn Festival. The student confirmed Mid-Autumn was meant.
- **The Khmer (`km` block):** translated by Gemini 4 Neon. The student also ran Google Translate, and the AI compared the two.
  - Google's used two different words for "mooncake", neither of them the entries' នំព្រះខែ. Its first title was a literal "moon festival cake". It added "for sale" and dropped "local".
  - The student's choice: Gemini's for the caption and the source. A script copied them from `../Week14/HomepageFixes/Homepage_TranslatedByGemini.md`; they were not retyped.
  - **The title is the student's own (2026-11-27):** "Khmer Archive - Mooncake Collection" / បណ្ណសារខ្មែរ - កម្រងនំព្រះខែ. Gemini's title (បណ្ណសារកម្រងនំព្រះខែខ្មែរ) put ខ្មែរ last, so it read as "an archive of Khmer mooncakes" instead of "Khmer Archive". The student caught it.
  - The student first typed the last word as នំព្រះខ, without ែ. The AI used នំព្រះខែ, and the student confirmed it was a typo.
  - **The curator's name in Khmer (student, 2026-11-27):** លី ស៊្រុនងួន, added to the `km` block as `curator`.
    - The home page now reads it through `archive(lang, "curator")` instead of `collection.curator`, so Khmer-only mode shows the Khmer name. The other two modes show "Ly Srun Nguon".
    - The `collection` import in `app/page.js` was no longer used, so it was removed.
    - `archive()` in `utils/strings.js` already handles any key in the `km` block, so the generated strings file did not change.
  - City (ភ្នំពេញ) is unchanged.
  - **Still English in Khmer-only mode, on purpose:** each entry's `contributor` (CONTRIBUTED BY on the cards) and `source`. They are the entry's own data in the database, typed by its contributor, with no Khmer column.
- The name also feeds the browser tab title (`app/layout.js`) and the /browse heading, so both changed with it.

## The layout (`app/page.js`)

- **Before:** CURATED BY, SOURCE and CITY were three separate boxes. Each had a 48 px gap above it, which took about 400 px of scrolling.
- **Now:** one box.
  - CURATED BY and CITY sit side by side on the top row (`display: flex`, wrapping on narrow screens).
  - SOURCE runs the full width below a thin line, because it is now a long sentence.
  - The gap above is 32 px and the padding is 16 px by 20 px: about half the old height.
- The labels are the same string IDs (HM1, HM2, P6), so there was nothing new to translate.
- The student asked for less scrolling and left the layout choice to the AI.

## README

- The heading is the new name.
- Section 1 now says the archive is open to contributors and the first nine mooncakes came from the uncle's bakery.
- The "title will be renamed" note now says it was renamed on Nov 26.

## Checks

- **AI, throwaway dev server on port 3005 (stopped afterwards), before the Khmer went in:**
  - The home page returned 200 in all three modes, with no server errors.
  - The new title was in the tab and the hero, and the Mid-Autumn source was shown.
- **Student, localhost (2026-11-27): PASSED.** The new title, the combined CURATED BY / CITY / SOURCE box, and the Khmer title and texts all showed.
- **AI, the student's dev server (read-only GETs, 2026-11-27), after the curator change:** the home page returned 200 in all three modes. The Khmer name shows only in Khmer-only mode.
- **Student re-check (2026-11-27): PASSED.** The Khmer name shows under CURATED BY in ខ្មែរ mode.

## Optional, for later

- Show each entry's CONTRIBUTED BY and source in Khmer in Khmer-only mode (they are database fields with no Khmer column). The student left this for later.
