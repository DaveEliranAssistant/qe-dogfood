import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';import {mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';
const after='docs/flakelens-triage-evidence/after/report.json';
const qe={schemaVersion:1,product:'FlakeLens',verdict:'fail',metrics:[{label:'insufficientEvidence',value:5}]}; // Explicit unit fixture for the shared-result guard.
function run(native,shared=qe){const d=mkdtempSync(join(tmpdir(),'triage-proof-'));try{writeFileSync(join(d,'r.json'),JSON.stringify(native));writeFileSync(join(d,'q.json'),JSON.stringify(shared));return spawnSync(process.execPath,['scripts/verify-flakelens-triage.mjs',join(d,'r.json'),join(d,'q.json')],{encoding:'utf8'});}finally{rmSync(d,{recursive:true,force:true});}}
test('verifies recorded real CLI output against an independent synthetic manifest',()=>{const r=run(JSON.parse(readFileSync(after)));assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/SYNTHETIC/);});
test('rejects the old overconfident classifications',()=>{const r=run(JSON.parse(readFileSync('docs/flakelens-triage-evidence/before/report.json')));assert.notEqual(r.status,0);});
test('refuses a false shared PASS or silent automatic quarantine',()=>{const r=JSON.parse(readFileSync(after));assert.notEqual(run(r,{...qe,verdict:'pass'}).status,0);r.quarantine=['triage > recovery'];assert.notEqual(run(r).status,0);});

test('rejects lost raw failures, wrong reasons, fabricated provenance or a wrong boundary',()=>{
 for(const alter of [r=>{r.summary.failures=0;},r=>{r.tests.find(t=>t.testId==='triage > single').evidence.reasonCodes=['bogus'];},r=>{r.tests.find(t=>t.testId==='triage > missing').history[0].commitSource='file';},r=>{r.tests.find(t=>t.testId==='triage > regression').introducedCommit='wrong';},r=>{r.tests.find(t=>t.testId==='triage > recovery').passedOnRetry=0;}]){
  const r=JSON.parse(readFileSync(after));alter(r);assert.notEqual(run(r).status,0);
 }
});
