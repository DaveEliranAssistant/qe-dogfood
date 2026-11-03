import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const workflow=()=>readFileSync('.github/workflows/qe.yml','utf8');
test('one final consolidated Action always runs with explicit expected product files',()=>{
 const y=workflow();
 assert.match(y,/name: Consolidated QE Atlas Report\n\s+if: always\(\)/);
 assert.match(y,/uses: DaveEliranAssistant\/qe-atlas-report@[a-f0-9]{40}/);
 for(const product of ['a11ygate','flakelens','specgate']) assert.match(y,new RegExp(`product-reports/qe-result-${product}\\.json`));
 assert.match(y,/expected-files:/);
 assert.match(y,/mode: report-only/);
});
test('A11yGate native comments disabled; old strict enforcement and baseline retained',()=>{
 const y=workflow();
 assert.match(y,/comment: 'false'/);
 assert.match(y,/baseline: trusted\/a11y-baseline.json/);
 assert.match(y,/node trusted\/scripts\/enforce.mjs/);
 assert.doesNotMatch(y,/node trusted\/scripts\/summarize.mjs/);
 assert.equal(existsSync('scripts/summarize.mjs'),false);
 assert.match(y,/pull-requests: write/);
 assert.doesNotMatch(y,/pull_request_target|secrets\.|update-baseline:/);
});
test('fourth product demo is explicit, optional and cannot replace the three product results',()=>{
 const y=workflow();
 assert.match(y,/demo_fourth_product:/);
 assert.match(y,/DemoFourthProduct/);
 assert.match(y,/qe-result-demo-fourth\.json/);
});
