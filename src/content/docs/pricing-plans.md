---
title: Pricing Plans
description: CasePack hosted plans and prices, the private self-host design-partner preview, enterprise terms, and German VAT presentation.
---

CasePack offers two hosted plans with monthly or yearly billing, a
sales-assisted self-host private preview, and custom Partner / Enterprise terms.
Every plan includes all CasePack features, and there are no per-incident
charges. The live prices are on [casepack.app/pricing](https://casepack.app/pricing).

## Hosted Plans

CasePack operates the application infrastructure. Hosted plans are bought
through checkout on the [pricing page](https://casepack.app/pricing), billed
monthly or yearly. Yearly billing saves about 17%.

| | Founding Pilot | MSP Pro |
|---|---|---|
| Best for | Early design partners validating the workflow | MSPs standardizing incident reporting across tenants |
| Monthly | €149 / month | €249 / month |
| Yearly | €1,490 / year | €2,490 / year |
| Users | 25 | 50 |
| Tenant workspaces | 5 | 25 |
| Incidents | Unlimited | Unlimited |
| Support | Standard support, plus direct roadmap access | Priority support |

Founding Pilot is offered to a limited cohort.

Both plans include the audit log, evidence vault, evidence pack export,
incident timeline, incident reports, webhooks / PSA intake, and NIS2 milestone
tracking.

Prices include 19% German VAT. See [Tax Presentation](#tax-presentation).

## Self-Hosted Connected (Private Preview)

Self-Hosted Connected is a private design-partner preview for a supported
single-server deployment. It is sales-assisted and cannot be bought through
public checkout. Pricing is shared with qualified design partners. To apply,
use the request form on the [self-host page](https://casepack.app/self-host).

The founding self-host offer starts with a six-calendar-month paid pilot. A
founding annual term can follow when the pilot ends.

The private pilot includes:

- Connected Direct licensing
- Docker Compose or compatible Podman Compose reference profile
- one primary plus one recovery/test deployment identity
- one API replica per deployment
- unlimited tenant workspaces, users, and incidents
- all current CasePack incident, evidence, audit, export, timeline, report, and
  webhook features
- one onboarding session and one recovery exercise
- email support on German business days, with a target initial response within
  two business days
- direct product feedback with the founder

It does not include operation of the customer's database, identity provider,
object storage, networks, backups, or disaster recovery; custom HA/topology
design; a resolution or uptime SLA; Kubernetes support; air-gapped operation;
or brokered enterprise licensing.

Payment starts one six-calendar-month entitlement period. It does not create a
seed license or deployment identity; deployments are enrolled separately.

### Three Self-Host Licensing Modes

| Mode | Availability | Commercial status |
|---|---|---|
| **Connected Direct** | Private MVP preview | Pricing shared with qualified design partners |
| **Air-Gapped Exchange** | Not available | Discovery roadmap; no price |
| **Enterprise Broker / HA** | Not available | Discovery roadmap; custom scope only after validated demand |

The unavailable modes are not feature tiers hidden behind a higher price. They
have different security, support, recovery, and operational costs and will be
designed only if qualified buyers demonstrate the need.

### Why No Tenant or User Limit on Self-Host?

Self-host customers operate their own database and infrastructure, so tenant
and user limits would add enforcement friction without tracking the main
vendor-supplied costs. The founding package instead limits active deployment
identities and the support scope. CasePack may later package paid support,
additional deployment identities, HA, or advanced enterprise capabilities
without metering customer records.

### Buying Self-Host

1. Book a product and deployment-fit conversation.
2. Confirm the workflow problem, Connected privacy boundary, reference profile,
   recovery behavior, and support exclusions.
3. Agree a conditional pilot order and acceptance test.
4. Invoice only when the agreed activation-readiness gate is met.
5. Create the entitlement period after cleared payment and enroll each approved
   deployment separately.

## Partner / Enterprise

For larger MSP groups and custom environments, with custom pricing. It covers
everything in Self-Hosted Connected or a hosted plan as needed, plus:

- higher limits
- white-label / branded exports
- custom integrations
- SLA and onboarding
- procurement support

Contact sales from the [pricing page](https://casepack.app/pricing).

## Tax Presentation

The displayed EUR prices include 19% German VAT because CasePack is launching
from Germany. The actual invoice depends on verified billing location and tax
status. An eligible intra-EU B2B reverse-charge invoice may use the net amount
after VAT-ID validation. Quotes and invoices must show gross, net, rate, and
tax amount or the applicable reverse-charge wording.

These tax treatments, invoice wording, cancellation, and refund terms remain
subject to German tax-adviser and legal approval before the first invoice.

## Near-Future US Pricing

CasePack intends to approach American MSPs. A USD price will be implemented
after at least five US MSP pricing interviews and tax/legal review.

USD prices will be:

- separate market-specific provider price records
- displayed excluding tax with “plus applicable sales tax”
- calculated from verified address, product tax code, customer status,
  registrations, and nexus through Stripe Tax or an equivalent service
- isolated from EUR/VAT labels and calculations

No USD amount is committed yet; applying a simple EUR-to-USD conversion would
not validate willingness to pay or satisfy US sales-tax obligations.

## Related

- [Self-Hosting](/self-hosting/)
- [Licensing & Access States](/licensing-access/)
- [Evidence Pack Export](/evidence-pack-export/)
