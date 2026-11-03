# FlakeLens report

Processed locally. Source files were not uploaded. All classifications are observational heuristics, not causal proof. Retain original CI failures; no automatic quarantine.

## Summary

- CI runs: 4
- Tests: 8
- Flaky: 1
- Regressions: 1
- Insufficient evidence: 5
- No failures observed (stable): 1
- 9 failed attempts · 4 heuristic message clusters (not confirmed root causes)

## Evidence and recommended review

### triage \> regression

- Verdict: regression
- Reasons: persistent-failure-after-pass
- 2 independent timestamp-ordered failing runs after a passing observation; first observed failing commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb. This is a regression pattern, not proof of causal commit.
- Observations: 3 runs, 3 executed attempts, 1 pass, 2 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the persistent failure and compare the observed boundary; retain the original CI failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts pass; retry indexes 0 (sequence); final pass.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts fail; retry indexes 0 (sequence); final fail.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts fail; retry indexes 0 (sequence); final fail.

### triage \> cross-commit

- Verdict: insufficient-evidence
- Reasons: cross-commit-only
- 3 observed run\(s\), 2 passing and 1 failing attempt\(s\). No confirmed retry/same-commit variation or qualified persistent regression boundary; abstaining.
- Observations: 3 runs, 3 executed attempts, 2 pass, 1 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the current failure; collect independent runs, explicit retries, commit/run IDs and timestamps. Do not suppress the failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts pass; retry indexes 0 (sequence); final pass.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts fail; retry indexes 0 (sequence); final fail.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts pass; retry indexes 0 (sequence); final pass.

### triage \> missing

- Verdict: insufficient-evidence
- Reasons: single-failure, missing-commit-metadata, missing-run-metadata, unverified-history-order
- 1 observed run\(s\), 0 passing and 1 failing attempt\(s\). No confirmed retry/same-commit variation or qualified persistent regression boundary; abstaining.
- Observations: 1 runs, 1 executed attempts, 0 pass, 1 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: file-order; missing commit: 1; missing run ID: 1.
- Next: Investigate the current failure; collect independent runs, explicit retries, commit/run IDs and timestamps. Do not suppress the failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Limitation: 1 run\(s\) have no commit metadata; order labels are not commits.
- Limitation: 1 run\(s\) have no run identity; generated labels are not independent CI runs.
- Limitation: Whole-history strict timestamp chronology is unavailable. Regression qualification requires its own ordered candidate window; file order alone is never proof.
- Run file-3; commit order-3 (order); run ID source order; time missing; file missing-metadata.xml; attempts fail; retry indexes 0 (sequence); final fail.

### triage \> never-green

- Verdict: insufficient-evidence
- Reasons: no-passing-baseline
- 3 observed run\(s\), 0 passing and 3 failing attempt\(s\). No confirmed retry/same-commit variation or qualified persistent regression boundary; abstaining.
- Observations: 3 runs, 3 executed attempts, 0 pass, 3 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the current failure; collect independent runs, explicit retries, commit/run IDs and timestamps. Do not suppress the failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts fail; retry indexes 0 (sequence); final fail.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts fail; retry indexes 0 (sequence); final fail.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts fail; retry indexes 0 (sequence); final fail.

### triage \> single

- Verdict: insufficient-evidence
- Reasons: single-failure
- 1 observed run\(s\), 0 passing and 1 failing attempt\(s\). No confirmed retry/same-commit variation or qualified persistent regression boundary; abstaining.
- Observations: 1 runs, 1 executed attempts, 0 pass, 1 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the current failure; collect independent runs, explicit retries, commit/run IDs and timestamps. Do not suppress the failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts fail; retry indexes 0 (sequence); final fail.

### triage \> skip-only

- Verdict: insufficient-evidence
- Reasons: no-executed-attempts
- 3 observed run\(s\), 0 passing and 0 failing attempt\(s\). No confirmed retry/same-commit variation or qualified persistent regression boundary; abstaining.
- Observations: 3 runs, 0 executed attempts, 0 pass, 0 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the current failure; collect independent runs, explicit retries, commit/run IDs and timestamps. Do not suppress the failure.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts skip; retry indexes 0 (sequence); final skip.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts skip; retry indexes 0 (sequence); final skip.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts skip; retry indexes 0 (sequence); final skip.

### triage \> recovery

- Verdict: flaky
- Reasons: retry-recovery, same-commit-outcomes
- 1 explicit retry recovery run\(s\), 1 provided commit\(s\) with both pass and fail attempts. Outcomes vary; the failure is not harmless.
- Observations: 3 runs, 4 executed attempts, 3 pass, 1 fail; 1 explicit retry recoveries; 1 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: Investigate the differing outcomes and retry logs; do not ignore, quarantine, or turn CI green automatically.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts fail → pass; retry indexes 0, 1 (property, property); final pass.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts pass; retry indexes 0 (sequence); final pass.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts pass; retry indexes 0 (sequence); final pass.

### triage \> clean

- Verdict: stable
- Reasons: no-failures-observed
- 3 passing attempt\(s\), no failures observed. This does not establish future stability.
- Observations: 3 runs, 3 executed attempts, 3 pass, 0 fail; 0 explicit retry recoveries; 0 same-commit mixes.
- Chronology: timestamp; missing commit: 0; missing run ID: 0.
- Next: No observed failure in this sample; retain normal CI gates.
- Limitation: Commit/run metadata is caller supplied; branch, ancestry, environment and test identity are not verified.
- Run synthetic-1; commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (file); run ID source file; time 2026-01-01T00:00:00Z; file run-1.xml; attempts pass; retry indexes 0 (sequence); final pass.
- Run synthetic-2; commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (file); run ID source file; time 2026-01-02T00:00:00Z; file run-2.xml; attempts pass; retry indexes 0 (sequence); final pass.
- Run synthetic-3; commit cccccccccccccccccccccccccccccccccccccccc (file); run ID source file; time 2026-01-03T00:00:00Z; file run-3.xml; attempts pass; retry indexes 0 (sequence); final pass.

## Heuristic failure clusters

Message similarity is not a confirmed shared root cause.
- 6 failed attempts: SYNTHETIC\_ONLY failure (triage \> cross-commit, triage \> never-green, triage \> regression)
- 1 failed attempts: SYNTHETIC\_ONLY missing metadata (triage \> missing)
- 1 failed attempts: SYNTHETIC\_ONLY retry (triage \> recovery)
- 1 failed attempts: SYNTHETIC\_ONLY single failure (triage \> single)

## Heuristic ranking

Impact = flip rate × executions; overlapping signals may double-count. Scores are not probabilities and are not computed for abstentions.
- triage \> recovery: score 0.667, flip rate 0.500, executions 4, impact 2.

## Scenario cost estimate

Not estimated. No measured customer cost or savings.

## Review candidates — not a quarantine policy

- triage \> regression (regression)
- triage \> cross-commit (insufficient-evidence)
- triage \> missing (insufficient-evidence)
- triage \> never-green (insufficient-evidence)
- triage \> single (insufficient-evidence)
- triage \> skip-only (insufficient-evidence)
- triage \> recovery (flaky)

No quarantine entries or actions are generated.
