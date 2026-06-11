---
title: "Admin: Tenants"
description: Account-level tenant workspace management for CasePack Admins.
---

The Tenants page lets CasePack Admins create and maintain isolated tenant workspaces. Each tenant has its own incidents, evidence, reports, timeline events, webhooks, audit log, and user memberships.

## Overview

- Accessible to **CasePack Admin** users
- Found in the **Tenants** sidebar item under Administration
- Tenant creation is limited by the active plan
- Each tenant is a separate operational workspace for incident response

## Tenant List

The tenant list shows tenants available to the admin:

| Column | Description |
|--------|-------------|
| **Tenant** | Tenant display name |
| **Tenant ID** | Copyable tenant identifier |
| **Created** | When the tenant was created |

You can search tenants by name or ID.

### Tenant Limit Enforcement

The page displays the current tenant count against the plan limit, for example `3 / 10 tenants`.

When the tenant limit is reached:

- A warning banner is shown
- The **Create Tenant** button is disabled
- Existing tenants remain accessible

## Creating a Tenant

1. Navigate to **Tenants**
2. Click **Create Tenant**
3. Enter a tenant **Name**
4. Click **Create Tenant**

The new tenant starts empty. You can then switch into it and create incidents, evidence, webhooks, and users as needed.

## Tenant Detail

Click a tenant row to view:

| Field | Description |
|-------|-------------|
| **Name** | Editable display name |
| **Tenant ID** | Copyable unique identifier |
| **S3 Bucket** | Tenant bucket name, or "Shared bucket (default)" |
| **Created** | Creation timestamp |

The tenant detail page supports renaming tenants and copying tenant identifiers.

## Switching Tenants

The tenant switcher is available to any user who has access to more than one tenant.

1. Open the tenant switcher in the app header
2. Select the tenant workspace
3. Tenant-scoped data refreshes for the selected tenant

Users see only tenants assigned to them, while CasePack Admins can manage tenant workspaces for their account.

## First-Time Setup

When a CasePack Admin signs in and no tenant exists yet, the app redirects to **Create First Tenant**. After the first tenant is created, the user lands on the Dashboard.

## Tips & Best Practices

- Name tenants after the workspace or client environment they represent
- Create separate tenants for distinct data boundaries
- Monitor tenant count against the plan limit before onboarding new workspaces
- Assign users from **Account Users** when they need tenant access

## Related Features

- [Users & Roles](/users-roles/) — Account users and tenant memberships
- [Licensing & Access States](/licensing-access/) — Tenant limits and restricted states
