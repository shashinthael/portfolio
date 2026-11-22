// The 3D and its fallbacks (spec §6.3). CI browsers often render WebGL in software, which the site deliberately
// falls back for; `?force3d` is a test hook that skips that check and the speed check, so the 3D path is tested too.
import { expect, test } from '@playwright/test';
import { featured } from '../../src/data/projects';

test('without WebGL, the page falls back to the still diagram and the project cards', async ({ page }) => {
  // Simulate a browser with no WebGL 2 (or one rendering in software, which the page treats the same way).
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error: narrowing the overloads is not the point here
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) { return type === 'webgl2' ? null : original.call(this, type, ...rest); };
  });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/has3d/);
  await expect(page.locator('.stack-svg')).toBeVisible();
  await expect(page.locator('#motion-toggle')).toBeHidden();
  await expect(page.locator('.cards .card')).toHaveCount(featured.length);
  await expect(page.locator('.viewer')).toBeHidden();
});

test('a visit already marked too slow stays on the fallback', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('pf-no3d', '1'));
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/has3d/);
});

test('with 3D, the Stack fades in over the diagram and can be paused', async ({ page }) => {
  await page.goto('/?force3d');
  await expect(page.locator('html')).toHaveClass(/has3d/);
  await expect(page.locator('html')).toHaveClass(/stack-ready/, { timeout: 15_000 });
  const toggle = page.locator('#motion-toggle');
  await expect(toggle).toHaveText('Pause motion');
  await toggle.click();
  await expect(toggle).toHaveText('Play motion');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('reduced motion starts with the 3D paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?force3d');
  await expect(page.locator('html')).toHaveClass(/reduce/);
  await expect(page.locator('#motion-toggle')).toHaveText('Play motion');
});

test('the Gallery changes project with Next, Prev and the arrow keys', async ({ page }) => {
  await page.goto('/?force3d');
  const count = page.locator('#work-count');
  const current = page.locator('.wu.on h3');
  await page.evaluate(() => scrollTo(0, document.getElementById('work')!.offsetTop));
  await expect(current).toHaveText(featured[0].title);

  await page.getByRole('button', { name: 'Next →' }).click();
  await expect(count).toHaveText('02');
  await expect(current).toHaveText(featured[1].title);
  // Only the project in front can be reached by keyboard or screen reader.
  await expect(page.locator('.wu:not(.on)').first()).toHaveAttribute('aria-hidden', 'true');

  await page.getByRole('button', { name: '← Prev' }).click();
  await expect(current).toHaveText(featured[0].title);

  await page.locator('.gview').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(current).toHaveText(featured[featured.length - 1].title);
});

test('on desktop, scrolling through the section turns the Gallery one project per step', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'phones swipe instead of scrolling');
  await page.goto('/?force3d');
  const span = await page.evaluate(() => { const w = document.getElementById('work')!; return { top: w.offsetTop, h: w.offsetHeight - innerHeight }; });
  await page.evaluate(({ top, h }) => scrollTo(0, top + h * 0.6), span);
  await expect(page.locator('.wu.on h3')).toHaveText(featured[2].title);
});
