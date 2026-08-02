/** Editorial content shared across pages. */

/** Verifiable facts only: product terms, not performance claims. */
export const STATS = [
  { value: 49, prefix: "A$", label: "Flat fee, no subscription" },
  { value: 48, suffix: "hr", label: "Typical turnaround" },
  { value: 20, suffix: "+", label: "Public data sources per report" },
  { value: 100, suffix: "%", label: "Money-back first-order guarantee" },
];

export const DATA_SOURCES = [
  "VicPlan",
  "LANDATA",
  "CoreLogic",
  "Council Records",
  "REIV",
];

export const METHOD_SOURCES = [
  "Victorian Planning Portal (DELWP)",
  "Landata title search",
  "Council planning scheme & overlays",
  "DEECA flood & bushfire mapping",
  "CoreLogic comparable sales",
  "SQM vacancy & rental data",
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Submit your brief",
    body: "Give us the property address and your main concern. Two short steps, five minutes start to finish.",
    time: "5 min",
  },
  {
    num: "02",
    title: "Secure payment",
    body: "Pay by card through Stripe's secure checkout. No subscription, no account required.",
    time: "Instant",
  },
  {
    num: "03",
    title: "We research",
    body: "Our pipeline pulls planning data, title records, comparable sales and market data from primary sources. An analyst reviews every finding and writes the conclusions.",
    time: "~48 hrs",
  },
  {
    num: "04",
    title: "Report delivered",
    body: "A structured PDF arrives in your inbox within the stated turnaround, with a clear conclusion on the first page.",
    time: "To your inbox",
  },
];

/**
 * Real Google Business Profile reviews, quoted verbatim (surnames shortened).
 * Source: the Precursor Property Google profile linked in BUSINESS.googleProfile.
 */
export const TESTIMONIALS = [
  {
    quote:
      "We were unsure if we were paying a reasonable price for a property in Montmorency; this report gave us peace of mind for putting an offer forward and provided insight into an owner's corporation to ask the vendor about. Although not currently wanting the property as an investment; this report showed detailed information about rental and capital growth. Was interesting to see the neighbourhood demographics too.",
    name: "Kristen P.",
    context: "Home buyer · Montmorency, VIC · Google review",
    initials: "KP",
    featured: true,
  },
  {
    quote:
      "Genuinely surprised by how much detail you get. Ran a few properties through it before we bought and the crime rate breakdowns and recent sales data saved us from making a decision we would have regretted. The fact you can email in after you get the report to clarify anything is a nice touch too. Solid tool, will be using it again next time we're in the market.",
    name: "Andy Z.",
    context: "Property buyer · Google review",
    initials: "AZ",
  },
  {
    quote:
      "Really impressed with the depth of data available for investment property research. The property reports break down rental yields, capital growth trends and recent sales data which made comparing potential investment properties across Melbourne so much easier. Having that level of financial analysis in one place saved me hours and gave me a lot more confidence going into negotiations.",
    name: "Lynn L.",
    context: "Property investor · Melbourne · Google review",
    initials: "LL",
  },
];

export const FAQS = [
  {
    q: "How is this different from a building inspection or conveyancer's check?",
    a: "A building inspector assesses the physical condition of the property: structure, pests, defects. A conveyancer reviews the legal contract and handles title transfer. Our reports cover what neither of them does, which is the data underlying the property as an investment: zoning constraints, comparable sales, capital growth signals, development potential, planning overlays. Most clients order our report before they pay for a building inspection or engage a conveyancer.",
  },
  {
    q: "Do you give recommendations, or just present data?",
    a: "Both. Every report includes a clear analytical conclusion, written in plain English: whether the property looks strong, has hidden risks, or doesn't stack up. We draw a careful line, though. We provide independent research and analysis, not personal investment advice. The final decision is always yours.",
  },
  {
    q: "What if I'm not happy with my report?",
    a: "If our report doesn't address what you asked, email us and we'll revise it free of charge. If you're still not satisfied with your first order, we'll refund it in full. No forms, no friction. We can offer this because we put the time in upfront and rarely need to use it.",
  },
  {
    q: "How can a full report cost A$49?",
    a: "Because we automated the expensive part. Our research pipeline gathers the public record (planning schemes, overlays, titles data, sales evidence, market statistics) automatically, and a human analyst then checks every finding and writes the conclusions. You pay for the checking and the judgement, not for someone's day of manual digging. No subscription, no upsell.",
  },
  {
    q: "How fast can you turn around a report?",
    a: "Typical turnaround is about 48 hours. If you have an auction this weekend or another tight deadline, email us the address first and we'll tell you honestly whether we can fit it in.",
  },
  {
    q: "Where do you get your data?",
    a: "Official sources only: the Victorian planning portal (Vicmap), Landata title and easement records, licensed comparable sales platforms, and direct council records for property-specific overlays and approval history. We don't rely on real estate portals or agent claims for analytical conclusions. Those are useful for sentiment, not data.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Everything you share is treated as confidential: the property address, your reasons for considering it, and your contact details. We don't share information with vendors, agents, or third parties.",
  },
  {
    q: "Does every report look the same?",
    a: "No, and that's deliberate. The core spine is consistent (a clear verdict up front, red flags, title and planning, sales evidence, a conclusion you can act on), but the depth and sections adapt to the property and to your brief. A development site gets feasibility and permit-pathway analysis a family home doesn't need. A tenanted investment gets deeper rental and cash-flow work. If you tell us your main concern when you order, the report leans into it.",
  },
  {
    q: "Do you inspect the property in person?",
    a: "No. Precursor reports are desktop research, and that's deliberate. It keeps reports fast and affordable, and everything we analyse (title, zoning, overlays, sales evidence, council records) is documentary. For physical condition we'll always recommend a licensed building inspector, and our reports flag when that matters most.",
  },
  {
    q: "What about development feasibility reports?",
    a: "Development Intelligence is currently scoped by enquiry rather than a fixed menu, because development sites vary so much. Tell us about the site through the enquiry form and we'll reply within one business day with what we can research and a fixed quote. Enquiring is free and there's no obligation.",
  },
];

export const COMPARISON = {
  alternatives: [
    {
      label: "Buyers agents",
      fact: "1-3% of purchase price",
      body: "Roughly $8,000 to $25,000 on a Melbourne property. They manage your entire search, but they earn their fee only when you buy. Due diligence is bundled in, not the focus.",
    },
    {
      label: "DIY data platforms",
      fact: "$79-$495 per month",
      body: "Powerful tools built for experienced developers and agents. They return raw data: zoning layers, feasibility inputs, comparable sales. You interpret. You conclude. Expertise required.",
    },
  ],
  precursor: [
    "Automated gathering across the public record, then a human analyst checks every finding and writes your conclusions",
    "No conflict of interest. We don't earn a commission if you buy",
    "No monthly subscription. One flat fee, only when you need a report",
    "About 48 hour turnaround, ready before auction day",
    "Purchase due diligence today; development feasibility by enquiry",
  ],
};
