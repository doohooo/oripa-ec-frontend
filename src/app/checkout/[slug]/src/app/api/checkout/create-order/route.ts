// src/app/api/checkout/create-order/route.ts
import { NextResponse } from "next/server";

type CreateOrderRequest = {
  slug?: string;
  quantity?: number;
  amountUsd?: number;
};

export async function POST(req: Request) {
  let payload: CreateOrderRequest | null = null;

  try {
    payload = await req.json();
  } catch {
    // JSON でない場合は null のまま（デモなので厳密にチェックしない）
  }

  const slug = payload?.slug ?? "unknown-product";
  const quantity =
    typeof payload?.quantity === "number" && payload.quantity > 0
      ? payload.quantity
      : 1;
  const amountUsd =
    typeof payload?.amountUsd === "number" && payload.amountUsd > 0
      ? payload.amountUsd
      : 0;

  // デモ用の疑似オーダーID（本番ではDB保存や外部API連携を行う）
  const demoOrderId = `demo-${slug}-${Date.now()}`;

  return NextResponse.json(
    {
      success: true,
      orderId: demoOrderId,
      slug,
      quantity,
      amountUsd,
      message:
        "Demo order created. In production this endpoint will create an order record and prepare redirect information for AsiaPay / Silkpay.",
    },
    { status: 200 }
  );
}
