"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const CART_STORAGE_KEY = "akihabara-cart"
const CART_UPDATED_EVENT = "cart:updated"

type StoredCartItem = { quantity?: number }

function getCartCountFromStorage(): number {
  if (typeof window === "undefined") return 0

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return 0

    const items = JSON.parse(raw) as StoredCartItem[]
    if (!Array.isArray(items)) return 0

    return items.reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0)
  } catch {
    return 0
  }
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const showCart = pathname !== "/"
  const isActive = (path: string) => pathname === path

  const [cartCount, setCartCount] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const update = () => setCartCount(getCartCountFromStorage())

    setIsHydrated(true)
    update()

    window.addEventListener(CART_UPDATED_EVENT, update)
    window.addEventListener("storage", update)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="AKIHABARA TCG SHOP" className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/products">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${
                isActive("/products") ? "text-primary border-b-2 border-primary rounded-none" : ""
              }`}
            >
              Products
            </Button>
          </Link>
          <Link href="/how-to-buy">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${
                isActive("/how-to-buy") ? "text-primary border-b-2 border-primary rounded-none" : ""
              }`}
            >
              How to Buy
            </Button>
          </Link>
          <Link href="/how-to-sell">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${
                isActive("/how-to-sell") ? "text-primary border-b-2 border-primary rounded-none" : ""
              }`}
            >
              How to Sell
            </Button>
          </Link>

          {showCart && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative ml-2">
                <ShoppingCart className="h-5 w-5" />
                {isHydrated && cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-none text-white">{cartCount}</span>}
              </Button>
            </Link>
          )}

          <Link href="/mypage">
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-5 w-5" />
              <span className="sr-only">My Page</span>
            </Button>
          </Link>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          {showCart && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {isHydrated && cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-none text-white">{cartCount}</span>}
              </Button>
            </Link>
          )}

          <Link href="/mypage">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-2">
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isActive("/products") ? "text-primary bg-primary/10" : ""}`}
              >
                Products
              </Button>
            </Link>
            <Link href="/how-to-buy" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isActive("/how-to-buy") ? "text-primary bg-primary/10" : ""}`}
              >
                How to Buy
              </Button>
            </Link>
            <Link href="/how-to-sell" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isActive("/how-to-sell") ? "text-primary bg-primary/10" : ""}`}
              >
                How to Sell
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
