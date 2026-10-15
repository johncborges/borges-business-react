/**
 * All site copy lives here so the business name, prices and contact details
 * can be changed in one place.
 */

export const BRAND = {
  name: 'JC Borges',
  owner: 'John Borges',
  email: 'johncborges+web@gmail.com',
  url: 'https://web.johncborges.com/',
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
    body: 'On a care plan, I keep everything current and send a monthly report. Cancel any month.',
  },
];

export interface Plan {
  name: string;
  price: string;
  unit: string;
  items: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Google & listings fix-up',
    price: '$350',
    unit: 'one time',
    items: [
      'Keep your current site',
      'Fix listings on Google, Apple and Bing',
      'Search Console and basic search setup',
    ],
  },
  {
    name: 'New site + care',
    price: '$900',
    unit: '+ $69/mo',
    featured: true,
    items: [
      'Up to 5 pages',
      'All listings and search setup',
      'Hosting, backups and security',
      'Monthly report and 1 hour of changes',
      'Cancel anytime',
    ],
  },
  {
    name: 'Care only',
    price: '$49',
    unit: '/mo',
    items: ['For a site you already have', 'Updates, backups, monitoring', 'Monthly report'],
  },
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
