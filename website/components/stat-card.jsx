import { cn } from "@/lib/utils"
import { TONE_CLASSES } from "@/lib/patterns"

/**
 * A single sourced figure. The source line is required, not optional — an
 * awareness site that quotes unattributed statistics is doing the same thing
 * it warns about.
 */
export default function StatCard({ icon: Icon, value, label, source, href, tone = "danger" }) {
  const toneClass = TONE_CLASSES[tone] ?? TONE_CLASSES.danger

  return (
    <figure className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
      <div
        className={cn(
          "mb-5 flex h-11 w-11 items-center justify-center rounded-xl",
          toneClass.bg,
          toneClass.text,
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <p className="font-display text-4xl font-semibold leading-none tracking-tight">{value}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{label}</p>

      <figcaption className="mt-5 border-t border-border pt-3 text-xs text-muted-foreground">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
          >
            {source}
          </a>
        ) : (
          source
        )}
      </figcaption>
    </figure>
  )
}
