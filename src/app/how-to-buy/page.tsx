// src/app/how-to-buy/page.tsx

export default function HowToBuyPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <section className="mb-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Guide
          </p>
          <h1 className="text-3xl font-bold text-slate-50">
            How to Buy &amp; Sell Cards on OripaEC
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            This page explains how overseas users can buy Pokémon cards and how
            the future buyback / trade-in system will work. All prices on
            OripaEC are shown in USD, and payments will be processed safely via
            AsiaPay / Silkpay.
          </p>
        </section>

        {/* How to buy */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">1. How to buy</h2>
          <ol className="space-y-3 text-sm text-slate-200">
            <li>
              <span className="font-semibold text-sky-300">Step 1 – Browse</span>
              <br />
              Go to the{" "}
              <a href="/products" className="text-sky-400 hover:text-sky-300">
                Products
              </a>{" "}
              page and browse Japanese Pokémon cards and bundles. All prices are
              shown in USD for overseas users.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 2 – Open product details
              </span>
              <br />
              Click &quot;View&quot; to open the product detail page. Please
              check the product name, type (single, booster, bundle, etc.),
              stock, and tags.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 3 – Proceed to purchase
              </span>
              <br />
              On the product detail page, click{" "}
              <span className="rounded bg-sky-500 px-2 py-1 text-xs font-semibold text-slate-900">
                Proceed to purchase (Demo)
              </span>
              . In the live environment, this button will redirect you to a
              secure checkout page provided by AsiaPay / Silkpay.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 4 – Select your payment method
              </span>
              <br />
              On the hosted payment page, you will be able to select supported
              payment options (for example UnionPay, major credit cards, QR
              payments such as Alipay / WeChat Pay, depending on the final
              configuration). The payment provider will handle currency
              conversion from your local currency to USD.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 5 – Shipping &amp; tracking
              </span>
              <br />
              After payment is confirmed, our team in Japan will prepare the
              shipment. A tracking number and estimated delivery time will be
              sent to your registered e-mail or account dashboard.
            </li>
          </ol>

          <p className="mt-3 rounded-lg bg-slate-900/70 p-4 text-xs text-slate-300">
            Note: During the MVP demo phase, no real payment will be processed.
            Buttons related to payment are for UX demonstration only. Once
            AsiaPay / Silkpay integration is completed, this page will be
            updated with concrete payment options and screenshots.
          </p>
        </section>

        {/* Buyback / trade-in plan */}
        <section className="mb-10 space-y-4" id="sell-back">
          <h2 className="text-xl font-semibold text-slate-50">
            2. Future buyback / trade-in flow
          </h2>
          <p className="text-sm text-slate-300">
            OripaEC is planning a buyback system so that users can sell cards
            they do not need anymore. Below is the planned flow for overseas
            users. (This feature is not active yet in the MVP.)
          </p>

          <ol className="space-y-3 text-sm text-slate-200">
            <li>
              <span className="font-semibold text-sky-300">
                Step 1 – Sign in and open &quot;My Page&quot;
              </span>
              <br />
              After the account system is released, you will be able to sign in
              and open your &quot;My Page&quot; to see a list of cards you
              purchased on OripaEC.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 2 – Select cards you want to sell
              </span>
              <br />
              From your purchased card list, select cards you don&apos;t need
              anymore and request buyback. Cards originally purchased on
              OripaEC may be eligible for a guaranteed percentage (for example
              80% of the original price), while other cards will be appraised
              individually.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 3 – Confirm buyback price
              </span>
              <br />
              The system will show an estimated buyback price. After you
              confirm, a buyback request will be created and you will receive
              instructions for shipping or in-person drop-off (depending on your
              country and available logistics).
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 4 – Send the cards to our center
              </span>
              <br />
              Ship the cards to the designated address. When they arrive, our
              staff will check the condition and confirm the final price. If the
              condition is very different from the expected grade, the buyback
              price may be adjusted with your approval.
            </li>
            <li>
              <span className="font-semibold text-sky-300">
                Step 5 – Receive payout or points
              </span>
              <br />
              Once the buyback is confirmed, you will receive either cash
              payout, wallet credit, or OripaEC points (to be used for future
              purchases). The exact method will be decided based on local
              regulations and the payment providers we use.
            </li>
          </ol>

          <p className="mt-3 rounded-lg bg-slate-900/70 p-4 text-xs text-slate-300">
            Important: Buyback / trade-in for overseas users may require KYC
            (identity verification) and additional documentation, depending on
            the country, card value, and anti-money laundering regulations. This
            section explains the concept only; the final rules will be described
            here before the feature goes live.
          </p>
        </section>

        {/* FAQ-ish summary */}
        <section className="border-t border-slate-800 pt-6 text-xs text-slate-400">
          <p>
            If you have questions about payment methods, shipping countries, or
            the buyback system, please contact us from the support form once it
            is available. This page will be updated continuously while the MVP
            evolves.
          </p>
        </section>
      </div>
    </main>
  );
}
