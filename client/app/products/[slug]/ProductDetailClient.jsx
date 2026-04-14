"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

export default function ProductDetail({ params }) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const slug = params?.slug
        console.log('Loading product with slug:', slug)
        const data = await api.getProductBySlug(slug)
        console.log('Product loaded:', data)
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    if (params.slug) {
      loadProduct()
    }
  }, [params?.slug])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
          <p className="text-gray-500 mb-6">This product may have been removed or doesn't exist.</p>
          <Link href="/products">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const features = product.features ? product.features.split(',').map(f => f.trim()) : []

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate max-w-[180px]">{product.title}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── LEFT: Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {product.image ? (
                <img
                  src={api.getImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-[420px] lg:h-[520px] object-cover"
                />
              ) : (
                <div className="w-full h-[420px] lg:h-[520px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-8xl">📦</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 lg:p-8 flex flex-col gap-6 h-full">

              {/* Category badge */}
              {product.category && (
                <span className="self-start text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Price row */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-4xl font-black text-blue-600">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-sm font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Save 20%
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-base leading-relaxed border-t border-gray-100 pt-5">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Key Features</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Quantity + Add to Cart */}
              <div className="border-t border-gray-100 pt-6 space-y-4">

                {/* Quantity selector */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Quantity</span>
                  <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-lg font-bold text-gray-900 border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 font-bold text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-green-500 text-white scale-[0.98]'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]'
                  }`}
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Back link */}
                <Link href="/products">
                  <button className="w-full py-3.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details section */}
        {product.details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-7 lg:p-10"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-7 rounded-full bg-blue-600 inline-block"></span>
              Product Details
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-base">
              {product.details.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}

      </main>
    </div>
  )
}