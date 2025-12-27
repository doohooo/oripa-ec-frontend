import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Package } from "lucide-react"

export default function SuccessPage() {
  // Mock order ID
  const orderId = `ORD-${Date.now().toString().slice(-8)}`

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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle2 className="h-12 w-12 text-accent-foreground" />
            </div>
          </div>

          {/* Success Message */}
          <Card className="shadow-xl">
            <CardHeader className="space-y-4 pb-6">
              <CardTitle className="text-3xl font-bold md:text-4xl">Order Successful!</CardTitle>
              <CardDescription className="text-base">Your demo order has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-6">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Order ID</span>
                </div>
                <p className="text-2xl font-bold text-primary">{orderId}</p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Thank you for your order! This is a demo purchase and no actual payment has been processed.</p>
                <p>
                  In a real scenario, you would receive a confirmation email with your order details and tracking
                  information.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Back to Shop
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Go to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 AKIHABARA TCG SHOP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
