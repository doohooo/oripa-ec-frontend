import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Shield, Package, CreditCard, AlertCircle, Building } from "lucide-react"

export default function LegalPage() {
  const legalPages = [
    {
      href: "/legal/privacy-policy",
      icon: Shield,
      title: "Privacy Policy",
      description: "Learn how we collect, use, and protect your personal information.",
    },
    {
      href: "/legal/terms",
      icon: FileText,
      title: "Terms of Service",
      description: "Review the terms and conditions for using our services.",
    },
    {
      href: "/legal/refunds",
      icon: CreditCard,
      title: "Refund Policy",
      description: "Understand our refund and return policy for purchased items.",
    },
    {
      href: "/legal/shipping",
      icon: Package,
      title: "Shipping Policy",
      description: "Details about our international shipping procedures and delivery times.",
    },
    {
      href: "/legal/ip-disclaimer",
      icon: AlertCircle,
      title: "Intellectual Property Disclaimer",
      description: "Important information about trademarks and intellectual property rights.",
    },
    {
      href: "/legal/specified-commercial-transactions-act",
      icon: Building,
      title: "Specified Commercial Transactions Act",
      description: "Required disclosure under Japanese law for e-commerce businesses.",
    },
  ]

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
          <h1 className="text-4xl font-bold mb-6">Legal Hub</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Important legal information and policies for AKIHABARA TCG SHOP.
          </p>

          <div className="space-y-6">
            {legalPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <div className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <page.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{page.title}</h3>
                      <p className="text-muted-foreground mb-4">{page.description}</p>
                      <Button variant="outline" size="sm">
                        View {page.title}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
