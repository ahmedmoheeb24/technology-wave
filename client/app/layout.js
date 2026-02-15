import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClientFooter from "@/components/ClientFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Technology Wave - Aerospace Services & Parts",
  description: "Excellence in aerospace services and parts. Your trusted partner for aviation solutions, maintenance, and high-quality aircraft components.",
  keywords: "aerospace, aviation, aircraft parts, airplane services, aviation maintenance, aircraft components",
  authors: [{ name: "Technology Wave" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Technology Wave - Aerospace Services & Parts",
    description: "Excellence in aerospace services and parts. Your trusted partner for aviation solutions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "Technology Wave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Wave - Aerospace Services & Parts",
    description: "Excellence in aerospace services and parts. Your trusted partner for aviation solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* CRITICAL SVG FIX - Forces inline display */}
        <style dangerouslySetInnerHTML={{__html: `
          svg {
            display: inline-block !important;
            vertical-align: middle !important;
            flex-shrink: 0 !important;
            max-width: 100%;
            height: auto;
          }
          a svg, button svg, div svg, span svg, header svg, footer svg {
            display: inline-block !important;
            vertical-align: middle !important;
          }
        `}} />
        {/* Minimal favicon - only using files that exist */}
        <link rel="icon" href="/assets/favicon_io/android-chrome-192x192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/favicon_io/android-chrome-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <ClientFooter />
      </body>
    </html>
  );
}