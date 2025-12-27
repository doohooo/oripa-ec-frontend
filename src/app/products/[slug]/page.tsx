import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Package } from "lucide-react"

// Mock product data lookup
const productData: Record<string, any> = {
  "mystery-pack-premium": {
    title: "Premium Mystery Pack",
    price: 29.99,
    image: "/pokemon-card-pack-red-premium.jpg",
    category: "Mystery Pack",
    description:
      "Experience the thrill of opening authentic Japanese Pokémon card oripa! Each premium mystery pack contains carefully selected cards with the potential for rare pulls. Sourced directly from Japan, these packs guarantee authenticity and quality. Perfect for collectors and enthusiasts looking for that special card to complete their collection.",
    stock: 12,
  },
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = productData[slug] || {
    title: "Product Not Found",
    price: 0,
    image: "/pokemon-card-pack.jpg",
    category: "Unknown",
    description: "This product is not available.",
    stock: 0,
  }

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden shadow-xl">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="aspect-square w-full max-w-lg object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit bg-secondary text-secondary-foreground">{product.category}</Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{product.title}</h1>
            <p className="mb-6 text-4xl font-bold text-primary">${product.price}</p>

            <Card className="mb-6 border-accent/20 bg-accent/5">
              <CardContent className="flex items-center gap-2 p-4">
                <Package className="h-5 w-5 text-accent-foreground" />
                <span className="font-medium">
                  In stock: <span className="text-accent-foreground">{product.stock}</span>
                </span>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">Description</h2>
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            <Link href={`/checkout/${slug}`}>
              <Button size="lg" className="h-14 w-full text-lg font-semibold shadow-lg md:w-auto md:px-12">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>
            </Link>
          </div>
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
