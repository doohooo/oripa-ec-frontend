"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
import { ShoppingCart } from "lucide-react"
import React from "react"

export default function ProductActionsClient({
  productId,
  disabled,
}: {
  productId: string
  disabled?: boolean
}) {
  const router = useRouter()

  return (
    <Button
      size="lg"
      className="h-14 w-full text-lg font-semibold"
      disabled={disabled}
      onClick={() => {
        addToCart(String(productId), 1)
        router.push("/cart")
      }}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}
