# FlakeLens report

Analyzed locally. Source files were not uploaded.

## Summary

- CI runs: 4
- Tests: 8
- Flaky: 4
- Regressions: 2
- Stable: 2
- 9 failures = 4 root causes

## Regressions

- `triage > never-green` failing since `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
- `triage > regression` failing since `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`

## Top impact

Impact = flip rate × executions.

| Test | Score | Flip rate | Executions | Impact |
| --- | ---: | ---: | ---: | ---: |
| `triage > cross-commit` | 0.667 | 0.667 | 3 | 2 |
| `triage > recovery` | 0.667 | 0.500 | 4 | 2 |
| `triage > missing` | 0 | 0 | 1 | 0 |
| `triage > single` | 0 | 0 | 1 | 0 |

## Root causes

- 6 × SYNTHETIC_ONLY failure
  - `triage > cross-commit`
  - `triage > never-green`
  - `triage > regression`
- 1 × SYNTHETIC_ONLY missing metadata
  - `triage > missing`
- 1 × SYNTHETIC_ONLY retry
  - `triage > recovery`
- 1 × SYNTHETIC_ONLY single failure
  - `triage > single`

## Quarantine list

```
triage > cross-commit
triage > recovery
triage > missing
triage > single
```

## Cost of flakiness

Not estimated.

## Per-test history

### triage > never-green

- Verdict: regression
- F F F

### triage > regression

- Verdict: regression
- P F F

### triage > cross-commit

- Verdict: flaky
- P F P

### triage > recovery

- Verdict: flaky
- P* P P

### triage > missing

- Verdict: flaky
- F

### triage > single

- Verdict: flaky
- F

### triage > clean

- Verdict: stable
- P P P

### triage > skip-only

- Verdict: stable
- S S S
