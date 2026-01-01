"use client"

import React from "react"
import Link from "next/link"
import { loadCart, removeFromCart, updateQty } from "@/lib/cart"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const [items, setItems] = React.useState(loadCart())
  const refresh = () => setItems(loadCart())

  const byId = React.useMemo(() => new Map(products.map((p) => [p.id, p])), [])
  const lines = items.map((it) => {
    const p = byId.get(it.id)
    return {
      id: it.id,
      qty: it.qty,
      product: p ?? null,
      unit: p?.priceUsd ?? 0,
      subtotal: (p?.priceUsd ?? 0) * it.qty,
    }
  })

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0)

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Cart</h1>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/products">Browse products</Link>
        </p>
      ) : (
        <>
          <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
            {lines.map((line) => (
              <li
                key={line.id}
                style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img
                      src={line.product?.imageUrl ?? "/placeholder.svg"}
                      alt={line.product?.name ?? "Unknown"}
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, background: "#f3f3f3" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {line.product?.name ?? "Unknown Product"}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.75 }}>
                        ID: {line.id}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span style={{ fontWeight: 700 }}>${line.unit.toFixed(2)}</span>
                        <span style={{ marginLeft: 10, opacity: 0.8 }}>
                          Subtotal: ${line.subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <label htmlFor={`qty-${line.id}`}>Qty: </label>
                        <input
                          id={`qty-${line.id}`}
                          type="number"
                          min={1}
                          max={99}
                          value={line.qty}
                          onChange={(e) => {
                            updateQty(line.id, Number(e.target.value))
                            refresh()
                          }}
                          style={{ width: 80, marginLeft: 8 }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(line.id)
                      refresh()
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>
              Total: ${total.toFixed(2)}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/checkout">
                <Button>Proceed to Checkout</Button>
              </Link>
              <Link href="/products">
                <Button variant="secondary">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
