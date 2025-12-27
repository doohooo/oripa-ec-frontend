import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    slug: "mystery-pack-premium",
    title: "Premium Mystery Pack",
    price: 29.99,
    image: "/pokemon-card-pack-red-premium.jpg",
    badge: "Mystery Pack",
    tags: ["Premium", "Limited Edition"],
  },
  {
    id: 2,
    slug: "starter-bundle",
    title: "Starter Bundle",
    price: 49.99,
    image: "/pokemon-card-bundle-blue.jpg",
    badge: "Bundle",
    tags: ["Best Value", "5 Packs"],
  },
  {
    id: 3,
    slug: "single-oripa-pack",
    title: "Single Oripa Pack",
    price: 12.99,
    image: "/pokemon-card-single-pack-yellow.jpg",
    badge: "1 Pack",
    tags: ["Starter", "Popular"],
  },
  {
    id: 4,
    slug: "collectors-edition",
    title: "Collector's Edition",
    price: 89.99,
    image: "/pokemon-card-collectors-edition-gold.jpg",
    badge: "Limited",
    tags: ["Rare", "Exclusive"],
  },
  {
    id: 5,
    slug: "mega-bundle",
    title: "Mega Bundle",
    price: 149.99,
    image: "/pokemon-card-mega-bundle-purple.jpg",
    badge: "Bundle",
    tags: ["Best Deal", "15 Packs"],
  },
  {
    id: 6,
    slug: "classic-pack",
    title: "Classic Pack",
    price: 19.99,
    image: "/pokemon-card-classic-pack-green.jpg",
    badge: "Classic",
    tags: ["Traditional", "Popular"],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpg" alt="AKIHABARA TCG SHOP" className="h-40 w-auto" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium text-primary">
              Products
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Products</h1>
          <p className="text-lg text-muted-foreground">Authentic Japanese Pokémon card oripa packs</p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg bg-muted">
                  <Badge className="absolute right-3 top-3 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2 text-xl">{product.title}</CardTitle>
                <div className="mb-3 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-2xl font-bold text-primary">${product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/products/${product.slug}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 AKIHABARA TCG SHOP. All rights reserved.</p>
            <nav className="flex gap-6">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
