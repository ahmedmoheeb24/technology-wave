'use client';

import { useState, useEffect } from 'react';
import ApiImage from '@/components/ApiImage';

export default function HeroBanner({ banners: initialBanners = [] }) {
  const [banners, setBanners] = useState(Array.isArray(initialBanners) ? initialBanners : []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(!initialBanners?.length);

  useEffect(() => {
    if (initialBanners?.length) {
      setBanners(initialBanners);
      setLoading(false);
      return;
    }
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${base}/api/hero-banners`)
      .then((r) => r.json())
      .then((data) => { setBanners(Array.isArray(data) ? data : []); })
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, [initialBanners]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 rounded-xl border-2 border-blue-600 border-t-transparent animate-spin" />
      </section>
    );
  }

  if (!banners.length) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
        <div className="container-custom relative z-10 text-center px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1]">
            Airplane Parts & Services
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-light">
            Certified aerospace components and expert aviation support. Your trusted partner worldwide.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href="/shop" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-blue-700 font-semibold text-lg shadow-2xl hover:bg-slate-100 transition-all hover:-translate-y-0.5">
              Explore parts
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all">
              Contact us
            </a>
          </div>
        </div>
      </section>
    );
  }

  const current = banners[currentSlide];
  const buttonUrl = current.button_url || current.button_link;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        {current.background_image && (
          <ApiImage src={current.background_image} alt={current.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/70" />
        <div className="absolute inset-0 bg-blue-900/30" />
      </div>
      <div className="container-custom relative z-10 text-center px-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1]">
          {current.title}
        </h1>
        {current.subtitle && (
          <p className="mt-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            {current.subtitle}
          </p>
        )}
        {current.button_text && buttonUrl && (
          <a href={buttonUrl} className="mt-12 inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-blue-700 font-semibold text-lg shadow-2xl hover:bg-slate-100 transition-all hover:-translate-y-0.5">
            {current.button_text}
          </a>
        )}
      </div>
      {banners.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-10' : 'bg-white/40 hover:bg-white/60 w-6'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}
