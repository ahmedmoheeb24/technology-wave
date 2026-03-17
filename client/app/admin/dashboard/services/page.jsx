"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    icon: '⚡',
    title: '',
    description: '',
    detailed_description: '',
    features: '',
    image: null
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await api.getServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
      alert('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const submitData = new FormData()
      submitData.append('icon', formData.icon)
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('detailed_description', formData.detailed_description || '')
      submitData.append('features', formData.features || '')
      
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      if (editingService) {
        await api.updateService(editingService.id, submitData)
        alert('Service updated successfully!')
      } else {
        await api.createService(submitData)
        alert('Service created successfully!')
      }

      resetForm()
      loadServices()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Failed to save service: ' + error.message)
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
      detailed_description: service.detailed_description || '',
      features: service.features || '',
      image: null
    })
    if (service.image) {
      setImagePreview(api.getImageUrl(service.image))
    }
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      await api.deleteService(id)
      alert('Service deleted successfully!')
      loadServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Failed to delete service')
    }
  }

  const resetForm = () => {
    setFormData({
      icon: '⚡',
      title: '',
      description: '',
      detailed_description: '',
      features: '',
      image: null
    })
    setEditingService(null)
    setShowForm(false)
    setImagePreview(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const commonIcons = ['⚡', '🎨', '💻', '📱', '🚀', '☁️', '🤖', '🔧', '📊', '🎯', '💡', '🌐']

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">Manage Services</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
          >
            {showForm ? 'Cancel' : '+ Add Service'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-semibold mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {commonIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`text-3xl p-3 border-2 rounded-lg transition-all ${
                        formData.icon === icon
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Or enter custom emoji/icon"
                  className="mt-2 w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  placeholder="e.g., Web Development"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Short Description * (for cards)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={2}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  placeholder="Brief description shown on service cards"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Detailed Description (for detail page)</label>
                <textarea
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  rows={6}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  placeholder="Full description shown on the service detail page"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold mb-2">Features (comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  placeholder="User Research, Wireframing, Prototyping, Visual Design"
                />
                <p className="text-sm text-gray-500 mt-1">Separate features with commas</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">Service Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Services List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-xl text-gray-500">No services yet. Add your first service!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {service.image && (
                  <img
                    src={api.getImageUrl(service.image)}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{service.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  
                  {service.features && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        {typeof service.features === 'string' 
                          ? service.features.split(',').length 
                          : service.features.length} features
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
