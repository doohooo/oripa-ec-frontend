"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
  amountUsd: number;
  quantity: number;
};

export function CheckoutPaymentButton({ slug, amountUsd, quantity }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          quantity,
          amountUsd,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setStatus("API error: " + (data?.message ?? "Unknown error"));
        return;
      }

      const orderId: string = data.orderId ?? "demo-order-123";

      // ステータス表示（審査官向けログ）
      setStatus(
        `Demo order created: ${orderId}. In production, this ID will be used to start AsiaPay / Silkpay payment.`
      );

      // 成功画面へリダイレクト
      router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
    } catch (err) {
      setStatus("Network error while calling demo API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-md shadow-sky-900/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {loading ? "Creating demo order..." : "Continue to payment (Demo)"}
      </button>
      <p className="text-xs text-slate-400">
        This button calls a demo API endpoint (
        <code>/api/checkout/create-order</code>) and does not trigger any real
        transaction. In production, this step will prepare redirect parameters
        for AsiaPay / Silkpay.
      </p>
      {status && (
        <p className="text-xs text-sky-300">
          {status}
        </p>
      )}
    </div>
  );
}
