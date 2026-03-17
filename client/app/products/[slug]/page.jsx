"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

export default function ProductDetail() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await api.getProductBySlug(params.slug)
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [params.slug])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const features = product.features ? product.features.split(',').map(f => f.trim()) : []

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.title}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {product.image ? (
              <img
                src={api.getImageUrl(product.image)}
                alt={product.title}
                className="w-full h-[500px] object-cover"
              />
            ) : (
              <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-8xl">📦</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-sm font-semibold text-blue-600 uppercase mb-2">{product.category}</p>
              <h1 className="text-4xl font-black text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-black text-blue-600">${product.price}</span>
                <span className="text-gray-500 line-through text-xl">${(product.price * 1.2).toFixed(2)}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Save 20%</span>
              </div>

              {product.description && (
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
              )}

              {features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block font-bold text-gray-900 mb-2">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-600 font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-600 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
              >
                🛒 Add to Cart
              </button>

              <Link href="/products">
                <button className="w-full py-4 border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all">
                  ← Back to Products
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        {product.details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-6">Product Details</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {product.details.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
