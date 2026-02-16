'use client';

import { useState } from 'react';
import ApiImage from '@/components/ApiImage';

export default function LatestNews({ initialNews = [] }) {
  const [news, setNews] = useState(Array.isArray(initialNews) ? initialNews : []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${base}/api/news/latest?offset=${page * 6}&limit=6`);
      const data = await res.json();
      setNews((prev) => [...prev, ...(Array.isArray(data) ? data : [])]);
      setPage((p) => p + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden bg-white">
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">Latest news</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Industry updates & insights
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay informed with the latest aerospace news and developments.
          </p>
        </div>

        {news.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {news.map((item) => {
                const imgSrc = item.image || item.image_url;
                return (
                  <article
                    key={item.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:border-blue-200/80 transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      {imgSrc ? (
                        <ApiImage
                          src={imgSrc}
                          alt={item.title || 'News'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                          <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                        {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'News'}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {item.content}
                      </p>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
                        Read more
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Loading…
                  </>
                ) : (
                  <>
                    Load more
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-6 bg-slate-50 rounded-3xl border border-slate-200/80">
            <p className="text-slate-500 text-lg">No news yet. Add articles from the admin dashboard.</p>
          </div>
        )}
      </div>
    </section>
  );
}
