# deep-research.md

> Agent skill: Research phase for the learn skill — gather and synthesize knowledge into teaching material

## Purpose

Perform thorough research on a topic using both codebase investigation and web sources. Synthesize findings into structured **teaching material** — not raw data dumps, link lists, or documentation pastes.

## Contract

* **Read-only** — no file writes, edits, or side effects
* Research both **codebase** (for project-specific context) and **web** (for general concepts, authoritative sources)
* Output = structured research notes **ready for teaching**, not a bibliography or link collection
* Findings must be **synthesized** — explain what was found, not just list where it was found

## Inputs

`$ARGUMENTS`

* The topic to research for teaching purposes
* Examples:

  * "research React Server Components for a deep explanation"
  * "gather material on how OAuth2 works across grant types"
  * "investigate how our codebase uses caching and find related best practices"

If missing → ask what the user wants to learn before proceeding

## Allowed Tools

* Read, Glob, Grep
* Bash **read-only** only: `ls`, `cat`, `git log`, `git diff`, `git show`
* WebFetch (for documentation, articles, specifications)
* WebSearch (for finding authoritative sources, common pitfalls, varied perspectives)

## Forbidden

* Write / Edit / MultiEdit / NotebookEdit
* Any bash command that mutates files
* Dumping raw search results without synthesis
* Presenting a link list as the deliverable
* Pasting documentation verbatim — summarize and contextualize

---

## Execution Flow

### 1. Scope

* Restate what the user wants to learn in 1–2 sentences
* Identify the **core concept** and likely **sub-topics** that will need coverage
* If the topic is too broad → suggest a focused starting point and confirm with the user

### 2. Assess Prior Knowledge

* Search the codebase for **existing usage** of the concept or related patterns
* If found → note what the user likely already understands based on their project
* Optionally ask the user about familiarity with prerequisite sub-topics
* This assessment informs what depth and framing the teach phase should use

### 3. Gather — Codebase

* Use Glob / Grep / Read to find:
  * Existing implementations of the concept in the project
  * Related patterns, utilities, or abstractions already in use
  * Configuration that relates to the topic (e.g. tsconfig, webpack, package.json)
  * Tests that demonstrate the concept in action
* Note **how** the codebase uses the concept — this becomes "known code" context for teaching

### 4. Gather — Web

* Search for **authoritative sources**: official documentation, specifications, RFCs, well-known technical blogs
* Look for:
  * Clear conceptual explanations (not just API docs)
  * Common pitfalls and misconceptions documented by practitioners
  * Different perspectives or approaches (if the topic has competing schools of thought)
  * Historical context — why was this created, what problem did it solve, what did it replace?
* Prioritize **depth over quantity** — 3 well-understood sources beat 15 skimmed ones

### 5. Synthesize

Organize findings into a teaching outline:

* **Core concepts** identified with plain-language summaries
* **Prerequisites** the user might need (and whether the codebase suggests they know them)
* **Existing project usage** that can serve as familiar reference points
* **Misconceptions** found in the wild — common mistakes, outdated advice, half-truths
* **Multiple perspectives** — if there are different valid approaches, name them and the trade-offs
* **Knowledge gaps** — areas where research was inconclusive or where authoritative sources disagree

### 6. Hand Off to Teach Phase

* Present the synthesized research notes
* Recommend a **teaching order** — what concept to explain first, what to layer in next
* Flag any **sub-topics** that may need their own deep-research cycle
* If the user's codebase reveals patterns that contradict common advice → flag this as a discussion point

---

## Timebox Rule

If **>15 sources** (files + web pages) consulted without a clear teaching angle:

* Stop
* Summarize what is known so far
* Ask the user to **narrow the focus** or confirm direction
* Do not continue accumulating sources without a clear synthesis path

---

## Output

Deliver structured research notes using this format:

### Research Summary

One paragraph: what was researched, what was found, recommended teaching approach.

### Core Concepts

| Concept | Summary | Confidence |
|---------|---------|------------|
| ... | Plain-language summary | High / Medium / Low |

### Prerequisites

* What the user likely needs to know first
* Which of these the codebase suggests they already understand

### Existing Project Context

* How the codebase already uses related concepts
* Specific files/patterns that can serve as familiar anchor points during teaching

### Common Pitfalls

* Misconceptions found in the wild
* Outdated advice that is still commonly repeated
* Subtle distinctions that people frequently miss

### Perspectives and Trade-offs

* Different valid approaches (if applicable)
* When each approach is appropriate
* What the codebase currently does and why that may or may not be the best choice

### Recommended Teaching Order

Numbered list of concepts in the order they should be explained for maximum understanding.

### Open Areas

* Topics where research was inconclusive
* Areas of genuine debate in the field
* Sub-topics that warrant their own deep-research cycle

---

## Heuristics

* **Synthesize, don't aggregate** — the value is in organizing knowledge for teaching, not collecting it
* **Prefer authoritative sources** — official docs and specs over random blog posts
* **Note contradictions** — if sources disagree, that's valuable teaching material
* **Codebase context is gold** — knowing what the user already works with makes teaching 10x more effective
* **Flag your confidence** — distinguish between well-sourced conclusions and educated guesses

## Anti-Patterns

* Dumping 20 links and calling it research
* Reading only one source and treating it as authoritative
* Skipping codebase investigation when the topic is relevant to the project
* Over-researching without synthesizing — accumulating sources is not the goal
* Treating web results as truth without cross-referencing

---

## Output Quality Bar

Good research notes:

* Can be **handed to the teach phase** and used directly as a teaching outline
* Name **specific concepts** with plain-language summaries, not just topic labels
* Distinguish **what the user likely knows** from **what needs to be taught**
* Surface **misconceptions and pitfalls** proactively — these are high-value teaching moments
* Provide a clear **teaching order** that respects concept dependencies
