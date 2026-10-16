import { expect, test, type Page } from '@playwright/test';
import { BRAND } from '../src/data';
import { WEB3FORMS_ENDPOINT } from '../src/send-check';

/** Answers the Web3Forms request so no real email is sent, and records what the form posted. */
async function mockWeb3Forms(page: Page, status: number, body: object) {
  const posted: Record<string, unknown>[] = [];
  await page.route(WEB3FORMS_ENDPOINT, async (route) => {
    posted.push(route.request().postDataJSON());
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  return posted;
}

async function fillIn(page: Page) {
  await page.getByLabel('Business name').fill('Harbor Street Bakery');
  await page.getByLabel('City and country').fill('Lisbon, Portugal');
  await page.getByLabel('Your email or phone').fill('owner@example.com');
  await page.getByLabel('Anything else?').fill('Hours are wrong on Google');
  await page.getByRole('button', { name: 'Request my free check' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get a free online checkup' }).click();
  await expect(page.getByRole('heading', { name: /See what customers see/ })).toBeInViewport();
});

test('asks for the required fields before sending anything', async ({ page }) => {
  const posted = await mockWeb3Forms(page, 200, { success: true });
  await page.getByRole('button', { name: 'Request my free check' }).click();
  await expect(page.getByRole('alert')).toContainText('business name');
  expect(posted).toEqual([]);
});

test('sends the request and confirms it', async ({ page }) => {
  const posted = await mockWeb3Forms(page, 200, { success: true });
  await fillIn(page);

  await expect(page.getByRole('status')).toContainText('your request is in');
  expect(posted).toHaveLength(1);
  expect(posted[0]).toMatchObject({
    access_key: 'e2e-test-key',
    business: 'Harbor Street Bakery',
    location: 'Lisbon, Portugal',
    contact: 'owner@example.com',
    replyto: 'owner@example.com',
    botcheck: false,
  });

  await page.getByRole('button', { name: 'Send another request' }).click();
  await expect(page.getByLabel('Business name')).toHaveValue('');
});

test('explains a failure and offers the same details by email', async ({ page }) => {
  await mockWeb3Forms(page, 500, { message: 'Server busy' });
  await fillIn(page);

  const alert = page.getByRole('alert');
  await expect(alert).toContainText('Server busy');
  const mailto = alert.getByRole('link', { name: 'send the same details by email' });
  await expect(mailto).toHaveAttribute('href', new RegExp(`^mailto:${BRAND.email}\\?`));
  await expect(mailto).toHaveAttribute('href', /Harbor%20Street%20Bakery/);
  await expect(page.getByLabel('Business name')).toHaveValue('Harbor Street Bakery');
});

test('explains when the server cannot be reached', async ({ page }) => {
  await page.route(WEB3FORMS_ENDPOINT, (route) => route.abort('internetdisconnected'));
  await fillIn(page);
  await expect(page.getByRole('alert')).toContainText('could not reach the server');
});
