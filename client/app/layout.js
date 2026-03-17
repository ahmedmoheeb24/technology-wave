import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import "./globals.css";

const outfit = OutfitFont({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-outfit',
});

const ovo = OvoFont({
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-ovo',
});

export const metadata = {
  title: "Your Store | Quality Products Online",
  description: "Your trusted destination for quality products. Shop the best selection of premium items with excellent service.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { Providers } from './providers'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/next.svg" />
      </head>
      <body
        className={`${outfit.variable} ${ovo.variable} font-outfit antialiased 
        leading-8 overflow-x-hidden bg-white text-black`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}