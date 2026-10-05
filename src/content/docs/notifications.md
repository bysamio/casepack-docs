---
title: Notifications & Reminders
description: Reminders before NIS2 deadlines, the notification bell, external contacts and workspace settings.
---

Once NIS2 reporting is enabled on an incident, CasePack reminds your team before
each deadline and escalates a deadline that passes without the milestone being
completed. Reminders appear in the app and, where email is set up, by email.

## When Reminders Are Sent

| Deadline | Default reminders |
|----------|-------------------|
| **Early Warning** (24 hours) | 18 and 22 hours after awareness |
| **Full Notification** (72 hours) | 60 and 70 hours after awareness |
| **Final Report** (one month) | 7 days and 1 day before the deadline, once the 72-hour notification is submitted (or, for older incidents, before the estimated deadline; those reminders say "estimated") |

- **Clocks started.** Enabling NIS2 sends one message listing all three deadlines,
  unless reminders are turned off.
- **Missed deadline.** If a deadline passes without the milestone being completed,
  CasePack sends one escalation within 24 hours of the deadline. Escalations also go to
  your account admins.
- **Completed milestones.** Completing a milestone stops its remaining reminders.
- **Moved deadlines.** When a deadline moves, for example when the final report is
  recalculated after the 72-hour notification is submitted, reminders follow the new
  deadline.

Deadlines count from the awareness time you enter when enabling NIS2, so enter when
your team actually became aware of the incident. See [NIS2 Milestones](/milestones/).

## Who Receives Them

- The person who enabled NIS2 on the incident, while they're still a member of the workspace
- The workspace **Owners**
- Confirmed **external contacts** (see below)
- For escalations, also your account's **CasePack Admins**

Nothing is sent while the workspace is read-only or export-only, or when the plan
doesn't include NIS2 milestones.

## The Notification Bell

The bell in the header lists your reminders, escalations and "clocks started"
messages, newest first, and links to any overdue milestones. The badge counts unread
notifications plus overdue milestones, so an overdue deadline stays visible after you've
read everything.

Click a notification to open the incident's milestones; this marks it read. **Mark all
read** clears the unread count. Each person sees only their own notifications.

## Notification Settings

Owners manage reminders under **Notifications** in the sidebar.

### Reminder Schedule

- Turn reminders on or off for the workspace. Turning them back on never sends
  reminders whose time has already passed.
- Change when they fire: up to three times per deadline, in hours after awareness
  (early warning 1–23, notification 1–71) or days before the final report (1–27).
  Leave a field empty for no reminders before that deadline.
- **Use default times** restores the schedule above.

### Email Delivery

- **Send test email** sends a test to you, to check reminders reach your inbox.
- Emails that couldn't be delivered, such as a bounced address, are listed with the
  mail server's reason.
- If email isn't set up, the page says so and reminders appear in the bell only. On a
  self-hosted installation, email is set up by whoever operates CasePack.

### Region

Reminder emails show deadlines in the workspace **time zone**, with UTC alongside.
When the **country** is Germany, they also link to the BSI reporting portal. The time
zone defaults to UTC.

## External Contacts

Owners can add up to 10 people outside CasePack, such as a client's CISO, to receive
reminder emails.

1. Enter the email address and, optionally, a name, then click **Add contact**
2. CasePack emails them a confirmation link, valid for 7 days
3. They receive nothing until they open the link and click **Confirm**

External contacts receive a reference (such as `CP-3F2A91C0`), the deadline and the
workspace name, **never incident details** such as the title. Every email has an
unsubscribe link.

| Status | Meaning |
|--------|---------|
| **Awaiting confirmation** | The link was sent and hasn't been used yet |
| **Link expired** | The link is older than 7 days; use **Resend** |
| **Receiving reminders** | Confirmed |
| **Unsubscribed** | They unsubscribed; remove and add them again to ask once more |

One confirmation email is sent per address per day, including after removing and
re-adding someone.

## Audit Trail

Reminders, escalations, settings changes and contact changes are recorded in the
[Audit Log](/audit-log/).

## Related Features

- [NIS2 Milestones](/milestones/) — Deadlines and submission times
- [Users & Roles](/users-roles/) — Who can change notification settings
- [Licensing & Access States](/licensing-access/) — Read-only and export-only states
