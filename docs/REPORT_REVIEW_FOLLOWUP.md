# Report review follow-up

Changes are on the same open implementation PRs; no merges and no main pushes are authorized. PR A/B and the fourth-producer PR receive wiring-only cherry-picks, not merges. Frozen accessibility baseline, application/OpenAPI fixtures, collection assertions, gate enforcement and removal engine remain unchanged.

- Each native product has its own upload. The consolidated Action receives actual `upload-artifact` output URLs keyed by shared-result file paths.
- The Action prepares HTML/JSON, uploads the pair together, then uses that upload URL in a compact comment and the first job-summary section. Native Markdown is retained only in full HTML, not pasted into the comment.
- Up to ten findings per product in the comment, sorted New, Fixed, Still open (collapsed). All shared/native detail remains in full HTML/artifacts. Shared results cap at 100 findings, as before.
- FlakeLens emits WARN for flaky-only, FAIL for regressions, PASS only for zero flaky/zero regressions. WARN is yellow and remains part of the overall verdict. No native CLI exit or existing gate is weakened. Warnings are non-blocking by default, with an explicit fail-on-warn option for enforce mode.
- A11yGate's bundled CLI is byte-for-byte the npm @qe-atlas/a11ygate 0.1.0 artifact. Its official package.json now accompanies the bundle so readVersion() and the shared adapter report the real version. A SHA-256 provenance test guards the exact bundle; it was not rebuilt. The wrapper's target-label sets the native report title and projectName without changing scan URLs, counts or baseline matching.
- The A11yGate integrity test remains an exact immutable-pin assertion, updated to the reviewed adapter commit required by this change. It was not replaced by a looser pattern. Baseline and engine hashes remain unchanged.

## Optional HTML preview

Pages is explicitly opted in for this public synthetic dogfood repository via QE_REPORT_HTML_PREVIEWS=true and QE_REPORT_PREVIEW_BASE_URL. Other consumers are off by default. Fork PRs cannot publish or receive preview links. An isolated job has actions:read, contents:read, pages:write and id-token:write; the product/comment job retains contents:read and pull-requests:write only. The isolated qe-report-preview environment permits only the current PR refs 1, 2, 5 and 8. No PAT or repository secret was added.

The publisher checks out an immutable trusted renderer, reads and validates consolidated JSON artifacts, and re-renders script-free escaped HTML. It never executes application code or artifact HTML. A single deployment rebuilds paths for all open same-repository PRs from latest available artifacts, so deploying B does not overwrite A. Closed PRs or artifacts older than their 14-day retention are not permanent preview storage. Artifacts require GitHub sign-in; Pages HTML does not.

Expected paths after deployment: /qe-dogfood/pr-1/report.html, /pr-2/report.html, /pr-5/report.html and /pr-8/report.html. Exact verified runs, links and remaining limitations will be recorded after execution; an expected path is not yet deployment proof.
