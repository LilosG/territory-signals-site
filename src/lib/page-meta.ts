export interface PageMeta {
  path: string;
  crumb: string;
  keyword: string;
  /** The primary term: in at least two H2s. Other headings carry it, a variant or the location. */
  headingTerm: string;
  /** Close variants of the term that also satisfy a heading (e.g. "seller leads"). */
  headingVariants?: string[];
  h1: string;
  title: string;
  description: string;
  noindex?: boolean;
  updated: string;
}
