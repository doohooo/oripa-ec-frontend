"use client"

import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

type Props = {
  amountUsd: number
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

function Inner({ amountUsd }: Props) {
  const stripe = useStripe()
  const elements = useElements()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!stripe || !elements) return

    setIsSubmitting(true)
    try {
      const origin = window.location.origin
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${origin}/checkout/success`,
        },
      })
      if (stripeError) setError(stripeError.message ?? "Payment failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PaymentElement />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full rounded-md bg-red-600 px-4 py-3 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : `Pay $${amountUsd.toFixed(2)} (Test)`}
      </button>
    </form>
  )
}

export default function StripeCheckoutClient({ amountUsd }: Props) {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    setClientSecret(null)
    setError(null)

    // ✅ 小数USD → cents整数へ
    const amountCents = Math.round(Number(amountUsd) * 100)

    ;(async () => {
      try {
        if (!Number.isFinite(amountCents) || amountCents < 50) {
          throw new Error("Invalid amount")
        }

        const res = await fetch("/api/stripe/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amountCents }),
        })

        const json = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(json?.error ?? "Failed to create intent")

        if (mounted) setClientSecret(json.clientSecret)
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "Invalid amount")
      }
    })()

    return () => {
      mounted = false
    }
  }, [amountUsd])

  if (error) return <p className="text-sm text-red-600">{error}</p>
  if (!clientSecret) return <p className="text-sm text-muted-foreground">Preparing payment...</p>

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Inner amountUsd={amountUsd} />
    </Elements>
  )
}
