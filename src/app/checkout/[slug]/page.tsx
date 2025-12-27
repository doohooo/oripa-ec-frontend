"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react"
import * as React from "react"
import { useParams } from "next/navigation"

// Mock product data
const productData: Record<string, any> = {
  "mystery-pack-premium": {
    title: "Premium Mystery Pack",
    price: 29.99,
    image: "/pokemon-card-pack-red-premium.jpg",
  },
}

// Placeholder for the 	CheckoutPaymentButton component
function CheckoutPaymentButton({ slug, amountUsd, quantity }: { slug: string; amountUsd: number; quantity: number }) {
  const router = useRouter()

  const handlePayment = () => {
    // Simulate payment process
    router.push("/checkout/success")
  }

  return (
    <Button
      size="lg"
      className="h-14 w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-semibold shadow-lg"
      onClick={handlePayment}
    >
      Continue to Payment (Demo)
    </Button>
  )
}

export default function CheckoutPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const { slug } = React.use(params)

  const [quantity, setQuantity] = useState(1)

  const product = productData[slug] || {
    title: "Unknown Product",
    price: 0,
    image: "/pokemon-card-pack.jpg",
  }

  const subtotal = product.price * quantity
  const shipping = 5.99
  const total = subtotal + shipping

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpg" alt="AKIHABARA TCG SHOP" className="h-40 w-auto" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link href={`/products/${slug}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product
            </Button>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShoppingBag className="h-6 w-6 text-primary" />
                Order Summary
              </CardTitle>
              <CardDescription>Review your items before payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Item */}
              <div className="flex items-center gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-20 w-20 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">${product.price} USD</p>
                </div>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <Separator />

              {/* Payment Button - Keep this component placeholder intact */}
              <CheckoutPaymentButton slug={slug} amountUsd={subtotal} quantity={quantity} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 AKIHABARA TCG SHOP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
