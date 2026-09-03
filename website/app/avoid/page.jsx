import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Check,
  CreditCard,
  ExternalLink,
  Github,
  ListChecks,
  Receipt,
  ScanEye,
  Scale,
  Timer,
} from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { REPO } from "@/lib/site"

export const metadata = {
  title: "How to avoid dark patterns",
  description:
    "Practical defences, warning signs, and your legal rights when a site is designed to work against you.",
}

const TIPS = [
  {
    icon: Timer,
    title: "Slow down on purpose",
    body: "Almost every manipulation pattern depends on speed. When you see a countdown or a low-stock warning, that is the signal to take longer, not less time.",
  },
  {
    icon: Receipt,
    title: "Compare the first price to the last",
    body: "Before you enter payment details, check the total against the price that brought you there. Any gap is the fee that was designed not to be noticed.",
  },
  {
    icon: ListChecks,
    title: "Find the exit before the entrance",
    body: "Before subscribing, locate the cancellation page. If you cannot find it in under a minute, assume cancelling will be worse than signing up.",
  },
  {
    icon: CreditCard,
    title: "Use a virtual or single-use card",
    body: "For trials that require payment details, a virtual card number you can freeze converts a forced-continuity trap into a declined charge.",
  },
  {
    icon: CalendarClock,
    title: "Set the reminder at signup",
    body: "The moment you start a trial, create a calendar reminder two days before it ends. Doing it later means not doing it.",
  },
]

const WARNING_SIGNS = [
  { title: "Countdown timers", body: "Especially ones that reset when you reload the page." },
  { title: "Pre-ticked boxes", body: "For add-ons, subscriptions, or data sharing you never asked for." },
  { title: "Double negatives", body: "“Uncheck to not opt out” means someone wants you to guess." },
  { title: "One loud button", body: "When only one option is styled, the other one is what you wanted." },
  { title: "Late-arriving fees", body: "Costs that appear only after you have entered your details." },
  { title: "Phone-only cancellation", body: "A signup that took one click should not take a call to undo." },
]

const RESOURCES = [
  {
    name: "Deceptive Design",
    detail: "Harry Brignull's original pattern library and hall of shame.",
    href: "https://www.deceptive.design/",
  },
  {
    name: "FTC — Bringing Dark Patterns to Light",
    detail: "The US regulator's staff report on how these designs are enforced against.",
    href: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
  },
  {
    name: "Dark Patterns at Scale",
    detail: "Mathur et al., the large-scale crawl that quantified the problem.",
    href: "https://arxiv.org/abs/1907.07032",
  },
  {
    name: "EFF Privacy Badger",
    detail: "Blocks trackers that make behavioural targeting possible in the first place.",
    href: "https://privacybadger.org/",
  },
]

export default function AvoidPage() {
  return (
    <div className="container py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Defence"
        title="How to avoid dark patterns"
        description="You cannot out-read every interface. What works is a small set of habits that make the common patterns fail, plus knowing which rights you already have."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-14 lg:col-span-2">
          <section aria-labelledby="tips">
            <h2 id="tips" className="flex items-center gap-2.5 font-display text-2xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-safe-soft text-safe">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              Five habits that work
            </h2>

            <ol className="mt-6 space-y-3">
              {TIPS.map((tip, index) => (
                <li
                  key={tip.title}
                  className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-colors duration-200 hover:border-primary/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <tip.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      <span className="mr-2 text-sm font-normal text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {tip.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="signs">
            <h2 id="signs" className="flex items-center gap-2.5 font-display text-2xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warn-soft text-warn">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              </span>
              Warning signs
            </h2>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {WARNING_SIGNS.map((sign) => (
                <li key={sign.title} className="rounded-xl border border-border bg-surface p-4">
                  <p className="flex items-center gap-2 font-medium">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
                    {sign.title}
                  </p>
                  <p className="mt-1.5 pl-3.5 text-sm leading-relaxed text-muted-foreground">{sign.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="legal">
            <h2 id="legal" className="flex items-center gap-2.5 font-display text-2xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-info-soft text-info">
                <Scale className="h-4 w-4" aria-hidden="true" />
              </span>
              Legal footing
            </h2>

            <Accordion type="single" collapsible className="mt-6 w-full">
              <AccordionItem value="laws">
                <AccordionTrigger className="text-left font-display text-base">
                  Consumer protection laws
                </AccordionTrigger>
                <AccordionContent className="prose-note">
                  <p className="mb-3 text-muted-foreground">
                    Several jurisdictions already treat deceptive interface design as an existing
                    offence rather than a new one:
                  </p>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>
                      In the US, the FTC Act prohibits unfair or deceptive acts or practices in
                      commerce.
                    </li>
                    <li>
                      The EU Consumer Rights Directive requires clear pre-contractual information,
                      including total price.
                    </li>
                    <li>California&apos;s CPRA explicitly addresses dark patterns in privacy controls.</li>
                    <li>The GDPR requires freely given, specific and unambiguous consent.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="enforcement">
                <AccordionTrigger className="text-left font-display text-base">
                  Enforcement is happening
                </AccordionTrigger>
                <AccordionContent className="prose-note">
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>
                      The FTC ordered Epic Games to pay{" "}
                      <a
                        href="https://www.ftc.gov/news-events/news/press-releases/2023/03/fortnite-video-game-maker-epic-games-pay-more-245-million-tricking-users-making-unwanted-charges"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        $245 million in refunds
                      </a>{" "}
                      over interface designs that produced unwanted charges.
                    </li>
                    <li>
                      EU regulators have issued substantial fines over consent interfaces that made
                      refusal materially harder than acceptance.
                    </li>
                    <li>
                      Subscription cancellation flows are an active enforcement area in both the US
                      and EU.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rights">
                <AccordionTrigger className="text-left font-display text-base">
                  Rights you can usually rely on
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>Clear information, including the total price, before you commit</li>
                    <li>A cooling-off period on many distance and online contracts</li>
                    <li>The ability to dispute unauthorised charges with your payment provider</li>
                    <li>The ability to complain to a consumer protection agency</li>
                  </ul>
                  <p className="mt-4 rounded-lg border border-border bg-muted/60 p-3 text-sm text-muted-foreground">
                    Rights vary by jurisdiction. This is general information for orientation, not
                    legal advice.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="space-y-5 lg:sticky lg:top-24">
            <Card className="border-primary/30">
              <CardHeader className="gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ScanEye className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="font-display text-lg">SLAG browser extension</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our open-source extension scans pages as you browse, highlights suspected dark
                  patterns, and explains which one it found.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    "Real-time detection while you browse",
                    "Highlights the element in place",
                    "Names and explains the pattern",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe" aria-hidden="true" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/extension">
                      Installation guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={REPO} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Further reading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {RESOURCES.map((resource) => (
                    <li key={resource.href}>
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 text-sm font-medium transition-colors hover:text-primary"
                      >
                        <ExternalLink
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                        {resource.name}
                      </a>
                      <p className="mt-1 pl-6 text-xs leading-relaxed text-muted-foreground">
                        {resource.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Found one in the wild?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Reports help others recognise the pattern and improve the detector.
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/report">Report a dark pattern</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
