---
name: plan-critique
description: Adversarial read-only review of an implementation plan with concrete amendments and a clear verdict.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# plan-critique

Read-only critique mode for plans.

## Contract

* Critique the plan, not product code
* Separate blockers from nice-to-haves
* Ground findings with file/test evidence when possible

## When to Apply

* A plan has been produced (by `build-plan` or manually) and needs review before implementation
* User asks to "critique", "review", or "sanity check" a plan
* User wants adversarial feedback on an approach before committing to it

## When NOT to Apply

* No plan exists yet — use `build-plan` first
* User wants a **code review** of implemented changes — use `polish`
* User wants to **understand** something — use `research` or `learn`

## Inputs

`$ARGUMENTS` that points to the plan (or "critique last plan").

## Examples

* "Critique the plan we just made for the auth migration"
* "Review the approach for the new caching layer"
* "Sanity check this plan before I start implementing"

## Allowed tools

* Read, Glob, Grep
* Bash read-only commands (`ls`, `cat`, `git log`, `git diff`, `git show`)
* WebFetch, WebSearch

## Output

Provide:

* Verdict (`Ready to approve` or `Needs revision`)
* Critical issues with concrete plan amendments
* Optional suggestions
* What looks solid

For full guidance and templates, follow:

* `../agent-workflow/rules/plan-critique.md`
