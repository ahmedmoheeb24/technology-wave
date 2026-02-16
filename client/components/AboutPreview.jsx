'use client';

import Link from 'next/link';
import ApiImage from '@/components/ApiImage';

export default function AboutPreview({ about }) {
  if (!about) return null;

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-6">About us</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Excellence in aerospace services
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {about.content}
            </p>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[{ value: '15+', label: 'Years' }, { value: '500+', label: 'Clients' }, { value: '100%', label: 'Quality' }].map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_8px_30px_rgba(37,99,235,0.35)] transition-all hover:-translate-y-0.5">
              Learn more
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="relative">
            <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200/50">
              {about.image ? (
                <ApiImage src={about.image} alt="About Technology Wave" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] p-6 max-w-[240px] border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Certified</p>
                  <p className="text-lg font-bold text-slate-900">ISO 9001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
