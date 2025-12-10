// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-sky-900 via-slate-900 to-fuchsia-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center">
        {/* Text side */}
        <div className="flex-1 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300">
            Cross-border Trading Card Shop
          </p>
          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
            Premium Japanese Pokémon cards,
            <br />
            shipped worldwide 🌏
          </h1>
          <p className="max-w-xl text-sm text-slate-200 sm:text-base">
            This demo store is built for AsiaPay / Silkpay review. 
            All prices will be displayed in USD and payments are processed via secure hosted payment pages.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="/products"
              className="rounded-md bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-400"
            >
              Shop Now
            </a>
            <a
              href="/how-to-buy"
              className="rounded-md border border-slate-500 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400"
            >
              How to Buy
            </a>
          </div>
        </div>

        {/* Image side (placeholder for now) */}
        <div className="mt-8 flex flex-1 items-center justify-center lg:mt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-32 w-24 rounded-xl bg-slate-800/70 shadow-lg shadow-sky-900" />
            <div className="h-36 w-28 translate-y-4 rounded-xl bg-slate-700/80 shadow-lg shadow-fuchsia-900" />
            <div className="h-28 w-20 -translate-y-2 rounded-xl bg-slate-800/60 shadow-lg shadow-sky-800" />
            <div className="h-40 w-28 -translate-y-4 rounded-xl bg-slate-700/70 shadow-lg shadow-fuchsia-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
