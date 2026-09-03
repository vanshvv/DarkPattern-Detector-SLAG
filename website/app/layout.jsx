import { Inter, Newsreader } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://darkpatterns.info"),
  title: {
    default: "DarkPatterns.info — Exposing deceptive design",
    template: "%s · DarkPatterns.info",
  },
  description:
    "Learn to spot, avoid, and report dark patterns: the deceptive interface choices that push people into decisions they would not otherwise make.",
  keywords: ["dark patterns", "deceptive design", "UX ethics", "consumer protection", "SLAG"],
  openGraph: {
    title: "DarkPatterns.info — Exposing deceptive design",
    description:
      "Learn to spot, avoid, and report the deceptive interface choices that push people into decisions they would not otherwise make.",
    type: "website",
    siteName: "DarkPatterns.info",
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkPatterns.info — Exposing deceptive design",
    description: "Spot, avoid, and report deceptive interface design.",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#101013" },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
