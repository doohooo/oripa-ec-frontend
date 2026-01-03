"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, ChevronRight, CreditCard, User, MapPin, CheckCircle2, ArrowLeft } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

type CheckoutStep = "customer" | "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, isLoaded, getCartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer")
  const [isProcessing, setIsProcessing] = useState(false)

  // Form state
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  useEffect(() => {
    if (!isLoaded) return

    if (cart.length === 0) {
      router.replace("/cart")
    } else {
      router.replace("/checkout/customer")
    }
  }, [cart, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading checkout...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return null
  }

  const subtotal = getCartTotal()
  const shipping = 5.99
  const total = subtotal + shipping

  const steps: { id: CheckoutStep; label: string; icon: any }[] = [
    { id: "customer", label: "Customer", icon: User },
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: CheckCircle2 },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    router.push("/checkout/success")
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <Link href="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold md:text-4xl text-center">Checkout</h1>

      {/* Progress Indicator */}
      <div className="mb-12 flex justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={`mt-2 text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight
                    className={`mx-2 h-5 w-5 ${isCompleted ? "text-primary" : "text-muted-foreground/30"}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{steps[currentStepIndex].label} Information</CardTitle>
              <CardDescription>
                Step {currentStepIndex + 1} of {steps.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Customer */}
              {currentStep === "customer" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === "shipping" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      placeholder="123 Main Street"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Apt, Suite, etc."
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province *</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        placeholder="10001"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CN">China</SelectItem>
                          <SelectItem value="VN">Vietnam</SelectItem>
                          <SelectItem value="JP">Japan</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === "payment" && (
                <div className="space-y-4">
                  <Label>Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <Card className={`cursor-pointer ${paymentMethod === "card" ? "border-primary" : ""}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                          Credit / Debit Card
                        </Label>
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer ${paymentMethod === "unionpay" ? "border-primary" : ""}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <RadioGroupItem value="unionpay" id="unionpay" />
                        <Label htmlFor="unionpay" className="flex-1 cursor-pointer font-medium">
                          UnionPay
                        </Label>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer ${paymentMethod === "alipay" ? "border-primary" : ""}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <RadioGroupItem value="alipay" id="alipay" />
                        <Label htmlFor="alipay" className="flex-1 cursor-pointer font-medium">
                          Alipay+
                        </Label>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer ${paymentMethod === "wechat" ? "border-primary" : ""}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <RadioGroupItem value="wechat" id="wechat" />
                        <Label htmlFor="wechat" className="flex-1 cursor-pointer font-medium">
                          WeChat Pay
                        </Label>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Customer Information</h3>
                      <Button variant="link" size="sm" onClick={() => setCurrentStep("customer")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-1 text-sm">
                        <p>{email}</p>
                        {phone && <p>{phone}</p>}
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Shipping Address</h3>
                      <Button variant="link" size="sm" onClick={() => setCurrentStep("shipping")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-1 text-sm">
                        <p>{fullName}</p>
                        <p>{addressLine1}</p>
                        {addressLine2 && <p>{addressLine2}</p>}
                        <p>
                          {city}, {state} {postalCode}
                        </p>
                        <p>{country}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Payment Method</h3>
                      <Button variant="link" size="sm" onClick={() => setCurrentStep("payment")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 text-sm">
                        <p className="capitalize">{paymentMethod.replace("_", " ")}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <Card key={item.id} className="bg-muted/50">
                          <CardContent className="flex items-center gap-4 p-4">
                            <img
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={item.name}
                              className="h-16 w-16 rounded-lg object-cover border"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ${item.priceUsd.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold">${(item.priceUsd * item.quantity).toFixed(2)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStepIndex > 0 && (
                  <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
                    Back
                  </Button>
                )}
                {currentStepIndex < steps.length - 1 ? (
                  <Button onClick={handleNext} className="flex-1">
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1">
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                )}
              </div>

              {currentStep === "review" && (
                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our Terms and Privacy Policy.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.priceUsd * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
