---
title: Evidence
description: Upload, organize, and manage incident artifacts in one place.
---

The Evidence tab on an incident's detail page is the central place for collecting and managing artifacts. Each file is stored in an S3-compatible object store and linked to the incident.

## Uploading Evidence

Two methods:

1. **Click "Upload"** — Opens a file picker dialog
2. **Drag and drop** — Drop files directly onto the evidence area

Keyboard shortcut: **Ctrl+U** / **Cmd+U** from the incident detail page.

> Evidence upload is controlled by the `evidenceVault` feature gate. If your plan doesn't include it, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

### Supported Files

Any file type can be uploaded. Common examples:

| Type | Examples |
|------|----------|
| Images | `.png`, `.jpg`, `.gif`, `.webp` |
| Documents | `.pdf`, `.docx`, `.txt`, `.csv` |
| Logs | `.log`, `.json`, `.xml`, `.evtx` |
| Archives | `.zip`, `.tar.gz`, `.7z` |

### Upload Behavior

- Files are uploaded individually to the API
- A progress indicator shows during upload
- On success, the file appears immediately in the evidence list
- Failed uploads show an error toast with the reason

## Evidence List

Each evidence item shows:

| Column | Description |
|--------|-------------|
| **Filename** | Original filename |
| **Size** | Human-readable file size |
| **Uploaded by** | User who uploaded the file |
| **Uploaded at** | Relative timestamp |

## Actions

### Download
Click a file's download button to download the original artifact from the object store.

### Delete
Click the delete (trash) icon to remove an evidence item:
- A confirmation dialog appears
- Deletion is **permanent** — the file is removed from the object store

> Delete is disabled in read-only or export-only subscription states. See [Licensing & Access States](/licensing-access/).

## Storage

Evidence files are stored in an S3-compatible object store:

- **Path pattern**: `tenants/{tenantId}/incidents/{incidentId}/evidence/{evidenceId}/{filename}`
- **Supported backends**: SeaweedFS (self-hosted default), MinIO, AWS S3
- Pre-signed URLs are used for secure downloads

## Empty State

When no evidence has been uploaded:

> *"No evidence uploaded yet — Upload files to start building your evidence collection for this incident."*

With an **"Upload evidence"** button.

## Tips & Best Practices

- Upload evidence as you collect it — timestamps are preserved per item
- Use descriptive filenames before uploading for easier identification
- Screenshots are especially useful for evidence packs
- Large files are supported, but keep object store disk capacity in mind

## Related Features

- [Incidents](/incidents/) — Parent incident management
- [Evidence Pack Export](/evidence-pack-export/) — Export evidence as PDF or ZIP
