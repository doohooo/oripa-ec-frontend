"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, CheckCircle2, Shield, Truck, Plus, Minus, ZoomIn } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { RarityBadge } from "@/components/rarity-badge"

// Mock product data lookup
const productData: Record<string, any> = {
  "charizard-vmax-premium": {
    id: "1",
    slug: "charizard-vmax-premium",
    title: "Charizard VMAX",
    series: "VMAX Climax",
    cardNo: "s8b 001/184",
    price: 299.99,
    image: "/pokemon-card-pack-red-premium.jpg",
    category: "Card",
    rarity: "SAR",
    language: "Japanese",
    condition: "Near Mint",
    description:
      "This is an authentic Japanese Pokémon Charizard VMAX card from the VMAX Climax series. The card you see in the images is the exact card you will receive. Sourced directly from Japan and inspected for authenticity before shipping.",
    stock: 12,
    tags: ["Premium", "Popular"],
  },
  "starter-bundle": {
    id: "2",
    slug: "starter-bundle",
    title: "Pikachu V",
    series: "Sword & Shield",
    cardNo: "s4a 123/190",
    price: 49.99,
    image: "/pokemon-card-bundle-blue.jpg",
    category: "Card",
    rarity: "RR",
    language: "Japanese",
    condition: "Near Mint",
    description:
      "Authentic Japanese Pokémon Pikachu V card from the Sword & Shield series. This is a single physical card sold at a fixed price. The exact card shown in the images is what you will receive.",
    stock: 20,
    tags: ["Best Value", "Popular"],
  },
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [imageZoomed, setImageZoomed] = useState(false)

  const product = productData[slug] || {
    id: "unknown",
    slug: slug,
    title: "Product Not Found",
    series: "Unknown",
    cardNo: "",
    price: 0,
    image: "/pokemon-card-pack.jpg",
    category: "Unknown",
    rarity: "C",
    language: "Japanese",
    condition: "Near Mint",
    description: "This product is not available.",
    stock: 0,
    tags: [],
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.title,
      imageUrl: product.image,
      priceUsd: product.price,
      tags: product.tags,
      quantity: quantity,
    })
    router.push("/products")
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Hero Section - Product Image & Purchase Panel */}
        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* Left: Large Product Image */}
          <div className="relative">
            <div
              className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200 cursor-zoom-in group"
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <div className="absolute left-4 top-4 z-10">
                <RarityBadge rarity={product.rarity} size="lg" />
              </div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">Click image to zoom</p>
          </div>

          {/* Right: Product Info & Purchase */}
          <div className="flex flex-col">
            {/* Card Name */}
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{product.title}</h1>
              <RarityBadge rarity={product.rarity} size="sm" />
            </div>

            {/* Series */}
            <p className="text-lg text-muted-foreground mb-6">{product.series}</p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-5xl font-bold text-foreground">${product.price}</p>
              <p className="text-sm text-muted-foreground mt-2">Fixed price • USD</p>
            </div>

            {/* Stock Status */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-semibold text-green-900">In Stock</span>
                </div>
                <span className="text-sm text-green-700">
                  {product.stock} {product.stock === 1 ? "card" : "cards"} available
                </span>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 bg-transparent"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center w-16 h-10 border border-gray-300 rounded-md bg-white">
                  <span className="text-lg font-semibold">{quantity}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="h-14 w-full text-lg font-semibold shadow-md hover:shadow-lg transition-shadow mb-4"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart • ${(product.price * quantity).toFixed(2)}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure checkout • Ships from Japan • Tracking included
            </p>
          </div>
        </div>

        {/* Exact Card Clarification Section */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <CheckCircle2 className="h-5 w-5" />
              Exact Card You Will Receive
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-blue-900">
            <p className="font-medium">This listing is for ONE individual physical Pokémon card.</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>The images show the exact card you will receive</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>No randomness, mystery packs, or chance-based elements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Fixed price for this specific card</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Card Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Card Name</p>
                  <p className="font-semibold">{product.title}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Rarity</p>
                  <div className="flex items-center gap-2">
                    <RarityBadge rarity={product.rarity} size="sm" />
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Series / Set</p>
                  <p className="font-semibold">{product.series}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Card No.</p>
                  <p className="font-semibold">{product.cardNo || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Language</p>
                  <p className="font-semibold">{product.language || "Japanese"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Condition</p>
                  <p className="font-semibold">{product.condition || "Near Mint"}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Condition & Authenticity Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Condition & Authenticity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Authentic Japanese Cards</p>
                  <p className="text-muted-foreground">
                    All cards are sourced directly from authorized distributors in Japan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Inspected Before Shipping</p>
                  <p className="text-muted-foreground">
                    Each card is carefully inspected for authenticity and condition
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Secure Packaging</p>
                  <p className="text-muted-foreground">
                    Cards are protected with sleeves and rigid packaging during shipment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping & Payment Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping & Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold mb-2">Worldwide Shipping</p>
                <p className="text-muted-foreground">We ship internationally from Japan to customers worldwide</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Tracking Provided</p>
                <p className="text-muted-foreground">All orders include tracking information for peace of mind</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Secure Payment</p>
                <p className="text-muted-foreground">International payment processing with buyer protection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Note */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Important:</strong> This is a physical collectible trading card sold at a fixed price. Each product
            listing represents one specific card that will be shipped to you. There are no gambling, lottery, or
            chance-based elements involved in this purchase. You are purchasing the exact card shown in the product
            images above.
          </p>
        </div>
      </main>
    </div>
  )
}
