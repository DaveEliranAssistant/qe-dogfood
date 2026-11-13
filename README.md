# QE Dogfood

A tiny **public MIT** Node/TypeScript app exercising **FlakeLens, A11yGate and SpecGate** in one GitHub Actions workflow. This is intentionally synthetic, not a production service or a claim of full product coverage.

## A11yGate demo

`a11ygate-demo/` is a static shop page with a form, images, buttons and links. Pull requests that change it run [`DaveEliranAssistant/a11ygate/action@main`](https://github.com/DaveEliranAssistant/a11ygate/tree/main/action). The accepted page has no axe findings, so every finding is new. The action posts one pull request comment and fails on new serious or critical findings.

[Pull request 12](https://github.com/DaveEliranAssistant/qe-dogfood/pull/12) adds a sale banner with four findings, then repairs them. The shop check goes from [fail](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/43420669159) (4 new) to [pass](https://github.com/DaveEliranAssistant/qe-dogfood/actions/runs/43421140716) (0 new). The comment is updated in place: [A11yGate comment](https://github.com/DaveEliranAssistant/qe-dogfood/pull/12#issuecomment-6852088463). A passing result is an automated regression result for that page, not a WCAG or European Accessibility Act conformance claim.

## Open the evidence

Open **Actions → QE product dogfood → a PR run**, then the **Product reports** job summary. Download `qe-raw-evidence` and `qe-product-reports` for the inputs and machine-readable output. A11yGate also posts/updates a PR comment for same-repository PRs.

Two demo PRs are kept open:

- **PR A — intentional regressions:** one new unlabelled input on the accessibility fixture, plus removal of `GET /api/health` from the application and `openapi.json`. A11yGate and SpecGate should both fail. The baseline and test assertions are not edited.
- **PR B — clean:** a documentation-only change. Both gates should pass; the intentionally flaky test remains visible in FlakeLens.

The final links and verified results are recorded in `docs/RUNS.md` once the remote runs complete.

## App under test

- `/`, `/items`, `/accessibility`: three HTML pages.
- The accessibility fixture deliberately has **missing image alt text**, **low-contrast text** and **a button without an accessible name**. These three known defects were captured once in the committed baseline, not suppressed by axe.
- REST API: `GET /api/health`, `GET/POST /api/items`, `GET/DELETE /api/items/{id}`. Contract: JSON OpenAPI **3.0.3**, `openapi.json`.
- The app binds only to `127.0.0.1:4319` and uses an in-memory synthetic store. No authentication, production data or secrets.

## Exactly one intentional flaky test

`INTENTIONAL FLAKE — seeded preview timing race` compares a UI preview against a **250ms timeout**. A SHA-256 seeded draw below `0.4` selects a 1000ms response; otherwise the response takes 10ms. For seed `qe-dogfood-v1`, five runs produce **fail/pass/pass/pass/fail**. This is a real timing failure, not a manufactured JUnit entry or an expected-failure annotation. No retries are configured.

The other tests check navigation, a REST lifecycle, invalid-input rejection and real `@axe-core/playwright` scans. The collector permits failure only for the explicitly named intentional race; unexpected functional/axe execution failures, skipped/interrupted tests, missing output or tool failures stop collection. Every actual JUnit file is retained. The flaky outcome is informational, not a reason to quietly turn either regression gate green.

## Local reproduction

Requires Git, Node 22/24 and npm:

```bash
npm ci --ignore-scripts
npx --no-install playwright install chromium
npm test
npm run typecheck
npm run collect
```

This runs the suite five times and preserves `reports/junit-*.xml`, per-run Playwright JSON, all axe scans and `reports/collection.json`. Single direct Playwright execution may fail intentionally; `collect` explicitly validates every failure before finishing.

### Browser-based FlakeLens

Download the raw evidence artifact and open <https://flakelens.vercel.app>. Drag **all five** `junit-*.xml` files into the workspace. Each file is one distinct run with the real commit/run/time metadata. Inspect the per-test history, verdict and root-cause groups; export JSON/Markdown if useful. Analysis runs in the browser. The workflow additionally uses the tested thin CLI from the FlakeLens PR, pinned to its exact commit, to place the same product analysis in the job summary.

## Baseline and trust boundaries

`a11y-baseline.json` is a **one-time capture of the initial deliberately imperfect app**. `docs/baseline-provenance.json` records its hash and source-file hashes. No CI step regenerates or updates it. On PRs, the gate reads the baseline and OpenAPI base from the **PR base SHA**, not from the proposed tree. App scans and the OpenAPI head come from the PR head. The clean PR's existing violations therefore remain “still open,” not “fixed.”

Collection runs with read-only repository permission. Product analysis runs separately with permission to comment, without starting the app or executing PR application code. No `pull_request_target`, PAT, repository secret, account change or deployment is required. Fork PRs have no comment permission; the report still appears in artifacts/summary and commenting is explicitly skipped. Manual dispatch compares against its selected base ref and cannot post a PR comment.

## Product scope

- **FlakeLens:** heuristic flakiness triage, not proof that a failure is harmless. Five executions of one commit do not demonstrate commit-regression localization.
- **A11yGate:** new/fixed/still-open automated axe findings. A passing diff still contains known violations and is not WCAG certification.
- **SpecGate:** exact **removed paths and removed lowercase HTTP operations in supported JSON OpenAPI 3.0.x only**. Schema, response, auth, behavior and consumer compatibility remain unassessed. “No removals” is not overall API compatibility. This deliberately exercises the bounded OpenAPI adapter, **not** the separate code-first scanner.

Only the owner-approved bounded SpecGate OpenAPI adapter is vendored under `vendor/specgate`, with upstream PR/commit, file hashes and MIT license. No private code-first scanner, credentials or unrelated QE Atlas files are included. FlakeLens is consumed from its public repository, not relicensed into this one.

## License

MIT; see [LICENSE](LICENSE). Product code consumed by Actions remains subject to its own license and provenance notices. Existing product repositories are changed only via PRs, never direct main pushes. No Hermes publisher or configuration is touched.

## Synthetic evidence-triage increment (in review)

A separate [FlakeLens evidence-triage fixture and CI quickstart](docs/FLAKELENS_TRIAGE.md) exercises insufficient evidence, explicit retry recovery, persistent regression, missing metadata and skipped-only cases using a pinned revision of the existing public CLI. It retains native/shared FAIL for the deliberately seeded regression while asserting the declared synthetic oracle. This is not customer data, a clean application gate or an automatic quarantine policy. Existing A/B intent, frozen baselines and the original QE workflow stay unchanged.

## Separate synthetic accessibility coverage proof

The review-only `demo/a11ygate-coverage-evidence` contribution exercises the pinned coverage-aware Action on declared hypothetical mutations of the original scan evidence. It does not regenerate the approved baseline, alter app/A-B intent or weaken any original assertion. See [the proof guide](docs/A11Y_COVERAGE.md).
