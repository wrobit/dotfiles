---
name: agent-workflow
description: Orchestrates read-only research, implementation planning, plan critique, and pre-commit polish for non-trivial work. Use when starting a feature or refactor that should follow a structured plan-review-ship loop, when the user references workflow or phased delivery, or for pre-PR polish.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# Agent workflow

Structured **research → plan → critique → implement → polish** loop for agents and LLMs. Separates read-only phases from implementation and final diff review. Humans may use the same files; guidance is optimized for consistent automation.

## When to Apply

Reference this workflow when:

* Starting a non-trivial feature or refactor that needs a written plan and review
* The user asks how a system works before changing it (research phase)
* The user wants a plan critiqued before code is written
* The user asks for pre-commit or pre-PR cleanup on the current diff
* The user mentions workflow, plan/critique, or phased delivery

## When NOT to Apply

Do not use this workflow when:

* The user wants to **learn or understand** a concept without implementing anything — use `learn`
* The user wants only a **single phase** (research, plan, critique, or polish) — invoke that skill directly
* The task is **trivial** enough to implement without a structured plan (e.g. fixing a typo, adding a comment)
* The user needs a quick factual answer — answer directly without invoking phases

## Examples

* "Implement the new auth flow using the full workflow"
* "I want to plan, review, and then build the caching layer"
* "Let's use the structured workflow for this refactor"
* "Research the current system, plan the migration, then implement it"

## Phases by Order (Quick Reference)

| Order | Phase | Mode | Rules file |
| ----- | ----- | ---- | ---------- |
| 1 | Research | Read-only | [rules/research.md](./rules/research.md) |
| 2 | Build plan | Read-only | [rules/build-plan.md](./rules/build-plan.md) |
| 3 | Plan critique | Read-only | [rules/plan-critique.md](./rules/plan-critique.md) |
| 4 | Implement | Normal coding | *Other skills / project rules per task and approved plan* |
| 5 | Polish | Edit in-scope files | [rules/polish.md](./rules/polish.md) |

## Quick Reference

### 1. Research (read-only)

* Scope → traverse codebase → build mental model → structured explanation
* See [rules/research.md](./rules/research.md) for contract, tools, execution flow, and output sections

### 2. Build plan (read-only)

* Understand goal → explore with cites → draft plan tables → hand off (no implementation)
* See [rules/build-plan.md](./rules/build-plan.md) for output template (files, tests, out of scope, rollback, open questions)

### 3. Plan critique (read-only)

* Completeness → approach → risks → assumptions → scope; verdict + amendments
* See [rules/plan-critique.md](./rules/plan-critique.md) for adversarial checklist and output format

### 4. Implement (normal coding)

* Execute the approved work (and any amended plan): **no dedicated rule file in this skill**
* Pull guidance from **domain-specific skills** (e.g. framework or stack skills), **project** `AGENTS.md` / `CLAUDE.md` / cursor rules, and **the plan itself** (files, patterns, tests, open questions)
* If the plan names conventions or dependencies, follow those; otherwise default to repo norms

### 5. Polish (diff-scoped edits)

* Understand diff → baseline verify → hygiene → patterns → cleanliness → tests → re-verify
* See [rules/polish.md](./rules/polish.md) for verification table and guardrails

## How to Use

Read individual rule files for full contracts, forbidden actions, and output templates:

```
rules/research.md
rules/build-plan.md
rules/plan-critique.md
rules/polish.md
```

Each rule file contains:

* Purpose and contract (read-only vs polish)
* Inputs (`$ARGUMENTS`) and allowed/forbidden tools
* Step-by-step execution flow
* Required output structure and quality bar
* Heuristics and anti-patterns

Use the **phase table** to pick the correct file. Do not implement product code during research, build-plan, or plan-critique. During **implement**, use whichever skills and repo rules match the task and the approved plan.

## Full Compiled Document

For all phases in one file (table of contents + full text): **AGENTS.md**
