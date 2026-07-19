---
title: Self-Hosting
description: Run CasePack on Docker Compose or Kubernetes with your own identity, database, and object storage.
---

CasePack self-host keeps the application, incident data, evidence files, exports, identity, and audit records under your operational control. You can run the bundled stack for a fast start, or connect CasePack to your existing PostgreSQL, OIDC, and S3-compatible infrastructure.

## What You Deploy

| Component | Default option | Purpose |
|-----------|----------------|---------|
| CasePack web app | CasePack SPA | Browser UI |
| CasePack API | CasePack API | REST API, license checks, evidence, exports |
| Database | PostgreSQL 17 | Incidents, tenants, users, audit log, metadata |
| Identity | Keycloak | OIDC sign-in |
| Object storage | SeaweedFS S3 gateway | Evidence files and generated exports |

## Prerequisites

For Docker Compose:

- Docker Engine 24+ with Docker Compose v2
- `curl`, `openssl`, and `python3`
- A valid CasePack self-host activation token
- Disk space for PostgreSQL and object storage volumes

For Kubernetes:

- Kubernetes 1.28+
- Helm 3
- A default StorageClass, or explicit PVC configuration
- DNS and TLS for production ingress
- A valid CasePack self-host activation token

Suggested starting resources:

| Profile | Suggested resources |
|---------|---------------------|
| Evaluation / small team | 2 vCPU, 4-8 GB RAM, 50 GB storage |
| MSP production | 4-8 vCPU, 16-32 GB RAM, 200 GB+ storage |

## Docker Compose Quick Start

Clone the self-host wrapper:

```bash
git clone https://github.com/bysamio/casepack.git
cd casepack
cp .env.example .env
```

Edit `.env` and set the required passwords:

```bash
DB_PASS=change-me
KC_DB_PASS=change-me
KC_ADMIN_PASS=change-me
```

Activate the instance:

```bash
./activate.sh <activation-token>
```

Start the stack:

```bash
docker compose up -d
```

Open CasePack:

| Service | URL |
|---------|-----|
| CasePack app | `http://localhost:3000` |
| API health | `http://localhost:8080/actuator/health` |
| Keycloak | `http://localhost:8081` |

Sign in with the bootstrap admin account associated with your license. After first sign-in, create additional users from CasePack administration.

## Object Storage And Browser Uploads

CasePack uploads evidence directly from the browser to S3-compatible storage using presigned URLs.

Use these two settings when the API and browser reach storage through different routes:

| Setting | Purpose |
|---------|---------|
| `S3_ENDPOINT` | Internal endpoint the API uses to talk to object storage |
| `S3_PUBLIC_ENDPOINT` | Browser-facing endpoint used in presigned upload/download URLs |

For local Docker, the self-host wrapper defaults to:

```bash
S3_ENDPOINT=http://seaweedfs:8333
S3_PUBLIC_ENDPOINT=http://casepack-s3.localhost:8333
```

For production, publish your S3-compatible gateway through DNS and TLS:

```bash
S3_ENDPOINT=http://object-store.internal:8333
S3_PUBLIC_ENDPOINT=https://s3.casepack.example.com
```

If the same endpoint is reachable by both the API and users' browsers, `S3_PUBLIC_ENDPOINT` can be left blank.

Your S3 backend must allow browser requests from the CasePack web app origin. Example CORS shape:

```json
[
  {
    "AllowedOrigins": ["https://casepack.example.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Current Malware-Scanning Boundary

Integrated malware scanning and quarantine are deliberately outside the current MVP scope. CasePack validates configured MIME types, filename extensions, and file size, but it does not inspect file signatures or run an antivirus or sandbox engine. Successful upload, download, or export does not establish that an artifact is safe.

For the current release:

- Keep evidence storage private and accessible only through CasePack's short-lived presigned URLs.
- Keep the curated MIME-type and extension allowlists enabled; do not configure unrestricted `*/*` and `*` policies.
- Limit uploads to authenticated, authorized incident responders.
- Do not use CasePack as a repository or distribution channel for known live malware.
- Keep known or suspected hostile samples in an approved isolated analysis platform and record their metadata or hash in the incident workflow.
- Scan downloaded evidence and ZIP exports with your organization's security tooling before opening, extracting, or forwarding them.

Relevant API settings include:

| Setting | Purpose |
|---------|---------|
| `EVIDENCE_MAX_BYTES` | Maximum accepted evidence-object size |
| `EVIDENCE_ALLOWED_TYPES` | Comma-separated MIME-type allowlist |
| `EVIDENCE_ALLOWED_EXTENSIONS` | Comma-separated filename-extension allowlist |

Scanning and fail-closed quarantine become pre-launch requirements—not optional later hardening—before a deployment:

- accepts uploads from public, anonymous, or automatically integrated third-party sources
- permits executables, scripts, active web content, or macro-enabled documents
- parses, extracts, or previews uploaded content on the server
- is marketed or contractually represented as malware-safe storage
- supports workflows for collecting and distributing live malware samples

Until then, the safer MVP is a controlled evidence repository with an explicit trust boundary, not a partially implemented scanner that may create false confidence. See [Evidence](/evidence/) and [Evidence Pack Export](/evidence-pack-export/) for user-facing handling guidance.

## Kubernetes / Helm Quick Start

Add the chart repository:

```bash
helm repo add bysamio https://bysamio.github.io/charts/
helm repo update
```

Run activation on an operator workstation:

```bash
cp .env.example .env
./activate.sh <activation-token>
```

Create a Kubernetes Secret for the API settings and license values. Keep generated env files and manifests containing real values outside source control.

Install the chart:

```bash
helm upgrade --install casepack bysamio/casepack \
  --namespace casepack \
  --create-namespace \
  -f values.yaml \
  --wait --wait-for-jobs
```

For local access to a test cluster:

```bash
kubectl port-forward svc/casepack-casepack-api 8080:80 -n casepack
kubectl port-forward svc/casepack-casepack-spa 3000:80 -n casepack
kubectl port-forward svc/casepack-keycloak 8081:80 -n casepack
```

Production deployments should use DNS and TLS for the app, API, identity provider, and S3 endpoint:

| Public hostname | Purpose |
|-----------------|---------|
| `casepack.example.com` | CasePack app |
| `api.casepack.example.com` | CasePack API |
| `auth.casepack.example.com` | Keycloak / OIDC |
| `s3.casepack.example.com` | Browser-facing S3 endpoint |

## License Renewal

Renew your subscription in the licensing portal, then refresh the local license.

For Docker:

```bash
./renew-license.sh
```

For Kubernetes:

```bash
./renew-license.sh --no-restart
```

Update the Kubernetes Secret with the refreshed license value, then restart the API deployment:

```bash
kubectl rollout restart deployment/casepack-casepack-api -n casepack
kubectl rollout status deployment/casepack-casepack-api -n casepack
```

For air-gapped environments, download a renewed license file from the portal and install it using the self-host wrapper's manual renewal command.

## Smoke Test Checklist

After installation:

1. Open the CasePack app and sign in as the bootstrap admin.
2. Confirm `/actuator/health` returns `UP`.
3. Create or open the first tenant workspace.
4. Create an incident.
5. Upload a small evidence file.
6. Generate an evidence pack export.
7. Download the export.

If this flow works, the license, identity, API, database, object storage, and web app runtime config are wired correctly.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| API does not start | Missing license files, wrong installation values, or database connectivity | Re-run activation and inspect API logs |
| Login redirects with `invalid_scope` | OIDC client scopes are incomplete | Confirm the OIDC client allows `openid`, `profile`, and `email` |
| Login spinner after callback | App URL, API CORS, OIDC issuer, or redirect URI mismatch | Align the public URLs across app, API, and identity provider |
| Signed-in user gets `403` | The user exists in OIDC but not in CasePack | Add the user through CasePack administration |
| Evidence upload fails in browser | Presigned URL points at a hostname the browser cannot reach | Set `S3_PUBLIC_ENDPOINT` to a browser-reachable HTTPS endpoint |
| Exports stay pending | API cannot write to object storage or lacks resources | Check S3 credentials, bucket access, and API logs |

## Operations Checklist

- Store activation tokens, licenses, and passwords in a secret manager.
- Rotate bootstrap and Keycloak admin passwords after installation.
- Use HTTPS for app, API, identity, and S3 endpoints in production.
- Back up PostgreSQL and object storage together.
- Keep production and staging on separate databases, buckets, identity realms, and installation IDs.
- Keep CasePack images and charts updated.

## Related Features

- [Licensing & Access States](/licensing-access/) — Access states and plan-based availability
- [Pricing Plans](/pricing-plans/) — Self-host commercial plan
- [Evidence](/evidence/) — Evidence storage behavior
- [Evidence Pack Export](/evidence-pack-export/) — Exporting evidence packs
