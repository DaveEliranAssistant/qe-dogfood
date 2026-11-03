import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const [nativePath,sharedPath]=process.argv.slice(2);
const native=JSON.parse(readFileSync(nativePath,'utf8'));
const shared=JSON.parse(readFileSync(sharedPath,'utf8'));
const oracle=JSON.parse(readFileSync(new URL('../fixtures/flakelens-triage/expected.json',import.meta.url),'utf8'));
assert.equal(native.version,2,'Native evidence format must be explicit');
assert.deepEqual(Object.fromEntries(native.tests.map(t=>[t.testId,t.verdict])),oracle.expectedVerdicts);
assert.equal(native.tests.length,Object.keys(oracle.expectedVerdicts).length,'No duplicate/omitted tests');
for(const t of native.tests){
 assert.equal(t.evidence.policy,'flakelens.evidence/1');
 assert.equal(t.evidence.heuristic,true);
 assert.ok(t.evidence.reasonCodes.length && t.evidence.explanation && t.evidence.action);
 assert.equal(t.evidence.runCount,t.history.length);
 assert.ok(t.history.every(h=>h.sourceName && h.runId && h.commit && h.retrySources.length===h.attemptStatuses.length));
}
for(const [field,verdict] of [['flaky','flaky'],['regressions','regression'],['stable','stable'],['insufficientEvidence','insufficient-evidence']])
 assert.equal(native.summary[field],Object.values(oracle.expectedVerdicts).filter(v=>v===verdict).length);
assert.deepEqual(native.quarantine,[]);assert.deepEqual(native.actionsApplied,[]);
assert.equal(native.summary.failures,9,'Every synthetic failed attempt stays visible');
assert.equal(native.tests.reduce((sum,t)=>sum+t.failures,0),9);
const byId=new Map(native.tests.map(t=>[t.testId,t]));
for(const [id,reason] of Object.entries({single:'single-failure',recovery:'retry-recovery',regression:'persistent-failure-after-pass','never-green':'no-passing-baseline','cross-commit':'cross-commit-only',missing:'missing-commit-metadata','skip-only':'no-executed-attempts',clean:'no-failures-observed'}))
 assert.ok(byId.get(`triage > ${id}`).evidence.reasonCodes.includes(reason));
const missing=byId.get('triage > missing');
assert.equal(missing.evidence.missingCommitRuns,1);assert.equal(missing.evidence.missingRunIdRuns,1);
assert.equal(missing.history[0].commitSource,'order');assert.equal(missing.history[0].runIdSource,'order');assert.equal(missing.history[0].timestamp,null);
const recovery=byId.get('triage > recovery');assert.equal(recovery.passedOnRetry,1);
assert.deepEqual(recovery.history[0].attemptStatuses,['fail','pass']);assert.deepEqual(recovery.history[0].retryIndexes,[0,1]);assert.deepEqual(recovery.history[0].retrySources,['property','property']);
assert.equal(byId.get('triage > regression').introducedCommit,'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
assert.equal(shared.schemaVersion,1);assert.equal(shared.product,'FlakeLens');
assert.equal(shared.verdict,'fail','Seeded regression stays FAIL; CI proof success is not application health');
assert.equal(shared.metrics.find(m=>m.label==='insufficientEvidence')?.value,native.summary.insufficientEvidence);
console.log('SYNTHETIC fixture oracle verified: '+JSON.stringify(native.summary));
