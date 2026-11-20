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
- Where a skill is silent, follow the conventions below. Where this file explicitly overrides a skill (see [Plans and task lists](#plans-and-task-lists)), this file wins.

## Plans and task lists

Every piece of agent work that takes more than one step gets its own folder in `tasks/`, so whoever follows along can tell which plan is in progress. The upstream planning skills (`planning-and-task-breakdown`, `spec-driven-development`) default to `tasks/plan.md` and `tasks/todo.md`. If you use them, read those paths as `tasks/<name>/plan.md` and `tasks/<name>/todo.md`. Skills are vendored and re-synced from upstream (`skills-lock.json`), so the override lives here.

- **One folder per piece of work:** `tasks/<name>/`, where `<name>` is two to five lowercase words in kebab-case that say what the work is, e.g. `tasks/notifications-page/`. Never write `plan.md` or `todo.md` directly in `tasks/`, and never reuse a folder for different work.
- **`plan.md`:** what the work is and why, where it comes from (roadmap item, spec, issue or request), the approach, risks, and how it will be verified.
- **`todo.md`:** the checklist. Directly under the title, a line starting `Status: Active` (or `Paused` / `Complete`), then the branch and PR once they exist, and a link to `plan.md`.
- **Create both before implementing**, and commit them first on the work's branch. When you start, tell the user the path to `todo.md`.
- **Tick each item as soon as it is done** and commit the tick with that slice, so `todo.md` always shows real progress. When the work is finished, set `Status: Complete` and record the verification results.
- See [`tasks/README.md`](tasks/README.md).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 + Starlight 0.38 |
| Language | TypeScript 5.9 (strict) |
| Images | sharp |
| Container | Docker (nginx:alpine) |
| Deploy | Helm chart + ArgoCD (staging/prod) |
| CI/CD | GitHub Actions → GHCR image → Helm chart PR to `sammyeby/charts` |

## Project Structure

```
src/
├── content/docs/       # One .md/.mdx file per page — this is almost all of the repo's content
├── content.config.ts   # Starlight docs collection loader/schema (rarely needs edits)
├── assets/             # Logo SVGs (light/dark)
├── pages/              # Non-doc endpoints: llms.txt / llms-full.txt (plain-text docs for AI assistants)
├── utils/llms.ts       # Shared helpers for those endpoints (published pages only; `draft: true` pages are filtered out)
└── styles/custom.css   # Starlight theme overrides — matches the CasePack SPA design system
astro.config.mjs        # Site title, social links, head tags, and the SIDEBAR STRUCTURE
public/                 # Static passthrough (favicon, robots.txt, etc.)
infrastructure/
└── helm/casepack-docs/ # values-staging.yaml, values-prod.yaml
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
- Releases are cut via the `Release` GitHub Action (`workflow_dispatch` on `.github/workflows/release.yml`): bumps `package.json` to the release version, tags `vX.Y.Z`, pushes the commit and the tag to `main` in one atomic push, creates a GitHub Release, explicitly dispatches the release image build, then bumps `main` to the next `-dev` version.
- `build-publish.yml` runs on every push/PR (type-check + build, then checks robots.txt, the sitemap and the llms files, and rebuilds with a throwaway draft page to confirm drafts stay unpublished); on `main`/tags it also builds & pushes a multi-arch Docker image to `ghcr.io/sammyeby/casepack-docs`, and on tags opens a PR against `sammyeby/charts` bumping the Helm chart version.
- Don't hand-edit the chart version in `sammyeby/charts` — that PR is automated.

### Branch protection & the RELEASE_TOKEN secret

`main` is a protected branch: PRs with 1 approval are required to merge, and force-push/deletion are blocked. Admins (`sammyeby`, the owner) are exempt (`enforce_admins: false`), so they can still push directly. Non-admins — including outside contributors who use the "Edit page" link — must go through an approved PR.

Because of this, the release job **cannot** use the default `GITHUB_TOKEN` to push to `main` (it authenticates as `github-actions[bot]`, which is not exempt and gets rejected with `GH006: Protected branch update failed`). Instead `release.yml` checks out with `secrets.RELEASE_TOKEN` — a **fine-grained PAT owned by `sammyeby`** (the repo owner, hence exempt; replaced on 2026-11-19 after the move) scoped to this repo with **Contents: Read and write**.

- If a release fails on `git push` with a protected-branch error, `RELEASE_TOKEN` is almost certainly **missing or expired**. Fine-grained PATs expire (max 1 year) — rotate it and re-set the secret: `gh secret set RELEASE_TOKEN --repo sammyeby/casepack-docs`.
- `actions/checkout` persists `RELEASE_TOKEN`, so every `git push` in the job uses it, including the atomic push of the release commit and tag. Only `gh release create` and the workflow dispatches use the plain `GITHUB_TOKEN`. The release-image build is triggered by an **explicit `gh workflow run` dispatch** because `build-publish.yml` filters its tag trigger by `paths`, so relying on the tag push to auto-trigger it is unreliable.
- The same branch protection is applied to `sammyeby/charts`, `sammyeby/images`, and `sammyeby/casepack`. Those repos don't push to their own protected `main` in CI, so they don't need a `RELEASE_TOKEN` today.

## Deployment

Static site served by nginx (`nginx.conf` sets security headers, aggressive caching on hashed assets, `/healthz`). Environment values live in `infrastructure/helm/casepack-docs/`. The staging (`staging.docs.casepack.app`) and production (`docs.casepack.app`) Argo CD Applications live in [`sammyeby/argocd`](https://github.com/sammyeby/argocd/tree/main/managed) with a pinned chart version and full source commit SHA. Publishing the chart opens or updates a staging PR there. After that PR merges, live Argo CD health and a public smoke check gate a production PR. Review and merge each promotion PR; don't apply product Application manifests from this repository.
