---
name: to-issues
description: Break a plan, spec, or PRD into thin, dependency-aware implementation issues and publish them with a consistent label vocabulary. Use when user wants actionable tickets, issue breakdowns, or vertical slices from a larger plan.
---

# To Issues

Turn a plan into issues people can actually pick up and finish.

## Use this when

- The user wants a PRD, plan, or spec turned into implementation tickets.
- The work is too large for one issue and needs slicing into smaller deliverables.
- You want dependency order and acceptance criteria before implementation starts.

## Label vocabulary

Use only these labels when creating issues:

- Primary work type: `bug`, `chore`, `documentation`, `feature`
- Optional sizing or impact: `major`, `minor`
- Optional status or disposition: `help wanted`, `invalid`, `question`, `release`, `wontfix`

Rules:

- Every implementation issue gets exactly one primary work-type label.
- Add `major` or `minor` when scope or impact is clear.
- Use `question` if the issue is mainly about resolving uncertainty, not building something.
- Use `help wanted` only when the issue is suitable for outside pickup.
- Use `release` only for release coordination work.
- Use `invalid` or `wontfix` only when the issue should explicitly not proceed.

## Quick start

- Start from the current conversation, or fetch the source issue/PRD if one is provided.
- Explore the repo only enough to understand the current shape of the system.
- Break the work into thin vertical slices, not horizontal layer slices.
- Review the breakdown with the user before publishing.
- Publish issues in dependency order so blockers exist before dependents reference them.

## Loop

1. **Gather context**
   - Work from the conversation first.
   - If the user passes an issue number, URL, or path, fetch and read it fully before slicing.
2. **Explore the codebase**
   - Learn just enough to name the work accurately and avoid impossible slices.
   - Match the repo's existing language where it is obvious, but do not depend on custom setup docs.
3. **Draft slices**
   - Each slice must deliver a narrow but complete path through the relevant layers.
   - A completed slice should be demoable, testable, or clearly reviewable on its own.
   - Prefer many thin slices over a few thick ones.
   - Mark whether a slice is agent-friendly or needs a human decision, but keep that in the body, not the labels.
4. **Review with the user**
   - Present a numbered breakdown.
   - For each slice, show title, type, blockers, labels, and covered user stories if they exist.
   - Iterate until the breakdown feels right.
5. **Publish**
   - Create the issues in dependency order.
   - Do not close or modify the parent item.

## Issue template

```md
## Parent

A reference to the parent issue or PRD if one exists. Otherwise omit this section.

## What to build

A concise description of the vertical slice. Describe end-to-end behavior, not layer-by-layer chores.

## Labels

- `feature`
- `minor`

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Requires human decision

State `No` if the slice is agent-friendly, otherwise say what human decision or review is required.

## Blocked by

- Issue references, or `None - can start immediately`.
```

## Bias

Prefer slices that produce working behavior over slices that only create plumbing.
