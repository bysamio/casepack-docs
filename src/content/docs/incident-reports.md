---
title: Incident Reports
description: Generate structured reports from incident data using built-in templates.
---

Incident Reports let you generate professional, structured reports from your incident data, timeline, and evidence. Choose from built-in templates tailored for different audiences — from quick triage summaries to regulatory notifications.

> Incident Reports require the `incidentReports` feature gate. If your plan doesn't include it, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

## Accessing Reports

1. Open an incident detail page
2. Click the **Reports** tab

The Reports tab displays a template grid and a table of previously generated reports.

## Report Templates

CasePack includes four built-in templates:

| Template | Category | Description |
|----------|----------|-------------|
| **Initial Triage Report** | Intake | Capture essential facts and assign ownership in the first stage of the incident. |
| **Executive / Client Summary** | Stakeholder | A concise stakeholder-ready summary of what happened, what was impacted, and what was done. |
| **Final Evidence Pack** | Closure | Closure-ready export with timeline, evidence index, response actions, root cause, and sign-off. |
| **NIS2 Incident Notification** | Regulatory | Structured 24h, 72h, progress, or final notification based on current incident data. |

### Template Recommendations

CasePack automatically recommends templates based on the incident's current state:

- **Status** — e.g., an Initial Triage report is recommended for Open incidents
- **Severity** — higher severity incidents surface the Executive Summary template
- **NIS2 Reporting** — if NIS2 reporting is enabled, the NIS2 Notification template is recommended

Recommended templates display a **✦ Recommended** badge in the template grid.

## Generating a Report

1. Click a template card in the Reports tab
2. The **Report Builder** sheet opens on the right side
3. Select the **output format**:
   - **PDF** — A downloadable document suitable for sharing with stakeholders
   - **HTML** — An in-app viewable report you can preview or print
4. Optionally fill in **Content Overrides** (see below)
5. Click **Generate PDF** or **Generate HTML**

The report is queued and processed in the background. Progress is shown in the Generated Reports table with auto-polling until complete.

## Content Overrides

Each template defines editable sections that let you add or replace content in the generated report. Leave a field blank to use auto-generated content from incident data.

### Initial Triage Report
| Field | Purpose |
|-------|---------|
| Executive Summary | Brief overview of the incident and initial findings |
| Immediate Actions | Containment actions taken or required |

### Executive / Client Summary
| Field | Purpose |
|-------|---------|
| Executive Summary | Narrative paragraph about the incident |
| Business & Customer Impact | Impact on operations, data, customers, or revenue |
| Remediation Steps | Completed and planned remediation actions |
| Recommendations | Strategic recommendations for preventing recurrence |

### Final Evidence Pack
| Field | Purpose |
|-------|---------|
| Root Cause Analysis | Detailed root cause analysis and attack chain |
| Lessons Learned | Key lessons and process improvements identified |
| Sign-Off Notes | Closure notes and approver comments |

### NIS2 Incident Notification
| Field | Purpose |
|-------|---------|
| Notification Type | e.g., 24h Early Warning, 72h Notification, Final Report |
| Cross-Border Impact | Impact on other EU member states |
| Additional Regulatory Notes | Supplementary notes for the competent authority |

## Previewing a Report

Before generating, you can preview a report in HTML format:

1. In the Report Builder sheet, click **Preview**
2. A dialog opens with a sandboxed HTML preview of the report
3. Use the **Print** button to print directly from the preview

Content overrides are included in the preview, so you can verify your custom content before generating.

## Generated Reports

The Generated Reports table shows all reports created for the incident:

| Column | Description |
|--------|-------------|
| **Template** | Template name with icon |
| **Status** | Pending, Processing, Completed, or Failed |
| **Format** | PDF or HTML |
| **Actions** | Preview (HTML) and Download buttons |

- **Pending/Processing** reports show a spinner with "Generating…"
- **Completed** reports offer Preview and Download buttons
- **Failed** reports display an error message

## Tips & Best Practices

- Use the **Initial Triage** template immediately when an incident is opened to capture first impressions
- The **Executive Summary** is ideal for client-facing communication — fill in the Business Impact override for specificity
- Generate the **Final Evidence Pack** before closing an incident to ensure a complete audit trail
- For NIS2-regulated incidents, generate notifications at each milestone deadline (24h, 72h, final)
- Preview reports before generating PDFs to verify content overrides look correct

## Related Features

- [Incidents](/incidents/) — Managing incidents
- [Evidence](/evidence/) — Uploading and managing artifacts
- [NIS2 Milestones](/milestones/) — Deadline tracking
- [Evidence Pack Export](/evidence-pack-export/) — Exporting evidence bundles
