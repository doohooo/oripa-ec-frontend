"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle2,
  Send,
  Mail,
  Package,
  DollarSign,
  XCircle,
  Shield,
  Info,
  Camera,
  Box,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

export default function HowToSellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    email: "",
    numberOfCards: "",
    cardDetails: "",
    condition: "",
    purchasedFromUs: "",
    orderId: "",
    confirmed: false,
    photoFront: null,
    photoBack: null,
    photoCorners: null,
    photoSurface: null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI-only submission - no backend
    setSubmitted(true)
    // Scroll to success message
    setTimeout(() => {
      document.getElementById("success-message")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const scrollToForm = () => {
    document.getElementById("sell-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">Sell Your Japanese Pokémon Cards</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Submit your request and card photos online. All follow-up communication will be handled by email.
          </p>
          <Button onClick={scrollToForm} size="lg" className="text-lg px-8 py-6">
            Start Sell Request
          </Button>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="relative">
              <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <CardHeader className="pt-8">
                <Send className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-lg">Submit Request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below with your card details and upload photos.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative">
              <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <CardHeader className="pt-8">
                <Mail className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-lg">Photo Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our team reviews your photos and provides a preliminary estimate by email.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative">
              <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <CardHeader className="pt-8">
                <Package className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-lg">Mail-in Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ship your cards to Japan for physical inspection and final assessment.
                </p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="relative">
              <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <CardHeader className="pt-8">
                <DollarSign className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-lg">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once approved, payment is processed and sent to your preferred method.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Buy / What We Don't Buy */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">What We Accept</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* What We Buy */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  What We Buy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Authentic Japanese trading cards (singles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Graded cards (PSA/BGS/CGC) - optional support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Sealed products ONLY if explicitly accepted in email (default: not accepted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Collections / bulk lots (subject to review)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* What We Don't Buy */}
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="w-6 h-6" />
                  What We Don't Buy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards with severe damage (creases, bends, tears, water damage)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards with heavy whitening, peeling, or altered surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards that differ from the submitted photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Proxy cards, replicas, or non-authentic items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards without clear front and back photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards with missing corners or trimmed edges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Cards restricted by shipping or import regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Sealed products (only if explicitly approved by email in advance)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Each card is reviewed individually. Final acceptance depends on authenticity, condition, and photo
                  accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Each submission is reviewed individually. Acceptance depends on authenticity, condition, and compliance
            requirements.
          </p>
        </div>
      </section>

      {/* High-Value Verification Notice */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-secondary/40 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="w-8 h-8 text-secondary" />
                High-Value Transactions (Verification)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>
                    For high-value transactions, we may request additional verification before completing the buyback.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>This may include identity verification and proof of ownership.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>This is to protect customers and comply with international regulations.</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2 border-t">
                Typical threshold: USD 1,000+ (may vary by country/region).
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sell Request Form */}
      <section id="sell-form" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Submit Your Sell Request</h2>
            <p className="text-muted-foreground">
              Fill out the form below. We'll review your submission and contact you by email.
            </p>
          </div>

          {!submitted ? (
            <Card className="border-2 shadow-lg">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">
                        Country/Region <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g., United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2">Card Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfCards">
                        Number of Cards <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="numberOfCards"
                        type="number"
                        min="1"
                        required
                        value={formData.numberOfCards}
                        onChange={(e) => setFormData({ ...formData, numberOfCards: e.target.value })}
                        placeholder="e.g., 5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardDetails">Card Name(s) / Set Name(s)</Label>
                      <Textarea
                        id="cardDetails"
                        value={formData.cardDetails}
                        onChange={(e) => setFormData({ ...formData, cardDetails: e.target.value })}
                        placeholder="e.g., Charizard VMAX (Darkness Ablaze), Pikachu VMAX (Vivid Voltage)"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">
                        Estimated Condition <span className="text-destructive">*</span>
                      </Label>
                      <TooltipProvider>
                        <Select
                          required
                          value={formData.condition}
                          onValueChange={(val) => setFormData({ ...formData, condition: val })}
                        >
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mint">
                              <div className="flex items-center gap-2">
                                <span>Mint (M)</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">
                                      Perfect condition. No visible scratches, whitening, bends, or edge wear. Looks
                                      exactly as new.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </SelectItem>
                            <SelectItem value="near-mint">
                              <div className="flex items-center gap-2">
                                <span>Near Mint (NM)</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">
                                      Very minor imperfections may be visible upon close inspection. No major scratches,
                                      bends, or damage.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </SelectItem>
                            <SelectItem value="excellent">
                              <div className="flex items-center gap-2">
                                <span>Excellent (EX)</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">
                                      Noticeable signs of use such as light scratches or edge whitening. Card remains
                                      clean and intact.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </SelectItem>
                            <SelectItem value="good">
                              <div className="flex items-center gap-2">
                                <span>Good (GD)</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">
                                      Clear wear, scratches, whitening, or small bends. Card is still collectible but
                                      shows visible use.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TooltipProvider>
                      <p className="text-sm text-muted-foreground">
                        This condition is an estimate. Final condition will be determined after physical inspection.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Upload Card Photos</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Clear photos help us evaluate your card accurately and provide a fair offer faster.
                        </p>

                        {/* Required Photos */}
                        <div className="space-y-4 mb-6">
                          <div>
                            <Label htmlFor="photo-front" className="flex items-center gap-2">
                              Front of the Card <span className="text-destructive">*</span>
                              <span className="text-xs text-muted-foreground font-normal">(Required)</span>
                            </Label>
                            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                              <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-1">Click to upload front photo</p>
                              <p className="text-xs text-muted-foreground">JPG or PNG, max 10MB</p>
                              <Input
                                id="photo-front"
                                type="file"
                                accept="image/jpeg,image/png"
                                required
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setFormData({ ...formData, photoFront: e.target.files[0] })
                                  }
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="photo-back" className="flex items-center gap-2">
                              Back of the Card <span className="text-destructive">*</span>
                              <span className="text-xs text-muted-foreground font-normal">(Required)</span>
                            </Label>
                            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                              <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-1">Click to upload back photo</p>
                              <p className="text-xs text-muted-foreground">JPG or PNG, max 10MB</p>
                              <Input
                                id="photo-back"
                                type="file"
                                accept="image/jpeg,image/png"
                                required
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setFormData({ ...formData, photoBack: e.target.files[0] })
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Optional Photos */}
                        <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
                          <p className="text-sm font-medium mb-3">Optional but recommended for higher-value cards</p>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="photo-corners" className="flex items-center gap-2">
                                Close-up of Corners
                                <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                              </Label>
                              <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Camera className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Click to upload</p>
                                <Input
                                  id="photo-corners"
                                  type="file"
                                  accept="image/jpeg,image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setFormData({ ...formData, photoCorners: e.target.files[0] })
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="photo-surface" className="flex items-center gap-2">
                                Close-up of Surface (scratches / whitening)
                                <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                              </Label>
                              <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Camera className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Click to upload</p>
                                <Input
                                  id="photo-surface"
                                  type="file"
                                  accept="image/jpeg,image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setFormData({ ...formData, photoSurface: e.target.files[0] })
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Photo Guidelines */}
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Info className="w-5 h-5 text-blue-600" />
                              Photo Guidelines
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <ul className="text-sm space-y-1.5 text-gray-700">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>Place the card on a plain background</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>Ensure the card is fully visible</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>Avoid glare, reflections, or heavy shadows</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>Do not use filters or image editing</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>Photos must show the actual card you are submitting</span>
                              </li>
                            </ul>

                            <div className="pt-3 border-t border-blue-200 mt-4">
                              <p className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                Not Accepted
                              </p>
                              <ul className="text-sm space-y-1 text-gray-600 ml-6">
                                <li>• Blurry or cropped images</li>
                                <li>• Images taken from websites or marketplaces</li>
                                <li>• Screenshots</li>
                                <li>• Heavily edited photos</li>
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-blue-200 mt-4">
                              <p className="text-xs text-gray-600">
                                <strong>Accepted formats:</strong> JPG, PNG • <strong>Max size:</strong> 10MB per image
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Source of Purchase */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Source of Purchase</h3>
                      <div className="space-y-4">
                        <Label>
                          Was this card purchased from AKIHABARA TCG SHOP? <span className="text-destructive">*</span>
                        </Label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="purchased-yes"
                              name="purchasedFromUs"
                              value="yes"
                              required
                              checked={formData.purchasedFromUs === "yes"}
                              onChange={(e) =>
                                setFormData({ ...formData, purchasedFromUs: e.target.value, orderId: "" })
                              }
                              className="h-4 w-4 text-primary border-input focus:ring-primary"
                            />
                            <Label htmlFor="purchased-yes" className="font-normal cursor-pointer">
                              Yes, I purchased it from this store
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="purchased-no"
                              name="purchasedFromUs"
                              value="no"
                              required
                              checked={formData.purchasedFromUs === "no"}
                              onChange={(e) =>
                                setFormData({ ...formData, purchasedFromUs: e.target.value, orderId: "" })
                              }
                              className="h-4 w-4 text-primary border-input focus:ring-primary"
                            />
                            <Label htmlFor="purchased-no" className="font-normal cursor-pointer">
                              No, I purchased it elsewhere
                            </Label>
                          </div>
                        </div>

                        {/* Conditional content based on selection */}
                        {formData.purchasedFromUs === "yes" && (
                          <div className="space-y-2 mt-4 pl-6 border-l-2 border-primary/20">
                            <Label htmlFor="orderId">Order ID (optional)</Label>
                            <Input
                              id="orderId"
                              value={formData.orderId}
                              onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                              placeholder="e.g. ORDER-2025-XXXXX"
                            />
                            <p className="text-sm text-muted-foreground">
                              Providing your Order ID helps us process your request faster.
                            </p>
                          </div>
                        )}

                        {formData.purchasedFromUs === "no" && (
                          <div className="mt-4 pl-6 border-l-2 border-muted">
                            <p className="text-sm text-muted-foreground">
                              Cards purchased outside our store are still eligible for review. Additional verification
                              may be required.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Confirmation */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold border-b pb-2">Confirmation</h3>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Checkbox
                          id="confirm"
                          required
                          checked={formData.confirmed}
                          onCheckedChange={(checked) => setFormData({ ...formData, confirmed: checked as boolean })}
                        />
                        <Label htmlFor="confirm" className="text-sm leading-relaxed cursor-pointer">
                          I confirm that I am the owner of the cards and the information provided is accurate.{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full text-lg py-6">
                      Submit Sell Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Success Panel */}
              <Card id="success-message" className="border-2 border-primary shadow-lg">
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Submission Received</h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    Thank you for your submission. Our team will contact you by email with the next steps.
                  </p>
                  <p className="text-muted-foreground mb-8">Please check your inbox (and spam folder).</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <a href="mailto:customer@akihabaratcg.com">Email Support</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/products">Back to Products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* What Happens Next + What to Prepare */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* What Happens Next - Takes up 2 columns on large screens */}
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl">What Happens Next</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Step 1 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">Email Confirmation</h4>
                          <p className="text-muted-foreground">
                            We will confirm your request and may ask for additional photos.
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">Preliminary Estimate</h4>
                          <p className="text-muted-foreground mb-2">
                            We review your photos and provide a preliminary estimate by email.
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            No randomness or chance-based valuation is used.
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Box className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">Mail-in Instructions</h4>
                          <p className="text-muted-foreground mb-2">
                            If you accept the estimate, we will email you shipping instructions to send the cards to
                            Japan.
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            Final pricing is determined after physical inspection.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* What to Prepare - Takes up 1 column on large screens */}
                <div className="lg:col-span-1">
                  <Card className="h-full bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-xl">What to Prepare</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Camera className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">Clear photos (front/back) of each card</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Camera className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">Close-ups of corners/edges for condition checks</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">Any grading certification details (if applicable)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">Your preferred payment method (we will confirm by email)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* High-Value Verification Reminder */}
              <Card className="border-l-4 border-l-secondary bg-secondary/5">
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">High-Value Verification Reminder</h4>
                      <p className="text-sm text-muted-foreground">
                        For high-value transactions (typically USD 1,000+), additional verification may be requested
                        before completion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Important Notes</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Authentic physical cards only</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>No random packs or chance-based products</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Preliminary review based on photos only</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Final pricing after physical inspection in Japan</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Seller covers international shipping costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Additional verification may be required for high-value transactions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {/* Q1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does the review take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We typically respond by email within 1–3 business days.</p>
              </CardContent>
            </Card>

            {/* Q2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you cover international shipping?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  International shipping to Japan is paid by the seller. We will provide shipping instructions by email.
                </p>
              </CardContent>
            </Card>

            {/* Q3 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is the photo estimate final?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No. Final pricing is determined after physical inspection in Japan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
