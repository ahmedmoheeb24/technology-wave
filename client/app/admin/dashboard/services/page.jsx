'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import ApiImage from '@/components/ApiImage';

const inputClass = 'w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all bg-white';
const btnPrimary = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5';
const btnSecondary = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all';
const btnDanger = 'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', order: 0, active: true, image: null });
  const router = useRouter();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin'); return; }
    try {
      const api = new AdminAPI(token);
      const data = await api.getServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      if (editingId) await api.updateService(editingId, formData);
      else await api.createService(formData);
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', order: 0, active: true, image: null });
      loadServices();
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setFormData({ title: s.title, description: s.description, order: s.order ?? 0, active: s.active, image: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    try {
      await api.deleteService(id);
      loadServices();
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
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-0.5">Add, edit, or remove services</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', description: '', order: 0, active: true, image: null }); }} className={showForm ? btnSecondary : btnPrimary}>
          {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      <div className="p-8">
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">{editingId ? 'Edit Service' : 'New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description *</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Order</label>
                  <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className={inputClass} />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
              <button type="submit" className={btnPrimary}>{editingId ? 'Update' : 'Create'} Service</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative h-52 bg-slate-100">
                {service.image ? (
                  <ApiImage src={service.image} alt={service.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" /></svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{service.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(service)} className={`flex-1 ${btnPrimary}`}>Edit</button>
                  <button onClick={() => handleDelete(service.id)} className={btnDanger}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && !showForm && (
            <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              No services yet. Click &quot;Add Service&quot; to create one.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
