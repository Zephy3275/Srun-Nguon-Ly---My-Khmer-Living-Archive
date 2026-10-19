# CHANGES 7.5 — Overhaul P4a-3: the painted hero from Gemini (Sprint 2, Week 8, UI/UX overhaul)

The step that answers the student's request for a "majestic" look. After P4a-2 (`CHANGES7.5_Atmosphere.md`)
the student clarified that the inspirations feel majestic because of the whole composition (moon, light,
mountains, mist, stars), not only the blue, and that this needs a real image model. The student directed,
Gemini painted, the AI wrote the prompt and fitted the result into the site. No dependency added
(`package.json` untouched). No database change, no text added or changed.

## 1. How the image was made

- The AI wrote Brief 1 (direction A, "moon over a lake") in `GEMINI_BRIEFS.md`, with the site's exact
  colours, and prepared a small reference folder `Week8/Gemini_images_from_antigravity/references/`
  (three moodboard pictures, style reference only). The student opened only that folder in Antigravity
  (not the repo, and not `Week8`, which holds a file with an API key) and Gemini made three versions:
  `hero_A_1.png`, `hero_A_2.png`, `hero_A_3.png`, each 2400 x 1000 (3.7 to 4.7 MB).
- **The student chose `hero_A_3.png`:** a large glowing golden moon with a soft halo disc and thin gold
  orbit rings with small stars, teal and blue layered mountains with mist, gold cloud-scroll line-work, and
  a still lake with the moon's reflection. The picture has no text, people, animals or lanterns.
- A reference mistake caught by the student along the way: `ref_C_moon_gate.jpg` had been copied from the
  wrong inspiration file (the red lattice, not the moon gate); fixed before it was used.

## 2. What changed in the repo

| File | Change |
|---|---|
| `public/hero-moon-2000.webp` (new, 92 KB) and `public/hero-moon-900.webp` (new, 27 KB) | The picture, resized (2000 and 900 px wide) and compressed to WebP at quality 88 and 86 with the `sharp` already in `node_modules` (a one-off script, not a project dependency). From 4.6 MB to 92 KB and 27 KB, far under the 250 KB budget. |
| `components/HeroBanner.js` (new) | The hero: the picture at its natural shape (never shorter than 340px, so on a phone it is cropped around the moon), its bottom edge dissolving into the page (CSS mask), and the title block pulled up over the mountains below the moon, with a dark "scrim" layer starting below the moon so the title is readable and the moon stays bright. `srcSet` lets a phone download the small file. `alt=""` (decoration), `fetchPriority="high"`. |
| `app/page.js` | The top of the page is now `HeroBanner` (kicker, title, description inside it) followed by `main` (moon phases, info cards, About panel, entries, footer). Re-indented. No content, text or data change. |
| `app/globals.css` | New token `--scrim`. The now-unused CSS moon pieces are removed: `--moon-*`, `--glow-*` tokens, the `moon-breathe` keyframe, the `.moon-halo` class and its reduced-motion entry. |
| `components/HeroMoon.js` | **Deleted** (the CSS moon from P4a, replaced by the painting). |

## 3. How it was checked

- AI-made headless Edge screenshots on a throwaway server (port 3100; the student's 3000 was not
  running), three rounds:
  1. First version: the title overlapped the moon's lower edge and the scrim dulled it. Fixed by laying the
     picture out at its natural shape and pulling only the text block up over the mountains.
  2. Desktop (1280px): moon, halo and rings, mountains and cloud-scrolls fully visible; title below the moon
     on the mountains; smooth fade into the page; moon phases and cards follow.
  3. Phone width (500px, the smallest the headless browser allows): the moon stays large and the title
     wraps into three clean lines. (A first 390px shot looked cropped only because the headless browser
     will not go narrower than about 500px.)
- Not checked: a real phone, motion, other browsers, a very wide monitor (the picture is capped at 860px
  tall and crops its sides there).
- Sizes: desktop picture 92 KB, phone picture 27 KB.

## 4. Things to know

- The painting is the student's generated artwork; the mooncake photo (`mooncake.jpg`) is also Gemini's
  and is planned as an illustration in the About panel (not one of the archive's entries).
- If the title is hard to read in some browser, raise `--scrim` or move the text block down (the overlap
  numbers in `HeroBanner.js`).
- The CSS stars and cobalt glow remain behind other pages; on the home page the picture covers them.

## 5. Next

P4b: a one-row header with a gold hairline, a wider page, the three info cards in a row, the gold lattice
strip, and the mooncake photo in an arch frame in the "What is a mooncake?" panel. P5 can add a slow drift
to the mist and a gentle twinkle to the picture's stars with plain CSS.
