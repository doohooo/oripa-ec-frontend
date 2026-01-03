import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Shop Column */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Shop</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link
                href="/how-to-buy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How to Buy
              </Link>
              <Link
                href="/how-to-sell"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How to Sell
              </Link>
            </nav>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Legal Hub
              </Link>
              <Link
                href="/legal/privacy-policy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/refunds"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                href="/legal/shipping"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                href="/legal/ip-disclaimer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                IP Disclaimer
              </Link>
              <Link
                href="/legal/specified-commercial-transactions-act"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Specified Commercial Transactions Act
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">© 2026 AKIHABARA TCG SHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
