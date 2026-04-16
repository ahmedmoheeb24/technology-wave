import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import ConditionalLayout from './Components/ConditionalLayout'

const outfit = OutfitFont({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "900"], 
  variable: '--font-outfit',
});

const ovo = OvoFont({
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-ovo',
});

// Updated Metadata for Technology Wave with local frontend assets
export const metadata = {
  title: {
    default: "Technology Wave | Aviation Parts & Services",
    template: "%s | Technology Wave"
  },
  description: "Global supplier of commercial and military aviation parts, specializing in C-130, Airbus, and Boeing platforms.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg', // Only if you have this from the favicon_io zip
        color: '#2563eb',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb', 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
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