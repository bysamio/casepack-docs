---
title: Licensing & Access States
description: Understand how CasePack enforces subscription plans, feature gates, and access restrictions.
---

CasePack uses a licensing system to control feature availability, user/tenant limits, and access states based on your subscription. The license is validated by the API, and the SPA enforces restrictions in the UI.

## License Fields

Your license includes the following properties:

| Field | Description |
|-------|-------------|
| `plan` | Subscription plan name (e.g., `founding_pilot`, `msp_pro`) |
| `maxTenants` | Maximum number of tenants allowed |
| `maxUsers` | Maximum number of users allowed |
| `features` | List of enabled features |
| `deployment` | `saas` or `self_host` |
| `expiresAt` | License expiration date |
| `graceEndsAt` | End of grace period after expiration |

## Access States

CasePack defines six access states that determine what users can do:

| State | Description | UI Behavior |
|-------|-------------|-------------|
| **Active** | Valid subscription | Full access, no restrictions |
| **Grace** | Subscription expired, within grace period | Full access with warning banner |
| **Read-Only Expired** | Grace period ended | All data visible, no write operations allowed |
| **Export Only** | Limited access for data retrieval | Only evidence pack downloads available |
| **Suspended** | Account suspended by platform | No access, contact support banner |
| **Terminated** | Account permanently terminated | No access, account closed banner |

### Access State Banners

Each non-active state displays a prominent banner:

- **Grace** — Yellow warning: "Your subscription has expired. You have until {date} to renew before access becomes restricted."
- **Read-Only Expired** — Red error: "Your subscription has expired. Your data is preserved but read-only." (Self-host variant: mentions contacting the license provider.)
- **Export Only** — Yellow warning: "Your account is in export-only mode. Download your data before access ends."
- **Suspended** — Red error: "Your account has been suspended. Contact support to resolve this issue."
- **Terminated** — Red error: "Your account has been terminated."

## Feature Gates

Features are controlled by your subscription plan via the `FeatureGate` component:

| Feature Key | Description | Gated UI |
|-------------|-------------|----------|
| `auditLog` | Audit log access | Audit Log sidebar item and page |
| `evidenceVault` | Evidence upload and management | Evidence tab on incident detail |
| `evidencePackExport` | Evidence pack generation | Exports tab on incident detail |
| `webhooks` | Inbound webhook configuration | Webhooks sidebar item and page |
| `nis2Timeline` | NIS2 milestone tracking | Milestones tab, "Enable NIS2 Reporting" action |

When a feature is not included in your plan, the corresponding UI element shows an upgrade prompt instead of the feature content.

## ReadOnlyGuard

The `ReadOnlyGuard` component disables write actions when the subscription is in a restricted state (`Read-Only Expired` or `Export Only`):

- Upload buttons are disabled with a tooltip explaining the restriction
- Create/edit actions are blocked
- Existing data remains fully visible and downloadable

## useAccessState Hook

The `useAccessState` hook provides access state information to components:

| Property | Type | Description |
|----------|------|-------------|
| `isReadOnly` | boolean | True when in Read-Only Expired state |
| `isExportOnly` | boolean | True when in Export Only state |
| `isGrace` | boolean | True when in Grace period |
| `isSelfHost` | boolean | True for self-hosted deployments |
| `isRestricted` | boolean | True when Read-Only or Export-Only |
| `canPerform()` | function | Check if a specific action is allowed |

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
- Feature gates are enforced in the UI but also validated server-side

## Related Features

- [Self-Hosting](/self-hosting/) — Deployment and license configuration
- [Pricing Plans](/pricing-plans/) — Available subscription tiers and features
- [Evidence Pack Export](/evidence-pack-export/) — Exporting data in restricted states
