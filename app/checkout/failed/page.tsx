import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, AlertTriangle, CreditCard, HelpCircle } from "lucide-react"

export default function CheckoutFailedPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Failed Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">Your payment could not be completed. No charges were made.</p>
        </div>

        {/* Common Reasons Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-orange-50 border-b">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <AlertTriangle className="h-5 w-5" />
              Common Reasons
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Incorrect card details (number, expiry date, or CVV)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Insufficient funds or card limit reached</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>3D Secure authentication not completed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Bank declined the transaction or security check failed</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* What to Do Next Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <CreditCard className="h-5 w-5" />
              What to Do Next
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 text-gray-700">
            <p>✓ Try again with the same card (double-check your details)</p>
            <p>✓ Use a different payment card</p>
            <p>✓ Contact your bank to authorize the transaction</p>
            <p className="text-sm text-gray-600 pt-3">
              Your cart items are still saved. You can return to checkout and try again anytime.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link href="/checkout/payment">
            <Button size="lg" className="w-full sm:w-auto">
              Try Payment Again
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Back to Cart
            </Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto">
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Support Box */}
        <Card className="border-gray-300 bg-gray-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <HelpCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Need help?</strong> If the issue persists, please{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>{" "}
                with the time of the failed transaction and a screenshot if possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
