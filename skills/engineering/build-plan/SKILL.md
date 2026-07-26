---
name: build-plan
description: Explore the codebase and produce an implementation plan grounded in existing patterns and concrete files. Use when user wants a plan before coding, asks how to approach a non-trivial change, needs scope/tests/rollback called out, or needs ambiguous product/technical decisions resolved through focused user questions.
---

# Build Plan

Plan the change. Do not code the change.

## Use this when

- The user wants an implementation plan before anyone writes code.
- The change is large enough that file lists, tests, rollback, and scope need to be explicit.
- You need to force unknowns into decisions before implementation starts.
- The request has enumerable choices where the user can pick a direction.

## Quick start

- Restate the goal.
- Read neighboring code, tests, and relevant docs before proposing structure.
- If the repo has a glossary, ADRs, `AGENTS.md`, or `CLAUDE.md`, use them to keep naming and seams aligned.
- Turn unknowns into focused user questions, not guesses.
- Prefer multiple-choice decision prompts when the likely answers can be enumerated.

## Decision prompts

Use an `ask_user`-style interaction whenever a user decision would materially change the plan and the likely answers fit 2-5 options.

Rules:

- Ask exactly one question at a time.
- Provide 2-5 concrete options, each with a short label and a one-line description.
- Always allow the user to write their own answer or decline to decide.
- Do not include a redundant "write my own answer" option if an interactive `ask_user` tool already appends it.
- If no interactive tool is available, ask in plain text using the same shape.
- If the user dismisses or declines, do not assume an answer; either proceed with a clearly marked default or leave it as an open question.
- Ask only for decisions that block or materially reshape the plan. Do not interrogate the user about details the codebase can answer.

Plain-text fallback shape:

```text
Decision needed: <one question>
1. <label> — <description>
2. <label> — <description>
3. <label> — <description>
You can also write your own answer or say "skip".
```

Good prompt topics:

- Scope boundary: MVP vs complete migration vs compatibility layer.
- UX/API behavior where no existing pattern decides it.
- Risk tolerance: safest incremental path vs faster broad change.
- Data migration or cleanup strategy.
- Test depth when cost/time tradeoffs are real.

Avoid prompts for:

- Facts discoverable from files, docs, config, or tests.
- Style choices already governed by project conventions.
- Trivial details that can be listed as implementation notes.

## Loop

1. **Understand**
   - Clarify if the request is missing key constraints.
   - If one blocking decision is enumerable, ask it with a decision prompt before deeper planning.
2. **Explore**
   - Find the entry points, surrounding modules, test locations, config, and integration boundaries.
   - Prefer answering your own questions by reading code.
   - If you read 10+ files without a model, stop and ask one targeted decision or scoping question.
3. **Draft**
   - Propose one clear approach grounded in real files and existing patterns.
   - Name files to change/create, tests, out-of-scope, rollback, and open questions.
   - When multiple valid approaches remain, pick the smallest safe default and note the alternatives.
4. **Decision check**
   - Before finalizing, identify whether any remaining open question blocks implementation.
   - If yes and it has enumerable answers, ask exactly one more decision prompt.
   - If no, include non-blocking questions in the final plan.
5. **Hand off**
   - End with next steps; suggest `plan-critique` before implementation when the change is risky.

## Guardrails

- Read-only only. No spikes, no partial implementation, no "quick fixes".
- Reuse existing patterns unless there is a strong reason not to.
- Cite real files whenever you recommend a structure, abstraction, or test location.
- Keep scope minimal but complete.
- Do not over-ask. A strong plan usually needs zero or one decision prompt after code exploration.
- Never hide uncertainty as a recommendation; label assumptions and defaults explicitly.

## Bias

Prefer the smallest plan that still yields a complete, testable increment. When a user decision is needed, make it easy to answer quickly.

## Deliverable

Use this exact shape. Do not use Markdown heading markers (`#`, `##`, `###`) in the final plan; use bold section labels instead.

**Goal**

One sentence.

**Decisions Resolved**

- User or repo-backed decisions that shaped the plan.
- Include every decision prompt answer here.
- If no decision prompts were needed, write `None needed; repo conventions were sufficient.`

**Approach**

2-4 sentences on the approach and why it beats the obvious alternatives.

**Files to Change**

| #   | File              | Change | Why |
| --- | ----------------- | ------ | --- |
| 1   | `path/to/file.ts` | ...    | ... |

**Files to Create**

| #   | File              | Purpose |
| --- | ----------------- | ------- |
| 1   | `path/to/file.ts` | ...     |

**Tests**

| #   | File              | What to test |
| --- | ----------------- | ------------ |
| 1   | `path/to/test.ts` | ...          |

**Out of Scope**

- At least two explicit non-goals.

**Rollback / Cleanup**

- How to undo or back out safely if the change ships wrong.

**Open Questions**

- Only list questions that are still unanswered after repository exploration and decision prompts.
- Do not repeat questions that were already prompted and answered; put those in Decisions Resolved.
- Do not include speculative "if this were real" questions.
- If there are no remaining unanswered questions, write `None.`
