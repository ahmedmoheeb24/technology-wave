'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import Image from 'next/image';

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
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      const api = new AdminAPI(token);
      const data = await api.getHeroBanners();
      setBanners(data);
    } catch (err) {
      console.error('Error loading banners:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);

    try {
      if (editingId) {
        await api.updateHeroBanner(editingId, formData);
      } else {
        await api.createHeroBanner(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', subtitle: '', button_text: '', button_link: '', order: 0, active: true, background_image: null });
      loadBanners();
    } catch (err) {
      alert('Error saving banner: ' + err.message);
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      button_text: banner.button_text || '',
      button_link: banner.button_link || '',
      order: banner.order,
      active: banner.active,
      background_image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    
    try {
      await api.deleteHeroBanner(id);
      loadBanners();
    } catch (err) {
      alert('Error deleting banner: ' + err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hero Banners Manager</h1>
              <p className="text-gray-600 mt-1">Manage homepage slideshow banners</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                  setFormData({ title: '', subtitle: '', button_text: '', button_link: '', order: 0, active: true, background_image: null });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {showForm ? '✖ Cancel' : '➕ Add New Banner'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Banner' : 'Add New Banner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={formData.button_link}
                    onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, background_image: e.target.files[0] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                />
                <label htmlFor="active" className="ml-2 text-sm font-semibold text-gray-700">Active</label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-lg"
              >
                {editingId ? '💾 Update Banner' : '✨ Create Banner'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between border-2 border-gray-200 hover:border-blue-400 transition-all">
              <div className="flex items-center space-x-4 flex-1">
                {banner.background_image && (
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${banner.background_image}`}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{banner.title}</h3>
                  {banner.subtitle && <p className="text-gray-600">{banner.subtitle}</p>}
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Order: {banner.order}</span>
                    <span className={`text-sm px-2 py-1 rounded ${banner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
          {banners.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg">📋 No hero banners yet. Click "Add New Banner" to create one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
