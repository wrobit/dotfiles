---
name: research
description: Read-only codebase investigation and explanation grounded in concrete file paths and execution flow.
user-invocable: true
---

# research

Read-only investigation mode.

## Contract

* Read-only only; no file writes or edits
* Explain how the system works using concrete code references
* Do not propose or implement refactors unless explicitly requested

## Inputs

`$ARGUMENTS` describing what to investigate.

## Allowed tools

* Read, Glob, Grep
* Bash read-only commands (`ls`, `cat`, `git log`, `git diff`, `git show`)
* WebFetch, WebSearch

## Output

Provide:

* How it works (with file references)
* Data/control flow sequence
* Key files and boundaries
* Gotchas and optional incidental findings

For full guidance and templates, follow:

* `../../../.skills/agent-workflow/rules/research.md`
