# SYNTHETIC FlakeLens evidence triage

This is a declared eight-case XML fixture, **not real customer CI** and not a replacement for the existing app's five-run timing-race demonstration. Neither existing demo A/B intent, `.github/workflows/qe.yml`, the frozen axe baseline nor the approved SpecGate adapter is modified. No private SpecGate scanner code is included.

The new `FlakeLens SYNTHETIC evidence triage` workflow consumes public FlakeLens runtime pin `647f7d83b36b6f4d0878611078fea28e0babc583` (PR #9, stacked on #7 → #4), calling the existing CLI/shared parser/scorer. No classifier is copied here. It needs no credential, hosted history, comment/deployment access or package publication. Dependencies are locked and lifecycle scripts disabled.

## Reproduce

Checkout the FlakeLens pin and run the exact commands in its [CI quickstart](https://github.com/DaveEliranAssistant/flakelens/blob/59619b6667d6de3a45748fe7b90a62364ac44408/docs/CI_QUICKSTART.md). The four XML files here and in product `tests/fixtures/evidence/` are byte-identical. Or run the new workflow on this PR; download `flakelens-SYNTHETIC-triage-proof` for raw inputs, native JSON/Markdown, qe-result v1 and the checked-out product revision.

Run the local consumer assertions with Node 24:

```bash
npm ci --ignore-scripts
npm test
npm run typecheck
```

For newly produced reports: `node scripts/verify-flakelens-triage.mjs /new/flakelens.json /new/qe-result-flakelens.json`. The independent expected manifest predates implementation. The guard asserts every test, summary count, evidence/provenance, empty quarantine/actions and retained shared FAIL. It is a fixture oracle, not a second classifier.

## Recorded actual before/after

`flakelens-triage-evidence/before/` is real CLI execution at `e0a76acf21b83a0cb4b73ee82035582ed8488e1b`; `after/` is real execution of the new policy. Inputs and expected cases are in `fixtures/flakelens-triage/`; every run/commit label is deliberately synthetic.

- Single failure: flaky → insufficient-evidence (`single-failure`).
- All-failing history without a pass: regression → insufficient-evidence (`no-passing-baseline`).
- Cross-commit pass/fail/pass: flaky → insufficient-evidence (`cross-commit-only`).
- Missing metadata: flaky → insufficient-evidence, with visible missing IDs/order provenance.
- Explicit retry recovery: flaky remains flaky, now with retry evidence and investigation guidance.
- Qualified persistent failure after a pass: regression remains regression, with a first-observed boundary rather than causal proof.
- Skipped-only: stable → insufficient-evidence; passing-only remains no failures observed.

Totals: old 4 flaky / 2 regression / 2 stable; new 1 flaky / 1 regression / 5 insufficient evidence / 1 no failures observed. All 9 raw failed attempts remain visible. The aggregate native/shared result retains the seeded regression; **qe-result is FAIL**. A green synthetic assertion job proves those expected labels, not application health. Normal test failures must remain failures, and suspected flakes must not be automatically ignored or quarantined.

Message clusters are heuristic, not confirmed root causes; cost scenarios are assumptions, not measured savings. Reports are processed locally on the runner; artifact transport is an explicit GitHub choice with 14-day retention. Raw customer input is not used. Setup-time, triage-time and classification-correction metrics are proposals in the product policy, not invented customer results.
