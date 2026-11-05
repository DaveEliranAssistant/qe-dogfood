# A11yGate — QE Dogfood SYNTHETIC coverage
SYNTHETIC evidence — not a real audit or customer assessment.

**Verdict: PASS** (impact threshold: minor)

No new finding is at or above minor.

| Status | Count |
| --- | --- |
| New | 0 |
| Fixed | 0 |
| Still open | 3 |

Generated: 2026-11-03T17:15:19.461Z

## Scan coverage and existing debt

Coverage: complete. Existing debt: 3; previously reported findings now unassessed: 0. PASS means no detected new threshold violation, not an accessible or certified service.

### Unassessed scope
- Only supplied page/query/hash states are assessed; undiscovered pages and interactions are unassessed.
- Manual keyboard, screen-reader and usability checks are not performed by the automated gate.
- Origins are intentionally ignored for local CI hosts; equivalent environments must be established by the caller.
- Normalized selectors are heuristic identities, not proof that every affected element is unchanged.

## New

None.

## Fixed

None.

## Still open

- **button-name** (critical) on `http://127.0.0.1:4319/accessibility` — `#unlabelled-button` — Buttons must have discernible text — WCAG 2.1 4.1.2 Name, Role, Value \(A\); EN 301 549 9.4.1.2
  - Affected element: `&lt;button id="unlabelled-button" type="button"&gt;&lt;/button&gt;`; fingerprint: `button-name\|#unlabelled-button\|/accessibility`.
  - User impact: Screen-reader and voice-control users may not know the purpose of this button.
  - Remediation: Give the button a clear accessible name matching its visible purpose; prefer visible text.
  - Verification: Inspect its computed accessible name and re-run axe. Operate it by keyboard and verify the announced name and resulting state with assistive technology.
- **color-contrast** (serious) on `http://127.0.0.1:4319/accessibility` — `.low-contrast` — Elements must meet minimum color contrast ratio thresholds — WCAG 2.1 1.4.3 Contrast \(Minimum\) \(AA\); EN 301 549 9.1.4.3
  - Affected element: `&lt;p class="low-contrast"&gt;Intentional low contrast text.&lt;/p&gt;`; fingerprint: `color-contrast\|.low-contrast\|/accessibility`.
  - User impact: People with low vision or color-vision differences may not be able to read the affected content.
  - Remediation: Adjust foreground/background colors to meet the applicable contrast ratio; include hover, focus and disabled states where relevant.
  - Verification: Re-run axe on the same page/state and affected selector. Measure rendered contrast \(normally 4.5:1 text or 3:1 large text\); review gradients and dynamic states manually.
- **image-alt** (critical) on `http://127.0.0.1:4319/accessibility` — `#missing-alt` — Images must have alternative text — WCAG 2.1 1.1.1 Non-text Content \(A\); EN 301 549 9.1.1.1
  - Affected element: `&lt;img id="missing-alt" src="/item.svg" width="80" height="60"&gt;`; fingerprint: `image-alt\|#missing-alt\|/accessibility`.
  - User impact: People using screen readers may miss the purpose or information conveyed by the image.
  - Remediation: Provide contextual alternative text for informative images; use empty alt for genuinely decorative images.
  - Verification: Re-run axe on the same page/state and selector. Listen with a screen reader and confirm the alternative conveys the same purpose without redundant detail.

## Unassessed — not verified fixed

None.

## Manual evidence — separate from automated checks
Self-reported, editable human assertions. Reviewer identity and freshness are not verified. These records do not improve the automated gate; absent evidence is unassessed.
No manual evidence recorded.

Automated checks cover only part of WCAG; this is evidence, not certification.
Informational only. Not legal advice. Not a certification of EAA compliance.
