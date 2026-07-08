---
title: Audit Log
description: Immutable record of every significant action in your tenant.
---

The Audit Log provides a searchable, read-only timeline of all significant actions within a tenant. Every create, update, and delete operation is recorded automatically by the API.

## Overview

- Audit logs are **tenant-scoped** — you see actions in the current tenant only
- The log is **immutable** — entries cannot be modified or deleted
- Requires **Owner** or **Admin** tenant role to view
- Gated by the `auditLog` feature

> If your plan doesn't include Audit Log access, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

## Viewing the Audit Log

1. Navigate to **Audit Log** in the sidebar
2. Browse entries in reverse chronological order (newest first)

### Columns

| Column | Description |
|--------|-------------|
| **Timestamp** | When the action occurred |
| **User** | Who performed the action (email or "system") |
| **Action** | What was done (e.g., `INCIDENT_CREATED`, `EVIDENCE_FINALIZED`) |
| **Resource** | What was affected (e.g., incident title, evidence filename) |

### Filtering

- **Search** — Filter by action type, user, or resource name
- **Pagination** — Navigate through pages of entries (25 per page)

## Tracked Actions

| Action | Description |
|--------|-------------|
| `INCIDENT_CREATED` | New incident created |
| `INCIDENT_UPDATED` | Incident fields changed (title, severity, status, description) |
| `INCIDENT_DELETED` | Incident soft-deleted |
| `EVIDENCE_INIT` | Evidence upload initialized |
| `EVIDENCE_FINALIZED` | Evidence file uploaded |
| `EVIDENCE_DOWNLOADED` | Evidence file downloaded |
| `EVIDENCE_DELETED` | Evidence file removed |
| `EVIDENCE_PACK_EXPORTED` | Evidence pack generated |
| `INCIDENT_CREATED_VIA_WEBHOOK` | Webhook delivery created an incident |
| `WEBHOOK_CREATED` | Webhook endpoint added |
| `WEBHOOK_DISABLED` | Webhook endpoint disabled |
| `NIS2_ENABLED` | NIS2 reporting enabled for an incident |
| `MILESTONE_CREATED` | NIS2 milestone created |
| `MILESTONE_COMPLETED` | NIS2 milestone marked as done |
| `TIMELINE_EVENT_CREATED` | Timeline event added |
| `TIMELINE_EVENT_UPDATED` | Timeline event changed |
| `TIMELINE_EVENT_DELETED` | Timeline event deleted |
| `REPORT_GENERATED` | Incident report generated |

## Audit Log in Evidence Packs

Audit log entries related to an incident are included in evidence pack exports (both PDF and ZIP formats), providing a tamper-evident trail for auditors.

## Tips & Best Practices

- Review the audit log regularly for unexpected activity
- Use the audit log to verify incident timelines during post-mortems
- All entries include the authenticated user — useful for accountability
- Export evidence packs to get a snapshot of audit entries for a specific incident
- The audit log is your compliance safety net — it's always recording

## Related Features

- [Evidence Pack Export](/evidence-pack-export/) — Audit entries included in exports
- [Users & Roles](/users-roles/) — Access to audit log is role-restricted
- [Incidents](/incidents/) — All incident actions are tracked
