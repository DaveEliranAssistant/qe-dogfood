import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const oracle=JSON.parse(readFileSync(new URL('../fixtures/a11y-coverage/expected.json',import.meta.url),'utf8'));
export function verifyBaselineAcceptance(review){
 const identify=list=>list.map(x=>({fingerprint:x.fingerprint,ruleId:x.ruleId,selector:x.selector})).sort((a,b)=>a.fingerprint.localeCompare(b.fingerprint));
 assert.equal(review.approval,'review-required');assert.deepEqual(identify(review.acceptedFindings),identify(oracle.baselineAcceptance));assert.deepEqual(identify(review.newlyAccepted),identify(oracle.baselineAcceptance.filter(x=>x.ruleId==='label')));assert.deepEqual(identify(review.retained),identify(oracle.baselineAcceptance.filter(x=>x.ruleId!=='label')));return true;
}
export function verifyA11yCase(name,native,shared,exit){
 const spec=oracle.cases[name];assert.ok(spec,'Unknown scenario');const [verdict,fresh,fixed,open,unassessed,code]=spec;
 assert.equal(exit,code,'Analysis exit is not the fixture oracle');assert.equal(shared.schemaVersion,1);assert.equal(shared.product,'A11yGate');
 if(verdict==='ERROR'){assert.equal(native,null,'Malformed input must not reuse stale native report');assert.equal(shared.verdict,'error');return true;}
 assert.equal(native.verdict,verdict);assert.equal(native.synthetic,true);assert.deepEqual(native.counts,{new:fresh,fixed,stillOpen:open});
 assert.equal(native.findings.new.length,fresh);assert.equal(native.findings.fixed.length,fixed);assert.equal(native.findings.stillOpen.length,open);assert.equal(native.findings.unassessed.length,unassessed);
 const metrics=Object.fromEntries(shared.metrics.map(x=>[x.label,x.value]));
 for(const [key,value] of Object.entries({new:fresh,fixed,'still-open':open,unassessed,coverage:native.coverage.status,'coverage-issues':native.coverage.issues.length,'unassessed-scope':native.coverage.unassessedScope.length,'manual-checks':native.manualChecks.length}))assert.equal(metrics[key],value,'Shared metric '+key+' lost native evidence');
 if(name==='regression-with-coverage-loss')assert.equal(native.coverage.status,'incomplete');
 assert.equal(native.coverage.unassessedFindings,unassessed);assert.ok(native.coverage.unassessedScope.length>0,'Manual/unknown scope must stay visible');
 if(verdict==='INCOMPLETE'){assert.equal(native.coverage.status,'incomplete');assert.ok(native.coverage.issues.length>0,'Coverage reasons missing');assert.equal(shared.verdict,'error');}else assert.equal(shared.verdict,verdict==='FAIL'?'fail':'pass');
 if(name==='manual-assertion'){assert.equal(native.manualChecks.length,1);assert.equal(native.manualChecks[0].status,'passed');assert.equal(native.verdict,'FAIL');}
 return true;
}
