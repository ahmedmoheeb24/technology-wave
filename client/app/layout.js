import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import ConditionalLayout from './Components/ConditionalLayout'

const outfit = OutfitFont({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "900"], // Added 900 for the black/heavy weights used in your design
  variable: '--font-outfit',
});

const ovo = OvoFont({
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-ovo',
});

// Updated Metadata for Technology Wave
export const metadata = {
  title: {
    default: "Technology Wave | Aviation Parts & Services",
    template: "%s | Technology Wave"
  },
  description: "Global supplier of commercial and military aviation parts, specializing in C-130, Airbus, and Boeing platforms.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb', // Matches your aviation blue
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${outfit.variable} ${ovo.variable} font-outfit antialiased 
        leading-8 overflow-x-hidden bg-white text-black`}
      >
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}