---
title: Self-Hosting
description: Deploy CasePack on your own infrastructure with Docker or Kubernetes.
---

CasePack is designed to be self-hosted. Your data stays on your infrastructure — incidents, evidence, and audit logs never leave your network. CasePack supports Docker Compose for simple deployments and Kubernetes (Helm) for production.

## Architecture

CasePack consists of:

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **SPA** | React + nginx | Web interface |
| **API** | Java / Spring Boot | Backend REST API |
| **Database** | PostgreSQL 16 | Incident data, audit logs |
| **Object Store** | S3-compatible (SeaweedFS, MinIO, AWS S3) | Evidence file storage |
| **Identity** | Keycloak | SSO / OIDC authentication |

## Docker Compose (Quick Start)

```bash
# Clone the deployment repo
git clone https://github.com/bysamio/casepack-deploy

# Copy and edit environment file
cp .env.example .env
# Edit .env with your configuration

# Start all services
docker compose up -d
```

Required environment variables:
- `CASEPACK_DB_PASSWORD` — PostgreSQL password
- `KEYCLOAK_ADMIN_PASSWORD` — Keycloak admin password
- `CASEPACK_LICENSE_KEY` — Your license key (provided on sign-up)

## Kubernetes / Helm

```bash
# Add the Helm repository
helm repo add casepack oci://ghcr.io/bysamio/charts

# Install with custom values
helm install casepack casepack/casepack-spa \
  --namespace casepack \
  --create-namespace \
  -f values.yaml
```

See the Helm Architecture docs for full configuration options.

## Storage Configuration

Evidence files are stored in an S3-compatible object store:

- **SeaweedFS** — Lightweight, self-hosted (recommended for simple deployments)
- **MinIO** — S3-compatible, self-hosted
- **AWS S3** — Cloud-managed (for SaaS or hybrid deployments)

See the Storage Backends docs for configuration details.

## Self-Host Access Page

Self-hosted instances display a dedicated **Access Page** instead of the SaaS landing page:

- Instance metadata (deployment mode, version)
- Single **"Sign in"** button redirecting to Keycloak
- Access state banner showing subscription status

The access page is shown when `DEPLOYMENT_MODE=self_host` is set in runtime config.

## Licensing

Self-hosted instances require a license key. License tiers:

| Tier | Price | Description |
|------|-------|-------------|
| **Founding Pilot** | €149/mo or €1,490/yr | Up to 10 users, 1 tenant |
| **MSP Pro** | €249/mo or €2,490/yr | Up to 25 users, 5 tenants, all features |
| **Self-Host Standard** | €6,000/yr (annual only) | Unlimited users, unlimited tenants |
| **Partner / Enterprise** | Custom pricing | Custom integrations, SLA guarantees |

See [Pricing Plans](/pricing-plans/) for full feature comparison.

The license key is validated by the API on startup. The SPA shows a **"Self-Hosted"** badge in the header.

## Access State Management

Self-hosted instances display banners based on subscription status:

| State | Banner |
|-------|--------|
| **Active** | No banner |
| **Grace** | Warning: subscription expired, grace period active |
| **Read-Only Expired** | Error: subscription expired, data is read-only |
| **Export Only** | Warning: only data export is available |
| **Suspended** | Error: account suspended, contact support |
| **Terminated** | Error: account terminated |

See [Licensing & Access States](/licensing-access/) for details.

## Export Data Page

When in **Export Only** state, a dedicated Export Data page is available:
- Allows downloading existing evidence packs
- No new incidents or evidence can be created
- Banner explains the restricted state and how to restore access

## Runtime Configuration

The SPA reads runtime configuration from `/config.js` at startup:

| Variable | Description |
|----------|-------------|
| `DEPLOYMENT_MODE` | `saas` or `self_host` |
| `APP_VERSION` | Application version string |
| `OIDC_AUTHORITY` | Keycloak realm URL |
| `OIDC_CLIENT_ID` | Keycloak client ID |
| `API_BASE_URL` | Backend API URL |

## Tips & Best Practices

- Always use HTTPS in production (configure in nginx/ingress)
- Back up PostgreSQL regularly — it contains all incident data
- Evidence files in S3 should have bucket versioning enabled
- Rotate Keycloak admin credentials after initial setup
- Monitor disk space for the object store
