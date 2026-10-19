# UI/UX OVERHAUL - Living notes and handoff

> **How to use this file.** It is the living note for the UI/UX overhaul only. `docs/PROJECT_NOTES.md`
> is deliberately **not** updated for the overhaul (the student's decision); it is accurate up to the
> end of the Week 8 tester fixes. In a new chat read, in this order: `AGENTS.md`, `docs/PROJECT_NOTES.md`,
> then this file. **Update this file in place as the overhaul progresses.**
>
> The longer reasoning, palette tables and mockup prompts live outside the repo, on disk, in
> `../Week8/UX_UI_Overhaul/` (relative to the repo folder): `01_Image_Generation_Options.md` and
> `02_Overhaul_Plan_and_Mockup_Briefs.md`. This file is the self-contained summary. The three mockup prompts are
> copied into the repo as `docs/UI-UX overhaul/MOCKUP_BRIEFS.md` so any chat can read them. Do not put keys,
> tokens or passwords in this file or anywhere in the repo (the repository is public).

Status as of 2026-10-19 (later): **P1 (tokens) and P2 (retheme) are DONE and student-checked** (changelogs:
`CHANGES7.5_CssVariables.md`, `CHANGES7.5_Retheme.md` in this folder). P3 (fonts, `CHANGES7.5_Fonts.md`) is done and student-checked; P4a (sky, moon hero, phases, `CHANGES7.5_HeroSky.md`) is built and awaits the student's check. Next: P4b (header, lattice, info-card row, wider page). The student chose to do the overhaul BEFORE shipping (the professor wants the new design in the shipped
version) and left the design to the AI ("you cook it"): palette A + cinnabar button, moodboard of 10 images reviewed
(night-blue/gold-moon family and red/gold-pattern family). **Next: P2 (retheme: change only the values in the `:root`
block of `app/globals.css`).** `docs/PROJECT_NOTES.md` carries a short pointer to this file.

---

## 1. Where the project stands

- Sprint 2, Week 8 ("The Proof"). All items from the two outside testers are **done, tested by the
  student and committed** on branch `experiment`: group A (bugs: lock forms, autofill, hard-stop
  limits), group B (small UI polish), group C (sticky `SiteHeader`, shared `PageHeading`/`BackLink`,
  mooncake `Loader`), and the professor-required **contributor field** (SQL already run on the
  shared database). Changelogs: `docs/sprint 2/CHANGES7_*.md`. Dropped on purpose: making
  sweetness/saltiness required. Skipped on purpose: the English/Khmer language toggle.
- **Postponed (the student chose the overhaul first):**
  1. Merge `experiment` into `main`, push, let Vercel deploy (the student does it).
  2. A final live pass on the Vercel URL with the regression list in `PROJECT_NOTES.md`.
  3. Test-data cleanup: 8 test entries are still on the live site (the student's and friends' tests,
     including a `<script>alert(1)</script>` title). Delete them **by listing their ids first and
     deleting by those exact ids**, not with a broad rule (a rule like "photo_url not like
     '/images/%'" would also match any real entry added later with an uploaded photo). Deleting a
     row does not delete its photo in Storage. Leftover test accounts can go too.
     **Step 1 (read-only, run in a fresh SQL Editor tab): list them.** It should show 8 rows, none of the
     9 real entries (those have `/images/...` photo paths):
     ```sql
     select id, title, contributor, photo_url
     from entries
     where photo_url is null or photo_url not like '/images/%'
     order by created_at;
     ```
     **Step 2:** the student pastes the result to the AI, which writes a `delete from entries where id in (...)`
     with exactly those ids. The student runs it by hand. Never delete with a broad rule.
     **Tagging the submitted state** (after merging to `main`): `git tag week8-submission` and
     `git push origin week8-submission`.
  4. "Ask the author" prep: the student said to ignore it.
- Branch: `experiment`. `main` is what Vercel deploys.

## 2. The overhaul brief

- **The professor said** (as relayed by the student, no exact wording): get off the **default
  design**, meaning the current dark gray + mint-green look. The student wants the **entire
  website** redesigned, with a theme that fits the archive: **Chinese-style mooncake**.
- **The professor's instruction is simply: get off the default design.** The student's reading is
  final and needs no exact wording or rubric text (student's decision, 2026-10-19): **do not ask for it
  again.** The student wants the whole site to look like THEIR archive: Chinese-style mooncake.
- **Deadline (confirmed by the student): Monday 2026-10-19, 11:59 PM.** Plan, in the student's words: submit
  the **bare minimum first** to meet the deadline, then **keep working on the overhaul** until the UX/UI is done
  or satisfactory. So the overhaul does not have to be finished by the deadline; what must be safe by then is
  the finished Week 8 work.
- **Bare minimum before 11:59 PM (recommended; the student does the git and SQL steps):**
  1. Commit the docs, then merge `experiment` -> `main` and push; Vercel deploys. The live site has none of
     the Week 8 work yet (6 commits are only on `experiment`).
  2. Delete the 8 test entries (list their ids first, delete by those ids) so no placeholder entries show.
  3. A quick live pass on the Vercel URL (regression list in `PROJECT_NOTES.md`).
  4. Tag the submitted state (for example `git tag week8-submission` on `main`) so the project can always be
     returned to exactly what was submitted.
- **After submitting:** continue the overhaul on `experiment` with the phases below (P0 moodboard/mockups, P1
  tokens, P2 palette, and on), merging again when it is satisfactory. If a small piece (P1 + P2) is finished and
  tested before 11:59 PM, it may go in; otherwise do not risk the submission.
- The student already likes the artwork made with Gemini for the favicon and the loader: deep navy,
  warm gold, jade teal.

## 3. Facts measured in the repo (2026-10-19)

- 119 hard-coded colour uses, only **11 distinct colours**, in **24 files** (`#2E3644` 23x,
  `#2EE6A8` 22x, `#97A1B3` 17x, `#1C222C` 16x, `#E8EDF2` 13x, `#E86A5A` 10x, `#C7CFDB` 6x,
  `#7C8698` 6x, `#14181F` 3x, `#5A6373` 2x, `#F0998D` 1x) plus two `rgba()` uses.
- 25 uses of one font: `'Courier New', monospace` (the "typewriter" look is part of the default
  design). Body font is the system sans-serif set in `app/layout.js`.
- Shared pieces already in place (group C): `components/SiteHeader.js` (sticky bar), `AuthHeader.js`,
  `PageHeading.js`, `BackLink.js`, `Loader.js` (two looks: the rich two-layer picture for big sizes,
  the plain icon for buttons), and the classes in `app/globals.css` (`.nav-link`, `.nav-btn`,
  `.btn-filled`, `.btn-outline`, `.back-link`, `.loader-icon`, `.loader-rings`, the autofill and
  disabled rules, a focus ring). Images: `app/icon.png` (favicon), `public/loader-rings.png`,
  `public/loader-center.png`.
- Styling convention (AGENTS.md): inline style objects or a plain CSS file. No CSS frameworks, no
  component libraries.

## 4. Decisions (all OPEN until the student decides)

| # | Decision | Options | Recommendation |
|---|---|---|---|
| 1 | Palette | **A Midnight & Gold** (dark navy `#0A1630`, cards `#112347`, text cream `#F5ECD7`, gold `#E8B84B`, cinnabar button `#C8372D`); **B Cream & Cinnabar** (light: page `#FBF3E2`, text `#2A1A12`, red `#B3261E`, deep gold `#8A5A00`); **C Lacquer** (page `#190E0F`, cards `#2A1819`, gold `#E3B359`, cinnabar `#C8372D`). All pass WCAG contrast (calculated). | **A**: matches the favicon and loader, clearly off the green, lowest risk. Decide after seeing mockups. |
| 2 | Main button in A | cinnabar red + cream text (4.8:1) or gold + navy text (9.7:1) | pick when mockups are seen |
| 3 | Typography | system fonts only, or a serif for English headings + a Khmer font via `next/font/google` (part of Next.js, not a new dependency) | the serif + Khmer font; **check Khmer on real pages** |
| 4 | Ornament level | minimal (palette, type, few moon motifs) or rich (patterns, hero illustration, moon-gate photo frames) | start minimal, add ornament after the new colours are seen |
| 5 | Scope and order | whole site (the student's wish) | phases below; after phase 2 the site already looks new |

Chinese-style vocabulary to use (shapes only, never new words): full-moon circle, a row of moon
phases as a divider, circular "moon gate" photo frames, faint window-lattice or cloud-scroll
patterns, gold hairline frames, a blank red seal square, the carved mooncake-mould pattern. The
student's Khmer and Chinese text is theirs alone (AGENTS rule 6); never add or alter heritage text.

## 5. Proposed phases (one commit each; student commits; plan before code)

| Phase | What | Visible change | Risk |
|---|---|---|---|
| P0 Design brief | a small **moodboard** (5-8 reference screenshots the student saves, e.g. in `../Week8/UX_UI_Overhaul/inspiration/`, with notes on what they like or dislike: colours, shapes, spacing, mood; searches such as "Chinese mid-autumn festival website design", "moon gate web design", "Chinese lattice pattern UI", "red and gold luxury website", "tea house website design"; ideas only, never copy their images into the repo) -> the AI extracts palette, patterns and type -> generate 2-3 homepage mockups -> pick one | none | low |
| P1 Tokens | move the 11 colours and the font into CSS variables in `app/globals.css`; replace hex values in the 24 files with `var(--...)`; **no visual change on purpose** | none | low (mechanical) |
| P2 Retheme | change the token values to the chosen palette; fix what breaks (error colour, borders, shadows) | new colours | low-medium |
| P3 Typography | new fonts incl. a Khmer font; check Khmer on every page | yes | medium |
| P4 Layout and ornament | header, homepage hero, entry cards, browse, entry page, forms, login/signup with the motifs; generated images and patterns | big | medium-high |
| P5 Motion and polish | hover/focus states, loader colours, reduced-motion care | yes | low |
| P6 Responsive and contrast pass | phone widths; recompute contrast; Khmer on every page | no | low |
| P7 Docs and regression | changelog, notes, must-not-regress checklist, then the postponed merge and live pass | no | low |

P4 pages: homepage (identity block, "About the mooncake" in `ContextAbout.js`, card grid), browse
and search, entry page, add/edit form with photo preview, login, signup, loading page, header, and
the default Next.js 404 page (not styled yet).

## 6. Rules for the overhaul

- All AGENTS.md hard rules stand: no new dependencies (only next, react, react-dom, the two
  Supabase packages; `next/font` is part of Next), do not touch `package.json`,
  `package-lock.json`, `next.config.mjs`, `.gitignore` unless the task names them, **no secrets in
  any file**, keep diffs scoped (say which file and why before editing beyond the ask), Khmer text
  first-class and never altered.
- **One agent edits the repo** (Claude Code). Antigravity/Gemini only generates images into
  `../Week8/Gemini_images_from_antigravity/`. Never let two agents edit the same files.
- **Khmer and English text stays live text on the page, never inside a generated image** (image
  models garble Khmer script).
- Image weight: crop and compress before anything enters the repo (targets: hero <= 250 KB, textures
  <= 100 KB, icons a few KB). The favicon went from 1.6 MB to 4 KB. A one-off script using the
  `sharp` already present in `node_modules` worked well; it is not a project dependency.
- Nothing in the 9 real entries changes, only how they look. Contrast stays at WCAG AA
  (recompute after P2 and at P6).
- Working agreement (same as Labs 6-7 and Week 8): propose a short plan, wait for approval, small
  scoped steps, show diffs. **The student commits and pushes**, in their style
  (`Sprint 2, week8: <what> (AI-assisted)`). SQL (if any ever) is run by the student by hand.
- Changelog files: put them in this folder. **Ask the student which prefix to use** (suggestion:
  `CHANGES8_<Name>.md`; Week 8 so far used `CHANGES7_*` in `docs/sprint 2/`).

## 7. Image generation (what was verified)

- **Works today, free of setup:** Antigravity's Gemini opens a built-in image sub-agent
  (`image-generator`) and saves the file straight into the workspace. Confirmed by a real test: a
  773 KB `mooncake.jpg` in `Week8/Gemini_images_from_antigravity/`. Quota is unknown (Google does
  not publish it).
- **Google AI Studio keys and images: tested, result HTTP 429.** The error says the free-tier quota for
  `gemini-3.1-flash-image` is `limit: 0` (requests and input tokens). Google's pricing page agrees: no free
  image output on any Gemini image model, though the key's model list shows them. So the key route is
  paid-only and was **dropped**. (An earlier attempt that returned 400 had only sent the placeholder text
  instead of the key.)
- FLUX through MCP (`claude mcp add --transport http FLUX https://mcp.bfl.ai`) is real and official but
  paid (OAuth login, credits). `ai-cli` needs a Vercel AI Gateway key and a global npm install. Both
  are optional extras. Details in `01_Image_Generation_Options.md`.
- `../Week8/Gemini_models_from_API_keys.md` is the student's saved model list. **It contains an API
  key. It must never be copied into the repo.**

## 7b. UI libraries and tools (decided 2026-10-19)

The student looked at Magic UI, React Bits and Motion. **None of them is used.**
- **No MCP is needed for any of them.** They install by copy-paste or a command-line tool; Magic UI has an
  optional MCP add-on for AI editors.
- **Magic UI:** built on shadcn/ui; needs Tailwind CSS plus the shadcn setup, which installs packages. Breaks
  AGENTS.md ("no CSS frameworks, no component libraries", and rule 1, no new dependencies).
- **Motion** (successor of Framer Motion): `npm install motion` is a new dependency. Breaks rule 1.
- **React Bits:** components are copied into the repo as source files; a plain-CSS variant (`JS-CSS`) exists
  with no Tailwind; some components may need extra packages (GSAP, Three.js), which was NOT checked per
  component. Whether copying a component counts as using a "component library" is a rule question only the
  professor can settle; the student chose not to ask and not to use it.
- The Sprint 2 amendment in AGENTS.md shows the only legitimate way to add a package: the instructor names
  the exact package. The AI must not amend AGENTS.md.
- **We do not need them.** Fades, hover effects, glowing borders, marquees and turning rings are plain CSS
  (`@keyframes`, `transition`), as the loader already proves. If the student likes an effect from one of
  those sites, rebuild its LOOK in plain CSS without installing anything. Restraint also suits a heritage
  archive, and phones load plain CSS faster.
- **CLI vs MCP vs skill, in one line each:** a CLI is a command you type; an MCP is a plug that gives an AI
  tool a new ability (generate images, drive a browser); a skill is a pack of instructions. None is required
  for this overhaul. The one optional setup worth considering later is a **browser tool** so the AI can open
  the running site and take screenshots itself (Claude in Chrome exists as an extension; it was NOT connected
  in this session and its install was not checked). The student's own screenshots already work well.

## 8. Practical lessons from Week 8 (keep following them)

- **Never run `next build` while the student's `npm run dev` is running**: both write `.next`, and a
  build once broke their session (CSS and JS stopped loading, login "stopped working"). Check
  port 3000 first (`Get-NetTCPConnection -State Listen -LocalPort 3000`). With a dev server up,
  verify by requesting pages from it instead. After a build, delete `.next`.
- To check rendered HTML without a browser: start a throwaway `next dev -p 3100`, `curl` the pages,
  stop it, delete `.next`.
- When several unrelated things break at once right after a change, suspect the environment
  (stale cache, two processes) before the code.
- The student's browser tests are the real visual check; say clearly what could not be checked
  from outside (looks, sticky behaviour, Khmer rendering, narrow windows).

## 9. Opening message to paste into the new chat

**Open the new chat with the workspace set to the `ICT340 Projects` folder (the PARENT of the repo folder)**, the way
the Week 8 chat was, so the `Week8` files (outside the repo) can be read. If the chat is opened in the repo folder
only, this file and `MOCKUP_BRIEFS.md` still carry everything needed.

```
Current: Sprint 2, Week 8. All tester fixes are done, tested and committed (groups A, B, C and the
contributor field). I am now starting the UI/UX OVERHAUL: the professor said to get off the default
design (the dark gray + mint-green look); I want the WHOLE site redesigned with a Chinese-style
mooncake theme. Planning only so far: no overhaul code has been written.

STEP 1 - Orient yourself (do not skip):
  - Read AGENTS.md (hard rules).
  - Read docs/PROJECT_NOTES.md (state up to the end of the tester fixes).
  - Read docs/UI-UX overhaul/OVERHAUL_NOTES.md (this overhaul's living note: facts, decisions, phases).
  - Read docs/UI-UX overhaul/MOCKUP_BRIEFS.md (the three mockup prompts).
  - Skim ../Week8/UX_UI_Overhaul/ (outside the repo): 01_Image_Generation_Options.md and
    02_Overhaul_Plan_and_Mockup_Briefs.md (palette tables, contrast numbers, mockup prompts).
  - Do NOT open ../Week8/Gemini_models_from_API_keys.md (it contains an API key).

Working agreement: plan first, small scoped steps, I review and commit myself (message style
"Sprint 2, week8: <what> (AI-assisted)"), say when you touch a file beyond the ask, never build
while my dev server runs, one agent edits the repo (Antigravity only makes images), Khmer text is
never altered or put inside generated images, no new dependencies, no secrets in files.

Settled: no UI libraries (Magic UI, React Bits, Motion: they break AGENTS.md; do every effect in plain
CSS); a Google AI Studio key has no free image quota, so images come from Antigravity's built-in
sub-agent; do NOT ask me for the professor's exact wording (he said: get off the default design, my
reading is final). Open decisions I will bring: palette (A Midnight & Gold recommended / B / C),
typography, how rich the ornament is. DEADLINE: Mon 2026-10-19, 11:59 PM. My plan: submit the bare minimum first
(commit docs, merge experiment -> main + deploy, clean the 8 test entries, quick live pass, tag the submitted
state), THEN keep working on the overhaul on experiment until it is satisfactory and merge again later.
```

## 10. Progress log

| Date | What |
|---|---|
| 2026-10-20 (P4a) | P3 was checked by the student ("fonts amazingly clean, Khmer fine"). **P4a built (pending the student's visual check):** gradient night sky on every page, `HeroMoon` (CSS moon + breathing halo), `MoonPhases` divider, centred hero on the home page. The AI now takes **headless Edge screenshots** of a throwaway server (`msedge --headless --screenshot`) to see pages itself. Changelog `CHANGES7.5_HeroSky.md`. P4b to P4d planned (header/lattice/row of cards; cards/arch frames; forms). |
| 2026-10-20 (P3) | **P3 done (pending the student's visual check):** Cormorant Garamond (headings), Jost (body/labels), Noto Serif/Sans Khmer via `next/font/google` (no new dependency). Courier New is gone (26 uses became `var(--font-label)`); headings use `var(--font-heading)` with larger sizes. Checked on a throwaway server (pages 200, 12 font files served). Changelog `CHANGES7.5_Fonts.md`. Next: P4. |
| 2026-10-19 (P2) | **P2 done:** the 14 variable values in `app/globals.css` now hold Midnight & Gold (navy `#0A1630`, cards `#112347`, cream text, gold accent `#E8B84B`, cinnabar button `#B8301F`; contrast calculated; the button red was darkened from `#C8372D` because 4.42 < 4.5). Student: "looks better, but still plain; I would like a more refined blue" -> premium feel comes from P3-P5; the richer blue = a gradient sky in P4. Changelog `CHANGES7.5_Retheme.md`. |
| 2026-10-19 (P1) | Moodboard (10 images in `../Week8/UX_UI_Overhaul/inspiration/`) reviewed; the student said to skip the mockups and let the AI design. **P1 done:** 120 colour uses in 24 files became CSS variables defined in `app/globals.css` (same values, no visual change); new `--button`, `--on-button`, `--header-bg`. Checked on a throwaway server (port 3100) and by the student's eyes. Rule from now on: no raw hex in components. Changelog `CHANGES7.5_CssVariables.md`. |
| 2026-10-19 (deadline confirmed) | The student confirmed the deadline: Mon 2026-10-19, 11:59 PM; plan: submit the bare minimum, then keep working on the overhaul. Notes updated. |
| 2026-10-19 03:18 | The student gave the deadline: "tomorrow". Recorded the minimum-overhaul scope and a recommended order (deploy the finished Week 8 work first). Created `../Week8/UX_UI_Overhaul/inspiration/` for the moodboard. |
| 2026-10-19 (later) | Settled: no UI libraries (Magic UI / React Bits / Motion break AGENTS.md); AI Studio key image test returned 429 (no free image quota), route dropped; added the moodboard step to P0; the professor's wording is no longer a question. PROJECT_NOTES.md got a pointer. Still no code. |
| 2026-10-19 | Planning only. Image-generation options verified and written up; Antigravity image sub-agent confirmed to work; measured the colour/font spread; drafted palettes A/B/C and phases P0-P7 and mockup prompts; wrote this note. No code changed. |
