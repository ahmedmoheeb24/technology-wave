"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

const AboutManagement = () => {
  const router = useRouter()
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    mission: '',
    vision: '',
    values: [],
    team_title: '',
    team_description: '',
    images: []
  })
  const [imageFiles, setImageFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      setLoading(true)
      const data = await api.getAbout()
      if (data && data.length > 0) {
        const about = data[0] // Get first about entry
        setAboutData(about)
        setFormData({
          title: about.title || '',
          subtitle: about.subtitle || '',
          description: about.description || '',
          mission: about.mission || '',
          vision: about.vision || '',
          values: Array.isArray(about.values) ? about.values : [],
          team_title: about.team_title || '',
          team_description: about.team_description || '',
          images: about.images || []
        })
      }
      console.log('✅ About data loaded')
    } catch (error) {
      console.error('❌ Error loading about data:', error)
      console.log('⚠️ Using empty form (backend may not be running)')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const formDataToSend = new FormData()
      
      // Append text fields
      formDataToSend.append('title', formData.title)
      formDataToSend.append('subtitle', formData.subtitle || '')
      formDataToSend.append('description', formData.description)
      formDataToSend.append('mission', formData.mission || '')
      formDataToSend.append('vision', formData.vision || '')
      formDataToSend.append('values', JSON.stringify(formData.values))
      formDataToSend.append('team_title', formData.team_title || '')
      formDataToSend.append('team_description', formData.team_description || '')
      
      // Append image files
      imageFiles.forEach((file) => {
        formDataToSend.append('images', file)
      })
      
      if (aboutData) {
        await api.updateAbout(aboutData.id, formDataToSend)
        console.log('✅ About data updated')
        alert('About section updated successfully!')
      } else {
        await api.createAbout(formDataToSend)
        console.log('✅ About data created')
        alert('About section created successfully!')
      }
      
      await loadAboutData()
      setImageFiles([])
      setPreviewImages([])
    } catch (error) {
      console.error('❌ Error saving about data:', error)
      alert(`Error saving: ${error.message}. Make sure backend is running and you are logged in.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">About Page Management</h1>
              <p className="text-gray-600 mt-1">Manage your About Us page content and images</p>
            </div>
            <Link href="/admin/dashboard">
              <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">About Us Content</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="About Technology Wave"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Your Trusted Technology Partner"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                placeholder="Tell your story..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Mission */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Our Mission</label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                rows="3"
                placeholder="Our mission is to..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Vision */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Our Vision</label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                rows="3"
                placeholder="Our vision is to..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Values */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Our Values</label>
              <div className="space-y-4">
                {formData.values.map((value, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const newValues = formData.values.filter((_, i) => i !== index)
                        setFormData({ ...formData, values: newValues })
                      }}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Value Title</label>
                        <input
                          type="text"
                          value={value.title || ''}
                          onChange={(e) => {
                            const newValues = [...formData.values]
                            newValues[index] = { ...newValues[index], title: e.target.value }
                            setFormData({ ...formData, values: newValues })
                          }}
                          placeholder="e.g., Innovation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Value Description</label>
                        <textarea
                          value={value.description || ''}
                          onChange={(e) => {
                            const newValues = [...formData.values]
                            newValues[index] = { ...newValues[index], description: e.target.value }
                            setFormData({ ...formData, values: newValues })
                          }}
                          rows="2"
                          placeholder="Describe this value..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ 
                      ...formData, 
                      values: [...formData.values, { title: '', description: '' }] 
                    })
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  + Add Value
                </button>
              </div>
            </div>

            {/* Team Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Team Section</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Title</label>
                  <input
                    type="text"
                    value={formData.team_title}
                    onChange={(e) => setFormData({ ...formData, team_title: e.target.value })}
                    placeholder="Meet Our Team"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Description</label>
                  <textarea
                    value={formData.team_description}
                    onChange={(e) => setFormData({ ...formData, team_description: e.target.value })}
                    rows="3"
                    placeholder="Our talented team of professionals..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">About Page Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Upload multiple images for your About page (team photos, office, etc.)</p>
              
              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">New Images to Upload:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {previewImages.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Images */}
              {formData.images && formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Current Images:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={api.getImageUrl(image)}
                          alt={`About ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (aboutData ? 'Update About Page' : 'Create About Page')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AboutManagement
