/** A plain-text summary for language models, built from the same data as the pages. */
import type { APIRoute } from 'astro';
import { COMPANY, CTA, SITE } from '../data/site.ts';
import { PAGES } from '../data/pages.ts';
import { NOT_SCRAPED, PIPELINE_CADENCE, SOURCES } from '../data/sources.ts';
import { entries, hrefOf, type PageCollection } from '../lib/collections.ts';

const url = (path: string) => new URL(path, SITE.url).href;

export const GET: APIRoute = async () => {
  const section = async (title: string, name: PageCollection) => [
    `## ${title}`,
    ...(await entries(name)).map((e) => {
      const d = e.data as { crumb: string; description: string };
      return `- [${d.crumb}](${url(hrefOf(name, e.id))}): ${d.description}`;
    }),
    '',
  ];
  const fixed = ['/how-it-works', '/data-sources', '/compliance', '/how-we-build', '/markets/san-diego', '/glossary', '/faq', '/about'] as const;
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.summary}`,
    '',
    '## Product',
    '- Not a lead list and not priced per lead.',
    '- Public and owner records are matched to parcels and scored by deterministic, published rules. AI never sets a score; it is an optional layer that writes validated, cited explanations.',
    '- Outreach is drafted, then approved by a person and sent by the client’s team. The system never sends, texts or dials a homeowner.',
    '',
    '## Delivery model',
    `- Built and run by ${COMPANY.name} for one team or brokerage at a time, in its own deployment, configured to the City planning areas the client chooses. Not self-serve software.`,
    '- MLS data is an optional add-on, scoped per client, that requires the broker’s signed back-office data agreement. The core product runs without MLS.',
    '- Live market: City of San Diego.',
    '',
    '## Data sources',
    ...SOURCES.map((s) => `- ${s.name} (${s.verdict}): ${s.provides}. ${s.url}`),
    `- Pipeline cadence: ${PIPELINE_CADENCE}`,
    `- Not scraped: ${NOT_SCRAPED.map((n) => n.term).join('; ')}.`,
    '- SB 9 and SB 79 eligibility is always estimated and is not an official determination.',
    '',
    '## Key pages',
    ...fixed.map((p) => `- [${PAGES[p].crumb}](${url(p)}): ${PAGES[p].description}`),
    `- [${CTA.primary.label}](${url(CTA.primary.href)})`,
    '',
    ...(await section('Signals', 'signals')),
    ...(await section('Recipes', 'recipes')),
    ...(await section('Platform', 'platform')),
    ...(await section('Guides', 'guides')),
    ...(await section('Who it is for', 'audiences')),
    ...(await section('Comparisons', 'compare')),
    `Contact: ${COMPANY.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
