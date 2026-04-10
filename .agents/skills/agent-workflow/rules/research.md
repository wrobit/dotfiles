# research.md

> Agent skill: Read-only codebase investigation and explanation

## Purpose

Analyze how a system works without modifying anything. Produce a clear, structured explanation grounded in actual code paths.

## Contract

* Read-only execution only
* No file writes, edits, or side effects
* No speculative fixes or refactors
* Output = explanation, not changes

## Inputs

`$ARGUMENTS`

* Defines the investigation target
* Examples:

  * "auth flow in mfe-settings"
  * "Apollo cache configuration"
  * "federated module runtime loading"

If missing → ask for clarification before proceeding

## Allowed Tools

* Read
* Glob
* Grep
* Bash (read-only only: `ls`, `cat`, `git log`, `git diff`, `git show`)
* WebFetch
* WebSearch

## Forbidden

* Write / Edit / MultiEdit / NotebookEdit
* Any bash command that mutates files
* Silent assumptions without code evidence

## Operating Mode

READ-ONLY IDENTIFICATION

* Do not fix bugs
* Do not improve code
* Do not suggest refactors unless explicitly requested
* Surface issues as findings only

---

## Execution Flow

### 1. Scope

* Restate the investigation in 1–2 sentences
* If ambiguous → ask before continuing

### 2. Traverse

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

### 3. Model

Build a mental model before writing:

* What triggers execution?
* How does data move?
* Where are boundaries?
* What owns what?

### 4. Output

Produce a structured explanation:

#### How it works

Plain-language explanation of the mechanism

* Reference real files (`path/to/file.ts:42`)
* Avoid abstraction without grounding

#### Data / Control Flow

Step-by-step trace:

user action → entry → internal calls → side systems → output

#### Key Files

| File            | Role                        |
| --------------- | --------------------------- |
| path/to/file.ts | Responsibility in this flow |

#### Boundaries

* What this system owns
* What it delegates

#### Gotchas

* Non-obvious behavior
* Hidden coupling
* Surprising control flow

#### Incidental Findings (optional)

* Bugs
* Inconsistencies
* Tech debt

Do not fix. Do not expand.

---

## Heuristics

* Prefer concrete over abstract
* Follow execution, not file structure
* Verify assumptions in code
* Minimize speculation

## Anti-Patterns

* Explaining without reading code
* Jumping to conclusions early
* Over-documenting trivial files
* Continuing without a model

---

## Output Quality Bar

A good output:

* Can be followed linearly
* Maps directly to code
* Explains "why", not just "what"
* Makes the system predictable to the reader
