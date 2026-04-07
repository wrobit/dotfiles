---
name: polish
description: Diff-scoped quality pass that verifies, applies surgical fixes, and re-verifies before commit or PR.
user-invocable: true
---

# polish

Diff-scoped polish mode.

## Contract

* Work on changed files only unless scope is expanded explicitly
* Fix real issues surgically; avoid broad refactors
* Record pre-existing failures and avoid unrelated cleanup

## Inputs

`$ARGUMENTS` optional focus area; otherwise evaluate full current diff.

## Allowed tools

* Read, Glob, Grep
* Edit/write only in scope files
* Bash for `git diff`, `git status`, and checks (`lint`, `typecheck`, `test`)

## Output

Provide:

* Fixed items (with files)
* Flagged decisions (if any)
* Verification results (lint, typecheck, tests)

For full guidance and templates, follow:

* `../../../.skills/agent-workflow/rules/polish.md`
