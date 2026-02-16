'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import Link from 'next/link';

const sections = [
  { title: 'Hero Banners', href: '/admin/dashboard/hero-banners', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14', color: 'blue' },
  { title: 'About Section', href: '/admin/dashboard/about', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'emerald' },
  { title: 'Services', href: '/admin/dashboard/services', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'violet' },
  { title: 'Shop Section', href: '/admin/dashboard/shop', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', color: 'amber' },
  { title: 'Latest News', href: '/admin/dashboard/news', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', color: 'rose' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ heroBanners: 0, services: 0, news: 0 });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    const api = new AdminAPI(token);
    Promise.all([api.getHeroBanners(), api.getServices(), api.getNews()])
      .then(([banners, services, news]) => {
        setStats({ heroBanners: banners.length, services: services.length, news: news.length });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getCount = (s) => {
    if (s.title === 'Hero Banners') return stats.heroBanners;
    if (s.title === 'Services') return stats.services;
    if (s.title === 'Latest News') return stats.news;
    return 1;
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200 px-10 py-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Content management overview</p>
      </div>

      <div className="flex-1 p-10">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 rounded-2xl border-2 border-blue-600 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sections.map((s) => {
              const colors = colorMap[s.color];
              const count = getCount(s);
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:border-blue-200 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.icon} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h2>
                  <p className="text-slate-500 text-sm mb-6">Manage this section from the admin.</p>
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${colors.badge}`}>
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
