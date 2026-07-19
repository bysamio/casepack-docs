---
title: Quick Start Guide
description: Get up and running with CasePack in under 5 minutes.
---

CasePack helps MSPs run consistent incident reporting across tenant workspaces, collect evidence artifacts, and export client/auditor-ready evidence packs. This guide walks you through your first session.

## Prerequisites

- A CasePack account (provided by your administrator)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Step 1: Sign In

1. Navigate to your CasePack instance URL
2. Click **"Sign in"** — you'll be redirected to your organization's sign-in page (Keycloak SSO)
3. Enter your credentials and authorize access
4. You'll be redirected to the **Dashboard**

> **Self-hosted instances** show a dedicated access page with instance metadata and a single "Sign in" button. See [Self-Hosting](/self-hosting/) for details.

## Step 2: Explore the Dashboard

The Dashboard gives you an at-a-glance overview:

- **KPI Cards** — Open Incidents, In Progress, Closed (30d), Evidence Items
- **Recent Incidents** — Searchable table with status and severity filters
- **Evidence Activity** — Latest uploads from active incidents
- **Playbooks** — Quick-access runbook templates (Ransomware Response, Phishing Investigation, etc.)
- **Quick Actions** — Create new incident (`Cmd+I`), search (`Cmd+K`)

## Step 3: Create Your First Incident

1. Click **"New Incident"** in the header (or press `Cmd+I`)
2. Fill in the required fields:
   - **Title** — Short, descriptive name
   - **Severity** — Low, Medium, High, or Critical
   - **Description** — Initial details of what happened (optional)
3. Click **"Create Incident"**

## Step 4: Add Evidence

1. Open the incident detail page
2. Navigate to the **Evidence** tab
3. Click **"Upload"** or drag & drop files into the upload area
4. The default policy supports common logs, structured data, email, packet captures, documents, images, archives, and selected forensic artifacts

> Keyboard shortcut: **Ctrl+U** / **Cmd+U** to trigger the file picker from the incident detail page.

> CasePack does not currently scan file contents or quarantine malware. Treat evidence as untrusted and review the [supported-file and malware-safety guidance](/evidence/#supported-files) before uploading or opening artifacts.

## Step 5: Track Milestones (Optional — NIS2)

NIS2 milestone tracking is **opt-in per incident**. To enable it:

1. Open the incident detail page
2. Click the **⋯ (More actions)** menu → **"Enable NIS2 Reporting"**
3. Three milestones are created:
   - **Early Warning** (24h) — Initial notification
   - **Full Notification** (72h) — Detailed status update with initial assessment
   - **Final Report** (30d) — Complete incident documentation

Check the **Overdue** sidebar item for deadlines across all incidents.

> NIS2 Timeline is a plan-gated feature. See [Licensing & Access States](/licensing-access/).

## Step 6: Export the Evidence Pack

1. Open the incident detail page
2. Navigate to the **Exports** tab
3. Click **Export PDF** or **Export ZIP**
4. The export is generated in the background — download when ready

> Evidence Pack Export is a plan-gated feature. See [Licensing & Access States](/licensing-access/).

## Optional: Build Timeline and Reports

From the incident detail page:

- Use the **Timeline** tab to record key events, containment, eradication, recovery, and notes
- Use the **Reports** tab to generate Initial Triage, Executive / Client Summary, Final Evidence Pack, or NIS2 Notification reports

Timeline and Reports are plan-gated features. See [Incident Timeline](/incident-timeline/) and [Incident Reports](/incident-reports/) for details.

## Next Steps

- [Dashboard deep dive](/dashboard/)
- [Managing incidents](/incidents/)
- [Incident Timeline](/incident-timeline/)
- [Incident Reports](/incident-reports/)
- [Keyboard shortcuts](/keyboard-shortcuts/)
- [Licensing & Access States](/licensing-access/)
