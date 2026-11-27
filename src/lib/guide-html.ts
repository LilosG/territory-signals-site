/** Wraps each Markdown table in the same labeled, keyboard-scrollable region that DataTable uses. */
export function wrapTables(html: string): string {
  let n = 0;
  return html
    .replace(/<table>/g, () => { n += 1; return `<div class="table-scroll" role="region" aria-label="Table ${n} in this guide" tabindex="0"><table class="data-table">`; })
    .replace(/<\/table>/g, '</table></div>');
}
