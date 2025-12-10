// src/app/admin/payments/page.tsx

export default function AdminPaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* ヘッダー */}
        <section className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Admin
          </p>
          <h1 className="text-2xl font-bold text-slate-50">
            Payment provider configuration (Demo)
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            This page is a configuration mock for AsiaPay / Silkpay integration.
            In the production environment, these values will be managed via
            environment variables and secure admin tools, not from this screen.
          </p>
        </section>

        {/* AsiaPay ブロック */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-slate-50">
            AsiaPay settings (demo)
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            These fields show how AsiaPay configuration is conceptually managed.
            Actual values will be stored in environment variables such as
            <code className="ml-1">ASIAPAY_MERCHANT_ID</code>.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Merchant ID (ENV: ASIAPAY_MERCHANT_ID)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                placeholder="merchant-id-from-asiapay-dashboard"
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                API Key / Secret (ENV: ASIAPAY_API_KEY, ASIAPAY_API_SECRET)
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                value="************"
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Payment redirect URL (front-end)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100"
                value="/checkout/success?orderId={ORDER_ID}"
                readOnly
              />
              <p className="mt-1 text-xs text-slate-500">
                In production, AsiaPay will redirect the user to this URL after
                payment is completed, with the order ID or transaction status.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Server callback URL (backend)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100"
                value="https://your-domain.com/api/payments/asiapay/callback"
                readOnly
              />
              <p className="mt-1 text-xs text-slate-500">
                AsiaPay will call this URL from their server to notify the final
                payment result. The OripaEC backend will verify the signature
                and update the order status.
              </p>
            </div>
          </div>
        </section>

        {/* Silkpay ブロック */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-slate-50">
            Silkpay settings (demo)
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Silkpay configuration will follow a similar pattern and will also be
            managed via environment variables.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                App ID / Merchant ID (ENV: SILKPAY_APP_ID)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                placeholder="app-id-from-silkpay-portal"
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                API Key / Secret (ENV: SILKPAY_API_KEY, SILKPAY_API_SECRET)
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                value="************"
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Server callback URL (backend)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100"
                value="https://your-domain.com/api/payments/silkpay/callback"
                readOnly
              />
              <p className="mt-1 text-xs text-slate-500">
                Silkpay will notify payment results to this URL. OripaEC will
                verify the data and mark the order as paid or failed.
              </p>
            </div>
          </div>
        </section>

        {/* 環境変数のサマリー */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-xs text-slate-300">
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Environment variables (planned)
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>ASIAPAY_MERCHANT_ID</li>
            <li>ASIAPAY_API_KEY / ASIAPAY_API_SECRET</li>
            <li>SILKPAY_APP_ID</li>
            <li>SILKPAY_API_KEY / SILKPAY_API_SECRET</li>
            <li>PAYMENTS_ENV (e.g. &quot;sandbox&quot; / &quot;production&quot;)</li>
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            In the MVP demo, these values are not editable from the UI and will
            be managed from server-side configuration. This page is designed to
            help payment providers understand how OripaEC will integrate with
            AsiaPay / Silkpay.
          </p>
        </section>
      </div>
    </main>
  );
}
