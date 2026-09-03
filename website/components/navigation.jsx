"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, ScanEye } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { name: "Home", path: "/" },
  { name: "Types", path: "/types" },
  { name: "Examples", path: "/examples" },
  { name: "How to Avoid", path: "/avoid" },
  { name: "Extension", path: "/extension" },
  { name: "Report", path: "/report" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Escape closes the menu; lock scroll while it is open.
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const isActive = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md font-display text-xl font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ScanEye className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span>
            DarkPatterns<span className="text-primary">.info</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              aria-current={isActive(route.path) ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActive(route.path)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {route.name}
              {isActive(route.path) ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                />
              ) : null}
            </Link>
          ))}
          <span aria-hidden="true" className="mx-2 h-5 w-px bg-border" />
          <ModeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="container flex flex-col py-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  aria-current={isActive(route.path) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center rounded-md px-3 text-base font-medium transition-colors",
                    isActive(route.path)
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
