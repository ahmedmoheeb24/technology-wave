"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { FiArrowLeft, FiCheckCircle, FiClock, FiPackage, FiChevronRight, FiShoppingCart } from 'react-icons/fi'

export default function ProductDetailClient({ params }) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const slug = params?.slug
        const data = await api.getProductBySlug(slug)
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    if (params?.slug) loadProduct()
  }, [params?.slug])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) addToCart(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 2500)
    }
  }

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Loading part data...</p>
        </div>
      </div>
    )
  }

  // ── NOT FOUND ──
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">⚙️</div>
          <h1 className="text-3xl font-black text-white mb-3">Part Not Found</h1>
          <p className="text-gray-400 mb-8">This part may have been removed or the reference is incorrect.</p>
          <Link href="/products">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105">
              Back to Inventory
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const features = product.features
    ? product.features.split(',').map((f) => f.trim()).filter(Boolean)
    : []

  const price = product.product_price || product.price
  const priceStr = price ? (String(price).startsWith('$') ? price : `$${price}`) : null
  const name = product.product_name || product.title || 'Aviation Part'

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        {product.image && api.getImageUrl(product.image) ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${api.getImageUrl(product.image)})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center">
            <span className="text-9xl opacity-20">⚙️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-10 lg:pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4 hover:text-blue-300 transition-colors"
            >
              <FiArrowLeft className="w-3 h-3" />
              Back to Inventory
            </Link>

            {product.category && (
              <div className="mb-3">
                <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-3 max-w-3xl">
              {name}
            </h1>

            {priceStr && (
              <div className="flex items-center gap-4 mt-4">
                <span className="text-3xl font-black text-blue-400">{priceStr}</span>
                <span className="text-sm text-white/40 line-through">${(parseFloat(price) * 1.2).toFixed(2)}</span>
                <span className="text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">
                  Save 20%
                </span>
              </div>
            )}
            {!priceStr && (
              <span className="inline-block mt-3 text-sm font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-4 py-2 rounded-full">
                Request for Quote (RFQ)
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-gray-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5">

          {/* Left: Description + features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 px-8 sm:px-12 lg:px-16 py-14 lg:py-20 flex flex-col justify-center"
          >
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Part Overview</p>

            {product.description && (
              <div className="space-y-3 text-gray-400 text-base leading-relaxed mb-8">
                {product.description.split('\n').filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <div>
                <p className="text-white font-black text-sm uppercase tracking-wide mb-4">Key Specifications</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                      <FiCheckCircle className="text-blue-400 mt-0.5 flex-shrink-0 w-4 h-4" />
                      <span className="text-gray-300 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Order panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 px-8 sm:px-10 py-14 lg:py-20 flex flex-col justify-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 space-y-6">
              <p className="text-blue-400 font-mono text-xs tracking-widest uppercase">Order / Enquiry</p>

              {priceStr && (
                <div>
                  <div className="text-4xl font-black text-white">{priceStr}</div>
                  <div className="text-gray-500 text-xs mt-1">Per unit · AOG pricing available</div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">Quantity</p>
                <div className="flex items-center gap-0 border border-white/20 rounded-xl overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-base font-black text-white border-x border-white/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-black text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-green-500 text-white scale-[0.98]'
                    : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] shadow-xl shadow-blue-900/30'
                }`}
              >
                {added ? (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* RFQ */}
              <Link href="/contact">
                <button className="w-full py-3.5 border border-white/20 text-white/80 hover:text-white hover:border-blue-400 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                  Request a Quote (RFQ)
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </Link>

              {/* Trust signals */}
              <div className="border-t border-white/10 pt-5 space-y-2.5">
                {[
                  { icon: FiPackage, text: 'Full traceability & documentation' },
                  { icon: FiCheckCircle, text: 'FAA / EASA serviceable condition' },
                  { icon: FiClock, text: 'AOG priority dispatch available' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-gray-400 text-xs">
                    <item.icon className="text-blue-400 w-3.5 h-3.5 flex-shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DETAILED DESCRIPTION ── */}
      {product.details && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100"
            >
              <div className="w-10 h-0.5 bg-blue-600 mb-4" />
              <h2 className="text-2xl font-black text-gray-900 mb-6">Part Details & Specifications</h2>
              <div className="text-gray-600 leading-relaxed space-y-4 text-base max-w-4xl">
                {product.details.split('\n').filter(Boolean).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="relative overflow-hidden bg-gray-950 py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-gray-950/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Need More Parts?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
              Browse Our Full Inventory
            </h2>
            <p className="text-gray-400 text-base mb-8">
              Certified, traceable parts across airframe, engine, avionics, hydraulics and more — available 7/24/365.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30">
                  View All Parts
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                  Contact Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}