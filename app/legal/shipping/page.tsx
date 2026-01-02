import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ShippingPage() {
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
          <h1>Shipping Policy</h1>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Overview</h2>
          <p>
            AKIHABARA TCG SHOP, operated by UNITASU LLC, ships authentic Japanese Pokémon cards internationally from our
            facility in Tokyo, Japan. This policy outlines our shipping procedures, delivery times, and important
            information for international customers.
          </p>

          <h2>2. Shipping Locations</h2>
          <p>We currently ship to most countries worldwide, including:</p>
          <ul>
            <li>North America (USA, Canada, Mexico)</li>
            <li>Europe (UK, Germany, France, and most EU countries)</li>
            <li>Asia-Pacific (Australia, New Zealand, Singapore, Taiwan, Hong Kong, South Korea)</li>
            <li>Other regions upon request</li>
          </ul>
          <p>
            If your country is not listed, please contact us at customer@akihabaratcg.com to inquire about shipping
            availability.
          </p>

          <h2>3. Processing Time</h2>
          <p>Orders are typically processed within:</p>
          <ul>
            <li>
              <strong>1-3 business days</strong> for orders placed Monday through Friday
            </li>
            <li>Orders placed on weekends or Japanese holidays will be processed on the next business day</li>
          </ul>
          <p>You will receive an email notification with tracking information once your order has been shipped.</p>

          <h2>4. Shipping Methods and Delivery Times</h2>
          <h3>Standard International Shipping</h3>
          <ul>
            <li>
              <strong>Delivery Time:</strong> 7-21 business days (depending on destination)
            </li>
            <li>
              <strong>Tracking:</strong> Included
            </li>
            <li>
              <strong>Cost:</strong> Calculated at checkout based on destination and order weight
            </li>
          </ul>

          <h3>Express International Shipping</h3>
          <ul>
            <li>
              <strong>Delivery Time:</strong> 3-7 business days
            </li>
            <li>
              <strong>Tracking:</strong> Included with real-time updates
            </li>
            <li>
              <strong>Cost:</strong> Premium rate calculated at checkout
            </li>
          </ul>

          <p>
            <strong>Note:</strong> Delivery times are estimates and may be affected by customs processing, holidays,
            weather conditions, or other factors beyond our control.
          </p>

          <h2>5. Packaging</h2>
          <p>We take great care in packaging your cards to ensure they arrive in perfect condition:</p>
          <ul>
            <li>Each card is placed in a protective sleeve and top loader</li>
            <li>Cards are secured in bubble wrap or cardboard mailers</li>
            <li>Packages are labeled as "Collectible Trading Cards" for customs</li>
            <li>Signature confirmation may be required for high-value orders</li>
          </ul>

          <h2>6. Tracking Your Order</h2>
          <p>Once your order ships, you will receive:</p>
          <ul>
            <li>A shipping confirmation email with tracking number</li>
            <li>A link to track your package in real-time</li>
            <li>Updates at major shipping milestones</li>
          </ul>
          <p>
            If tracking shows no updates for more than 7 days, please contact us at customer@akihabaratcg.com for
            assistance.
          </p>

          <h2>7. Customs, Duties, and Taxes</h2>
          <p>
            <strong>Important:</strong> International shipments may be subject to import duties, customs fees, and taxes
            imposed by your country.
          </p>
          <ul>
            <li>These charges are the buyer's responsibility and are NOT included in our product or shipping prices</li>
            <li>Customs fees vary by country and are determined by your local customs authority</li>
            <li>AKIHABARA TCG SHOP has no control over these charges and cannot predict their amount</li>
            <li>Refusal to pay customs fees may result in the package being returned to us without refund</li>
          </ul>
          <p>We recommend researching your country's import regulations and duty rates before placing an order.</p>

          <h2>8. Customs Declaration</h2>
          <p>All international packages include a customs declaration form stating:</p>
          <ul>
            <li>
              <strong>Contents:</strong> "Trading Cards - Collectible"
            </li>
            <li>
              <strong>Value:</strong> The actual purchase price paid
            </li>
            <li>
              <strong>Country of Origin:</strong> Japan
            </li>
          </ul>
          <p>
            We cannot mark items as "gifts" or undervalue packages for customs purposes, as this is illegal and violates
            international shipping regulations.
          </p>

          <h2>9. Delivery Issues</h2>
          <h3>Lost or Stolen Packages</h3>
          <p>
            If tracking shows your package was delivered but you did not receive it, please check with neighbors,
            building management, or your local post office. We are not responsible for packages marked as delivered by
            the carrier.
          </p>

          <h3>Damaged Packages</h3>
          <p>
            If your package arrives damaged, take photos immediately and contact us within 7 days. We will work with you
            to resolve the issue. See our Refund Policy for more details.
          </p>

          <h3>Incorrect Address</h3>
          <p>
            Please ensure your shipping address is correct at checkout. We are not responsible for orders shipped to
            incorrect addresses provided by the buyer. Address corrections after shipping may incur additional fees.
          </p>

          <h2>10. Shipping Restrictions</h2>
          <p>We cannot ship to:</p>
          <ul>
            <li>P.O. boxes or military APO/FPO addresses (high-value orders may require signature)</li>
            <li>Countries with trade restrictions or embargoes</li>
            <li>Locations where delivery is not possible due to carrier limitations</li>
          </ul>

          <h2>11. Order Cancellation Before Shipping</h2>
          <p>
            If you need to cancel your order, please contact us immediately at customer@akihabaratcg.com. If the order
            has not yet been shipped, we can cancel it and issue a full refund. Once shipped, the order cannot be
            canceled.
          </p>

          <h2>12. Holidays and Delays</h2>
          <p>Shipping may be delayed during:</p>
          <ul>
            <li>Japanese national holidays (Golden Week, New Year, etc.)</li>
            <li>Peak shopping seasons (Black Friday, Christmas, etc.)</li>
            <li>Natural disasters or global events affecting logistics</li>
          </ul>
          <p>We will notify customers of any anticipated delays via email or website announcement.</p>

          <h2>13. Contact Information</h2>
          <p>For shipping inquiries, please contact us:</p>
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
