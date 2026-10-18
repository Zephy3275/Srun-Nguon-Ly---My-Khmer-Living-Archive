# CHANGES 7 — Redesign pass: header, headings, loader (Sprint 2, Week 8, group C)

Third round of Week 8 fixes. Group A (bugs) is in `CHANGES7_FunctionalFixes.md`, group B (small
polish) in `CHANGES7_UIPolish.md`; the sorted tester list is `Week8/Tester_Feedback_Triage.md`
(outside the repo). This file covers **group C**: Kimyoo's "improve the UI of login/signup,
browse and the upper titles, I barely see them" (#11) and Lyching's "loading animation for
everything" (#9). No database change (no SQL to run).

Context: the student plans a bigger UI/UX overhaul later (the professor wants the interface off
the default design). So this pass puts the shared look in a few central places (header, page
heading, back link, loader, a few CSS classes) so a later redesign can change them once instead
of eleven times.

## 1. Sticky site header on every page (#11)

**Problem:** the navigation lived only on the homepage, in small thin 14px green Courier text
(Kimyoo could barely see it). Browse, login, signup, contribute and the entry pages had no way
around except a small back link.

| File | Change |
|---|---|
| `components/SiteHeader.js` (new) | A bar across the top of every page that **sticks to the top of the window while scrolling** (`position: sticky`, slightly see-through dark with a blur and a bottom border). Left: the mooncake icon + `KHMER LIVING ARCHIVE` (links home). Right: `BROWSE`, the main action `ADD AN ENTRY +` (a filled green button), then the account part. Wraps onto two rows on a phone. |
| `components/AuthHeader.js` | Now the account half of the header. Logged out: `LOG IN` (plain link) and `SIGN UP` (outlined button). Logged in: your email (cut with "…" if long, full address on hover) and `SIGN OUT`. Still a server component reading the session. |
| `app/layout.js` | Renders `<SiteHeader />` above every page. |
| `app/page.js` | The homepage's own nav block, its styles and the `Link`/`AuthHeader` imports are removed. Its small label is now 16px bold like the other pages. |

Decisions worth knowing:
- Only **one** filled button (`ADD AN ENTRY +`), so it reads as the main action; `SIGN UP` is
  outlined (the plan had two filled buttons side by side, which competed).
- The link says `BROWSE` instead of `BROWSE THE COLLECTION ↗` (shorter, fits a phone).
- Because the header reads your session on every page, `/login` and `/signup` (and the 404 page)
  went from static to server-rendered. Nothing visible changes.

## 2. Bigger, shared page headings (#11)

| File | Change |
|---|---|
| `components/PageHeading.js` (new) | The top of a page in one place: back link, small label (16px bold, was 14px thin), title (40px, was 32px), and an optional sentence (18px). |
| `components/BackLink.js` (new) | The "← BACK TO …" link in one place (15px bold, underline on hover). |
| `app/browse`, `app/login`, `app/signup`, `app/contribute`, `app/entries/[id]/edit` pages | Use `PageHeading` instead of each carrying its own copy of the same styles (that was seven copies). Contribute's logged-in/logged-out message now goes through the same component. |
| `app/entries/[id]/page.js` | Its three back links use `BackLink`. Its own big title is unchanged. |
| All of the above | Page padding changed from `80px 24px` to `48px 24px 80px`, because the sticky header now supplies the space above. |

Consistency fix agreed with the student: login, signup and contribute now say
`← BACK TO HOMEPAGE` (only Browse had been changed in group B).

## 3. Login/signup and the main buttons (#11)

| File | Change |
|---|---|
| `components/LoginForm.js`, `components/SignupForm.js` | Bigger inputs (padding 14x16, 17px text), brighter bold labels, and the submit button is now the filled green main button (full width, 16px bold). |
| `components/ContributeForm.js` | Its submit button is the same filled green main button. |

Not done, on purpose: the plan said the login form would sit in a panel. A panel would need
inputs darker than the panel, which would clash with the autofill fix from group A (it paints
`#1C222C` back over an autofilled input), and the whole look is going to change later anyway.

## 4. Loading animation for every wait (#9)

The student's clarification: a loading animation for **every wait**, not a page transition.
The loader is mooncake artwork turning slowly: the small favicon icon in buttons, and (added after the first browser test) a richer picture for the big page-load loader.

| File | Change |
|---|---|
| `components/Loader.js` (new) | The artwork plus an optional line of text (beside it, or under it with `vertical`). `role="status"` so screen readers announce it. Two looks chosen by size: under 56px (buttons) the plain mooncake icon turns; from 56px up (the page-load loader) the rich picture is used in two layers, the orbiting rings turning slowly while the mooncake in the middle stands still on top. Detail vanishes at 16-20px, which is why buttons keep the simple icon. |
| `public/loader-rings.png`, `public/loader-center.png` (new, binary, 61 KB + 13 KB) | The two layers of the rich loader, cut from an image the student generated with Gemini (AI-generated, so the commit is marked AI-assisted). The original (2048x2048, `Week8/Mooncake_Animation.jfif`) is a navy square, so it was cropped to its circle with transparent corners; the still centre is cut slightly larger than the gap it covers so no seam shows. Made with a one-off script outside the repo. |
| `app/globals.css` | `@keyframes mooncake-spin` + `.loader-icon` (1.8 s) and `.loader-rings` (12 s, slow), with `prefers-reduced-motion` turning both off for visitors whose system asks for less movement. Also the shared classes `.nav-link`, `.nav-btn`, `.btn-filled`, `.btn-outline`, `.back-link` (hover states, which inline styles cannot do) and a green keyboard focus ring on every link and button. |
| `app/loading.js` | Page loads: the big loader (128 px) with `LOADING THE ARCHIVE…` (was plain text). The site header stays visible above it. |
| `LoginForm`, `SignupForm` | The button shows the loader with `SIGNING IN…` / `CREATING ACCOUNT…`. |
| `components/LogoutButton.js` | **Sign out had no loading state at all.** Now it disables itself and shows `SIGNING OUT…`; if sign-out fails it logs the error and unlocks instead of staying stuck. |
| `components/DeleteEntryButton.js` | `YES, DELETE` shows the loader with `DELETING…`. |
| `components/ContributeForm.js` + `utils/submitEntry.js` + `utils/updateEntry.js` | **Progress text while saving.** The form passes an optional `onStage` function; the save code calls it at each step, and the button shows `CHECKING YOUR ENTRY…`, then `UPLOADING PHOTO…`, then `SAVING ENTRY…` (or `SAVING CHANGES…` when editing; no upload step if the photo was kept). This is the "interactive" part: it says what is happening, not only that something is. |

`onStage` is optional and only reports; it changes nothing about what is saved. The security
parts of those two files (owner from the session, named columns, the zero-row check, photo
cleanup) are untouched.

## 5. Files outside the ask, flagged

`utils/submitEntry.js` and `utils/updateEntry.js` (the save-progress text) and
`components/LogoutButton.js` / `DeleteEntryButton.js` (loader) are beyond a pure "redesign" and
were named in the approved plan. `app/loading.js` and `app/globals.css` were rewritten/extended.

## 6. Verification

- `next build` passes (the dev server was stopped first). `/login` and `/signup` now show as
  server-rendered (`ƒ`), as expected.
- A throwaway dev server on another port (stopped and cleaned up afterwards) served every page
  with 200 and no warnings. Checked in the real HTML: the header appears exactly once on the
  homepage, browse, login, signup, contribute, an entry page and the edit page; `BROWSE`,
  `ADD AN ENTRY +`, `LOG IN` and `SIGN UP` are present; the old homepage nav is gone; the
  sticky style is on the header; the back links read `BACK TO HOMEPAGE` (and `BACK TO BROWSE`
  on an entry); headings are 16px label / 40px title; the login button carries `btn-filled`;
  the stylesheet contains the new classes and the keyframes.
- The rich loader was added after that first check, so it got its own: `next build` passed again
  (dev server stopped first); on a throwaway server the browse page's loading shell contained
  the `loader-rings` and `loader-center` images (class `loader-rings` present), both images and
  the icon were served as 200 `image/png`, the stylesheet had the 12 s `.loader-rings` rule,
  and the log had no warnings. A preview of the layers (rings turned 37 degrees, mooncake still)
  showed no visible seam.

**Student's browser test of the first version of group C (all OK):**
- The header stays in place when scrolling and looks cleaner; the mooncake image next to the
  name was noticed and liked.
- Sign out shows the spinning loader; signing back in shows it too.
- Autofill still stays dark; a wrong password shows the loader.
- Adding an entry: the button text changes while saving.
- Editing, both with a new photo and with just Save changes: each shows its own matching text.
- Page load shows the spinning mooncake. Deleting shows the loader.

That test was done with the plain mooncake icon as the page-load loader. Afterwards the student
checked the **new rich loader** (rings turning slowly around a still mooncake) on page loads and
approved it: "looks great". Group C is closed.

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES7_Redesign.md`   (Week 8 group C: sticky header, shared headings, login/signup look, mooncake loader and save progress text)
