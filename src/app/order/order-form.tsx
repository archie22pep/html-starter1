"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  STREAMS,
  TIERS,
  WEB3FORMS_KEY,
  formatAud,
  getTier,
  type StreamKey,
} from "@/lib/products";
import { CheckIcon } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Step = 1 | 2 | 3;

const fieldLabel = "text-[11.5px] font-bold tracking-[0.09em] text-ink uppercase";
const fieldInput = "min-h-11 bg-paper text-[15px] focus-visible:bg-white";

export function OrderForm({
  initialStream,
  initialTier,
}: {
  initialStream?: string;
  initialTier?: string;
}) {
  const router = useRouter();
  const validInitialTier = getTier(initialTier ?? "");
  const [step, setStep] = useState<Step>(1);
  const [stream, setStream] = useState<StreamKey>(
    validInitialTier?.stream ??
      (initialStream === "development" ? "development" : "purchase"),
  );
  const [tierKey, setTierKey] = useState<string | null>(validInitialTier?.key ?? null);
  const [address, setAddress] = useState("");
  const [concern, setConcern] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = tierKey ? getTier(tierKey) : undefined;
  const streamTiers = useMemo(() => TIERS.filter((t) => t.stream === stream), [stream]);

  function next() {
    setError(null);
    if (step === 1 && !tier) {
      setError("Select a report to continue.");
      return;
    }
    if (step === 2 && !address.trim()) {
      setError("Enter the property address to continue.");
      return;
    }
    setStep((s) => Math.min(3, s + 1) as Step);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!tier) return;
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
            subject: `New Report Order: ${STREAMS[tier.stream].name} · ${tier.name}`,
            message: [
              `Property Address: ${address.trim()}`,
              `Stream: ${STREAMS[tier.stream].name}`,
              `Report: ${tier.name} (${formatAud(tier.price)})`,
              auctionDate ? `Auction / deadline: ${auctionDate}` : "",
              "",
              "Main concern:",
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

      // 2. Checkout routing.
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
        <ol className="mb-8 flex items-center gap-2" aria-label="Order progress">
          {(["Report", "Property", "Your details"] as const).map((label, i) => {
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
                {n < 3 && <span className="h-px flex-1 bg-line" aria-hidden="true" />}
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

        {/* STEP 1: report */}
        {step === 1 && (
          <fieldset>
            <legend className={`${fieldLabel} mb-2 block`}>1 of 3: choose your report</legend>
            <RadioGroup
              value={stream}
              onValueChange={(v) => {
                setStream(v as StreamKey);
                setTierKey(null);
              }}
              className="mb-5 grid grid-cols-2 gap-3"
              aria-label="Report stream"
            >
              {Object.values(STREAMS).map((s) => (
                <label
                  key={s.key}
                  className={`cursor-pointer rounded-md border p-4 text-center transition-colors focus-within:ring-2 focus-within:ring-ring/40 ${
                    stream === s.key
                      ? "border-primary bg-primary-weak"
                      : "border-line-strong bg-paper hover:border-primary"
                  }`}
                >
                  <span className="sr-only">
                    <RadioGroupItem value={s.key} />
                  </span>
                  <span className="block text-[13.5px] font-bold text-ink">{s.name}</span>
                  <span className="mt-0.5 block text-[11.5px] text-muted-foreground">
                    {s.audience}
                  </span>
                </label>
              ))}
            </RadioGroup>
            <RadioGroup
              value={tierKey ?? ""}
              onValueChange={(v) => setTierKey(v as string)}
              className="flex flex-col gap-2.5"
              aria-label="Report tier"
            >
              {streamTiers.map((t) => (
                <label
                  key={t.key}
                  className={`flex cursor-pointer items-center gap-3.5 rounded-md border px-4 py-3.5 transition-colors ${
                    tierKey === t.key
                      ? "border-primary bg-primary-weak"
                      : "border-line-strong bg-paper hover:border-primary"
                  }`}
                >
                  <RadioGroupItem value={t.key} />
                  <span className="flex-1 text-left">
                    <span className="block text-[14px] font-bold text-ink">
                      {t.name}
                      {t.popular && (
                        <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="block text-[12px] text-muted-foreground">{t.turnaround}</span>
                  </span>
                  <span className="lining font-serif text-xl font-semibold text-ink">
                    {formatAud(t.price)}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>
        )}

        {/* STEP 2: property */}
        {step === 2 && (
          <fieldset className="flex flex-col gap-5">
            <legend className={`${fieldLabel} mb-2 block`}>2 of 3: about the property</legend>
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
                Main area of concern{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="concern"
                className={`${fieldInput} min-h-28 resize-y`}
                placeholder="e.g. I'm worried about flood risk and whether the block can be subdivided"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              />
            </div>
            <div>
              <Label className={`${fieldLabel} mb-2`} htmlFor="deadline">
                Auction or deadline date{" "}
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

        {/* STEP 3: contact */}
        {step === 3 && (
          <fieldset className="flex flex-col gap-5">
            <legend className={`${fieldLabel} mb-2 block`}>3 of 3: where do we send it?</legend>
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
            <div className="rounded-md border border-success/25 bg-success-weak p-4 text-[13px] leading-relaxed text-body">
              <strong className="text-ink">Revision &amp; money-back guarantee.</strong> If your
              report doesn&rsquo;t address what you asked, we revise it free. Still not satisfied
              with your first order? Full refund.
            </div>
          </fieldset>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
              className="min-h-11 cursor-pointer border-line-strong bg-white px-5 text-[14px] font-bold text-ink hover:border-ink hover:bg-white"
            >
              ← Back
            </Button>
          ) : (
            <span />
          )}
          {step < 3 ? (
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
              {submitting ? "Submitting…" : "Continue to secure payment →"}
            </Button>
          )}
        </div>

        <p className="mt-5 text-center text-[11.5px] leading-relaxed text-muted-foreground">
          Secure checkout via Stripe · 256-bit SSL. By submitting you agree to our{" "}
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
          Your order
        </p>
        {tier ? (
          <>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-bold text-ink">{tier.name}</span>
              <span className="lining font-serif text-lg font-semibold text-ink">
                {formatAud(tier.price)}
              </span>
            </div>
            <p className="mb-3 text-[12px] text-muted-foreground">
              {STREAMS[tier.stream].name} · {tier.turnaround}
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
        ) : (
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">
            Select a report to see your order summary.
          </p>
        )}
        <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
          {["Fixed fee, no subscription", "Delivered to your inbox", "Confidential"].map((t) => (
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
