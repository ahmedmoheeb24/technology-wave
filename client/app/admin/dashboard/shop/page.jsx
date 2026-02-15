'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';

export default function ShopManager() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);

    try {
      await api.updateShop(formData);
      alert('Shop section updated successfully!');
    } catch (err) {
      alert('Error updating shop section: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-lg border-b-4 border-orange-600">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop Section Manager</h1>
              <p className="text-gray-600 mt-1">Update shop preview content</p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                placeholder="Premium Aerospace Parts"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                required
                rows="6"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
                placeholder="Describe your shop and products..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Saving...' : '💾 Update Shop Section'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
