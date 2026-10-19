# UI/UX overhaul - mockup briefs (copied into the repo from `../Week8/UX_UI_Overhaul/02_Overhaul_Plan_and_Mockup_Briefs.md`)

Copied here so any chat can read them even if it cannot see the `Week8` folder. Palette hex values are starting
points, tuned once a mockup exists. Context: `OVERHAUL_NOTES.md` in this folder. No keys or secrets here.

## Mockup briefs to paste into Antigravity

Purpose: make the palette decision visual. Each prompt asks for a **homepage mockup only**. Save the
results in `Week8/Gemini_images_from_antigravity/` as `mockup_A.png`, `mockup_B.png`, `mockup_C.png`.

Rules that keep the mockups useful (tell the model in every prompt):
- No Khmer or Chinese characters anywhere: use grey bars or lines as stand-ins for text.
- Only the labels in the prompt as real English words, if any; no invented headlines.
- Desktop, about 1440 x 900 viewport; a second image at phone width is optional.
- A flat screen design, not a photo of a computer.

**Shared description of the page** (put this in every prompt):

> A website homepage for "Khmer Living Archive", a family archive of Khmer and Chinese mooncakes
> and proverbs, made by a student in Phnom Penh. Layout, top to bottom: a thin sticky header bar with a
> round moon logo at left and four links at right (the last one is a filled button); a hero area with
> the archive name as a big heading and a short grey-bar description under it; three small info
> cards in a row (curator, source, city); an "About the mooncake" panel with a short intro and three
> bullet points; then a grid of entry cards, each with a photo of a mooncake on top, a small label,
> a title, and three lines of text, with a second smaller block of lines under it for the Khmer
> translation. Use grey bars for all text. No Khmer or Chinese letters. Flat UI design, 1440x900.

**Variant A, Midnight & Gold:**

> Style: Chinese mid-autumn festival at night. Page background deep navy #0A1630, cards #112347 with
> thin muted-blue borders #2C4170, warm cream text #F5ECD7, gold accents #E8B84B for small headings
> and hairline frames, and a cinnabar red #C8372D filled button. A subtle window-lattice pattern
> along the top of the header and a large full moon glowing softly behind the hero heading. Round
> "moon gate" circular frames around the card photos, a row of small moon phases as a divider
> between sections. Elegant serif headings. Calm, premium, warm.

**Variant B, Cream & Cinnabar (light):**

> Style: traditional Chinese festival paper and red lanterns, in daylight. Page background paper
> cream #FBF3E2, cards #FFFAEE with soft tan borders #D9C7A0, dark ink text #2A1A12, deep gold
> #8A5A00 for small headings, and a cinnabar red #B3261E filled button. A faint cloud-scroll pattern
> along the header, a red hanging lantern motif in the hero corner, round "moon gate" frames
> around the card photos, thin gold hairline dividers. Elegant serif headings. Bright, festive,
> clean.

**Variant C, Lacquer:**

> Style: red-and-gold lacquer box. Page background very dark red-black #190E0F, cards #2A1819 with
> brown borders #5A3A33, warm cream text #F6E8D4, gold accents #E3B359, cinnabar red #C8372D filled
> button. A carved mooncake-mould pattern as a faint texture on the hero, gold hairline frames on
> the cards, round "moon gate" frames around the card photos. Elegant serif headings. Rich, warm,
> formal.

After you have the three images, send me (or put in the folder) and I will compare them against the
contrast numbers, point out anything that will be hard in plain CSS, and we pick one. Then P1 starts.

Optional extra briefs once a direction is chosen: a hero illustration (a moon over rooftops or a
mooncake with orbit rings, no text), a faint lattice or cloud pattern tile (seamless, 256 px, low
contrast), and a moon-phase divider strip (transparent background).

