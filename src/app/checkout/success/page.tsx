// src/app/checkout/success/page.tsx
type PageProps = {
  searchParams?: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  // Next.js 16: searchParams は Promise
  const sp = (await searchParams) ?? {};
  const orderId = sp.orderId ?? "demo-order-123";

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* タイトル */}
        <section className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
            Checkout
          </p>
          <h1 className="text-2xl font-bold text-slate-50">
            Order created (Demo)
          </h1>
          <p className="text-sm text-slate-300">
            This is a demo success page for the OripaEC MVP. No actual payment
            has been processed. In the production environment, this page will be
            shown after returning from the AsiaPay / Silkpay hosted payment
            page.
          </p>
        </section>

        {/* オーダー情報 */}
        <section className="mb-8 rounded-2xl border border-emerald-700/70 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-200">
            Your demo order ID is:
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {orderId}
          </p>
          <p className="mt-3 text-xs text-slate-400">
            In the live system, this ID will be used to look up your payment
            status and shipping information.
          </p>
        </section>

        {/* 次のアクション */}
        <section className="space-y-3 text-sm text-slate-200">
          <h2 className="text-base font-semibold text-slate-50">
            Next steps (MVP demo)
          </h2>
          <p className="text-sm text-slate-300">
            During the MVP phase, this page is used only to demonstrate the
            checkout flow for payment providers and internal review. After
            AsiaPay / Silkpay integration is completed, this page will confirm
            the final payment result (success / failure) and show links to order
            history and tracking details.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-sky-900/40 transition hover:bg-sky-400"
            >
              Back to shop
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-500 hover:text-sky-300"
            >
              Back to home
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
