// src/app/api/checkout/create-order/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// ログを書けるように Node.js ランタイムを明示
export const runtime = "nodejs";

type CreateOrderRequest = {
  slug?: string;
  quantity?: number;
  amountUsd?: number;
};

// ログ保存用のパス（プロジェクト直下の .data/orders.log）
const LOG_DIR = path.join(process.cwd(), ".data");
const LOG_FILE = path.join(LOG_DIR, "orders.log");

async function appendOrderLog(entry: unknown) {
  try {
    // フォルダがなければ作成
    await fs.mkdir(LOG_DIR, { recursive: true });
    // 1行ごとに JSON を追記
    const line =
      JSON.stringify({
        ...((entry as object) ?? {}),
        ts: new Date().toISOString(),
      }) + "\n";

    await fs.appendFile(LOG_FILE, line, "utf8");
  } catch (err) {
    // ログ失敗しても API 自体はエラーにしない
    console.error("Failed to write order log", err);
  }
}

export async function POST(req: Request) {
  let payload: CreateOrderRequest | null = null;

  try {
    payload = await req.json();
  } catch {
    // JSON じゃない場合はそのまま進む（デモなので厳密にしない）
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

  // デモ用の疑似オーダーID（固定でOKという方針）
  const demoOrderId = "demo-order-123";

  // ログに残したい情報をまとめる
  const logEntry = {
    orderId: demoOrderId,
    slug,
    quantity,
    amountUsd,
    ts: new Date().toISOString(),
  };

  // 非同期でログ書き込み（失敗しても API は成功で返す）
  await appendOrderLog(logEntry);

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
