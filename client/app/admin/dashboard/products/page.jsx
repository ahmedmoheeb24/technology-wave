"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

const ProductsManagement = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    features: '',
    details: '',
    image: null
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadProducts()
  }, [router])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data || [])
      console.log('✅ Loaded products from API:', data?.length || 0)
    } catch (error) {
      console.error('❌ Error loading products:', error)
      console.log('⚠️ Using empty product list (backend may not be running)')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const formDataToSend = new FormData()
      
      formDataToSend.append('title', formData.title)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('price', parseFloat(formData.price))
      formDataToSend.append('description', formData.description || '')
      formDataToSend.append('features', formData.features || '')
      formDataToSend.append('details', formData.details || '')
      
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }
      
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formDataToSend)
        console.log('✅ Product updated')
      } else {
        await api.createProduct(formDataToSend)
        console.log('✅ Product created')
      }
      
      await loadProducts()
      resetForm()
      alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!')
    } catch (error) {
      console.error('❌ Error saving product:', error)
      console.error('Error details:', error.message, error.stack)
      alert(`Error saving product: ${error.message || 'Unknown error'}. Make sure the backend is running and you are logged in.`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description || '',
      features: product.features || '',
      details: product.details || '',
      image: null
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true)
        await api.deleteProduct(id)
        console.log('✅ Product deleted')
        await loadProducts()
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('❌ Error deleting product:', error)
        alert('Error deleting product. Make sure the backend is running and you are logged in.')
      } finally {
        setLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: '', category: '', price: '', description: '', features: '', details: '', image: null })
    setEditingProduct(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="accessories">Accessories</option>
                    <option value="home">Home & Living</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Short Summary)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief product description..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features (Comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Full product specifications and details..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {formData.image && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image Selected</label>
                  <p className="text-sm text-gray-600">📷 {formData.image.name}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
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
          <h2 className="text-xl font-bold mb-4">All Products ({products.length})</h2>
          
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products yet. Add your first product!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200">
                    {product.image && (
                      <img 
                        src={api.getImageUrl(product.image)}
                        alt={product.title} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-3">${product.price}</p>
                    {product.slug && <p className="text-xs text-gray-500 mb-2">Slug: {product.slug}</p>}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
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

export default ProductsManagement
