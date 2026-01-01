"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const KomojuFields: any = "komoju-fields"

export default function CheckoutClient() {
  const router = useRouter()
  const { cart, total, clear } = useCart()

  const [sessionId, setSessionId] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)

  const publishableKey = process.env.NEXT_PUBLIC_KOMOJU_PUBLISHABLE_KEY

  const shipping = 5.99
  const grandTotal = total + shipping

  React.useEffect(() => {
    if (cart.length === 0) return

    const createSession = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/komoju/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(grandTotal * 100), // USD cents
          }),
        })

        const json = await res.json()
        if (res.ok && json.sessionId) {
          setSessionId(json.sessionId)
        } else {
          console.error("Failed to create KOMOJU session", json)
        }
      } finally {
        setLoading(false)
      }
    }

    createSession()
  }, [cart.length, grandTotal])

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Button onClick={() => router.push("/products")}>
            Go to Products
          </Button>
        </div>
      </div>
    )
  }

  if (!publishableKey) {
    return (
      <div className="p-8 text-red-600">
        Missing KOMOJU publishable key.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-2xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Order summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ${(item.priceUsd * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t pt-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <script
              type="module"
              src="https://multipay.komoju.com/fields.js"
            />

            {loading && (
              <div className="text-sm text-muted-foreground">
                Preparing payment…
              </div>
            )}

            {!loading && sessionId && (
              <KomojuFields
                {...{
                  "session-id": sessionId,
                  "publishable-key": publishableKey,
                }}
              />
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!sessionId}
              onClick={() => {
                const el = document.querySelector(
                  "komoju-fields"
                ) as any
                el?.submit?.()
              }}
            >
              Pay Now
            </Button>
          </CardContent>
        </Card>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            clear()
            router.push("/cart")
          }}
        >
          Cancel and return to cart
        </Button>
      </main>
    </div>
  )
}
