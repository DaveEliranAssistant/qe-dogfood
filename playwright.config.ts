import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',fullyParallel:false,workers:1,retries:0,timeout:15000,
 reporter:[['list'],['junit',{outputFile:process.env.DOGFOOD_JUNIT||'reports/junit-local.xml'}],['json',{outputFile:process.env.DOGFOOD_JSON||'reports/playwright-local.json'}]],
 use:{baseURL:'http://127.0.0.1:4319',browserName:'chromium',headless:true},
 webServer:{command:'npm start',url:'http://127.0.0.1:4319',reuseExistingServer:false,timeout:30000},
});
