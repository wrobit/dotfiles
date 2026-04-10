# build-plan.md

> Agent skill: Explore the codebase and produce a structured implementation plan (read-only)

## Purpose

Explore the repository and produce an **actionable, pattern-grounded plan**. **No code changes** until the user explicitly approves. Prefer reusing existing conventions over inventing new ones.

## Contract

* **Read-only** exploration and planning only
* Plans must cite **real files and patterns** from the codebase
* Do not implement, patch, or “just do a quick fix”
* Unknowns become **open questions** or blocking asks — not silent guesses

## Inputs

`$ARGUMENTS`

* The task to plan (e.g. “add OAuth login to mfe-settings”)

If missing, empty, or ambiguous → **ask for clarification** before proceeding (e.g. via `AskUserQuestion` in Cursor).

## Allowed tools

* Read, Glob, Grep
* Bash **read-only** only: `ls`, `cat`, `git log`, `git diff`, `git show`
* WebFetch, WebSearch

## Forbidden

* Write, Edit, MultiEdit, NotebookEdit, or any tool that mutates files
* Bash commands that change filesystem state (writes, moves, deletes, package installs)
* Implementing the plan or partial spikes in the repo

## Operating mode

**READ-ONLY PLANNING**

* Surface findings and risks; do not fix code
* Model plans on **existing** patterns (quote paths and examples)
* If exploration stalls → stop, summarize, and ask — do not defer unknowns indefinitely

---

## Execution flow

### 1. Understand

* Restate the goal in **1–2 sentences**
* If ambiguous → clarify **before** exploring deeply
* Do not defer unknowns without naming them

### 2. Explore

Before drafting the plan:

* Use Glob / Grep to find relevant entry points and usages
* Read patterns, conventions, types, and neighboring features
* Check related tests, GraphQL or API layers, shared packages, and integration points (e.g. Module Federation) when relevant
* Read `CLAUDE.md` / `AGENTS.md` when present (repo or package scope)

**Timebox rule**

* If **10+ files** read without a clear mental model → stop, summarize what you know, and ask targeted questions

### 3. Draft the plan

* **Model existing patterns** — find and cite real examples
* **Do not introduce new patterns** unless necessary; justify exceptions
* **Cite patterns** with file paths (and line numbers when helpful)
* Align with framework and repo norms already in use

### 4. Hand off

* In Cursor plan mode workflows: when appropriate, call `ExitPlanMode` after delivering the plan
* End with explicit next steps, for example: invite adjustments or suggest running **plan-critique** (`plan-critique.md`) before implementation

**Do not implement anything.**

---

## Output

Produce a plan using this structure (use tables; empty sections may say “None” or “N/A”).

### Goal

One sentence.

### Approach

* Why this approach (and briefly, what alternatives were considered) in **2–4 sentences**

### Files to change

| # | File | Change | Why |
|---|------|--------|-----|
| 1 | `path/to/file.tsx` | … | … |

### Files to create

| # | File | Purpose |
|---|------|---------|
| | | |

### Tests

| # | File | What to test |
|---|------|--------------|
| | | |

### Out of scope

* At least **two** explicit non-goals (what this plan intentionally does **not** do)

### Rollback / cleanup

* How to undo or revert safely if the change ships wrong

### Open questions

* Items that need a decision during implementation (API, product, or technical)

---

## Heuristics

* Prefer **one clear approach** over a menu of unranked options
* Prefer **small, sequenced** phases when the task is large
* Every “create new abstraction” claim should point at **precedent** or justify greenfield need
* Tests and migration notes belong in the plan when the repo expects them

## Anti-patterns

* Planning from memory without reading the code
* Vague file lists (“update components”) without paths
* Copy-paste architecture that ignores this repo’s patterns
* Hiding uncertainty — mark it as an open question instead

---

## Output quality bar

A good plan:

* Can be executed by another agent or human **without guessing** major structure
* Names **concrete files** and **repeatable patterns**
* Separates **in scope** / **out of scope** / **open questions** clearly
* Explicitly avoids implementation until approval

---

## Related skills

* **plan-critique** (`plan-critique.md`) — adversarial review before build
* **polish** (`polish.md`) — post-implementation quality pass on the diff
* **research** (`research.md`) — read-only investigation when the task is “how does X work?” without a build plan yet
