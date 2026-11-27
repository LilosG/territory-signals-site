/** JSON-LD builders. Only Seo.astro calls these. No Review, AggregateRating or Offer types anywhere. */
import { COMPANY, SERVICE_AREA, SITE } from '../data/site.ts';

const abs = (path: string) => new URL(path, SITE.url).href;
const ORG_ID = `${COMPANY.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export type JsonLdNode = Record<string, unknown>;

const SAN_DIEGO_AREA: JsonLdNode = {
  '@type': 'City',
  name: SERVICE_AREA,
  sameAs: 'https://en.wikipedia.org/wiki/San_Diego',
  containedInPlace: {
    '@type': 'State',
    name: 'California',
    sameAs: 'https://en.wikipedia.org/wiki/California',
  },
};

export const organization = (): JsonLdNode => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: COMPANY.name,
  url: COMPANY.url,
  logo: abs('/favicon.svg'),
  email: COMPANY.email,
  brand: { '@type': 'Brand', name: SITE.name, url: SITE.url },
  areaServed: SAN_DIEGO_AREA,
  knowsAbout: [
    'Real estate territory intelligence',
    'Predictive seller scoring',
    'San Diego public property records',
    'Building permit data analysis',
    'California SB 9 and SB 79 upzoning',
    'Off-market real estate lead generation',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.country,
  },
});

export const website = (): JsonLdNode => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: SITE.name,
  url: SITE.url,
  description: SITE.summary,
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
});

export const service = (): JsonLdNode => ({
  '@type': 'Service',
  '@id': `${SITE.url}/#service`,
  name: SITE.name,
  serviceType: 'Real estate territory intelligence',
  description: SITE.summary,
  provider: { '@id': ORG_ID },
  areaServed: SAN_DIEGO_AREA,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'San Diego real estate teams, listing agents, brokerages, and investors',
  },
});

export const breadcrumbList = (crumbs: { name: string; path: string }[]): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

export const faqPage = (items: { question: string; answer: string }[]): JsonLdNode => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
});

export const article = (a: { path: string; headline: string; description: string; published: string; modified: string; image: string }): JsonLdNode => ({
  '@type': 'Article',
  headline: a.headline,
  description: a.description,
  datePublished: a.published,
  dateModified: a.modified,
  image: abs(a.image),
  mainEntityOfPage: abs(a.path),
  author: { '@type': 'Person', name: COMPANY.guideAuthor, worksFor: { '@id': ORG_ID } },
  publisher: { '@id': ORG_ID },
});

export const definedTermSet = (path: string, name: string, terms: { id: string; term: string; definition: string }[]): JsonLdNode => ({
  '@type': 'DefinedTermSet',
  '@id': abs(path),
  name,
  hasDefinedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', '@id': abs(`${path}#${t.id}`), name: t.term, description: t.definition, inDefinedTermSet: abs(path) })),
});

export const graph = (nodes: JsonLdNode[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
