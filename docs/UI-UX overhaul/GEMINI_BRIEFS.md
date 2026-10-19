# Gemini image briefs for the overhaul

Paste a brief into Antigravity's Gemini and save the result in `Week8/Gemini_images_from_antigravity/`
(outside the repo). The AI (Claude Code) then looks at it, crops and compresses it, and only the small final
file enters the repo. No keys or secrets here.

**Rules for every image (settled project rules):**
- **No letters of any kind** in the picture: no Khmer, no Chinese, no English, no logos, no seals with
  characters. All text on the site stays live text.
- Real colours of the site (hex values below) so the image blends in.
- A calm picture: the site puts text over or next to it, so avoid busy detail where text will sit.
- No people, no rabbits, no lanterns (they turn the site into a festival poster).
- Keep a copy of the prompt you used, so a second image can match the first.

**Site colours:** midnight `#07122B`, deep blue `#123575`, cobalt `#1C4FB0`, teal `#2096AC`, moon cream
`#FFF4D2`, moon gold `#F2C65F`.

---

## How to run a brief (step by step)

1. In Antigravity, **open the folder** `Week8/Gemini_images_from_antigravity` (File, Open Folder). Do **not**
   open the repo and do **not** open the whole `Week8` folder: `Week8` holds a file with an API key in it,
   and the repo is only edited by one agent (Claude Code).
2. That folder has a `references/` subfolder with three style pictures from the moodboard
   (`ref_A_moon_over_lake.jpg`, `ref_B_river_of_light.jpg`, `ref_C_moon_gate.jpg`). They are for mood and
   style only, never to copy.
3. In the Gemini chat, first write: "Generate images with your image tool and save them in this folder."
   Then paste the brief, add the line for the chosen direction (below), and tell it which reference file to
   look at.
4. Ask for **three** images, saved as `hero_A_1.png`, `hero_A_2.png`, `hero_A_3.png`. Pick one and tell
   Claude Code the file name.

## Brief 1 — Hero painting (the one that makes the site feel majestic)

Used as the full-width background of the home page's top section, in place of the CSS moon.

> A wide panoramic digital illustration for a website banner, 2400 x 1000 pixels (about 21:9). Style: a
> Chinese-inspired painted night landscape, like a modern gouache and digital painting with soft glowing
> light and fine layered depth (similar in feeling to a mid-autumn festival poster, but with no text).
> A large luminous full moon, warm cream and gold (#FFF4D2 to #F2C65F), placed in the upper centre with a
> soft glowing halo and faint thin rings. The sky is a rich gradient of deep midnight blue (#07122B) at
> the edges to cobalt (#1C4FB0) and a touch of teal (#2096AC) near the moon. A scatter of tiny soft stars.
> At the bottom, three or four layers of stylised misty mountains in blues and teals, each layer lighter
> and hazier into the distance, with thin gold cloud-scroll line-work drifting between them. The very bottom
> edge fades smoothly to flat midnight blue #07122B so it blends into the page background. Keep the lower
> middle area calm and low-contrast (soft mist, no bright detail) because a heading will be placed there.
> No text, no letters, no characters, no logo, no people, no animals, no lanterns, no buildings. Calm,
> majestic, premium, elegant.

**Add ONE of these lines after the brief, depending on the direction chosen:**

- **A. Moon over a lake** (suggested, calmest): "Composition: the moon above layered mountains, with a still
  dark-blue lake in the lower third reflecting the moon as a soft vertical glow. Style and mood reference:
  `references/ref_A_moon_over_lake.jpg` (use only the feeling and colour harmony; do not copy it; no
  animals, no flowers, no lanterns, no text)."
- **B. A winding river of light:** "Composition: a glowing pale-gold river or path winding between layered
  mountains toward the moon in the upper centre. Style and mood reference:
  `references/ref_B_river_of_light.jpg` (use only the feeling, light and colour harmony; do not copy it; no
  people, no buildings, no instruments, no text)."
- **C. Moon through a gate:** "Composition: a large round moon-gate arch in the foreground framing the
  moon and misty mountains beyond. Style and mood reference: `references/ref_C_moon_gate.jpg` (use only the
  shape idea and mood; do not copy it; no garden, no statues, no text)."

What I will do with it: crop to the hero area, check the left and right edges, compress to about 250 KB,
and blend its bottom into the page with a gradient. If the moon in the picture is good, the CSS moon is
removed.

## Brief 2 — Mooncake emblem (empty states, 404 page, footer)

> A small circular emblem, 512 x 512 pixels, in the style of a carved wooden mooncake mould seen from
> above: a round floral rosette with concentric petal patterns and a scalloped outer edge. Drawn as clean
> fine gold line art (#F2C65F) on a flat solid midnight-blue (#07122B) background, centred, with generous
> empty space around it. No text, no letters, no characters, no shadows, no 3D, no photo.

What I will do: turn the flat blue background into transparency, crop and compress to a few KB.

## Brief 3 (optional) — Cloud-scroll corner ornament

> A single decorative corner flourish, 512 x 512 pixels, traditional Chinese cloud-scroll (xiangyun) line
> art in fine gold (#F2C65F) on a flat solid midnight-blue (#07122B) background, placed in the top-left
> corner and extending along both edges, with a lot of empty space. No text, no letters, no characters.

I will rotate it for the other three corners in code.

## Brief 4 (optional) — Seamless cloud pattern tile

> A seamless repeating pattern tile, 512 x 512 pixels: traditional Chinese cloud-scroll motifs and fine
> concentric wave lines in thin gold (#F2C65F) on a flat solid deep-blue (#0E2455) background, even
> spacing, low visual weight, calm. It must tile perfectly on all four edges. No text, no letters.

---

## Already available

- `Week8/Gemini_images_from_antigravity/mooncake.jpg` (1200 x 896, a warm photographic mooncake with a
  carved top, a cut half showing the yolk, tea and osmanthus). Planned use: the "What is a mooncake?"
  panel, in an arch-shaped frame. It is an AI-generated picture, so it is used as an illustration, not as
  one of the archive's entries.

---

## Results so far (updated 2026-10-20)

**Brief 1, direction A (moon over a lake)** was run once and made three images, now kept in
`Week8/Gemini_images_from_antigravity/Brief 1/` (outside the repo, 2400 x 1000 each):

| File | What it shows | Where it goes |
|---|---|---|
| `hero_A_3.png` | big golden moon with a halo disc and gold orbit rings, teal mountains, gold cloud-scrolls, lake reflection | **Home page hero, done** (`public/hero-moon-2000.webp`, `-900.webp`) |
| `hero_A_1.png` | calm white-gold moon with thin rings, soft teal and blue mountains, a few gold cloud lines, lake reflection | planned: **Browse** page, slim banner above the heading (not built yet) |
| `hero_A_2.png` | moon with a thin ring, layered blue mountains with winding gold ribbons, lake reflection | planned: **Contribute** page, slim quiet banner above the form (not built yet) |

No image on login or signup (the student's decision: people type there). The page assignment for A_1 and
A_2 is the AI's reading of the student's message and should be confirmed before it is built. Each image
will be cropped to a slim banner and compressed to WebP (about 30 to 90 KB) before it goes into `public/`.

**Not run yet:** directions B (river of light) and C (moon gate) of Brief 1, and Briefs 2 to 4 (mooncake
emblem, cloud-scroll corner, cloud pattern tile). The student plans to generate more from the other
directions later to explore options. When new images arrive, put them in a new folder next to `Brief 1/`
(for example `Brief 1 - B/`), tell the AI the file names and which one you like, and keep the prompt you used.

**Lessons from the first run:** attaching three reference pictures and saying "style only, do not copy"
worked very well; asking for three versions gave real choice; Gemini asked to run `git status` (rejected, not
needed); the picture came back exactly 2400 x 1000 with no text in it, as asked.
