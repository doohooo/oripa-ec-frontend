import Link from "next/link"
import { products } from "@/data/products"
import ProductGridClient from "./ProductGridClient"

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Browse available items.
          </p>
        </div>

        <Link href="/cart" className="text-sm font-medium hover:underline">
          View Cart
        </Link>
      </div>

      <ProductGridClient products={products} />
    </main>
  )
}
