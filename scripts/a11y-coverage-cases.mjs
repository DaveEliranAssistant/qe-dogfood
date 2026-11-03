// Hypothetical mutations of frozen scan evidence, NOT fresh browser scans.
export function a11yCases(baseline){
 const copy=()=>structuredClone(baseline).map(x=>({...x,_fixture:'SYNTHETIC hypothetical coverage mutation, not a fresh scan'}));
 const existing=copy(),missing=copy().filter(x=>!x.url.endsWith('/accessibility'));
 const failed=copy();Object.assign(failed.find(x=>x.url.endsWith('/accessibility')),{scanStatus:'failed',scanError:'SYNTHETIC navigation timeout',violations:[]});
 const changed=copy();const altered=changed.find(x=>x.url.endsWith('/accessibility'));altered.violations=[];altered.toolOptions={...altered.toolOptions,runOnly:{type:'tag',values:['best-practice']}};
 const selector=copy();selector.find(x=>x.url.endsWith('/accessibility')).violations.find(x=>x.id==='image-alt').nodes[0].target=['#synthetic-relocated-image'];
 const removed=copy();removed.find(x=>x.url.endsWith('/accessibility')).violations=removed.find(x=>x.url.endsWith('/accessibility')).violations.filter(x=>x.id!=='image-alt');
 const added=copy();added.find(x=>x.url.endsWith('/accessibility')).violations.push({id:'label',impact:'serious',tags:['wcag2a','wcag412'],help:'SYNTHETIC form control lacks label',helpUrl:'https://dequeuniversity.com/rules/axe/4.14/label',nodes:[{target:['#synthetic-input'],html:'<input id="synthetic-input">'}]});
 const combined=structuredClone(missing);combined[0].violations.push(structuredClone(added.find(x=>x.url.endsWith('/accessibility')).violations.find(x=>x.id==='label')));
 const errorOnly=copy();Object.assign(errorOnly.find(x=>x.url.endsWith('/accessibility')),{scanError:'SYNTHETIC navigation timeout',violations:[]});
 const contradictory=structuredClone(errorOnly);contradictory.find(x=>x.url.endsWith('/accessibility')).scanStatus='complete';
 return {'regression-with-coverage-loss':combined,'error-without-failed-status':errorOnly,'contradictory-complete':contradictory,'existing-debt':existing,'missing-page':missing,'failed-scan':failed,'changed-config':changed,'selector-change':selector,'observed-removal':removed,'added-finding':added,'manual-assertion':structuredClone(added),malformed:'{'};
}
export const syntheticManual={schemaVersion:1,checks:[{id:'synthetic-keyboard',scope:'/accessibility synthetic desktop',check:'Keyboard traversal',reviewer:'Synthetic Reviewer (fixture)',date:'2026-11-03',status:'passed',notes:'Synthetic assertion solely to prove human evidence cannot clear an automated regression; no actual review performed.'}]};
