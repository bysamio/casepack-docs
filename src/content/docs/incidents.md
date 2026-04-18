---
title: Incidents
description: Create, manage, and track security incidents across your tenant.
---

Incidents are the core unit of work in CasePack. Each incident represents a security event that needs documentation, evidence collection, and reporting. Incidents are scoped to the current tenant.

## Creating an Incident

1. Click **"New Incident"** in the header or press **Cmd+I**
2. Fill in the form:
   - **Title** — Concise, descriptive name (e.g., "Phishing campaign targeting finance team")
   - **Severity** — Low, Medium, High, or Critical
   - **Description** — Initial details, IOCs, or ticket reference (optional)
3. Click **"Create Incident"**

The incident is created with status **Open**.

> The "New Incident" button is disabled when your subscription is in read-only or export-only mode. See [Licensing & Access States](/licensing-access/).

## Incident List

The incident list shows all incidents for the current tenant with rich filtering:

- **Status chips** — Filter by All, Open, In Progress, Closed, Resolved (with count badges)
- **Search** — Filter by title, ID, or reported-by (`/` focuses the search field)
- **Time filter** — All time, Last 24 hours, Last 7 days, Last 30 days
- **Columns** — Title (with truncated ID prefix), Status, Created, Evidence count, Last activity

**Keyboard shortcuts on this page:**
- `N` — Navigate to create new incident
- `/` — Focus the search input

**Sidebar:** On large screens, a sidebar shows Triage Tips and an Export Card.

## Incident Detail

Click any incident to view its detail page with editable fields and tabbed sections.

### Editable Fields
- **Title** — Click to edit inline (max 255 characters). Confirm with Enter, cancel with Escape.
- **Description** — Click to edit inline (max 4000 characters). Save/Cancel buttons.
- **Severity** — Inline dropdown: Low, Medium, High, Critical.
- **Status** — Dropdown: Open, In Progress, Resolved, Closed.

### Metadata Cards
- **Created** — Relative and absolute timestamp
- **Reported by** — The user who created the incident (or "Unknown")
- **Severity** — Current severity with inline edit

### Tabs

| Tab | Feature Gate | Content |
|-----|-------------|---------|
| **Evidence** | `evidenceVault` | Upload and manage evidence files |
| **NIS2 Milestones** | `nis2Timeline` | NIS2 reporting milestones (opt-in) |
| **Reports** | `incidentReports` | Generate structured reports from templates |
| **Exports** | `evidencePackExport` | Generate and download evidence packs |
| **Timeline** | `incidentReports` | Chronological event feed with CRUD |

Each tab shows a badge with the item count. The Milestones tab shows an overdue count badge in red when applicable.

> Tabs for features not included in your plan show an upgrade prompt. See [Licensing & Access States](/licensing-access/).

### More Actions (⋯ Menu)
- **Enable NIS2 Reporting** — Opt-in to NIS2 milestone tracking for this incident (requires `nis2Timeline` feature)
- **Delete Incident** — Soft-deletes the incident (data can be recovered)

### Evidence Upload Shortcut
**Ctrl+U** / **Cmd+U** — Opens the file picker to upload evidence directly from the detail page.

## Status Workflow

```
Open → In Progress → Resolved → Closed
```

- **Open** — New incident, not yet triaged
- **In Progress** — Team is actively documenting and collecting evidence
- **Resolved** — Investigation complete, awaiting final review
- **Closed** — Fully documented and archived

All four statuses are available from the status dropdown — transitions are not restricted.

## Tips & Best Practices

- Use consistent naming conventions for incident titles
- Add a description referencing the PSA ticket ID for cross-reference
- Upload evidence early and often — don't wait until the end
- Use `N` on the incident list and `Ctrl+U` on the detail page for speed

## Related Features

- [Evidence](/evidence/) — Uploading and managing artifacts
- [Milestones](/milestones/) — Deadline tracking
- [Incident Reports](/incident-reports/) — Generating structured reports from templates
- [Evidence Pack Export](/evidence-pack-export/)
