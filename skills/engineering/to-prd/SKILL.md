---
name: to-prd
description: Turn the current conversation into a PRD issue with a clear product, implementation, and testing split, then publish it with a consistent label vocabulary. Use when user wants a rough idea, feature discussion, or request turned into a structured PRD.
---

# To PRD

Turn rough discussion into a PRD someone can plan and build from.

Do not turn this into a long interview. Synthesize what is already known unless a single missing decision blocks a useful PRD.

## Use this when

- The user wants a PRD from the current conversation.
- A feature request needs to become a structured issue before planning implementation.
- You need product scope, user stories, and testing notes captured in one place.

## Label vocabulary

Use only these labels when creating a PRD issue:

- Primary work type: `bug`, `chore`, `documentation`, `feature`
- Optional sizing or impact: `major`, `minor`
- Optional status or disposition: `help wanted`, `invalid`, `question`, `release`, `wontfix`

Rules:

- Most PRDs should use exactly one primary work-type label, usually `feature`.
- Add `major` or `minor` when scope or impact is clear.
- Use `question` if the PRD is exploratory and still centered on unresolved decisions.
- Use `release` only if the PRD is about release work rather than feature delivery.
- Avoid `help wanted`, `invalid`, and `wontfix` unless the user explicitly wants that disposition.

## Quick start

- Read the conversation first, then inspect the repo enough to anchor the request in the current system.
- Extract the problem, the proposed solution, the user stories, and the major implementation/testing decisions.
- Keep it product-facing where possible.
- Publish the PRD as an issue with labels that reflect the work type and scale.

## Loop

1. **Synthesize context**
   - Start from what is already in the conversation.
   - Do not interview by default.
2. **Explore the repo**
   - Understand the relevant surfaces, current constraints, and likely touchpoints.
   - Match the repo's language where it is obvious, but do not depend on any custom setup system.
3. **Sketch the shape of change**
   - Identify the major parts of the system likely to change.
   - Capture the important constraints and testing expectations.
4. **Write the PRD**
   - Keep problem, solution, user stories, implementation notes, testing notes, and out-of-scope items separate.
   - Do not include file paths or code snippets.
5. **Publish**
   - Create the issue with the appropriate labels.

## PRD template

```md
## Labels

- `feature`
- `major`

## Problem Statement

The problem from the user's point of view.

## Solution

The proposed solution from the user's point of view.

## User Stories

A numbered list of user stories in the form:

1. As an <actor>, I want <capability>, so that <benefit>

Cover the main flows, edge cases, and important operational scenarios.

## Implementation Decisions

- Major parts of the system likely to change
- Important constraints and clarifications
- Schema, API, workflow, or interaction decisions that are already known

Do not include specific file paths or code snippets.

## Testing Decisions

- What good tests should prove
- Which areas need explicit testing attention
- Similar kinds of tests or verification patterns already used in the codebase, if relevant

## Out of Scope

Explicit non-goals for this PRD.

## Further Notes

Anything that matters but does not fit cleanly in the sections above.
```

## Bias

Prefer a PRD that is crisp, scoped, and actionable over one that tries to answer every possible future question.
