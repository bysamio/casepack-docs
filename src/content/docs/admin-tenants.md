---
title: "Admin: Tenants"
description: Platform-level tenant management for CasePack Admins and Super Admins.
---

The Tenants page lets CasePack Admins and Super Admins manage all tenants on the platform — create new workspaces, assign customers, and manage tenant settings.

## Overview

- Accessible to **CasePack Admin** and **Super Admin** account roles only
- Found in the **Tenants** sidebar item (under Administration)
- Each tenant is an isolated workspace with its own incidents, evidence, users, and webhooks

## Tenant List

The tenant list shows all tenants on the platform:

| Column | Description |
|--------|-------------|
| **Name** | Tenant display name |
| **Customer** | Assigned customer (if any) |
| **Users** | Number of users in the tenant |
| **Created** | When the tenant was created |

## Creating a Tenant

1. Navigate to **Tenants**
2. Click **"Create Tenant"**
3. Fill in:
   - **Name** — Display name for the tenant
   - **Customer** — (Optional) Assign to a customer
4. Click **"Create"**

> Tenant creation is subject to your license limits. If you've reached the maximum tenant count, you'll see a limit warning. See [Licensing & Access States](/licensing-access/).

## Tenant Settings

Click a tenant to view its details:

- **Rename** — Edit the tenant display name
- **Customer assignment** — Link or unlink a customer
- **User list** — View and manage users in this tenant
- **Delete** — Permanently remove the tenant and all its data

> **Caution:** Deleting a tenant is permanent. All incidents, evidence, and audit logs in that tenant are removed.

## Customer Assignment

Tenants can be linked to a [Customer](/admin-customers/):
- One customer can have multiple tenants
- Customer association helps organize tenants for MSP workflows
- Customer billing metadata is managed on the Customers page

## Tips & Best Practices

- Use a naming convention for tenants (e.g., `{customer}-{environment}`)
- Assign customers to tenants for easier organization and filtering
- Review tenant user lists periodically
- Monitor tenant counts against your license limit

## Related Features

- [Users & Roles](/users-roles/) — Managing users within tenants
- [Admin: Customers](/admin-customers/) — Customer management
- [Licensing & Access States](/licensing-access/) — Tenant count limits
