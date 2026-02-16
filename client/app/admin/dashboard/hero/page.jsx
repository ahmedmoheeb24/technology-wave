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
      
      // Create FormData for file upload
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
      title: '',
      subtitle: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      bgColor: 'from-blue-500 to-blue-700'
    })
    setImageFile(null)
    setImagePreview('')
    setEditingSlide(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Manage Hero Banners</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Slide'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image Preview</label>
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : (editingSlide ? 'Update Slide' : 'Add Slide')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">All Hero Slides ({slides.length})</h2>
          
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading hero slides...</p>
          ) : slides.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No slides yet. Add your first hero slide!</p>
          ) : (
            <div className="space-y-6">
              {slides.map((slide) => (
                <div key={slide.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className={`bg-gradient-to-r ${slide.bg_color} p-8 relative`}>
                    {slide.image && (
                      <img src={api.getImageUrl(slide.image)} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    )}
                    <div className="relative text-white">
                      <p className="text-lg mb-2">{slide.subtitle}</p>
                      <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                      <p className="mb-4">{slide.description}</p>
                      <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold">
                        {slide.button_text}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 flex gap-2">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
