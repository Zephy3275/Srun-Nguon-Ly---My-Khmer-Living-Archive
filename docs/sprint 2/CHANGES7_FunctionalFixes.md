# CHANGES 7 — Functional fixes from the two testers (Sprint 2, Week 8 "The Proof")

Week 8 has no lab guide. Two outside testers (Lyching and Kimyoo) reviewed the live archive;
their 14 points were sorted into groups in `Week8/Tester_Feedback_Triage.md` (outside the
repo). This file covers **group A, bugs and behavior**. Each fix is its own section. No
database change in this group (no SQL to run).

Tester points covered: #13 (Kimyoo, autofill white box), #14 (Kimyoo, form still editable
while saving/logging in), #7 (Lyching, hard stop at the character limit). Plus one small
extra the student approved: show sweetness/saltiness on the entry page (section 4).

Dropped on purpose: #3 (Lyching, make sweetness and saltiness required). The student decided
these ratings are subjective and a required rating would stop people who don't know how to
rate from adding an entry, so both stay optional in the form.

## 1. Autofill white box (#13) + the global CSS file

**Problem (Kimyoo):** picking a saved email or password from the browser's auto-fill list
made the input turn pale blue/white (screenshot on the login form), while the text stayed
light, so it was hard to read.

**Cause:** the browser paints its own background on an auto-filled input, and inline style
objects cannot reach that state (it is a pseudo-class: `:-webkit-autofill`). A plain CSS file
is needed; AGENTS.md allows "inline style objects or a plain CSS file".

| File | Change |
|---|---|
| `app/globals.css` (new) | `:root { color-scheme: dark; }` so the browser draws its own pieces dark. Two separate blocks (`input:-webkit-autofill…` and `input:autofill`) paint the input's normal `#1C222C` back over the autofill colour with light text and a light caret. Separate blocks on purpose: a browser that doesn't know one selector would drop the whole list. |
| `app/layout.js` | One line: `import "./globals.css";`. Beyond the single fix, so it was flagged first. |
| `components/LoginForm.js`, `components/SignupForm.js` | `fontFamily: "inherit"` on the input style. These two inputs did not have it, so the typed text used the browser's default font (Arial-looking in the screenshot) instead of the site's. |

**Side effect (expected):** `color-scheme: dark` is site-wide, so browser-drawn controls that
used to be light are now dark: the photo picker's "Choose file" button, the opened list of
the sweetness/saltiness dropdowns, scrollbars. The student checked the contribute form: no
white left.

## 2. Lock the form while it works (#14)

**Problem (Kimyoo):** after pressing Sign in / Create account / Save, the fields stayed
editable (he could keep typing in the password field while being logged in). On the add/edit
form it was also a real bug: the values are copied at the moment of saving, so anything typed
afterwards was silently ignored.

**Fix:** wrap the fields in `<fieldset disabled={loading}>`. A disabled fieldset disables
every control inside it at once, so nothing can be typed or picked while `loading` is true.

| File | Change |
|---|---|
| `components/LoginForm.js`, `components/SignupForm.js` | Labels, inputs and the button are inside a `fieldset` (new `fields` style: no border/margin/padding, same stacked flex layout as the form so nothing moves). The button no longer needs its own `disabled` (the fieldset covers it). `handleSubmit` now starts with `if (loading) return;` so a second submit is ignored. |
| `components/ContributeForm.js` | `EntryFormFields` is wrapped in a `fieldset disabled={loading}` (same `fields` style, gap 20). Covers both add and edit, since the edit page uses the same component. The submit button keeps its own `disabled` and sits outside the fieldset. |
| `app/globals.css` | Inline styles give a disabled control no different look, so: `fieldset:disabled input/textarea/select { opacity: 0.6 }` and `button:disabled { opacity: 0.6; cursor: not-allowed }` make the lock visible. The two selectors are split so a button inside a disabled fieldset is dimmed once, not twice. |

**Behavior to know:** after a successful login/signup/save the form stays locked until the
next page loads (that is intended). After an error it unlocks and keeps what was typed.
`DeleteEntryButton` and `LogoutButton` already disabled their buttons; not changed.

## 3. Hard stop at the character limit (#7)

**Problem (Lyching):** the form let you type past the limit and only complained after
Submit. It should stop at the limit.

**Fix:**

| File | Change |
|---|---|
| `utils/entryFields.js` | Every text field now has `maxLength` (title 120, Khmer title 500, Khmer description 6,000, source 300, filling/shape/color/texture 120, description 10,000). Source, filling, shape, color and texture also got a live counter, because typing that just stops with no explanation is confusing. Header comment updated. |
| `components/FormField.js` | Passes `maxLength` to the input/textarea (undefined for the dropdowns and file picker, so nothing is drawn there). The change handler clips word-limited fields with `clipWords`. |
| `utils/validateEntry.js` | New exported `clipWords(text, max)`: keeps the first `max` words exactly as typed (spacing and line breaks between kept words untouched) and returns text already within the limit unchanged. Counts words the same way as `words()`. |
| `components/FieldCounter.js` | The counter turns red when the limit is **reached** (`>=`, was `>`), because the form can no longer go past it; the colour is what tells the user why typing stopped. |

Why the description is special: its main limit is **1,000 words**, and `maxLength` can only
count characters. So the 1,000-word limit is enforced by `clipWords` in the change handler
(typing or pasting past word 1,000 is cut off), and `maxLength={10000}` backs up the
database's 10,000-character cap (1,000 very long words could otherwise pass the word limit
and still break it).

**Kept as the backstop:** the validation messages in `validateEntry.js` and the nine database
length constraints are unchanged. The form is politeness; the constraints still decide.

**Notes:**
- `maxLength` counts raw characters (UTF-16 units) while validation counts the trimmed text
  in code points. For Khmer these match; for emoji `maxLength` stops slightly early, which
  is the safe direction. Leading/trailing spaces count toward `maxLength` but not toward the
  counter, so a field can stop at 120 while the counter shows 119.
- No existing entry is affected: `maxLength` never shortens text that is already there.

## 4. Show sweetness and saltiness on the entry page (small extra)

Not a tester point. With the "required" idea dropped, the student asked to show the levels
where they exist.

| File | Change |
|---|---|
| `app/entries/[id]/page.js` | The `select` now also reads `sweetness, saltiness`. A line like `SWEETNESS: 3/5 · SALTINESS: 2/5` appears under the source line, in the same style. Only values that exist are shown; if neither exists the line is skipped. |

No database change: both columns already existed. The 9 seeded entries have no values, so
they look exactly as before. (Cards were not changed.)

## 5. Verification

- `next build` passes after each step.
- `clipWords` tested with a throwaway script outside the repo (9 checks, all pass): text at
  the limit unchanged, trailing space kept, 4th word cut at limit 3, paste of many words
  cut, inner spacing and line breaks kept, empty string, Khmer words separated by spaces,
  1,200 words clipped to 1,000, text under the limit untouched.
- Student's browser test on localhost (after the clean restart described in section 6):
  - Autofill: choosing a saved login no longer turns the box white. OK.
  - Lock: while logging in, the fields lock. OK. Logout works normally. OK.
  - Hard stop: typed `a` repeatedly in the **title** field; it stopped at the limit and the
    counter turned red. OK.
  - Edit form: opened an entry the student owns, changed nothing, pressed Save: everything
    locked while saving. OK. The add form uses the same component and the same `fieldset`,
    so it was not tested separately.
  - Entry page: the 9 seeded entries show no sweetness/saltiness line, as expected (no values).
- Not tested in the browser: pasting a long text into the description (covered only by the
  `clipWords` script test), and the levels line with a real value. Both are for the final pass
  or the next real entry.

## 6. Incident: "the AI broke the site" (it was the build, not the code)

Worth keeping for the reflection: a hiccup in the middle of group A that looked like a code
bug and was not.

**Timeline**
1. Step 1 (autofill + `globals.css`) was checked with a production build and then tested by
   the student in the browser: it worked.
2. The rest of group A (lock, limits, levels display) was edited and checked with another
   `npx next build`, run **while the student's `npm run dev` server was still running**.
3. The student reloaded and reported three unrelated-looking failures at once: logging in
   with correct credentials did nothing, the white autofill box was back, and clicking Log
   out froze until a manual reload. The reasonable reading from where the student sat: "the
   last change broke the site."

**Diagnosis (checked, not guessed)**
- Three different features failing together, none of them touched by the same line of code,
  pointed at the environment, not at one bug. The common factor was "the page's CSS and
  JavaScript are not loading properly".
- A look at what was running showed a Next.js dev server still listening on port 3000, and the
  `.next` folder contained production-build files (`BUILD_ID`, `export-marker.json`) next to
  the dev server's own. `next dev` and `next build` both write to `.next`, so the build had
  overwritten the files the dev server was using. The server kept answering, but with
  mismatched CSS and JS chunks.

**Fix**
1. Stopped the dev server and deleted `.next` (build output, gitignored, safe to delete).
2. Started a clean dev server on another port and checked it over HTTP: `/login` returned
   200, the stylesheet contained the autofill, `color-scheme` and `fieldset:disabled` rules,
   every JS chunk returned 200, and the login HTML contained the new `fieldset`. This
   showed the code was sound without needing the student's credentials.
3. Shut that server down and cleared `.next` again, so nothing was left running.
4. The student restarted `npm run dev` and hard-refreshed (Ctrl+Shift+R). Everything worked.

No repo file was changed to fix it, which is the proof: the source was never the problem.

**Lessons**
- **When several unrelated things break at once right after a change, suspect the
  environment (stale cache, two processes, wrong build) before the code.** Looking at what is
  actually running took a minute; rewriting the `fieldset` change would have been wasted and
  could have introduced real bugs.
- **A verification step can cause damage.** The AI's own safety check (`next build`) was the
  thing that broke the student's session. Rule from now on: before any build, check whether a
  dev server is listening on port 3000; if it is, don't build, and verify by requesting pages
  from the running dev server instead (or ask the student to stop it first).
- **The same build after step 1 did no visible harm, so the risk was invisible.** "It worked
  last time" is not the same as "it is safe".
- **Cleanup that is cheap and reversible comes first.** Delete the cache, restart, re-test,
  before touching any code. This is the same spirit as the professor's "stop, revert to the last
  good commit, re-prompt smaller", except here nothing needed reverting.
- **The student's report was exactly what was needed:** the three concrete symptoms (login,
  autofill, logout) are what made the diagnosis quick. Saying what you see beats saying "it's
  broken".

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES7_FunctionalFixes.md`   (Week 8 group A: autofill fix + global CSS, lock form while saving, hard-stop limits, levels on entry page, and the build-vs-dev-server incident)
