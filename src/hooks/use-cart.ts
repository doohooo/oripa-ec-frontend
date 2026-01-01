"use client"

import * as React from "react"
import { products } from "@/data/products"

export type CartLine = {
  id: string
  quantity: number
  name: string
  imageUrl: string
  priceUsd: number
  subtotal: number
}

type RawCartItem = { id: string; qty: number }

const KEY = "oripa_cart_v1"

/* ---------- storage helpers ---------- */

function loadCart(): RawCartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((x) => x && typeof x.id === "string" && typeof x.qty === "number")
      .map((x) => ({ id: x.id, qty: Math.max(1, Math.min(99, x.qty)) }))
  } catch {
    return []
  }
}

function saveCart(items: RawCartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

/* ---------- build view model ---------- */

function buildLines() {
  const raw = loadCart()

  const lines: CartLine[] = raw
    .map((it) => {
      const p = products.find((x) => x.id === it.id)
      if (!p) return null

      const quantity = it.qty
      const priceUsd = p.priceUsd

      return {
        id: p.id,
        quantity,
        name: p.name,
        imageUrl: p.imageUrl,
        priceUsd,
        subtotal: priceUsd * quantity,
      }
    })
    .filter(Boolean) as CartLine[]

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0)
  return { lines, total }
}

/* ---------- hook ---------- */

export function useCart() {
  const [{ lines, total }, setState] = React.useState(() => buildLines())

  const refresh = React.useCallback(() => {
    setState(buildLines())
  }, [])

  React.useEffect(() => {
    refresh()
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) refresh()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [refresh])

  const setQty = React.useCallback((id: string, quantity: number) => {
    const next = loadCart().map((x) =>
      x.id === id ? { ...x, qty: Math.max(1, Math.min(99, quantity)) } : x
    )
    saveCart(next)
    refresh()
  }, [refresh])

  const remove = React.useCallback((id: string) => {
    saveCart(loadCart().filter((x) => x.id !== id))
    refresh()
  }, [refresh])

  const clear = React.useCallback(() => {
    saveCart([])
    refresh()
  }, [refresh])

  return {
    cart: lines,
    total,
    setQty,
    remove,
    clear,
    refresh,
  }
}
