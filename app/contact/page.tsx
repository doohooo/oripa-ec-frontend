import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MessageSquare } from "lucide-react"

export default function ContactPage() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We're here to help with any questions about our products or services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours.</p>
              <p className="text-sm font-medium">support@akihabaratcg.shop</p>
            </div>

            <div className="rounded-xl border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with our support team in real-time.</p>
              <Button disabled>Coming Soon</Button>
            </div>
          </div>

          <div className="mt-12 rounded-xl border bg-card p-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Do you ship internationally?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! We ship to customers worldwide from our location in Tokyo, Japan.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept international payment methods including those popular in China, Vietnam, and other
                  countries.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Are your products authentic?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, all our products are 100% authentic Japanese Pokémon cards sourced directly from authorized
                  distributors in Japan. Each card is sold individually at a fixed price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
