---
name: research
description: Read-only codebase investigation and explanation grounded in concrete file paths and execution flow.
user-invocable: true
license: MIT
metadata:
  version: "1.0.0"
  user-invocable: true
---

# research

Read-only investigation mode.

## Contract

* Read-only only; no file writes or edits
* Explain how the system works using concrete code references
* Do not propose or implement refactors unless explicitly requested

## When to Apply

* User asks "how does X work?" about a specific system or flow in the codebase
* User needs to understand code architecture, data flow, or component relationships before making changes
* User wants an investigation or audit of a specific area

## When NOT to Apply

* User wants to **learn a general concept** (not codebase-specific) — use `learn`
* User wants to **implement or fix** something — use `agent-workflow`
* User wants a **plan** for a change — use `build-plan`

## Inputs

`$ARGUMENTS` describing what to investigate.

## Examples

* "Research how the auth flow works in mfe-settings"
* "Investigate the Apollo cache configuration and how it's used"
* "Trace the federated module runtime loading path"

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

* `../agent-workflow/rules/research.md`
