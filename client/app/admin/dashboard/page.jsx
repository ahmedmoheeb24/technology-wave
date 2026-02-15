'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    heroBanners: 0,
    services: 0,
    news: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        const api = new AdminAPI(token);
        const isValid = await api.verifyAuth();
        if (!isValid) {
          localStorage.removeItem('admin_token');
          router.push('/admin');
        } else {
          // Load stats
          const [banners, services, news] = await Promise.all([
            api.getHeroBanners(),
            api.getServices(),
            api.getNews(),
          ]);
          setStats({
            heroBanners: banners.length,
            services: services.length,
            news: news.length,
          });
        }
      } catch (err) {
        localStorage.removeItem('admin_token');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0066CC] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const managementSections = [
    {
      title: 'Hero Banners',
      description: 'Manage homepage slideshow banners',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/admin/dashboard/hero-banners',
      count: stats.heroBanners,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
    },
    {
      title: 'About Section',
      description: 'Edit about us content and image',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      href: '/admin/dashboard/about',
      count: 1,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      badgeBg: 'bg-green-100',
      badgeText: 'text-green-800',
    },
    {
      title: 'Services',
      description: 'Add, edit, or remove services',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: '/admin/dashboard/services',
      count: stats.services,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
    },
    {
      title: 'Shop Section',
      description: 'Update shop preview content',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      href: '/admin/dashboard/shop',
      count: 1,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-800',
    },
    {
      title: 'Latest News',
      description: 'Manage news articles and updates',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      href: '/admin/dashboard/news',
      count: stats.news,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-[#0066CC]">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">Technology Wave Content Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400"
              >
                🌐 View Website
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Content Management</h2>
          <p className="text-gray-600">Select a section below to manage your website content</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-[#0066CC] group"
            >
              <div className={`${section.bgColor} ${section.iconColor} mb-6 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300`}>
                {section.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0066CC] transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">{section.description}</p>
              <div className={`inline-block ${section.badgeBg} ${section.badgeText} px-4 py-2 rounded-full text-sm font-bold shadow-sm`}>
                {section.count} {section.count === 1 ? 'item' : 'items'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
