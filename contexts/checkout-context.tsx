"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    eta: "7-14 business days",
    price: 5.99,
  },
  {
    id: "express",
    name: "Express Shipping",
    eta: "3-5 business days",
    price: 15.99,
  },
  {
    id: "priority",
    name: "Priority Shipping",
    eta: "1-2 business days",
    price: 29.99,
  },
] as const

interface CheckoutData {
  // Customer step - full name, email, and optional phone
  fullName: string
  email: string
  phone: string // optional field

  // Shipping step
  country: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  shippingMethod: string

  // Payment step
  acceptedTerms: boolean
}

interface CheckoutContextType {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  isStepComplete: (step: string) => boolean
  getFirstIncompleteStep: () => string
  clearData: () => void
  getShippingPrice: () => number
}

const initialData: CheckoutData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  shippingMethod: "",
  acceptedTerms: false,
}

function mergeWithDefaults(stored: Partial<CheckoutData>): CheckoutData {
  return {
    fullName: stored.fullName ?? initialData.fullName,
    email: stored.email ?? initialData.email,
    phone: stored.phone ?? initialData.phone,
    country: stored.country ?? initialData.country,
    addressLine1: stored.addressLine1 ?? initialData.addressLine1,
    addressLine2: stored.addressLine2 ?? initialData.addressLine2,
    city: stored.city ?? initialData.city,
    state: stored.state ?? initialData.state,
    postalCode: stored.postalCode ?? initialData.postalCode,
    shippingMethod: stored.shippingMethod ?? initialData.shippingMethod,
    acceptedTerms: stored.acceptedTerms ?? initialData.acceptedTerms,
  }
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CheckoutData>(initialData)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("akihabara-checkout")
    if (stored) {
      try {
        const loadedData = JSON.parse(stored) as Partial<CheckoutData>
        setData(mergeWithDefaults(loadedData))
      } catch (e) {
        console.error("Failed to parse checkout data", e)
        setData(initialData)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("akihabara-checkout", JSON.stringify(data))
    }
  }, [data, isLoaded])

  const updateData = (updates: Partial<CheckoutData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const getShippingPrice = (): number => {
    const selectedMethod = SHIPPING_METHODS.find((m) => m.id === data.shippingMethod)
    return selectedMethod ? selectedMethod.price : SHIPPING_METHODS[0].price
  }

  const isStepComplete = (step: string): boolean => {
    switch (step) {
      case "customer":
        const hasValidName = !!(data.fullName && data.fullName.trim().length >= 2)
        const hasValidEmail = !!(data.email && data.email.includes("@") && data.email.includes("."))
        return hasValidName && hasValidEmail
      case "shipping":
        const hasBasicAddress = !!(data.country && data.addressLine1 && data.city)
        const requiresState = ["US", "CA", "AU"].includes(data.country)
        const hasState = requiresState ? !!data.state : true
        const isHongKong = data.country === "HK"
        const hasPostalCode = isHongKong ? true : !!data.postalCode
        return hasBasicAddress && hasState && hasPostalCode && !!data.shippingMethod
      case "review":
        return isStepComplete("customer") && isStepComplete("shipping")
      case "payment":
        return isStepComplete("review") && data.acceptedTerms
      default:
        return false
    }
  }

  const getFirstIncompleteStep = (): string => {
    if (!isStepComplete("customer")) return "customer"
    if (!isStepComplete("shipping")) return "shipping"
    if (!isStepComplete("review")) return "review"
    if (!isStepComplete("payment")) return "payment"
    return "customer"
  }

  const clearData = () => {
    setData(initialData)
    localStorage.removeItem("akihabara-checkout")
  }

  return (
    <CheckoutContext.Provider
      value={{ data, updateData, isStepComplete, getFirstIncompleteStep, clearData, getShippingPrice }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider")
  }
  return context
}
