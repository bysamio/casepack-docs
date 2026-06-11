---
title: Webhooks
description: Receive incidents from ConnectWise, HaloPSA, Autotask, and custom systems.
---

Webhooks allow external PSA tools and ticketing systems to automatically create incidents in CasePack. Each webhook provides a unique URL that accepts POST requests.

## Overview

- Webhooks are **tenant-scoped** — each tenant manages its own webhook configurations
- Requires tenant **Owner** or **CasePack Admin** permissions to manage webhooks
- Availability depends on your plan

> If your plan doesn't include webhook management, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

## Supported Providers

| Provider | Mapping |
|----------|---------|
| **ConnectWise** | `summary` → title, `board.name` → description, severity derived from `priority.name` or `severity.name` |
| **HaloPSA** | `summary` → title, `details` → description, severity derived from `priority_name` |
| **Autotask** | `title` → title, `description` → description, severity derived from `priority` (1=Critical, 2=High, 3=Medium, 4+=Low) |
| **Generic** | `title` → title, `description` → description, `severity` → severity. Fall-through for custom integrations. |

## Creating a Webhook

1. Navigate to **Webhooks** in the sidebar
2. Click **"New Webhook"**
3. Fill in:
   - **Name** — Display name (e.g., "ConnectWise Production")
   - **Provider** — Select: ConnectWise, HaloPSA, Autotask, or Generic
4. Click **"Create"**
5. Copy the generated webhook URL — this is the endpoint to configure in your PSA tool

> **Important:** The webhook URL contains a secret token. Treat it like a password.

## Webhook List

The webhook list shows all configured webhooks for the tenant:

| Column | Description |
|--------|-------------|
| **Name** | Display name |
| **Provider** | ConnectWise, HaloPSA, Autotask, or Generic |
| **URL** | Webhook endpoint (click to copy) |
| **Created** | When the webhook was created |

## How It Works

1. Your PSA tool sends a POST request to the webhook URL
2. The CasePack API receives the payload and identifies the provider
3. The payload is mapped to incident fields (title, description, severity)
4. A new incident is created in the webhook's tenant
5. The incident appears in the incident list

### Payload Example (Generic)

```json
{
  "title": "Suspicious login activity",
  "description": "Multiple failed login attempts from IP 192.168.1.100",
  "severity": "high"
}
```

## Testing a Webhook

Use `curl` to test a webhook:

```bash
curl -X POST https://your-instance/api/v1/webhooks/{id}/ingest \
  -H "Content-Type: application/json" \
  -d '{"title": "Test incident", "description": "Test description", "severity": "low"}'
```

## Tips & Best Practices

- Name webhooks descriptively (include the source system and environment)
- Test with a simple `curl` command before configuring your PSA tool
- Use the Generic provider for custom integrations
- One webhook per source system per tenant keeps incidents organized
- Webhook URLs are secret — rotate if compromised by creating a new webhook

## Related Features

- [Incidents](/incidents/) — Webhook-created incidents appear in the list
- [Audit Log](/audit-log/) — Webhook activity is logged
