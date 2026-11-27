/** Build-time social images: Satori lays out with the site fonts and tokens; resvg writes the PNG. Node only. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import tokens from '../styles/tokens.css?raw';
import { SITE } from '../data/site.ts';
import type { PageMeta } from './page-meta.ts';

const token = (name: string): string => {
  const found = tokens.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!found) throw new Error(`Missing token ${name}`);
  return found[1]!.trim();
};
const font = (path: string) => readFileSync(resolve(process.cwd(), 'node_modules', path));

const fonts = [
  { name: 'Plex Serif', data: font('@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-500-normal.woff'), weight: 500 as const },
  { name: 'Plex Sans', data: font('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff'), weight: 500 as const },
  { name: 'Plex Mono', data: font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'), weight: 400 as const },
];

type Node = { type: string; props: { style: Record<string, unknown>; children?: Node[] | string } };
const el = (style: Record<string, unknown>, children?: Node[] | string): Node => ({ type: 'div', props: { style: { display: 'flex', ...style }, ...(children === undefined ? {} : { children }) } });

export async function renderOg(meta: PageMeta): Promise<Uint8Array<ArrayBuffer>> {
  const section = meta.path === '/' ? 'Territory intelligence' : meta.path.split('/')[1]!.replaceAll('-', ' ');
  const tree = el({ width: 1200, height: 630, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: token('--color-canvas'), color: token('--color-ink'), padding: 72, fontFamily: 'Plex Sans' }, [
    el({ justifyContent: 'space-between', fontFamily: 'Plex Mono', fontSize: 22, letterSpacing: 2, textTransform: 'uppercase', color: token('--color-ink-muted'), borderBottom: `2px solid ${token('--color-ink')}`, paddingBottom: 24 }, [el({}, section), el({}, new URL(SITE.url).host)]),
    el({ fontFamily: 'Plex Serif', fontSize: meta.h1.length > 55 ? 60 : 72, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 980 }, meta.h1),
    el({ justifyContent: 'space-between', alignItems: 'center', fontSize: 28 }, [el({}, SITE.name), el({ color: token('--color-ink-muted'), fontSize: 24 }, SITE.tagline)]),
  ]);
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return Uint8Array.from(new Resvg(svg).render().asPng());
}
