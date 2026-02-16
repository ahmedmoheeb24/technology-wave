'use client'
import Navbar from "./Components/Navbar";
import HeroSlider from "./Components/HeroSlider";
import About from "./Components/About";
import Services from "./Components/Services";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-outfit overflow-x-hidden">
      <Navbar />
      
      {/* Hero Slider Section - Full Width */}
      <HeroSlider />

      {/* Main Content Sections */}
      <main>
        <About />
        <Services />
        <Work />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}