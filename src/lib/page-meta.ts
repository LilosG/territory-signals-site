export interface PageMeta {
  path: string;
  crumb: string;
  keyword: string;
  /** The short term every H2 to H4 on the page carries. */
  headingTerm: string;
  h1: string;
  title: string;
  description: string;
  noindex?: boolean;
  updated: string;
}
