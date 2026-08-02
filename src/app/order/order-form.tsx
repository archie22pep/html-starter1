"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REPORT_TIER, STREAMS, WEB3FORMS_KEY, formatAud } from "@/lib/products";
import { CheckIcon } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Step = 1 | 2;
export type OrderMode = "order" | "enquiry";

const fieldLabel = "text-[11.5px] font-bold tracking-[0.09em] text-ink uppercase";
const fieldInput = "min-h-11 bg-paper text-[15px] focus-visible:bg-white";

/**
 * Two modes, one shell:
 * - "order": the single Full Due Diligence report. Brief -> Web3Forms,
 *   checkout -> /api/order -> Stripe.
 * - "enquiry": Development Intelligence. Brief -> Web3Forms only, no payment;
 *   we reply with a scoped fixed quote.
 */
export function OrderForm({ mode = "order" }: { mode?: OrderMode }) {
  const router = useRouter();
  const enquiry = mode === "enquiry";
  const tier = REPORT_TIER;

  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState("");
  const [concern, setConcern] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function next() {
    setError(null);
    if (step === 1 && !address.trim()) {
      setError("Enter the property address to continue.");
      return;
    }
    setStep(2);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter your name and a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      // 1. Lead capture. Web3Forms only accepts browser-origin submissions
      //    on its free plan, so the brief is sent from here.
      let leadOk = false;
      try {
        const leadRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: name.trim(),
            email: email.trim(),
            subject: enquiry
              ? "New Development Enquiry"
              : `New Report Order: ${STREAMS.purchase.name} · ${tier.name}`,
            message: [
              `Property Address: ${address.trim()}`,
              enquiry
                ? "Type: Development Intelligence enquiry (quote to be scoped)"
                : `Report: ${tier.name} (${formatAud(tier.price)})`,
              auctionDate ? `Auction / deadline: ${auctionDate}` : "",
              "",
              enquiry ? "What they're exploring:" : "Main concern:",
              concern.trim() || "(none provided)",
            ]
              .filter(Boolean)
              .join("\n"),
          }),
        });
        leadOk = leadRes.ok && (await leadRes.json()).success === true;
      } catch {
        leadOk = false;
      }

      if (enquiry) {
        if (!leadOk) {
          throw new Error(
            "We couldn't send your enquiry just now. Please try again, or email the address to hello@precursorproperty.com.au.",
          );
        }
        router.push("/order/thanks?mode=enquiry");
        return;
      }

      // 2. Checkout routing (order mode only).
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierKey: tier.key,
          address,
          concern,
          auctionDate,
          name,
          email,
          leadOk,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      router.push("/order/thanks?mode=invoice");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
      <form
        onSubmit={submit}
        className="rounded-[10px] border border-line-strong bg-white p-7 shadow-sm sm:p-9"
        noValidate
      >
        {/* Step indicator */}
        <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
          {(["Property", "Your details"] as const).map((label, i) => {
            const n = (i + 1) as Step;
            const state = n === step ? "current" : n < step ? "done" : "todo";
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => n < step && setStep(n)}
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                    state === "current"
                      ? "bg-primary text-white"
                      : state === "done"
                        ? "cursor-pointer bg-primary-weak text-primary"
                        : "border border-line-strong text-muted-foreground"
                  }`}
                  aria-current={state === "current" ? "step" : undefined}
                >
                  {state === "done" ? <CheckIcon className="size-3.5" /> : n}
                </button>
                <span
                  className={`hidden text-[12px] font-bold tracking-wide uppercase sm:block ${
                    state === "todo" ? "text-muted-foreground" : "text-ink"
                  }`}
                >
                  {label}
                </span>
                {n < 2 && <span className="h-px flex-1 bg-line" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-center text-[13.5px] font-semibold text-destructive"
          >
            {error}
          </p>
        )}

        {/* STEP 1: property */}
        {step === 1 && (
          <fieldset className="flex flex-col gap-5">
            <legend className={`${fieldLabel} mb-2 block`}>
              1 of 2: about the {enquiry ? "site" : "property"}
            </legend>
            <div>
              <Label className={`${fieldLabel} mb-2`} htmlFor="address">
                Property address
              </Label>
              <Input
                id="address"
                type="text"
                className={fieldInput}
                placeholder="123 Example St, Suburb VIC 3000"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className={`${fieldLabel} mb-2`} htmlFor="concern">
                {enquiry ? "What are you exploring?" : "Main area of concern"}{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="concern"
                className={`${fieldInput} min-h-28 resize-y`}
                placeholder={
                  enquiry
                    ? "e.g. Can this block take two townhouses? Is a granny flat feasible?"
                    : "e.g. I'm worried about flood risk and whether the price guide is realistic"
                }
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              />
            </div>
            <div>
              <Label className={`${fieldLabel} mb-2`} htmlFor="deadline">
                {enquiry ? "Any deadline?" : "Auction or deadline date"}{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="deadline"
                type="text"
                className={fieldInput}
                placeholder="e.g. Auction Saturday 14 June"
                value={auctionDate}
                onChange={(e) => setAuctionDate(e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {/* STEP 2: contact */}
        {step === 2 && (
          <fieldset className="flex flex-col gap-5">
            <legend className={`${fieldLabel} mb-2 block`}>
              2 of 2: where do we {enquiry ? "reply" : "send it"}?
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className={`${fieldLabel} mb-2`} htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  className={fieldInput}
                  placeholder="Your name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className={`${fieldLabel} mb-2`} htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className={fieldInput}
                  placeholder="you@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {enquiry ? (
              <div className="rounded-md border border-line bg-paper p-4 text-[13px] leading-relaxed text-body">
                <strong className="text-ink">No payment now.</strong> We&rsquo;ll reply within one
                business day with what we can research for this site and a fixed quote. You decide
                from there.
              </div>
            ) : (
              <div className="rounded-md border border-success/25 bg-success-weak p-4 text-[13px] leading-relaxed text-body">
                <strong className="text-ink">Revision &amp; money-back guarantee.</strong> If your
                report doesn&rsquo;t address what you asked, we revise it free. Still not satisfied
                with your first order? Full refund.
              </div>
            )}
          </fieldset>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="min-h-11 cursor-pointer border-line-strong bg-white px-5 text-[14px] font-bold text-ink hover:border-ink hover:bg-white"
            >
              ← Back
            </Button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <Button
              type="button"
              onClick={next}
              className="min-h-11 cursor-pointer px-6 text-[15px] font-bold hover:bg-primary-hover"
            >
              Continue →
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={submitting}
              className="min-h-11 cursor-pointer px-6 text-[15px] font-bold hover:bg-primary-hover"
            >
              {submitting
                ? "Submitting…"
                : enquiry
                  ? "Send enquiry →"
                  : "Continue to secure payment →"}
            </Button>
          )}
        </div>

        <p className="mt-5 text-center text-[11.5px] leading-relaxed text-muted-foreground">
          {enquiry ? "No payment is taken for enquiries. " : "Secure checkout via Stripe · 256-bit SSL. "}
          By submitting you agree to our{" "}
          <a href="/privacy" className="text-primary underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-primary underline">
            Terms of Service
          </a>
          . Reports are informational and not financial advice.
        </p>
      </form>

      {/* Summary rail */}
      <aside className="rounded-[10px] border border-line bg-cream p-6 lg:sticky lg:top-24">
        <p className="mb-4 text-[10.5px] font-bold tracking-[0.14em] text-primary uppercase">
          {enquiry ? "Your enquiry" : "Your order"}
        </p>
        {enquiry ? (
          <>
            <p className="mb-1 text-[14px] font-bold text-ink">Development Intelligence</p>
            <p className="mb-3 text-[12px] text-muted-foreground">
              Feasibility research, scoped to your site
            </p>
            <div className="flex items-baseline justify-between gap-3 border-t-2 border-ink pt-3">
              <span className="text-[12px] font-bold tracking-wider text-ink uppercase">
                To enquire
              </span>
              <span className="lining font-serif text-2xl font-semibold text-primary">Free</span>
            </div>
          </>
        ) : (
          <>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-bold text-ink">{tier.name}</span>
              <span className="lining font-serif text-lg font-semibold text-ink">
                {formatAud(tier.price)}
              </span>
            </div>
            <p className="mb-3 text-[12px] text-muted-foreground">
              {STREAMS.purchase.name} · {tier.turnaround}
            </p>
            <div className="flex items-baseline justify-between gap-3 border-t-2 border-ink pt-3">
              <span className="text-[12px] font-bold tracking-wider text-ink uppercase">
                Total
              </span>
              <span className="lining font-serif text-2xl font-semibold text-primary">
                {formatAud(tier.price)}
              </span>
            </div>
          </>
        )}
        <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
          {(enquiry
            ? ["Reply within one business day", "Fixed quote, no obligation", "Confidential"]
            : ["Fixed fee, no subscription", "Delivered to your inbox", "Confidential"]
          ).map((t) => (
            <li key={t} className="flex items-center gap-2 text-[12.5px] font-semibold text-body">
              <CheckIcon className="size-3.5 text-primary" />
              {t}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
