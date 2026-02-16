'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import ApiImage from '@/components/ApiImage';

const inputClass = 'w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all bg-white';
const btnPrimary = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5';
const btnSecondary = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all';
const btnDanger = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all';

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', active: true, image: null });
  const router = useRouter();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin'); return; }
    try {
      const api = new AdminAPI(token);
      const data = await api.getNews();
      setNews(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      if (editingId) await api.updateNews(editingId, formData);
      else await api.createNews(formData);
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '', active: true, image: null });
      loadNews();
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ title: item.title, content: item.content, active: item.active, image: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this news item?')) return;
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      await api.deleteNews(id);
      loadNews();
    } catch (err) { alert('Error: ' + err.message); }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-12 h-12 rounded-2xl border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200 px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Latest News</h1>
          <p className="text-slate-500 text-sm mt-1">Manage news articles and updates</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', content: '', active: true, image: null }); }}
          className={showForm ? btnSecondary : btnPrimary}
        >
          {showForm ? 'Cancel' : 'Add news'}
        </button>
      </div>

      <div className="flex-1 p-10">
        {showForm && (
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-10 mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-8">{editingId ? 'Edit news' : 'New news'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="Article title" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Content *</label>
                <textarea required rows={6} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className={`${inputClass} resize-none`} placeholder="Content…" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image</label>
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className={inputClass} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
              <button type="submit" className={btnPrimary}>{editingId ? 'Update' : 'Create'} news</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {news.map((item) => {
            const imgSrc = item.image || item.image_url;
            return (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div className="relative h-52 bg-slate-100">
                  {imgSrc ? (
                    <ApiImage src={imgSrc} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                    {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-6">{item.content}</p>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(item)} className={btnPrimary}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} className={btnDanger}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
          {news.length === 0 && !showForm && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-lg mb-6">No news yet. Click “Add news” to create an article.</p>
              <button onClick={() => { setShowForm(true); setFormData({ title: '', content: '', active: true, image: null }); }} className={btnPrimary}>Add news</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
