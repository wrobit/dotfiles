---
name: plan-critique
description: Adversarial read-only review of an implementation plan with concrete amendments and a clear verdict.
user-invocable: true
---

# plan-critique

Read-only critique mode for plans.

## Contract

* Critique the plan, not product code
* Separate blockers from nice-to-haves
* Ground findings with file/test evidence when possible

## Inputs

`$ARGUMENTS` that points to the plan (or "critique last plan").

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

* `../../../.skills/agent-workflow/rules/plan-critique.md`
