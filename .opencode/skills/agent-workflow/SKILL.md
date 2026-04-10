---
name: agent-workflow
description: Orchestrates research, plan, critique, implement, and polish phases for non-trivial tasks.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# agent-workflow

Structured flow: research -> build-plan -> plan-critique -> implement -> polish.

## When to Apply

* Starting a non-trivial feature or refactor that needs a written plan and review
* User mentions workflow, plan/critique, or phased delivery

## When NOT to Apply

* User wants to **learn or understand** a concept — use `learn`
* User wants only a single phase (research, plan, critique, or polish) — use that skill directly
* The task is trivial enough to implement without planning

## Examples

* "Implement the new auth flow using the full workflow"
* "I want to plan, review, and then build the caching layer"
* "Let's use the structured workflow for this refactor"

For full phase details and templates, follow:

* `../../../.skills/agent-workflow/SKILL.md`
* `../../../.skills/agent-workflow/AGENTS.md`
