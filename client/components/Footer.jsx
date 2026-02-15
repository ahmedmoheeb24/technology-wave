import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#243447] to-[#1b2735] text-white overflow-hidden">
      
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
        
        {/* Top Banner */}
        <div className="mb-20">
          <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight">
            YOUR <span className="text-blue-400">360°</span> FLEET SUPPORT
          </h2>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-14 lg:gap-20">
          
          {/* ABOUT */}
          <div>
            <h3 className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-6">
              About Leki Aviation
            </h3>
            <p className="text-white/80 text-[15px] leading-relaxed">
              We are a leading provider of aviation parts and services, delivering
              efficient, certified and reliable solutions to customers worldwide.
              Our commitment is precision, speed and trust.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Shop', href: '/shop' },
                { label: 'Events', href: '/events' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Careers', href: '/careers' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-[15px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-6">
              Connect With Us
            </h3>

            <div className="space-y-5 text-[15px] text-white/80">
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>

              <div className="h-px bg-white/10"></div>

              <a
                href="tel:+4540519550"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <span className="font-semibold text-white">AOG:</span> +45 4051 9550
              </a>

              <a
                href="mailto:aog@lekiaviation.com"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                aog@lekiaviation.com
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 bg-[#16202c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[14px] text-white/60">
            
            <p>
              © {currentYear} Leki Aviation — Amager Landevej 278, Kastrup, Denmark
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-declaration" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
