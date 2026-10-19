# CHANGES 7.5 — Overhaul P4a: night sky, glowing moon hero, moon-phase divider (Sprint 2, Week 8, UI/UX overhaul)

First sub-step of phase **P4 "Layout and ornament"** in `OVERHAUL_NOTES.md`. Still the Week 8 workflow,
hence 7.5. Follows P1 (`CHANGES7.5_CssVariables.md`), P2 (`CHANGES7.5_Retheme.md`) and P3
(`CHANGES7.5_Fonts.md`). Everything is **plain CSS and inline styles: no image, no library, no dependency**
(`package.json` untouched). No database change, no text changed. The student's request after P2 was
"a bit more refined blue from the inspirations" and a more premium feel; this step answers both.

P4 is split into small steps (each its own commit):
- **P4a (this file):** sky glow, hero moon, moon-phase divider.
- P4b: header and section edges (gold hairlines, lattice strip), the three info cards as a row, a wider page.
- P4c: entry cards and entry page (gold frames, arch-shaped photo frames, hover lifts).
- P4d: login, signup and the forms.

## 1. What changed

| File | Change |
|---|---|
| `app/globals.css` | New decorative tokens in `:root`: `--sky` (richer blue), `--moon-light/-mid/-edge/-crater`, `--glow-strong`, `--glow-soft`, `--gold-line`. A `body` rule adds the **night-sky glow**: a wide radial gradient from `--sky` at the top centre fading to transparent over 640px, on top of the unchanged navy `--bg`. A `moon-breathe` keyframe and a `.moon-halo` class (the halo scales 1 to 1.1 and fades 0.65 to 1 over 7s, alternating); the `prefers-reduced-motion` rule now stops it too. |
| `components/HeroMoon.js` (new) | The moon: a round CSS circle with a soft cream-to-gold gradient and three faint craters, plus a halo behind it. `aria-hidden`, decorative. It sits above the heading, never behind text. |
| `components/MoonPhases.js` (new) | A divider: seven moon phases (waxing, full, waning) between two thin gold lines. Each phase is a transparent circle with a gold inset shadow whose sideways offset sets how much is lit. `aria-hidden`. |
| `app/page.js` | The home-page top is now a centred hero section: moon, small label, title, description; the phase divider sits under it. The title is 54px (was 60 after P3), the description is capped at 560px wide. The three info cards, the About panel and the entries below are unchanged. |

The sky glow is on `body`, so it appears on **every page** (login, browse, entry, forms), not just home.

## 2. Contrast

Text at the very top of a page now sits on the brightest part of the glow (`#17408A`). Calculated:
`--text` 8.4, `--text-soft` 6.7, `--muted` 5.1, `--accent` (gold) 5.3 (all pass 4.5). `--muted-dim` (3.7),
`--faint` (3.2) and `--danger` (4.3) would not pass **at that exact point**, but they only appear lower
down on the pages (hints, counters, footer, error messages), where the glow has faded toward the navy they
were checked against in P2 (4.4 to 6.8 or better). The header bar stays near-solid navy. If a hint or error
ever sits in the bright part, lighten that colour or shorten `--sky`.

## 3. How it was checked

- A throwaway dev server on port 3100 (the student's 3000 was not running): `/`, `/browse`, `/login`,
  `/signup`, `/contribute` return 200, an unknown URL 404; the moon halo and the two decorative blocks are
  in the HTML. Stopped afterwards, `.next` deleted.
- **Screenshots:** the AI took headless Microsoft Edge screenshots of the home, login and browse pages
  (1280px wide) and looked at them: the glow, the moon with its halo, the phases, the serif headings, the
  red button and the Khmer-free text all render as intended. The halo was a bit faint in the first
  screenshot, so `--glow-strong` went from 0.38 to 0.5, `--glow-soft` from 0.12 to 0.16 and the halo size
  from 76 to 96px.
- Not checked: motion (the breathing halo is a still screenshot), a real phone, other browsers.

## 4. Things seen in the screenshots that P4b to P4d will address

- The header wraps to two rows on a wide screen and the page content is a 720px column, narrow on a
  desktop; the three info cards are stacked with big gaps.
- The test entries are still on the shared database (see `OVERHAUL_NOTES.md`, the postponed cleanup).

## 5. Revert

The new files can be deleted and the hero restored in `app/page.js`; the sky is the one `body` rule in
`globals.css`. P1 to P3 are unaffected.
