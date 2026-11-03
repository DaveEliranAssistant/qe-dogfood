import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const dir=resolve(process.argv[2]);
const server=createServer((req,res)=>{if(req.url!=='/report.html'){res.writeHead(404).end();return;}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(readFileSync(join(dir,'report.html')));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}/report.html`;
let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.REPORT_BROWSER_CHANNEL?{channel:process.env.REPORT_BROWSER_CHANNEL}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},bypassCSP:true});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv[3]||url);await page.locator('h1').waitFor();
 const report=JSON.parse(readFileSync(join(dir,'report.json'),'utf8'));
 assert.equal(await page.locator('tbody tr').count(),report.results.length);
 assert.match(await page.locator('h1').innerText(),new RegExp(report.verdict.toUpperCase()));
 await page.screenshot({path:join(dir,'consolidated-desktop.png'),fullPage:true});
 await page.screenshot({path:join(dir,'consolidated-overview.png')});
 assert.equal(await page.locator('details[open]').count(),0,'Still-open and native reports must start collapsed');
 for(const details of await page.locator('details').all()){
  await details.locator('summary').focus();await page.keyboard.press('Space');assert.notEqual(await details.getAttribute('open'),null);
  await page.keyboard.press('Space');assert.equal(await details.getAttribute('open'),null);
 }
 for(const details of await page.locator('details').all())await details.evaluate(el=>{el.open=true;});
 for(const [i,r] of report.results.entries()){
  const section=page.locator(`#product-${i+1}`);assert.ok(await section.locator(`a[href="${r.runUrl}"]`).count());
  if(r.artifacts?.length)assert.ok(await section.locator(`a[href="${r.artifacts[0].url}"]`).count());
 }
 if(report.targetLabel)assert.ok((await page.locator('h1').innerText()).includes(report.targetLabel));

 const axe=await new AxeBuilder({page}).analyze();
 writeFileSync(join(dir,'report-axe-results.json'),JSON.stringify(axe,null,2)+'\n');
 assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length}))));
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:join(dir,'consolidated-mobile.png'),fullPage:true});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);
 const receipt={verdict:report.verdict,products:report.results.map(r=>r.product),axeViolations:axe.violations.length,keyboardAndDetails:'native details exercised',browserErrors:errors};
 writeFileSync(join(dir,'browser-verification.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
