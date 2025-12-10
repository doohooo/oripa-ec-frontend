// src/components/ProductCard.tsx
"use client";

import type { Product } from "@/data/products";
import Link from "next/link";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-3 shadow-sm shadow-black/40 transition hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-sky-900/40">
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg bg-slate-800/80">
        <div className="flex h-full items-center justify-center text-xs text-slate-500">
          Image
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className="line-clamp-2 text-sm font-semibold text-slate-50">
          {product.name}
        </p>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {product.category} · Stock: {product.stock}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-sky-300">
          ${product.priceUsd.toFixed(2)}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="rounded-md bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-900 transition group-hover:bg-sky-400"
        >
          View
        </Link>
      </div>
    </div>
  );
}
