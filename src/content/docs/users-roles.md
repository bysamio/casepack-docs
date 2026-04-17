---
title: Users & Roles
description: Two-tier role system with tenant-level and account-level roles.
---

CasePack uses a two-tier role system: **tenant roles** (within a single tenant) and **account roles** (platform-wide). Together, they control what users can see and do.

## Tenant Roles

Tenant roles control what a user can do within a specific tenant. Users can have different roles in different tenants.

| Role | Description |
|------|-------------|
| **Owner** | Full access. Manage users, webhooks, audit log. One per tenant. |
| **Admin** | Full access except transferring ownership. Manage webhooks, audit log. |
| **Analyst** | Create incidents, upload evidence, complete milestones. No admin access. |
| **Viewer** | Read-only. Can view incidents and evidence but not modify anything. |

### Role Capabilities

| Action | Owner | Admin | Analyst | Viewer |
|--------|-------|-------|---------|--------|
| View incidents | ✓ | ✓ | ✓ | ✓ |
| Create incidents | ✓ | ✓ | ✓ | — |
| Edit incidents | ✓ | ✓ | ✓ | — |
| Upload evidence | ✓ | ✓ | ✓ | — |
| Delete evidence | ✓ | ✓ | ✓ | — |
| Complete milestones | ✓ | ✓ | ✓ | — |
| Request exports | ✓ | ✓ | ✓ | — |
| Manage webhooks | ✓ | ✓ | — | — |
| View audit log | ✓ | ✓ | — | — |
| Manage tenant users | ✓ | ✓ | — | — |
| Transfer ownership | ✓ | — | — | — |

## Account Roles

Account roles control platform-wide capabilities and are assigned by a CasePack administrator.

| Role | Description |
|------|-------------|
| **Super Admin** | Full platform access. Manage all tenants, users, customers, and license config. |
| **CasePack Admin** | Manage tenants and account users. Cannot manage customers or license config. |
| **User** | Standard user. Access only to tenants where assigned a tenant role. |

### Account Role Capabilities

| Action | Super Admin | CasePack Admin | User |
|--------|-------------|----------------|------|
| View all tenants | ✓ | ✓ | — |
| Create tenants | ✓ | ✓ | — |
| Delete tenants | ✓ | ✓ | — |
| Manage account users | ✓ | ✓ | — |
| Manage customers | ✓ | — | — |
| View license info | ✓ | — | — |
| Access assigned tenants | ✓ | ✓ | ✓ |

## User Management (Tenant Level)

Owners and Admins can manage users within a tenant:

1. Open the **Users** section (visible to Owner/Admin)
2. **Invite** — Add a user by email with a selected role
3. **Change role** — Update a user's tenant role
4. **Remove** — Remove a user from the tenant

> Removing a user from a tenant does not delete their account — it only revokes their access to that tenant.

## User Management (Account Level)

CasePack Admins and Super Admins can manage users at the platform level:

1. Navigate to **Account Users** (sidebar, visible to CasePack Admin+)
2. View all users in the platform with their account role
3. Change account roles or remove users

## Tenant Switching

Users with access to multiple tenants see a **tenant switcher** in the sidebar:
- Displays the current tenant name
- Click to switch between tenants
- Each tenant has independent incidents, evidence, and configurations

## Tips & Best Practices

- Use the **Analyst** role for most team members — it covers day-to-day incident response
- Reserve **Admin** for team leads who need webhook and audit log access
- **Viewer** is ideal for stakeholders who need visibility without write access
- Review tenant user lists periodically to remove inactive users

## Related Features

- [Audit Log](/audit-log/) — All user management actions are logged
- [Admin: Tenants](/admin-tenants/) — Platform-level tenant management
- [Admin: Customers](/admin-customers/) — Customer management (Super Admin)
