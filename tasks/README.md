# Tasks

Each folder holds the plan and checklist for one piece of agent work:

```
tasks/
  <name>/      what the work is, in a few kebab-case words, e.g. notifications-page
    plan.md    what and why, approach, risks, verification
    todo.md    the checklist, with a Status line under the title
```

## Following progress

Open `tasks/<name>/todo.md`. Its `Status:` line says `Active`, `Paused` or `Complete`, and each box is ticked as that step finishes. To list the work in progress:

```bash
grep -l '^Status: Active' tasks/*/todo.md
```

Work happens on a branch, so until it merges, the latest `todo.md` is on that branch: in your checkout while the agent works there, or in the pull request.

## Rules for agents

See "Plans and task lists" in [AGENTS.md](../AGENTS.md#plans-and-task-lists).
