---
title: Users & Roles
description: Account users, tenant memberships, and role-based access in CasePack.
---

CasePack uses account roles and tenant memberships together. Account roles decide what a person can administer across the account; tenant memberships decide what they can do inside a specific tenant workspace.

## Account Roles

Account roles are managed from **Account Users** by CasePack Admins.

| Role | Description |
|------|-------------|
| **CasePack Admin** | Account administrator. Can create tenants and manage account users. Admins are attached as Owner to tenant workspaces. |
| **User** | Standard user. Can access only tenants explicitly assigned to them. |

### Account Role Capabilities

| Action | CasePack Admin | User |
|--------|----------------|------|
| Access assigned tenants | ✓ | ✓ |
| Create tenants | ✓ | — |
| View tenant admin list | ✓ | — |
| Manage account users | ✓ | — |

## Tenant Roles

Tenant roles control access within a single tenant. A user can have different tenant roles across different tenant workspaces.

| Role | Description |
|------|-------------|
| **OWNER** | Full tenant control. Can manage users, roles, and tenant data. |
| **MEMBER** | Read/write access for day-to-day incident response work. |
| **VIEWER** | Read-only access to tenant data. |

### Tenant Role Capabilities

| Action | OWNER | MEMBER | VIEWER |
|--------|-------|--------|--------|
| View incidents and evidence | ✓ | ✓ | ✓ |
| Create and edit incidents | ✓ | ✓ | — |
| Upload and delete evidence | ✓ | ✓ | — |
| Add and edit timeline events | ✓ | ✓ | — |
| Complete milestones | ✓ | ✓ | — |
| Request exports and reports | ✓ | ✓ | — |
| Manage webhooks | ✓ | — | — |
| View audit log | ✓ | — | — |
| Change tenant roles | ✓ | — | — |

CasePack Admins can manage users for the account even when they are not acting as the Owner of a specific tenant.

## Team Members Page

Navigate to **Users** to view users in the current tenant.

The page shows:

- User display name and email
- Tenant membership role
- Disabled status when applicable
- Active user count against the license limit
- A **Show disabled users** toggle

### Changing Tenant Roles

Users with permission can change non-owner tenant users between **MEMBER** and **VIEWER** from the role dropdown.

Current restrictions:

- Owner rows are not demoted from this page
- Disabled users cannot have their tenant role changed
- Creating users happens from **Account Users**, not from the tenant Users page

## Account Users Page

CasePack Admins use **Account Users** to create and manage users across all tenants in the account.

### Creating a User

1. Navigate to **Account Users**
2. Click **Create User**
3. Enter:
   - **Email**
   - **First name** and **Last name** (optional)
   - **Account role** — User or Admin
4. For standard Users, select at least one tenant
5. Choose the membership role for the selected tenants: **OWNER**, **MEMBER**, or **VIEWER**
6. Click **Create User**

New users receive a login/action email from the identity provider. CasePack does not show or manage temporary passwords in the app.

### Managing Existing Account Users

From Account Users you can:

- Search users by email or name
- Show or hide disabled users
- Change account role
- Disable a user
- Re-enable a disabled user

Admins are attached as Owner to tenant workspaces. Standard Users only see tenant workspaces assigned to them.

## Tenant Switching

Users with access to multiple tenants see a tenant switcher in the app header. Switching tenants refreshes tenant-scoped pages such as Dashboard, Incidents, Evidence, Webhooks, Audit Log, and Users.

## Tips & Best Practices

- Use **MEMBER** for most responders who need to create incidents, upload evidence, and generate deliverables
- Use **VIEWER** for stakeholders who need visibility without write access
- Reserve **OWNER** for tenant leads who manage webhooks, audit access, and memberships
- Give **CasePack Admin** only to people who should manage tenants and account users across the account

## Related Features

- [Admin: Tenants](/admin-tenants/) — Tenant workspace management
- [Audit Log](/audit-log/) — User and system actions recorded for compliance
