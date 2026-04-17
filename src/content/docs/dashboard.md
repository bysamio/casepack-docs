---
title: Dashboard
description: Your real-time overview of incident status, evidence activity, and quick-access playbooks.
---

The Dashboard is the first screen you see after signing in. It provides a consolidated view of your incident management workflow in the current tenant.

## KPI Cards

Four key performance indicators at the top of the page:

| KPI | Description |
|-----|-------------|
| **Open Incidents** | Count of incidents in "Open" status |
| **In Progress** | Incidents currently in "In Progress" status |
| **Closed (30d)** | Incidents closed or resolved in the last 30 days |
| **Evidence Items** | Total artifacts uploaded to active incidents |

Each card shows a delta chip when available (e.g., "+3" or "-1" compared to the previous period).

## Recent Incidents

A searchable, filterable table of all incidents in the tenant:

- **Search** — Filter by title or ID
- **Status chips** — Filter by All, Open, In Progress, Closed, Resolved
- **Table columns** — ID (truncated), Title, Status badge, Severity badge, Created (relative time)
- **Click any row** to jump to the incident detail page

Empty state: *"No incidents yet — Start tracking security incidents by creating your first one."* with a **"Create your first incident"** button.

## Evidence Activity

A timeline of the most recent evidence uploads from active incidents:

- Shows filename, uploaded by, and relative timestamp
- Up to 10 items from the 3 most recent non-closed incidents

Empty state: *"No evidence uploaded yet"*

## Playbooks

Quick-access runbook templates for common incident scenarios:

- **Ransomware Response Runbook**
- **Phishing Investigation Guide**
- **Data Breach Notification**
- **Endpoint Isolation Playbook**

> Playbooks are currently static reference links.

## Quick Actions

- **Cmd+I** — Create a new incident immediately
- **Cmd+K** — Open the command palette to search incidents and navigate pages
- **"New Incident"** — Button in the header

## Layout

On large screens, the dashboard uses a 3-column grid:
- Left two-thirds: KPI Cards + Recent Incidents
- Right third: Evidence Activity + Playbooks

## Tips & Best Practices

- Check the Dashboard daily to catch overdue milestones early
- The overdue count badge in the sidebar is always visible
- Use the command palette (`Cmd+K`) for the fastest navigation

## Related Features

- [Incidents](/incidents/) — Creating and managing incidents
- [Milestones](/milestones/) — Deadline tracking
- [Keyboard Shortcuts](/keyboard-shortcuts/)
