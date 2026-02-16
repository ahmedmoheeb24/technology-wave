'use client';

import Link from 'next/link';
import ApiImage from '@/components/ApiImage';

export default function ServicesPreview({ services = [] }) {
  const list = Array.isArray(services) ? services.slice(0, 6) : [];

  return (
    <section className="relative py-28 overflow-hidden bg-[#f8fafc]">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">Our services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Aerospace solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional services tailored to your aviation needs.
          </p>
        </div>

        {list.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {list.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:border-blue-200/80 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {service.image ? (
                      <ApiImage
                        src={service.image}
                        alt={service.title || 'Service'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                        <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {service.description ? String(service.description).slice(0, 120) : ''}
                      {service.description && service.description.length > 120 ? '…' : ''}
                    </p>
                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
                      Learn more
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_8px_30px_rgba(37,99,235,0.35)] transition-all hover:-translate-y-0.5">
                View all services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 px-6 bg-white/80 rounded-3xl border border-slate-200/80">
            <p className="text-slate-500 text-lg mb-6">No services added yet. Add content from the admin dashboard.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
