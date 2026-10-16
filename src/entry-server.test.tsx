import { describe, expect, it } from 'vitest';
import { FAQS, PLANS } from './data';
import { render } from './entry-server';

describe('render', () => {
  it('prerenders the full page, including pricing and the FAQ', () => {
    const html = render();
    expect(html).toContain('<h1');
    for (const p of PLANS) expect(html).toContain(p.price);
    expect(html.match(/<summary>/g)).toHaveLength(FAQS.length);
  });
});
