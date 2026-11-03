# Consolidated QE Atlas Report — verified 2026-11-03

## Current views

- **Original PR A, expected FAIL:** [run 41594255626](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594255626), [consolidated comment](https://github.com/DaveEliranAssistant/qe-dogfood/pull/1#issuecomment-6597636876), [HTML/JSON artifact](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594255626/artifacts/13211238898).
- **Original PR B, PASS, attempt 2:** [run 41594264027](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594264027), [consolidated comment](https://github.com/DaveEliranAssistant/qe-dogfood/pull/2#issuecomment-6597642970), [latest HTML/JSON artifact](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594264027/artifacts/13211304677).
- **Temporary fourth-product demo, PASS:** [PR #8](https://github.com/DaveEliranAssistant/qe-dogfood/pull/8), [run 41594419194](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594419194), [comment](https://github.com/DaveEliranAssistant/qe-dogfood/pull/8#issuecomment-6597671810), [artifact](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/41594419194/artifacts/13211820907).

Download the artifact and open `report.html`. It is self-contained and script-free. GitHub may require sign-in to download artifacts; retention is 14 days. `report.json` is the aggregated machine-readable view and `report.md` is the exact consolidated comment content.

## What was actually verified

A11yGate has **1 new / 0 fixed / 3 still open** on A and **0 new / 0 fixed / 3 still open** on B. SpecGate detects **one path removal** on A and **zero removals** on B. FlakeLens shows **one flaky test across five runs**, four stable tests, zero regressions and score 0.6 on both. Its PASS means informational analysis completed, not flake-free tests. SpecGate PASS is removal rules only; manual review and all unassessed compatibility diagnostics remain visible.

The reports were downloaded from actual CI artifacts and checked against each native product JSON. Their Markdown was compared byte-for-byte to the read-back PR comment. Re-running B updated the **same comment ID 6597642970**, leaving one consolidated comment. Superseded A11yGate-only bot comments on A/B were removed after consolidated readback; no human comments were edited. The existing per-product output files remain in `qe-product-reports`.

Generated HTML from A, B and the fourth demo was opened in real Chrome at desktop/mobile sizes. Product row counts, overall headings, native details keyboard toggling, no body overflow and no browser exceptions were checked. Actual axe scans found **zero violations**, then the A11yGate Action's real bundled CLI evaluated those scans at **minor** with no baseline, producing **PASS / 0 new / 0 fixed / 0 still open**. This is automated evidence, not accessibility certification or a manual screen-reader audit. The receipt/screenshot files are under [evidence/consolidated-report](evidence/consolidated-report).

The fourth record is deliberately named **DemoFourthProduct** and labeled synthetic. It is not another real product. All three real products remain populated. The identical reporter runtime SHA is used by A, B and the fourth demo; no renderer/product-list change was made for it.

## PRs, pins and scope

- [Reporter PR #1](https://github.com/DaveEliranAssistant/qe-atlas-report/pull/1), public MIT. Runtime pin `529ba98d526f7e70b6f9836009da61252b344f0c`; additional enforcement/summary tests in `8f5ed693e694606387042f9b89a5d5bdbfeb3b8a` change tests only. Nine reporter test cases pass.
- [A11yGate Action PR #3](https://github.com/DaveEliranAssistant/a11ygate-action/pull/3), pin `69452695759a5506f008a45f0a8bcb05596bb6d3`.
- [FlakeLens PR #7](https://github.com/DaveEliranAssistant/flakelens/pull/7), stacked on CLI PR #4, pin `21ee64a52c2d1d101be80eaf58c01c20bb98efb9`.
- [SpecGate PR #3](https://github.com/DaveEliranAssistant/specgate/pull/3), stacked on removal CLI PR #1, pin `322b4cbaca45458a701a1af713fef180f6764f94`.
- [Dogfood integration PR #5](https://github.com/DaveEliranAssistant/qe-dogfood/pull/5). Only test-branch wiring PRs [#6](https://github.com/DaveEliranAssistant/qe-dogfood/pull/6) and [#7](https://github.com/DaveEliranAssistant/qe-dogfood/pull/7) were merged, into the original **demo** branches, not main.
- [QE Atlas handoff draft PR #5](https://github.com/DaveEliranAssistant/qe-atlas/pull/5).

No existing main branch, baseline, strict gate, expected application behavior, Hermes publisher/configuration, access policy or paid resource was changed. The SpecGate engine hash remains `ef87326988d381c15997bcb9e6bf48fc47c66cd46526f65c282e4eedea1e9c69`; the vendored file allowlist explicitly adds only its shared-result module. Tooling and baselines remain separate from untrusted app execution; comment job permissions are contents read and pull-requests write. The generic reporter is the final `if: always()` step after unchanged native enforcement. Its report-only setting cannot turn earlier failures green. Bespoke summarize.mjs was removed after local parity against actual A outputs.

## Contract and limits

Published in the reporter PR: `schema/qe-result-v1.schema.json`, validator `src/validate.mjs`, generic composite `action.yml`. Every producer preserves native reports and writes a named `qe-result-*.json` beside them. Missing expected files and invalid records produce explicit ERROR rows. New producers are discovered by glob; list expected files to detect missing producers. Bounds and large-comment handling are documented in the Action README.

## Filed gaps

- [FlakeLens #8](https://github.com/DaveEliranAssistant/flakelens/issues/8): 16 moderate pre-existing toolchain audit entries; lockfile not changed here.
- [A11yGate Action #4](https://github.com/DaveEliranAssistant/a11ygate-action/issues/4): native bundle reports version 0.0.0.
- [Reporter #2](https://github.com/DaveEliranAssistant/qe-atlas-report/issues/2): oversized PR-comment presentation needs generic linked partitioning; current behavior fails visibly rather than dropping data.
- [Reporter #3](https://github.com/DaveEliranAssistant/qe-atlas-report/issues/3): improve narrow table identifier/header wrapping. Automated accessibility passes do not guarantee polished layout.

Existing release/distribution issues [FlakeLens #5](https://github.com/DaveEliranAssistant/flakelens/issues/5) and [SpecGate #2](https://github.com/DaveEliranAssistant/specgate/issues/2) remain. These are reviewable PRs, not stable release tags or customer-pilot qualification. The fourth demo must not be merged into main.

## Reproduce browser evidence

After downloading the report bundle into a directory:

```sh
npm ci --ignore-scripts
npx playwright install chromium
node scripts/verify-consolidated-report.mjs /path/to/downloaded-report
```

For installed Chrome, set `REPORT_BROWSER_CHANNEL=chrome`. This scans the actual report through a loopback HTTP server, not fabricated browser results. Re-evaluate its `report-axe-results.json` with the pinned A11yGate Action or CLI at threshold minor. Do not regenerate a baseline to hide failures.
