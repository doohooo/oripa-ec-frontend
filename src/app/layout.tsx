// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oripa EC Demo",
  description: "Cross-border trading card shop demo for AsiaPay / Silkpay review.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-bold">
          <span className="text-sky-400">Oripa</span>
          <span className="text-slate-100">EC</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="hover:text-sky-400">
            Home
          </a>
          <a href="/products" className="hover:text-sky-400">
            Shop
          </a>
          <a href="/how-to-buy" className="hover:text-sky-400">
            How to Buy
          </a>
          <a href="/login" className="hover:text-sky-400">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} Oripa EC Demo. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="/about" className="hover:text-sky-400">
            About
          </a>
          <a href="/terms" className="hover:text-sky-400">
            Terms
          </a>
          <a href="/privacy" className="hover:text-sky-400">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
