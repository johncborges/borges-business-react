import { BRAND, FAQS, PLAN_GROUPS } from './data';

/** Builds the JSON-LD for the page from the same data the page shows, so prices never drift. */

const ref = (name: string) => `${BRAND.url}#${name}`;
const amount = (price: string) => price.replace(/[^0-9.]/g, '');
const UNIT_TEXT: Record<string, string> = { '/month': 'MONTH', '/hour': 'HOUR' };

export function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ref('website'),
        url: BRAND.url,
        name: BRAND.name,
        inLanguage: 'en',
        publisher: { '@id': ref('business') },
      },
      {
        '@type': 'ProfessionalService',
        '@id': ref('business'),
        name: BRAND.name,
        url: BRAND.url,
        email: BRAND.email,
        description: BRAND.tagline,
        logo: `${BRAND.url}icon-512.png`,
        image: `${BRAND.url}og-image.png`,
        priceRange: '$$',
        areaServed: 'Worldwide',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rio Vista',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        founder: { '@id': ref('founder') },
        knowsAbout: [
          'Small business websites',
          'Local SEO',
          'Google Business Profile',
          'Apple Business Connect',
          'Bing Places',
          'Website hosting and maintenance',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Pricing',
          itemListElement: PLAN_GROUPS.map((group) => ({
            '@type': 'OfferCatalog',
            name: group.title,
            itemListElement: group.plans.map((plan) => {
              const unitText = UNIT_TEXT[plan.unit];
              return {
                '@type': 'Offer',
                name: plan.name,
                description: plan.items.join('. '),
                price: amount(plan.price),
                priceCurrency: 'USD',
                ...(unitText && {
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: amount(plan.price),
                    priceCurrency: 'USD',
                    unitText,
                  },
                }),
              };
            }),
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': ref('founder'),
        name: BRAND.owner,
        url: 'https://www.johncborges.com/',
        sameAs: ['https://github.com/johncborges'],
        worksFor: { '@id': ref('business') },
      },
      {
        '@type': 'FAQPage',
        '@id': ref('faq'),
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
