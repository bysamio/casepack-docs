---
title: Webhooks
description: Receive incidents from ConnectWise, HaloPSA, Autotask, and custom systems.
---

Webhooks allow external PSA tools and ticketing systems to automatically create incidents in CasePack. Each webhook endpoint accepts signed POST requests and maps the incoming payload into an incident.

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
2. Click **"Create Webhook"**
3. Fill in:
   - **Name** — Display name (e.g., "ConnectWise Production")
   - **Source Type** — Select: Generic, ConnectWise, HaloPSA, or Autotask
4. Click **"Create"**
5. Copy the generated secret token immediately

> **Important:** The full secret token is shown only once, when the endpoint is created. Store it securely; it is used to sign webhook payloads.

## Webhook List

The webhook list shows all configured webhooks for the tenant:

| Column | Description |
|--------|-------------|
| **Name** | Display name and creator |
| **Source Type** | Generic, ConnectWise, HaloPSA, or Autotask |
| **Status** | Active or disabled |
| **Secret Token** | Masked token with click-to-copy action |
| **Created** | When the webhook was created |

Row actions let Owners and CasePack Admins view deliveries, copy the masked secret token, or disable an active webhook.

## How It Works

1. Your PSA tool sends a signed POST request to `/api/webhooks/intake/{endpointId}`
2. The CasePack API verifies the `X-Webhook-Signature` HMAC header
3. The endpoint's source type selects the payload mapper
4. The payload is mapped to incident fields (title, description, severity)
5. A new incident is created in the webhook's tenant
6. The incident appears in the incident list and the delivery is recorded

### Payload Example (Generic)

```json
{
  "title": "Suspicious login activity",
  "description": "Multiple failed login attempts from IP 192.168.1.100",
  "severity": "high"
}
```

## Testing a Webhook

Use `curl` to test a webhook after computing an HMAC-SHA256 signature over the raw JSON body with the endpoint's secret token:

```bash
curl -X POST https://your-instance/api/webhooks/intake/{endpointId} \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: sha256=<hex-hmac>" \
  -d '{"title": "Test incident", "description": "Test description", "severity": "low"}'
```

A valid request returns `{"status":"processed","incidentId":"..."}`. Missing or invalid signatures return `401` with `{"status":"failed","error":"Invalid signature"}`.

## Tips & Best Practices

- Name webhooks descriptively (include the source system and environment)
- Test with a signed request before configuring your PSA tool
- Use the Generic provider for custom integrations
- One webhook per source system per tenant keeps incidents organized
- Webhook secrets are sensitive — rotate if compromised by creating a new webhook and disabling the old one

## Related Features

- [Incidents](/incidents/) — Webhook-created incidents appear in the list
- [Audit Log](/audit-log/) — Webhook activity is logged
