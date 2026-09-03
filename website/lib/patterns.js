/**
 * Single source of truth for the dark-pattern taxonomy.
 * The types page, the examples page and the report form all read from here so
 * the categories can never drift apart.
 */

export const PATTERN_CATEGORIES = [
  {
    id: "manipulation",
    name: "Manipulation",
    tone: "danger",
    summary:
      "Pressure applied to the decision itself — urgency, guilt, and social proof that push a choice before it is thought through.",
    patterns: [
      {
        slug: "confirmshaming",
        name: "Confirmshaming",
        tagline: "Using guilt or shame to steer a choice",
        examples: [
          "“No thanks, I don't want to save money”",
          "“I prefer to pay full price”",
        ],
        detail:
          "The decline option is written to make you feel foolish for choosing it. The wording does no informational work — it exists only to add an emotional cost to saying no.",
        spot: "The two options are worded from different points of view: one neutral, one self-deprecating.",
      },
      {
        slug: "scarcity",
        name: "False Scarcity",
        tagline: "Inventing shortage where none exists",
        examples: ["“Only 2 rooms left at this price!”", "“5 other people are looking at this right now”"],
        detail:
          "Artificial scarcity compresses the time you spend evaluating an offer. The counts are often generated rather than measured, and reset per visitor.",
        spot: "Open the page in a private window. If the number is identical, or resets, it is decoration.",
      },
      {
        slug: "urgency",
        name: "Fake Urgency",
        tagline: "Deadlines that never actually arrive",
        examples: ["“Offer expires in 10:00 minutes!”", "“Flash sale ends today!”"],
        detail:
          "A countdown implies the price changes when it hits zero. In most implementations the timer simply restarts, or the offer continues unchanged.",
        spot: "Let the timer run out. A real deadline changes the price; a fake one loops.",
      },
      {
        slug: "social-proof",
        name: "Manufactured Social Proof",
        tagline: "Borrowing credibility that was never earned",
        examples: ["“Join 10,000+ satisfied customers”", "“Sarah from New York just purchased this item”"],
        detail:
          "Activity notifications and customer counts are frequently synthetic — randomised names, cities and timings drawn from a list rather than from real orders.",
        spot: "Watch the notifications for a minute. Repeats, round numbers and impossible timing give it away.",
      },
    ],
  },
  {
    id: "obstruction",
    name: "Obstruction",
    tone: "warn",
    summary:
      "Friction added in one direction only. Signing up takes a click; leaving takes a phone call.",
    patterns: [
      {
        slug: "roach-motel",
        name: "Roach Motel",
        tagline: "Easy to get in, hard to get out",
        examples: [
          "One-click signup, but cancellation requires calling support",
          "A subscription that can only be cancelled by post or phone",
        ],
        detail:
          "The asymmetry is the pattern. Any step that was unnecessary on the way in but mandatory on the way out is deliberate friction.",
        spot: "Before signing up, find the cancellation page. If you cannot, that is the answer.",
      },
      {
        slug: "difficult-cancellation",
        name: "Difficult Cancellation",
        tagline: "A maze between you and the exit",
        examples: ["Hidden cancellation links", "Multiple confirmation screens with retention offers"],
        detail:
          "Each additional screen loses a share of the people trying to leave. The funnel is measured and tuned in exactly the same way as the signup funnel.",
        spot: "Count the clicks to cancel versus the clicks to subscribe.",
      },
    ],
  },
  {
    id: "sneaking",
    name: "Sneaking",
    tone: "info",
    summary:
      "Information you would have acted on, withheld until acting on it has become expensive.",
    patterns: [
      {
        slug: "hidden-costs",
        name: "Hidden Costs",
        tagline: "Fees that surface at the last step",
        examples: ["Unexpected “service fees” at checkout", "Shipping revealed only on the final screen"],
        detail:
          "Costs are disclosed after you have invested time in the flow, exploiting the sunk-cost effect to make abandoning feel wasteful.",
        spot: "Compare the advertised price with the final total before you enter payment details.",
      },
      {
        slug: "forced-continuity",
        name: "Forced Continuity",
        tagline: "A free trial that quietly becomes a bill",
        examples: ["A trial that converts to paid without a reminder", "A card required for a “free” service"],
        detail:
          "The charge is technically disclosed, but placed where it will not be read, and no reminder is sent before the conversion date.",
        spot: "If a card is required for something free, set a calendar reminder the same minute you sign up.",
      },
      {
        slug: "bait-and-switch",
        name: "Bait and Switch",
        tagline: "Advertising one thing, delivering another",
        examples: ["A headline price that only covers a stripped-down version", "A feature demo that needs an upgrade"],
        detail:
          "The advertised outcome and the delivered outcome differ in a way that is only discoverable after you commit.",
        spot: "Check what the headline price excludes before comparing it to anything.",
      },
    ],
  },
  {
    id: "interface",
    name: "Interface Interference",
    tone: "safe",
    summary:
      "The interface itself does the persuading — through emphasis, defaults, and deliberately confusing wording.",
    patterns: [
      {
        slug: "trick-questions",
        name: "Trick Questions",
        tagline: "Wording designed to be misread",
        examples: ["“Uncheck this box if you don't want to not receive our newsletter”"],
        detail:
          "Double negatives and inverted phrasing raise the reading effort past the point most people will spend, so the default answer wins.",
        spot: "If you have to read an option twice, read it a third time before answering.",
      },
      {
        slug: "misdirection",
        name: "Misdirection",
        tagline: "Attention steered away from the real choice",
        examples: ["A vivid “Continue” button beside a nearly invisible “Skip”"],
        detail:
          "Both options exist, so the design is defensible — but only one is visually reachable at a glance.",
        spot: "Look for the option that is present but unstyled. That is usually the one you wanted.",
      },
      {
        slug: "visual-interference",
        name: "Visual Interference",
        tagline: "Contrast used as an argument",
        examples: ["A “Decline” button blended into the background", "Ads coloured to match editorial content"],
        detail:
          "Colour, weight and size carry an implicit recommendation. When the recommendation contradicts your interest, it is interference.",
        spot: "Ask which button you would press without reading either. Then read both.",
      },
      {
        slug: "preselection",
        name: "Preselection",
        tagline: "Defaults that quietly favour the business",
        examples: ["Pre-ticked boxes for add-ons", "Opt-out rather than opt-in data sharing"],
        detail:
          "Most people never change a default. Setting it in the business's favour converts inattention into consent.",
        spot: "Before submitting any form, scan every checkbox and toggle you did not personally set.",
      },
    ],
  },
]

/** Flat list of every pattern, each carrying its parent category. */
export const ALL_PATTERNS = PATTERN_CATEGORIES.flatMap((category) =>
  category.patterns.map((pattern) => ({
    ...pattern,
    categoryId: category.id,
    categoryName: category.name,
    tone: category.tone,
  })),
)

/** Options for the report form's pattern-type select. */
export const REPORT_PATTERN_OPTIONS = [
  ...ALL_PATTERNS.map(({ slug, name, categoryName }) => ({
    value: slug,
    label: name,
    group: categoryName,
  })),
  { value: "privacy-zuckering", label: "Privacy Zuckering", group: "Sneaking" },
  { value: "other", label: "Other (please describe below)", group: "Other" },
]

/** Tailwind classes per semantic tone, so tones stay consistent site-wide. */
export const TONE_CLASSES = {
  danger: {
    text: "text-danger",
    bg: "bg-danger-soft",
    border: "border-danger/30",
    dot: "bg-danger",
  },
  warn: {
    text: "text-warn",
    bg: "bg-warn-soft",
    border: "border-warn/30",
    dot: "bg-warn",
  },
  info: {
    text: "text-info",
    bg: "bg-info-soft",
    border: "border-info/30",
    dot: "bg-info",
  },
  safe: {
    text: "text-safe",
    bg: "bg-safe-soft",
    border: "border-safe/30",
    dot: "bg-safe",
  },
}
