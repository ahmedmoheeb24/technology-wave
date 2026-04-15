"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

const HeroManagement = () => {
  const router = useRouter()
  const [slides, setSlides] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    bgColor: 'from-blue-500 to-blue-700'
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadSlides()
  }, [router])

  const loadSlides = async () => {
    try {
      setLoading(true)
      const data = await api.getHeroBanners()
      setSlides(data || [])
    } catch (error) {
      console.error('Error loading hero banners:', error)
      alert('Failed to load hero banners')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('subtitle', formData.subtitle)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('button_text', formData.buttonText)
      formDataToSend.append('button_link', formData.buttonLink)
      formDataToSend.append('bg_color', formData.bgColor)
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      if (editingSlide) {
        await api.updateHeroBanner(editingSlide.id, formDataToSend)
        alert('Hero banner updated successfully!')
      } else {
        await api.createHeroBanner(formDataToSend)
        alert('Hero banner created successfully!')
      }

      await loadSlides()
      resetForm()
    } catch (error) {
      console.error('Error saving hero banner:', error)
      alert('Failed to save hero banner: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      buttonText: slide.button_text,
      buttonLink: slide.button_link,
      bgColor: slide.bg_color
    })
    setImagePreview(slide.image ? api.getImageUrl(slide.image) : '')
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      try {
        await api.deleteHeroBanner(id)
        alert('Hero banner deleted successfully!')
        await loadSlides()
      } catch (error) {
        console.error('Error deleting hero banner:', error)
        alert('Failed to delete hero banner: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '', subtitle: '', description: '', buttonText: '', buttonLink: '',
      bgColor: 'from-blue-500 to-blue-700'
    })
    setImageFile(null)
    setImagePreview('')
    setEditingSlide(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* UPDATED HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-none">Hero Banners</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">Homepage Control</p>
            </div>
          </div>

          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all text-xs sm:text-sm font-bold group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="hidden xs:inline">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* UPDATED ACTION AREA */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Banner Slides</h2>
            <p className="text-sm text-gray-500">Currently displaying {slides.length} slides in rotation</p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
              showForm 
                ? 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
            }`}
          >
            {showForm ? 'Cancel' : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add New Slide
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Welcome to Our Store"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Discover Amazing Products"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Quality products at unbeatable prices"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    placeholder="Shop Now"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    placeholder="#products"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Background Gradient</label>
                  <select
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="from-blue-500 to-blue-700">Blue</option>
                    <option value="from-blue-600 to-indigo-600">Blue Indigo</option>
                    <option value="from-sky-500 to-blue-600">Sky Blue</option>
                    <option value="from-purple-500 to-blue-600">Purple Blue</option>
                    <option value="from-green-500 to-teal-600">Green Teal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image Preview</label>
                  <img src={imagePreview} alt="Preview" className="w-full h-48 sm:h-64 object-cover rounded-xl border-2 border-dashed border-gray-200" />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {submitting ? 'Saving...' : (editingSlide ? 'Update Slide' : 'Add Slide')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 sm:flex-none px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SLIDE LIST SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">Current Rotation ({slides.length})</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading hero slides...</p>
          ) : slides.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No slides yet. Add your first hero slide!</p>
          ) : (
            <div className="space-y-6">
              {slides.map((slide) => (
                <div key={slide.id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all shadow-sm">
                  <div className={`bg-gradient-to-r ${slide.bg_color} p-6 sm:p-10 relative min-h-[200px] flex items-center`}>
                    {slide.image && (
                      <img src={api.getImageUrl(slide.image)} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    )}
                    <div className="relative text-white max-w-lg">
                      <p className="text-sm sm:text-lg font-medium mb-1 opacity-90">{slide.subtitle}</p>
                      <h3 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">{slide.title}</h3>
                      <p className="mb-6 text-sm sm:text-base opacity-80 line-clamp-2">{slide.description}</p>
                      <button className="px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-bold shadow-lg">
                        {slide.button_text}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 flex gap-3 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all text-sm"
                    >
                      Edit Content
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="px-4 py-2.5 bg-white border border-gray-200 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default HeroManagement