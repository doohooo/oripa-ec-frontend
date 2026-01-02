import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SpecifiedCommercialTransactionsActPage() {
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
          <h1>Specified Commercial Transactions Act</h1>
          <p className="text-muted-foreground">特定商取引法に基づく表記 (Tokutei Shōtorihiki-hō)</p>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Overview</h2>
          <p>
            This page contains legally required disclosures under Japan's Specified Commercial Transactions Act (Act on
            Specified Commercial Transactions, 特定商取引法). This law requires e-commerce businesses operating in or
            from Japan to clearly display certain business information.
          </p>

          <h2>2. Business Information</h2>

          <h3>Company Name (事業者名)</h3>
          <p>
            <strong>UNITASU LLC</strong>
          </p>

          <h3>Representative (運営責任者)</h3>
          <p>
            <strong>Ryuto Ono</strong>
          </p>

          <h3>Business Address (所在地)</h3>
          <p>
            2F, 55 Kandasakumagashi, Chiyoda-ku, Tokyo, Japan
            <br />
            〒101-0026 東京都千代田区神田佐久間河岸55番地 2階
          </p>

          <h3>Contact Information (連絡先)</h3>
          <p>
            <strong>Phone:</strong> +81-3-4400-0482
            <br />
            <strong>Email:</strong> customer@akihabaratcg.com
            <br />
            <strong>Business Hours:</strong> Monday - Friday, 10:00 AM - 6:00 PM JST (excluding Japanese national
            holidays)
          </p>

          <h2>3. Products and Services (販売商品)</h2>
          <p>
            AKIHABARA TCG SHOP sells authentic Japanese Pokémon trading cards as physical collectible items. Each
            product is sold individually at a fixed price, and customers receive the exact card shown in the product
            listing.
          </p>
          <p>
            <strong>Important:</strong> We do not sell mystery packs, random packs, or lottery-style products. This is a
            standard e-commerce transaction for physical goods.
          </p>

          <h2>4. Pricing (商品代金)</h2>
          <ul>
            <li>All prices are displayed on individual product pages</li>
            <li>Prices include consumption tax where applicable</li>
            <li>Prices do NOT include international shipping fees or customs duties</li>
            <li>Shipping costs are calculated at checkout based on destination</li>
          </ul>

          <h2>5. Payment Methods (支払方法)</h2>
          <p>We accept the following payment methods:</p>
          <ul>
            <li>Credit Card (Visa, Mastercard, American Express, JCB) via Stripe</li>
            <li>Debit Card via Stripe</li>
            <li>KOMOJU payment services (convenience store payment, bank transfer for Japanese customers)</li>
            <li>UnionPay (for customers in China and other regions)</li>
          </ul>
          <p>Payment must be completed before orders are processed and shipped.</p>

          <h2>6. Payment Timing (支払時期)</h2>
          <p>
            Payment is due at the time of purchase. Orders will not be processed until payment has been successfully
            received and confirmed by our payment processors.
          </p>

          <h2>7. Delivery Time (引渡時期)</h2>
          <ul>
            <li>
              <strong>Processing Time:</strong> 1-3 business days after payment confirmation
            </li>
            <li>
              <strong>Domestic (Japan) Shipping:</strong> 2-5 business days after shipment
            </li>
            <li>
              <strong>International Standard Shipping:</strong> 7-21 business days after shipment (varies by country)
            </li>
            <li>
              <strong>International Express Shipping:</strong> 3-7 business days after shipment
            </li>
          </ul>
          <p>
            Delivery times are estimates and may be affected by customs, holidays, or other factors beyond our control.
          </p>

          <h2>8. Returns and Cancellations (返品・キャンセル)</h2>

          <h3>Cancellations Before Shipping</h3>
          <p>
            Orders can be canceled before shipment by contacting customer@akihabaratcg.com. Full refunds will be issued
            for canceled orders.
          </p>

          <h3>Returns After Delivery</h3>
          <p>We accept returns under the following conditions:</p>
          <ul>
            <li>The item arrived damaged during shipping</li>
            <li>You received the wrong card (different from the listing)</li>
            <li>The card condition was significantly misrepresented</li>
          </ul>
          <p>
            <strong>Return Period:</strong> Within 14 days for domestic orders, 30 days for international orders.
          </p>

          <h3>Non-Returnable Items</h3>
          <ul>
            <li>Change of mind purchases</li>
            <li>Items damaged after delivery due to buyer handling</li>
            <li>Normal card condition variations that were disclosed in the listing</li>
          </ul>
          <p>Please see our full Refund Policy for detailed information.</p>

          <h2>9. Special Sales Conditions (特別な販売条件)</h2>
          <p>
            <strong>International Customers:</strong> Buyers are responsible for all customs duties, import taxes, and
            fees imposed by their country. These charges are NOT included in our product or shipping prices.
          </p>
          <p>
            <strong>Product Availability:</strong> All products are subject to availability. We reserve the right to
            cancel orders if items become unavailable after purchase.
          </p>

          <h2>10. Additional Fees (その他費用)</h2>
          <ul>
            <li>
              <strong>Shipping Fees:</strong> Calculated at checkout based on destination and shipping method
            </li>
            <li>
              <strong>Payment Processing Fees:</strong> Included in the product price (no additional charge to customer)
            </li>
            <li>
              <strong>Customs Duties and Taxes:</strong> The responsibility of the buyer (not included in our prices)
            </li>
          </ul>

          <h2>11. Limitation of Liability (責任の制限)</h2>
          <p>
            UNITASU LLC is not responsible for delays or issues caused by shipping carriers, customs authorities,
            natural disasters, or other factors beyond our control. We will make reasonable efforts to assist customers
            in resolving delivery issues.
          </p>

          <h2>12. Dispute Resolution (紛争解決)</h2>
          <p>
            Any disputes arising from transactions on AKIHABARA TCG SHOP shall be resolved under the laws of Japan. The
            courts of Tokyo, Japan shall have exclusive jurisdiction.
          </p>

          <h2>13. Privacy and Data Protection (個人情報保護)</h2>
          <p>
            We collect and use customer information in accordance with our Privacy Policy and applicable data protection
            laws. Personal information is used solely for order fulfillment and customer communication.
          </p>

          <h2>14. Business Registration (事業者登録)</h2>
          <p>
            UNITASU LLC is a registered business entity operating legally in Japan. All required business licenses and
            tax registrations are maintained in accordance with Japanese law.
          </p>

          <h2>15. Contact for Complaints (苦情・相談窓口)</h2>
          <p>For complaints, questions, or concerns regarding transactions, please contact us:</p>
          <p>
            <strong>Email:</strong> customer@akihabaratcg.com
            <br />
            <strong>Phone:</strong> +81-3-4400-0482
            <br />
            <strong>Response Time:</strong> We aim to respond to all inquiries within 1-2 business days
          </p>

          <h2>16. Changes to This Disclosure (表記の変更)</h2>
          <p>
            We may update this disclosure as required by law or when business information changes. Updated information
            will be posted on this page with a new "Last Updated" date.
          </p>

          <hr />

          <p className="text-sm text-muted-foreground">
            <strong>Note to International Customers:</strong> This page contains legally required information under
            Japanese law. While our primary customer base is international, we are required to display this information
            as a business operating from Japan.
          </p>
        </div>
      </main>
    </div>
  )
}
