# CHANGES 7.5 — Overhaul P4a-2: a richer blue atmosphere (Sprint 2, Week 8, UI/UX overhaul)

A correction round after the student looked at P4a (`CHANGES7.5_HeroSky.md`) in the browser:
"all I see is a huge moon... it feels cheap, the colouring is not quite to my liking... the blueish hues in
the inspirations are majestic, my background feels voided." The student is right, and this step answers it.
Only `app/globals.css` and `components/HeroMoon.js` changed. Plain CSS, no image, no dependency, no text
changed.

## 1. Why P4a looked cheap

The inspirations are painted illustrations: many layers of blue, light and texture. P4a was one flat CSS
circle over a mostly flat navy that fell to near-black a few hundred pixels down. Code alone cannot fake a
painting, so the plan is now two parts: (a) a much richer colour atmosphere in CSS (this step), and (b) one
painted hero image from Gemini (the brief is in `GEMINI_BRIEFS.md`), which is where the majesty comes from.

## 2. What changed

| File | Change |
|---|---|
| `app/globals.css` | **A layered night sky on `body`**: a cobalt glow at the top centre (`--sky`), a teal glow at the top right (`--sky-teal`, the inspirations lean teal at the edges), 16 faint stars (`--star`, drawn as tiny radial gradients in the first 560px of the page), and a tall base gradient from a mid-blue (`--sky-deep`) down to the page colour over 1,600px, so the page stays blue all the way down instead of dropping to black. |
| `app/globals.css` (tokens) | Bluer base colours: `--bg` `#0A1630` to `#07122B`; `--surface` (cards, inputs) `#112347` to `#0A1B42`, now **deeper than the sky** so cards read like dark glass panels floating over it; `--border` `#2C4170` to `#2C4D92`; `--header-bg` follows `--bg`. New tokens `--sky`, `--sky-teal`, `--sky-deep`, `--star`. |
| `app/globals.css` (text tiers) | Secondary text was lightened so it stays readable on the brighter sky: `--text-soft` `#DDD4BF` to `#E4DCC8`, `--muted` `#B4BBCF` to `#CCD2E4`, `--muted-dim` `#939FBD` to `#B9C2D9`, `--faint` `#8693B3` to `#A8B3CD`, `--accent` (gold) `#E8B84B` to `#F2C65F`, `--danger` `#FF8A7A` to `#FFA595`, `--gold-line` slightly brighter. |
| `components/HeroMoon.js` | The moon is calmer: 132px to 92px (halo 96 to 70px). It is a placeholder until the Gemini hero painting arrives. |

## 3. Contrast (calculated, WCAG formula)

Text now sits on a page whose colour varies from the bright top to the dark bottom, so it was calculated
at several heights (the page colour at that height is the base gradient plus the cobalt glow):

| Where | Result |
|---|---|
| On cards (`#0A1B42`) | text 14.3, soft 12.3, muted 11.1, muted-dim 9.4, faint 8.0, gold 10.4, error 8.9 |
| On the page near the top (140px, where only back links and kickers sit) | gold 5.1, soft 6.0, muted 5.4 |
| On the page at 300px to 500px (headings' descriptions, hints) | muted 6.2 to 7.5, muted-dim 5.3 to 6.4, error 4.9 to 6.0 |
| On the page below 800px | everything 7 or better |
| Main button: cream on `#B8301F` | 5.1 |

`--faint` is 3.9 at the very top (140px) but is only used in the footer and on dark boxes lower down.

## 4. How it was checked

- The AI took headless Microsoft Edge screenshots of the home, login, browse and contribute pages at
  1280px wide and looked at each: the blue now carries down the whole page, the teal edge and stars add
  depth, and the cards read as dark panels. Three iterations: first the layers (still too black lower
  down), then the mid-blue base and deeper cards, then the lighter text.
- Not checked: motion, a real phone, other browsers. A star can land behind a line of text (static, tiny);
  it can be dimmed or limited to the hero if it bothers the student.

## 5. Next

The student decides on the Gemini hero painting (Brief 1 in `GEMINI_BRIEFS.md`). Then P4b (structure:
one-row header with a gold hairline, a wider page, the three info cards in a row, the lattice strip, and
the `mooncake.jpg` photo in an arch frame in the "What is a mooncake?" panel).
