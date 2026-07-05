/** Editorial content shared across pages. */

export const STATS = [
  { value: 300, suffix: "+", label: "Reports delivered" },
  { value: 48, suffix: "hr", label: "Average delivery" },
  { value: 25, prefix: "$", suffix: "k", label: "Avg saving identified" },
  { value: 5, suffix: " yrs", label: "Victorian market experience" },
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
    body: "Choose your report, give us the property address and your main concern. Five minutes, start to finish.",
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
    body: "Your analyst pulls planning data, title records, comparable sales, and council files from primary sources, by hand.",
    time: "24-72 hrs",
  },
  {
    num: "04",
    title: "Report delivered",
    body: "A structured PDF arrives in your inbox within the stated turnaround, with a clear conclusion on the first page.",
    time: "To your inbox",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I was ready to put down an offer on a place in Preston until the Precursor report flagged a restrictive covenant I'd completely missed, one that would have made a future granny flat impossible. Saved me from buying the wrong property. Cost less than dinner for two, and the difference was massive.",
    name: "Marcus T.",
    context: "Investment buyer · Preston, VIC",
    initials: "MT",
    featured: true,
  },
  {
    quote:
      "I'd been working on a feasibility for a Ballarat duplex for weeks. The Precursor report flagged an overlay risk I'd missed and gave me clean pre-sale comparables, the kind of work I'd normally pay a town planner thousands for. It changed how I structured the whole deal.",
    name: "Holly W.",
    context: "Small developer · Ballarat, VIC",
    initials: "HW",
  },
  {
    quote:
      "The comparable sales section was sharper than what my buyer's agent had run. I went into negotiation with hard numbers instead of vibes and got around $25k off the asking price. The report paid for itself many times over on a single deal.",
    name: "Daniel L.",
    context: "Investor · Coburg, VIC",
    initials: "DL",
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
    q: "How fast can you turn around a report?",
    a: "Standard turnaround is 24 to 72 hours depending on the report you order. If you have an auction this weekend or another tight deadline, email us the address first and we'll tell you honestly whether we can fit it in.",
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
    q: "Can I upgrade a report after ordering?",
    a: "Yes. If you order a Quick Screen or Site Check and decide to go deeper, email us within 30 days and we'll credit the full amount you paid against the larger report on the same property.",
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
    "A human analyst researches and writes your conclusions. No expertise required on your end",
    "No conflict of interest. We don't earn a commission if you buy",
    "No monthly subscription. Pay only when you need a report",
    "24 to 72 hour turnaround, ready before auction day",
    "Purchase due diligence and development feasibility in one service",
  ],
};
