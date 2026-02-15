import HeroBanner from '@/components/HeroBanner';
import AboutPreview from '@/components/AboutPreview';
import ServicesPreview from '@/components/ServicesPreview';
import ShopPreview from '@/components/ShopPreview';
import LatestNews from '@/components/LatestNews';
import { getHeroBanners, getAboutSection, getServices, getShopSection, getLatestNews } from '@/lib/api';

export const metadata = {
  title: "Home - Technology Wave",
  description: "Technology Wave offers premium aerospace services and parts. Your trusted partner for aircraft maintenance, repairs, and high-quality aviation components.",
};

export default async function Home() {
  // Fetch all data in parallel
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
      <div className="bg-mesh-gradient">
        <AboutPreview about={about} />
      </div>
      <div className="bg-white">
        <ServicesPreview services={services} />
      </div>
      <div className="bg-gradient-blue">
        <ShopPreview shop={shop} />
      </div>
      <div className="bg-white bg-pattern-dots">
        <LatestNews initialNews={news} />
      </div>
    </main>
  );
}
