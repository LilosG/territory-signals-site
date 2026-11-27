/** Site-wide facts. Pages read these; none of them repeats nav, contact details, brand names or CTA labels. */
export const SITE = {
  name: 'Territory Signals',
  url: 'https://getterritorysignals.com',
  locale: 'en_US',
  tagline: 'Territory intelligence for real estate teams',
  summary:
    'Territory Signals is first-to-know territory intelligence for real estate teams: public and owner records matched to parcels, scored by published rules and worked through drafted outreach a person approves.',
} as const;

export const COMPANY = {
  name: 'Lilos Growth',
  url: 'https://lilosgrowth.com',
  email: 'hello@lilosgrowth.com',
  address: {
    street: '1440 Columbia Street',
    city: 'San Diego',
    region: 'CA',
    postalCode: '92101',
    country: 'US',
  },
  guideAuthor: 'Mike Prickett',
} as const;

export const CTA = {
  primary: { label: 'Book a territory walkthrough', short: 'Book a walkthrough', href: '/request' },
  secondary: { label: 'See a sample weekly briefing', short: 'See a sample briefing', href: '/sample-briefing' },
  demo: { label: 'Try the scoring demo', href: '/how-it-works#demo' },
} as const;

export type NavLink = { label: string; href: string };

export const NAV: NavLink[] = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Seller playbooks', href: '/recipes' },
  { label: 'Signals', href: '/signals' },
  { label: 'Platform', href: '/platform' },
  { label: 'San Diego data', href: '/data-sources' },
  { label: 'Guides', href: '/guides' },
];

export const FOOTER: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Signals', href: '/signals' },
      { label: 'Seller playbooks', href: '/recipes' },
      { label: 'Platform', href: '/platform' },
      { label: 'Sample briefing', href: '/sample-briefing' },
      { label: 'How we build', href: '/how-we-build' },
    ],
  },
  {
    title: 'Who it is for',
    links: [
      { label: 'Real estate teams', href: '/for/real-estate-teams' },
      { label: 'Solo agents', href: '/for/solo-agents' },
      { label: 'Brokerages', href: '/for/brokerages' },
      { label: 'Investors and developers', href: '/for/investors-and-developers' },
      { label: 'San Diego market', href: '/markets/san-diego' },
      { label: 'All markets', href: '/markets' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Data sources', href: '/data-sources' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Compare', href: '/compare' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'About', href: '/about' },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const SERVICE_AREA = 'San Diego';
