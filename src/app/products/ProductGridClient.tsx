"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { addToCart } from "@/lib/cart"
import { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Props = {
  products: Product[]
}

export default function ProductGridClient({ products }: Props) {
  const router = useRouter()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="rounded-xl border bg-card shadow-sm overflow-hidden">
          {/* Clickable area -> Product details */}
          <Link href={`/products/${product.slug}`} className="block">
            <div className="relative bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute left-3 top-3 flex gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <div className="text-lg font-semibold leading-snug">{product.name}</div>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 text-2xl font-bold">${product.priceUsd}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                In stock: {product.stock}
              </div>

              <div className="mt-3 text-sm font-medium text-primary">
                View details →
              </div>
            </div>
          </Link>

          {/* Actions */}
          <div className="p-4 pt-0">
            <Button
              className="w-full"
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart(product.id, 1)
                router.push("/cart") // go to cart immediately
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
