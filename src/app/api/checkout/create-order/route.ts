// src/app/api/checkout/create-order/route.ts
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Explicitly use Node.js runtime (required for fs access)
export const runtime = "nodejs"

type CreateOrderRequest = {
  slug?: string
  quantity?: number
  amountUsd?: number
}

// Log storage paths (project_root/.data/orders.log)
const LOG_DIR = path.join(process.cwd(), ".data")
const LOG_FILE = path.join(LOG_DIR, "orders.log")

async function appendOrderLog(entry: unknown) {
  try {
    // Ensure log directory exists
    await fs.mkdir(LOG_DIR, { recursive: true })

    // Append one JSON line per order
    const line =
      JSON.stringify({
        ...(typeof entry === "object" && entry !== null ? entry : {}),
        ts: new Date().toISOString(),
      }) + "\n"

    await fs.appendFile(LOG_FILE, line, "utf8")
  } catch (err) {
    // Logging failure should not break the API
    console.error("Failed to write order log", err)
  }
}

export async function POST(req: Request) {
  let payload: CreateOrderRequest | null = null

  try {
    payload = await req.json()
  } catch {
    // If request body is not valid JSON, continue with defaults
  }

  const slug = payload?.slug ?? "unknown-product"

  const quantity =
    typeof payload?.quantity === "number" && payload.quantity > 0
      ? payload.quantity
      : 1

  const amountUsd =
    typeof payload?.amountUsd === "number" && payload.amountUsd > 0
      ? payload.amountUsd
      : 0

  // Write a simple order log (demo / audit purpose)
  await appendOrderLog({
    slug,
    quantity,
    amountUsd,
    source: "checkout",
  })

  // Demo response (will be replaced by KOMOJU Order API integration)
  return NextResponse.json({
    success: true,
    order: {
      slug,
      quantity,
      amountUsd,
    },
  })
}
