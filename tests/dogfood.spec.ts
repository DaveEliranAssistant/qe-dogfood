import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {delayForRun} from '../scripts/seed.mjs';

test('home navigation is stable',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:'QE Dogfood',exact:true})).toBeVisible();await page.getByRole('link',{name:'Browse items'}).click();await expect(page.getByRole('heading',{name:'Items',exact:true})).toBeVisible();});
test('REST item lifecycle is stable',async({request})=>{const created=await request.post('/api/items',{data:{name:'Playwright synthetic notebook'}});expect(created.status()).toBe(201);const item=await created.json();try{const detail=await request.get(`/api/items/${item.id}`);expect(detail.status()).toBe(200);expect(await detail.json()).toEqual(item);const list=await request.get('/api/items');expect(list.status()).toBe(200);expect(await list.json()).toContainEqual(item);}finally{const deleted=await request.delete(`/api/items/${item.id}`);expect(deleted.status()).toBe(204);}});
test('invalid item input is rejected consistently',async({request})=>{const bad=await request.post('/api/items',{data:{name:''}});expect(bad.status()).toBe(400);expect((await bad.json()).error).toContain('name');});
test('accessibility scan writes real axe results without hiding known defects',async({page})=>{const reports=[];for(const path of ['/','/items','/accessibility']){await page.goto(path);reports.push(await new AxeBuilder({page}).analyze());}await mkdir('reports',{recursive:true});await writeFile('reports/axe-results.json',JSON.stringify(reports,null,2)+'\n');expect(reports).toHaveLength(3);});
// INTENTIONAL: the single flaky test. Seeded uniform draw < 0.4 selects a
// 1000ms UI response versus a fixed 250ms expectation. No retries or expected-failure marking.
// Default five-run seed produces real failures on runs 1 and 5, and passes on 2–4.
test('INTENTIONAL FLAKE — seeded preview timing race',async({page})=>{const index=Number(process.env.DOGFOOD_ITERATION||1);const delay=delayForRun(process.env.DOGFOOD_SEED||'qe-dogfood-v1',index);await page.goto(`/items?delay=${delay}`);await page.getByRole('button',{name:'Load preview'}).click();await expect(page.locator('#preview')).toHaveText('Preview ready',{timeout:250});});
