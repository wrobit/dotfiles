---
name: research
description: Investigate an existing code path without changing it, grounding every conclusion in concrete files and execution flow. Use when user asks how something works, wants an audit of a subsystem, or needs architecture context before planning changes.
---

# Research

Read the code that exists. Explain the behavior that exists. Do not smuggle in design advice.

## Use this when

- The user asks how a specific subsystem, flow, or integration works.
- The user wants an audit or architectural trace before deciding what to change.
- You need a file-backed mental model before planning implementation.

## Quick start

- Restate the target in 1-2 sentences.
- Start at the best entry point and follow execution inward.
- If the repo has a glossary, ADRs, `AGENTS.md`, or `CLAUDE.md`, read the relevant ones early.
- End with a file-backed mental model, not suggestions.

## Loop

1. **Scope**
   - Clarify once if the target is ambiguous.
2. **Traverse**
   - Use search to find entry points, then read full files.
   - Follow imports, callers, data boundaries, tests, and relevant config.
3. **Model**
   - Answer: what triggers this, how data moves, where boundaries sit, who owns what.
4. **Deliver**
   - Explain the mechanism in plain language.
   - Trace control/data flow in order.
   - Call out key files, boundaries, and gotchas.
   - Include incidental findings only as findings, not fixes.

## Guardrails

- Read-only only. No edits, no speculative refactors, no side quests.
- Ground important claims in concrete file references.
- If you read 10+ files without a stable mental model, stop, summarize, and ask.
- Prefer execution flow over file-by-file tours.

## Bias

Follow the runtime path, not the folder tree.

## Deliverable

- How it works
- Data/control flow
- Key files and their roles
- Boundaries and delegated responsibilities
- Gotchas and optional incidental findings
