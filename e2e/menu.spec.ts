import { expect, test } from '@playwright/test';
import { SECTIONS } from '../src/data';

test.describe('on a phone', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone layout only');

  test('the menu opens, closes with Escape, and closes after choosing a section', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const menu = page.getByRole('button', { name: 'Menu' });

    await expect(nav.getByRole('link', { name: SECTIONS[0].label })).toBeHidden();
    await menu.click();
    const close = page.getByRole('button', { name: 'Close' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    for (const { label } of SECTIONS) await expect(nav.getByRole('link', { name: label })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(nav.getByRole('link', { name: SECTIONS[0].label })).toBeHidden();

    const last = SECTIONS[SECTIONS.length - 1];
    await menu.click();
    await nav.getByRole('link', { name: last.label }).click();
    await expect(page).toHaveURL(new RegExp(`#${last.id}$`));
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(`#${last.id} h2`)).toBeInViewport();
  });

  test('the page does not scroll sideways', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('on a wide screen', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop layout only');

  test('shows the nav links and no menu button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const { label } of SECTIONS) await expect(nav.getByRole('link', { name: label })).toBeVisible();
  });
});
