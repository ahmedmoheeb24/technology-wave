import Image from 'next/image';
import { getShopSection } from '@/lib/api';

export const metadata = {
  title: "Shop - Technology Wave",
  description: "Browse our extensive inventory of high-quality aerospace parts and components.",
};

export default async function ShopPage() {
  const shop = await getShopSection();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Quality aerospace parts and components for all your aviation needs
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-20">
        <div className="container-custom">
          {shop ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  {shop.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${shop.image}`}
                      alt={shop.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <svg className="w-32 h-32 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{shop.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {shop.description}
                  </p>
                  <a
                    href="mailto:info@technology-wave.com"
                    className="inline-flex items-center bg-[#0066CC] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#0052A3] hover:shadow-lg hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-blue-50 rounded-2xl p-12">
                <svg className="w-24 h-24 text-[#0066CC] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Coming Soon</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're currently setting up our online shop. In the meantime, please contact us directly for all your aerospace parts needs.
                </p>
                <a
                  href="mailto:info@technology-wave.com"
                  className="inline-flex items-center bg-[#0066CC] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#0052A3] hover:shadow-lg hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
