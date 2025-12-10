import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    success: true,
    orderId: "demo-order-123",
    message: "Order created successfully (demo).",
    body,
  });
}
