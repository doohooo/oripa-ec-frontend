import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package } from "lucide-react"

export default async function CheckoutSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  // If slug is invalid, show 404 (optional)
  if (!product) return notFound()

  // We no longer do "single item checkout" on /checkout/[slug].
  // The cart-based checkout lives at /checkout.
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
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          <Link href="/checkout">
            <Button size="sm">Go to Checkout</Button>
          </Link>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full md:w-56 aspect-square rounded-lg object-cover border"
              />

              <div className="flex-1">
                <Badge className="mb-3 w-fit bg-secondary text-secondary-foreground">
                  {product.category}
                </Badge>

                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

                <div className="mt-3 text-xl font-semibold">${product.priceUsd}</div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>In stock: {product.stock}</span>
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  This route is kept for backward compatibility. Checkout is cart-based and lives at{" "}
                  <Link href="/checkout" className="underline">
                    /checkout
                  </Link>
                  .
                </p>

                <div className="mt-6 flex gap-3">
                  <Link href="/cart">
                    <Button variant="outline">View Cart</Button>
                  </Link>
                  <Link href="/checkout">
                    <Button>Proceed to Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
