import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Globe, Truck, ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
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
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 md:py-32">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Japanese Pokémon Card Oripa
            <br />
            <span className="text-primary">for Overseas Customers</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Fast shipping · Authentic packs · Buy from anywhere
          </p>
          <Link href="/products">
            <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Authentic Japanese Products</h3>
              <p className="text-sm text-muted-foreground">
                All our oripa packs are sourced directly from Japan and guaranteed authentic
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                <Globe className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">International Payment Support</h3>
              <p className="text-sm text-muted-foreground">
                Accept payments from China, Vietnam, and worldwide customers
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                <Truck className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Fast Global Shipping</h3>
              <p className="text-sm text-muted-foreground">Quick and reliable shipping to customers around the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 AKIHABARA TCG SHOP. All rights reserved.</p>
            <nav className="flex gap-6">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How to Buy
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
