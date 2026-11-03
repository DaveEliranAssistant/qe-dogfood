# Synthetic accessibility coverage proof

This PR is a regression-evidence demonstration, **not new browser scans or customer results**. It reuses the original frozen qe-dogfood axe evidence and existing Action/shared-report integration. `a11y-baseline.json`, its provenance, original assertions, application, A/B intent, vendor snapshot and `.github/workflows/qe.yml` are unchanged.

## Reproduce

The new `.github/workflows/a11y-coverage.yml` checks out Action `73e911d1b19ba4aeb52be94fa37de6c668225cf3` and reads the approved baseline from the PR base SHA. In a checkout of this PR:

```sh
npm ci --ignore-scripts
npm test && npm run typecheck
git clone https://github.com/DaveEliranAssistant/a11ygate-action.git ../a11ygate-action
git -C ../a11ygate-action checkout --detach 73e911d1b19ba4aeb52be94fa37de6c668225cf3
node scripts/run-a11y-coverage.mjs ../a11ygate-action a11y-baseline.json reports/a11y-coverage
```

The independent `fixtures/a11y-coverage/expected.json` declares all twelve scenarios and exact newly accepted/retained fingerprints, rule IDs and selectors. Mutation tests reject wrong counts, false fixes, stale PASS after malformed input, missing coverage reasons/scope, incorrect shared metrics and wrong accepted debt identities. A combined new regression plus missing page must remain FAIL while exposing three unassessed old findings.

## Actual local sample output

See [before/after](a11y-coverage-evidence/before-after.json), [receipt](a11y-coverage-evidence/receipt.json), [passing native report with three open defects](a11y-coverage-evidence/existing-debt.json), [missing-page report](a11y-coverage-evidence/missing-page.json) and [exact baseline acceptance review](a11y-coverage-evidence/proposed-baseline.json.review.json). These files are captured from actual runner invocations on hypothetical inputs, not fabricated API responses or claims of remediation.

Missing/failed/config-changed pages previously became three fixed findings/PASS. They now remain three **unassessed** findings, zero fixes and INCOMPLETE/error. The selector-change case now leaves its old occurrence unassessed rather than fixed, alongside its detected new violation. Existing-debt PASS still shows all three accepted defects and unassessed manual scope. Explicit synthetic human-passed evidence never clears an automated FAIL. The baseline proposal explicitly accepts only new `label|#synthetic-input|/accessibility`, retains the three independently declared debts and does not clear its invocation's FAIL.

## CI, comments and scope

The new proof workflow preserves all hypothetical inputs, native JSON/Markdown, shared v1 JSON and acceptance sidecar. The read-only job deliberately tests denied commenting; a separate same-repo job uses `pull-requests: write` to post/update one own-bot report. Forks use read-only artifacts/summary, with no elevated trigger or PAT. Mocked event/transport fork tests are not a live outside-account fork claim. Job-token 403 and actual posted comment/run URLs are recorded after real CI readback, not inferred from these local tests. Existing released v1 workflow remains untouched and independently enforced.

[Independent source review](a11y-coverage-evidence/independent-review.txt) passed after reproducing and fixing contradictory failed-scan metadata and dangling output symlink faults. The reviewer did not run tests. Its consumer-guard suggestions were implemented with additional observed RED/GREEN tests.

A passing regression gate is not accessibility clearance, certification or legal advice. Complete means comparable **supplied** scope/metadata, not every page/state/rule. Legacy absent configuration is explicitly unverified and nonblocking; caller equivalence, selector matching and manual assertions remain limitations. Installation success, remediation time and misleading-result reports are proposed metrics, currently unmeasured on customers. GitHub artifacts require appropriate access and expire after 14 days. No merge, release, baseline approval, private scanner publication or publisher/config change.
