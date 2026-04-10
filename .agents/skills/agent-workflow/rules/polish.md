# polish.md

> Agent skill: Final quality pass on the current diff before commit or PR

## Purpose

Review all changes in the working tree for quality, correctness, and consistency. Apply **surgical** fixes only where something is wrong; leave sound code unchanged.

## Contract

* Operate on **current diff / changed files only** unless the user explicitly widens scope
* Fix real issues; do not refactor for style or "cleanup" outside the diff
* Do **not** fix **pre-existing** failures unrelated to this change set (note them, skip them)
* Re-run verification after edits; all **new** failures introduced by polish must be fixed

## Inputs

`$ARGUMENTS` (optional)

* Narrow focus when provided (e.g. a path, feature name, or ticket id)
* If empty → polish the full current diff (`git diff` / `git status`)

If the scope is ambiguous → ask once, then proceed.

## Allowed Tools

* Read, Glob, Grep
* Edit / write only for files that are in scope (changed or explicitly named)
* Bash for verification: `git diff`, `git status`, and project checks (`lint`, `typecheck`, `test`, etc.)

## Forbidden

* Drive-by refactors in untouched files
* “Fixing” unrelated legacy debt without explicit user approval
* Silent scope creep (expanding beyond diff without confirmation)

## Operating Mode

**POLISH = VERIFY → FIX → RE-VERIFY**

* Prefer the smallest change that resolves the issue
* Match existing project patterns (design system, naming, data fetching, file layout)
* If something needs a product or API decision → **flag** it; do not guess

---

## Execution Flow

### 1. Understand the diff

```bash
git diff HEAD
git status
```

* If there are no changes → stop and say so
* Read changed files **fully** (not only the hunk context)

**Project context**

* If present, read `CLAUDE.md` or `AGENTS.md` (repo or relevant package)

### 2. Baseline verification

Run the repository’s standard checks (adapt names to the repo), for example:

* `yarn lint` / `npm run lint`
* `yarn type-check` / `npm run typecheck` / `tsc --noEmit`
* `yarn test` / `npm test`

* Record **pre-existing** failures (command + summary)
* Do **not** remediate pre-existing issues unless they block validating **this** change

### 3. React and TypeScript hygiene (when applicable)

Check for:

* Unused imports and dead code (`console.log`, `debugger`, stray TODOs meant for removal)
* Weak typing (`any`) where the codebase uses stricter patterns
* Incorrect hook dependency arrays, invalid hook usage, derived-state misuse
* Over-memoization or unnecessary optimization
* List `key` usage and obvious reconciliation issues

### 4. Pattern compliance

Align with project conventions:

* Design system and styling patterns
* File and module structure
* Data fetching and error handling patterns
* Naming consistency with surrounding code

### 5. Code cleanliness (in diff only)

Fix when clearly wrong:

* Redundant or misleading comments
* Unnecessarily tangled logic that can be simplified **without** behavioral change
* Magic values where the project typically uses shared constants
* Naming that conflicts with nearby patterns

### 6. Tests

* Ensure **new logic** has or updates tests where the repo expects them
* Adjust tests that legitimately change with behavior
* Prefer behavior-focused assertions over brittle implementation details
* Check edge cases, providers/mount wrappers, and async boundaries as relevant

### 7. Re-verify

Re-run the same lint / type-check / test commands.

* Any **new** failure after your edits must be fixed before finishing
* Pre-existing failures → restate that they remain out of scope

---

## Output

Deliver a short, structured summary:

### Polish summary

**Fixed**

* Bullet list of concrete fixes (file + what changed)

**Flagged (needs human decision)**

* Items that are risky, ambiguous, or product/API choices

**Verification**

| Check       | Result |
| ----------- | ------ |
| Lint        | pass / fail (note if pre-existing) |
| Type check  | pass / fail (note if pre-existing) |
| Tests       | pass / fail (note if pre-existing) |

If everything is clean and in scope, state that explicitly.

---

## Heuristics

* Smaller diffs beat clever refactors
* When unsure whether a change is “polish” vs “feature” → flag, don’t expand
* Prefer matching local patterns over importing new abstractions
* Verification commands trump assumptions about correctness

## Anti-Patterns

* Rewriting files wholesale to “modernize” them
* Fixing linter errors in files you didn’t need to touch
* Assuming failures are new without comparing to baseline
* Polishing without reading full files touched by the diff

---

## Output quality bar

A good polish pass:

* Leaves the diff **smaller or the same size**, never gratuitously larger
* Has **green** checks for everything this change set is responsible for
* Surfaces **decisions**, not silent judgment calls
* Gives reviewers a **scannable** summary tied to real files and commands

---

## Related skills

These compose cleanly with other agents in this repo:

* **build-plan** (`build-plan.md`) — structured implementation plan (read-only)
* **plan-critique** (`plan-critique.md`) — adversarial validation of a plan
* **polish** (this file) — final quality pass on the realized diff

Together they reinforce: plan vs execution separation, pattern adherence, and high-signal review loops.
