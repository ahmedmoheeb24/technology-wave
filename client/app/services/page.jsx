import Image from 'next/image';
import { getServices } from '@/lib/api';

export const metadata = {
  title: "Services - Technology Wave",
  description: "Explore our comprehensive range of aerospace services including maintenance, repairs, and consulting.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Comprehensive aerospace solutions tailored to your specific needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                    {service.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${service.image}`}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-24 h-24 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0066CC] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Our services information will be available soon. Please contact us for more details.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
