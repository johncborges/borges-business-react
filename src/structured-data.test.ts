import { describe, expect, it } from 'vitest';
import { BRAND, FAQS, PLANS, PRICING_NOTES } from './data';
import { structuredData } from './structured-data';

type Node = Record<string, unknown>;
const graph = structuredData()['@graph'] as Node[];
const byType = (type: string) => graph.find((n) => n['@type'] === type)!;

describe('structuredData', () => {
  it('describes the site, the business, its founder and the FAQ', () => {
    expect(graph.map((n) => n['@type'])).toEqual(['WebSite', 'ProfessionalService', 'Person', 'FAQPage']);
    for (const n of graph) expect(n['@id']).toMatch(new RegExp(`^${BRAND.url}#`));
  });

  it('lists every plan with its price in USD', () => {
    const catalog = byType('ProfessionalService').hasOfferCatalog as { itemListElement: Node[] };
    const offers = catalog.itemListElement.flatMap((g) => g.itemListElement as Node[]);
    expect(offers.map((o) => o.name)).toEqual(PLANS.map((p) => p.name));
    for (const [i, o] of offers.entries()) {
      expect(`$${o.price}`).toBe(PLANS[i].price);
      expect(o.priceCurrency).toBe('USD');
    }
  });

  it('marks monthly and hourly plans with a unit', () => {
    const offers = JSON.stringify(byType('ProfessionalService'));
    expect(offers).toContain('"unitText":"MONTH"');
    expect(offers).toContain('"unitText":"HOUR"');
  });

  it('publishes every FAQ answer', () => {
    const questions = byType('FAQPage').mainEntity as Node[];
    expect(questions.map((q) => q.name)).toEqual(FAQS.map((f) => f.q));
  });
});

describe('FAQS', () => {
  it('only quotes prices that appear in the pricing section', () => {
    const known = new Set([...PLANS.map((p) => p.price), ...PRICING_NOTES.join(' ').match(/\$\d+/g)!]);
    for (const f of FAQS) for (const price of f.a.match(/\$\d+/g) ?? []) expect(known).toContain(price);
  });
});
