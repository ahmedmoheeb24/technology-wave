'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/lib/api'
import Link from 'next/link'

// Aviation-specific categories matching the portfolio
const CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: 'Airframe Parts', value: 'Airframe' },
  { label: 'Engine & APU', value: 'Engine' },
  { label: 'Avionics', value: 'Avionics' },
  { label: 'Hydraulics', value: 'Hydraulics' },
  { label: 'Landing Gear', value: 'Landing Gear' },
  { label: 'Rotables', value: 'Rotables' },
  { label: 'Consumables', value: 'Consumables' },
  { label: 'Tools & GSE', value: 'Tools' },
]

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts()
        if (data && data.length > 0) {
          setAllProducts(data)
        } else {
          setAllProducts([])
        }
      } catch (error) {
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch =
      searchQuery === '' ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white font-outfit">

      {/* ── HEADER SECTION (Matching Services Design) ── */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            {/* Center Badge */}
            <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600 rounded-full">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                What We Offer
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
              Parts <span className="text-blue-600">Inventory</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Certified, traceable aviation parts and components — supporting organizations 
              through immediate dispatch, validation, and global logistics operations.
            </p>
          </motion.div>
        </div>
      </section>

     {/* ── FILTER BAR ── */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Centering the entire container */}
          <div className="flex flex-col items-center justify-center w-full">

            {/* Category Pills - Increased size and gap */}
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Count */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-1">Available Stock</p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Part' : 'Parts'} Found
              </h2>
            </div>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
                className="text-xs text-blue-600 font-bold underline underline-offset-2 hover:text-blue-800 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No Parts Found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : `No parts in the "${selectedCategory}" category yet.`}
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
              >
                View All Parts
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && filteredProducts.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  const imageUrl = api.getImageUrl(product.image)
                  const hasImage = imageUrl && (imageUrl.startsWith('data:') || imageUrl.startsWith('http'))
                  const name = product.product_name || product.title || 'Aviation Part'
                  const price = product.product_price || product.price
                  const priceStr = price ? (String(price).startsWith('$') ? price : `$${price}`) : 'RFQ'

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

                      <Link href={`/products/${product.slug || product.id}`} className="block h-full">
                        <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col h-full">

                          {/* Image */}
                          <div className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                            {hasImage ? (
                              <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                <span className="text-5xl">⚙️</span>
                                <span className="text-xs mt-2 uppercase tracking-widest font-mono">No Image</span>
                              </div>
                            )}

                            <div className="absolute top-3 left-3">
                              <span className="text-xs font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full">
                                {product.category || 'Part'}
                              </span>
                            </div>

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="bg-white text-gray-900 px-5 py-2 rounded-full font-bold text-sm">
                                View Part
                              </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-5 flex flex-col flex-1">
                            <div className="w-8 h-0.5 bg-blue-600 mb-3" />
                            <h3 className="font-black text-gray-900 text-base leading-snug mb-3 line-clamp-2">
                              {name}
                            </h3>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                              <span className="text-xl font-black text-blue-600">{priceStr}</span>
                              <div className="w-9 h-9 bg-blue-600 group-hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gray-950 py-20 px-4 mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-gray-950/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Can't Find What You Need?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              We Source Hard-to-Find Parts
            </h2>
            <p className="text-gray-400 text-base mb-8">
              AOG or critical requirement? Our team is available 7/24/365 to locate and validate parts for your fleet.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30">
                  Submit an RFQ
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage