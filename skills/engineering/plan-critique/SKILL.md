---
name: plan-critique
description: Review an implementation plan like a skeptical peer, validating it against the codebase and turning risks into concrete amendments. Use when user wants a plan critiqued, sanity-checked, or pressure-tested before implementation.
---

# Plan Critique

Treat the plan as guilty until the repo proves it is complete.

## Use this when

- A plan exists and you want to stress-test it before coding.
- The user asks for a sanity check, critique, or adversarial review.
- The cost of missing a file, edge case, or assumption is high.

## Quick start

- Get the plan into view. If it is missing, ask for it.
- Verify the plan against the codebase, tests, flags, and integration points it touches.
- Separate must-fix issues from nice-to-haves.
- Turn every criticism into a concrete amendment.

## Loop

1. **Completeness**
   - Are all affected files, seams, integrations, and test types represented?
2. **Correctness**
   - Does the plan follow existing patterns, or is there a simpler path that reuses more?
3. **Risks**
   - Check null/error/loading states, retries, concurrency, caching, runtime boundaries, and security/PII concerns where relevant.
4. **Assumptions**
   - List implicit assumptions and rank the ones most likely to be false.
5. **Scope**
   - Split oversized plans and make sure the minimum complete increment exists.

## Guardrails

- Read-only only. Critique the plan, not the product code.
- Use file and test evidence when saying something is missing or wrong.
- If a claim is not verified, say so.
- Stay in plan mode; do not implement side quests.

## Bias

Prefer smaller, safer, more pattern-aligned plans over clever ones.

## Deliverable

### Verdict

`Ready to approve` or `Needs revision`

### Critical issues

- Blockers with concrete plan-level amendments.

### Suggestions

- Nice-to-have improvements that are not blocking.

### Looks solid

- Specific strengths worth preserving.

If the verdict is `Needs revision`, end with a short amendment checklist.
