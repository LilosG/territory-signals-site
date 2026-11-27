# PLAN.md: Territory Signals marketing site (Phase 1)

Prepared 2026-11-26. The product repo was read, never written. Phase 2 starts when Mike says "go".

**Answer these with "go":** Q1 to Q4 in section 7. Q1 and Q3 trigger STOP rules. Q2 changes the market map. Q4 is a claim that no product file supports. Every other question has a default that applies unless you change it.

## 1. Sitemap

56 routes: 20 fixed pages, 8 signals, 9 recipes, 8 platform pages, 4 audiences, 4 comparisons, 3 guides. `/api/request` is the only on-demand route. `/design-system` (Phase 2) is noindex, left out of the sitemap, and not counted. There is no `/for` index (not in the brief), so audience breadcrumbs are Home > page. Titles (50 to 60 characters) and descriptions (140 to 158) were validated by script for length and uniqueness, as were primary keywords and H1s.

**Heading rule (see Q6).** H1, title and description carry the primary keyword or a natural form of it. Every H2 to H4 carries the page's short **heading term** (column 4), plus "San Diego" on local pages. `check-meta.mjs` enforces this. Header, footer and product-UI mock text never use H2 to H4.

Noindex: `/404`, `/request/thanks`, `/api/*` (and the internal `/design-system`).

### 1a. Route, template, keyword, heading term, H1

| Route | Template | Primary keyword | Heading term (H2–H4) | H1 |
|---|---|---|---|---|
| / | Home | seller signals for real estate agents | seller signals | Seller signals for real estate agents, before the listing |
| /how-it-works | Standard | how predictive seller scoring works | seller scoring | How predictive seller scoring works, rule by rule |
| /signals | Standard | types of seller signals | seller signal | The types of seller signals Territory Signals tracks |
| /signals/building-permits | SignalPage | building permit data for real estate agents | building permit data | Building permit data for real estate agents |
| /signals/short-term-rental-licenses | SignalPage | short-term rental license leads | rental license | Short-term rental license leads in San Diego |
| /signals/tax-default | SignalPage | tax default property list San Diego | tax default | The tax default property list San Diego publishes |
| /signals/sb9-sb79-upzoning | SignalPage | SB 9 lot split leads | SB 9 | SB 9 lot split leads and SB 79 transit estimates |
| /signals/code-enforcement | SignalPage | code enforcement property leads | code enforcement | Code enforcement property leads in San Diego |
| /signals/ownership-tenure | SignalPage | homeowner tenure seller signal | homeowner tenure | The homeowner tenure seller signal and owner profile |
| /signals/recorder-documents | SignalPage | inherited property leads | inherited property | Inherited property leads from recorder documents |
| /signals/fire-hazard-zones | SignalPage | fire hazard zone seller signal | fire hazard zone | The fire hazard zone seller signal (coming) |
| /recipes | Standard | seller lead recipes | recipe | Seller lead recipes: named patterns with visible rules |
| /recipes/builder-bait | RecipePage | builder bait seller leads | Builder bait | Builder bait seller leads |
| /recipes/tired-landlord | RecipePage | tired landlord leads | Tired landlord | Tired landlord leads: long-held rentals with friction |
| /recipes/downsizer | RecipePage | downsizer seller leads | Downsizer | Downsizer seller leads |
| /recipes/pre-list-prep | RecipePage | pre-listing permit leads | pre-listing permit | Pre-listing permit leads from the Pre-list prep recipe |
| /recipes/stalled-project | RecipePage | stalled project seller leads | Stalled project | Stalled project seller leads |
| /recipes/short-term-rental-exit | RecipePage | short-term rental exit seller leads | rental exit | Short-term rental exit seller leads |
| /recipes/quiet-inheritance | RecipePage | quiet inheritance seller leads | Quiet inheritance | Quiet inheritance seller leads, handled with approval |
| /recipes/insurance-squeeze | RecipePage | insurance squeeze seller leads | Insurance squeeze | Insurance squeeze seller leads (waiting on fire data) |
| /recipes/financial-pressure | RecipePage | financial pressure seller leads | Financial pressure | Financial pressure seller leads, handled with approval |
| /platform | Standard | territory intelligence platform | territory intelligence | A territory intelligence platform your team works from |
| /platform/lead-scoring | FeaturePage | real estate lead scoring software | lead scoring | Real estate lead scoring software you can audit |
| /platform/seller-dossier | FeaturePage | seller dossier for listing appointments | seller dossier | A seller dossier for listing appointments |
| /platform/outreach-co-pilot | FeaturePage | real estate outreach drafting tool | outreach draft | A real estate outreach drafting tool with human approval |
| /platform/weekly-briefings | FeaturePage | weekly real estate territory briefing | territory briefing | The weekly real estate territory briefing |
| /platform/territory-map | FeaturePage | real estate territory map software | territory map | Real estate territory map software built on parcels |
| /platform/opportunity-matrix | FeaturePage | real estate opportunity matrix | opportunity matrix | The real estate opportunity matrix: equity by momentum |
| /platform/backtesting | FeaturePage | seller lead score backtesting | backtest | Seller lead score backtesting against recorded sales |
| /platform/share-pages | FeaturePage | off-market property share pages | share page | Off-market property share pages with no owner data |
| /for/real-estate-teams | AudiencePage | seller lead tools for real estate teams | real estate teams | Seller lead tools for real estate teams |
| /for/solo-agents | AudiencePage | seller lead tools for solo agents | solo agents | Seller lead tools for solo agents who farm a territory |
| /for/brokerages | AudiencePage | seller lead tools for brokerages | brokerages | Seller lead tools for brokerages |
| /for/investors-and-developers | AudiencePage | off-market property leads for developers | developers | Off-market property leads for developers and investors |
| /markets | Standard | real estate territory intelligence markets | markets | Real estate territory intelligence markets we cover |
| /markets/san-diego | MarketPage | San Diego off-market seller signals | San Diego | San Diego off-market seller signals by planning area |
| /data-sources | Standard | public records data for real estate prospecting | public records | Public records data for real estate prospecting |
| /compliance | Standard | compliant real estate prospecting | compliant prospecting | Compliant real estate prospecting, built into the workflow |
| /how-we-build | Standard | custom territory intelligence setup | setup | Custom territory intelligence setup, built for your team |
| /compare | Standard | seller lead software comparison | comparison | A seller lead software comparison with dated sources |
| /compare/smartzip | ComparePage | SmartZip alternative | SmartZip alternative | A SmartZip alternative built on parcel records |
| /compare/offrs | ComparePage | Offrs alternative | Offrs alternative | An Offrs alternative with scoring you can read |
| /compare/propstream | ComparePage | PropStream alternative | PropStream alternative | A PropStream alternative for working one territory |
| /compare/revaluate | ComparePage | Revaluate alternative | Revaluate alternative | A Revaluate alternative that starts from parcels |
| /guides | Standard | real estate prospecting guides | prospecting guide | Real estate prospecting guides built on public records |
| /guides/find-homeowners-likely-to-sell | ArticlePage | how to find homeowners likely to sell | likely to sell | How to find homeowners likely to sell before they list |
| /guides/building-permit-data-for-listing-agents | ArticlePage | what building permit data tells a listing agent | permit data | What building permit data tells a listing agent |
| /guides/sb-9-sb-79-san-diego-agents | ArticlePage | SB 9 and SB 79 for agents | SB 9 and SB 79 | SB 9 and SB 79 for agents: lot-split and transit leads in San Diego |
| /glossary | Standard | seller signal glossary | signal | Seller signal glossary: every signal and recipe term |
| /faq | Standard | territory intelligence FAQ | territory intelligence | Territory intelligence FAQ |
| /about | Standard | about Territory Signals | Territory Signals | About Territory Signals, built by Lilos Growth |
| /request | Form | request a territory walkthrough | walkthrough | Request a territory walkthrough |
| /request/thanks | Standard (noindex) | walkthrough request received | request | Your walkthrough request is in |
| /privacy | Legal | Territory Signals privacy policy | privacy | Territory Signals privacy policy |
| /terms | Legal | Territory Signals terms of use | terms | Territory Signals terms of use |
| /404 | Standard (noindex) | page not found | page | Page not found |

### 1b. Meta title and meta description (character counts)

| Route | Meta title | Meta description |
|---|---|---|
| / | Seller Signals for Real Estate Agents \| Territory Signals (57) | Seller signals for real estate agents: permits, rental licenses, tax rolls and owner data matched to parcels, scored by open rules, worked by your team. (152) |
| /how-it-works | How Predictive Seller Scoring Works \| Territory Signals (55) | See how predictive seller scoring works: collect records, match them to parcels, apply published weights and decay, then let a person approve every draft. (154) |
| /signals | Types of Seller Signals We Track \| Territory Signals (52) | The types of seller signals we track, from building permits and rental licenses to tax-default lists and recorder documents, with each source and its limits. (157) |
| /signals/building-permits | Building Permit Data for Real Estate Agents in San Diego (56) | Building permit data for real estate agents: City of San Diego approvals, ADU, demolition and stalled permits matched to parcels, with weights and limits. (154) |
| /signals/short-term-rental-licenses | Short-Term Rental License Leads in San Diego, Explained (55) | Short-term rental license leads from City of San Diego STRO data: what a removed license can mean, how it is matched to a parcel and scored, and its limits. (156) |
| /signals/tax-default | Tax Default Property List San Diego: How Agents Use It (54) | The tax default property list San Diego County publishes each year: what it contains, how we match and score it, and why it never appears on lead lists. (152) |
| /signals/sb9-sb79-upzoning | SB 9 Lot Split Leads in San Diego: Estimated Eligibility (56) | SB 9 lot split leads and SB 79 transit parcels in San Diego, from an in-house screen of zoning, lot size and stops. All eligibility is labeled estimated. (153) |
| /signals/code-enforcement | Code Enforcement Property Leads in San Diego, Explained (55) | Code enforcement property leads from City of San Diego records: how open and closed cases are scored, what stays private, and why the public file is old. (153) |
| /signals/ownership-tenure | Homeowner Tenure Seller Signal and Owner Profile Data (53) | The homeowner tenure seller signal: years owned, absentee and out-of-state status, open mortgage and estimated equity from ATTOM, and how each one scores. (154) |
| /signals/recorder-documents | Inherited Property Leads From Recorder Document Data (52) | Inherited property leads from ATTOM recorder data, not obituaries or court scraping: transfers by death or trust, default notices, and approval rules. (150) |
| /signals/fire-hazard-zones | Fire Hazard Zone Seller Signal: Coming to San Diego Data (56) | The fire hazard zone seller signal is coming and not yet loaded. See what it will measure, why it waits on an authoritative state file, and how it scores. (154) |
| /recipes | Seller Lead Recipes With Visible Rules \| Territory Signals (58) | Seller lead recipes are named patterns such as Downsizer or Tired landlord. See the exact conditions behind each one and which need team approval first. (152) |
| /recipes/builder-bait | Builder Bait Seller Leads: Estimated Upzoning Potential (55) | Builder bait seller leads combine estimated upzoning potential, a lot well above the area median and 20 or more years of ownership. See the exact rules. (152) |
| /recipes/tired-landlord | Tired Landlord Leads: Absentee Owners With Friction Signs (57) | Tired landlord leads flag absentee owners of 15 years or more with a sign of friction on the property. See the exact conditions, sources and limits here. (153) |
| /recipes/downsizer | Downsizer Seller Leads: Long-Held, No Open Mortgage (51) | Downsizer seller leads are owner-occupied homes held 20 or more years with no open mortgage. See the rule, the owner data behind it and what it cannot know. (156) |
| /recipes/pre-list-prep | Pre-Listing Permit Leads: The Pre-List Prep Recipe Rules (56) | Pre-listing permit leads come from cosmetic or remodel permits approved in the last six months on homes held 10 or more years. See how the text is read. (152) |
| /recipes/stalled-project | Stalled Project Seller Leads From Expired Building Permits (58) | Stalled project seller leads start with a building permit that expired more than 90 days ago and was never closed. See which permit groups count and why. (153) |
| /recipes/short-term-rental-exit | Short-Term Rental Exit Seller Leads \| Territory Signals (55) | Short-term rental exit seller leads flag homes whose City license was removed in the last year. See how removals are detected and what they do not prove. (153) |
| /recipes/quiet-inheritance | Quiet Inheritance Seller Leads, Handled With Approval (53) | Quiet inheritance seller leads come from recorded transfers by death, trust or inheritance. Outreach needs team approval and stays off lists and shares. (152) |
| /recipes/insurance-squeeze | Insurance Squeeze Seller Leads: Waiting on Fire Zone Data (57) | Insurance squeeze seller leads will flag homes in high or very high fire hazard zones. The recipe stays idle until authoritative zone data has been loaded. (155) |
| /recipes/financial-pressure | Financial Pressure Seller Leads, Handled With Approval (54) | Financial pressure seller leads use tax default, default notices, open code cases or lost rental income. Team approval is required and records stay private. (156) |
| /platform | Territory Intelligence Platform for Real Estate Teams (53) | A territory intelligence platform with explainable lead scores, quick dossiers, drafted outreach, weekly briefings and maps, configured to your territory. (154) |
| /platform/lead-scoring | Real Estate Lead Scoring Software You Can Audit Yourself (56) | Real estate lead scoring software with published weights, recency decay, match confidence and a per-parcel breakdown. AI never sets or changes a score. (151) |
| /platform/seller-dossier | Seller Dossier for Listing Appointments \| Territory Signals (59) | A seller dossier for listing appointments: a quick view for triage and a printable consultation page with estimates clearly labeled and records withheld. (153) |
| /platform/outreach-co-pilot | Real Estate Outreach Drafting Tool With Human Approval (54) | A real estate outreach drafting tool for letters, emails and call scripts built from stored facts. Drafts stay blocked without agent name and DRE license. (154) |
| /platform/weekly-briefings | Weekly Real Estate Territory Briefing for Your Whole Team (57) | A weekly real estate territory briefing built from database records: top leads, new signals and source health, with any AI summary labeled and validated. (153) |
| /platform/territory-map | Real Estate Territory Map Software Built on Parcel Data (55) | Real estate territory map software that plots scored parcels by tier, with lenses for estimated equity, SB 9 and SB 79 estimates and rental density. (148) |
| /platform/opportunity-matrix | Real Estate Opportunity Matrix: Equity by Seller Momentum (57) | The real estate opportunity matrix plots estimated equity against stored seller score, sized by estimated commission, with a table view for every lead. (151) |
| /platform/backtesting | Seller Lead Score Backtesting Against Recorded Home Sales (57) | Seller lead score backtesting checks which recorded sales had a public signal 14 to 365 days earlier. See what it measures and what it cannot tell you. (151) |
| /platform/share-pages | Off-Market Property Share Pages Without Any Owner Data (54) | Off-market property share pages show neighborhood, lot size, zoning, estimated upzoning and your agent. No owner, equity, sales or sensitive records. (149) |
| /for/real-estate-teams | Seller Lead Tools for Real Estate Teams \| Territory Signals (59) | Seller lead tools for real estate teams: one shared territory, scored parcels, assigned outreach drafts, logged outcomes and a person approving each one. (153) |
| /for/solo-agents | Seller Lead Tools for Solo Agents Who Farm a Territory (54) | Seller lead tools for solo agents farming a defined area: a short ranked list, the records behind each score and drafts you review before anything goes out. (156) |
| /for/brokerages | Seller Lead Tools for Brokerages: One Deployment Per Client (59) | Seller lead tools for brokerages: a separate deployment configured to your territory, DRE checks before approval and rules for how sensitive records appear. (156) |
| /for/investors-and-developers | Off-Market Property Leads for Developers and Investors (54) | Off-market property leads for developers: estimated SB 9 and SB 79 parcels, demolition and lot-split permits, stalled projects and share pages for buyers. (154) |
| /markets | Real Estate Territory Intelligence Markets We Cover Today (57) | Real estate territory intelligence markets: San Diego is live today. See how a territory is defined by City planning areas and configured for each team. (152) |
| /markets/san-diego | San Diego Off-Market Seller Signals by Planning Area (52) | San Diego off-market seller signals from City, County and parcel records, plus owner data, for any set of City planning areas your team chooses to work. (152) |
| /data-sources | Public Records Data for Real Estate Prospecting Sources (55) | Public records data for real estate prospecting: every source we use, its verdict, publish cadence and limits, plus the sources we do not scrape and why. (153) |
| /compliance | Compliant Real Estate Prospecting With Human Approval (53) | Compliant real estate prospecting starts with human approval, a DRE license check, no automated texts or calls and strict handling of sensitive records. (152) |
| /how-we-build | Custom Territory Intelligence Setup for Real Estate Teams (57) | Custom territory intelligence setup, run as a managed service: your planning areas, agents and rules in a separate deployment, with MLS as an add-on tier. (154) |
| /compare | Seller Lead Software Comparison With Dated Public Sources (57) | A seller lead software comparison of Territory Signals with SmartZip, Offrs, PropStream and Revaluate, using dated, linked public facts and no ratings. (151) |
| /compare/smartzip | SmartZip Alternative: Territory Signals Compared, 2026 (54) | Looking for a SmartZip alternative? Compare approach, scoring, territory setup and outreach with Territory Signals, using dated and linked public sources. (154) |
| /compare/offrs | Offrs Alternative: Territory Signals Side by Side, 2026 (55) | Looking for an Offrs alternative? Compare how each approaches likely sellers, territory and follow-up, using dated, linked and attributed public sources. (153) |
| /compare/propstream | PropStream Alternative: Territory Signals Compared, 2026 (56) | Looking for a PropStream alternative? Compare a self-serve nationwide property database with a per-team territory build, using dated, linked sources. (149) |
| /compare/revaluate | Revaluate Alternative: Territory Signals Compared, 2026 (55) | Looking for a Revaluate alternative? Compare scoring the contacts in your CRM with scoring parcels in your territory, using dated, linked public sources. (153) |
| /guides | Real Estate Prospecting Guides Built on Public Records (54) | Real estate prospecting guides on finding likely sellers, reading permit data and screening SB 9 and SB 79 parcels, with every source named and linked. (151) |
| /guides/find-homeowners-likely-to-sell | How to Find Homeowners Likely to Sell Before They List (54) | Learn how to find homeowners likely to sell before they list: which public and owner records to watch, how to combine them and how to reach out with care. (154) |
| /guides/building-permit-data-for-listing-agents | What Building Permit Data Tells a Listing Agent: A Guide (56) | What building permit data tells a listing agent: how to read approval types, scope text, expiry and parcel numbers, and where permit records mislead you. (153) |
| /guides/sb-9-sb-79-san-diego-agents | SB 9 and SB 79 for Agents: San Diego Lot-Split and Transit (58) | SB 9 and SB 79 for agents: how to screen San Diego parcels for lot-split and transit upzoning potential, what a screen misses and where to confirm it. (150) |
| /glossary | Seller Signal Glossary: Signal and Recipe Terms Defined (55) | A seller signal glossary defining every signal, recipe and scoring term used in Territory Signals, from tax default and ADU permits to decay and stacking. (154) |
| /faq | Territory Intelligence FAQ for Teams \| Territory Signals (56) | Territory intelligence FAQ: where the data comes from, how parcels are scored, what AI does and does not do, how outreach is approved and how setup works. (154) |
| /about | About Territory Signals, Built by Lilos Growth in San Diego (59) | About Territory Signals: a territory intelligence product built and run in San Diego by Lilos Growth for real estate teams and brokerages, one at a time. (153) |
| /request | Request a Territory Walkthrough \| Territory Signals (51) | Request a territory walkthrough. Tell us your market and team size, and see how Territory Signals collects, scores and explains seller signals for it. (150) |
| /request/thanks | Walkthrough Request Received \| Territory Signals Thank You (58) | Your walkthrough request was received. We will reply by email about your territory. In the meantime, read how seller scoring works, one rule at a time. (151) |
| /privacy | Territory Signals Privacy Policy for This Public Website (56) | The Territory Signals privacy policy: what this website collects through the walkthrough form and analytics, who processes it and how to reach us about it. (155) |
| /terms | Territory Signals Terms of Use for This Public Website (54) | The Territory Signals terms of use for this website: informational content, estimates that are not official determinations, third-party sources and contact. (156) |
| /404 | Page Not Found (404) on the Territory Signals Website (53) | The page you asked for is not on the Territory Signals website. Go to the home page, read how seller scoring works or request a territory walkthrough. (150) |

**Secondary keywords.** `/`: predictive seller leads, homeowners likely to sell, territory intelligence. `/markets/san-diego`: San Diego real estate farming data, San Diego public records for agents.

## 2. Page outlines

Rules for every content page: breadcrumbs (not on Home), one H1, a 40 to 60 word answer-first paragraph directly under it, question-form H2s answered in their first sentence, one in-body link to `/request` plus the final CTA band, no more than two obsidian bands, all content readable without JavaScript. The header CTA is navigation and does not count as the in-body link. `/request`, thanks, legal and 404 skip the CTA band.

### 2a. Home

| # | Section (H2) | Layout and visual | Answers | Facts |
|---|---|---|---|---|
| 1 | Hero. H1. Subhead: "Permits, rental licenses, tax-roll lines and owner records, matched to the parcel, scored by published rules and worked by your team." CTAs: Request a territory walkthrough / See how scoring works | 7/5. SignalStack: record rows attach to a parcel outline and resolve to a score ring and tier. Sample badge. Plays once; static end state under reduced motion | What is this? | F1–F4, F20 |
| 2 | Where do seller signals sit before a home is listed? | 5/7 editorial text beside a hairline table: record, publisher, what an MLS search does not show. One serif pull statement. Makes no timing or lead-time claim | Why do I need it? | F5–F12 |
| 3 | How do seller signals become a worked lead? | Four numbered ruled columns: Collect, Connect, Score, Act. A line under them covers the AI explanation layer | How does it work? | F2–F4, F18–F20, F27 |
| 4 | Which seller signals does each recipe combine? | RecipeTile table of all 9 verbatim labels and short descriptions, with "Approval required" and "Waiting on data" marks | What patterns will I get? | F21–F23 |
| 5 | How does your team work these seller signals? | Coded UI: LeadRow, DossierPanel, SignalTimeline, BriefingCard, OutreachCoPilot with "Blocked: missing DRE license". All "Demo Team", all Sample | What do I see each day? | F24–F31 |
| 6 | Which data sources feed the seller signals? | Verdict strip table: source, verdict, note. Fire zones "coming". One "not scraped" line. Then the TerritoryMap as the market visual | Is the data real? | F5–F16 |
| 7 | Who approves outreach built on seller signals? | Obsidian band 1. Definition list: human approval, DRE rule, nothing sent or dialed automatically, sensitive records | Is it safe for my license? | F28–F32 |
| 8 | How are seller signals set up for your team? | 8/4. One deployment per client, your planning areas, managed, MLS add-on | How do I buy it? | F33–F35 |
| 9 | What do teams ask about seller signals? | FaqList of 6 (data sources; lead list or not; how scoring works; what AI does; whether anything sends itself; how setup works). FAQPage JSON-LD | Remaining objections | FAQ collection |
| 10 | Which seller signals are in your territory? | Obsidian band 2. CtaBand | What next? | |

### 2b. Templates

| Template | Sections in order |
|---|---|
| **SignalPage** | Breadcrumbs, mono eyebrow (family, status), H1, answer. Facts rail (4 of 12 columns): source, publisher, publish cadence, pipeline cadence, verdict, weight, half-life, estimate flag. H2s: What is the {term} signal? / Why can {term} point to a sale? / Where does {term} data come from? (named, linked source) / How is {term} scored? (table from `product-catalog.json` and the frontmatter checked against it) / What does your agent do with {term}? / What are the limits of {term} data? Then recipes that use it (generated), related guides, in-body request link, CtaBand. Sensitive signals add a "where this record never appears" note. `status: coming` shows a Coming badge and no live-data wording |
| **RecipePage** | Breadcrumbs, eyebrow, H1, answer, short description and rationale **verbatim** as a pull statement. H2s: the same six, in recipe form. "What it is" shows the exact `when` rule as a definition list. "How it is scored" separates recipe matching (pass/fail) from the parcel score (points). Approval and visibility box for sensitive recipes. Signals used (generated), related guides, CtaBand |
| **FeaturePage** | H1, answer, one coded UI surface (7/5). H2s: What does the {term} show? / What goes into the {term}? / How does your team use the {term}? / What will the {term} never show? / What are the limits of the {term}? Related platform pages and signals, CtaBand |
| **AudiencePage** | H1, answer. H2s: What problem do {term} bring? / Which signals matter to {term}? / What does a week look like for {term}? / What is set up for {term}? / When is this the wrong fit for {term}? Related recipes and platform pages, CtaBand. No invented personas or results |
| **ComparePage** | H1, answer, "Facts as of" line. H2s: How does Territory Signals differ as a {term}? / What does {competitor} publish about its product? (as a {term}) / How do the two compare? (real table: approach, what is scored, data, outreach, territory, buying model; each competitor cell has an "as of" month and source link; unverified rows are omitted, never guessed) / When is {competitor} the better choice over a {term}? / How should you evaluate a {term}? Source list, trademark note, CtaBand. No prices, ratings, accuracy claims or disparagement |
| **MarketPage** | H1, answer, TerritoryMap (all City planning areas, drawn equally, no names or highlight). H2s: Which signals are live in San Diego? / How is a San Diego territory defined? / Which San Diego public records are used? / What is not covered in San Diego yet? / How is a San Diego team set up? Related guides, CtaBand |
| **ArticlePage** | H1, byline (Mike Prickett, Lilos Growth), published and updated dates, answer, on-page contents list, 68ch body with tables and definition lists, numbered sources with access dates, limits section, related signals and recipes, CtaBand. Article JSON-LD. 1,800 to 2,800 words (checked) |
| **StandardPage** | Breadcrumbs, H1, answer, slotted sections, in-body request link, CtaBand |
| **Form (`/request`)** | H1, answer, 5/7: "what happens next" list (no turnaround time) and RequestForm: name, work email, team or brokerage, market or neighborhoods, team size (Solo, 2–5, 6–15, 16+), optional note, Turnstile, honeypot. Inline errors tied to fields, error summary with focus. Works without JS as a plain POST; JS adds inline validation |
| **Legal** | StandardPage without CtaBand, effective date |

### 2c. Standard pages

| Page | H2 sections |
|---|---|
| /how-it-works | Collect, Connect, Score, Act, Explain (each as a question). Score demo: 6 toggles on a fictional parcel (pre-sale prep permit, ADU permit, stalled permit, STR license removed, SB 9 estimate, 20+ years owned), each with its age and confidence shown. Formula, stacking and cap table; score tiers; what suppresses a score; what AI never does |
| /signals, /recipes, /platform, /compare, /guides, /markets | Index table generated from the collection; what the items are; how to choose between them |
| /data-sources | Verdict key; source table (verdict, join method, publish cadence, pipeline cadence, limits); owner data; fire zones (coming); what is not scraped and why; how every signal is traceable |
| /compliance | Human approval; DRE rule; sending, texting and calling; sensitive records; what homeowner text may never say; share pages; data minimization; what stays your responsibility |
| /how-we-build | One deployment per client; what is configured; what onboarding needs from you (planning areas; team names, emails, roles, DRE numbers, phones; brokerage; office address; AI provider and monthly budget); weekly run; MLS add-on |
| /glossary | DefinitionList generated from signals, recipes, score components, tiers and scoring terms. DefinedTermSet |
| /faq | All FAQ entries grouped by topic |
| /about | What it is; who builds it; where; how it is run; contact |

**Worked score example (becomes a unit test).** A pre-sale prep permit 60 days old at 0.95 confidence: 36 × 0.5^(60/120) × 0.95 = 24.18. SB 9 estimate: 14 × 0.5 confidence = 7. Years owned 20+: 13. No open mortgage: 13. Sum 57.18; three families gives ×1.30 = 74.34, shown as **74, Priority**. The demo also applies the owner-modifier cap of 40.

## 3. Design tokens (`src/styles/tokens.css`)

The brief's palette wins where it differs from the dashboard (canvas #FAFAF9, not #F8FAFC; ink #0B0F17, not #0F172A). Gold, hairlines and tiers come from the dashboard and `ring.ts`. Contrast ratios were computed.

```css
@theme static {
  --color-*: initial;
  --color-canvas: #fafaf9;      --color-surface: #ffffff;     --color-sunken: #f1f5f9;
  --color-line: #e2e8f0;        --color-line-strong: #cbd5e1;
  --color-ink: #0b0f17;         /* 18.4:1 on canvas */
  --color-ink-muted: #475569;   /* 7.3:1 on canvas */
  --color-ink-faint: #64748b;   /* 4.6:1 canvas, 4.8:1 white; never on sunken (4.34) */
  --color-gold: #b8862d;        /* focus ring only on light (3.1:1, non-text) */
  --color-gold-bright: #c6923a; /* on obsidian, 6.9:1 */
  --color-gold-strong: #86671c; /* briefing labels on light, 5.1:1 */
  --color-gold-soft: #f8f1df;
  --color-obsidian: #0b0f17;    --color-on-dark: #ffffff;     --color-on-dark-muted: #cbd5e1;
  --color-line-dark: rgb(255 255 255 / 0.12);
  /* data only */
  --color-tier-immediate: #b91c1c;  /* 80–100 */
  --color-tier-priority: #b45309;   /* 65–79 */
  --color-tier-watchlist: #1e3a8a;  /* 45–64 */
  --color-tier-monitor: #64748b;    /* 0–44 */
  /* product UI recreations only (Q7) */
  --color-sample: #a16207;      --color-sample-soft: #fef8e7;  /* 4.6:1 */

  --font-sans: 'IBM Plex Sans Variable', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'IBM Plex Serif', ui-serif, Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

  /* fluid from 360px to 1280px */
  --text-2xs: 0.6875rem;  --text-xs: 0.75rem;  --text-sm: 0.875rem;
  --text-base: clamp(1rem, 0.98rem + 0.11vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.08rem + 0.22vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.43vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.30rem + 0.87vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.53rem + 1.52vw, 2.75rem);
  --text-4xl: clamp(2.25rem, 1.66rem + 2.61vw, 3.75rem);
  --leading-display: 1.08;  --leading-heading: 1.2;  --leading-body: 1.6;
  --tracking-display: -0.025em;  --tracking-heading: -0.015em;  --tracking-eyebrow: 0.09em;

  --spacing: 0.25rem;
  --spacing-gutter: clamp(1.25rem, 4vw, 3rem);
  --spacing-section: clamp(4rem, 8vw, 7.5rem);
  --spacing-tap: 2.75rem;              /* 44px targets */
  --container-page: 80rem;  --container-measure: 68ch;
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px; --radius-xl: 10px; --radius-full: 9999px;
  --shadow-xs: 0 1px 0 rgb(11 15 23 / 0.04);
  --shadow-lift: 0 12px 32px -12px rgb(11 15 23 / 0.18), 0 2px 6px rgb(11 15 23 / 0.05);
  --ease-out-quiet: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 150ms; --duration-base: 200ms; --duration-slow: 250ms;
  --breakpoint-sm: 40rem; --breakpoint-md: 48rem; --breakpoint-lg: 64rem; --breakpoint-xl: 80rem;
}
```

**Fonts.** Only IBM Plex Sans ships a variable package on npm. `@fontsource-variable/ibm-plex-serif` and `-mono` are not published, so Serif and Mono use static `@fontsource` weights (Serif 500; Mono 400 and 500). Preload Sans variable and Serif 500 only. OG images use the static `.woff` files because Satori cannot read WOFF2 or variable fonts.

**Versions (matching the product where it has them).** astro 7.4.13, @astrojs/cloudflare 14.4.9, tailwindcss and @tailwindcss/vite 4.3.5, TypeScript 5.9.3 (the product backlog says `astro check` is not verified on TypeScript 7), @astrojs/sitemap 3.7.6, wrangler 4.168.0. The OG route is prerendered in Node, because Satori and a PNG rasterizer run at build time.

**Matching the screenshots.** Recreations copy the structure of LeadRow, the quick dossier, score bars, the timeline, the briefing card and the co-pilot. They use "Demo Team", obviously fictional addresses and record IDs (never the real addresses or APNs in the screenshots), and the schematic lot diagram the product falls back to (D23) in place of satellite imagery.

**Forbidden-terms check.** The script stores its term list encoded, so the repo never contains the literal strings (this file included). It scans file names, source, content, public assets, image metadata and `dist/`. The two-letter initials match as an uppercase whole word; the rest ignore case. One of the terms is also a common icon name, so that icon is not used.

## 4. Product facts and sources

Paths are relative to the product repo. Config values are read from the vendored catalog or checked against it, not retyped.

| ID | Fact the site will use | Source |
|---|---|---|
| F1 | Territory intelligence platform for real estate teams: one codebase, separate deployment per client, configured per client | README.md, CLAUDE.md |
| F2 | Layers: Collect, Connect, Score, Act, Explain, Show | ARCHITECTURE.md Layers |
| F3 | Records are matched to parcels by APN, spatial position, address or name; each signal stores source, record ID, confidence and match method; raw records and signals are append-only | ARCHITECTURE.md; CLAUDE.md data rules |
| F4 | Scoring is deterministic: no AI, no randomness | ARCHITECTURE.md Scoring; config/scoring.yaml |
| F5 | City development permit approvals (usable with limits): some rows have no parcel number, and many have no project type, so classification uses approval type and scope text. The recon percentages cover one client's area, so the site states no figures | SOURCES.md #2 |
| F6 | City STR licenses (usable with limits): active licenses only, no APN or issue date; matched by location; only license ID, tier, location and status stored. Removals appear from the second snapshot | SOURCES.md #1; D3; BACKLOG.md |
| F7 | County Treasurer-Tax Collector default list (usable with limits): public PDF, annual, low volume | SOURCES.md #5; D2 |
| F8 | SanGIS parcels (usable): no owner names. The last recorded document date is never shown as a purchase date | SOURCES.md #7; D8 |
| F9 | SANDAG zoning (usable with limits) and transit stops (usable with limits; official SB 79 layer unconfirmed) feed an in-house estimate. SB 9 screens RS single-family zones with lots of 2,400 sq ft or more and skips planned districts. SB 79 has no frequency or dedicated-lane test. Not checked for SB 9: historic status, fire zone, hillside or coastal limits, existing units, ownership history | SOURCES.md #8; D7; pipelines/territory/sources/upzoning_estimate.py |
| F10 | Community planning areas (usable); a territory is defined by planning areas | SOURCES.md #9; D5 |
| F11 | City code enforcement (usable with limits). **The public extract is historical: cases closed 2015–2018, last updated January 2018. It is not a current feed.** Investigator details are never stored | SOURCES.md #11; D21; BACKLOG.md |
| F12 | ATTOM (usable with limits; recon covers a trial): owner, mailing address, value, equity, mortgage status, sales, recorder history. No phone, SSN or email stored. Records not yet enriched are labeled sample | SOURCES.md #12; D9; D22 |
| F13 | Fire hazard zones: coming; source unconfirmed; never guessed | SOURCES.md #6; D6 |
| F14 | Not scraped: court probate (terms bar bots), published legal notices (capublicnotice blocked; newspaper pages unconfirmed), obituaries (terms bar it). Inheritance signals come from recorder data or a licensed vendor | SOURCES.md #3, #4, #10; D1 |
| F15 | Recorder transfers by death, trust or inheritance add zero points and enable Quiet inheritance. Notice of default, trustee sale and lis pendens score 35 (180-day half-life) | D22; config/transfer_types.yaml; config/scoring.yaml |
| F16 | Weekly run in a fixed order; a failed source is recorded and the rest continues. Source publish cadence is shown separately. No turnaround promise | D20 |
| F17 | Permit text rules separate cosmetic or remodel scope from routine systems work (weight 0). Rules are deterministic. A blank description counts as maintenance | D14; D15; config/permit_signal_map.yaml |
| F18 | contribution = weight × 0.5^(age/half-life) × confidence; static signals do not decay; one component per signal key | ARCHITECTURE.md; config/scoring.yaml |
| F19 | +15% per extra family, cap +45%; score cap 100; owner modifiers cap 40; out-of-state and absentee do not add together | config/scoring.yaml; D17 |
| F20 | Display tiers Immediate 80+, Priority 65–79, Active Watchlist 45–64, Monitor under 45 | D19; dashboard/src/lib/ring.ts |
| F21 | Non-residential parcels are not scored; a sale in the last 24 months or an active suppression means no score | config/scoring.yaml |
| F22 | Nine recipes: verbatim labels, short descriptions, rationales, conditions | config/scoring.yaml; catalog.generated.json |
| F23 | Sensitive records never show on lists, cards or share pages; AI facts packets never contain them | D13(5); D18(2); D19(4); D21(4); D23(3) |
| F24 | Lead rows, quick dossier, keyboard triage, score breakdown, signal timeline with record IDs | D23; ARCHITECTURE.md Phase 7; components/ui |
| F25 | Printable seller consultation dossier with estimated value, equity and a net-proceeds range (5–7% selling costs); no owner name, mailing address, mortgage detail or sensitive record | D19(5) |
| F26 | Weekly briefing in the dashboard plus an internal digest to team members only, with no owner contact details | D20(3); ARCHITECTURE.md Phase 5K |
| F27 | AI is a text layer only (permit intent in shadow mode, lead and weekly briefs): validated, every claim cites a record, rejected output is never shown, provider chosen per client with a monthly budget. It never sets scores, counts or eligibility. Outreach drafts come from deterministic templates | D10; D13; CLAUDE.md |
| F28 | Letter, email and call-script drafts from recipe templates using only scored facts. **Preview mode only: nothing is sent, even when approved.** No source supplies homeowner phone or email | D10; ARCHITECTURE.md 5A; BACKLOG.md channel policy |
| F29 | A draft cannot be approved without agent name and DRE license; a database rule enforces blocks. Drafts using sample data are blocked | D11; ARCHITECTURE.md; pipelines/territory/outreach_render.py |
| F30 | Homeowner text never contains sensitive words, internal labels or scores (tested) | ARCHITECTURE.md 5A; pipelines/territory/homeowner_text.py |
| F31 | Share pages show neighborhood, lot size, zoning, estimated upzoning types and agent contact. Year built is in the payload but not yet loaded, so it is not claimed | ARCHITECTURE.md 5B; BACKLOG.md |
| F32 | Nothing is dialed automatically; calls are placed by the team. No text-message channel exists | docs/screenshots/7/today-1440.png; ARCHITECTURE.md (channels: mail, email, call_task) |
| F33 | Territory map with tier colors and equity, SB 9/SB 79 and STR-density lenses | D19(2); ARCHITECTURE.md |
| F34 | Opportunity matrix: estimated equity × stored score, bubble size estimated GCI (2.5%, labeled estimate), table view | D23(4); D19(3) |
| F35 | Backtest: recorded arm's-length sales in the trailing 24 months checked against public permit, STR, tax-default, code-enforcement and upzoning signals dated 14–365 days earlier; death, trust and inheritance transfers excluded; sample use is flagged. **No result is ever published** | D22(3); pipelines/territory/backtest.py |

Claims that come only from your brief, not from product files: built and run by Lilos Growth as a managed service, not self-serve; the MLS add-on (Q4); the Lilos Growth address and email; the guide author.

## 5. Competitor facts verified

Checked 2026-11-26. Only the rows below may appear. No prices, ratings, accuracy figures or testimonials will be published.

### PropStream (own site; footer reads 2026)
| Fact | Source |
|---|---|
| Describes itself as a nationwide real estate data provider | https://www.propstream.com/ |
| 165+ filters and prebuilt lead lists (home page says 20, features page says 21, so the site gives no list count) | https://www.propstream.com/ , https://www.propstream.com/features |
| Combines public records, MLS listings and private data | https://www.propstream.com/pricing |
| Built-in direct mail, email, click-to-dial and dialer campaigns | https://www.propstream.com/features |
| An AI assistant is included in plans | https://www.propstream.com/pricing |
| Self-serve free trial; custom pricing through sales | https://www.propstream.com/pricing |
| No seller score scale or territory exclusivity stated on the pages read | (row omitted) |

### Revaluate (own site; no page date shown)
| Fact | Source |
|---|---|
| Scores the contacts in a client's CRM or database for likelihood of moving | https://revaluate.com/ , https://revaluate.com/docs/faq |
| Contacts scored nightly; 1–99 scale, with 100 meaning an active listing | https://revaluate.com/docs/faq , https://revaluate.com/tips |
| An email address is the required input | https://revaluate.com/docs/faq |
| Alerts by text, email, dashboard or CRM API | https://revaluate.com/docs/faq |
| Plan depends on database size; a demo or pricing meeting is offered | https://revaluate.com/docs/faq |
| US contacts only | https://revaluate.com/docs/faq |
| The site gives two prediction windows (6 months; 6–12 months), so neither is quoted | (row omitted) |

### SmartZip (smartzip.com refused automated fetches, so named review source only)
| Fact | Source, page date |
|---|---|
| Uses predictive analytics to identify likely sellers in a farm area | HousingWire, https://www.housingwire.com/articles/smartzip-review/ , updated Feb 27, 2024 |
| The customer chooses a territory by neighborhood or ZIP code | same |
| Marketing options include email, online ads and direct mail | same |
| Annual contract required | same |
| HousingWire lists it as not exclusive | same, and https://www.housingwire.com/articles/top-real-estate-lead-generation-companies/ , updated June 29, 2026 |
| Prediction windows differ between articles, so none is quoted | (row omitted) |

The dedicated review is from 2024. The 2026 list page repeats the core description. HousingWire discloses that it may earn commissions.

### Offrs (offrs.com refused automated fetches): **not verified well enough**
The only source reached is The Close, https://theclose.com/offrs-review/ , updated April 2, 2025. The text came from the fetch tool's summary of a long page, not from verbatim page text. It reports that Offrs identifies likely sellers using data analysis, offers exclusive and non-exclusive territory access, has an inside-sales team make first contact and uses a 6-month commitment. See Q3.

## 6. Phase notes
- `check-catalog.mjs` compares collection entries with `product-catalog.json` (recipe keys, labels, short descriptions, signal types, component maximum points). Rationales, rules and half-lives are not in the catalog, so a sync script also vendors an allowlisted extract of `config/scoring.yaml` (global weights and recipes only). The check never needs the product repo at build or CI time.
- Extra checks within the brief's scope: answer paragraph word count, heading terms, guide word count, banned words, JS budget per page.
- Phase 6 needs `RESEND_API_KEY`, `RESEND_FROM` (on a domain verified in Resend) and `TURNSTILE_SECRET_KEY` as Worker secrets, and `PUBLIC_TURNSTILE_SITE_KEY` at build time. `PUBLIC_GA4_ID` is optional. `gh` is already signed in on this machine.
- SB 9 and SB 79 statements in the guide and signal page will be checked against official state and City pages in Phase 5 and cited.

## 7. Open questions

**Needed with "go"**

- **Q1 (STOP rule a: forbidden term in needed source).** `catalog.generated.json`, which the brief says to vendor, has a client-identifier field containing a forbidden term. It also has per-client recipe toggles. The screenshots show the client's name and logo, and several product docs name the client. *Recommend:* the sync script copies an allowlist of keys only (no client identifier, no toggles), and the catalog check compares those keys. Nothing else from the client-specific text is copied.
- **Q2 (map source).** `dashboard/src/data/planning-areas.geojson` holds only **three** planning areas: the client's territory. Drawing it would break the "never single out a client's neighborhoods" rule. *Recommend:* use the product's cached copy of the full official file (`data/raw/planning_areas/…/Community_Plan_SD.geojson`, 61 features, SOURCES.md #9; City open-data terms). Vendor simplified paths only, draw all areas the same way with no labels, and shade the non-plan "reserve" and military areas more faintly.
- **Q3 (STOP rule c: Offrs).** Choose one: (a) *recommended:* you open offrs.com in your browser and paste or approve the facts, which I cite as the company's own pages with an "as of" month; (b) publish a shorter Offrs page from The Close only, dated April 2025, after you check the article's wording yourself; (c) drop `/compare/offrs` until it can be verified. SmartZip passes through HousingWire, though it is thinner than the other two and its main source is from 2024. Say if that is not good enough.
- **Q4 (MLS add-on).** No product file mentions MLS as a feature, and the repo has no MLS adapter. *Recommend:* describe it only in your words ("optional add-on tier; requires the broker's back-office agreement"), with no features, fields or timing, and label it as scoped per client. Confirm you offer it today.

**Defaults apply unless you object**

- **Q5 (honest current limits).** The site will say: outreach is preview only and nothing is sent (F28); the code enforcement feed is historical (F11), so recipes that use open cases get little current signal from it; STR removals need a second snapshot; fire zones and Insurance squeeze are waiting on data; owner data is labeled sample until ATTOM enrichment. **Please also confirm** that your ATTOM licence allows ATTOM to be named publicly as a data source. SOURCES.md #12 covers a 30-day trial and leaves redistribution terms unconfirmed.
- **Q6 (headings).** Repeating the full keyword in every H2 to H4 would read as keyword stuffing and fight the question-style headings. *Default:* the heading-term rule in section 1.
- **Q7 (color).** The product's amber Sample badge and "Blocked" notice are honesty markers, but they fall outside "tiers plus one gold". *Default:* allow the product's amber inside product recreations only; make other status pills ("Draft ready") neutral. Form errors use ink, an icon and text, with no new color.
- **Q8 (recipes).** `financial_pressure` has no `rationale` in `scoring.yaml`, so its page uses the `description` verbatim. Tired landlord's rule also accepts a tax-default record, although its rationale text does not mention one. The page will show the full rule and the sensitive-record handling.
- **Q9 (sensitive recipes).** The brief names Quiet inheritance and Financial pressure as needing approval, and the pages will say so. The client configuration also gates Insurance squeeze, but that is per-client, so it is not claimed. Every draft needs human approval in any case.
- **Q10 (bands).** The catalog's score bands (Hot, Warm, Watch, Low) differ from the newer D19 display tiers. The site uses the D19 tiers.
- **Q11 (competitor prices).** All competitor prices are left out, even published ones, in keeping with "no prices".
- **Q12 (legal and analytics).** I will draft privacy and terms pages from what the site actually does. You or counsel should review them. GA4 without a consent banner, as the brief specifies, will be disclosed in the privacy page.
