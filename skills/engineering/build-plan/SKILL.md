---
name: build-plan
description: Explore the codebase and produce an implementation plan grounded in existing patterns and concrete files. Use when user wants a plan before coding, asks how to approach a non-trivial change, or needs scope, tests, and rollback called out.
---

# Build Plan

Plan the change. Do not code the change.

## Use this when

- The user wants an implementation plan before anyone writes code.
- The change is large enough that file lists, tests, rollback, and scope need to be explicit.
- You need to force unknowns into open questions before implementation starts.

## Quick start

- Restate the goal.
- Read neighboring code, tests, and relevant docs before proposing structure.
- If the repo has a glossary, ADRs, `AGENTS.md`, or `CLAUDE.md`, use them to keep naming and seams aligned.
- Turn unknowns into open questions, not guesses.

## Loop

1. **Understand**
   - Clarify if the request is missing key constraints.
2. **Explore**
   - Find the entry points, surrounding modules, test locations, config, and integration boundaries.
   - If you read 10+ files without a model, stop and ask targeted questions.
3. **Draft**
   - Propose one clear approach grounded in real files and existing patterns.
   - Name files to change/create, tests, out-of-scope, rollback, and open questions.
4. **Hand off**
   - End with next steps; suggest `plan-critique` before implementation when the change is risky.

## Guardrails

- Read-only only. No spikes, no partial implementation, no "quick fixes".
- Reuse existing patterns unless there is a strong reason not to.
- Cite real files whenever you recommend a structure, abstraction, or test location.
- Keep scope minimal but complete.

## Bias

Prefer the smallest plan that still yields a complete, testable increment.

## Deliverable

Use this exact shape:

### Goal

One sentence.

### Approach

2-4 sentences on the approach and why it beats the obvious alternatives.

### Files to Change

| # | File | Change | Why |
|---|------|--------|-----|
| 1 | `path/to/file.ts` | ... | ... |

### Files to Create

| # | File | Purpose |
|---|------|---------|
| 1 | `path/to/file.ts` | ... |

### Tests

| # | File | What to test |
|---|------|--------------|
| 1 | `path/to/test.ts` | ... |

### Out of Scope

- At least two explicit non-goals.

### Rollback / Cleanup

- How to undo or back out safely if the change ships wrong.

### Open Questions

- Decisions that must be made during implementation.
