// src/app/products/page.tsx
import { products, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const CATEGORY_LABELS: Record<ProductCategory | "all", string> = {
  all: "All",
  featured: "Featured",
  rare: "Rare",
  bundle: "Bundles",
};

const CATEGORY_ORDER: (ProductCategory | "all")[] = [
  "all",
  "featured",
  "rare",
  "bundle",
];

export default function ProductsPage() {
  // とりあえずフィルタ無し（後でクライアント側でタブ切り替え予定）
  const currentCategory: ProductCategory | "all" = "all";

  const filtered =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  return (
    <div className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-slate-50">
            All Products
          </h1>
          <p className="text-sm text-slate-400">
            Japanese Pokémon cards and bundles. All prices are shown in USD.
          </p>
        </header>

        {/* カテゴリタブ（現在は全部 disabled な見た目だけ） */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((cat) => {
            const active = cat === currentCategory;
            return (
              <button
                key={cat}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  active
                    ? "border-sky-500 bg-sky-500 text-slate-900"
                    : "border-slate-700 bg-slate-900 text-slate-300"
                }`}
                disabled
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* グリッド表示 */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
