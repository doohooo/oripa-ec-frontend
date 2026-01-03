"use client"

import { useState, useEffect } from "react"

export interface CartItem {
  id: string
  slug: string
  name: string
  imageUrl: string
  priceUsd: number
  quantity: number
  tags: string[]
}

const CART_STORAGE_KEY = "akihabara-cart"
const CART_UPDATED_EVENT = "cart:updated"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        setCart(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Persist cart and notify listeners
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
      window.dispatchEvent(new Event(CART_UPDATED_EVENT))
    } catch (e) {
      console.error("Failed to save cart to localStorage", e)
    }
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
            : i
        )
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.priceUsd * item.quantity,
      0
    )
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  }
}
