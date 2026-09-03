"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronDown, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const DEMO_COPY = {
  "forced-continuity": {
    heading: "Forced Continuity",
    body: "The trial converts to a paid subscription without a second, explicit consent. Payment details are collected up front, while the auto-renewal is disclosed only in small print on a screen you are being encouraged to click past.",
  },
  confirmshaming: {
    heading: "Confirmshaming",
    body: "The decline option is worded to make refusing feel irrational. The phrasing adds no information — it exists purely to attach an emotional cost to “no”.",
  },
  "hidden-costs": {
    heading: "Hidden Costs",
    body: "The advertised price was $79.99; the final total is $97.97, an increase of 22.5%. The fees appear only after you have invested several steps in the flow, so abandoning now feels wasteful.",
  },
  "fake-urgency": {
    heading: "Fake Urgency & Scarcity",
    body: "The countdown, the remaining-spots count and the discount are all decoration. Watch the timer hit zero: it restarts rather than changing the price.",
  },
}

const TOTAL_STEPS = {
  "forced-continuity": 3,
  confirmshaming: 1,
  "hidden-costs": 3,
  "fake-urgency": 1,
}

const formatTime = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

/** Inputs inside the demos are inert props — they exist to look real, not to collect anything. */
const DemoInput = (props) => (
  <input
    {...props}
    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  />
)

export default function InteractiveDemoCard({ id, title, description }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [step, setStep] = useState(1)
  const [caught, setCaught] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(300)
  const [timerLoops, setTimerLoops] = useState(0)
  const contentRef = useRef(null)

  // Open automatically when linked to directly (e.g. /examples#hidden-costs).
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
      setIsExpanded(true)
    }
  }, [id])

  // Only the urgency demo needs a clock, and only while it is on screen.
  useEffect(() => {
    if (id !== "fake-urgency" || !isExpanded || caught) return

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setTimerLoops((loops) => loops + 1)
          return 300
        }
        return current - 1
      })
    }, 250)

    return () => window.clearInterval(interval)
  }, [id, isExpanded, caught])

  const advance = useCallback(() => {
    const total = TOTAL_STEPS[id] ?? 1
    setStep((current) => {
      if (current >= total) {
        setCaught(true)
        return current
      }
      return current + 1
    })
  }, [id])

  const reset = useCallback(() => {
    setStep(1)
    setCaught(false)
    setSecondsLeft(300)
    setTimerLoops(0)
  }, [])

  const copy = DEMO_COPY[id]

  const renderDemo = () => {
    switch (id) {
      case "forced-continuity":
        return (
          <div className="space-y-3">
            {step === 1 && (
              <>
                <h4 className="font-display text-lg font-semibold">Premium Fitness App — Free Trial</h4>
                <p className="text-sm text-muted-foreground">Get every premium feature free for 7 days.</p>
                <DemoInput type="text" placeholder="Full name" aria-label="Full name (demo field)" />
                <DemoInput type="email" placeholder="Email address" aria-label="Email address (demo field)" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]" />
                  I agree to the Terms &amp; Conditions
                </label>
                <Button onClick={advance} className="w-full">
                  Start free trial
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <h4 className="font-display text-lg font-semibold">One more step</h4>
                <p className="text-sm text-muted-foreground">
                  Add payment details to activate your trial. Your card will not be charged during the
                  trial period.
                </p>
                <DemoInput type="text" placeholder="Card number" aria-label="Card number (demo field)" />
                <div className="grid grid-cols-2 gap-2">
                  <DemoInput type="text" placeholder="MM/YY" aria-label="Expiry (demo field)" />
                  <DemoInput type="text" placeholder="CVC" aria-label="CVC (demo field)" />
                </div>
                <Button onClick={advance} className="w-full">
                  Activate free trial
                </Button>
              </>
            )}
            {step === 3 && (
              <>
                <h4 className="font-display text-lg font-semibold">You&apos;re all set</h4>
                <p className="text-sm text-muted-foreground">Your 7-day free trial has been activated.</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground/70">
                  After your trial ends, your subscription continues automatically at $19.99/month
                  unless cancelled.
                </p>
                <Button onClick={advance} className="w-full">
                  Start using premium features
                </Button>
              </>
            )}
          </div>
        )

      case "confirmshaming":
        return (
          <div className="space-y-3">
            <h4 className="font-display text-lg font-semibold">Join our newsletter</h4>
            <p className="text-sm text-muted-foreground">Stay updated with our latest offers and news.</p>
            <DemoInput type="email" placeholder="Email address" aria-label="Email address (demo field)" />
            <Button onClick={advance} className="w-full">
              Subscribe
            </Button>
            <button
              type="button"
              onClick={advance}
              className="w-full rounded-md py-2 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              No thanks, I don&apos;t want to save money
            </button>
          </div>
        )

      case "hidden-costs":
        return (
          <div className="space-y-3">
            {step === 1 && (
              <>
                <h4 className="font-display text-lg font-semibold">Premium Headphones</h4>
                <p className="text-2xl font-semibold text-primary">$79.99</p>
                <p className="text-sm text-muted-foreground">
                  Wireless over-ears with active noise cancellation.
                </p>
                <Button onClick={advance} className="w-full">
                  Add to cart
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <h4 className="font-display text-lg font-semibold">Your cart</h4>
                <dl className="text-sm">
                  <div className="flex justify-between border-b border-border py-2">
                    <dt>Premium Headphones</dt>
                    <dd className="tabular-nums">$79.99</dd>
                  </div>
                  <div className="flex justify-between border-b border-border py-2 font-semibold">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">$79.99</dd>
                  </div>
                </dl>
                <Button onClick={advance} className="w-full">
                  Proceed to checkout
                </Button>
              </>
            )}
            {step === 3 && (
              <>
                <h4 className="font-display text-lg font-semibold">Checkout</h4>
                <dl className="text-sm">
                  <div className="flex justify-between border-b border-border py-2">
                    <dt>Premium Headphones</dt>
                    <dd className="tabular-nums">$79.99</dd>
                  </div>
                  <div className="flex justify-between border-b border-border py-2 text-danger">
                    <dt>Shipping &amp; handling</dt>
                    <dd className="tabular-nums">$12.99</dd>
                  </div>
                  <div className="flex justify-between border-b border-border py-2 text-danger">
                    <dt>Service fee</dt>
                    <dd className="tabular-nums">$4.99</dd>
                  </div>
                  <div className="flex justify-between py-2 font-semibold">
                    <dt>Total</dt>
                    <dd className="tabular-nums">$97.97</dd>
                  </div>
                </dl>
                <Button onClick={advance} className="w-full">
                  Complete purchase
                </Button>
              </>
            )}
          </div>
        )

      case "fake-urgency":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              <span className="font-semibold">Flash sale ending soon</span>
              <span className="font-mono tabular-nums">{formatTime(secondsLeft)}</span>
            </div>
            <h4 className="font-display text-lg font-semibold">Premium Course Bundle</h4>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-semibold text-primary">$49.99</span>
              <span className="text-sm text-muted-foreground line-through">$199.99</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                75% off
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete web development bundle — 50+ hours of content.
            </p>
            <p className="text-sm">
              <span className="font-semibold text-danger">Limited availability: </span>
              <span className="text-muted-foreground">only 3 spots remaining at this price</span>
            </p>
            {timerLoops > 0 ? (
              <p className="rounded-md border border-warn/40 bg-warn-soft px-3 py-2 text-xs text-foreground">
                The timer has already restarted{" "}
                <span className="font-mono tabular-nums">{timerLoops}</span>{" "}
                {timerLoops === 1 ? "time" : "times"} — and the price has not moved.
              </p>
            ) : null}
            <Button onClick={advance} className="w-full">
              Claim this offer now
            </Button>
          </div>
        )

      default:
        return <p className="text-sm text-muted-foreground">Demo not available.</p>
    }
  }

  const total = TOTAL_STEPS[id] ?? 1

  return (
    <article
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border bg-surface transition-colors duration-200",
        caught ? "border-danger/50" : "border-border",
      )}
    >
      <h3>
        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          aria-expanded={isExpanded}
          aria-controls={`${id}-panel`}
          className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
        >
          <span>
            <span className="block font-display text-xl font-semibold">{title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground sm:inline">
              {isExpanded ? "Close" : "Try it"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-300",
                isExpanded && "rotate-180",
              )}
            />
          </span>
        </button>
      </h3>

      <div id={`${id}-panel`} ref={contentRef} hidden={!isExpanded}>
        <div className="border-t border-border p-5">
          {total > 1 ? (
            <ol className="mb-4 flex items-center gap-2" aria-label={`Step ${step} of ${total}`}>
              {Array.from({ length: total }, (_, index) => (
                <li
                  key={index}
                  aria-hidden="true"
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    index < step ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </ol>
          ) : null}

          <div className="rounded-xl border border-border bg-background p-4">{renderDemo()}</div>

          <div aria-live="polite">
            {caught && copy ? (
              <div className="mt-4 rounded-xl border border-danger/40 bg-danger-soft p-4">
                <p className="flex items-center gap-2 font-semibold text-danger">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Dark pattern: {copy.heading}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{copy.body}</p>
                <Button variant="outline" size="sm" className="mt-3 gap-1.5" onClick={reset}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset demo
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
