---
title: Licensing & Access States
description: Understand plan limits, feature availability, and restricted account states.
---

CasePack uses your active plan to determine tenant limits, user limits, available features, deployment mode, and access state. Most teams will only notice this when a feature is not included in their plan or when a subscription needs renewal.

## What Your Plan Controls

| Area | What it affects |
|------|-----------------|
| Tenant workspaces | How many tenant workspaces your account can use |
| Users | How many people can be invited to CasePack |
| Feature availability | Which incident, evidence, export, audit, webhook, and reporting features are available |
| Deployment model | Hosted, self-hosted, or enterprise deployment terms |
| Access state | Whether the account has full access, renewal warnings, read-only access, export-only access, or suspended access |

If your account reaches a tenant or user limit, CasePack shows the limit in context so an administrator can remove unused access or upgrade the plan.

## Access States

CasePack defines six access states that determine what users can do in the app:

| State | Description | UI Behavior |
|-------|-------------|-------------|
| **Active** | Valid subscription | Full access, no restrictions |
| **Grace** | Subscription expired, within grace period | Full access with warning banner |
| **Read-Only Expired** | Grace period ended | Read pages remain visible; create, update, delete, upload, and generation actions are blocked |
| **Export Only** | Limited access for data retrieval | Only existing evidence/export downloads and billing remain available |
| **Suspended** | Account suspended | No access, contact support banner |
| **Terminated** | Account permanently terminated | No access, account closed banner |

### Access State Banners

Each non-active state displays a prominent banner so users understand what changed:

- **Grace** — Yellow warning that the subscription or license is overdue and full access will become read-only if not renewed.
- **Read-Only Expired** — Red error that the workspace or instance is in read-only mode and renewal restores full access.
- **Export Only** — Red error that only existing exports and evidence can be downloaded.
- **Suspended** — Red error: "Your account has been suspended. Contact support to resolve this issue."
- **Terminated** — Red error: "Your account has been terminated."

## Feature Availability

Some features may depend on the active plan:

| Feature | What it enables |
|---------|-----------------|
| Audit Log | Tenant-level activity history |
| Evidence Vault | Evidence upload and management on incidents |
| Evidence Pack Export | PDF and ZIP export generation |
| Webhooks | Incident intake from PSA and ticketing tools |
| NIS2 Milestones | NIS2-aligned incident milestone tracking |
| Incident Timeline | Structured event timeline on incidents |
| Incident Reports | Incident report drafting and publishing |

When a feature is not included in your plan, CasePack shows an upgrade prompt instead of the feature content.

## Restricted States

Restricted access states protect your data while limiting changes:

- **Read-Only Expired** still allows read access. Users can view incidents, evidence lists, webhook delivery history, milestones, reports, timeline events, and audit logs when their role and plan allow it.
- Write actions are blocked in read-only mode, including creating incidents, editing incident fields, uploading or deleting evidence, completing milestones, managing webhooks, generating exports or reports, and changing tenant/user settings.
- Existing evidence files and completed exports remain downloadable in read-only mode.
- **Export Only** blocks the normal workspace pages and keeps only existing evidence/export downloads and renewal or billing actions available.
- Suspended and terminated accounts do not allow operational workspace access.

## API Behavior

Authenticated tenant and customer API requests follow the same rules:

- `GET`, `HEAD`, and `OPTIONS` requests are allowed in **Read-Only Expired** when the user's role and plan permit the resource.
- `POST`, `PUT`, `PATCH`, and `DELETE` requests in **Read-Only Expired** return `403 Forbidden` with `errorCode: "license_read_only"`.
- **Export Only** allows only existing evidence/export download requests. Other operational requests return `403 Forbidden` with `errorCode: "license_export_only"`.

Restricted license responses include the current state and remaining allowed actions:

```json
{
  "status": 403,
  "error": "Forbidden",
  "errorCode": "license_read_only",
  "message": "Your subscription has expired. Data is read-only until you renew.",
  "state": "READ_ONLY_EXPIRED",
  "allowedActions": [
    "read_data",
    "download_exports",
    "view_audit_log",
    "manage_billing"
  ],
  "correlationId": "..."
}
```

## Export Data Page

When in **Export Only** state, users are redirected to a dedicated Export Data page:

- Lists all existing evidence pack exports across incidents
- Download buttons for existing exports and evidence remain functional
- No new incidents, evidence, or exports can be created
- Banner explains the restriction and how to restore full access

## Tips & Best Practices

- Monitor your license expiration date to avoid unexpected restrictions
- During the grace period, all features work normally — use this time to renew
- In export-only mode, download all evidence packs before the access window closes
- Contact your CasePack administrator or support contact if an expected feature is unavailable

## Related Features

- [Self-Hosting](/self-hosting/) — Deployment and license configuration
- [Pricing Plans](/pricing-plans/) — Available subscription tiers and features
- [Evidence Pack Export](/evidence-pack-export/) — Exporting data in restricted states
