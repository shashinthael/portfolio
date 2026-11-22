// WCAG 2.2 AA with zero axe violations, and the page works from the keyboard (spec §8).
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const scan = (page: import('@playwright/test').Page) =>
  new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();

for (const url of ['/', '/?force3d']) {
  test(`no axe violations on ${url}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' }); // so fading text is fully visible when checked
    await page.goto(url);
    await page.evaluate(() => document.querySelectorAll('.rv').forEach((el) => el.classList.add('in')));
    const { violations } = await scan(page);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('the first Tab reaches the skip link, which jumps to the content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('the CV download is reachable by keyboard', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'one keyboard walk is enough');
  await page.goto('/');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const text = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (text === 'Download CV') return;
  }
  throw new Error('Download CV was not reached within 12 Tab presses');
});
