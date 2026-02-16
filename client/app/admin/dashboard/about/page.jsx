"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AboutManagement = () => {
  const router = useRouter()
  const [aboutImage, setAboutImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadAboutImage()
  }, [router])

  const loadAboutImage = () => {
    const savedImage = localStorage.getItem('adminAboutImage')
    if (savedImage) {
      setAboutImage(savedImage)
      setPreviewImage(savedImage)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    localStorage.setItem('adminAboutImage', previewImage)
    setAboutImage(previewImage)
    alert('About section image updated successfully!')
  }

  const handleRemove = () => {
    if (confirm('Are you sure you want to remove the about image?')) {
      localStorage.removeItem('adminAboutImage')
      setAboutImage('')
      setPreviewImage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">About Section Image</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Upload About Section Image</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                This image will be displayed on the About page. Recommended size: 800x600px
              </p>
            </div>

            {previewImage && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preview
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="About section preview" 
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={!previewImage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save Image
              </button>
              
              {aboutImage && (
                <button
                  onClick={handleRemove}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>

        {aboutImage && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Current About Image</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <img 
                src={aboutImage} 
                alt="Current about section" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AboutManagement
