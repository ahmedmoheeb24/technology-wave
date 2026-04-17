"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

// Aviation-specific categories — keep in sync with products/page.jsx
const CATEGORIES = [
  { label: 'Airframe Parts', value: 'Airframe' },
  { label: 'Engine & APU', value: 'Engine' },
  { label: 'Avionics', value: 'Avionics' },
  { label: 'Hydraulics', value: 'Hydraulics' },
  { label: 'Landing Gear', value: 'Landing Gear' },
  { label: 'Rotables', value: 'Rotables' },
  { label: 'Consumables', value: 'Consumables' },
  { label: 'Tools & GSE', value: 'Tools' },
]

const CONDITION_CODES = ['Serviceable (SV)', 'Overhauled (OH)', 'New (NS)', 'Repaired (RP)', 'Unserviceable (US)', 'Beyond Economical Repair (BER)']

const ProductsManagement = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    part_number: '',
    aircraft_type: '',
    description: '',
    features: '',
    details: '',
    image: null,
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
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) setFormData({ ...formData, image: file })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('price', parseFloat(formData.price) || 0)
      formDataToSend.append('condition', formData.condition || '')
      formDataToSend.append('part_number', formData.part_number || '')
      formDataToSend.append('aircraft_type', formData.aircraft_type || '')
      formDataToSend.append('description', formData.description || '')
      formDataToSend.append('features', formData.features || '')
      formDataToSend.append('details', formData.details || '')
      if (formData.image) formDataToSend.append('image', formData.image)

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formDataToSend)
      } else {
        await api.createProduct(formDataToSend)
      }

      await loadProducts()
      resetForm()
      alert(editingProduct ? 'Part updated successfully!' : 'Part added successfully!')
    } catch (error) {
      alert(`Error saving part: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title || '',
      category: product.category || '',
      condition: product.condition || '',
      price: product.price || '',
      part_number: product.part_number || '',
      aircraft_type: product.aircraft_type || '',
      description: product.description || '',
      features: product.features || '',
      details: product.details || '',
      image: null,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this part from inventory?')) {
      try {
        setLoading(true)
        await api.deleteProduct(id)
        await loadProducts()
      } catch (error) {
        alert('Error deleting part.')
      } finally {
        setLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '', category: '', condition: '', price: '', part_number: '',
      aircraft_type: '', description: '', features: '', details: '', image: null,
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const filteredProducts = products.filter((p) => {
    const matchCat = filterCategory === 'All' || p.category?.toLowerCase() === filterCategory.toLowerCase()
    const matchSearch =
      searchQuery === '' ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.part_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.aircraft_type?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-none">Parts Inventory</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Admin Management</p>
            </div>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all text-sm font-bold group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="hidden sm:inline">Back to</span> Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Parts', value: products.length },
            { label: 'Categories', value: [...new Set(products.map(p => p.category).filter(Boolean))].length },
            { label: 'Filtered View', value: filteredProducts.length },
            { label: 'Showing', value: `${filteredProducts.length} / ${products.length}` },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-2xl font-black text-blue-600">{stat.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── TOOLBAR ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title, P/N, aircraft..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => { resetForm(); setShowForm(!showForm) }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                showForm
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
              }`}
            >
              {showForm ? 'Cancel' : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0-0H6" />
                  </svg>
                  Add Part
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── FORM ── */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-black text-gray-900">
                {editingProduct ? 'Edit Part' : 'Add New Part'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Part / Component Name *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Hydraulic Actuator Assembly"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Condition Code</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="">Select Condition</option>
                    {CONDITION_CODES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Part Number (P/N)</label>
                  <input
                    type="text"
                    value={formData.part_number}
                    onChange={(e) => setFormData({ ...formData, part_number: e.target.value })}
                    placeholder="e.g. 123456-01"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Aircraft Type / Platform</label>
                  <input
                    type="text"
                    value={formData.aircraft_type}
                    onChange={(e) => setFormData({ ...formData, aircraft_type: e.target.value })}
                    placeholder="e.g. Boeing 737, Airbus A320"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00 (leave blank for RFQ)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Short Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief part description and condition summary..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Key Specifications / Features <span className="text-gray-400 normal-case font-normal">(comma-separated)</span>
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="FAA 8130-3 tag, Dual hydraulic seals, Titanium housing, ..."
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Full Technical Details</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Full specifications, traceability info, overhaul history, SB/AD compliance..."
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Part Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
                {formData.image && (
                  <p className="text-xs text-green-600 mt-1.5 font-medium">✓ {formData.image.name}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors text-sm"
                >
                  {loading ? 'Saving...' : (editingProduct ? 'Update Part' : 'Add Part')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── PRODUCTS TABLE / GRID ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900">Parts Catalog</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {filteredProducts.length} of {products.length} parts
                {filterCategory !== 'All' && ` · ${filterCategory}`}
                {searchQuery && ` · "${searchQuery}"`}
              </p>
            </div>
            {(filterCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => { setFilterCategory('All'); setSearchQuery('') }}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📦</div>
              <p className="font-semibold">No parts found</p>
              <p className="text-sm mt-1">Try adjusting your filters or add a new part.</p>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all group"
                >
                  {/* Image */}
                  <div className="h-44 bg-gray-100 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={api.getImageUrl(product.image)}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-4xl">⚙️</span>
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-2 left-2">
                      <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">
                        {product.category || '—'}
                      </span>
                    </div>
                    {/* Condition badge */}
                    {product.condition && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded-full">
                          {product.condition.split(' ')[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-black text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    {product.part_number && (
                      <p className="text-xs text-gray-400 mb-0.5 font-mono">P/N: {product.part_number}</p>
                    )}
                    {product.aircraft_type && (
                      <p className="text-xs text-gray-400 mb-2">✈ {product.aircraft_type}</p>
                    )}

                    <p className="text-xl font-black text-blue-600 mb-3">
                      {product.price ? `$${product.price}` : 'RFQ'}
                    </p>

                    {product.slug && (
                      <p className="text-xs text-gray-400 mb-3 font-mono truncate">/{product.slug}</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-600 hover:text-white transition-colors text-xs font-bold"
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