import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Mail } from "lucide-react"

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold mb-6">About AKIHABARA TCG SHOP</h1>

          <div className="space-y-8">
            <div className="rounded-xl border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Based in the heart of Tokyo's Akihabara district, AKIHABARA TCG SHOP brings authentic Japanese Pokémon
                single cards to collectors worldwide. We specialize in providing international customers with access to
                genuine Japanese trading cards, each sold individually at fixed prices.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Authentic Japanese Pokémon single cards - each card sold individually</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Fixed prices - no randomness or surprises</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>International payment support (China, Vietnam, and worldwide)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Fast and reliable global shipping</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Secure transactions and authentic products guaranteed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Location
              </h2>
              <p className="text-muted-foreground">Akihabara, Tokyo, Japan</p>
            </div>

            <div className="rounded-xl border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-4">Have questions? We're here to help.</p>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
