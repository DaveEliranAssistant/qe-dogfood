# Verified dogfood runs — 2026-11-02

**Superseded presentation:** See [Consolidated QE Atlas Report](CONSOLIDATED_REPORT.md) for current A/B runs, one updating comment, HTML artifacts and screenshots. The original raw evidence below remains historical; no baseline changes.

## Open these two runs

| Demo | Open PR | Actions run | Actual conclusion |
|---|---|---|---|
| A: new unlabelled input + removed health endpoint | [PR #1](https://github.com/DaveEliranAssistant/qe-dogfood/pull/1) | [41529130460](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41529130460) | **FAIL — expected regression gate failure** |
| B: clean documentation change | [PR #2](https://github.com/DaveEliranAssistant/qe-dogfood/pull/2) | [41529136093](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41529136093) | **PASS** |

Both PRs remain open. A failing A run is the demonstration working, not a setup failure.

Open the run, then **Product reports** and its job summary. A11yGate contributes its native new/fixed/still-open report; FlakeLens and SpecGate reports are appended in the same job. Download **qe-raw-evidence** for all five actual JUnit files, Playwright JSON and axe scans; download **qe-product-reports** for each product's JSON and Markdown. GitHub may require sign-in for logs/artifact downloads. Artifacts are retained for 14 days; rerun or use workflow_dispatch for fresh evidence after expiry.

## Actual product outputs

| Product | PR A | PR B |
|---|---|---|
| FlakeLens | 5 runs, 5 tests, **1 flaky / 4 stable / 0 regressions**; 2 failures grouped into 1 root cause | Same |
| A11yGate | **FAIL**: 1 new `label` finding, 0 fixed, 3 still open | **PASS**: 0 new, 0 fixed, 3 still open |
| SpecGate | **FAIL_REMOVALS**: 1 `PATH_REMOVED` at `/paths/~1api~1health`; no duplicate operation finding | **PASS_REMOVAL_RULES_ONLY**: no path/operation removals |

Current consolidated comments (historical A11yGate-only bot comments were retired after verified replacement):
- [PR A failure report](https://github.com/DaveEliranAssistant/qe-dogfood/pull/1#issuecomment-6597636876)
- [PR B passing report](https://github.com/DaveEliranAssistant/qe-dogfood/pull/2#issuecomment-6597642970)

Verified source commits:
- A: `298f483d8c7bc3ac65307359c54754bf498add2a`
- B: `481a492ac93f1279e6ffcac49cc839bc3c3e6d6a`

The [machine-readable receipt](verified-runs.json) records actual downloaded report hashes, artifact IDs/digests and GitHub run metadata. Verification asserted exactly five XML files per run, five executions with exits `1,0,0,0,1`, one named flaky test, expected gate counts and the exact run/head SHA. No product response was synthesized. The app scans run on the PR head, while the baseline/tooling and OpenAPI base come from the reviewed PR base.

## Product contributions and gaps

All changes to existing product repositories are **open PRs**, not main pushes or releases:

- [FlakeLens CLI PR #4](https://github.com/DaveEliranAssistant/flakelens/pull/4): shared parser/scorer/renderers, bounded local XML, JSON/Markdown. Pinned to `ec0969e0e2b3171f664cd351c60979b5c227fcbf`; 22 unit tests, TypeScript/lint and actual dogfood inputs passed. [Distribution gap #5](https://github.com/DaveEliranAssistant/flakelens/issues/5).
- [SpecGate wrapper PR #1](https://github.com/DaveEliranAssistant/specgate/pull/1): unchanged historical engine plus bounded CLI, 68 tests and passing Node 22/24 CI. Only the owner-approved isolated MIT snapshot is vendored. [Distribution gap #2](https://github.com/DaveEliranAssistant/specgate/issues/2).
- [A11yGate action issue #1](https://github.com/DaveEliranAssistant/a11ygate-action/issues/1) and [documentation PR #2](https://github.com/DaveEliranAssistant/a11ygate-action/pull/2): the original `issues: write` recipe produced 403 on PR comment creation even with passing findings. `pull-requests: write` in the isolated report job fixes it. Dogfood infrastructure [PR #3](https://github.com/DaveEliranAssistant/qe-dogfood/pull/3) was tested and merged; no PAT, security-setting change, baseline update or assertion weakening was used.
- [FlakeLens licensing-copy issue #6](https://github.com/DaveEliranAssistant/flakelens/issues/6): README/footer rights-reserved copy contradicts its actual MIT LICENSE and package metadata; no licensing change made.

Initial runs `41527871855` and `41527876675` captured correct product findings but could not post comments. They are historical troubleshooting evidence, not the final successful adoption path. The final runs above include verified comments.

## Limits remain visible

A11yGate PASS still includes the three intentionally accepted defects; it is not WCAG certification. FlakeLens labels are heuristic, and five reruns of one commit do not locate a regression-introducing commit. SpecGate checks only exact removed paths and lowercase operations in supported OpenAPI 3.0.x JSON; schemas/auth/responses/references/runtime behavior remain unassessed. Its engine status stays `manual_review` even with exit 0. The separate code-first scanner is neither published nor exercised by this workflow.

No existing product main branch, Vercel protection, Hermes publisher or publisher configuration was changed by this dogfood task.
