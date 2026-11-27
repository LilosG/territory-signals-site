/** The site's only on-demand route. */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleRequest, type RequestEnv } from '../../lib/request-handler.ts';

export const prerender = false;

const HEADERS = { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' };
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;
  const form = await request.formData().catch(() => null);
  const outcome = form
    ? await handleRequest(form, env as unknown as RequestEnv, request.headers.get('cf-connecting-ip'))
    : ({ status: 400, message: 'The form data could not be read.' } as const);

  if (wantsJson) return Response.json(outcome.status === 200 ? { ok: true } : { ok: false, ...outcome }, { status: outcome.status, headers: HEADERS });
  if (outcome.status === 200) return new Response(null, { status: 303, headers: { ...HEADERS, Location: '/request/thanks' } });
  // Plain form posts without JavaScript get a readable error page.
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Request not sent</title></head><body><h1>Request not sent</h1><p>${escape(outcome.message)}</p><p><a href="/request">Back to the form</a></p></body></html>`,
    { status: outcome.status, headers: { ...HEADERS, 'Content-Type': 'text/html; charset=utf-8' } },
  );
};

export const ALL: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { ...HEADERS, Allow: 'POST' } });
