# CHANGES 7.5 — Overhaul P2: the new palette "Midnight & Gold" (Sprint 2, Week 8, UI/UX overhaul)

Second code step of the UI/UX overhaul (phase **P2 "Retheme"** in `OVERHAUL_NOTES.md`). Still the Week 8
workflow, hence 7.5. Follows `CHANGES7.5_CssVariables.md` (P1), which moved every colour into CSS
variables. This step only **changes the values** of those variables. One file, no database change, no
new dependency, no text changed.

## 1. What changed

| File | Change |
|---|---|
| `app/globals.css` | The values in the `:root` block (14 variables) now hold the new palette, plus a comment explaining the palette. Nothing else in the file or the rest of the repo was touched. |

The student left the design to the AI ("you cook it"), choosing from a moodboard of 10 images: a
night-sky family (navy, glowing cream-gold moon) and a red-and-gold family (cinnabar with gold line
patterns). The palette combines them: **navy night sky, moon cream and gold, cinnabar red for actions.**

| Variable | Before (gray + mint) | Now | Role |
|---|---|---|---|
| `--bg` | `#14181F` | `#0A1630` | page background, deep navy |
| `--surface` | `#1C222C` | `#112347` | cards, inputs, panels |
| `--border` | `#2E3644` | `#2C4170` | hairlines and outlines |
| `--text` | `#E8EDF2` | `#F5ECD7` | main text, warm moon cream |
| `--text-soft` | `#C7CFDB` | `#DDD4BF` | Khmer titles, labels |
| `--muted` | `#97A1B3` | `#B4BBCF` | secondary text |
| `--muted-dim` | `#7C8698` | `#939FBD` | hints, counters |
| `--faint` | `#5A6373` | `#8693B3` | footer, placeholders |
| `--accent` | `#2EE6A8` | `#E8B84B` | kickers, links, focus ring, moon gold |
| `--button` | `#2EE6A8` | `#B8301F` | main button fill, cinnabar red |
| `--on-button` | `#14181F` | `#F5ECD7` | text on the main button |
| `--danger` | `#E86A5A` | `#FF8A7A` | errors, delete |
| `--danger-soft` | `#F0998D` | `#FFB8AA` | label of a required field |
| `--header-bg` | `rgba(20,24,31,.94)` | `rgba(10,22,48,.94)` | sticky header |

The autofill fix, focus ring, `.nav-link`, `.btn-filled` and `.btn-outline` rules already read the
variables, so they followed automatically.

## 2. Contrast (calculated with the WCAG formula, not eyeballed)

Target: 4.5:1 for normal text.

| Colour | On page `#0A1630` | On card `#112347` |
|---|---|---|
| `--text` | 15.3 | 13.2 |
| `--text-soft` | 12.2 | 10.5 |
| `--muted` | 9.4 | 8.1 |
| `--muted-dim` | 6.8 | 5.9 |
| `--faint` | 5.8 | 5.0 |
| `--accent` (gold) | 9.7 | 8.4 |
| `--danger` | 7.8 | 6.8 |
| `--danger-soft` | 10.8 | 9.4 |

Main button: cream `#F5ECD7` on cinnabar `#B8301F` = **5.13**.

Two corrections to the earlier plan (`OVERHAUL_NOTES.md` section 4 table), found by calculating:
- The planned cinnabar `#C8372D` with cream text only reached **4.42** (under 4.5). `#B8301F` reaches 5.13.
- `--faint` first came out at 4.4 on cards; lifted to `#8693B3` (5.0).

## 3. How it was checked

- The numbers above, calculated with a one-off script (outside the repo).
- The student ran `npm run dev` and looked: "it looks better than before".
- Not checked from outside: how it looks, the loader against the new background, autofill, the 404 page.
  The student's eyes are the check.

## 4. Student's verdict and what it means for the next steps

"The colours are better, but it still feels plain; no new animation or premium feel; I would like a
more refined blue from the inspirations." That is expected: P2 only repaints. The premium feel is
scheduled for the later phases:
- **P3 typography** (serif headings, a Khmer font, no more typewriter look),
- **P4 layout and ornament** (a glowing moon, a **gradient sky** for the richer blue the student asked
  for, gold hairlines, lattice strip, arch photo frames, moon-phase dividers),
- **P5 motion** (fades, hover lifts, soft glow; plain CSS).

The blue is one value (`--bg`/`--surface`) plus a background gradient, so it can be tuned at any point
without touching components.

## 5. Revert

P2 is a single block in a single file: reverting that commit returns the site to the dark gray and
mint green of P1 with nothing else affected.
