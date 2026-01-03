import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function IPDisclaimerPage() {
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
          <h1>Intellectual Property Disclaimer</h1>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Overview</h2>
          <p>
            AKIHABARA TCG SHOP, operated by UNITASU LLC, is an independent retailer of authentic Japanese Pokémon
            trading cards. This disclaimer clarifies the ownership of intellectual property rights related to the
            products we sell.
          </p>

          <h2>2. Trademark Ownership</h2>
          <p>The following trademarks and intellectual property are owned by their respective owners:</p>
          <ul>
            <li>
              <strong>Pokémon</strong> is a registered trademark of Nintendo, Creatures Inc., and GAME FREAK Inc.
            </li>
            <li>
              <strong>Pokémon Trading Card Game</strong> and all related card designs, artwork, and game mechanics are
              owned by The Pokémon Company International and Nintendo.
            </li>
            <li>
              All character names, images, and related content are the property of their respective copyright holders.
            </li>
          </ul>

          <h2>3. No Affiliation</h2>
          <p>
            <strong>IMPORTANT:</strong> AKIHABARA TCG SHOP is NOT affiliated with, endorsed by, sponsored by, or
            officially connected to:
          </p>
          <ul>
            <li>Nintendo Co., Ltd.</li>
            <li>The Pokémon Company International</li>
            <li>Creatures Inc.</li>
            <li>GAME FREAK Inc.</li>
          </ul>
          <p>
            We are an independent, third-party retailer of officially licensed Pokémon trading cards produced by these
            companies. We purchase authentic cards through authorized distributors and resell them to collectors and
            players worldwide.
          </p>

          <h2>4. Authenticity Guarantee</h2>
          <p>All Pokémon cards sold on AKIHABARA TCG SHOP are:</p>
          <ul>
            <li>
              <strong>100% authentic</strong> and officially licensed products
            </li>
            <li>Sourced from authorized Japanese distributors and retailers</li>
            <li>Not counterfeit, reproduction, or proxy cards</li>
            <li>Sold in compliance with the first-sale doctrine and applicable laws</li>
          </ul>
          <p>
            We have the legal right to resell these products as pre-owned or new physical goods in the secondary market.
          </p>

          <h2>5. Fair Use of Trademarks</h2>
          <p>
            We use the names "Pokémon", "Pokémon Trading Card Game", and related trademarks for the purpose of
            accurately describing the products we sell. This is permissible under trademark law as nominative fair use.
          </p>
          <p>Our use of these trademarks:</p>
          <ul>
            <li>Is necessary to identify the products being sold</li>
            <li>Uses only as much of the trademark as necessary</li>
            <li>Does not suggest sponsorship or endorsement by the trademark owners</li>
          </ul>

          <h2>6. Product Images and Descriptions</h2>
          <p>
            Product images displayed on our website may be photographs of actual cards we have in stock, or official
            product images provided by manufacturers for descriptive purposes.
          </p>
          <p>
            All card artwork, logos, and designs depicted on the cards themselves are the property of their respective
            copyright holders and are used here solely to accurately represent the products being sold.
          </p>

          <h2>7. Website Content</h2>
          <p>The following content on AKIHABARA TCG SHOP is owned by UNITASU LLC:</p>
          <ul>
            <li>Website design, layout, and branding (logo, color scheme, etc.)</li>
            <li>Original written content, product descriptions, and guides</li>
            <li>Custom photography and original graphics created by our team</li>
          </ul>
          <p>
            This content may not be reproduced, distributed, or used without our express written permission, except as
            permitted by law.
          </p>

          <h2>8. No Gambling or Chance-Based Mechanics</h2>
          <p>
            <strong>Clarification on Product Sales:</strong> AKIHABARA TCG SHOP sells physical trading cards at fixed
            prices. Each product listing clearly shows the exact card you will receive. We do not operate lotteries,
            random packs, mystery boxes, or any form of gambling or chance-based purchasing system.
          </p>
          <p>
            While the Pokémon Trading Card Game itself may involve elements of chance when played as a game, our sales
            model is a standard retail transaction for physical goods.
          </p>

          <h2>9. Copyright Compliance</h2>
          <p>
            If you believe any content on our website infringes your copyright or intellectual property rights, please
            contact us immediately at customer@akihabaratcg.com with:
          </p>
          <ul>
            <li>A description of the copyrighted work you claim has been infringed</li>
            <li>The URL or location of the allegedly infringing content</li>
            <li>Your contact information and a statement of good faith belief</li>
          </ul>
          <p>We will investigate and take appropriate action in accordance with applicable law.</p>

          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites for informational purposes. We are not responsible for
            the content, policies, or practices of these external sites.
          </p>

          <h2>11. Changes to This Disclaimer</h2>
          <p>
            We may update this Intellectual Property Disclaimer as needed. Any changes will be posted on this page with
            an updated "Last Updated" date.
          </p>

          <h2>12. Contact Information</h2>
          <p>For intellectual property inquiries, please contact us:</p>
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
