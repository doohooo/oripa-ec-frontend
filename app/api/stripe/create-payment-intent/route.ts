import Stripe from "stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set" }, { status: 500 })
    }

    // ✅ ここで初期化（ビルド時に new Stripe されない）
    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    })

    const body = await req.json()
    const amount = Number(body?.amount) // cents
    const currency = (body?.currency || "usd") as Stripe.PaymentIntentCreateParams.Currency
    const metadata = (body?.metadata || {}) as Record<string, string>

    if (!amount || Number.isNaN(amount) || amount < 50) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata,
    })

    return NextResponse.json({ clientSecret: intent.client_secret })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to create payment intent" },
      { status: 500 }
    )
  }
}
