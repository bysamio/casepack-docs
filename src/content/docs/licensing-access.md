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
| **Read-Only Expired** | Grace period ended | All data visible, no write operations allowed |
| **Export Only** | Limited access for data retrieval | Only evidence pack downloads available |
| **Suspended** | Account suspended | No access, contact support banner |
| **Terminated** | Account permanently terminated | No access, account closed banner |

### Access State Banners

Each non-active state displays a prominent banner so users understand what changed:

- **Grace** — Yellow warning: "Your subscription has expired. You have until {date} to renew before access becomes restricted."
- **Read-Only Expired** — Red error: "Your subscription has expired. Your data is preserved but read-only."
- **Export Only** — Yellow warning: "Your account is in export-only mode. Download your data before access ends."
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

- Upload buttons are disabled with a tooltip explaining the restriction
- Create/edit actions are blocked
- Existing data remains fully visible and downloadable

## Export Data Page

When in **Export Only** state, users are redirected to a dedicated Export Data page:

- Lists all existing evidence pack exports across incidents
- Download buttons remain functional
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
