import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/legal">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Legal Hub
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using AKIHABARA TCG SHOP ("the Site"), operated by UNITASU LLC, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            AKIHABARA TCG SHOP is an e-commerce platform that sells authentic Japanese Pokémon trading cards as physical
            collectible items. Each product listing represents the exact card that will be shipped to you.
          </p>
          <p>
            <strong>Important:</strong> We sell physical trading cards only. This is not a lottery, gambling service, or
            mystery pack system. Each product shows the specific card you will receive at a fixed price.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 18 years old to make purchases on our Site. By placing an order, you represent that you
            are of legal age to enter into a binding contract.
          </p>

          <h2>4. Product Information</h2>
          <p>
            We make every effort to display product images and descriptions accurately. However, we do not guarantee
            that colors, details, or other content on the Site are completely accurate or error-free.
          </p>
          <p>Card conditions are graded and described honestly. We photograph actual cards when possible.</p>

          <h2>5. Pricing and Payment</h2>
          <p>All prices are listed in the currency displayed on the product page and include applicable taxes.</p>
          <p>We accept payment through Stripe and KOMOJU. Payment must be received before orders are shipped.</p>
          <p>
            We reserve the right to refuse or cancel orders for any reason, including pricing errors, product
            availability, or suspected fraudulent activity.
          </p>

          <h2>6. Orders and Shipping</h2>
          <p>
            When you place an order, you will receive an order confirmation email. This does not constitute acceptance
            of your order. We reserve the right to accept or decline your order.
          </p>
          <p>
            Once your order is shipped, you will receive a shipping confirmation with tracking information. Please see
            our Shipping Policy for detailed information about international delivery.
          </p>

          <h2>7. International Shipping and Customs</h2>
          <p>
            We ship internationally from Japan. You are responsible for complying with all applicable import laws and
            regulations in your country.
          </p>
          <p>
            Import duties, customs fees, and taxes are the responsibility of the buyer. These charges are not included
            in our product prices or shipping fees.
          </p>

          <h2>8. Returns and Refunds</h2>
          <p>
            Please see our Refund Policy for detailed information about returns, refunds, and exchanges. Generally, we
            accept returns for damaged or misrepresented items within a specified timeframe.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            Pokémon, Pokémon Trading Card Game, and all related trademarks are owned by Nintendo, Creatures Inc., and
            GAME FREAK Inc. We are an independent retailer and are not affiliated with, endorsed by, or sponsored by
            these companies. See our IP Disclaimer for more information.
          </p>

          <h2>10. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Engage in fraudulent activity or chargebacks without valid reason</li>
            <li>Resell products obtained through fraudulent means</li>
            <li>Use automated systems to scrape or collect data from the Site</li>
          </ul>

          <h2>11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, UNITASU LLC shall not be liable for any indirect, incidental,
            special, or consequential damages arising from your use of the Site or purchase of products.
          </p>
          <p>Our total liability shall not exceed the amount you paid for the specific product in question.</p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of Japan. Any disputes shall be resolved in the courts of
            Tokyo, Japan.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
            upon posting. Your continued use of the Site constitutes acceptance of the modified terms.
          </p>

          <h2>14. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us:</p>
          <p>
            <strong>UNITASU LLC</strong>
            <br />
            2F, 55 Kandasakumagashi, Chiyoda-ku, Tokyo, Japan
            <br />
            Phone: +81-3-4400-0482
            <br />
            Email: customer@akihabaratcg.com
            <br />
            Responsible Person: Ryuto Ono
          </p>
        </div>
      </main>
    </div>
  )
}
