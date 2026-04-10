# Git Commands Before Reading Code

These commands give a quick diagnostic view of a repository before diving into code.

## What Changes the Most

Find the most frequently changed files in the last year.
```bash
git log --format=format: --name-only --since="1 year ago" | sort | uniq -c | sort -nr | head -20
```

## Who Built This

Rank contributors by commit count.
```bash
git shortlog -sn --no-merges
```

## Where Do Bugs Cluster

Show files touched by commits that look bug-related.
```bash
git log -i -E --grep="fix|bug|broken" --name-only --format='' | sort | uniq -c | sort -nr | head -20
```

## Is This Project Accelerating or Dying

Show commit volume per month.
```bash
git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c
```

## How Often Is the Team Firefighting

List potentially emergency-related commits from the last year.
```bash
git log --oneline --since="1 year ago" | grep -iE 'revert|hotfix|emergency|rollback'
```

