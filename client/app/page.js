'use client'
import Navbar from "./Components/Navbar";
import Hero_Modern3 from "./Components/Hero_Modern3";
import About_Modern3 from "./Components/About_Modern3";
import Services_Modern1 from "./Components/Services_Modern1";
import Products_Modern from "./Components/Products_Modern";
import Contact from "./Components/Contact";
import CartDrawer from "./Components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen font-outfit overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Modern Design 3 (Minimal Typography with Spotlight) */}
      <Hero_Modern3 />

      {/* Main Content Sections - Modern Designs (No Waves!) */}
      <main>
        {/* About Section - Modern Design 3 (Timeline Journey without Expertise) */}
        <About_Modern3 />
        
        {/* Services Section - Modern Design 1 (Interactive Grid) */}
        <Services_Modern1 />
        
        {/* Products Section - E-Commerce with Categories (Blue Theme) */}
        <Products_Modern />
        <Contact />
      </main>

      <CartDrawer />
    </div>
  );
}
