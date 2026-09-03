import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Quote, Search } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { PATTERN_CATEGORIES, TONE_CLASSES } from "@/lib/patterns"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Types of dark patterns",
  description:
    "The four categories of deceptive design — manipulation, obstruction, sneaking and interface interference — with how to spot each one.",
}

function PatternCard({ pattern, tone }) {
  const toneClass = TONE_CLASSES[tone] ?? TONE_CLASSES.danger

  return (
    <article
      id={pattern.slug}
      className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-colors duration-200 hover:border-primary/40"
    >
      <h3 className="font-display text-xl font-semibold">{pattern.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{pattern.tagline}</p>

      <div className={cn("mt-5 rounded-xl border p-4", toneClass.bg, toneClass.border)}>
        <Quote
          aria-hidden="true"
          className={cn("mb-2 h-4 w-4", toneClass.text)}
        />
        <ul className="space-y-1.5">
          {pattern.examples.map((example) => (
            <li key={example} className="font-display text-sm italic leading-relaxed text-foreground">
              {example}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{pattern.detail}</p>

      <div className="mt-5 flex items-start gap-2.5 border-t border-border pt-4">
        <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">How to spot it: </span>
          <span className="text-muted-foreground">{pattern.spot}</span>
        </p>
      </div>
    </article>
  )
}

export default function TypesPage() {
  return (
    <div className="container py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Reference"
        title="Types of dark patterns"
        description="Thirteen patterns across four categories, grouped by the mechanism they rely on. Each one includes the wording you will actually see and a concrete test for catching it."
      />

      <Tabs defaultValue={PATTERN_CATEGORIES[0].id} className="mt-12 w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 md:grid-cols-4">
          {PATTERN_CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="py-2 text-xs sm:text-sm">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {PATTERN_CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id} id={category.id} className="mt-8 scroll-mt-24">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-semibold">{category.name}</h2>
                <Badge variant="secondary">{category.patterns.length} patterns</Badge>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{category.summary}</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {category.patterns.map((pattern) => (
                <PatternCard key={pattern.slug} pattern={pattern} tone={category.tone} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
