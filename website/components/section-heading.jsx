import { cn } from "@/lib/utils"

/**
 * Consistent section header: small eyebrow, display headline, optional lede.
 * Keeps vertical rhythm and heading levels uniform across every page.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span aria-hidden="true" className="h-px w-6 bg-primary/50" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
