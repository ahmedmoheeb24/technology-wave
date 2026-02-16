'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] outline-none transition-all';
const btnPrimary = 'px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50';

export default function AboutManager() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', image: null });
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin'); return; }
    const api = new AdminAPI(token);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/about`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setFormData((prev) => ({ ...prev, title: data.title || '', content: data.content || '' }));
      })
      .catch(() => {})
      .finally(() => setInitialLoad(false));
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      await api.updateAbout(formData);
      alert('About section updated.');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-10 h-10 rounded-xl border-2 border-[#2563EB] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900">About Section</h1>
        <p className="text-slate-500 text-sm mt-0.5">Edit about us content and image</p>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="About Technology Wave" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Content *</label>
              <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell visitors about your company..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className={btnPrimary}>
              {loading ? 'Saving...' : 'Update About'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
