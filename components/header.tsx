"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Hide cart on home page only
  const showCart = pathname !== "/"

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="AKIHABARA TCG SHOP" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/products">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${isActive("/products") ? "text-primary border-b-2 border-primary rounded-none" : ""}`}
            >
              Products
            </Button>
          </Link>
          <Link href="/how-to-buy">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${isActive("/how-to-buy") ? "text-primary border-b-2 border-primary rounded-none" : ""}`}
            >
              How to Buy
            </Button>
          </Link>
          <Link href="/how-to-sell">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${isActive("/how-to-sell") ? "text-primary border-b-2 border-primary rounded-none" : ""}`}
            >
              How to Sell
            </Button>
          </Link>

          {/* Cart Button - Hidden on home page */}
          {showCart && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative ml-2">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* My Page Button */}
          <Link href="/mypage">
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-5 w-5" />
              <span className="sr-only">My Page</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {/* Cart Button Mobile - Hidden on home page */}
          {showCart && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* My Page Button Mobile */}
          <Link href="/mypage">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Hamburger Menu */}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
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
