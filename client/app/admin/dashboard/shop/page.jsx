'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] outline-none transition-all';
const btnPrimary = 'px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50';

export default function ShopManager() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/shop`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setFormData((prev) => ({ ...prev, title: data.title || '', description: data.description || '' }));
      })
      .catch(() => {})
      .finally(() => setInitialLoad(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      await api.updateShop(formData);
      alert('Shop section updated.');
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
        <h1 className="text-2xl font-bold text-slate-900">Shop Section</h1>
        <p className="text-slate-500 text-sm mt-0.5">Update shop preview content</p>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="Premium Aerospace Parts" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description *</label>
              <textarea required rows={6} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} placeholder="Describe your shop..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className={btnPrimary}>
              {loading ? 'Saving...' : 'Update Shop'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
