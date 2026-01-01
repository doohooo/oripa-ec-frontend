import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const base = process.env.KOMOJU_API_BASE || "https://komoju.com/api/v1";
  const secret = process.env.KOMOJU_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "KOMOJU_SECRET_KEY is not set" },
      { status: 500 }
    );
  }

  const auth = Buffer.from(`${secret}:`).toString("base64");

  const url = `${base}/payments?per_page=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    body: text.slice(0, 500),
  });
}
