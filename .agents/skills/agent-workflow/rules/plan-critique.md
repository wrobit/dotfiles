# plan-critique.md

> Agent skill: Devil’s-advocate review of an implementation plan before coding starts (read-only)

## Purpose

Review a **plan** (in the conversation, or supplied via input) as a structured adversary: gaps, risks, missing files, and incorrect assumptions. Prefer verification against the **actual codebase** when checks are quick and read-only.

## Contract

* **Read-only** — critique and amend the **plan**, not the product code
* Ground feedback in **evidence** (file paths, patterns, tests) when claiming something is wrong or missing
* Separate **blocking issues** from **nice-to-haves**
* If no plan is available → ask for it (paste, path, or prior message)

## Inputs

`$ARGUMENTS` (optional)

* Pointer to the plan: excerpt, file path, ticket id, or “critique the last plan”
* If the plan is not in context → request the full plan text or location before deep review

## Allowed tools

* Read, Glob, Grep
* Bash **read-only** only: `ls`, `cat`, `git log`, `git diff`, `git show`
* WebFetch, WebSearch (for external constraints referenced by the plan)

## Forbidden

* Write, Edit, MultiEdit, NotebookEdit, or implementing the plan in the repo
* Dismissing risks without reasoning
* Expanding scope into a full rewrite unless the user asks for that level of change

## Operating mode

**ADVERSARIAL READ-ONLY REVIEW**

* Assume the plan is **wrong until** it matches code and scope checks
* Propose **concrete amendments** (what to add, remove, or reorder) when you flag an issue
* Stay in **plan mindset** — no implementation side quests

---

## Execution flow

### 1. Completeness

* Are all affected areas and files represented?
* Search for related imports, call sites, and feature flags
* Are dependent modules, shared packages, or federation boundaries considered?
* Are the **right** test files and test types named (unit, integration, e2e)?

### 2. Correctness of approach

* Does the plan follow **existing** project patterns?
* Is there a **simpler** path that reuses more of the codebase?
* Does it introduce **avoidable** technical debt or new patterns without justification?

### 3. Risks and edge cases

* What could fail in production or CI?
* Explicitly consider where relevant:

  * Null / empty states
  * Error and loading paths
  * Race conditions and retries
  * Caching (e.g. Apollo) and cache invalidation
  * Module Federation or shared runtime assumptions
  * Security, authz, and PII boundaries

### 4. Assumptions

* List the plan’s **implicit** assumptions
* Rank which are most likely **false** or untested

### 5. Scope

* Is the plan too large for one change? Can it be **split** safely?
* Is anything **missing** for a minimal but complete increment?

---

## Output

### Verdict

**Ready to approve** / **Needs revision** (one line; no hedge words unless truly uncertain)

### Critical issues (must fix)

* Blocking gaps, incorrect approach, or missing work
* Each item: **what’s wrong** + **suggested fix** (plan-level amendment)

### Suggestions (nice-to-have)

* Improvements that are not blocking

### Looks solid

* Specific strengths worth keeping (grounded in the plan or code)

If **Needs revision**, end with a **short amendment checklist** (ordered bullets) the author can apply to the plan.

---

## Heuristics

* Verify claims with Grep/search when cheap; otherwise label as **unverified assumption**
* Prefer **actionable** critique over generic skepticism
* Favor **smaller** revised scope when risk is high
* Mirror the plan’s sections when that improves scannability

## Anti-patterns

* Approving vague plans because they “sound reasonable”
* Nitpicking naming without impact
* Implementing fixes instead of revising the plan
* Critique without a clear **verdict** or **next step**

---

## Output quality bar

A good critique:

* Gives a **clear approve / revise** signal
* Lists **must-fix** items that are **specific** and **ordered** by severity
* Separates **blockers** from **optional** polish
* References **code or tests** when disputing feasibility

---

## Related skills

* **build-plan** (`build-plan.md`) — produce the plan under critique
* **polish** (`polish.md`) — after implementation, quality pass on the diff
* **research** (`research.md`) — deep “how it works” reads without planning deliverables
