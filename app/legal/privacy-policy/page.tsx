import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: January 2, 2026</p>

          <h2>1. Introduction</h2>
          <p>
            UNITASU LLC ("we", "our", or "us") operates AKIHABARA TCG SHOP. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website and purchase products from us.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We collect personal information that you provide to us, including:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Shipping address and billing address</li>
            <li>Payment information (processed securely through Stripe and KOMOJU)</li>
            <li>Order history and purchase details</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect certain information, including:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping notifications</li>
            <li>Respond to customer service requests</li>
            <li>Improve our website and services</li>
            <li>Prevent fraudulent transactions</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Payment Processing</h2>
          <p>
            We use third-party payment processors (Stripe and KOMOJU) to process payments. We do not store your complete
            credit card information on our servers. Payment information is transmitted securely to our payment
            processors using industry-standard encryption.
          </p>

          <h2>5. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Shipping carriers to deliver your orders</li>
            <li>Payment processors to complete transactions</li>
            <li>Service providers who assist with our business operations</li>
            <li>Law enforcement when required by law</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>6. International Transfers</h2>
          <p>
            Our business is based in Japan. If you are accessing our website from outside Japan, please be aware that
            your information may be transferred to, stored, and processed in Japan or other countries where our service
            providers operate.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2>8. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Objection to processing of your information</li>
          </ul>

          <h2>9. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
            information from children.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>12. Contact Information</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
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
