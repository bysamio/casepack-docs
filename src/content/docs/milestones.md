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
| **Final Report** | One calendar month after the 72-hour notification was **submitted** | Complete incident documentation and analysis |

The 24-hour and 72-hour deadlines run from the recorded awareness timestamp.
The final report runs from when you actually submitted the 72-hour
notification: if you file it at hour 20, the final report is due one calendar
month after hour 20, not after the 72-hour deadline.

Until the 72-hour notification is completed, CasePack shows the final-report
date as **"at the latest"**: one month after the 72-hour deadline, the latest
it can be. If the 72-hour deadline passes without a submission, the card shows
no date, because the final report is due one month after whenever the
notification is eventually submitted.

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

Tenant Owners complete milestones.

1. Open the incident's **Milestones** tab
2. Click **"Mark Complete"** on a pending milestone
3. Enter when the report **reached the authority** (defaults to now). Use the
   time on the authority's receipt if you have one; it can't be before the
   awareness time or in the future
4. Add optional notes and confirm

For the 72-hour notification, the dialog shows the final-report deadline the
submission time produces before you confirm. CasePack records both the
submission time and when the milestone was marked complete.

> Milestones cannot be completed in read-only or export-only subscription states. See [Licensing & Access States](/licensing-access/).

### Correcting a Submission Time

A mistyped submission time can be corrected by a tenant Owner:

1. On a completed milestone, click **"Correct submission time"**
2. Enter the correct time and a **reason** (required), such as "BSI portal
   receipt shows 16:00 CET"
3. Save

The old time, new time, reason, who made the change, and when are recorded in
the [Audit Log](/audit-log/), and the milestone shows **Corrected**.
Correcting the 72-hour notification moves the final-report deadline, even if
the final report is already complete, so the record shows whether it was filed
on time.

Milestones completed before submission times were recorded show **"Submission
time not recorded"**. Owners can click **"Enter submission time"** to add it;
this is recorded as a correction.

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
- **Submitted to the authority** — When the report was submitted, and whether it was corrected
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
