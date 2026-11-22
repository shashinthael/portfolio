// The Scan test: a Reader sees role, stack, right to work, education and the CV link without scrolling.
import { expect, test } from '@playwright/test';
import { facts, profile } from '../../src/data/profile';

const inViewport = async (page: import('@playwright/test').Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight && r.width > 0;
  });

test('the first screen passes the Scan test', async ({ page }, info) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(profile.lastName);
  await expect(page.getByText(profile.role).first()).toBeVisible();
  expect(await inViewport(page, 'h1')).toBe(true);
  expect(await inViewport(page, '.ctas .btn')).toBe(true);

  if (info.project.name === 'desktop') {
    for (const f of facts) {
      const dd = page.locator('.facts dd', { hasText: f.value });
      await expect(dd).toBeVisible();
      expect(await dd.evaluate((el) => el.getBoundingClientRect().bottom <= innerHeight)).toBe(true);
    }
  } else {
    await expect(page.getByText(profile.phoneLine)).toBeVisible();
    expect(await inViewport(page, '.phoneline')).toBe(true);
  }
});

test('the page has the agreed title, description and share image', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Shashintha Edirisooriya · Full Stack Developer · London');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://shashintha.dev/og.png');
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}');
  expect(ld['@type']).toBe('Person');
  expect(JSON.stringify(ld)).not.toMatch(/telephone|email/);
});

test('no phone number anywhere on the page', async ({ page }) => {
  await page.goto('/');
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/\+44|07\d{3}\s?\d{6}/);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});
