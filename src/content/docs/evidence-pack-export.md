---
title: Evidence Pack Export
description: Generate audit-ready PDF or ZIP evidence packs for clients and auditors.
---

Evidence Pack Export lets you generate a downloadable package of an incident's documentation — suitable for sharing with clients, auditors, and regulatory authorities.

## Creating an Export

1. Open the incident detail page
2. Navigate to the **Exports** tab
3. Click **Export PDF** or **Export ZIP**
4. The export is queued and processed in the background
5. Download the file when the status is **Completed**

> If your plan doesn't include Evidence Pack Export, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

:::caution
Export generation does not scan or sanitize source evidence. A **Completed** status means that CasePack generated the requested file successfully; it is not a malware-safety verdict. Treat ZIP exports and their original artifacts as untrusted, scan them with approved security tooling, and open them only in an appropriate environment.
:::

## Export Formats

### PDF Export
A structured document containing:
- Incident summary (title, severity, status, description)
- Timeline of events
- NIS2 milestone status (if enabled)
- Evidence inventory (filename, upload date, uploader)
- Metadata and timestamps

### ZIP Export
A compressed archive containing:
- All evidence files in their original format
- `manifest.json` — Machine-readable metadata:
  - Incident details
  - Evidence count
  - Milestone status
  - Export timestamp

## Export List

The Exports tab shows all previous exports for the incident:

| Column | Description |
|--------|-------------|
| **Format** | PDF or ZIP |
| **Status** | Pending, Generating, Completed, or Failed |
| **Export ID** | Truncated export identifier |
| **Action** | Generating indicator, Download button, or failure message |

## Export Status

| Status | Description |
|--------|-------------|
| **Pending** | Export request received, waiting to be processed |
| **Generating** | Export is being generated |
| **Completed** | Export is ready for download |
| **Failed** | Export generation failed (retry by creating a new export) |

CasePack refreshes pending and generating exports automatically until the export completes or fails.

## Export in Restricted States

- **Read-Only Expired** — Existing exports can be downloaded, but no new exports can be created
- **Export Only** — A dedicated Export Data page lists all exports across all incidents for bulk download

See [Licensing & Access States](/licensing-access/).

## Tips & Best Practices

- Use PDF exports for client-facing reports
- Use ZIP exports for auditors who need the raw artifacts
- Warn recipients that ZIP exports contain original, unscanned artifacts
- Scan the completed archive before extracting it, and use an isolated environment when its contents may be hostile
- Create exports before closing an incident for a complete package
- Re-export after adding new evidence to include everything
- Exports are immutable — each request creates a new snapshot

## Related Features

- [Evidence](/evidence/) — Managing evidence artifacts
- [Incidents](/incidents/) — Incident details included in exports
- [Milestones](/milestones/) — Milestone status included in exports
