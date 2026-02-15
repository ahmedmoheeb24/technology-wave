'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Shop', href: '/shop' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="flex items-center h-[90px]">

          {/* LOGO - Better positioning */}
          <div className="flex-shrink-0 ml-6 lg:ml-12 mr-8 lg:mr-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Image
                  src="/favicon_io/android-chrome-192x192.png"
                  alt="TW Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden sm:block text-2xl font-bold text-white tracking-tight drop-shadow-lg group-hover:text-blue-300 transition-colors">
                Technology Wave
              </span>
            </Link>
          </div>

          {/* NAVIGATION - Center with better spacing */}
          <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[15px] font-medium text-white px-3 py-2 transition-all duration-200 group"
              >
                <span className="relative z-10 group-hover:text-blue-300">
                  {link.label}
                </span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Spacer for mobile to push button to right */}
          <div className="flex-1 lg:hidden"></div>

          {/* PHONE BUTTON & MOBILE TOGGLE - Right side with proper spacing */}
          <div className="flex items-center gap-3 mr-6 lg:mr-12">
            {/* Desktop Phone Button - Modern Design */}
            <a
              href="tel:+4532519550"
              className="hidden lg:flex items-center gap-2.5 relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white pl-3 pr-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 group"
            >
              {/* Animated background on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Phone icon with ring animation */}
              <div className="relative z-10 flex items-center justify-center w-9 h-9 bg-white/20 rounded-full group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              
              <span className="relative z-10 font-semibold text-sm whitespace-nowrap">+45 3251 9550</span>
            </a>

            {/* Mobile Menu Toggle - aligned to right */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU - Improved Design */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] z-40 bg-slate-900/95 backdrop-blur-2xl">
          <div className="h-full overflow-y-auto">
            <nav className="flex flex-col px-8 py-10 space-y-2">
              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between text-white hover:text-blue-300 text-lg font-semibold py-4 px-5 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 border border-transparent hover:border-blue-500/30 transition-all duration-300"
                >
                  <span>{link.label}</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}

              {/* Call Button */}
              <div className="pt-8">
                <a
                  href="tel:+4532519550"
                  className="flex items-center justify-center gap-3 w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {/* Animated background on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  
                  {/* Phone icon with pulse animation */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 group-hover:animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-xs font-medium opacity-90">Call us now</span>
                    <span className="font-bold tracking-wide">+45 3251 9550</span>
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
