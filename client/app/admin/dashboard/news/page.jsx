'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import Image from 'next/image';

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    active: true,
    image: null,
  });
  const router = useRouter();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      const api = new AdminAPI(token);
      const data = await api.getNews();
      setNews(data);
    } catch (err) {
      console.error('Error loading news:', err);
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
        await api.updateNews(editingId, formData);
      } else {
        await api.createNews(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '', active: true, image: null });
      loadNews();
    } catch (err) {
      alert('Error saving news: ' + err.message);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem.id);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      active: newsItem.active,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    
    const token = localStorage.getItem('admin_token');
    const api = new AdminAPI(token);
    
    try {
      await api.deleteNews(id);
      loadNews();
    } catch (err) {
      alert('Error deleting news: ' + err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-lg border-b-4 border-red-600">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Latest News Manager</h1>
              <p className="text-gray-600 mt-1">Manage news articles and updates</p>
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
                  setFormData({ title: '', content: '', active: true, image: null });
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {showForm ? '✖ Cancel' : '➕ Add News'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-red-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit News' : 'Add News'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                <textarea
                  required
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                />
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
                className="bg-red-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg text-lg"
              >
                {editingId ? '💾 Update News' : '✨ Create News'}
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {item.image && (
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-[#0066CC] font-semibold mb-2">
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.content.substring(0, 100)}...</p>
                <div className="mb-4">
                  <span className={`text-sm px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {news.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg">📋 No news yet. Click "Add News" to create one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
