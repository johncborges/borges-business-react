import { describe, expect, it } from 'vitest';
import { buildMailto, buildMessage, isComplete } from './contact-message';

const base = {
  business: 'Harbor Street Bakery',
  location: '',
  website: '',
  reach: 'owner@example.com',
  note: '',
};

describe('contact message', () => {
  it('needs a business name and a way to reach the person', () => {
    expect(isComplete(base)).toBe(true);
    expect(isComplete({ ...base, business: '  ' })).toBe(false);
    expect(isComplete({ ...base, reach: '' })).toBe(false);
  });

  it('fills in defaults for optional fields and appends the note', () => {
    expect(buildMessage(base)).toBe(
      'Business: Harbor Street Bakery\nLocation: not given\nWebsite: none\nReach me at: owner@example.com',
    );
    expect(buildMessage({ ...base, note: 'Need a menu page' })).toMatch(/\n\nNeed a menu page$/);
  });

  it('encodes the subject and body into a mailto link', () => {
    const href = buildMailto('me@example.com', base);
    expect(href.startsWith('mailto:me@example.com?subject=Free%20online%20checkup%3A%20Harbor')).toBe(true);
    expect(decodeURIComponent(href.split('&body=')[1])).toBe(buildMessage(base));
  });
});
