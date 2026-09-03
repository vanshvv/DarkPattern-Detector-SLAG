import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gavel } from "lucide-react"

export default function CaseStudyCard({ company, pattern, description, outcome }) {
  return (
    <Card className="flex h-full flex-col transition-colors duration-200 hover:border-primary/40">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="font-display text-xl">{company}</CardTitle>
          <Badge variant="outline" className="shrink-0 border-primary/40 text-primary">
            {pattern}
          </Badge>
        </div>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 p-3 text-sm">
          <Gavel className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p>
            <span className="font-semibold">Outcome: </span>
            {outcome}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
