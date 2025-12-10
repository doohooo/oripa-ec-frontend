import { notFound } from "next/navigation";
import { products } from "@/data/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  // 👇 ここで Promise を await して中身を取り出す
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-4 text-sm">
          <a
            href="/products"
            className="text-sky-400 hover:text-sky-300 hover:underline"
          >
            ← Back to all products
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex h-72 items-center justify-center rounded-xl bg-slate-800/80">
              <span className="text-xs text-slate-500">Product Image</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {product.category} · Stock: {product.stock}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-50">
                {product.name}
              </h1>
            </div>

            <div className="text-3xl font-semibold text-sky-300">
              ${product.priceUsd.toFixed(2)}
            </div>

            <div className="space-y-2 text-sm text-slate-300">
              <p>
                This is a demo product for the OripaEC MVP. Actual card images
                and descriptions will be managed from the admin panel later.
              </p>
              <p>
                All prices are displayed in USD. Payment will be processed via
                AsiaPay / Silkpay in the production environment.
              </p>
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4">
              <button
                type="button"
                className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-md shadow-sky-900/40 transition hover:bg-sky-400 disabled:opacity-60 md:w-auto"
                disabled={product.stock === 0}
              >
                {product.stock === 0
                  ? "Out of stock"
                  : "Proceed to purchase (Demo)"}
              </button>
              <p className="mt-2 text-xs text-slate-400">
                In the MVP demo, this button will not charge you. For AsiaPay /
                Silkpay integration, this will later redirect to a hosted
                checkout / payment page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
