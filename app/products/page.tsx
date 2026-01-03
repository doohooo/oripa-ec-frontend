"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Eye, X, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { RarityBadge } from "@/components/rarity-badge"

// Mock product data with stock status
const products = [
  {
    id: "1",
    slug: "charizard-vmax-premium",
    title: "Charizard VMAX (Premium)",
    price: 29.99,
    image: "/pokemon-card-pack-red-premium.jpg",
    type: "Card",
    rarity: "SAR",
    tags: ["Premium", "Popular"],
    stock: "in-stock",
    stockCount: 42,
    description: "Authentic Japanese Charizard VMAX card in excellent condition",
  },
  {
    id: "2",
    slug: "starter-bundle",
    title: "Starter Card Bundle",
    price: 49.99,
    image: "/pokemon-card-bundle-blue.jpg",
    type: "Bundle",
    rarity: "RR",
    tags: ["Best Value", "5 Cards"],
    stock: "in-stock",
    stockCount: 28,
    description: "Perfect starter set for collectors - 5 premium cards",
  },
  {
    id: "3",
    slug: "pikachu-vmax",
    title: "Pikachu VMAX",
    price: 12.99,
    image: "/pokemon-card-single-pack-yellow.jpg",
    type: "Card",
    rarity: "SR",
    tags: ["Starter", "Popular"],
    stock: "low-stock",
    stockCount: 8,
    description: "Authentic Japanese Pikachu VMAX card with fixed price",
  },
  {
    id: "4",
    slug: "collectors-edition",
    title: "Collector's Edition Card",
    price: 89.99,
    image: "/pokemon-card-collectors-edition-gold.jpg",
    type: "Limited",
    rarity: "MUR",
    tags: ["Rare", "Exclusive"],
    stock: "in-stock",
    stockCount: 15,
    description: "Exclusive limited edition rare card - exact card shown",
  },
  {
    id: "5",
    slug: "mega-bundle",
    title: "Premium Card Collection",
    price: 149.99,
    image: "/pokemon-card-mega-bundle-purple.jpg",
    type: "Bundle",
    rarity: "MA",
    tags: ["Best Deal", "15 Cards"],
    stock: "out-of-stock",
    stockCount: 0,
    description: "Maximum value - 15 premium cards at the best price",
  },
  {
    id: "6",
    slug: "classic-holo",
    title: "Classic Holographic Card",
    price: 19.99,
    image: "/pokemon-card-classic-pack-green.jpg",
    type: "Classic",
    rarity: "AR",
    tags: ["Traditional", "Popular"],
    stock: "in-stock",
    stockCount: 56,
    description: "Traditional Japanese holographic card - authentic and guaranteed",
  },
]

function getRarityBadgeStyle(rarity: string) {
  const styles: Record<
    string,
    {
      bg: string
      text: string
    }
  > = {
    MUR: { bg: "bg-purple-900", text: "text-white" },
    MA: { bg: "bg-slate-900", text: "text-white" },
    SAR: { bg: "bg-orange-200", text: "text-gray-900" },
    AR: { bg: "bg-blue-200", text: "text-gray-900" },
    SR: { bg: "bg-yellow-200", text: "text-gray-900" },
    SSR: { bg: "bg-pink-200", text: "text-gray-900" },
    RR: { bg: "bg-red-200", text: "text-gray-900" },
    R: { bg: "bg-amber-100", text: "text-gray-900" },
    U: { bg: "bg-green-100", text: "text-gray-900" },
    C: { bg: "bg-gray-200", text: "text-gray-900" },
    ACE: { bg: "bg-indigo-200", text: "text-gray-900" },
    BWR: { bg: "bg-gray-800", text: "text-white" },
    S: { bg: "bg-teal-200", text: "text-gray-900" },
  }
  return styles[rarity] || { bg: "bg-gray-200", text: "text-gray-900" }
}

export default function ProductsPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
  const [sideCartOpen, setSideCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest")

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.title,
      imageUrl: product.image,
      priceUsd: product.price,
      tags: product.tags,
    })
    setSideCartOpen(true)
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price
    }
    if (sortBy === "price-high") {
      return b.price - a.price
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-card shadow-2xl transition-transform duration-300 ${
          sideCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Side Cart Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-bold">Your Cart ({getCartCount()})</h2>
            <Button variant="ghost" size="icon" onClick={() => setSideCartOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground/40" />
                <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                <p className="mt-2 text-sm text-muted-foreground">Add products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold leading-tight">{item.name}</h3>
                          <p className="text-sm font-bold text-primary">${item.priceUsd.toFixed(2)}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t bg-muted/30 px-6 py-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2 text-base">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" onClick={() => setSideCartOpen(false)}>
                <Button size="lg" className="w-full text-base font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>
              <Button variant="ghost" className="mt-2 w-full" onClick={() => setSideCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sideCartOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setSideCartOpen(false)} />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Authentic Japanese Pokémon cards shipped worldwide. Each card shown is exactly what you receive - fixed
            prices, no surprises.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-muted-foreground">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                product.stock === "out-of-stock" ? "opacity-60" : ""
              }`}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <div className="absolute left-3 top-3 z-10">
                  <RarityBadge rarity={product.rarity} size="md" />
                </div>

                {/* Stock Badge */}
                {product.stock === "low-stock" && (
                  <div className="absolute right-3 top-3 z-10">
                    <Badge variant="outline" className="bg-accent/90 backdrop-blur-sm text-xs font-semibold">
                      Only {product.stockCount} left
                    </Badge>
                  </div>
                )}
                {product.stock === "out-of-stock" && (
                  <div className="absolute right-3 top-3 z-10">
                    <Badge
                      variant="outline"
                      className="bg-destructive/90 text-destructive-foreground backdrop-blur-sm text-xs font-semibold"
                    >
                      Out of Stock
                    </Badge>
                  </div>
                )}

                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                {/* Title and Tags */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold leading-tight text-balance">{product.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">${product.price}</span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2 pt-2">
                  {product.stock === "out-of-stock" ? (
                    <Button disabled className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Out of Stock
                    </Button>
                  ) : (
                    <Button className="w-full group/btn" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Add to Cart
                    </Button>
                  )}

                  <Link href={`/products/${product.slug}`} className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Stock Status */}
                {product.stock === "in-stock" && product.stockCount > 10 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    In stock
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-16 rounded-xl border bg-card p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We sell authentic Japanese Pokémon cards with fixed prices. Each product listing shows the exact card you
            will receive - no randomness, no surprises. All cards are shipped directly from Japan.
          </p>
        </div>
      </main>
    </div>
  )
}
