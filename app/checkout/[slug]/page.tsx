"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, MapPin, FileText, CreditCard, ChevronRight, ShoppingCart, AlertCircle } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useCheckout, SHIPPING_METHODS } from "@/contexts/checkout-context"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

const VALID_SLUGS = ["customer", "shipping", "review", "payment"] as const
type StepSlug = (typeof VALID_SLUGS)[number]

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const STEPS: { id: StepSlug; label: string; icon: any }[] = [
  { id: "customer", label: "Customer", icon: User },
  { id: "shipping", label: "Shipping", icon: MapPin },
  { id: "review", label: "Review", icon: FileText },
  { id: "payment", label: "Payment", icon: CreditCard },
]

const FREE_SHIPPING_THRESHOLD = 100
const FREE_SHIPPING_METHOD = "standard"

function StripePaymentForm({
  amountCents,
  onSuccess,
  acceptedTerms,
}: {
  amountCents: number
  onSuccess: () => void
  acceptedTerms: boolean
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isPaying, setIsPaying] = useState(false)
  const [error, setError] = useState<string>("")

  const handlePay = async () => {
    setError("")
    if (!stripe || !elements) return
    if (!acceptedTerms) {
      setError("Please accept the terms to continue.")
      return
    }

    setIsPaying(true)
    try {
      // confirmPayment は3DS等でも“サイト内”で完結（iframe/modal）します
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // 何かあった時の戻り先（基本は戻らないが保険）
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      })

      if (error) {
        setError(error.message || "Payment failed")
        setIsPaying(false)
        return
      }

      onSuccess()
    } catch (e: any) {
      setError(e?.message || "Payment failed")
      setIsPaying(false)
    }
  }

  return (
    <div className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button onClick={handlePay} disabled={!stripe || isPaying} className="w-full">
        {isPaying ? "Processing..." : `Pay $${(amountCents / 100).toFixed(2)}`}
      </Button>
    </div>
  )
}

function StripeElementsWrapper({
  amountCents,
  onPaid,
  acceptedTerms,
}: {
  amountCents: number
  onPaid: () => void
  acceptedTerms: boolean
}) {
  const [clientSecret, setClientSecret] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let cancelled = false
    setError("")
    setClientSecret("")

    ;(async () => {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountCents,
            currency: "usd",
            metadata: { source: "checkout" },
          }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || "Failed to init payment")
        if (!cancelled) setClientSecret(json.clientSecret)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to init payment")
      }
    })()

    return () => {
      cancelled = true
    }
  }, [amountCents])

  if (error) return <p className="text-sm text-destructive">{error}</p>
  if (!clientSecret) return <p className="text-sm text-muted-foreground">Loading payment form...</p>

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm amountCents={amountCents} onSuccess={onPaid} acceptedTerms={acceptedTerms} />
    </Elements>
  )
}

export default function CheckoutStepPage() {
  const router = useRouter()
  const params = useParams() as { slug?: string | string[] }

  const { cart, getCartTotal, clearCart, isLoaded: isCartLoaded } = useCart()
  const { data, updateData, isStepComplete, getFirstIncompleteStep, clearData, getShippingPrice } = useCheckout()

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const rawSlug = params?.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const step = slug && VALID_SLUGS.includes(slug) ? slug : "customer"

  useEffect(() => {
    // Wait for cart to hydrate from localStorage
    if (!isCartLoaded) return

    if (!cart.length) {
      router.replace("/cart")
      return
    }

    const firstIncomplete = getFirstIncompleteStep()
    if (slug !== firstIncomplete && !isStepComplete(slug)) {
      router.replace(`/checkout/${firstIncomplete}`)
    }
  }, [slug, cart.length, router, getFirstIncompleteStep, isStepComplete, isCartLoaded])

  if (!isCartLoaded || !cart.length) {
    return null
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === slug)
  if (currentStepIndex < 0) return null

  const subtotal = getCartTotal()
  const rawShipping = getShippingPrice()

  const isFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD &&
    data.shippingMethod === FREE_SHIPPING_METHOD

  const shipping = isFreeShipping ? 0 : rawShipping
  const total = subtotal + shipping

  const amountCents = Math.round(total * 100)

  const validateCustomer = (): { ok: boolean; firstErrorKey?: string } => {
    const newErrors: Record<string, string> = {}

    if (!data.fullName) newErrors.fullName = "Full name is required"
    else if (data.fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters"

    if (!data.email) newErrors.email = "Email is required"
    else if (!data.email.includes("@") || !data.email.includes(".")) newErrors.email = "Enter a valid email"

    setErrors(newErrors)
    const keys = Object.keys(newErrors)
    return { ok: keys.length === 0, firstErrorKey: keys[0] }
  }

  const validateShipping = (): { ok: boolean; firstErrorKey?: string } => {
    const newErrors: Record<string, string> = {}

    if (!data.country) newErrors.country = "Country is required"
    if (!data.addressLine1) newErrors.addressLine1 = "Address is required"
    if (!data.city) newErrors.city = "City is required"

    const isHongKong = data.country === "HK"
    if (!isHongKong && !data.postalCode) {
      newErrors.postalCode = "Postal code is required"
    }

    const requiresState = ["US", "CA", "AU"].includes(data.country)
    if (requiresState && !data.state) {
      newErrors.state = "State/Province is required"
    }

    if (!data.shippingMethod) newErrors.shippingMethod = "Please select a shipping method"

    setErrors(newErrors)
    const keys = Object.keys(newErrors)
    return { ok: keys.length === 0, firstErrorKey: keys[0] }
  }

  const validatePayment = (): { ok: boolean; firstErrorKey?: string } => {
    const newErrors: Record<string, string> = {}
    if (!data.acceptedTerms) newErrors.acceptedTerms = "You must accept the terms to continue"
    setErrors(newErrors)
    const keys = Object.keys(newErrors)
    return { ok: keys.length === 0, firstErrorKey: keys[0] }
  }

  const handleContinue = () => {
    let result: { ok: boolean; firstErrorKey?: string } = { ok: true }

    if (slug === "customer") {
      result = validateCustomer()
    } else if (slug === "shipping") {
      result = validateShipping()
    } else if (slug === "review") {
      result = { ok: true }
    }

    if (!result.ok) {
      const firstKey = result.firstErrorKey
      if (firstKey) {
        const el = document.getElementById(firstKey)
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      router.push(`/checkout/${STEPS[nextIndex].id}`)
    } else {
      void handlePlaceOrder()
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      router.push(`/checkout/${STEPS[prevIndex].id}`)
    } else {
      router.push("/cart")
    }
  }

  const handlePlaceOrder = async () => {
    const result = validatePayment()
    if (!result.ok) {
      const firstKey = result.firstErrorKey
      if (firstKey) {
        const el = document.getElementById(firstKey)
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    clearData()
    router.push("/checkout/success")
  }

  const requiresState = ["US", "CA", "AU"].includes(data.country)

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

      {/* Progress Stepper */}
      <div className="mb-12 flex justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          {STEPS.map((step, index) => {
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
                {index < STEPS.length - 1 && (
                  <ChevronRight className={`mx-2 h-5 w-5 ${isCompleted ? "text-primary" : "text-muted-foreground/30"}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{STEPS[currentStepIndex]?.label} Information</CardTitle>
              <CardDescription>
                Step {currentStepIndex + 1} of {STEPS.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {slug === "customer" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={data.fullName}
                      onChange={(e) => {
                        updateData({ fullName: e.target.value })
                        if (errors.fullName) setErrors((prev: any) => ({ ...prev, fullName: "" }))
                      }}
                      placeholder="John Doe"
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => {
                        updateData({ email: e.target.value })
                        if (errors.email) setErrors((prev: any) => ({ ...prev, email: "" }))
                      }}
                      placeholder="your@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">We'll send your order confirmation and updates to this email.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => updateData({ phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                    <p className="text-xs text-muted-foreground">For delivery updates and support (optional).</p>
                  </div>
                </div>
              )}

              {slug === "shipping" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Shipping Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select value={data.country} onValueChange={(val) => updateData({ country: val })}>
                          <SelectTrigger id="country" className={errors.country ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CN">China</SelectItem>
                            <SelectItem value="VN">Vietnam</SelectItem>
                            <SelectItem value="JP">Japan</SelectItem>
                            <SelectItem value="HK">Hong Kong</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="addressLine1">Address Line 1 *</Label>
                        <Input
                          id="addressLine1"
                          value={data.addressLine1}
                          onChange={(e) => updateData({ addressLine1: e.target.value })}
                          placeholder="123 Main Street"
                          className={errors.addressLine1 ? "border-destructive" : ""}
                        />
                        {errors.addressLine1 && (
                          <p className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            {errors.addressLine1}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
                        <Input
                          id="addressLine2"
                          value={data.addressLine2}
                          onChange={(e) => updateData({ addressLine2: e.target.value })}
                          placeholder="Apt, Suite, etc."
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={data.city}
                            onChange={(e) => updateData({ city: e.target.value })}
                            placeholder="New York"
                            className={errors.city ? "border-destructive" : ""}
                          />
                          {errors.city && (
                            <p className="flex items-center gap-1 text-xs text-destructive">
                              <AlertCircle className="h-3 w-3" />
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province {requiresState ? "*" : "(optional)"}</Label>
                          <Input
                            id="state"
                            value={data.state}
                            onChange={(e) => updateData({ state: e.target.value })}
                            placeholder="NY"
                            className={errors.state ? "border-destructive" : ""}
                          />
                          {errors.state && (
                            <p className="flex items-center gap-1 text-xs text-destructive">
                              <AlertCircle className="h-3 w-3" />
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal/ZIP Code {data.country === "HK" ? "(optional)" : "*"}</Label>
                        <Input
                          id="postalCode"
                          value={data.postalCode}
                          onChange={(e) => updateData({ postalCode: e.target.value })}
                          placeholder="10001"
                          className={errors.postalCode ? "border-destructive" : ""}
                        />
                        {errors.postalCode && (
                          <p className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div id="shippingMethod">
                    <h3 className="mb-4 text-lg font-semibold">Shipping Method</h3>
                    <Label className="mb-3 block">Select Shipping Method *</Label>
                    <RadioGroup value={data.shippingMethod} onValueChange={(val) => updateData({ shippingMethod: val })}>
                      {SHIPPING_METHODS.map((method) => (
                        <Card key={method.id} className={`cursor-pointer ${data.shippingMethod === method.id ? "border-primary" : ""}`}>
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div>
                                <Label htmlFor={method.id} className="cursor-pointer font-medium">
                                  {method.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{method.eta}</p>

                                {method.id === FREE_SHIPPING_METHOD &&
                                  subtotal < FREE_SHIPPING_THRESHOLD && (
                                    <p className="text-xs text-muted-foreground">
                                      Free over ${FREE_SHIPPING_THRESHOLD}
                                    </p>
                                )}
                              </div>
                            </div>
                            <p className="font-semibold">${method.price.toFixed(2)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </RadioGroup>
                    {errors.shippingMethod && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.shippingMethod}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {slug === "review" && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Customer Information</h3>
                      <Button variant="link" size="sm" onClick={() => router.push("/checkout/customer")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-1 text-sm">
                        <p className="font-medium">{data.fullName}</p>
                        <p className="text-muted-foreground">{data.email}</p>
                        {data.phone && <p className="text-muted-foreground">{data.phone}</p>}
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Shipping Address</h3>
                      <Button variant="link" size="sm" onClick={() => router.push("/checkout/shipping")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-1 text-sm">
                        <p>{data.addressLine1}</p>
                        {data.addressLine2 && <p>{data.addressLine2}</p>}
                        <p>
                          {data.city}
                          {data.state && `, ${data.state}`} {data.postalCode}
                        </p>
                        <p>{data.country}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Shipping Method</h3>
                      <Button variant="link" size="sm" onClick={() => router.push("/checkout/shipping")}>
                        Edit
                      </Button>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 text-sm">
                        <p className="capitalize">{data.shippingMethod.replace("-", " ")} Shipping</p>
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

              {slug === "payment" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Payment Information</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Pay securely with Stripe (card details are never stored on our server).
                        </p>

                        <StripeElementsWrapper
                          amountCents={amountCents}
                          acceptedTerms={data.acceptedTerms}
                          onPaid={() => {
                            clearCart()
                            clearData()
                            router.push("/checkout/success")
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="acceptedTerms"
                        checked={data.acceptedTerms}
                        onCheckedChange={(checked) => updateData({ acceptedTerms: checked as boolean })}
                        className={errors.acceptedTerms ? "border-destructive" : ""}
                      />
                      <Label htmlFor="acceptedTerms" className="text-sm leading-relaxed cursor-pointer">
                        I accept the{" "}
                        <Link href="/legal/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/legal/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.acceptedTerms && (
                      <p className="flex items-center gap-1 text-xs text-destructive ml-7">
                        <AlertCircle className="h-3 w-3" />
                        {errors.acceptedTerms}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <Separator />

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
                  Back
                </Button>

                {slug !== "payment" && (
                  slug === "review" ? (
                    <Button onClick={handleContinue} className="flex-1">
                        Proceed to Payment
                    </Button>
                  ) : (
                    <Button
                      onClick={handleContinue}
                      className="flex-1"
                      disabled={slug === "customer" && (!data.fullName || !data.email || !data.email.includes("@"))}
                    >
                      Continue
                    </Button>
                  )
                )}
              </div>
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
                  <span className="font-medium">
                    {isFreeShipping ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
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
