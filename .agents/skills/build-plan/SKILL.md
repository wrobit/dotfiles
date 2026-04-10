---
name: build-plan
description: Read-only planning workflow that explores the repo and produces a concrete, pattern-grounded implementation plan.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# build-plan

Read-only planning mode.

## Contract

* Explore and plan only; no code changes
* Cite concrete file paths and existing patterns
* Convert unknowns into explicit open questions

## When to Apply

* User wants a plan before implementing a feature or refactor
* User asks "how should we approach X?" or "plan out X"
* A structured plan is needed before starting non-trivial work

## When NOT to Apply

* User wants to **understand existing code** without planning changes — use `research`
* User wants to **learn a concept** — use `learn`
* User is ready to **implement** and already has a plan — use `agent-workflow`

## Inputs

`$ARGUMENTS` describing the requested change.

## Examples

* "Plan adding OAuth login to mfe-settings"
* "Build a plan for migrating from REST to GraphQL in the user service"
* "Plan out the feature flag system for the dashboard"

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

* `../agent-workflow/rules/build-plan.md`
