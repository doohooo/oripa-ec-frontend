import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TokushoPage() {
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
          <h1 className="text-4xl font-bold mb-6">Specified Commercial Transaction Act</h1>
          <p className="text-lg text-muted-foreground mb-8">特定商取引法に基づく表記</p>

          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Business Name</h3>
              <p className="text-muted-foreground">AKIHABARA TCG SHOP</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Akihabara, Tokyo, Japan</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground">Email: support@akihabaratcg.shop</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              <p className="text-muted-foreground">
                Credit card, international payment systems (AsiaPay, Silkpay, etc.)
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Shipping Timing</h3>
              <p className="text-muted-foreground">
                Orders are typically processed and shipped within 3-5 business days after payment confirmation.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Returns and Exchanges</h3>
              <p className="text-muted-foreground">
                Please refer to our Refund Policy for detailed information about returns and exchanges.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">
              This page is provided in accordance with Japan's Specified Commercial Transaction Act (特定商取引法). For
              more detailed information, please contact our support team.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
