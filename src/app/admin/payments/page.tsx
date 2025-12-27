import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Settings } from "lucide-react"

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="AKIHABARA TCG SHOP" className="h-40 w-auto" />
            <span className="text-sm font-semibold text-muted-foreground">Admin</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              View Store
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Payment Configuration</h1>
            <p className="text-muted-foreground">Manage payment gateway settings (Demo)</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* AsiaPay Settings */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">AsiaPay Settings (Demo)</CardTitle>
              <CardDescription>Configure AsiaPay payment gateway for Asian markets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asiapay-merchant">Merchant ID</Label>
                <Input id="asiapay-merchant" value="DEMO_ASIAPAY_12345" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asiapay-key">API Key</Label>
                <Input id="asiapay-key" type="password" value="••••••••••••••••" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asiapay-callback">Callback URL</Label>
                <Input
                  id="asiapay-callback"
                  value="https://yourdomain.com/api/payments/asiapay/callback"
                  readOnly
                  className="bg-muted"
                />
              </div>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Silkpay Settings */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Silkpay Settings (Demo)</CardTitle>
              <CardDescription>Configure Silkpay for Chinese payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="silkpay-merchant">Merchant ID</Label>
                <Input id="silkpay-merchant" value="DEMO_SILKPAY_67890" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="silkpay-key">API Key</Label>
                <Input id="silkpay-key" type="password" value="••••••••••••••••" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="silkpay-callback">Callback URL</Label>
                <Input
                  id="silkpay-callback"
                  value="https://yourdomain.com/api/payments/silkpay/callback"
                  readOnly
                  className="bg-muted"
                />
              </div>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Test Connection
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-accent/50 bg-accent/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> These are demo payment gateway configurations. In production, actual credentials
              would be stored securely and never displayed in plain text.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 AKIHABARA TCG SHOP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
