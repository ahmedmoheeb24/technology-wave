'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ShopPreview({ shop }) {
  if (!shop) {
    return null;
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-blue-500/30">
                {shop.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${shop.image}`}
                    alt="Technology Wave Shop"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <svg className="w-32 h-32 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Premium</p>
                    <p className="text-lg font-bold text-blue-600">Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                🛒 Our Shop
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {shop.title || 'Premium Aerospace Parts & Equipment'}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {shop.description || 'Discover our extensive collection of high-quality aerospace parts and equipment. We provide certified components that meet the highest industry standards.'}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {[
                { icon: '✓', text: 'Certified aerospace components' },
                { icon: '✓', text: 'Competitive pricing & fast delivery' },
                { icon: '✓', text: 'Expert technical support' },
                { icon: '✓', text: 'Quality guaranteed products' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group/item">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/shop"
              className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>Explore Our Shop</span>
              <svg className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
