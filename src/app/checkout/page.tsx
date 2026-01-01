"use client"

import React from "react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import StripeCheckoutClient from "@/app/checkout/stripe/StripeCheckoutClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const SHIPPING_USD = 5.99

export default function CheckoutPage() {
  const { cart, total } = useCart()

  const shipping = cart.length > 0 ? SHIPPING_USD : 0
  const grandTotal = total + shipping

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-semibold">AKIHABARA TCG SHOP</Link>
          <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
            Cart
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        {cart.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p>Your cart is empty.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Browse products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left: Order Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.priceUsd.toFixed(2)} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(item.priceUsd * item.quantity).toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right: Payment */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* ✅ Stripe UI is rendered here */}
                <StripeCheckoutClient amountUsd={grandTotal} />

                <div className="text-xs text-muted-foreground">
                  Test mode: use Stripe test cards.
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
