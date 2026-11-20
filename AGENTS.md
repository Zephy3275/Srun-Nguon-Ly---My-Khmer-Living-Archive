# AGENTS.md

Instructions for AI coding agents working in this repository. Cline, VS Code agent mode, and most other tools read this file automatically. Students: read it too. These are the rules your AI partner is being held to, and they are the same rules you are graded against.

## What this project is

One student's Khmer Living Archive, built in ICT 340 at AUPP. Every student builds the same four-feature skeleton (browse and search, contributor accounts, own-your-entries, submit-review-publish) around their own collection of Khmer culture. Features arrive in three sprints. Build only what the current task asks for; do not build ahead.

## Stack facts

- Next.js 15, App Router, React 19.
- JavaScript only. No TypeScript, no .ts or .tsx files, ever.
- Plain React. No CSS frameworks, no component libraries, no state libraries.
- Styling follows the existing pattern: inline style objects (see `app/page.js`) or a plain CSS file.
- `collection.config.js` is the single source of the archive's identity (name, description, curator, source). Read from it; never hard-code those values.

## Hard rules

1. Do not add dependencies. The three in `package.json` are the whole list. If a task seems to need a package, stop and say so instead of installing it.
2. Do not touch `package.json`, `package-lock.json`, `next.config.mjs`, or `.gitignore` unless the task explicitly names them.
3. Never write an API key, token, or password into any file. This repository is public.
4. Keep diffs scoped to what was asked. If completing the task honestly requires touching another file, say which file and why before editing it.
5. One component per file in `components/`, plain function components, roughly 80 lines or less. If a component wants to be bigger, split it.
6. Khmer text is first-class content, not an edge case. Never strip, transliterate, or "fix" it. Sample data comes from the student's real entries, never lorem ipsum.

## Working style

- For anything beyond a one-file change, state a short plan before writing code.
- Explain changes plainly. The student must be able to defend every line in a code review; write code and explanations that make that possible.
- The student reviews and approves every diff. Expect rejections and make them easy: small steps, clear boundaries.



## Sprint 2 amendment (added week 5)

Two dependencies are approved for Sprint 2, and only these two:
- @supabase/supabase-js
- @supabase/ssr

Everything else in the hard rules stands, especially rule 3:
no keys, tokens, or passwords in any committed file, ever.
Auth configuration lives in .env.local and in Vercel
environment variables.

## Final sprint amendment (added 2026-11-19, week 13)

The instructor relaxed some rules for the final sprint (polish, cleanup, UX/UI, README). Where this section conflicts with the sections above, this section is the current rule. Everything it does not mention still stands.

- **Dependencies:** external libraries are allowed now, kept minimal and under the student's control. Propose one at a time (its name, what it is for, why plain React or CSS is not enough), get the student's OK, and add only what is needed. Never add a batch of many at once. Editing `package.json` and `package-lock.json` is allowed for an approved dependency.
- **Component size:** the roughly 80-line limit is lifted. One component per file still applies.
- **Stack and style:** JavaScript only and plain React stay the default. The "no CSS frameworks, component libraries or state libraries" rule is relaxed for the UX/UI work, but only for a library the student has approved, never by default.
- **Khmer:** the instructor allows Gemini to draft Khmer translations. The student reads and corrects every translated string before it ships, and the README's AI-use section says Gemini helped. Khmer the student wrote stays exactly as written; never strip, transliterate or "fix" it.
- **Still unchanged:** rule 3 (never write a key, token or password into any file; this repository is public; a Gemini or other API key lives in `.env.local` or outside the repo), rule 4 (keep diffs scoped; say which file and why), rule 6's real sample data, and the working style: a short plan first, the student reviews and approves every diff, database changes are SQL the student runs by hand, and no `next build` while the student's dev server runs.