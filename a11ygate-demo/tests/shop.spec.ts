import { mkdir, writeFile } from 'node:fs/promises';
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The scan only records axe JSON. A11yGate is the regression gate, so this
// test stays green when the page has violations and the action can still comment.
test('demo shop landing page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { level: 1, name: 'Goods for a quieter kitchen' }).waitFor();
  const results = await new AxeBuilder({ page }).analyze();
  await mkdir('a11y-results', { recursive: true });
  await writeFile('a11y-results/home.json', `${JSON.stringify(results, null, 2)}\n`);
});
