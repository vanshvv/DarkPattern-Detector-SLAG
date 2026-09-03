"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Check, CheckCircle2, Mail, ShieldCheck } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { REPORT_PATTERN_OPTIONS } from "@/lib/patterns"
import { cn } from "@/lib/utils"

const CONTACT_EMAIL = "3shubh17@gmail.com"

const EMPTY_FORM = {
  website: "",
  patternType: "",
  description: "",
  impact: "",
  email: "",
  consent: false,
}

/** Groups the flat option list into <SelectGroup>s, preserving order. */
function useGroupedOptions() {
  return useMemo(() => {
    const groups = new Map()
    REPORT_PATTERN_OPTIONS.forEach((option) => {
      if (!groups.has(option.group)) groups.set(option.group, [])
      groups.get(option.group).push(option)
    })
    return [...groups.entries()]
  }, [])
}

function validate(values) {
  const errors = {}

  if (!values.website.trim()) {
    errors.website = "Tell us which site or app this happened on."
  }
  if (!values.patternType) {
    errors.patternType = "Pick the closest category — “Other” is fine if none fit."
  }
  if (values.description.trim().length < 20) {
    errors.description = "Please add at least a sentence or two describing what happened."
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That does not look like a valid email address."
  }
  if (!values.consent) {
    errors.consent = "We need your consent before adding the report to the database."
  }

  return errors
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-danger">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

export default function ReportPage() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const groupedOptions = useGroupedOptions()
  const formRef = useRef(null)

  const setField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the user starts correcting it.
    setErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      const firstField = Object.keys(nextErrors)[0]
      formRef.current?.querySelector(`[data-field="${firstField}"]`)?.focus()
      return
    }

    const patternLabel =
      REPORT_PATTERN_OPTIONS.find((option) => option.value === values.patternType)?.label ??
      values.patternType

    const subject = `Dark Pattern Report: ${values.website} — ${patternLabel}`
    const body = [
      `Website or app: ${values.website}`,
      `Pattern type: ${patternLabel}`,
      "",
      "Description:",
      values.description,
      "",
      "Impact:",
      values.impact || "(not provided)",
      "",
      `Reporter email: ${values.email || "(not provided)"}`,
      "",
      "Submitted via darkpatterns.info",
    ].join("\n")

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    setSubmitted(true)
    setValues(EMPTY_FORM)
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="container py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Contribute"
        title="Report a dark pattern"
        description="Reports build the public record and feed the detector's training data. A screenshot and the exact wording help more than anything else."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Status region — announced to assistive tech, never silently swapped out */}
          <div aria-live="polite" className="empty:hidden">
            {submitted ? (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-safe/40 bg-safe-soft p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safe" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Report ready to send</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Your email client should have opened with the report filled in. Attach any
                    screenshots before sending. If nothing opened, email{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    directly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setSubmitted(false)}
                  >
                    Report another
                  </Button>
                </div>
              </div>
            ) : null}

            {errorCount > 0 ? (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-danger/40 bg-danger-soft p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">
                    {errorCount} {errorCount === 1 ? "field needs" : "fields need"} attention.
                  </span>{" "}
                  The details are marked below.
                </p>
              </div>
            ) : null}
          </div>

          <Card>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <CardHeader>
                <CardTitle className="font-display text-xl">Report form</CardTitle>
                <CardDescription className="leading-relaxed">
                  Fields marked with an asterisk are required. The report opens in your own email
                  client — nothing is transmitted from this page.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website">
                    Website or app <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="website"
                    data-field="website"
                    name="website"
                    placeholder="example.com, or the app's name"
                    value={values.website}
                    onChange={(event) => setField("website", event.target.value)}
                    aria-invalid={Boolean(errors.website)}
                    aria-describedby={errors.website ? "website-error" : undefined}
                    className={cn(errors.website && "border-danger focus-visible:ring-danger")}
                  />
                  <FieldError id="website-error" message={errors.website} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternType">
                    Type of dark pattern <span className="text-danger">*</span>
                  </Label>
                  <Select
                    value={values.patternType}
                    onValueChange={(value) => setField("patternType", value)}
                  >
                    <SelectTrigger
                      id="patternType"
                      data-field="patternType"
                      aria-invalid={Boolean(errors.patternType)}
                      aria-describedby={errors.patternType ? "patternType-error" : undefined}
                      className={cn(errors.patternType && "border-danger focus:ring-danger")}
                    >
                      <SelectValue placeholder="Select the closest match" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupedOptions.map(([group, options]) => (
                        <SelectGroup key={group}>
                          <SelectLabel>{group}</SelectLabel>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError id="patternType-error" message={errors.patternType} />
                  <p className="text-sm text-muted-foreground">
                    Not sure?{" "}
                    <Link href="/types" className="text-primary underline underline-offset-4">
                      Browse the taxonomy
                    </Link>
                    .
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    What happened <span className="text-danger">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    data-field="description"
                    name="description"
                    rows={5}
                    placeholder="Where you found it, the exact wording you saw, and what you expected instead."
                    value={values.description}
                    onChange={(event) => setField("description", event.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "description-error" : "description-hint"}
                    className={cn(errors.description && "border-danger focus-visible:ring-danger")}
                  />
                  {errors.description ? (
                    <FieldError id="description-error" message={errors.description} />
                  ) : (
                    <p id="description-hint" className="text-sm text-muted-foreground">
                      Quoting the exact text is the single most useful thing you can include.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact">
                    Impact <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="impact"
                    data-field="impact"
                    name="impact"
                    rows={3}
                    placeholder="Did it cost you money or time? Did it share data you did not intend to share?"
                    value={values.impact}
                    onChange={(event) => setField("impact", event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Your email <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="email"
                    data-field="email"
                    name="email"
                    type="email"
                    placeholder="Only used for follow-up questions"
                    value={values.email}
                    onChange={(event) => setField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(errors.email && "border-danger focus-visible:ring-danger")}
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>

                <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      data-field="consent"
                      checked={values.consent}
                      // Radix passes a boolean (or "indeterminate"), never an event.
                      onCheckedChange={(checked) => setField("consent", checked === true)}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className={cn("mt-0.5", errors.consent && "border-danger")}
                    />
                    <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                      I consent to this report being stored in the public dark patterns database.
                      Personal details will be removed before publication. <span className="text-danger">*</span>
                    </Label>
                  </div>
                  <FieldError id="consent-error" message={errors.consent} />
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-info/30 bg-info-soft p-4 text-sm leading-relaxed">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
                  <span>
                    Submitting opens your own email client with the report pre-filled and addressed
                    to <strong>{CONTACT_EMAIL}</strong>. Attach screenshots there before sending.
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Prepare report email
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader className="gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-safe-soft text-safe">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <CardTitle className="font-display text-lg">Why report?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {[
                  "Helps others recognise the same trick",
                  "Feeds public research on deceptive design",
                  "Adds pressure toward ethical defaults",
                  "Supports regulatory action where it applies",
                  "Improves the SLAG detector's training data",
                ].map((reason) => (
                  <li key={reason} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe" aria-hidden="true" />
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">What happens next</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                {[
                  "We read the report and check the site ourselves.",
                  "The pattern is categorised against the taxonomy.",
                  "Verified examples are added to the database.",
                  "Clear violations get referred to the relevant regulator.",
                ].map((stepText, index) => (
                  <li key={stepText} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground">{stepText}</span>
                  </li>
                ))}
              </ol>
              <Button asChild variant="outline" className="mt-5 w-full">
                <Link href="/extension">Learn about the extension</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
