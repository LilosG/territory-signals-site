---
{
  "crumb": "Permit data for listing agents",
  "keyword": "what building permit data tells a listing agent",
  "headingTerm": "permit data",
  "h1": "What building permit data tells a listing agent",
  "title": "What Permit Data Tells a Listing Agent | Before They Sell",
  "description": "What building permit data tells a listing agent: how to read approval types, scope text, expiry and parcel numbers, and where permit records mislead you.",
  "updated": "2026-11-26",
  "published": "2026-11-26",
  "order": 2,
  "summary": "How to read approvals, scope text, expiry dates and parcel numbers",
  "answer": "Building permit records tell a listing agent what work the City has approved on a property, when it was approved and whether the record was ever closed. Read carefully, they separate cosmetic updates from routine repairs and flag possibly unfinished projects. They cannot show that work was done, what it cost in the end or why.",
  "signals": [
    "building-permits",
    "sb9-sb79-upzoning",
    "ownership-tenure"
  ],
  "recipes": [
    "pre-list-prep",
    "stalled-project",
    "builder-bait"
  ],
  "markets": [
    "san-diego"
  ],
  "sources": [
    {
      "name": "City of San Diego, approvals for development projects (dataset and field definitions)",
      "url": "https://data.sandiego.gov/datasets/development-permits/",
      "accessed": "2026-11-26"
    },
    {
      "name": "City of San Diego, Information Bulletin 117: building permit extension and expiration (April 2026)",
      "url": "https://www.sandiego.gov/development-services/forms-publications/information-bulletin/117",
      "accessed": "2026-11-26"
    },
    {
      "name": "California Department of Housing and Community Development, SB 9 fact sheet (September 2024)",
      "url": "https://www.hcd.ca.gov/sites/default/files/docs/planning-and-community/sb-9-fact-sheet.pdf",
      "accessed": "2026-11-26"
    },
    {
      "name": "10 CCR § 2773, license number disclosure on first-contact materials (Cornell LII)",
      "url": "https://law.cornell.edu/regulations/california/10-CCR-2773",
      "accessed": "2026-11-26"
    }
  ]
}
---

## Where does San Diego permit data come from?

San Diego permit data comes from the City's open data portal, in a dataset of approvals for development projects that is listed as updated daily. The City describes it as approvals for permits, maps, agreements and other applications processed by the Development Services Department.

Two things about that description matter before you open a file. First, the unit is an **approval**, not a house and not a project. One project can carry many approvals: a building permit, trade permits, a map, an agreement. If you count rows, you are not counting homes with work going on. Second, much of what appears has nothing to do with a home sale. Traffic control for street work, utility programs, signs and agreements all share the same files with kitchen remodels.

The dataset is free to download under the City's open data terms. It is large, and the full history files are larger still. Plan to work with recent files for prospecting and keep your own dated copies, because comparing one pull with the next is how you notice change.

## Which permit data fields matter most?

The permit data fields that matter most are the approval type, the scope text, the status, the three key dates and the parcel number. The portal publishes a dictionary for the dataset. Field names can differ in capitalization and wording between that dictionary and the downloadable files, so check the headers of the file you actually have.

| What you want to know | Field to read | How the City describes it, in brief |
| --- | --- | --- |
| What kind of approval | Approval type | The type of approval, such as a building permit |
| What the work is | Approval scope | A description of the permit's scope of work |
| Where it stands | Approval status | Values include created, pending invoice payment, issued and completed |
| When it was granted | Issue date | The date the approval was issued |
| When it lapses | Expiry date | The date the approval will be or was expired |
| When it ended | Close date | Tied to expiry or to approval of the final inspection |
| What kind of project | Project type | Related to whether the review is ministerial or discretionary |
| Which parcel | Assessor's parcel number | The parcel number for the job |

Read the close date with care. By the City's description it relates both to a permit expiring and to a final inspection being approved. A close date is therefore not, on its own, proof that work was finished and signed off. Look at status and the underlying record together.

Downloaded files also carry fields that the portal dictionary may not define, such as valuation figures and counts of accessory dwelling units. Use undefined fields cautiously. A valuation on a permit application is not a construction invoice, and it is certainly not a change in market value.

Permit files can include a permit holder name. That may be a contractor, a business or a person. It rarely helps you serve a seller, and keeping it adds personal data you then have to protect.

## How do you classify permit data into useful groups?

You classify permit data by reading what the work is, using the scope text and not only the approval type. Types are administrative categories. An electrical, plumbing or mechanical permit can describe a like-for-like furnace replacement or the wiring for a gutted kitchen. A listing agent cares about the difference.

A practical grouping looks like this:

| Group | Typical scope | What it may mean to a listing agent |
| --- | --- | --- |
| Pre-sale prep | Kitchen, bath, paint, flooring, windows, doors, roof, landscaping, facade, interior improvements | Work that often goes in before a sale, and also before staying put |
| Remodel or addition | Building permits for remodels, additions or new construction | The owner is investing in the property |
| ADU | Accessory dwelling units, garage conversions to units | A change in how the property earns or houses people |
| Demolition or lot split | Demolition, parcel maps, map waivers, lot line adjustments | A redevelopment plan may be forming |
| Solar and energy | Panels and batteries | Investment in the home, weak as a selling signal |
| Maintenance | Furnace, water heater, air conditioning, panel, repipe, sewer line | Normal upkeep |
| Not relevant | Traffic control, street work, signs, commercial tenant work | No bearing on a home sale |

**Reading the text.**

Read the approval scope first. If it is blank, a job description or the project's title and scope may still say what is happening. Then apply rules in a fixed order, because the same permit can mention several things.

- Rule out commercial and new-building work first, so a restaurant improvement does not count as a home remodel.
- Pull out solar and battery installs, which are often filed under trade permit types.
- Check for accessory dwelling language before cosmetic words. Plumbing for a new unit is unit work, not a bathroom refresh.
- Look for clear cosmetic or remodel words.
- Treat weak words with suspicion. "Bathroom" next to "repipe" or "water heater" is usually systems work.
- When the text is empty, do not guess. Count it as maintenance.

Before They Sell follows this approach with written rules, not a model's judgment. Maintenance carries zero weight in its score. The cost of that choice is real: preparation work filed with no description is under-counted. The alternative, treating every blank trade permit as a sign of an upcoming sale, fills the top of a list with water heaters.

**One address, several approvals.**

Group approvals before you count them. Several permits of the same kind approved on the same day usually describe one job. A parcel with ten re-roof entries is still one re-roof. Score the most recent, strongest instance in each group and ignore the repetition.

## How should you match permit data to a property?

You should match permit data to a property by assessor's parcel number first, and record when you had to use anything else. Parcel numbers survive spelling differences, unit formats and street renames that break address matching.

Not every row will have one. When the parcel number is missing, coordinates can place the approval inside a parcel boundary, and an address match is the fallback. Each method is less certain than the one before. Keep a note of which you used, and give weaker matches less influence.

Watch for these cases:

- **Condominiums and stacked units.** Several parcel numbers can share one footprint, so a point on a map cannot tell you which unit had the work.
- **Corner lots and flag lots.** A street address may sit closer to a neighbor's centroid than its own.
- **New parcel numbers after a split.** Old approvals stay on the old number.
- **ZIP codes.** The permit files do not give a dependable ZIP for every row. Assign geography from the parcel, and define your area with official planning boundaries.

If a record cannot be placed with reasonable confidence, leave it out and count how many you left out. An honest gap is better than an outreach letter about the wrong house.

## What can expired permit data tell you?

Expired permit data can point to a project that may be unfinished, provided the permit is a kind where finishing matters. Many short-lived permit types lapse as a matter of routine and are never formally closed. Traffic control, right-of-way work and some simple trade permits are examples. Counting those as stalled projects produces noise.

The City's Information Bulletin 117, dated April 2026, sets out building permit expiration. In summary:

| Rule | What the bulletin says |
| --- | --- |
| Getting started | A building permit becomes void if not utilized within one year of issuance |
| Stopping work | It can become void if work is suspended or abandoned for 180 calendar days |
| Detached one- and two-family homes, townhouses and their accessory structures | Permits expire three years after issuance |
| Other projects | Permits expire four years after issuance |
| Extensions | The utilization period can be extended by up to 180 days for circumstances beyond the holder's control, with a further extension possible under stated conditions |

Read the bulletin itself before you rely on any of these for a specific property, since it includes conditions and exceptions this summary leaves out.

For prospecting, a narrower definition works better than "anything past its expiry date". Before They Sell counts a stalled project only when a remodel, ADU or demolition and lot-split approval expired more than 90 days ago, no more than 36 months ago, with no close date. The 90 days allows for paperwork to catch up. The 36-month limit keeps very old records from posing as news.

Even then, the flag is a question. The work may be complete and never closed out. A newer permit may have replaced the old one. An extension may exist. Look at the full record, and look at the house.

## How should a listing agent use permit data?

A listing agent should use permit data to choose where to prepare, then offer help that is useful whether or not the owner plans to move. The record is for your research. It does not belong in the first thing a homeowner reads from you.

Here is how the groups translate into work.

**A recent cosmetic or remodel permit on a long-held home.** Tenure matters, because the same permit on a home bought last year usually means new owners settling in. Where the owner has held the property ten years or more, a short, honest guide to which updates tend to pay off before selling is a fair offer. It helps someone who is staying too.

**A demolition or lot-split approval.** Someone is planning to change what stands there. The owner may already have a builder. Check what has been approved and whether state rules such as SB 9 are relevant. The Department of Housing and Community Development explains that SB 9 applies in single-family zones and carries a list of eligibility conditions, so do not describe a lot as eligible from a permit record.

**A new accessory dwelling unit.** The property is becoming two homes in practice. That changes the buyer pool and the way a value conversation should go. It is not, by itself, a sign of an upcoming sale.

**A possibly stalled project.** A comparison of what the home might sell for as it stands and when finished helps an owner decide, whatever they decide.

**Maintenance.** Leave it alone.

For listing appointments, permit history is also a preparation tool. Before you meet an owner who contacted you, review what has been approved at the address. You may find an addition to ask about, an open permit that a buyer's agent will raise, or work with no matching record that deserves a careful question about disclosure.

When you do write, California's first-point-of-contact rule, 10 CCR § 2773, requires the license identification number and the responsible broker's name on solicitation materials. Check your office's requirements before sending.

**A weekly routine that takes about one sitting.**

1. Download the current files and keep the previous copy.
2. Filter to your planning areas by parcel, not by ZIP.
3. Drop approval types that cannot matter to a home sale.
4. Classify the rest from their scope text.
5. Collapse same-day, same-kind approvals.
6. Add ownership context, especially years held.
7. Open the source record for anything you plan to act on.
8. Note what you did, so next week starts where this one ended.

## Where does permit data mislead?

Permit data misleads when you read an approval as a fact about the world instead of a fact about a record. Keep these limits in view.

- **Approved is not built.** A permit allows work. It does not show that work began or ended.
- **Unpermitted work is invisible.** A fully updated kitchen may have no record at all.
- **Dates mark paperwork.** An issue date can sit well before the work, and a close date can reflect expiry.
- **Descriptions vary.** Some are detailed. Others are a few words or nothing.
- **Valuation is not value.** Do not use it to estimate what a home is worth or what the owner spent.
- **Missing parcel numbers create blind spots.** Some approvals cannot be placed.
- **Project type is often blank on older-system records.** Do not filter on it alone, or you will drop rows you wanted.
- **History depth depends on which files you load.** Without older files, a house can look untouched when it was not.

None of this makes the records less useful. It makes them useful in the right way. Permits are one of the few dated, parcel-level signs of what is changing on a street before anything appears for sale. Combined with who has owned the home and for how long, they help you decide which address deserves an hour of your attention this week.

If you want to see how approvals turn into scored signals, the [building permit signal page](/signals/building-permits) lists the weight and fading period for each group, and [how scoring works](/how-it-works) lets you change the inputs on a sample parcel.
