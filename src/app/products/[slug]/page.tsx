import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package } from "lucide-react"
import ProductActionsClient from "./ProductActionsClient"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpg" alt="AKIHABARA TCG SHOP" className="h-40 w-auto" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
              Cart
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

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
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden shadow-xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="aspect-square w-full max-w-lg object-cover"
              />
            </Card>
          </div>

          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit bg-secondary text-secondary-foreground">
              {product.category}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{product.name}</h1>
            <p className="mb-6 text-4xl font-bold text-primary">${product.priceUsd}</p>

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
              <p className="leading-relaxed text-muted-foreground">
                {product.tags?.length ? `Tags: ${product.tags.join(", ")}` : "No description yet."}
              </p>
            </div>

            <ProductActionsClient productId={product.id} disabled={product.stock <= 0} />
          </div>
        </div>
      </main>
    </div>
  )
}
