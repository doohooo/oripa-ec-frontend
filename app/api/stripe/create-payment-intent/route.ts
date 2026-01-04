import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createOrder, attachPaymentIntent } from "@/lib/orders"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set" }, { status: 500 })
    }

    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" })

    const body = await req.json()
    const amount = Number(body?.amount) // cents
    const currency = (body?.currency || "usd") as Stripe.PaymentIntentCreateParams.Currency

    if (!amount || Number.isNaN(amount) || amount < 50) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // 1) DBに注文作成
    const order = createOrder({ amount, currency })

    // 2) PaymentIntent作成（order_noをmetadataに入れる）
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { order_no: order.order_no },
    })

    // 3) PaymentIntent id を orders に紐付け（status pending）
    attachPaymentIntent(order.order_no, intent.id)

    return NextResponse.json({
      clientSecret: intent.client_secret,
      orderNo: order.order_no,
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to create payment intent" },
      { status: 500 }
    )
  }
}
