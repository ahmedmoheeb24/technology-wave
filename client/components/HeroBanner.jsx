'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero-banners`);
        const data = await res.json();
        setBanners(data);
      } catch (e) {
        setBanners([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading) {
    return null;
  }

  if (!banners || banners.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-slate-700">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
            Events.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Discover all of our upcoming events and shows.
          </p>
          <a 
            href="#events" 
            className="inline-block bg-white/10 backdrop-blur-sm text-white px-10 py-4 border border-white/30 hover:bg-white/20 transition-all duration-300 text-sm font-medium tracking-wide"
          >
            View Events
          </a>
        </div>

      </section>
    );
  }

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-slate-700">
        {currentBanner.background_image && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${currentBanner.background_image}`}
            alt={currentBanner.title}
            style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
          {currentBanner.title}
        </h1>
        
        {currentBanner.subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            {currentBanner.subtitle}
          </p>
        )}
        
        {currentBanner.button_text && currentBanner.button_url && (
          <a
            href={currentBanner.button_url}
            className="inline-block bg-white/10 backdrop-blur-sm text-white px-10 py-4 border border-white/30 hover:bg-white/20 transition-all duration-300 text-sm font-medium tracking-wide"
          >
            {currentBanner.button_text}
          </a>
        )}
      </div>


      {/* Slide Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'bg-white w-12'
                  : 'bg-white/40 hover:bg-white/60 w-8'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}