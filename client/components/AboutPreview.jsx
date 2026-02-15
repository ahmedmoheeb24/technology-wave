'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPreview({ about }) {
  if (!about) {
    return null;
  }

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                ✈️ About Us
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Excellence in Aerospace Services
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {about.content}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                <div className="text-sm text-gray-600 font-medium">Years</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Clients</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-sm text-gray-600 font-medium">Quality</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>Learn More About Us</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              {about.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${about.image}`}
                  alt="About Technology Wave"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Certified</p>
                  <p className="text-lg font-bold text-gray-900">ISO 9001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
