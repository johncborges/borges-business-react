/**
 * All site copy lives here so the business name, prices and contact details
 * can be changed in one place.
 */

export const BRAND = {
  name: 'JC Borges',
  owner: 'John Borges',
  email: 'john@jcborges.com',
  url: 'https://jcborges.com/',
  tagline: 'Websites, search and listings for small businesses everywhere',
};

export interface Section {
  id: string;
  label: string;
}

export const SECTIONS: Section[] = [
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export type CheckStatus = 'good' | 'fix' | 'missing' | 'slow';

export interface PresenceCheck {
  label: string;
  status: CheckStatus;
}

/** Sample report shown in the hero. Sample business, sample results. */
export const SAMPLE_REPORT = {
  query: 'harbor street bakery near me',
  business: 'Harbor Street Bakery',
  checks: [
    { label: 'Website works on a phone', status: 'fix' },
    { label: 'Shows up on Google Maps', status: 'good' },
    { label: 'Hours match everywhere', status: 'fix' },
    { label: 'Listed on Apple Maps and Bing', status: 'missing' },
    { label: 'Page loads in under 3 seconds', status: 'slow' },
    { label: 'Secure (https) and own domain', status: 'good' },
    { label: 'Recent reviews answered', status: 'good' },
    { label: 'Visits being measured', status: 'missing' },
  ] satisfies PresenceCheck[],
};

export interface Service {
  label: string;
  title: string;
  body: string;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    label: 'Website',
    title: 'A site that works everywhere',
    body: 'Fast, clear and easy to use on phones, tablets and computers.',
    items: ['Mobile-first design', 'Accessible and fast', 'Easy ways to call, book or buy'],
  },
  {
    label: 'Search (local SEO)',
    title: 'Found on Google and beyond',
    body: 'The technical groundwork so search engines understand who you are and what you offer.',
    items: [
      'Search Console and sitemap',
      'Page titles and descriptions',
      'Business details search engines can read',
    ],
  },
  {
    label: 'Google Business Profile & maps',
    title: 'Right details in every directory',
    body: 'Your name, address, phone and hours, the same everywhere people look.',
    items: [
      'Google Business Profile',
      'Apple Business Connect and Bing Places',
      'Key directories for your industry',
    ],
  },
  {
    label: 'Reputation',
    title: 'Reviews that work for you',
    body: 'Simple ways to ask happy customers for reviews, and help replying to them.',
    items: ['Review request link and QR code', 'Reply templates', 'Reviews shown on your site'],
  },
  {
    label: 'Foundations',
    title: 'Domain, email and security',
    body: 'Untangle who owns your domain and old site, then put it in your name.',
    items: ['Domain and hosting moves', 'Professional email on your domain', 'https, backups and updates'],
  },
  {
    label: 'Insight',
    title: 'A plain-English monthly report',
    body: 'How many people found you, where they came from, and what they did.',
    items: ['Visits, calls and searches', 'What changed this month', 'One or two next steps'],
  },
];

export interface Step {
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  {
    title: 'Free online checkup',
    body: "I search for your business the way a customer would and send you a short report of what's working and what isn't.",
  },
  { title: 'A clear plan', body: 'We agree on what to fix first, with a flat price. No surprises.' },
  {
    title: 'Build and fix',
    body: 'I build or repair your site, set up your listings and search tools, and walk you through it.',
  },
  {
    title: 'Keep it working',
    body: 'For sites I host, the care plan keeps everything current with a monthly report. Cancel any month.',
  },
];

export interface Plan {
  name: string;
  price: string;
  unit: string;
  items: string[];
  /** Short highlight shown above the plan name, e.g. "Recommended". */
  tag?: string;
}

export interface PlanGroup {
  step: string;
  title: string;
  note: string;
  plans: Plan[];
}

/** Pricing in two steps: a one-time build or fix, then an ongoing way to keep it working. */
export const PLAN_GROUPS: PlanGroup[] = [
  {
    step: 'Step 1',
    title: 'Build or fix it',
    note: 'One time',
    plans: [
      {
        name: 'New website + listings',
        price: '$950',
        unit: 'one time',
        tag: 'Most popular',
        items: [
          'Both of the next two plans together',
          'A new site, up to 5 pages',
          'Google, Apple and Bing listings and search setup',
          'First month of care free',
          'Save $100',
        ],
      },
      {
        name: 'New website',
        price: '$700',
        unit: 'one time',
        items: [
          'Up to 5 pages, designed for phones first',
          'Contact form, map and tap-to-call',
          'Basic page titles and descriptions',
          'First month of care free',
        ],
      },
      {
        name: 'Google & listings setup',
        price: '$350',
        unit: 'one time',
        items: [
          'For a new site or the one you have',
          'Google Business Profile, Apple and Bing listings',
          'Search Console, sitemap and visit tracking',
          'Fixes from your free online checkup',
        ],
      },
    ],
  },
  {
    step: 'Step 2',
    title: 'Keep it working',
    note: 'Ongoing, pick one',
    plans: [
      {
        name: 'Care plan',
        price: '$70',
        unit: '/month',
        tag: 'Recommended',
        items: [
          'For any site I host: one I built, or one you move to me',
          'Hosting, security updates and backups',
          'Monthly report and 1 hour of changes',
          'Cancel anytime',
        ],
      },
      {
        name: 'By the hour',
        price: '$100',
        unit: '/hour',
        items: [
          'For sites hosted elsewhere',
          "Or work beyond the care plan's included hour",
          '1-hour minimum per request',
          'No monthly commitment',
        ],
      },
    ],
  },
];

export const PLANS: Plan[] = PLAN_GROUPS.flatMap((g) => g.plans);

export const PRICING_NOTES: string[] = [
  'Moving an existing site to my hosting: $100 one time, free when you join the care plan.',
  'Extra pages: $100 each beyond 5. Online stores and booking systems are quoted after the free checkup.',
  'You pay for your own domain (about $15 to $20 a year) and any business email, so they stay in your name.',
  'Payment: 50% to start, 50% at launch.',
];

export interface Fact {
  title: string;
  body: string;
}

export const FACTS: Fact[] = [
  { title: 'Small businesses only', body: 'Shops, trades, studios, clinics, restaurants, solo pros.' },
  { title: 'Work from anywhere', body: 'Based in California, working with clients by video and email.' },
  { title: 'You own it', body: 'Your domain, site and accounts are in your name.' },
  { title: 'No lock-in', body: 'Monthly care, cancel any time.' },
];
