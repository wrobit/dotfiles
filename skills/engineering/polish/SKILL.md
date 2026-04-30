---
name: polish
description: Run a diff-scoped quality pass that verifies, applies surgical fixes, and re-verifies before commit or PR. Use when implementation is done, user asks to polish or review the diff, or a pre-commit check is needed.
---

# Polish

Polish the realized diff, not the whole repo.

## Use this when

- Implementation is done and the change needs a final quality pass.
- The user asks to polish, clean up, or review the current diff.
- You want verification before a commit or PR.

## Quick start

- Read `git diff` and `git status`, then read touched files fully.
- Run the normal checks to establish a baseline before editing.
- Fix only real issues in scope.
- Re-run the same checks and report what changed.

## Loop

1. **Understand the diff**
   - Stop if there are no changes.
   - If present, read the relevant glossary, ADRs, `AGENTS.md`, or `CLAUDE.md` before editing.
2. **Baseline verify**
   - Run the normal lint, type-check, and test commands.
   - Record pre-existing failures instead of treating them as your job to clean up.
3. **Fix surgically**
   - Prefer the smallest change that resolves the issue.
   - Check dead code, weak typing, hook misuse, pattern drift, misleading comments, and missing tests when relevant.
4. **Re-verify**
   - Re-run the same checks.
   - Any new failure introduced during polish must be fixed before finishing.

## Guardrails

- No unrelated refactors.
- No legacy cleanup outside the diff unless the user explicitly expands scope.
- No silent scope creep into untouched files.
- Smaller diffs beat clever rewrites.

## Bias

If you are unsure whether something is polish or product work, flag it instead of expanding scope.

## Deliverable

### Fixed

- Concrete fixes with file names.

### Flagged

- Decisions that need a human call.

### Verification

| Check | Result |
|-------|--------|
| Lint | pass / fail |
| Type check | pass / fail |
| Tests | pass / fail |

Call out any pre-existing failures that remain out of scope.
