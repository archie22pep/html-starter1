import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Precursor Property collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container className="prose-legal max-w-3xl">
        <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
          Legal
        </p>
        <h1 className="mb-3 font-serif text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="mb-8 rounded-md border border-primary/25 bg-primary-weak p-4 text-[14px] font-semibold text-ink">
          This policy explains how Precursor Property collects and uses your personal
          information.
        </div>

        <div className="flex flex-col gap-6 text-[14.5px] leading-relaxed text-body">
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-[0.09em] text-ink uppercase">
              Information we collect
            </h2>
            <p>
              When you submit an order form, we collect your name, email address, and property
              address. We do not collect payment card details; all payments are processed
              directly by Stripe, Inc. under their own privacy policy.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-[0.09em] text-ink uppercase">
              How we use your information
            </h2>
            <ul className="list-disc pl-5">
              <li>To deliver your report to the email address you provide</li>
              <li>To communicate with you about your order</li>
              <li>To improve our service</li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-[0.09em] text-ink uppercase">
              Data storage &amp; security
            </h2>
            <p>
              Your information is stored securely. We retain order records for a period of 7
              years in accordance with Australian tax and business obligations, after which they
              are securely deleted.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-[0.09em] text-ink uppercase">Contact</h2>
            <p>
              For any privacy-related enquiries, contact us at hello@precursorproperty.com.au.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
