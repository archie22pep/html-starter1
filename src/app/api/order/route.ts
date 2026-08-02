import { NextResponse } from "next/server";
import Stripe from "stripe";
import { STREAMS, formatAud, getTier } from "@/lib/products";

/**
 * Order intake.
 *
 * 1. Lead capture: the browser submits the brief to Web3Forms directly
 *    (their free plan rejects server-origin calls) and reports the result
 *    via `leadOk`. If WEB3FORMS_ACCESS_KEY is set (Pro plan / whitelisted
 *    server IP), this route re-attempts capture server-side as a backstop.
 * 2. Checkout routing:
 *    - STRIPE_SECRET_KEY set -> dynamic Stripe Checkout Session that carries
 *      the brief in its metadata.
 *    - otherwise -> the tier's live Stripe Payment Link.
 */

interface OrderBody {
  tierKey: string;
  address: string;
  concern?: string;
  auctionDate?: string;
  name: string;
  email: string;
  /** Whether the browser's direct Web3Forms submission succeeded. */
  leadOk?: boolean;
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as OrderBody | null;
  if (!body) return bad("Invalid request.");

  const {
    tierKey,
    address,
    concern = "",
    auctionDate = "",
    name,
    email,
    leadOk: clientLeadOk = false,
  } = body;
  const tier = getTier(tierKey);
  if (!tier) return bad("Unknown report tier.");
  // Enquiry-only streams (development) never take payment; those briefs go
  // straight to Web3Forms from the browser and never reach this route.
  if (STREAMS[tier.stream].enquiryOnly) return bad("This report is quoted by enquiry.");
  if (!name?.trim() || !address?.trim()) return bad("Name and property address are required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "")) return bad("A valid email is required.");

  const stream = STREAMS[tier.stream];
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  // --- 1. Lead capture backstop -----------------------------------------
  let leadOk = clientLeadOk;
  const serverKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!leadOk && serverKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: serverKey,
          name: name.trim(),
          email: email.trim(),
          subject: `New Report Order: ${stream.name} · ${tier.name}`,
          message: [
            `Property Address: ${address.trim()}`,
            `Stream: ${stream.name}`,
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
      leadOk = res.ok && (await res.json()).success === true;
    } catch {
      leadOk = false;
    }
  }

  // With Payment Links the lead email is the only record of the brief, so
  // it must exist before we send the client off to pay.
  if (!leadOk && !stripeKey) {
    return bad(
      "We couldn't submit your order just now. Please try again, or email your brief to hello@precursorproperty.com.au.",
      502,
    );
  }

  // --- 2. Checkout routing ---------------------------------------------
  if (stripeKey) {
    try {
      const stripe = new Stripe(stripeKey);
      const origin =
        req.headers.get("origin") ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://www.precursorproperty.com";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "aud",
              unit_amount: tier.price,
              product_data: {
                name: `${stream.name}: ${tier.name}`,
                description: `Property: ${address.trim().slice(0, 200)}`,
              },
            },
          },
        ],
        customer_email: email.trim(),
        success_url: `${origin}/order/thanks?mode=paid`,
        cancel_url: `${origin}/order?tier=${tier.key}`,
        metadata: {
          tier: tier.key,
          address: address.trim().slice(0, 450),
          auctionDate: auctionDate.slice(0, 40),
          concern: concern.trim().slice(0, 450),
        },
      });
      return NextResponse.json({ mode: "stripe", url: session.url });
    } catch (err) {
      console.error("Stripe session failed:", err);
      if (leadOk) return NextResponse.json({ mode: "link", url: tier.stripeLink });
      return bad("Checkout is temporarily unavailable. Please try again shortly.", 502);
    }
  }

  return NextResponse.json({ mode: "link", url: tier.stripeLink });
}
