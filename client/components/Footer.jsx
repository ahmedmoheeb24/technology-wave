'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0c1222] text-white">
      {/* Top band: gradient + CTA */}
      <div className="relative border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20" />
        <div className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Ready to get started?</h3>
            <p className="text-slate-400 text-sm mt-1">Parts, support, or a custom quote — we’re here.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 shrink-0"
          >
            Get in touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">Technology Wave</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-md">
              Your trusted partner for airplane parts and aviation services. Certified components and expert support worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+4532519550" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium border border-white/10 transition-all">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +45 32 51 95 50
              </a>
              <a href="mailto:info@technology-wave.com" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium border border-white/10 transition-all">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email us
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/90 mb-6">Quick links</h4>
            <ul className="space-y-4">
              {[{ label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Shop', href: '/shop' }, { label: 'Events', href: '/events' }, { label: 'Contact', href: '/contact' }].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/90 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Terms</Link></li>
              <li><Link href="/cookie-declaration" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {year} Technology Wave. Aerospace parts & services.</p>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 z-40"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>
    </footer>
  );
}
