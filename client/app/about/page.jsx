import { getAboutSection } from '@/lib/api';
import ApiImage from '@/components/ApiImage';

export const metadata = {
  title: "About Us - Technology Wave",
  description: "Learn more about Technology Wave, your trusted partner in airplane parts and aviation services.",
};

export default async function AboutPage() {
  const about = await getAboutSection();

  return (
    <div className="bg-white">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#1D4ED8]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our commitment to excellence in airplane parts and aviation services
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          {about ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                  {about.image ? (
                    <ApiImage
                      src={about.image}
                      alt={about.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{about.title}</h2>
                  <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    {about.content}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About Technology Wave</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  Technology Wave is a leading provider of airplane parts and aviation services. With years of experience, we deliver certified components and expert support to the aerospace industry worldwide.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our team is dedicated to quality, reliability, and customer satisfaction in every order and service we provide.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
