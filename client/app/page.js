import HeroBanner from '@/components/HeroBanner';
import AboutPreview from '@/components/AboutPreview';
import ServicesPreview from '@/components/ServicesPreview';
import ShopPreview from '@/components/ShopPreview';
import LatestNews from '@/components/LatestNews';
import { getHeroBanners, getAboutSection, getServices, getShopSection, getLatestNews } from '@/lib/api';

export const metadata = {
  title: "Home - Technology Wave",
  description: "Technology Wave offers premium airplane parts and aviation services. Your trusted partner for aircraft maintenance, repairs, and certified aerospace components.",
};

export default async function Home() {
  const [heroBanners, about, services, shop, news] = await Promise.all([
    getHeroBanners(),
    getAboutSection(),
    getServices(),
    getShopSection(),
    getLatestNews(6, 0),
  ]);

  return (
    <main className="min-h-screen">
      <HeroBanner banners={heroBanners} />
      <section className="bg-white">
        <AboutPreview about={about} />
      </section>
      <section className="bg-section-alt">
        <ServicesPreview services={services} />
      </section>
      <section className="bg-gradient-blue">
        <ShopPreview shop={shop} />
      </section>
      <section className="bg-section-blue-subtle">
        <LatestNews initialNews={news} />
      </section>
    </main>
  );
}
