import {spawnSync,execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync,copyFileSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {validateRun} from './validate-run.mjs';
const root=resolve(import.meta.dirname,'..');
const seed=process.env.DOGFOOD_SEED||'qe-dogfood-v1';
const sha=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
if(!/^[a-f0-9]{40}$/.test(sha))throw Error('Expected exact Git revision');
mkdirSync(resolve(root,'reports'),{recursive:true});
const summaries=[];
for(let index=1;index<=5;index++){
 const suffix=String(index).padStart(2,'0');
 const junit=resolve(root,`reports/junit-${suffix}-${sha}.xml`),json=resolve(root,`reports/playwright-${suffix}.json`);
 rmSync(resolve(root,'reports/axe-results.json'),{force:true});
 const started=new Date().toISOString();
 const run=spawnSync(process.execPath,[resolve(root,'node_modules/@playwright/test/cli.js'),'test'],{cwd:root,stdio:'inherit',timeout:120000,env:{...process.env,DOGFOOD_ITERATION:String(index),DOGFOOD_SEED:seed,DOGFOOD_JUNIT:junit,DOGFOOD_JSON:json}});
 if(run.error||![0,1].includes(run.status))throw Error(`Playwright infrastructure failure on run ${index}`);
 const result=JSON.parse(readFileSync(json,'utf8'));
 const failures=validateRun(result,run.status);
 const runId=`${process.env.GITHUB_RUN_ID||'local'}-${process.env.GITHUB_RUN_ATTEMPT||'1'}-${suffix}`;
 let xml=readFileSync(junit,'utf8');
 xml=xml.replace(/(<testsuite\s[^>]*>)/,`$1\n<properties><property name="commit" value="${sha}"/><property name="ci.run_id" value="${runId}"/><property name="ci.timestamp" value="${started}"/></properties>`);
 writeFileSync(junit,xml);
 copyFileSync(resolve(root,'reports/axe-results.json'),resolve(root,`reports/axe-results-${suffix}.json`));
 summaries.push({index,seed,sourceCommit:sha,runId,exitCode:run.status,tests:5,failures,junit:junit.split('/').pop()});
}
writeFileSync(resolve(root,'reports/collection.json'),JSON.stringify({seed,sourceCommit:sha,iterations:summaries},null,2)+'\n');
console.log('Collected all five real JUnit runs. Only the explicitly named intentional timing race may fail; all other failures are fatal.');
