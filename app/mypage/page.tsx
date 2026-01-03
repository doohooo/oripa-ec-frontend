import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"

export default function MyPagePage() {
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
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">My Page</h1>
              <p className="text-muted-foreground">Manage your account and orders</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              User dashboard and order history will be available soon.
            </p>
            <p className="text-sm text-muted-foreground">
              This page is under construction. You'll be able to view your order history, track shipments, and manage
              your account settings here.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
