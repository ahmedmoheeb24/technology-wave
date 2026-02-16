"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

const ServicesManagement = () => {
  const router = useRouter()
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
    features: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadServices()
  }, [router])

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await api.getServices()
      setServices(data || [])
      console.log('✅ Loaded services from API:', data?.length || 0)
    } catch (error) {
      console.error('❌ Error loading services:', error)
      alert('Error loading services. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      if (editingService) {
        // Update existing service
        await api.updateService(editingService.id, formData)
        console.log('✅ Service updated')
      } else {
        // Create new service
        await api.createService(formData)
        console.log('✅ Service created')
      }
      
      await loadServices() // Reload services from API
      resetForm()
      alert(editingService ? 'Service updated successfully!' : 'Service created successfully!')
    } catch (error) {
      console.error('❌ Error saving service:', error)
      alert('Error saving service. Make sure the backend is running and you are logged in.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData(service)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        setLoading(true)
        await api.deleteService(id)
        console.log('✅ Service deleted')
        await loadServices() // Reload services from API
        alert('Service deleted successfully!')
      } catch (error) {
        console.error('❌ Error deleting service:', error)
        alert('Error deleting service. Make sure the backend is running and you are logged in.')
      } finally {
        setLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({ icon: '', title: '', description: '', features: '' })
    setEditingService(null)
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Service'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🚚"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Use emoji like 🚚 🔒 ↩️ 💬 ✨ 🎁</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Free Shipping"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  placeholder="Brief description of the service..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features (comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows="3"
                  placeholder="Feature 1, Feature 2, Feature 3, Feature 4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Enter features separated by commas (e.g., "User Research, Wireframing, Prototyping")</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service')}
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
          <h2 className="text-xl font-bold mb-4">All Services ({services.length})</h2>
          
          {loading ? (
            <p className="text-blue-600 text-center py-8">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No services yet. Add your first service!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  {service.features && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Features:</p>
                      <p className="text-xs text-blue-600">{service.features}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
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

export default ServicesManagement
