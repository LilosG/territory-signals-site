/** Validates a walkthrough request, checks Turnstile and sends one email through Resend. No storage. */
import { z } from 'astro/zod';
import { FIELDS, HONEYPOT, TEAM_SIZES, type FieldName } from '../data/request-form.ts';
import { COMPANY, SITE } from '../data/site.ts';

const singleLine = (name: FieldName) =>
  z.string({ error: FIELDS[name].error }).trim().min(1, FIELDS[name].error).max(FIELDS[name].max, FIELDS[name].error)
    .refine((v) => !/[\r\n]/.test(v), FIELDS[name].error);

export const requestSchema = z.object({
  name: singleLine('name'),
  email: singleLine('email').pipe(z.email(FIELDS.email.error)),
  company: singleLine('company'),
  market: singleLine('market'),
  teamSize: z.enum(TEAM_SIZES, { error: FIELDS.teamSize.error }),
  note: z.string().trim().max(FIELDS.note.max, FIELDS.note.error).default(''),
});

export interface RequestEnv {
  RESEND_API_KEY?: string | undefined;
  RESEND_FROM?: string | undefined;
  TURNSTILE_SECRET_KEY?: string | undefined;
}

export type Outcome =
  | { status: 200 }
  | { status: 400 | 403 | 422 | 502 | 503; message: string; errors?: Partial<Record<FieldName, string>> };

const FALLBACK = `Please email ${COMPANY.email} instead.`;

export async function handleRequest(form: FormData, env: RequestEnv, ip: string | null, send: typeof fetch = fetch): Promise<Outcome> {
  // A filled honeypot gets the normal success response and nothing is sent.
  if (String(form.get(HONEYPOT) ?? '') !== '') return { status: 200 };

  const raw = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, form.get(k) ?? undefined]));
  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<FieldName, string>> = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as FieldName] ??= issue.message;
    return { status: 422, message: 'Check the highlighted fields.', errors };
  }

  const { RESEND_API_KEY, RESEND_FROM, TURNSTILE_SECRET_KEY } = env;
  if (!RESEND_API_KEY || !RESEND_FROM || !TURNSTILE_SECRET_KEY) {
    console.error('request form: a required secret is not configured');
    return { status: 503, message: `The form is not available right now. ${FALLBACK}` };
  }

  const token = String(form.get('cf-turnstile-response') ?? '');
  if (!token) return { status: 403, message: `The spam check did not complete. Try again. ${FALLBACK}` };
  const verifyBody = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip) verifyBody.set('remoteip', ip);
  const verify = await send('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: verifyBody });
  const verdict = (await verify.json().catch(() => ({}))) as { success?: boolean };
  if (!verdict.success) return { status: 403, message: `The spam check did not pass. Try again. ${FALLBACK}` };

  const d = parsed.data;
  const text = [
    `Name: ${d.name}`,
    `Work email: ${d.email}`,
    `Team or brokerage: ${d.company}`,
    `Market or neighborhoods: ${d.market}`,
    `Team size: ${d.teamSize}`,
    '',
    d.note ? `Note:\n${d.note}` : 'Note: (none)',
  ].join('\n');
  const mail = await send('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: RESEND_FROM, to: [COMPANY.email], reply_to: d.email, subject: `${SITE.name} walkthrough request: ${d.company}`, text }),
  });
  if (!mail.ok) {
    console.error(`request form: email provider returned ${mail.status}`);
    return { status: 502, message: `Your request could not be sent. ${FALLBACK}` };
  }
  return { status: 200 };
}
