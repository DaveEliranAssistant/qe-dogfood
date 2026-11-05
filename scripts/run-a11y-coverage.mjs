import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';import {createHash} from 'node:crypto';import {spawnSync} from 'node:child_process';import path from 'node:path';
import {a11yCases,syntheticManual} from './a11y-coverage-cases.mjs';import {verifyA11yCase,verifyBaselineAcceptance} from './verify-a11y-coverage.mjs';
const action=path.resolve(process.argv[2]||''),baseline=path.resolve(process.argv[3]||'a11y-baseline.json'),out=path.resolve(process.argv[4]||'reports/a11y-coverage');
if(!existsSync(path.join(action,'run.mjs')))throw Error('Pass pinned Action checkout path');
const raw=readFileSync(baseline),hash=buf=>createHash('sha256').update(buf).digest('hex');const provenance=JSON.parse(readFileSync('docs/baseline-provenance.json'));
if(hash(raw)!==provenance.baselineSha256)throw Error('Frozen baseline integrity failed');
mkdirSync(out,{recursive:true});const records=[];const manual=path.join(out,'manual.json');writeFileSync(manual,JSON.stringify(syntheticManual,null,2));
function invoke(name,current,update=''){
 const md=path.join(out,name+'.md'),json=path.join(out,name+'.json'),qe=path.join(out,name+'.qe.json');
 const p=spawnSync(process.execPath,[path.join(action,'run.mjs')],{encoding:'utf8',env:{...process.env,A11Y_CURRENT:current,A11Y_BASELINE:baseline,A11Y_MANUAL_EVIDENCE:name==='manual-assertion'?manual:'',A11Y_MARKDOWN:md,A11Y_JSON:json,A11Y_QE_RESULT:qe,A11Y_UPDATE_BASELINE:update,A11Y_THRESHOLD:'minor',A11Y_COMMENT:'false',A11Y_TARGET_LABEL:'QE Dogfood SYNTHETIC coverage',GITHUB_OUTPUT:path.join(out,name+'.outputs'),GITHUB_STEP_SUMMARY:''}});
 const native=existsSync(json)?JSON.parse(readFileSync(json)):null;const shared=JSON.parse(readFileSync(qe));return {p,native,shared};
}
for(const [name,input] of Object.entries(a11yCases(JSON.parse(raw)))){
 const current=path.join(out,name+'.input.json');writeFileSync(current,typeof input==='string'?input:JSON.stringify(input,null,2));
 const r=invoke(name,current);try{verifyA11yCase(name,r.native,r.shared,r.p.status);}catch(e){throw Error(name+': '+e.message+'\n'+r.p.stderr);}
 records.push({name,nativeVerdict:r.native?.verdict??'ERROR',counts:r.native?.counts??null,unassessed:r.native?.coverage.unassessedFindings??null,sharedVerdict:r.shared.verdict,exitCode:r.p.status});
}
const target=path.join(out,'proposed-baseline.json');const proposal=invoke('proposal',path.join(out,'added-finding.input.json'),target);
if(proposal.p.status!==1||proposal.native.verdict!=='FAIL')throw Error('Proposing a baseline must not clear this gate');
const review=JSON.parse(readFileSync(target+'.review.json'));verifyBaselineAcceptance(review);
if(hash(readFileSync(baseline))!==hash(raw))throw Error('Frozen baseline was modified');
const receipt={syntheticOnly:true,scope:'Hypothetical mutations, not new scans/customer results',baselineSha256:hash(raw),baselineUnchanged:true,cases:records,baselineProposal:{newlyAccepted:review.newlyAccepted.map(x=>({fingerprint:x.fingerprint,selector:x.selector,ruleId:x.ruleId})),acceptedCount:review.acceptedFindings.length,originalGate:'FAIL'},customerMetrics:'not measured'};
writeFileSync(path.join(out,'receipt.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
