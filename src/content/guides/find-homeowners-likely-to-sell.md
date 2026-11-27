---
{
  "crumb": "Finding likely sellers",
  "keyword": "how to find homeowners likely to sell",
  "headingTerm": "likely to sell",
  "h1": "How to find homeowners likely to sell before they list",
  "title": "How to Find Homeowners Likely to Sell | Before They Sell",
  "description": "Learn how to find homeowners likely to sell before they list: which public and owner records to watch, how to combine them and how to reach out with care.",
  "updated": "2026-11-26",
  "published": "2026-11-26",
  "order": 1,
  "summary": "Which records to watch, how to combine them and how to reach out with care",
  "answer": "To work out which homeowners are likely to sell, watch for dated records that change what holding a home costs or means, add what you know about ownership, and require more than one independent reason before you act. Then verify each record and approach with a useful offer, never with what you found.",
  "signals": [
    "building-permits",
    "short-term-rental-licenses",
    "ownership-tenure",
    "tax-default",
    "recorder-documents"
  ],
  "recipes": [
    "pre-list-prep",
    "downsizer",
    "tired-landlord"
  ],
  "markets": [
    "san-diego"
  ],
  "sources": [
    {
      "name": "City of San Diego, development permit approvals dataset",
      "url": "https://data.sandiego.gov/datasets/development-permits/",
      "accessed": "2026-11-26"
    },
    {
      "name": "City of San Diego, short-term residential occupancy licenses dataset",
      "url": "https://data.sandiego.gov/datasets/stro-licenses/",
      "accessed": "2026-11-26"
    },
    {
      "name": "San Diego County Treasurer-Tax Collector, legal ads",
      "url": "https://www.sdttc.com/content/ttc/en/tax-collection/property-tax-sales/legal-ads.html",
      "accessed": "2026-11-26"
    },
    {
      "name": "California State Board of Equalization, Proposition 19",
      "url": "https://www.boe.ca.gov/prop19/",
      "accessed": "2026-11-26"
    },
    {
      "name": "10 CCR § 2773, license number disclosure on first-contact materials (Cornell LII)",
      "url": "https://law.cornell.edu/regulations/california/10-CCR-2773",
      "accessed": "2026-11-26"
    },
    {
      "name": "Federal Trade Commission, Do Not Call questions and answers for sellers",
      "url": "https://www.ftc.gov/business-guidance/resources/qa-telemarketers-sellers-about-dnc-provisions-tsr",
      "accessed": "2026-11-26"
    }
  ]
}
---

## What does likely to sell actually mean?

Likely to sell means that the evidence on a property gives you a better reason to look at it than at the house next door. It does not mean you know what the owner will do. No public record states an intention to sell, and a careful agent never treats one as if it did.

That distinction shapes everything that follows. You are not trying to predict a person. You are trying to decide where a limited number of research hours should go this week. A good method gives you a short list, tells you why each address is on it and lets you cross an address off as soon as a fact fails to hold up.

Two kinds of information help. The first is **events**: something happened, on a date, to a property. A permit was approved. A rental license stopped appearing. A parcel showed up on a tax notice. The second is **circumstances**: facts that were already true, such as how long the current owner has held the home or whether the owner lives there. Events create timing. Circumstances create context. Either one alone is weak.

## Which records show who may be likely to sell?

The records that best suggest who may be likely to sell are the dated ones tied to a single parcel, supported by ownership facts. In the City of San Diego, several are published openly, though each has gaps you need to know before you rely on it.

| Record | Where it comes from | What it can suggest | Main trap |
| --- | --- | --- | --- |
| Building permit approval | City of San Diego open data | Money going into a home, or a redevelopment plan | Routine repairs look like preparation |
| Expired, unclosed permit | Same permit files | A project that may be unfinished | The work may be done and the record not closed |
| Short-term rental license change | City STRO license file | Rental use may have ended | The file does not say why |
| Tax-default notice | County Treasurer-Tax Collector | A deadline on the property | Taxes may since have been paid |
| Recorder document | Recorder history, often through a data vendor | A transfer or a distress filing | A trust transfer can be routine planning |
| Owner and mortgage data | A property data vendor | Tenure, occupancy, loan status | Records lag and values are estimates |

**Permits.**

The City's development permit dataset is listed as updated daily. It covers approvals for permits, maps, agreements and other applications handled by Development Services. For prospecting, the approval type alone is not enough. A single type can cover a water heater swap and a kitchen remodel. You need to read the scope text to tell them apart, and some rows say very little.

Cosmetic and remodel work, such as kitchens, baths, windows, roofing, paint or landscaping, is the kind of work that often goes in before a sale. It is also what people do when they intend to stay for another decade. Treat it as a reason to look, and let other facts decide the priority.

**Rental licenses.**

San Diego publishes the active licenses for short-term residential occupancy. Because the file shows what is active, a change shows up only when you compare one copy with the next and notice that a license is gone. That means you have to keep your own history. A license may leave the file because it expired, because the owner moved in, because the property sold or for another reason entirely.

**Tax and recorder records.**

The County Treasurer-Tax Collector publishes legal notices, including default lists and the notice of impending power to sell tax-defaulted property. These are serious records about a person's situation. They are public, but public does not mean fair to quote back to someone. The same applies to notices of default and to transfers that follow a death.

Some sources that agents hear about should be left alone. Court terms can bar automated collection from case search tools, and many newspaper and obituary sites bar scraping and database use. Read the terms before you collect anything. Before They Sell does not scrape probate records, legal notice sites or obituaries.

**Ownership facts.**

Years owned, whether the owner lives at the property, whether a mortgage is open and a modeled equity figure usually come from a data vendor, because county parcel files often carry no owner names. Be careful with dates. A parcel file's last recorded document date is not necessarily a purchase date. If you treat it as one, you will tell yourself that a family bought recently when all they did was record a routine document.

## How do you combine records to find owners likely to sell?

You find owners likely to sell more reliably by requiring independent reasons to agree than by collecting many records of one kind. Five re-roof permits on one house are still one fact. A recent remodel permit, a long holding period and no open mortgage are three different facts that happen to point the same way.

A workable method has four parts.

1. **Give each kind of record a weight.** Decide in advance which events deserve more attention. Write the weights down so you are not adjusting them to justify an address you already like.
2. **Let old events fade.** A rental license that disappeared last month matters more than one that disappeared two years ago. A half-life works well: after a set number of days, the event counts for half as much.
3. **Discount weak matches.** A record joined to a parcel by parcel number is more reliable than one joined by a typed address. Record how each match was made.
4. **Reward independence.** Add a modest bonus when separate families of evidence agree, such as permits plus ownership facts plus a rental change. Cap it, so that volume cannot overwhelm judgment.

This is how Before They Sell scores parcels. Each signal's contribution is its weight multiplied by a decay factor and by match confidence. Each independent family beyond the first adds 15 percent, to a maximum of 45 percent, and the score cannot pass 100. Owner facts together are capped, so a long tenure on its own does not outrank fresh activity. [How the scoring works](/how-it-works) shows the arithmetic with a sample parcel you can change.

**A worked comparison.**

Consider two invented homes. The first has had three electrical permits for panel and wiring work, and nothing else is notable. The second had one kitchen remodel permit two months ago, and its owner has lived there for more than twenty years with no open mortgage.

A simple count ranks the first house higher, because it has more records. A method that reads permit text and rewards independent evidence reverses the order. The panel work is maintenance and counts for nothing. The second home has a relevant event and two supporting circumstances. That is the list you want to work.

Named patterns help here too. A rule such as **Pre-list prep** (a pre-sale type permit in the last six months on a home held ten or more years) or **Downsizer** (an owner-occupant of twenty or more years with no open mortgage) tells you what to offer, not just whom to look at. See the [recipe rules](/recipes).

## How should you check that someone is really likely to sell?

You check whether someone is plausibly likely to sell by verifying each record at its source and then looking at the property with local knowledge. Treat your list as a set of questions.

Before an address earns outreach, work through this:

- **Open the source record.** Confirm the parcel number, the date and the description. A match made on an address can land on the wrong unit.
- **Read the scope, not the label.** Make sure a permit is the kind of work you think it is.
- **Check for a recent sale.** A home that just changed hands is rarely your next listing. Before They Sell does not score a parcel with a recorded sale in the last 24 months, though transfers by death, trust or inheritance are handled separately.
- **Check whether it is already listed.** Respect existing agency relationships and your local rules.
- **Separate estimates from records.** Equity, value and upzoning potential are estimates. Label them that way in your own notes.
- **Ask what would change your mind.** If one fact turned out to be wrong, would the address still be on the list?

Keep a record of why you chose each address. When you review the quarter, you will be able to see which patterns produced real conversations in your own area. That history is worth more than any general claim about which signals work.

## How do you reach someone likely to sell without overstepping?

You reach someone likely to sell by offering something useful that stands on its own, without telling them what you saw. A homeowner does not need to hear that you noticed their permit, their tax notice or a death in the family. Saying so is unwelcome at best and harmful at worst.

Match the offer to the pattern:

| Pattern | A useful offer | What to leave out |
| --- | --- | --- |
| Recent remodel on a long-held home | Which updates tend to pay off before selling | The permit |
| Long-held home, no mortgage | A value summary, and a note that Proposition 19 may be worth asking a tax advisor about | Any guess about age |
| Rental use may have ended | A comparison of selling, renting long term or holding | The license |
| Possibly unfinished project | Likely value as it stands and when finished | The expired permit |
| Recent ownership transfer | A neutral, no-pressure value summary | Death, inheritance or estate wording |

On Proposition 19, the State Board of Equalization explains that homeowners who are over 55, physically and permanently disabled or victims of certain disasters may be able to move a property tax base value to a replacement home, subject to conditions and timing. It is a reason a long-time owner might have questions, and a reason to send them to a tax advisor. It is not a reason to guess how old anyone is. Fair housing law applies to how you choose and address your audience.

**Rules for the first contact.**

California regulation 10 CCR § 2773 requires a licensee's eight-digit license identification number and the responsible broker's name on first-point-of-contact solicitation materials, which include flyers, mailers, business cards and electronic ads. The type for the license number can be no smaller than the smallest type used in written material. Confirm the current text and your broker's own requirements before you send anything.

If you call, the National Do Not Call Registry and related telemarketing rules apply to many sales calls, and state rules may add to them. The Federal Trade Commission publishes guidance for sellers. Email and text messages have their own consent and opt-out rules. Public records rarely give you permission to contact someone by phone, and many give you no phone number at all. A printed letter is often the most straightforward first step.

Have a person approve every piece before it goes out. Templates drift, data errors slip in and a sentence that reads fine for one household can be painful for another.

**Handling sensitive records.**

Decide your office policy before you ever see a distress record. A sensible default is that tax defaults, default notices, open code cases and ownership transfers are visible only to people who need them, never appear on printed lists and require a second approval before any outreach. In Before They Sell these records stay off lead cards, lists and share pages, and the recipes built on distress or inheritance need team approval. [Compliance](/compliance) explains the controls.

## What should you do this week to find owners likely to sell?

Start finding owners likely to sell by choosing a territory small enough to know well, then building one habit around it. A few neighborhoods you can walk are better than a county you cannot check.

1. **Define the area.** Use official boundaries, such as City planning areas, so your counts mean the same thing from month to month. ZIP codes often cross them.
2. **Pick two or three records to watch.** Permits and ownership facts are a good start. Add others once you have a routine.
3. **Keep dated copies.** Changes only appear when you can compare this week with last week.
4. **Match on parcel number first.** Note how every other match was made.
5. **Write your rules down.** Weights, fading periods, what counts as independent and what disqualifies an address.
6. **Verify five addresses, not fifty.** Prepare each one properly.
7. **Log outcomes.** Contacted, conversation, appointment, listing, not interested and bad data are enough to learn from.

Review the log monthly. If a pattern keeps producing bad data, fix the matching or drop the source. If a pattern produces conversations, give it more of your time. Adjust your rules on purpose and keep a note of when you changed them.

## What are the limits of any likely to sell method?

Every likely to sell method is limited by what records capture, how late they arrive and how little they say about people. Owners sell for reasons that leave no public trace: a new job, a growing family, a decision made at the kitchen table. Plenty of properties with several strong signals will not come to market for years, or at all.

Data quality sets a hard ceiling. Permit rows can lack a parcel number. A license file may have no parcel number at all. Owner records can trail a sale by weeks. Estimated values can be far from what a home would fetch. Any figure you see for how accurately a product predicts sales deserves questions: measured on what area, over what period, against which baseline, and counting which properties as misses.

You can test your own method honestly. Take sales that already happened and ask how many of those parcels carried a signal beforehand, using only records dated before each sale. Then ask the harder question: of all the parcels you flagged, how many did not sell? The first number without the second flatters any system.

Used this way, records do not replace local relationships. They tell you where to spend attention, give you a specific and useful reason to be there, and keep you honest about why you chose each door.
