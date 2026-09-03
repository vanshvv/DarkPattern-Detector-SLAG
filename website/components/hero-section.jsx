"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, EyeOff, Flame, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const START_SECONDS = 299

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

/**
 * The hero doubles as the site's first demo: a working fake-urgency widget.
 * The timer really counts down and really resets at zero, which is the whole
 * point — it proves the deadline is theatre rather than just asserting it.
 */
export default function HeroSection() {
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS)
  const [resetCount, setResetCount] = useState(0)
  const [annotated, setAnnotated] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Run fast when motion is fine so the loop is visible within a few seconds.
    const tickMs = prefersReducedMotion ? 1000 : 120

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setResetCount((count) => count + 1)
          return START_SECONDS
        }
        return current - 1
      })
    }, tickMs)

    return () => window.clearInterval(intervalRef.current)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open-source detection, research and reporting
            </p>

            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
              The interface is{" "}
              <span className="relative whitespace-nowrap text-primary">
                arguing with you
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-primary/15"
                />
              </span>
              .
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Dark patterns are design choices that push people into decisions they would not
              otherwise make. Learn to recognise them, defend against them, and report the ones
              you find.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href="/types">
                  Explore the taxonomy
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/report">Report a dark pattern</Link>
              </Button>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Patterns</dt>
                <dd className="font-display text-2xl font-semibold">13</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Categories</dt>
                <dd className="font-display text-2xl font-semibold">4</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Live demos</dt>
                <dd className="font-display text-2xl font-semibold">4</dd>
              </div>
            </dl>
          </div>

          {/* Live specimen */}
          <div className="lg:justify-self-end">
            <figure className="w-full max-w-md rounded-2xl border border-border bg-surface p-3 shadow-lift">
              <figcaption className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Live specimen
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1.5 text-xs sm:h-8"
                  onClick={() => setAnnotated((value) => !value)}
                  aria-pressed={annotated}
                >
                  {annotated ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {annotated ? "Hide the tricks" : "Show the tricks"}
                </Button>
              </figcaption>

              <div className="relative rounded-xl border border-border bg-background p-5">
                <div
                  className={cn(
                    "mb-4 flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-300",
                    annotated
                      ? "bg-danger-soft text-danger ring-1 ring-danger/40"
                      : "bg-muted text-foreground",
                  )}
                >
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Flame className="h-4 w-4" aria-hidden="true" />
                    Flash sale ending
                  </span>
                  <span className="font-mono tabular-nums" aria-live="off">
                    {formatTime(secondsLeft)}
                  </span>
                </div>

                <h2 className="font-display text-xl font-semibold">Premium Course Bundle</h2>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-semibold text-primary">$49.99</span>
                  <span className="text-sm text-muted-foreground line-through">$199.99</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    75% off
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-4 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors duration-300",
                    annotated ? "bg-danger-soft text-danger ring-1 ring-danger/40" : "text-muted-foreground",
                  )}
                >
                  <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Only 3 spots remaining at this price
                </p>

                <button
                  type="button"
                  className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-150 hover:bg-primary/90 active:scale-[0.985]"
                  onClick={() => setAnnotated(true)}
                >
                  Claim this offer now
                </button>

                <p
                  className={cn(
                    "mt-3 text-center text-xs transition-colors duration-300",
                    annotated ? "text-muted-foreground" : "text-muted-foreground/70",
                  )}
                >
                  <button
                    type="button"
                    className="underline underline-offset-2 hover:text-foreground"
                    onClick={() => setAnnotated(true)}
                  >
                    No thanks, I like wasting money
                  </button>
                </p>
              </div>

              <p
                className={cn(
                  "mt-3 rounded-xl border px-4 py-3 text-sm leading-relaxed transition-all duration-300",
                  annotated
                    ? "border-danger/40 bg-danger-soft text-foreground opacity-100"
                    : "border-transparent bg-transparent text-muted-foreground opacity-70",
                )}
              >
                {annotated ? (
                  <>
                    <strong className="font-semibold text-danger">Three patterns, one card.</strong>{" "}
                    Fake urgency —{" "}
                    {resetCount > 0 ? (
                      <>
                        the timer has already restarted{" "}
                        <span className="font-mono tabular-nums">{resetCount}</span>{" "}
                        {resetCount === 1 ? "time" : "times"} and the price has not moved
                      </>
                    ) : (
                      <>keep watching: at zero it restarts rather than changing the price</>
                    )}
                    . False scarcity in the spot count, and confirmshaming in the decline link.
                  </>
                ) : (
                  <>This card is a real dark pattern. Watch the timer, then reveal what it is doing.</>
                )}
              </p>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
