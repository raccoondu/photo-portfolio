import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roam Shoot Repeat",
  description: "A photography portfolio organized by the places I've visited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="border-t border-border py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} Roam Shoot Repeat</p>
            <p>All rights reserved</p>
          </div>
        </footer>

        {/* Snipcart — replace data-api-key with your key from snipcart.com/dashboard */}
        <div
          hidden
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY || "YOUR_SNIPCART_PUBLIC_API_KEY"}
          data-config-modal-style="side"
          data-currency="usd"
        />
        <Script
          src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
