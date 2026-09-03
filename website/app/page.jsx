import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Ban, Clock, Gavel, ScanEye, ShieldAlert, Wallet } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StatCard from "@/components/stat-card"
import SectionHeading from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { PATTERN_CATEGORIES } from "@/lib/patterns"

/**
 * Every figure below is attributed to a primary source and linked.
 * If a number cannot be sourced, it does not belong on this page.
 */
const STATS = [
  {
    icon: ShieldAlert,
    value: "97%",
    label:
      "of the most popular websites and apps used by EU consumers contained at least one dark pattern.",
    source: "European Commission behavioural study, 2022",
    href: "https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints_en",
    tone: "danger",
  },
  {
    icon: ScanEye,
    value: "11.1%",
    label:
      "of ~11,000 shopping sites crawled showed dark patterns — 1,818 instances across 1,254 sites.",
    source: "Mathur et al., “Dark Patterns at Scale”, 2019",
    href: "https://arxiv.org/abs/1907.07032",
    tone: "warn",
  },
  {
    icon: Gavel,
    value: "$245M",
    label:
      "ordered by the FTC in refunds to consumers tricked into unwanted charges by deceptive interface design.",
    source: "US FTC v. Epic Games, 2023",
    href: "https://www.ftc.gov/news-events/news/press-releases/2023/03/fortnite-video-game-maker-epic-games-pay-more-245-million-tricking-users-making-unwanted-charges",
    tone: "info",
  },
]

const HARMS = [
  {
    icon: Wallet,
    title: "Money leaves quietly",
    body: "Unwanted renewals and fees surfaced too late to refuse are the most common measurable harm.",
  },
  {
    icon: Clock,
    title: "Time is taken deliberately",
    body: "Cancellation mazes are designed and measured. The friction is the product decision, not an accident.",
  },
  {
    icon: Ban,
    title: "Consent stops meaning anything",
    body: "When a default converts inattention into agreement, the record of consent stops describing what people wanted.",
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Sourced figures */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="The scale of it"
            title="This is not a fringe problem"
            description="Three independently published figures. Each links to its primary source, because a site about deception should be checkable."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat, index) => (
              <Reveal key={stat.value} delay={index * 80}>
                <StatCard {...stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Definition"
              title="What is a dark pattern?"
              description="A dark pattern is an interface built so that the easiest path serves the business rather than the person using it."
            />
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The term was coined by UX specialist Harry Brignull in 2010. What separates a dark
                pattern from ordinary persuasion is intent plus asymmetry: the design works because
                you are hurried, tired, or reading quickly — and it stops working the moment you slow
                down and read carefully.
              </p>
              <p>
                Nothing here is a technical exploit. Every pattern on this site is legal-looking,
                shippable, and usually A/B tested. That is exactly why naming them matters.
              </p>
            </div>
            <Button asChild className="group mt-8">
              <Link href="/types">
                Explore the four categories
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <Reveal className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-semibold">Why it matters</h3>
            <ul className="mt-6 space-y-6">
              {HARMS.map((harm) => (
                <li key={harm.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger">
                    <harm.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{harm.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{harm.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Taxonomy preview */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="The taxonomy"
            title="Four categories, thirteen patterns"
            description="Grouped by the mechanism they use rather than the industry they appear in — the same trick shows up in banking, travel and games alike."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PATTERN_CATEGORIES.map((category, index) => (
              <Reveal key={category.id} delay={index * 70}>
                <Link
                  href={`/types#${category.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{category.name}</h3>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {category.patterns.length} patterns
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {category.summary}
                  </p>
                  <p className="mt-5 flex flex-wrap gap-1.5">
                    {category.patterns.map((pattern) => (
                      <span
                        key={pattern.slug}
                        className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {pattern.name}
                      </span>
                    ))}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
                    Read the category
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center shadow-soft sm:px-12">
            <div
              aria-hidden="true"
              className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <SectionHeading
                align="center"
                eyebrow="Contribute"
                title="Help build a more honest web"
                description="Found a dark pattern in the wild? Report it. Reports feed the public database and help train the SLAG detector."
              />
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/report">
                    Report a dark pattern
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/extension">Install the detector</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
