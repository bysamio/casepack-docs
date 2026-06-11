---
title: Incident Timeline
description: Build a chronological record of events, actions, and notes during an incident.
---

The Incident Timeline gives you a chronological event feed for each incident — capturing what happened, when, and by whom. Use it to record containment actions, recovery steps, notes, and key events throughout the incident lifecycle.

> If your plan doesn't include the Timeline tab, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

## Accessing the Timeline

1. Open an incident detail page
2. Click the **Timeline** tab

## Event Categories

Each timeline event is tagged with a category:

| Category | Icon | Purpose |
|----------|------|---------|
| **Event** | ⚡ | Key incident events (detection, escalation, alerts) |
| **Containment** | 🛡 | Actions taken to limit the incident's spread |
| **Eradication** | 🔧 | Steps to remove the root cause |
| **Recovery** | ⚠ | Restoration of affected systems and services |
| **Note** | 💬 | General observations, context, or handoff notes |

## Adding an Event

1. Click **Add Event** in the Timeline tab header
2. Fill in the form:
   - **Title** — What happened (required, max 255 characters)
   - **Category** — Select the event type
   - **Occurred at** — When the event happened (defaults to now)
   - **Actor** — Who performed the action (e.g., `jane.security`)
   - **Description** — Additional details (optional, max 4000 characters)
3. Click **Add Event** to save

New events appear in chronological order on the timeline.

> The Add Event button is hidden for users with Viewer role. See [Users & Roles](/users-roles/).

## Editing an Event

1. Click the **edit icon** (pencil) on any event
2. The event row switches to an inline edit form
3. Modify the fields and click **Save**, or click **Cancel** to discard

## Deleting an Event

1. Click the **delete icon** (trash) on any event
2. A confirmation dialog appears
3. Click **Delete** to permanently remove the event

:::caution
Deleted events cannot be recovered. This action is audited.
:::

## Filtering by Category

Filter chips appear above the timeline when events are present:

- **All** — Show all events
- **Event** / **Containment** / **Eradication** / **Recovery** / **Note** — Show only that category

Click a chip to filter, click again to clear. Filtering is server-side — only matching events are fetched.

## Pagination

The timeline displays **25 events per page**. When there are more events, pagination controls appear at the bottom:

- **Previous** / **Next** buttons navigate between pages
- A summary shows the current page, total pages, and total event count

Filtering by category resets to page 1.

## Timeline in Reports

Timeline events feed directly into report templates:

- **Initial Triage Report** — Includes early events and containment actions
- **Final Evidence Pack** — Full timeline with all categories
- **NIS2 Notification** — Timeline events relevant to regulatory milestones

See [Incident Reports](/incident-reports/) for details on report generation.
