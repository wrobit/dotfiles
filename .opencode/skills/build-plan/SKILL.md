---
name: build-plan
description: Read-only planning workflow that explores the repo and produces a concrete, pattern-grounded implementation plan.
user-invocable: true
---

# build-plan

Read-only planning mode.

## Contract

* Explore and plan only; no code changes
* Cite concrete file paths and existing patterns
* Convert unknowns into explicit open questions

## Inputs

`$ARGUMENTS` describing the requested change.

## Allowed tools

* Read, Glob, Grep
* Bash read-only commands (`ls`, `cat`, `git log`, `git diff`, `git show`)
* WebFetch, WebSearch

## Output

Produce a structured plan with:

* Goal and approach
* Files to change/create
* Tests
* Out-of-scope items
* Rollback/cleanup
* Open questions

For full guidance and templates, follow:

* `../../../.skills/agent-workflow/rules/build-plan.md`
