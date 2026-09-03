import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import InteractiveDemoCard from "@/components/interactive-demo-card"
import CaseStudyCard from "@/components/case-study-card"
import SectionHeading from "@/components/section-heading"

export const metadata = {
  title: "Real-life examples",
  description:
    "Interactive demonstrations of dark patterns, documented enforcement cases, and stories from people who ran into them.",
}

const DEMOS = [
  {
    id: "forced-continuity",
    title: "Forced Continuity",
    description: "Walk a free trial into a paid subscription and watch where the disclosure hides.",
  },
  {
    id: "confirmshaming",
    title: "Confirmshaming",
    description: "Read the decline option out loud. That is the whole trick.",
  },
  {
    id: "hidden-costs",
    title: "Hidden Costs",
    description: "A $79.99 product that becomes $97.97 on the last screen.",
  },
  {
    id: "fake-urgency",
    title: "Fake Urgency",
    description: "Let the countdown reach zero and see what actually happens.",
  },
]

const CASE_STUDIES = [
  {
    company: "Major airline",
    pattern: "Hidden costs",
    description:
      "Mandatory fees were excluded from advertised fares until the final checkout screen, so listed prices were never payable.",
    outcome: "Regulatory fine plus mandated changes to price display.",
  },
  {
    company: "Streaming service",
    pattern: "Difficult cancellation",
    description:
      "Cancellation was buried several levels deep and gated behind repeated retention offers, while signup took a single click.",
    outcome: "Class action and settlement.",
  },
  {
    company: "E-commerce marketplace",
    pattern: "Fake urgency",
    description:
      "“Limited time” countdowns and low-stock counters reset per visitor and were unconnected to real inventory.",
    outcome: "Media scrutiny and loss of consumer trust.",
  },
  {
    company: "Social platform",
    pattern: "Privacy zuckering",
    description:
      "Privacy controls were split across several screens with defaults set to the broadest possible sharing.",
    outcome: "Regulatory investigation and fines.",
  },
]

const STORIES = [
  {
    title: "Subscription trap",
    author: "Alex, 34",
    badge: "Roach Motel",
    date: "12 June 2023",
    quote:
      "I signed up for a “free trial” of a fitness app that required my credit card. When I tried to cancel before the trial ended, I discovered I had to call during specific hours, wait on hold for 45 minutes, and then go through a “retention specialist” who tried every trick to keep me subscribed. What should have been a simple cancellation took over an hour.",
  },
  {
    title: "Hidden resort fees",
    author: "Maria, 29",
    badge: "Hidden Costs",
    date: "3 March 2023",
    quote:
      "I booked a hotel room advertised at $150 per night. After going through the entire booking process and entering my payment information, the price jumped to $210 per night due to “resort fees” that were not mentioned anywhere in the initial pricing. By then I had invested so much time that I reluctantly went ahead with it.",
  },
  {
    title: "Misleading unsubscribe",
    author: "Jordan, 42",
    badge: "Trick Questions",
    date: "17 May 2023",
    quote:
      "I tried to unsubscribe from a newsletter and was presented with a form asking “Do you want to continue not receiving emails about special offers?” with Yes/No options. I could not tell which answer would actually unsubscribe me.",
  },
]

export default function ExamplesPage() {
  return (
    <div className="container py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Field guide"
        title="Real-life examples"
        description="Four working demonstrations you can click through, documented enforcement cases, and accounts from people who ran into these patterns."
      />

      <Tabs defaultValue="interactive" className="mt-12 w-full">
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 sm:grid-cols-3">
          <TabsTrigger value="interactive" className="py-2">Interactive demos</TabsTrigger>
          <TabsTrigger value="case-studies" className="py-2">Case studies</TabsTrigger>
          <TabsTrigger value="community" className="py-2">Community stories</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive" className="mt-8">
          <div className="mb-6 flex max-w-2xl items-start gap-2.5 rounded-xl border border-info/30 bg-info-soft p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
            <p className="text-sm leading-relaxed">
              These demos are simulations. Nothing you type is sent anywhere, no account is created,
              and no payment is possible. Play them through to the end to see the pattern named.
            </p>
          </div>

          <div className="space-y-4">
            {DEMOS.map((demo) => (
              <InteractiveDemoCard key={demo.id} {...demo} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="mt-8">
          <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
            Composite summaries of documented enforcement patterns. Company names are generalised;
            the mechanics and outcomes reflect real regulatory actions.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.company} {...study} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-8">
          <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
            Experiences shared by people who encountered dark patterns in the wild.
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {STORIES.map((story) => (
              <Card key={story.title} className="flex h-full flex-col">
                <CardHeader className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="font-display text-lg">{story.title}</CardTitle>
                      <CardDescription>Shared by {story.author}</CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {story.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <blockquote className="flex-1 border-l-2 border-primary/40 pl-4 font-display text-sm italic leading-relaxed">
                    {story.quote}
                  </blockquote>
                  <p className="mt-4 text-xs text-muted-foreground">Reported {story.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
