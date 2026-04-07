# Agent workflow (compiled)

**Version 1.0.0**

> **Note:**  
> This document is mainly for agents and LLMs to follow when running a structured **research → plan → critique → implement → polish** loop. Humans may also find it useful; guidance is optimized for automation and consistency.

---

## Abstract

This guide defines four workflow phases used before and after implementation: **Research** (read-only investigation), **Build plan** (read-only implementation plan), **Plan critique** (read-only adversarial review), and **Polish** (diff-scoped quality pass). Research, build-plan, and plan-critique must not modify product code. Polish may edit only files in the current change scope. Together they enforce separation of planning from execution and high-signal review before merge.

---

## Table of Contents

1. [Research](#1-research) — **read-only**
2. [Build plan](#2-build-plan) — **read-only**
3. [Plan critique](#3-plan-critique) — **read-only**
4. [Polish](#4-polish) — **diff-scoped edits**
5. [Composition](#5-composition)

---

## 1. Research

**Mode: read-only**

### Purpose

Analyze how a system works without modifying anything. Produce a clear, structured explanation grounded in actual code paths.

### Contract

* Read-only execution only
* No file writes, edits, or side effects
* No speculative fixes or refactors
* Output = explanation, not changes

### Inputs

`$ARGUMENTS`

* Defines the investigation target
* Examples:

  * "auth flow in mfe-settings"
  * "Apollo cache configuration"
  * "federated module runtime loading"

If missing → ask for clarification before proceeding

### Allowed Tools

* Read
* Glob
* Grep
* Bash (read-only only: `ls`, `cat`, `git log`, `git diff`, `git show`)
* WebFetch
* WebSearch

### Forbidden

* Write / Edit / MultiEdit / NotebookEdit
* Any bash command that mutates files
* Silent assumptions without code evidence

### Operating Mode

READ-ONLY IDENTIFICATION

* Do not fix bugs
* Do not improve code
* Do not suggest refactors unless explicitly requested
* Surface issues as findings only

### Execution Flow

#### 1. Scope

* Restate the investigation in 1–2 sentences
* If ambiguous → ask before continuing

#### 2. Traverse

Start from the provided entry point and move inward:

* Locate files via Glob / Grep
* Read entry points first
* Follow imports and call chains
* Identify data boundaries

Also:

* Check related tests
* Read `CLAUDE.md` / `AGENTS.md` in relevant modules
* Cross-check config (webpack, package.json, tsconfig) when architecture matters

**Timebox rule**

If >10 files read without a clear mental model:

* Stop
* Summarize current understanding
* Ask a clarifying question

#### 3. Model

Build a mental model before writing:

* What triggers execution?
* How does data move?
* Where are boundaries?
* What owns what?

#### 4. Output

Produce a structured explanation:

##### How it works

Plain-language explanation of the mechanism

* Reference real files (`path/to/file.ts:42`)
* Avoid abstraction without grounding

##### Data / Control Flow

Step-by-step trace:

user action → entry → internal calls → side systems → output

##### Key Files

| File            | Role                        |
| --------------- | --------------------------- |
| path/to/file.ts | Responsibility in this flow |

##### Boundaries

* What this system owns
* What it delegates

##### Gotchas

* Non-obvious behavior
* Hidden coupling
* Surprising control flow

##### Incidental Findings (optional)

* Bugs
* Inconsistencies
* Tech debt

Do not fix. Do not expand.

### Heuristics

* Prefer concrete over abstract
* Follow execution, not file structure
* Verify assumptions in code
* Minimize speculation

### Anti-Patterns

* Explaining without reading code
* Jumping to conclusions early
* Over-documenting trivial files
* Continuing without a model

### Output Quality Bar

A good output:

* Can be followed linearly
* Maps directly to code
* Explains "why", not just "what"
* Makes the system predictable to the reader

---

## 2. Build plan

**Mode: read-only**

### Purpose

Explore the repository and produce an **actionable, pattern-grounded plan**. **No code changes** until the user explicitly approves. Prefer reusing existing conventions over inventing new ones.

### Contract

* **Read-only** exploration and planning only
* Plans must cite **real files and patterns** from the codebase
* Do not implement, patch, or “just do a quick fix”
* Unknowns become **open questions** or blocking asks — not silent guesses

### Inputs

`$ARGUMENTS`

* The task to plan (e.g. “add OAuth login to mfe-settings”)

If missing, empty, or ambiguous → **ask for clarification** before proceeding (e.g. via `AskUserQuestion` in Cursor).

### Allowed Tools

* Read, Glob, Grep
* Bash **read-only** only: `ls`, `cat`, `git log`, `git diff`, `git show`
* WebFetch, WebSearch

### Forbidden

* Write, Edit, MultiEdit, NotebookEdit, or any tool that mutates files
* Bash commands that change filesystem state (writes, moves, deletes, package installs)
* Implementing the plan or partial spikes in the repo

### Operating Mode

**READ-ONLY PLANNING**

* Surface findings and risks; do not fix code
* Model plans on **existing** patterns (quote paths and examples)
* If exploration stalls → stop, summarize, and ask — do not defer unknowns indefinitely

### Execution Flow

#### 1. Understand

* Restate the goal in **1–2 sentences**
* If ambiguous → clarify **before** exploring deeply
* Do not defer unknowns without naming them

#### 2. Explore

Before drafting the plan:

* Use Glob / Grep to find relevant entry points and usages
* Read patterns, conventions, types, and neighboring features
* Check related tests, GraphQL or API layers, shared packages, and integration points (e.g. Module Federation) when relevant
* Read `CLAUDE.md` / `AGENTS.md` when present (repo or package scope)

**Timebox rule**

* If **10+ files** read without a clear mental model → stop, summarize what you know, and ask targeted questions

#### 3. Draft the Plan

* **Model existing patterns** — find and cite real examples
* **Do not introduce new patterns** unless necessary; justify exceptions
* **Cite patterns** with file paths (and line numbers when helpful)
* Align with framework and repo norms already in use

#### 4. Hand Off

* In Cursor plan mode workflows: when appropriate, call `ExitPlanMode` after delivering the plan
* End with explicit next steps — e.g. invite adjustments or suggest **Plan critique** (Section 3) before implementation

**Do not implement anything.**

### Output

Produce a plan using this structure (use tables; empty sections may say “None” or “N/A”).

#### Goal

One sentence.

#### Approach

* Why this approach (and briefly, what alternatives were considered) in **2–4 sentences**

#### Files to Change

| # | File | Change | Why |
|---|------|--------|-----|
| 1 | `path/to/file.tsx` | … | … |

#### Files to Create

| # | File | Purpose |
|---|------|---------|
| | | |

#### Tests

| # | File | What to test |
|---|------|--------------|
| | | |

#### Out of Scope

* At least **two** explicit non-goals (what this plan intentionally does **not** do)

#### Rollback / Cleanup

* How to undo or revert safely if the change ships wrong

#### Open Questions

* Items that need a decision during implementation (API, product, or technical)

### Heuristics

* Prefer **one clear approach** over a menu of unranked options
* Prefer **small, sequenced** phases when the task is large
* Every “create new abstraction” claim should point at **precedent** or justify greenfield need
* Tests and migration notes belong in the plan when the repo expects them

### Anti-Patterns

* Planning from memory without reading the code
* Vague file lists (“update components”) without paths
* Copy-paste architecture that ignores this repo’s patterns
* Hiding uncertainty — mark it as an open question instead

### Output Quality Bar

A good plan:

* Can be executed by another agent or human **without guessing** major structure
* Names **concrete files** and **repeatable patterns**
* Separates **in scope** / **out of scope** / **open questions** clearly
* Explicitly avoids implementation until approval

---

## 3. Plan critique

**Mode: read-only**

### Purpose

Review a **plan** (in the conversation, or supplied via input) as a structured adversary: gaps, risks, missing files, and incorrect assumptions. Prefer verification against the **actual codebase** when checks are quick and read-only.

### Contract

* **Read-only** — critique and amend the **plan**, not the product code
* Ground feedback in **evidence** (file paths, patterns, tests) when claiming something is wrong or missing
* Separate **blocking issues** from **nice-to-haves**
* If no plan is available → ask for it (paste, path, or prior message)

### Inputs

`$ARGUMENTS` (optional)

* Pointer to the plan: excerpt, file path, ticket id, or “critique the last plan”
* If the plan is not in context → request the full plan text or location before deep review

### Allowed Tools

* Read, Glob, Grep
* Bash **read-only** only: `ls`, `cat`, `git log`, `git diff`, `git show`
* WebFetch, WebSearch (for external constraints referenced by the plan)

### Forbidden

* Write, Edit, MultiEdit, NotebookEdit, or implementing the plan in the repo
* Dismissing risks without reasoning
* Expanding scope into a full rewrite unless the user asks for that level of change

### Operating Mode

**ADVERSARIAL READ-ONLY REVIEW**

* Assume the plan is **wrong until** it matches code and scope checks
* Propose **concrete amendments** (what to add, remove, or reorder) when you flag an issue
* Stay in **plan mindset** — no implementation side quests

### Execution Flow

#### 1. Completeness

* Are all affected areas and files represented?
* Search for related imports, call sites, and feature flags
* Are dependent modules, shared packages, or federation boundaries considered?
* Are the **right** test files and test types named (unit, integration, e2e)?

#### 2. Correctness of Approach

* Does the plan follow **existing** project patterns?
* Is there a **simpler** path that reuses more of the codebase?
* Does it introduce **avoidable** technical debt or new patterns without justification?

#### 3. Risks and Edge Cases

* What could fail in production or CI?
* Explicitly consider where relevant:

  * Null / empty states
  * Error and loading paths
  * Race conditions and retries
  * Caching (e.g. Apollo) and cache invalidation
  * Module Federation or shared runtime assumptions
  * Security, authz, and PII boundaries

#### 4. Assumptions

* List the plan’s **implicit** assumptions
* Rank which are most likely **false** or untested

#### 5. Scope

* Is the plan too large for one change? Can it be **split** safely?
* Is anything **missing** for a minimal but complete increment?

### Output

#### Verdict

**Ready to approve** / **Needs revision** (one line; no hedge words unless truly uncertain)

#### Critical Issues (must fix)

* Blocking gaps, incorrect approach, or missing work
* Each item: **what’s wrong** + **suggested fix** (plan-level amendment)

#### Suggestions (nice-to-have)

* Improvements that are not blocking

#### Looks Solid

* Specific strengths worth keeping (grounded in the plan or code)

If **Needs revision**, end with a **short amendment checklist** (ordered bullets) the author can apply to the plan.

### Heuristics

* Verify claims with Grep/search when cheap; otherwise label as **unverified assumption**
* Prefer **actionable** critique over generic skepticism
* Favor **smaller** revised scope when risk is high
* Mirror the plan’s sections when that improves scannability

### Anti-Patterns

* Approving vague plans because they “sound reasonable”
* Nitpicking naming without impact
* Implementing fixes instead of revising the plan
* Critique without a clear **verdict** or **next step**

### Output Quality Bar

A good critique:

* Gives a **clear approve / revise** signal
* Lists **must-fix** items that are **specific** and **ordered** by severity
* Separates **blockers** from **optional** polish
* References **code or tests** when disputing feasibility

---

## 4. Polish

**Mode: diff-scoped edits**

### Purpose

Review all changes in the working tree for quality, correctness, and consistency. Apply **surgical** fixes only where something is wrong; leave sound code unchanged.

### Contract

* Operate on **current diff / changed files only** unless the user explicitly widens scope
* Fix real issues; do not refactor for style or "cleanup" outside the diff
* Do **not** fix **pre-existing** failures unrelated to this change set (note them, skip them)
* Re-run verification after edits; all **new** failures introduced by polish must be fixed

### Inputs

`$ARGUMENTS` (optional)

* Narrow focus when provided (e.g. a path, feature name, or ticket id)
* If empty → polish the full current diff (`git diff` / `git status`)

If the scope is ambiguous → ask once, then proceed.

### Allowed Tools

* Read, Glob, Grep
* Edit / write only for files that are in scope (changed or explicitly named)
* Bash for verification: `git diff`, `git status`, and project checks (`lint`, `typecheck`, `test`, etc.)

### Forbidden

* Drive-by refactors in untouched files
* “Fixing” unrelated legacy debt without explicit user approval
* Silent scope creep (expanding beyond diff without confirmation)

### Operating Mode

**POLISH = VERIFY → FIX → RE-VERIFY**

* Prefer the smallest change that resolves the issue
* Match existing project patterns (design system, naming, data fetching, file layout)
* If something needs a product or API decision → **flag** it; do not guess

### Execution Flow

#### 1. Understand the Diff

```bash
git diff HEAD
git status
```

* If there are no changes → stop and say so
* Read changed files **fully** (not only the hunk context)

**Project context**

* If present, read `CLAUDE.md` or `AGENTS.md` (repo or relevant package)

#### 2. Baseline Verification

Run the repository’s standard checks (adapt names to the repo), for example:

* `yarn lint` / `npm run lint`
* `yarn type-check` / `npm run typecheck` / `tsc --noEmit`
* `yarn test` / `npm test`

* Record **pre-existing** failures (command + summary)
* Do **not** remediate pre-existing issues unless they block validating **this** change

#### 3. React and TypeScript Hygiene (when applicable)

Check for:

* Unused imports and dead code (`console.log`, `debugger`, stray TODOs meant for removal)
* Weak typing (`any`) where the codebase uses stricter patterns
* Incorrect hook dependency arrays, invalid hook usage, derived-state misuse
* Over-memoization or unnecessary optimization
* List `key` usage and obvious reconciliation issues

#### 4. Pattern Compliance

Align with project conventions:

* Design system and styling patterns
* File and module structure
* Data fetching and error handling patterns
* Naming consistency with surrounding code

#### 5. Code Cleanliness (in diff only)

Fix when clearly wrong:

* Redundant or misleading comments
* Unnecessarily tangled logic that can be simplified **without** behavioral change
* Magic values where the project typically uses shared constants
* Naming that conflicts with nearby patterns

#### 6. Tests

* Ensure **new logic** has or updates tests where the repo expects them
* Adjust tests that legitimately change with behavior
* Prefer behavior-focused assertions over brittle implementation details
* Check edge cases, providers/mount wrappers, and async boundaries as relevant

#### 7. Re-verify

Re-run the same lint / type-check / test commands.

* Any **new** failure after your edits must be fixed before finishing
* Pre-existing failures → restate that they remain out of scope

### Output

Deliver a short, structured summary:

#### Polish Summary

**Fixed**

* Bullet list of concrete fixes (file + what changed)

**Flagged (needs human decision)**

* Items that are risky, ambiguous, or product/API choices

**Verification**

| Check       | Result |
| ----------- | ------ |
| Lint        | pass / fail (note if pre-existing) |
| Type check  | pass / fail (note if pre-existing) |
| Tests       | pass / fail (note if pre-existing) |

If everything is clean and in scope, state that explicitly.

### Heuristics

* Smaller diffs beat clever refactors
* When unsure whether a change is “polish” vs “feature” → flag, don’t expand
* Prefer matching local patterns over importing new abstractions
* Verification commands trump assumptions about correctness

### Anti-Patterns

* Rewriting files wholesale to “modernize” them
* Fixing linter errors in files you didn’t need to touch
* Assuming failures are new without comparing to baseline
* Polishing without reading full files touched by the diff

### Output Quality Bar

A good polish pass:

* Leaves the diff **smaller or the same size**, never gratuitously larger
* Has **green** checks for everything this change set is responsible for
* Surfaces **decisions**, not silent judgment calls
* Gives reviewers a **scannable** summary tied to real files and commands

---

## 5. Composition

* **Section 1 (Research)** is optional when the task is small and code is already understood.
* **Section 2 (Build plan)** and **Section 3 (Plan critique)** pair: produce a plan, then critique before coding.
* **Implementation** (between critique and polish) is **not** spelled out in this document: apply the **approved plan**, **project** `AGENTS.md` / `CLAUDE.md` / team rules, and **other skills** (stack- or domain-specific) as the task requires.
* **Section 4 (Polish)** runs after implementation on the **current diff**, before commit or PR.

Do **not** implement product code during Sections 1–3. If the user requests a single phase only, follow that section and do not expand scope.

Canonical splits for tooling: same content lives per-phase in `rules/research.md`, `rules/build-plan.md`, `rules/plan-critique.md`, and `rules/polish.md` alongside `SKILL.md`.
