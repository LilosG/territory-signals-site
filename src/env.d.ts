declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>;
}
interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_GA4_ID?: string;
}
interface Window {
  gtag?: (...args: unknown[]) => void;
  turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
}
