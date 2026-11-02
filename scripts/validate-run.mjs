const intentional='INTENTIONAL FLAKE — seeded preview timing race';
function specs(suites){return suites.flatMap(s=>[...(s.specs||[]),...specs(s.suites||[])]);}
export function validateRun(report,exitCode){
 if(![0,1].includes(exitCode))throw Error('Playwright infrastructure failure');
 const cases=specs(report.suites||[]);
 if(cases.length!==5||cases.some(s=>s.tests.length!==1||s.tests[0].results.length!==1))throw Error('Expected exactly five tests without retries');
 const failures=cases.filter(s=>s.tests[0].results[0].status!=='passed');
 if(failures.some(s=>s.title!==intentional||s.tests[0].results[0].status!=='failed'))throw Error('Unexpected test failure, skip or interruption');
 if((exitCode===1)!==Boolean(failures.length))throw Error('Playwright exit/report mismatch');
 return failures.map(s=>s.title);
}
