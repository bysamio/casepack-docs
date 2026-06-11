---
title: Self-Hosting
description: Deploy CasePack on your own infrastructure with Docker Compose or Kubernetes.
---

CasePack can run on your own infrastructure with Docker Compose or Kubernetes. Incidents, evidence, audit logs, exports, and identity stay under your operational control.

## Deployment Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Web App** | React + nginx | Web interface |
| **API** | Java / Spring Boot | Backend REST API |
| **Database** | PostgreSQL 17 | Incident metadata, users, audit logs, exports |
| **Object Store** | S3-compatible storage | Evidence files and export artifacts |
| **Identity** | Keycloak or compatible OIDC IdP | SSO / authentication |

## Prerequisites

- TLS and DNS for the public app URL
- PostgreSQL, bundled or external
- S3-compatible object storage
- OIDC identity provider, Keycloak recommended
- A valid CasePack self-host license token

Typical sizing:

| Profile | Suggested Resources |
|---------|---------------------|
| **Small deployment** | 2 vCPU, 4-8 GB RAM, 50 GB storage |
| **Production MSP deployment** | 4-8 vCPU, 16-32 GB RAM, 200 GB+ storage |

## Docker Compose Quick Start

```bash
# Clone the repo
git clone https://github.com/casepack/self-host
cd self-host

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start all services
docker compose up -d
```

Core environment values include:

| Variable | Purpose |
|----------|---------|
| `CASEPACK_LICENSE_TOKEN` | License token used by the API |
| `DB_URL` / `DB_USER` / `DB_PASS` | PostgreSQL connection |
| `OIDC_ISSUER_URI` | OIDC issuer URL |
| `S3_ENDPOINT` | S3-compatible storage endpoint |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | Object storage credentials |
| `S3_BUCKET` | Evidence/export bucket |

## Kubernetes / Helm

```bash
helm repo add casepack https://charts.casepack.app
helm repo update

helm upgrade --install casepack casepack/casepack \
  --namespace casepack \
  --create-namespace \
  --values values.yaml
```

Minimal values example:

```yaml
ingress:
  enabled: true
  host: casepack.example.com
  tlsSecretName: casepack-tls

oidc:
  issuerUrl: https://sso.example.com/realms/casepack
  clientId: casepack-web

storage:
  endpoint: https://s3.example.com
  bucket: casepack-evidence

database:
  url: jdbc:postgresql://postgres:5432/casepack
  username: casepack
  password: ${POSTGRES_PASSWORD}
```

## Storage Backends

CasePack stores evidence files and export artifacts in S3-compatible object storage.

| Backend | Recommended Use |
|---------|-----------------|
| **SeaweedFS** | Default open-source self-host option and local/evaluation backend |
| **Ceph RGW** | Enterprise Kubernetes environments, often via Rook-Ceph |
| **AWS S3** | Hosted, hybrid, or cloud-managed object storage |

SeaweedFS and Ceph RGW normally use path-style S3 access. AWS S3 normally uses virtual-hosted-style access.

## Self-Host Access Page

Self-hosted deployments show a dedicated access page instead of the hosted marketing landing page.

The access page includes:

- Instance metadata such as deployment mode and version
- A single **Sign in** action that redirects to the configured OIDC provider
- Access-state banner when the instance is in a restricted subscription state

## Configuration Checklist

Before going live, confirm these values are configured for the web app and API:

| Setting | Purpose |
|---------|---------|
| App URL | Public HTTPS URL users will open |
| API URL | Backend API endpoint used by the web app |
| Identity issuer | OIDC issuer or Keycloak realm URL |
| Web client ID | OIDC client used by the web app |
| Object storage | Endpoint, bucket, access key, and secret for evidence/export storage |
| Licensing portal | Renewal or license-management URL shown when access is restricted |
| Documentation URL | Help link shown from the application |

## Licensing

Self-host deployments use the **Self-Host Standard** plan by default:

- €6,000/year
- 1 production + 1 staging instance
- 25 tenant workspaces
- 50 users
- Self-host deployment rights
- Keycloak / SSO support
- S3-compatible object storage support

See [Pricing Plans](/pricing-plans/) for the full plan comparison.

## Restricted States

If a self-host license enters a restricted state, the app shows banners and disables affected write paths.

- **Grace** — Full access with a renewal warning
- **Read-Only Expired** — Data remains visible, writes are blocked
- **Export Only** — Existing exports/evidence can be downloaded from the Export Data page
- **Suspended** / **Terminated** — Access is blocked or severely restricted

See [Licensing & Access States](/licensing-access/) for the full behavior.

## Tips & Best Practices

- Use HTTPS in production through ingress or a reverse proxy
- Back up PostgreSQL regularly
- Back up or version your object storage bucket
- Rotate identity-provider admin and service-account credentials
- Monitor object-store capacity and export growth
- Keep staging and production instances on separate databases and buckets

## Related Features

- [Licensing & Access States](/licensing-access/) — Access states and plan-based availability
- [Pricing Plans](/pricing-plans/) — Self-host commercial plan
- [Evidence](/evidence/) — Evidence storage behavior
