import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { BRAND, PLAN_GROUPS, SECTIONS } from '../src/data';

test('loads without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });

  await page.goto('/');
  await expect(page).toHaveTitle(new RegExp(`^${BRAND.name}`));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toContainText(BRAND.name);
  expect(errors).toEqual([]);
});

for (const colorScheme of ['light', 'dark'] as const) {
  test(`has no detectable accessibility problems in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('skip link jumps keyboard users to the main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('nav links bring each section into view below the sticky header', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the phone menu has its own test');
  await page.goto('/');
  const header = page.getByRole('banner');
  const nav = page.getByRole('navigation', { name: 'Main' });

  for (const { id, label } of SECTIONS) {
    await nav.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    const heading = page.locator(`#${id} h2`).first();
    await expect(heading).toBeInViewport();
    await expect(async () => {
      const headerBox = (await header.boundingBox())!;
      const headingBox = (await heading.boundingBox())!;
      expect(headingBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height);
    }).toPass();
  }
});

test('shows every plan in both pricing steps', async ({ page }) => {
  await page.goto('/#pricing');
  for (const group of PLAN_GROUPS) {
    const section = page.getByRole('group', { name: group.title });
    await expect(section).toBeVisible();
    for (const plan of group.plans) {
      const name = page.getByRole('heading', { name: plan.name, exact: true });
      const card = section.getByRole('article').filter({ has: name });
      await expect(card).toBeVisible();
      await expect(card).toContainText(plan.price);
    }
  }
});

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  test(`serves ${file} pointing at the live site`, async ({ request }) => {
    const res = await request.get(`/${file}`);
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain(BRAND.url);
  });
}

test('serves prerendered content and structured data to crawlers that skip JavaScript', async ({
  request,
}) => {
  const html = await (await request.get('/')).text();
  expect(html).toMatch(/<h1[^>]*>Make sure customers can find you/);
  for (const plan of PLAN_GROUPS.flatMap((g) => g.plans)) expect(html).toContain(plan.price);

  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  const types = (JSON.parse(json!)['@graph'] as { '@type': string }[]).map((n) => n['@type']);
  expect(types).toEqual(expect.arrayContaining(['WebSite', 'ProfessionalService', 'FAQPage']));
});

for (const file of ['og-image.png', 'apple-touch-icon.png', 'icon-512.png']) {
  test(`serves ${file}`, async ({ request }) => {
    const res = await request.get(`/${file}`);
    expect(res.ok()).toBe(true);
    expect(res.headers()['content-type']).toBe('image/png');
  });
}
