import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from '../../src/lib/request-handler.ts';

const env = { RESEND_API_KEY: 'k', RESEND_FROM: 'Site <site@example.com>', TURNSTILE_SECRET_KEY: 's' };
const valid = { name: 'Alex Agent', email: 'alex@example.com', company: 'Demo Team', market: 'Sample Area', teamSize: '2–5', note: 'Hello', 'cf-turnstile-response': 'token' };
const form = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.set(k, v);
  return f;
};
function fakeFetch(turnstileOk: boolean, mailOk = true) {
  const calls: { url: string; init: RequestInit }[] = [];
  const fn = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    if (url.includes('siteverify')) return Response.json({ success: turnstileOk });
    return new Response('{}', { status: mailOk ? 200 : 500 });
  }) as unknown as typeof fetch;
  return { calls, fn };
}

test('a valid request sends exactly one email to the company inbox', async () => {
  const { calls, fn } = fakeFetch(true);
  assert.deepEqual(await handleRequest(form(valid), env, '203.0.113.1', fn), { status: 200 });
  const mail = calls.filter((c) => c.url === 'https://api.resend.com/emails');
  assert.equal(mail.length, 1);
  const body = JSON.parse(String(mail[0]!.init.body));
  assert.deepEqual(body.to, ['hello@lilosgrowth.com']);
  assert.equal(body.from, env.RESEND_FROM);
  assert.equal(body.reply_to, 'alex@example.com');
  assert.match(body.text, /Team size: 2–5/);
});

test('invalid fields return per-field errors and send nothing', async () => {
  const { calls, fn } = fakeFetch(true);
  const out = await handleRequest(form({ ...valid, email: 'nope', teamSize: '900', name: '' }), env, null, fn);
  assert.equal(out.status, 422);
  assert.deepEqual(Object.keys(('errors' in out && out.errors) || {}).sort(), ['email', 'name', 'teamSize']);
  assert.equal(calls.length, 0);
});

test('line breaks cannot be smuggled into single-line fields', async () => {
  const out = await handleRequest(form({ ...valid, company: 'A\r\nBcc: x@example.com' }), env, null, fakeFetch(true).fn);
  assert.equal(out.status, 422);
});

test('a filled honeypot looks successful and sends nothing', async () => {
  const { calls, fn } = fakeFetch(true);
  assert.deepEqual(await handleRequest(form({ ...valid, website: 'spam' }), env, null, fn), { status: 200 });
  assert.equal(calls.length, 0);
});

test('missing secrets fail closed', async () => {
  const { calls, fn } = fakeFetch(true);
  for (const key of Object.keys(env)) assert.equal((await handleRequest(form(valid), { ...env, [key]: '' }, null, fn)).status, 503);
  assert.equal(calls.length, 0);
});

test('a missing or failed spam check sends nothing', async () => {
  const none = fakeFetch(true);
  assert.equal((await handleRequest(form({ ...valid, 'cf-turnstile-response': '' }), env, null, none.fn)).status, 403);
  assert.equal(none.calls.length, 0);
  const failed = fakeFetch(false);
  assert.equal((await handleRequest(form(valid), env, null, failed.fn)).status, 403);
  assert.equal(failed.calls.length, 1);
});

test('a provider failure is reported, not swallowed', async () => {
  assert.equal((await handleRequest(form(valid), env, null, fakeFetch(true, false).fn)).status, 502);
});
