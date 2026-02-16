import { getShopSection } from '@/lib/api';
import ApiImage from '@/components/ApiImage';

export const metadata = {
  title: "Shop - Technology Wave",
  description: "Browse our inventory of certified airplane parts and aerospace components.",
};

export default async function ShopPage() {
  const shop = await getShopSection();

  return (
    <div className="bg-white">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#1D4ED8]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Certified airplane parts and aerospace components for your fleet
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          {shop ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                  {shop.image ? (
                    <ApiImage
                      src={shop.image}
                      alt={shop.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{shop.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">{shop.description}</p>
                  <a
                    href="mailto:info@technology-wave.com"
                    className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
                <div className="w-20 h-20 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop Coming Soon</h2>
                <p className="text-lg text-slate-600 mb-8">
                  We're setting up our online catalog. Contact us for airplane parts quotes and availability.
                </p>
                <a
                  href="mailto:info@technology-wave.com"
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
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
