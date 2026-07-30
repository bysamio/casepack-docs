---
title: Self-Hosting
description: Deploy the private CasePack Connected design-partner preview with Docker Compose.
---

CasePack self-host keeps the application, incident data, evidence, exports,
identity, and audit records on infrastructure you operate. The current offer is
a private design-partner preview, not a generally available or air-gapped
edition.

## Current Support Boundary

| Item | Current preview |
|---|---|
| Licensing mode | Connected Direct |
| Deployment profile | Docker Compose or Podman Compose |
| API replicas | One per deployment |
| Deployment identities | Two per entitlement |
| Tenant workspaces | Unlimited |
| Users | Unlimited |
| Kubernetes / Helm | Not yet supported for the Connected pilot |
| Air-gapped and brokered modes | Roadmap candidates; not available |

The two deployment identities are named **primary** and **recovery/test** for
operator convenience. CasePack does not infer production or non-production
from an environment name, hostname, database, or workload.

## What You Operate

| Component | Bundled default | Purpose |
|---|---|---|
| Web app | CasePack SPA | Browser UI |
| API | CasePack API | REST API, local credential verification, evidence, exports |
| Database | PostgreSQL 17 | Customer records and audit metadata |
| Identity | Keycloak | OIDC sign-in |
| Object storage | SeaweedFS S3 gateway | Evidence and generated exports |
| PDF renderer | Gotenberg | Report rendering |

## Prerequisites

- Docker Engine 24+ with Docker Compose v2, or a compatible Podman Compose setup
- A private CasePack design-partner entitlement
- A short-lived enrollment code for one available deployment slot
- The pinned CasePack issuer public key supplied during onboarding
- Outbound HTTPS access from the API container to the single configured
  CasePack licensing origin
- Durable, encrypted backups for PostgreSQL, object storage, and the
  `licensing-state` volume

## Enrollment Publication Gate

The Compose/Podman wrapper and enrollment flow are implemented for engineering
verification, but public operator commands are intentionally withheld until
the clean-install, upgrade, rollback, restore, and licensing-outage canary
passes against a signed compatibility set. Design partners receive the pinned,
reviewed runbook during onboarding.

Enrollment uses a short-lived code supplied through a protected prompt or
owner-readable file. The code must never be passed as a command-line value,
stored in environment configuration, or committed to source control.

The CasePack API image is the sole owner of the durable state stored in the
`licensing-state` volume:

```text
/var/lib/casepack/licensing/
  installation-key.pk8
  credential.jwt
  state.json
  state.lock
```

The private wrapper invokes the API image's licensing command mode; it does not
parse or write these files. The first customer, workspace, and CasePack
administrator are created only after the API has verified the key-bound
Connected credential.

## Credential Refresh

The API attempts a credential refresh approximately every 24 hours with
per-deployment jitter. The private operator runbook also provides an explicit
refresh procedure.

Refresh proves possession of the deployment's non-exported Ed25519 private key,
strictly verifies the returned credential against the pinned offline issuer
trust set, rejects sequence rollback, and updates the protected state. It does
not create a new entitlement or another customer-visible license.

CasePack follows redirects neither during enrollment nor refresh, and contacts
only the configured HTTPS licensing origin.

## Privacy Boundary

Connected requests use a fixed field allowlist:

- installation ID and public-key thumbprint
- entitlement, product, protocol, and deployment-slot identifiers
- challenge, proof, logical request, and credential-sequence metadata
- CasePack version and supported deployment profile

CasePack does **not** send incident content, evidence, tenant names, user data,
IdP configuration, storage configuration, credentials, or workflow content to
the licensing service.

## Continuity and Residual Risk

The current credential permits up to 30 days of offline continuity. This keeps
the customer-operated service usable during a CasePack licensing outage, but it
also means server-side revocation and detection of a copied state volume can
lag until the next successful refresh or credential expiry.

Software-only keys cannot reliably distinguish two concurrently running copies
of the same complete VM/volume backup. The authorized identity-replacement
workflow creates a successor identity and supersedes the old deployment, but
the old signed credential may remain usable until it expires. Hardware-backed
keys or a shorter continuity window may be offered later if design partners
need a tighter control.

Connected Direct therefore reduces casual copying and provides auditable
enrollment, refresh, replacement, and revocation; it is not presented as
tamper-proof DRM.

## Setup and Recovery States

Licensing failure never causes CasePack to treat a populated customer database
as a fresh installation:

| State | Selection rule | Behavior |
|---|---|---|
| `SETUP` | Database is proven empty and no verified credential is available | Customer data creation is blocked; enrollment and diagnostics remain available |
| `RECOVERY_READ_EXPORT` | Data exists, emptiness is uncertain, or restored licensing state needs reconciliation | Authenticated reads and permitted exports remain available; ordinary writes are paused |

The recovery write freeze includes PSA webhook intake, licensing provisioning,
and internal reset actions. This prevents background or externally initiated
traffic from changing a restored database while its licensing head is being
reconciled.

The private operator runbook provides status, diagnostics, and recovery
procedures using the API image's licensing command mode. Recovery codes are
read from protected files, never command-line values.

Recovery does not silently enroll a new identity. Ordinary API startup never
creates or replaces an installation.

## Complete Custody Export

In `RECOVERY_READ_EXPORT`, a CasePack customer administrator can create a new
complete custody export from the recovery banner and download it after the
background job completes. Ordinary users and administrators from another
customer cannot create, inspect, or download the archive.

The ZIP uses the versioned `casepack-custody-export/v1` manifest. It includes
customer-owned CasePack relational records, audit history, evidence metadata,
referenced evidence blobs, and generated exports. Each manifest entry carries
its byte length, media type, stable identifier, and SHA-256 digest. If a
referenced object is missing or changes size during generation, CasePack fails
the job instead of publishing an incomplete archive.

The archive intentionally excludes application licensing material, webhook
secrets and delivery headers, provisioning/email queues, contact requests,
external identity-provider data and credentials, and other application
secrets. PostgreSQL, object storage, Keycloak, and the licensing-state volume
must still be backed up together for operational disaster recovery; the
custody archive is a portable customer-data exit path, not a full system
restore image.

## Backup, Restore, and Redeploy

Back up these as one recovery set:

- PostgreSQL data
- S3-compatible evidence and export objects
- the `licensing-state` named volume
- the Keycloak database and required configuration

Preserving the licensing volume across image upgrades and ordinary stack
restarts keeps the deployment identity stable. Redeploying a new CasePack
version must not create another installation or visible license.

Treat any restore as a reconciliation event. Restore all related data from a
consistent recovery point, start CasePack in recovery mode, complete the
private diagnostic check, and refresh successfully before resuming ordinary
writes.

## Object Storage

`S3_ENDPOINT` is the API's internal storage address.
`S3_PUBLIC_ENDPOINT` is the browser-reachable address used in presigned URLs.
Use HTTPS and a CORS allowlist for the exact SPA origin in production.

The MVP validates configured file types, extensions, and size, but does not
perform malware scanning. Keep storage private, retain the curated allowlists,
and scan downloaded evidence with your organization's security tooling.

## Operational Checklist

- Use TLS for the SPA, API, Keycloak, licensing origin, and browser-facing S3
  endpoint.
- Keep one API replica per deployment.
- Restrict the licensing-state directory to the API container and back it up
  encrypted.
- Rotate bootstrap and Keycloak administrator passwords after first use.
- Monitor API health, credential deadlines, failed refreshes, disk, database,
  and object-storage backups.
- Test enrollment, refresh, redeploy, backup, restore, recovery, and replacement
  before accepting customer data.
- Do not claim air-gapped operation, live-clone detection, high availability,
  or Kubernetes support for this preview.

## Related

- [Licensing & Access States](/licensing-access/)
- [Pricing Plans](/pricing-plans/)
- [Evidence](/evidence/)
- [Evidence Pack Export](/evidence-pack-export/)
