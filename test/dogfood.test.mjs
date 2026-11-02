import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('fixture is JSON OpenAPI 3.0.x with collection and per-item operations',async()=>{const api=JSON.parse(await readFile('openapi.json'));assert.match(api.openapi,/^3\.0\./);assert.ok(api.paths['/api/items'].get);assert.ok(api.paths['/api/items'].post);assert.ok(api.paths['/api/items/{id}'].get);assert.ok(api.paths['/api/items/{id}'].delete);});
test('seeded race is reproducible and produces two failures across five runs',async()=>{const {delayForRun}=await import('../scripts/seed.mjs');assert.deepEqual([1,2,3,4,5].map(i=>delayForRun('qe-dogfood-v1',i)),[1000,10,10,10,1000]);});
test('baseline app contains the deliberate a11y fixture and exactly one intentional flaky test',async()=>{const html=await readFile('public/accessibility.html','utf8');assert.match(html,/<img[^>]+src=/);assert.match(html,/id="unlabelled-button"/);const spec=await readFile('tests/dogfood.spec.ts','utf8');assert.equal((spec.match(/test\('INTENTIONAL FLAKE/g)||[]).length,1);});
