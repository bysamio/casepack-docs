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
notification is eventually submitted. The final report is never marked overdue
in that state; the overdue 72-hour notification is what needs attention.

This reflects the sequence in
[NIS2 Article 23(4)](https://eur-lex.europa.eu/eli/dir/2022/2555/art_23/oj);
local implementing law,
regulator instructions, incident classification, and the ongoing-incident rule
can affect what must be submitted. CasePack provides workflow assistance, not a
legal determination.

## Enabling NIS2 Tracking

NIS2 milestone tracking is **opt-in per incident** — not all incidents need regulatory reporting.

1. Open the incident detail page
2. Click the **⋯ (More actions)** menu, or open the **Milestones** tab
3. Select **"Enable NIS2 Reporting"**
4. Enter when your team **became aware** of the incident. It defaults to now;
   change it if you became aware earlier. It can't be in the future or more than
   a year ago. The dialog previews the 24-hour and 72-hour deadlines and flags any
   that have already passed
5. Confirm. Three milestones are created and
   [deadline reminders](/notifications/) start

Tenant Owners enable NIS2 reporting.

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

Until then, the final-report deadline for such an incident is an **estimate**:
one month after the earlier of when the 72-hour report was marked complete and
its deadline. The card labels it **(estimated)**, and the export records its
basis as `ESTIMATED_FROM_COMPLETION`. Entering the 72-hour report's submission
time replaces the estimate with the exact date.

## Deadline Reminders

CasePack reminds the person who enabled NIS2 and the workspace Owners before each
deadline (by default 18 and 22 hours after awareness for the early warning, 60 and
70 hours for the notification, and 7 days and 1 day before the final report), and
escalates a missed deadline once. Reminders appear in the notification bell and,
where email is set up, by email. See [Notifications & Reminders](/notifications/).

## Overdue Milestones

The sidebar shows an **Overdue Milestones** page link with a badge count of overdue items across all incidents.

The Overdue Milestones page:
- Lists all overdue milestones across all incidents in the tenant (a final report
  still waiting for the 72-hour submission is not listed, because its deadline
  hasn't started yet)
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
- Enter the real awareness time when enabling NIS2; deadlines and reminders count from it
- Watch the notification bell and the Overdue Milestones page for approaching deadlines
- All milestones are included in evidence pack exports

## Related Features

- [Incidents](/incidents/) — Enabling milestones on incidents
- [Evidence Pack Export](/evidence-pack-export/) — Milestones included in exports
- [Dashboard](/dashboard/) — Overdue count visible in sidebar
- [Notifications & Reminders](/notifications/) — Reminder schedule, bell and external contacts
