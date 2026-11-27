import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const meta = {
  crumb: z.string(),
  keyword: z.string(),
  headingTerm: z.string(),
  h1: z.string(),
  title: z.string().min(50).max(60),
  description: z.string().min(140).max(158),
  updated: z.coerce.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number().int(),
};
const answer = z.string();
/** One question-form H2 whose first sentence answers it. */
const section = z.object({ q: z.string().endsWith('?'), p: z.array(z.string()).min(1), list: z.array(z.string()).optional() }).strict();
const sourceKey = z.enum(['permits', 'str', 'tax', 'parcels', 'zoning', 'transit', 'areas', 'code', 'attom', 'fire']);
const yaml = (name: string) => glob({ pattern: '*.yaml', base: `./src/content/${name}` });

export const collections = {
  signals: defineCollection({
    loader: yaml('signals'),
    schema: z.object({
      ...meta, answer,
      family: z.string(),
      status: z.enum(['live', 'coming']),
      sources: z.array(sourceKey).min(1),
      components: z.array(z.object({ key: z.string(), label: z.string(), maxPoints: z.number() })).min(1),
      visibility: z.string().optional(),
      sections: z.object({ what: section, why: section, source: section, scoring: section, action: section, limits: section }),
    }).strict(),
  }),
  recipes: defineCollection({
    loader: yaml('recipes'),
    schema: z.object({
      ...meta, answer,
      recipeKey: z.string(),
      label: z.string(),
      shortDescription: z.string(),
      rationale: z.string(),
      approval: z.string().optional(),
      mark: z.string().optional(),
      sections: z.object({ what: section, why: section, source: section, scoring: section, action: section, limits: section }),
    }).strict(),
  }),
  platform: defineCollection({
    loader: yaml('platform'),
    schema: z.object({
      ...meta, answer,
      label: z.string(),
      summary: z.string(),
      visual: z.enum(['lead', 'dossier', 'copilot', 'briefing', 'map', 'timeline', 'breakdown', 'none']),
      sections: z.object({ shows: section, inputs: section, uses: section, never: section, limits: section }),
      related: z.array(z.string()).min(1),
    }).strict(),
  }),
  audiences: defineCollection({
    loader: yaml('audiences'),
    schema: z.object({
      ...meta, answer,
      label: z.string(),
      summary: z.string(),
      recipes: z.array(z.string()).min(1),
      platform: z.array(z.string()).min(1),
      sections: z.object({ problem: section, signals: section, week: section, setup: section, fit: section }),
    }).strict(),
  }),
  compare: defineCollection({
    loader: yaml('compare'),
    schema: z.object({
      ...meta, answer,
      competitor: z.string(),
      asOf: z.string(),
      sources: z.array(z.object({ id: z.string(), name: z.string(), url: z.url(), asOf: z.string() })).min(1),
      rows: z.array(z.object({ dimension: z.string(), us: z.string(), them: z.string(), source: z.string() })).min(2),
      tableQuestion: z.string().endsWith('?'),
      tableAnswer: z.string(),
      note: z.string().optional(),
      sections: z.object({ differ: section, publishes: section, better: section, evaluate: section }),
    }).strict(),
  }),
  guides: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/guides' }),
    schema: z.object({
      ...meta, answer,
      published: z.coerce.string(),
      summary: z.string(),
      signals: z.array(z.string()).min(1),
      recipes: z.array(z.string()).min(1),
      markets: z.array(z.string()).default([]),
      sources: z.array(z.object({ name: z.string(), url: z.url(), accessed: z.string() })).min(3),
    }).strict(),
  }),
  faq: defineCollection({
    loader: yaml('faq'),
    schema: z.object({
      question: z.string().endsWith('?'),
      answer: z.string(),
      topic: z.enum(['Product', 'Data', 'Scoring', 'Outreach and compliance', 'Setup']),
      pages: z.array(z.string()).min(1),
      order: z.number().int(),
    }).strict(),
  }),
};
