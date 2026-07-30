---
title: NIS2 Milestones
description: Opt-in NIS2 regulatory deadline tracking per incident.
---

CasePack provides opt-in NIS2 incident reporting milestones. When enabled on an incident, three regulatory deadlines are tracked automatically. This feature helps MSPs demonstrate compliance with NIS2 notification requirements.

## Overview

NIS2 (Network and Information Security Directive 2) requires organizations to report significant incidents within defined timeframes. CasePack tracks three milestones:

| Milestone | Deadline | Purpose |
|-----------|----------|---------|
| **Early Warning** | 24 hours | Initial notification to competent authority |
| **Full Notification** | 72 hours | Detailed status update with initial assessment |
| **Final Report** | One calendar month after the 72-hour incident-notification deadline | Complete incident documentation and analysis |

Deadlines are calculated from the recorded awareness timestamp. CasePack sets
the 24-hour early-warning and 72-hour incident-notification deadlines from that
timestamp, then sets the final-report deadline one calendar month after the
72-hour notification deadline.

This reflects the sequence in
[NIS2 Article 23(4)](https://eur-lex.europa.eu/eli/dir/2022/2555/art_23/oj);
local implementing law,
regulator instructions, incident classification, and the ongoing-incident rule
can affect what must be submitted. CasePack provides workflow assistance, not a
legal determination.

## Enabling NIS2 Tracking

NIS2 milestone tracking is **opt-in per incident** — not all incidents need regulatory reporting.

1. Open the incident detail page
2. Click the **⋯ (More actions)** menu
3. Select **"Enable NIS2 Reporting"**
4. Three milestones are created immediately

> The "Enable NIS2 Reporting" action is only available when the `nis2Timeline` feature is included in your plan. See [Licensing & Access States](/licensing-access/).

## Milestone Status

Each milestone can be in one of three states:

| Status | Description |
|--------|-------------|
| **Pending** | Deadline has not passed, milestone not yet completed |
| **Completed** | Marked as done by a user |
| **Overdue** | Deadline has passed without completion |

### Completing a Milestone

1. Open the incident's **Milestones** tab
2. Click **"Complete"** on a pending milestone
3. A confirmation dialog appears with a notes field (optional)
4. The milestone is marked as completed with the current timestamp

> Milestones cannot be completed in read-only or export-only subscription states. See [Licensing & Access States](/licensing-access/).

## Overdue Milestones

The sidebar shows an **Overdue Milestones** page link with a badge count of overdue items across all incidents.

The Overdue Milestones page:
- Lists all overdue milestones across all incidents in the tenant
- Shows milestone type, incident title, deadline, and how overdue it is
- Click any row to navigate to the incident detail page

## Milestone Cards

On the incident detail Milestones tab, each milestone shows:

- **Milestone name** (Early Warning, Full Notification, Final Report)
- **Deadline** — Date and time, with "overdue" badge if past due
- **Status** — Pending, Completed, or Overdue
- **Completed at** — Timestamp and user who completed it (if applicable)
- **Notes** — Optional notes provided on completion

## Tips & Best Practices

- Enable NIS2 reporting only for incidents that require regulatory notification
- Complete the Early Warning milestone first — it has the tightest deadline
- Add notes when completing milestones to document what was communicated
- Check the Overdue Milestones page daily to avoid missing deadlines
- All milestones are included in evidence pack exports

## Related Features

- [Incidents](/incidents/) — Enabling milestones on incidents
- [Evidence Pack Export](/evidence-pack-export/) — Milestones included in exports
- [Dashboard](/dashboard/) — Overdue count visible in sidebar
