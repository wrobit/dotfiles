---
name: agent-workflow
description: Orchestrate research, planning, critique, implementation, and diff polish as separate phases for non-trivial engineering work. Use when user wants a structured workflow, phased delivery, or a high-signal path from idea to shippable diff.
---

# Agent Workflow

Use this when straight-to-code would create thrash. Separate read-only thinking from implementation.

## Use this when

- The change is a non-trivial feature or refactor.
- The user wants phased delivery or explicit plan/review gates.
- The user wants higher-signal prep before implementation or PR review.

## Quick start

1. Pick the smallest phase that matches the request.
2. For full-cycle work, run: `research` -> `build-plan` -> `plan-critique` -> implement -> `polish`.
3. Stop after the phase the user asked for. Do not expand into unrequested phases.

## Phase order

- [research](../research/SKILL.md) - understand the current system
- [build-plan](../build-plan/SKILL.md) - propose the change without coding it
- [plan-critique](../plan-critique/SKILL.md) - pressure-test the plan before coding
- implementation - normal coding mode, following repo rules and the approved plan
- [polish](../polish/SKILL.md) - review the realized diff before commit or PR

## Guardrails

- `research`, `build-plan`, and `plan-critique` are read-only.
- Only `polish` edits the existing diff; implementation sits between critique and polish.
- Use `learn` for general concepts or teaching, not codebase change work.
- Trivial tasks do not need this workflow.

## Bias

If one phase answers the user's question, run one phase. If the work needs multiple irreversible decisions, run the workflow.
