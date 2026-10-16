import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './app';
import { BRAND, PLANS, SAMPLE_REPORT, SECTIONS, SERVICES } from './data';

describe('App', () => {
  it('has the landmarks and skip link a keyboard or screen-reader user needs', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('contentinfo')).toHaveTextContent(BRAND.name);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('links every nav item to a section that exists', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual(SECTIONS.map((s) => s.label));
    for (const { id } of SECTIONS) expect(document.getElementById(id)).not.toBeNull();
  });

  it('shows every service, plan and the sample report score', () => {
    render(<App />);
    for (const s of SERVICES) expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument();
    for (const p of PLANS) expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument();
    const passed = SAMPLE_REPORT.checks.filter((c) => c.status === 'good').length;
    expect(screen.getByText(`${passed} of ${SAMPLE_REPORT.checks.length} checks passed`)).toBeInTheDocument();
  });
});

describe('Free check form', () => {
  beforeEach(() => vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key'));
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const fillIn = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText('Business name'), 'Harbor Street Bakery');
    await user.type(screen.getByLabelText('City and country'), 'Lisbon, Portugal');
    await user.type(screen.getByLabelText('Your email or phone'), 'owner@example.com');
    await user.click(screen.getByRole('button', { name: 'Request my free check' }));
  };

  it('asks for the required fields before sending', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Request my free check' }));
    expect(screen.getByRole('alert')).toHaveTextContent('business name');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the request and confirms it', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<App />);
    await fillIn(user);

    expect(await screen.findByRole('status')).toHaveTextContent('your request is in');
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ business: 'Harbor Street Bakery', location: 'Lisbon, Portugal' });
  });

  it('explains a failure and offers email instead', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{"message":"Server busy"}', { status: 500 })),
    );
    const user = userEvent.setup();
    render(<App />);
    await fillIn(user);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Server busy');
    expect(
      within(alert)
        .getByRole('link', { name: 'send the same details by email' })
        .getAttribute('href')
        ?.startsWith(`mailto:${BRAND.email}?`),
    ).toBe(true);
    expect(screen.getByLabelText('Business name')).toHaveValue('Harbor Street Bakery');
  });

  it('copies the email address', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Copy email' }));
    expect(await navigator.clipboard.readText()).toBe(BRAND.email);
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});

describe('Phone menu', () => {
  it('opens and closes the menu and reports its state', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: 'Menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'main-nav');

    await user.click(button);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes after a section link is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(nav).getByRole('link', { name: SECTIONS[0].label }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
