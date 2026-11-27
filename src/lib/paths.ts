/** Clean public path: build.format "file" exposes ".html" in Astro.url during the build. */
export const cleanPath = (pathname: string): string => {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  return p === '' ? '/' : p;
};
export const ogPath = (path: string): string => `/og/${path === '/' ? 'index' : path.slice(1)}.png`;
