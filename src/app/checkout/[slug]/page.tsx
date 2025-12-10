// src/app/checkout/[slug]/page.tsx
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { CheckoutPaymentButton } from "@/components/CheckoutPaymentButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    qty?: string;
  }>;
};

export default async function CheckoutPage({ params, searchParams }: PageProps) {
  // Next.js 16: params / searchParams は Promise
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const rawQty = sp.qty ?? "1";
  const parsed = Number.parseInt(rawQty, 10);
  const quantity = Number.isNaN(parsed) || parsed <= 0 ? 1 : parsed;

  const subtotal = product.priceUsd * quantity;

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* 戻る */}
        <div className="mb-4 text-sm">
          <a
            href={`/products/${product.slug}`}
            className="text-sky-400 hover:text-sky-300 hover:underline"
          >
            ← Back to product
          </a>
        </div>

        {/* タイトル */}
        <section className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Checkout (Demo)
          </p>
          <h1 className="text-2xl font-bold text-slate-50">
            Order summary
          </h1>
          <p className="text-sm text-slate-300">
            This is a demo checkout page for AsiaPay / Silkpay integration.
            No real payment will be charged in the MVP phase.
          </p>
        </section>

        {/* 注文サマリー */}
        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex flex-col gap-3 text-sm text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-slate-400">
                  Category: {product.category} · Stock: {product.stock}
                </p>
              </div>
              <div className="text-right text-sky-300">
                ${product.priceUsd.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-3 text-sm font-semibold">
              <span>Total (USD)</span>
              <span className="text-sky-300">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* 決済説明 */}
        <section className="mb-6 space-y-3 text-sm text-slate-200">
          <h2 className="text-base font-semibold text-slate-50">
            Next step: payment via AsiaPay / Silkpay
          </h2>
          <p className="text-sm text-slate-300">
            In the live version, clicking the button below will create an order
            on OripaEC, then redirect you to a secure payment page provided by
            AsiaPay / Silkpay. Supported methods may include UnionPay, major
            credit cards, and QR-based payments (depending on the final
            configuration and region).
          </p>
        </section>

        {/* 決済ボタン（デモ・クライアントコンポーネント） */}
        <section className="space-y-2">
          <CheckoutPaymentButton
            slug={product.slug}
            amountUsd={subtotal}
            quantity={quantity}
          />
        </section>
      </div>
    </main>
  );
}
