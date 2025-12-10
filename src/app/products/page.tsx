// src/app/products/page.tsx
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-slate-50">All Products</h1>
          <p className="text-sm text-slate-400">
            Japanese Pokémon cards and bundles. All prices are displayed in USD.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
