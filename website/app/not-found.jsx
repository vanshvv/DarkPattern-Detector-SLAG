import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export const metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-6 font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">This page does not exist</h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
        No dark pattern here — just a broken link. Head back to the taxonomy or start from the top.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/types">Browse dark pattern types</Link>
        </Button>
      </div>
    </div>
  )
}
