import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Package, Mail, MapPin, Truck } from "lucide-react"

export default function CheckoutSuccessPage() {
  // Mock order data
  const orderData = {
    orderId: "AKB-2026-000123",
    status: "Paid",
    paymentMethod: "Credit Card (Visa ****1234)",
    email: "customer@example.com",
    shipping: {
      destination: "Hong Kong, Kowloon District",
      method: "Express Shipping (3-5 business days)",
    },
    items: [
      { name: "Charizard VMAX - Premium Edition", qty: 1, price: 89.99 },
      { name: "Pikachu Illustrator Promo Card", qty: 2, price: 45.0 },
    ],
    subtotal: 179.99,
    shippingCost: 12.99,
    taxes: 0,
    total: 192.98,
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed</h1>
          <p className="text-gray-600">Thank you! Your order has been received.</p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Order Info Grid */}
            <div className="grid md:grid-cols-2 gap-4 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-semibold text-gray-900">{orderData.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {orderData.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900">{orderData.paymentMethod}</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{orderData.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="pb-6 border-b space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping Destination</p>
                  <p className="font-medium text-gray-900">{orderData.shipping.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
                  <p className="font-medium text-gray-900">{orderData.shipping.method}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="pb-6 border-b">
              <h3 className="font-semibold text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${orderData.shippingCost.toFixed(2)}</span>
              </div>
              {orderData.taxes > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>${orderData.taxes.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-blue-900">What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 text-gray-700">
            <p>✉️ We'll email you tracking info once your order is shipped.</p>
            <p>
              📦 <strong>Estimated dispatch:</strong> 1–3 business days
            </p>
            <p className="text-sm text-gray-600 pt-2">
              You can check your order status anytime from your account dashboard.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              View Cart
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <Link href="/contact" className="text-sm text-gray-500 hover:text-primary underline">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  )
}
