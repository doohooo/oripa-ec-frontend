import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const amount = Number(body?.amount ?? 0)

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const secretKey = process.env.KOMOJU_SECRET_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!secretKey || !appUrl) {
      return NextResponse.json({ error: "Missing env vars" }, { status: 500 })
    }

    // KOMOJU Session Create:
    // POST https://komoju.com/api/v1/sessions  [oai_citation:6‡KOMOJU Doc (日本語)](https://ja.doc.komoju.com/docs/creating-payments-directly?utm_source=chatgpt.com)
    const res = await fetch("https://komoju.com/api/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Basic Auth: username = secret key, password empty  [oai_citation:7‡KOMOJU Doc (English)](https://doc.komoju.com/docs/authentication)
        Authorization: "Basic " + Buffer.from(`${secretKey}:`).toString("base64"),
        // 任意：API version固定（KOMOJU側で推奨がある場合に合わせる）
        // "X-KOMOJU-API-VERSION": "2024-07-15",
      },
      body: JSON.stringify({
        amount: Math.round(amount), // smallest unit (JPYなら円、USDならセント)  [oai_citation:8‡KOMOJU Doc (日本語)](https://ja.doc.komoju.com/docs/creating-payments-directly?utm_source=chatgpt.com)
        currency: "USD",
        return_url: `${appUrl}/checkout/return`,
        // 決済成功後に戻すURL（あなたのサイト内）
        redirect_url: `${appUrl}/checkout/success`,
        // 任意：審査用に外部注文番号を入れておくと説明しやすい
        payment_data: {
          external_order_num: `demo_${Date.now()}`,
        },
      }),
    })

    const json = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: "KOMOJU error", details: json }, { status: 502 })
    }

    return NextResponse.json({
      sessionId: json.id,
      paymentMethods: json.payment_methods ?? [],
    })
  } catch (e: any) {
    return NextResponse.json({ error: "Server error", message: e?.message ?? "Unknown" }, { status: 500 })
  }
}
