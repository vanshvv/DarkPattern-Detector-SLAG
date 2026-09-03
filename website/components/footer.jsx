import Link from "next/link"
import { Github, Mail, ScanEye } from "lucide-react"

import { CONTACT, REPO } from "@/lib/site"

const siteMap = [
  { name: "Home", href: "/" },
  { name: "Types of dark patterns", href: "/types" },
  { name: "Real-life examples", href: "/examples" },
  { name: "How to avoid them", href: "/avoid" },
  { name: "SLAG extension", href: "/extension" },
  { name: "Report a dark pattern", href: "/report" },
]

/** External references we actually link to, each a real primary source. */
const resources = [
  { name: "Deceptive Design (Harry Brignull)", href: "https://www.deceptive.design/" },
  { name: "FTC — Bringing Dark Patterns to Light", href: "https://www.ftc.gov/reports/bringing-dark-patterns-light" },
  { name: "Dark Patterns at Scale (Mathur et al.)", href: "https://arxiv.org/abs/1907.07032" },
  { name: "EFF Privacy Badger", href: "https://privacybadger.org/" },
  { name: "SLAG on GitHub", href: REPO },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ScanEye className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              DarkPatterns<span className="-ml-1 text-primary">.info</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An open project documenting deceptive design — so that the tricks stop working once
              you can name them.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="sr-only">SLAG on GitHub</span>
              </a>
              <a
                href={CONTACT}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="sr-only">Email the maintainers</span>
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-sitemap">
            <h2 id="footer-sitemap" className="font-display text-sm font-semibold uppercase tracking-wider">
              Site map
            </h2>
            <ul className="mt-2 text-sm sm:mt-4 sm:space-y-2.5">
              {siteMap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-primary sm:min-h-0"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-resources">
            <h2 id="footer-resources" className="font-display text-sm font-semibold uppercase tracking-wider">
              Resources
            </h2>
            <ul className="mt-2 text-sm sm:mt-4 sm:space-y-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-primary sm:min-h-0"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DarkPatterns.info — an open-source project.</p>
          <p>
            Educational content only, not legal advice.{" "}
            <a href={CONTACT} className="underline underline-offset-4 transition-colors hover:text-primary">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
