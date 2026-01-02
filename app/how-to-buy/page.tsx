import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, CreditCard, Truck, CheckCircle, ShoppingCart } from "lucide-react"

export default function HowToBuyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-balance">How to Buy</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Follow these simple steps to purchase authentic Japanese Pokémon single cards at fixed prices.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Browse Products
                </h3>
                <p className="text-muted-foreground">
                  Explore our selection of authentic Japanese single cards. Each product shows the exact card you will
                  receive with fixed pricing and detailed condition information.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </h3>
                <p className="text-muted-foreground">
                  Add your desired packs to the cart. You can purchase multiple items in a single order for combined
                  shipping.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Checkout & Payment
                </h3>
                <p className="text-muted-foreground">
                  Complete your purchase using our secure international payment system. We accept major payment methods
                  from China, Vietnam, and worldwide.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping & Delivery
                </h3>
                <p className="text-muted-foreground">
                  Your order will be shipped directly from Japan. Track your package and receive it at your doorstep
                  with fast international shipping.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Enjoy Your Cards
                </h3>
                <p className="text-muted-foreground">
                  Receive your authentic Japanese Pokémon cards exactly as shown in the product listings!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-xl border bg-card p-8">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about the buying process, please don't hesitate to contact us.
            </p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
