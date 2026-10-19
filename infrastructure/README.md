# CasePack docs deployment

This repository owns the source and the staging/production Helm values in
`helm/casepack-docs/`. The Argo CD Applications are managed in
[`bysamio/argocd`](https://github.com/bysamio/argocd/tree/main/managed).

A published chart proposes a staging PR in the central repository. After the
merged release reports the exact chart and values revisions as Synced and
Healthy and the public staging site passes a smoke check, automation proposes
a production PR. Each values reference is pinned to a full commit SHA.
