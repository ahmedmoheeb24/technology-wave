'use client';

import Link from 'next/link';
import ApiImage from '@/components/ApiImage';

export default function ShopPreview({ shop }) {
  if (!shop) return null;

  const features = ['Certified aerospace components', 'Competitive pricing & fast delivery', 'Expert technical support', 'Quality guaranteed products'];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#1e40af]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/20">
              {shop.image ? (
                <ApiImage src={shop.image} alt="Shop" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Premium</p>
                  <p className="text-lg font-bold text-blue-600">Quality</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-6">Our shop</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              {shop.title || 'Premium airplane parts & equipment'}
            </h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              {shop.description || 'Certified aerospace components and expert support. We supply parts that meet the highest industry standards.'}
            </p>
            <ul className="space-y-4 mb-10">
              {features.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="font-medium text-white/95">{text}</span>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-blue-700 font-semibold shadow-2xl hover:bg-slate-100 transition-all hover:-translate-y-0.5">
              Explore our shop
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
