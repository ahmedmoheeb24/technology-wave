"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

// Aviation-specific categories matching the main Products Page
const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Airframe Parts', value: 'Airframe' },
  { label: 'Engine & APU', value: 'Engine' },
  { label: 'Avionics', value: 'Avionics' },
  { label: 'Hydraulics', value: 'Hydraulics' },
  { label: 'Landing Gear', value: 'Landing Gear' },
  { label: 'Rotables', value: 'Rotables' },
  { label: 'Consumables', value: 'Consumables' },
  { label: 'Tools & GSE', value: 'Tools' },
]

export default function ProductsModern() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts()
        if (data && data.length > 0) {
          const mappedProducts = data.map((product) => ({
            id: product.id,
            name: product.product_name || product.title || 'Aviation Part',
            slug: product.slug,
            category: product.category || 'Part',
            price: product.product_price || product.price,
            image: product.image,
            description: product.description || 'Certified, traceable aviation component.',
            inStock: product.in_stock !== false,
            featured: product.featured || false
          }))
          setProducts(mappedProducts)
        } else {
          setProducts([])
        }
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="products" className="py-24 bg-white font-outfit relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── HEADER SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600 rounded-full">
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
              Our Inventory
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Featured <span className="text-blue-600">Parts</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of certified, traceable aviation components available for immediate dispatch.
          </p>
        </motion.div>

        {/* ── CATEGORY FILTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ── PRODUCTS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-24">
              <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-8xl mb-4">📦</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No Parts Found</h3>
              <p className="text-gray-500">Check back soon for new inventory updates.</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredProducts.slice(0, 8).map((product, index) => {
                const imageUrl = api.getImageUrl(product.image)
                const hasImage = imageUrl && (imageUrl.startsWith('data:') || imageUrl.startsWith('http'))
                const priceStr = product.price ? (String(product.price).startsWith('$') ? product.price : `$${product.price}`) : 'RFQ'

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
                    
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col h-full">
                      
                      {/* Image Area */}
                      <Link href={`/products/${product.slug || product.id}`} className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0 block">
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
                          <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                        
                        {product.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="text-[10px] font-bold text-white bg-amber-500 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              ⭐ Featured
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Info Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="w-8 h-0.5 bg-blue-600 mb-4" />
                        <Link href={`/products/${product.slug || product.id}`}>
                          <h3 className="font-black text-gray-900 text-lg leading-snug mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-2xl font-black text-blue-600">{priceStr}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart(product)
                            }}
                            disabled={!product.inStock}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              product.inStock 
                              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 shadow-lg shadow-blue-200' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>

        {/* ── CTA SECTION (Dark Style matching Main Page) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gray-950 rounded-3xl p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-gray-950/80" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">AOG or Special Requirements?</p>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              We Source Hard-to-Find Parts
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Our team is available 24/7 to locate and validate parts for your fleet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-900/30">
                  Submit an RFQ
                </button>
              </Link>
              <Link href="/products">
                <button className="px-10 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                  View Full Inventory
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}