---
title: Evidence Pack Export
description: Generate audit-ready PDF or ZIP evidence packs for clients and auditors.
---

Evidence Pack Export lets you generate a downloadable package of an incident's documentation — suitable for sharing with clients, auditors, and regulatory authorities.

## Creating an Export

1. Open the incident detail page
2. Navigate to the **Exports** tab
3. Click **"Request Export"**
4. Choose format:
   - **PDF** — Professionally formatted report with incident details, milestones, and evidence metadata
   - **ZIP** — All evidence artifacts plus a JSON manifest file
5. The export is queued and processed in the background

> Evidence Pack Export requires the `evidencePackExport` feature gate. If your plan doesn't include it, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

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
  - Evidence file listing with hashes
  - Milestone status
  - Export timestamp

## Export List

The Exports tab shows all previous exports for the incident:

| Column | Description |
|--------|-------------|
| **Format** | PDF or ZIP |
| **Status** | Queued, Processing, Completed, Failed |
| **Requested by** | User who initiated the export |
| **Requested at** | Relative timestamp |
| **Download** | Download button (available when status = Completed) |

## Export Status

| Status | Description |
|--------|-------------|
| **Queued** | Export request received, waiting to be processed |
| **Processing** | Export is being generated |
| **Completed** | Export is ready for download |
| **Failed** | Export generation failed (retry by creating a new export) |

## Export in Restricted States

- **Read-Only Expired** — Existing exports can be downloaded, but no new exports can be created
- **Export Only** — A dedicated Export Data page lists all exports across all incidents for bulk download

See [Licensing & Access States](/licensing-access/).

## Tips & Best Practices

- Use PDF exports for client-facing reports
- Use ZIP exports for auditors who need the raw artifacts
- Create exports before closing an incident for a complete package
- Re-export after adding new evidence to include everything
- Exports are immutable — each request creates a new snapshot

## Related Features

- [Evidence](/evidence/) — Managing evidence artifacts
- [Incidents](/incidents/) — Incident details included in exports
- [Milestones](/milestones/) — Milestone status included in exports
