---
name: polish
description: Diff-scoped quality pass that verifies, applies surgical fixes, and re-verifies before commit or PR.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# polish

Diff-scoped polish mode.

## Contract

* Work on changed files only unless scope is expanded explicitly
* Fix real issues surgically; avoid broad refactors
* Record pre-existing failures and avoid unrelated cleanup

## When to Apply

* Implementation is done and needs a quality pass before commit or PR
* User asks to "polish", "clean up", or "review the diff"
* Pre-commit or pre-PR quality check is needed

## When NOT to Apply

* No changes exist in the working tree — nothing to polish
* User wants a **plan review** — use `plan-critique`
* User wants to **understand** code — use `research` or `learn`
* User wants to **implement** a feature — use `agent-workflow`

## Inputs

`$ARGUMENTS` optional focus area; otherwise evaluate full current diff.

## Examples

* "Polish the current diff before I commit"
* "Clean up the changes in the auth module"
* "Review and fix any issues in the current working tree"

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
