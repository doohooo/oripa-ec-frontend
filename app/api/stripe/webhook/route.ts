import Stripe from "stripe"
import { NextResponse } from "next/server"
import { markOrderPaid, markOrderFailed } from "@/lib/orders"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set" }, { status: 500 })
  }
  if (!webhookSecret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not set" }, { status: 500 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" })

  const rawBody = await req.text()
  const sig = req.headers.get("stripe-signature")
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err?.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent
        const orderNo = (pi.metadata?.order_no || "") as string
        if (orderNo) markOrderPaid(orderNo)
        break
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent
        const orderNo = (pi.metadata?.order_no || "") as string
        const reason =
          pi.last_payment_error?.message ||
          pi.last_payment_error?.code ||
          "payment_failed"
        if (orderNo) markOrderFailed(orderNo, reason)
        break
      }

      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Webhook handler failed" }, { status: 500 })
  }
}
