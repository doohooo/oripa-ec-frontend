import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // ✅ 型エラーを避けたいなら apiVersion を指定しないのが安全
  // apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any))

    // ✅ クライアントから amountCents(int) を受け取る
    const amountCentsRaw = body?.amountCents
    const amountCents = Number(amountCentsRaw)

    // Stripeは「整数」「>0」「最低金額」などが必要
    if (!Number.isFinite(amountCents) || !Number.isInteger(amountCents) || amountCents < 50) {
      return Response.json(
        { error: "Invalid amountCents. Must be an integer >= 50." },
        { status: 400 }
      )
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    })

    return Response.json({ clientSecret: intent.client_secret })
  } catch (err: any) {
    return Response.json(
      { error: err?.message ?? "Failed to create PaymentIntent" },
      { status: 500 }
    )
  }
}
