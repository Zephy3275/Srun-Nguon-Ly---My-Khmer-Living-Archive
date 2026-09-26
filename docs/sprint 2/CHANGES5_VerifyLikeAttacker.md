# CHANGES 5 — Verify like an attacker: the secure access checklist (Sprint 2)

Session log for **Lab 6, Part 4**: running the secure-access checklist against
the local dev build (`npm run dev` on `localhost:3000`), the same build
verified in `CHANGES5_TheCutover.md`. No code changed in this part — this is
verification only.

---

## Why localhost, not the live URL

Part 3's changes (Supabase-backed pages, RLS) have not been committed or
pushed yet, so the live Vercel URL is still running the pre-cutover code. The
student ran the whole checklist against `localhost:3000` instead, which
exercises the real database and the real RLS policies identically — RLS is
enforced by Supabase, not by where the frontend is hosted. Steps 1–3 are
unaffected by this choice. Step 4 could not be completed this way (see below).

## 1. Logged out — browse and search

**Result: pass.** Logged out, browsing and search both worked exactly as
before. This confirms the "anyone can read entries" policy and that Feature 1
(public browse/search) did not regress when RLS was enabled.

## 2. Logged out — write attempt from the browser console

**Result: pass.** Student ran the lab's `fetch(...)` POST directly against the
Supabase REST API (`/rest/v1/entries`) from the browser console, logged out,
using the real project URL and the real publishable key. The response was a
row-level security refusal, not a new row — the student has a screenshot of
the exact error. No row was created (confirmed against Table Editor).

This is the core proof of the sprint: the publishable key is public by design
and was used exactly as an attacker would use it, and the database still said
no. The key was never the lock; the "owners add their own entries" policy
(`auth.uid() = owner`) is.

## 3. Grep the repo for the key and the uuid

**Result: pass**, both by the student's own check and independently re-verified.

- **Publishable key:** zero hits in any committed file. The only occurrence
  anywhere in the working tree is inside `.env.local`, which is gitignored and
  confirmed **not tracked** by `git ls-files`. Also checked **git history**
  across every commit (`git log --all -p`) for the key's pattern: zero hits.
  The key has never been committed, not just currently absent.
- **Owner uuid** (`de54d832-0d89-48de-bfc4-4563bc2c1f9a`): one hit, in
  `docs/sprint 2/CHANGES5_SQLAddEntries.md`, documenting which Lab 5 test user
  owns the seeded entries. The lab explicitly names this pattern as harmless
  ("your uuid in retired seed SQL is harmless, it's not a secret") — a uuid is
  an identifier, not a credential, and this one only maps to a disposable test
  account. This is a pass, not a finding.

## 4. Phone test, mobile data

**Result: skipped.** The student connected a phone to the same Wi-Fi and tried
the dev machine's local network address (`http://192.168.x.x:3000`), but the
phone could not connect while the dev server ran fine on the laptop. Likely
causes (not investigated further): a Windows Firewall rule blocking inbound
connections to the dev server's port, or Wi-Fi client isolation on the router.
The student chose not to troubleshoot this now.

This step also cannot be done properly on "mobile data" until the site is
actually deployed — the lab's own step 4 assumes the ship step (Part 5) has
already happened, which it hasn't yet. The real version of this test — a
phone, on cellular data, with no dev tools and no access to the codebase —
is deferred to after Part 5 ships the cutover to the live URL.

## Overall result

Steps 1–3 pass. Step 4 is deferred, not failed, and re-runnable in minutes
once Part 5 deploys: revisit the live URL from a phone on mobile data.

## Commit status

- Only this file is new in the repo
  (`docs/sprint 2/CHANGES5_VerifyLikeAttacker.md`), not yet committed (student
  commits separately).

## Changelog index (append to `docs/PROJECT_NOTES.md`)

- `docs/sprint 2/CHANGES5_VerifyLikeAttacker.md`   (Lab 6 Part 4 — security checklist, steps 1–3 pass, step 4 deferred to post-deploy)
