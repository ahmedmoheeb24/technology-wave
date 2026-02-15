import Image from 'next/image';
import { getAboutSection } from '@/lib/api';

export const metadata = {
  title: "About Us - Technology Wave",
  description: "Learn more about Technology Wave, your trusted partner in aerospace services and parts.",
};

export default async function AboutPage() {
  const about = await getAboutSection();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Discover our commitment to excellence in aerospace services and parts
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container-custom">
          {about ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  {about.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${about.image}`}
                      alt={about.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <svg className="w-32 h-32 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.title}</h2>
                  <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                    {about.content}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Technology Wave</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Technology Wave is a leading provider of aerospace services and parts. With years of experience in the aviation industry, we pride ourselves on delivering excellence in every aspect of our business.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of skilled professionals is dedicated to providing top-quality services and genuine parts to meet the diverse needs of our clients in the aerospace sector.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
