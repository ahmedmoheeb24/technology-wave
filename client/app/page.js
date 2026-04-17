'use client';

import React, { Suspense } from 'react';
import Navbar from "./Components/Navbar";
import Hero_Modern3 from "./Components/Hero_Modern3";
import About_Modern3 from "./Components/About_Modern3";
import Services_Modern1 from "./Components/Services_Modern1";
import Products_Modern from "./Components/Products_Modern";
import Contact from "./Components/Contact";
import CartDrawer from "./Components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen font-outfit overflow-x-hidden bg-white">
      <Navbar />
      
      {/* Wrapping the main content in Suspense ensures that if a component 
        takes a moment to hydrate, the UI doesn't completely break.
      */}
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <Hero_Modern3 />

        <main>
          {/* Section: History and Timeline */}
          <About_Modern3 />
          
          {/* Section: Core Services Grid */}
          <Services_Modern1 />
          
          {/* Section: E-commerce Product Grid */}
          <Products_Modern />
          
          {/* Section: Contact Form */}
          <Contact />
        </main>
      </Suspense>

      <CartDrawer />
    </div>
  );
}