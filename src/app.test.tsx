import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
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
    expect(
      screen.getByLabelText(`${passed} of ${SAMPLE_REPORT.checks.length} checks passed`),
    ).toBeInTheDocument();
  });
});

describe('Free check form', () => {
  it('asks for the required fields before building the email', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Request my free check' }));
    expect(screen.getByRole('alert')).toHaveTextContent('business name');
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('builds a ready-to-send email from the answers', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Business name'), 'Harbor Street Bakery');
    await user.type(screen.getByLabelText('City and country'), 'Lisbon, Portugal');
    await user.type(screen.getByLabelText('Your email or phone'), 'owner@example.com');
    await user.click(screen.getByRole('button', { name: 'Request my free check' }));

    const out = screen.getByRole('status');
    expect(out).toHaveTextContent('Business: Harbor Street Bakery');
    expect(out).toHaveTextContent('Location: Lisbon, Portugal');
    expect(
      within(out)
        .getByRole('link', { name: 'Open in email' })
        .getAttribute('href')
        ?.startsWith(`mailto:${BRAND.email}?`),
    ).toBe(true);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('copies the email address', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Copy email' }));
    expect(await navigator.clipboard.readText()).toBe(BRAND.email);
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
