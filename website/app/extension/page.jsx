import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Chrome,
  Code2,
  ExternalLink,
  Github,
  Highlighter,
  Mail,
  ScanEye,
  ServerCog,
  Tags,
  Zap,
} from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { CONTACT, REPO, REPO_DIR, REPO_ISSUES, REPO_SLUG, SITE } from "@/lib/site"

export const metadata = {
  title: "SLAG browser extension",
  description:
    "Install SLAG, the open-source browser extension that flags dark patterns on the pages you visit.",
}

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time detection",
    body: "Page text is tokenised on load and classified as you browse.",
  },
  {
    icon: Highlighter,
    title: "In-page highlighting",
    body: "Suspected patterns are marked where they appear, not in a separate report.",
  },
  {
    icon: Tags,
    title: "Pattern classification",
    body: "A second model names the category — urgency, scarcity, misdirection and so on.",
  },
  {
    icon: Code2,
    title: "Open source",
    body: "Models, training data and extension source are all in the repository.",
  },
]

const DETECTED = [
  "Confirmshaming",
  "Fake Urgency",
  "Hidden Costs",
  "Forced Continuity",
  "Trick Questions",
  "Misdirection",
  "Visual Interference",
  "Roach Motel",
  "Privacy Zuckering",
]

function CodeBlock({ children }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/70 px-3 py-2 text-sm">
      <code className="font-mono">{children}</code>
    </pre>
  )
}

export default function ExtensionPage() {
  return (
    <div className="container py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Tooling"
        title="SLAG dark pattern detector"
        description="A browser extension that classifies page text with a locally-run model and highlights the dark patterns it finds."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-12 lg:col-span-2">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ScanEye className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Beta, install from source</h2>
              <p className="mt-2 text-muted-foreground">
                There is no store listing yet. The extension is loaded unpacked from a clone of the
                repository and talks to a small classification API you run locally.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild>
                  <a href={REPO} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#install">Installation steps</a>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
              <TabsTrigger value="features" className="py-2">Features</TabsTrigger>
              <TabsTrigger value="installation" className="py-2">Installation</TabsTrigger>
              <TabsTrigger value="usage" className="py-2">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {FEATURES.map((feature) => (
                  <Card key={feature.title}>
                    <CardContent className="flex gap-3 pt-6">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <feature.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="mt-10 font-display text-xl font-semibold">Patterns it looks for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detection is text-based, so patterns that live purely in layout or colour are not yet
                covered.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DETECTED.map((pattern) => (
                  <li key={pattern}>
                    <Badge variant="outline">{pattern}</Badge>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-info/30 bg-info-soft p-4 text-sm leading-relaxed">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
                <span>
                  Detection is probabilistic — expect both false positives and misses. If you find a
                  pattern it does not catch,{" "}
                  <Link href="/report" className="font-medium text-primary underline underline-offset-4">
                    report it
                  </Link>{" "}
                  so it can go into the training data.
                </span>
              </p>
            </TabsContent>

            <TabsContent value="installation" id="install" className="mt-8 scroll-mt-24">
              <h3 className="font-display text-xl font-semibold">1. Start the classification API</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The extension sends page text to a Flask service on{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">127.0.0.1:5000</code>.
                Nothing leaves your machine.
              </p>
              <CodeBlock>{`git clone ${REPO}
cd ${REPO_DIR}/api
pip install -r requirements.txt
python app.py`}</CodeBlock>

              <h3 className="mt-8 font-display text-xl font-semibold">2. Load the extension</h3>
              <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">01</span>
                  <span>
                    Open <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">chrome://extensions</code>{" "}
                    (or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">edge://extensions</code>).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">02</span>
                  <span>Turn on <strong className="text-foreground">Developer mode</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">03</span>
                  <span>
                    Choose <strong className="text-foreground">Load unpacked</strong> and select the{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">extension/</code> folder
                    from the clone.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">04</span>
                  <span>
                    It appears in the list as <strong className="text-foreground">{SITE.manifestName}</strong>.
                  </span>
                </li>
              </ol>

              <h3 className="mt-8 font-display text-xl font-semibold">Firefox</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Open <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">about:debugging#/runtime/this-firefox</code>,
                choose <strong className="text-foreground">Load Temporary Add-on</strong>, and select{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">extension/manifest.json</code>.
                Temporary add-ons are removed when Firefox restarts.
              </p>

              <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-warn/30 bg-warn-soft p-4 text-sm leading-relaxed">
                <ServerCog className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
                <span>
                  The API has to be running before the extension can classify anything. If pages are
                  never flagged, check that{" "}
                  <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-xs">python app.py</code>{" "}
                  is still up.
                </span>
              </p>
            </TabsContent>

            <TabsContent value="usage" className="mt-8">
              <h3 className="font-display text-xl font-semibold">Day to day</h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">01</span>
                  <span>Browse normally — the content script runs when a page finishes loading.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">02</span>
                  <span>Suspected dark patterns are highlighted in place on the page.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">03</span>
                  <span>Click the toolbar icon for a summary of what was found on the current tab.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-primary">04</span>
                  <span>
                    Something missed?{" "}
                    <Link href="/report" className="font-medium text-primary underline underline-offset-4">
                      Send a report
                    </Link>{" "}
                    or open an issue on GitHub.
                  </span>
                </li>
              </ol>

              <h3 className="mt-10 font-display text-xl font-semibold">Contributing</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The most useful contribution is labelled data. Training sets live in{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">training/</code> as CSV,
                and the classifiers are rebuilt from them.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <a href={REPO_ISSUES} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open an issue
                </a>
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="lg:col-span-1">
          <div className="space-y-5 lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Project details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Repository</dt>
                    <dd className="mt-1">
                      <a
                        href={REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        {REPO_SLUG}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Manifest name</dt>
                    <dd className="mt-1">
                      {SITE.manifestName} v{SITE.extensionVersion} (Manifest V3)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Browsers</dt>
                    <dd className="mt-1 flex items-center gap-1.5">
                      <Chrome className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      Chrome, Edge, Firefox (temporary)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Requires</dt>
                    <dd className="mt-1">Python 3 + Flask API running locally</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Questions, feedback, or a bug in the detector?
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <a href={CONTACT}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email the maintainer
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Related</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { href: "/types", label: "Types of dark patterns" },
                    { href: "/examples", label: "Real-life examples" },
                    { href: "/avoid", label: "How to avoid them" },
                    { href: "/report", label: "Report a dark pattern" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
