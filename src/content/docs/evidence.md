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

> If your plan doesn't include Evidence Vault, you'll see an upgrade prompt. See [Licensing & Access States](/licensing-access/).

### Supported Files

CasePack uses a configurable allowlist for common incident-evidence formats. The default policy includes:

| Type | Examples |
|------|----------|
| Logs and configuration | `.log`, `.txt`, `.md`, `.csv`, `.conf`, `.ini` |
| Structured data | `.json`, `.jsonl`, `.xml`, `.yaml`, `.toml`, `.ioc`, `.har` |
| Email and network captures | `.eml`, `.msg`, `.pst`, `.ost`, `.pcap`, `.pcapng`, `.cap` |
| Documents and images | `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.png`, `.jpg`, `.gif`, `.webp`, `.tiff` |
| Archives | `.zip`, `.gz`, `.tar`, `.7z`, `.rar` |
| Selected forensic artifacts | `.evtx`, `.etl`, memory dumps, disk images, and SQLite databases |

Active web content, scripts, macro-enabled Office files, and executables are excluded by the default policy. Self-hosted administrators can configure both MIME-type and filename-extension allowlists, but unrestricted uploads are not recommended.

:::caution
CasePack does not currently inspect file contents or provide antivirus scanning, sandboxing, or malware quarantine. An accepted upload does **not** mean that a file is safe. CasePack's current release is not intended to be a live-malware repository or malware-analysis environment.

Keep known or suspected hostile samples in an approved isolated analysis system. Scan ordinary incident artifacts with your organization's security tooling before upload and again before opening or sharing a downloaded file.
:::

### Upload Behavior

- The API authorizes each upload, then the browser sends the file directly to S3-compatible storage using a short-lived presigned URL
- The API verifies the stored object's size, content type, and tenant/incident path before registering it as evidence
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

Downloads are delivered as attachments rather than rendered inline. This reduces accidental browser execution but does not replace malware scanning.

### Delete
Click the delete (trash) icon to remove an evidence item:
- A confirmation dialog appears
- The item is removed from the active evidence list
- The underlying object is retained by the current release for forensic and audit purposes

> Delete is disabled in read-only or export-only subscription states. See [Licensing & Access States](/licensing-access/).

## Storage

Evidence files are stored in an S3-compatible object store:

- **Object organization**: Generated keys are scoped to the tenant and incident; the original filename is metadata, not an authorization boundary
- **Supported backends**: SeaweedFS (self-hosted default), Ceph RGW, AWS S3, or another S3-compatible backend
- Short-lived presigned URLs are used for uploads and attachment downloads

## Empty State

When no evidence has been uploaded:

> *"No evidence uploaded yet — Upload files to start building your evidence collection for this incident."*

With an **"Upload evidence"** button.

## Tips & Best Practices

- Upload evidence as you collect it — timestamps are preserved per item
- Use descriptive filenames before uploading for easier identification
- Screenshots are especially useful for evidence packs
- Large files are supported, but keep object store disk capacity in mind
- Treat every uploaded and downloaded artifact as untrusted until it has been checked by your organization's security tooling

## Related Features

- [Incidents](/incidents/) — Parent incident management
- [Evidence Pack Export](/evidence-pack-export/) — Export evidence as PDF or ZIP
