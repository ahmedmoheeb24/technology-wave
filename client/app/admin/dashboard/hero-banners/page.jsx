'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import ApiImage from '@/components/ApiImage';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] outline-none transition-all';
const btnPrimary = 'px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5';
const btnSecondary = 'px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all';
const btnDanger = 'px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all';

export default function HeroBannersManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    order: 0,
    active: true,
    background_image: null,
  });
  const router = useRouter();

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin'); return; }
    try {
      const api = new AdminAPI(token);
      const data = await api.getHeroBanners();
      setBanners(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      if (editingId) await api.updateHeroBanner(editingId, formData);
      else await api.createHeroBanner(formData);
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', subtitle: '', button_text: '', button_link: '', order: 0, active: true, background_image: null });
      loadBanners();
    } catch (err) { alert('Error saving: ' + err.message); }
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      button_text: banner.button_text || '',
      button_link: banner.button_link || banner.button_url || '',
      order: banner.order,
      active: banner.active,
      background_image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner?')) return;
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      await api.deleteHeroBanner(id);
      loadBanners();
    } catch (err) { alert('Error: ' + err.message); }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-10 h-10 rounded-xl border-2 border-[#2563EB] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hero Banners</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage homepage slideshow</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: '', subtitle: '', button_text: '', button_link: '', order: 0, active: true, background_image: null });
          }}
          className={showForm ? btnSecondary : btnPrimary}
        >
          {showForm ? 'Cancel' : 'Add Banner'}
        </button>
      </div>

      <div className="p-8">
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">{editingId ? 'Edit Banner' : 'New Banner'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subtitle</label>
                  <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Button Text</label>
                  <input type="text" value={formData.button_text} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Button Link</label>
                  <input type="text" value={formData.button_link} onChange={(e) => setFormData({ ...formData, button_link: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Order</label>
                  <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Background Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, background_image: e.target.files[0] })} className={inputClass} />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
              <button type="submit" className={btnPrimary}>
                {editingId ? 'Update' : 'Create'} Banner
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              {banner.background_image && (
                <div className="relative w-full sm:w-40 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <ApiImage src={banner.background_image} alt={banner.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900">{banner.title}</h3>
                {banner.subtitle && <p className="text-slate-500 text-sm mt-0.5">{banner.subtitle}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-slate-400">Order: {banner.order}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-lg ${banner.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(banner)} className={btnPrimary}>Edit</button>
                <button onClick={() => handleDelete(banner.id)} className={btnDanger}>Delete</button>
              </div>
            </div>
          ))}
          {banners.length === 0 && !showForm && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              No banners yet. Click &quot;Add Banner&quot; to create one.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
