# CHANGES11 - Review fixes (Week 12, Lab 12)

Work list: `../Week12/Week12FixList.md` (outside the repo). Part A is the partner's (Lyching's) six findings from his Tuesday test; Part B is the picks from the student's own 3 lenses audit. Commits: `review fix: <what> (AI-assisted)`, one fix per commit, made by the student. No new dependency, no SQL in A1 to A3.

## A1. Clicking anywhere on an entry row on /my-entries does nothing but the title text

**Finding (Lyching):** on a pending entry, only the title text opened the entry.

**Cause:** `MyEntryRow.js` made only the title a link.

**Fix (`components/MyEntryRow.js` only):** the `<li>` is `position: relative`; an empty `<span>` inside the existing title link is stretched over the whole row (`position: absolute`, all four edges 0), so the row is one link, not two. The EDIT link (returned entries) gets `position: relative` and `zIndex: 1` so it stays above the cover and is not nested inside another link. Inline styles only. Side effect: text in the row (hint, reviewer's note) can no longer be selected by dragging, because the cover is on top.

## A2. EDIT and DELETE sat at the bottom of the entry page

**Finding (Lyching):** he had to scroll down to find them.

**Fix:** `app/entries/[id]/page.js`: the `EntryOwnerActions` line (same owner-only check) moved from the end of the page to just under the BackLink. Still politeness only; the owner-only policies are the real refusal.

**Extra file touched (said before editing, AGENTS rule 4):** `components/EntryOwnerActions.js`: its row had a 40px top margin, 24px top padding and a divider line, made for the bottom of the page. At the top that left a stray line, so it is now `marginTop: 20` with no border or padding. The component is used only by the entry page.

## A3. CONTRIBUTED BY on the entry cards

**Finding (Lyching, and the student's chosen audit fix):** the credit showed on the entry page but not on the cards.

**Fix:** `app/page.js` adds `contributor` to the home page's select (browse already selected it); `components/EntryCard.js` takes a `contributor` prop and shows `CONTRIBUTED BY: <name>` under the SOURCE line, only when it is set. `EntryList` and the home page both spread every selected field into `EntryCard`, so no other file changed. The label is English only, like the entry page's; the name shows exactly as typed (Khmer included). A Khmer label is for the later UX/UI polish week, and its wording would come from the student.

## Verification

Student browser test, 2026-11-08, local `npm run dev`:

- **A1 PASSED:** clicking anywhere on a row on /my-entries, whatever its status, opens the entry; EDIT on a returned entry still opens the edit page.
- **A2 PASSED:** EDIT and DELETE sit under "BACK TO BROWSE"; clicking DELETE shows the two-step confirm (not confirmed, nothing deleted); no EDIT or DELETE on entries the user does not own.
- **A3 PASSED:** every card on the home page and on /browse shows CONTRIBUTED BY under SOURCE, except the "waiting politely" entry, which has no contributor; no visible card-height change.
