"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Fades content in as it scrolls into view.
 *
 * Content renders visible by default and is only hidden once the observer has
 * confirmed it can run, so nothing disappears if JS fails or the user has
 * asked for reduced motion.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return

    node.dataset.reveal = "pending"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = "shown"
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </Tag>
  )
}
