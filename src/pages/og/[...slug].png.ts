import type { APIRoute } from 'astro';
import { allPages } from '../../lib/registry.ts';
import { ogPath } from '../../lib/paths.ts';
import { renderOg } from '../../lib/og.ts';
import type { PageMeta } from '../../lib/page-meta.ts';

export async function getStaticPaths() {
  return (await allPages()).map((meta) => ({ params: { slug: ogPath(meta.path).slice('/og/'.length, -'.png'.length) }, props: { meta } }));
}

export const GET: APIRoute<{ meta: PageMeta }> = async ({ props }) =>
  new Response(await renderOg(props.meta), { headers: { 'Content-Type': 'image/png' } });
