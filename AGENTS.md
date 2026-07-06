# AGENTS.md — CasePack Docs

Guidance for AI coding agents working on this codebase. Read this before making any change.

This repo is the **public documentation site** for CasePack (an MSP incident-reporting/evidence-management product). It is an Astro + Starlight static site — content-heavy, no application code, no backend, no tests. The actual product lives in the sibling `casepack-spa` repo; don't invent features here that aren't real in the product.

---

## Skills — always use these

This repo ships agent skills in [`.agents/skills/`](.agents/skills/). **Always invoke the relevant skill before and during matching work — do not work from memory when a skill applies.**

| Skill | Use it whenever you are… |
|---|---|
| [`incremental-implementation`](.agents/skills/incremental-implementation/SKILL.md) | Making any change that spans more than one file — e.g. adding a doc page (content + sidebar entry + cross-links), or a version/release change touching multiple config files. Land it in small, verifiable slices. |
| [`frontend-ui-engineering`](.agents/skills/frontend-ui-engineering/SKILL.md) | Touching the site's presentation layer: `astro.config.mjs` (sidebar, head tags, Starlight options), `src/styles/custom.css` (theme tokens), or logo/asset changes. Must match the existing CasePack design system (Inter font, blue-gray/hue-220 palette, `0.625rem` radius) — see the header comment in `custom.css`. Not for writing prose content. |
| [`security-and-hardening`](.agents/skills/security-and-hardening/SKILL.md) | Touching `Dockerfile`, `nginx.conf`, CI workflows, or dependencies. There's no user input or backend here, so the concern is: no secrets in commits/workflows, security headers stay intact in `nginx.conf`, and `npm audit` stays clean. |
| [`code-review-and-quality`](.agents/skills/code-review-and-quality/SKILL.md) | Reviewing any change before it merges — your own, another agent's, or a human's. No change merges unreviewed. |

Rules:
- **Default to using a skill.** If a task plausibly matches a skill's trigger, invoke it.
- More than one skill can apply to a single task. Use all that apply.
- Where a skill is silent, follow the conventions below.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 + Starlight 0.38 |
| Language | TypeScript 5.9 (strict) |
| Images | sharp |
| Container | Docker (nginx:alpine) |
| Deploy | Helm chart + ArgoCD (staging/prod) |
| CI/CD | GitHub Actions → GHCR image → Helm chart PR to `bysamio/charts` |

## Project Structure

```
src/
├── content/docs/       # One .md/.mdx file per page — this is almost all of the repo's content
├── content.config.ts   # Starlight docs collection loader/schema (rarely needs edits)
├── assets/             # Logo SVGs (light/dark)
└── styles/custom.css   # Starlight theme overrides — matches the CasePack SPA design system
astro.config.mjs        # Site title, social links, head tags, and the SIDEBAR STRUCTURE
public/                 # Static passthrough (favicon, etc.)
infrastructure/
├── helm/casepack-docs/ # values-staging.yaml, values-prod.yaml
└── argocd/             # ArgoCD Application manifests for staging/prod
Dockerfile              # Multi-stage: node build → nginx:alpine serve
nginx.conf              # Static serving + security headers + /healthz
```

## Build & Dev Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with live reload |
| `npm run check` | Type-check content/config (`astro check`) — same as CI |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |

There is no test suite. Verification for any change = `npm run check` + `npm run build`, and for anything visual, `npm run dev` and look at it in a browser.

## Content Authoring Conventions

- Every page needs frontmatter with `title` and `description` (one sentence, ends in a period). Quote `title` only when it contains a colon (e.g. `"Admin: Tenants"`).
- **Adding a page requires two edits, not one:** the content file under `src/content/docs/`, *and* a sidebar entry in `astro.config.mjs`. A page not in the sidebar is unreachable from nav (still valid to link to directly, but almost always an oversight).
- Cross-link related pages using root-relative Starlight routes: `/self-hosting/`, `/licensing-access/`, etc. (slug = filename without extension).
- Plan-gated features (Timeline, Reports, Evidence Pack Export, NIS2 Milestones, Webhooks, Audit Log) must note the gating and link to [`/licensing-access/`](src/content/docs/licensing-access.md) — use a `>` blockquote, matching existing pages.
- Keyboard shortcuts, UI labels, and button text are bolded (`**Cmd+I**`, `**"New Incident"**`) to match existing pages.
- Don't document product behavior you haven't confirmed against `casepack-spa` — if unsure whether a described feature/flow is accurate, say so rather than guessing.

## Versioning & Release

- Version lives in `package.json` (currently a `-dev` prerelease between releases).
- Releases are cut via the `Release` GitHub Action (`workflow_dispatch` on `.github/workflows/release.yml`): bumps `package.json`, tags `vX.Y.Z`, creates a GitHub Release, then bumps `main` to the next `-dev` version.
- `build-publish.yml` runs on every push/PR (type-check + build); on `main`/tags it also builds & pushes a multi-arch Docker image to `ghcr.io/bysamio/casepack-docs`, and on tags opens a PR against `bysamio/charts` bumping the Helm chart version.
- Don't hand-edit the chart version in `bysamio/charts` — that PR is automated.

## Deployment

Static site served by nginx (`nginx.conf` sets security headers, aggressive caching on hashed assets, `/healthz`). Deployed via Helm chart in `infrastructure/helm/casepack-docs/`, synced by ArgoCD (`infrastructure/argocd/`) to staging (`staging.docs.casepack.app`) and prod (`docs.casepack.app`). Don't push to these manually — deploys flow through the release pipeline above.
