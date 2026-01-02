import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RefundsPage() {
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
          <h1>Refund Policy</h1>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Overview</h2>
          <p>
            At AKIHABARA TCG SHOP, operated by UNITASU LLC, we want you to be completely satisfied with your purchase.
            This Refund Policy outlines the circumstances under which refunds and returns are accepted.
          </p>

          <h2>2. Eligibility for Refunds</h2>
          <p>We accept refund requests under the following conditions:</p>
          <ul>
            <li>
              <strong>Damaged Items:</strong> The card arrived damaged during shipping (not due to normal wear from play
              or handling)
            </li>
            <li>
              <strong>Incorrect Item:</strong> You received a different card than what was shown in the listing
            </li>
            <li>
              <strong>Significantly Misrepresented:</strong> The card condition differs substantially from our
              description
            </li>
            <li>
              <strong>Non-Delivery:</strong> Your order never arrived and tracking shows delivery was not attempted
            </li>
          </ul>

          <h2>3. Refund Request Timeframe</h2>
          <p>To be eligible for a refund, you must contact us within:</p>
          <ul>
            <li>
              <strong>14 days</strong> of receiving your order for domestic (Japan) shipments
            </li>
            <li>
              <strong>30 days</strong> of receiving your order for international shipments
            </li>
          </ul>
          <p>Refund requests submitted after these timeframes will be evaluated on a case-by-case basis.</p>

          <h2>4. Non-Refundable Conditions</h2>
          <p>We cannot accept refunds or returns for:</p>
          <ul>
            <li>Change of mind or buyer's remorse</li>
            <li>Normal card condition variations (slight edge wear, minor whitening) that were disclosed</li>
            <li>Items damaged after delivery due to improper storage or handling</li>
            <li>Orders lost due to incorrect shipping address provided by the buyer</li>
            <li>Packages refused by the buyer at delivery</li>
            <li>Customs delays or fees (these are beyond our control)</li>
          </ul>

          <h2>5. Return Process</h2>
          <p>To request a refund:</p>
          <ol>
            <li>Contact us at customer@akihabaratcg.com with your order number and reason for the return request</li>
            <li>Provide clear photos showing the issue (damage, incorrect item, etc.)</li>
            <li>Wait for our team to review and approve your return request</li>
            <li>If approved, we will provide return shipping instructions</li>
            <li>Ship the item back to us in its original condition and packaging</li>
          </ol>
          <p>
            <strong>Important:</strong> Do not ship items back without prior approval. Unauthorized returns may not be
            processed.
          </p>

          <h2>6. Return Shipping Costs</h2>
          <ul>
            <li>
              <strong>Our Error:</strong> If we sent the wrong item or the card was damaged/misrepresented, we will
              cover return shipping costs
            </li>
            <li>
              <strong>Buyer's Responsibility:</strong> If the return is due to change of mind or buyer error, you are
              responsible for return shipping costs
            </li>
          </ul>

          <h2>7. Refund Method and Timing</h2>
          <p>Once we receive and inspect your returned item:</p>
          <ul>
            <li>
              <strong>Approved refunds</strong> will be processed within 5-7 business days
            </li>
            <li>Refunds will be issued to your original payment method (Stripe or KOMOJU)</li>
            <li>It may take an additional 5-10 business days for the refund to appear in your account</li>
            <li>Original shipping fees are non-refundable (unless the error was ours)</li>
          </ul>

          <h2>8. Exchanges</h2>
          <p>
            We do not offer direct exchanges. If you received an incorrect or damaged item, we will process a refund and
            you may place a new order if you wish.
          </p>

          <h2>9. Damaged During Shipping</h2>
          <p>If your order arrives damaged:</p>
          <ul>
            <li>Take photos of the packaging and the damaged item immediately</li>
            <li>Contact us within 7 days with order number and photos</li>
            <li>We may file a claim with the shipping carrier on your behalf</li>
            <li>Once approved, we will issue a full refund or send a replacement if available</li>
          </ul>

          <h2>10. Lost Packages</h2>
          <p>
            If tracking shows your package is lost in transit, please contact us. We will work with the shipping carrier
            to locate your package or file a claim. Refunds for lost packages are issued after the carrier confirms the
            loss.
          </p>

          <h2>11. Fraudulent Chargebacks</h2>
          <p>
            If you file a chargeback with your bank or credit card company without first attempting to resolve the issue
            with us, we reserve the right to dispute the chargeback and provide evidence of delivery and product
            accuracy. Fraudulent chargebacks may result in account suspension.
          </p>

          <h2>12. Contact Information</h2>
          <p>For refund inquiries, please contact us:</p>
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
