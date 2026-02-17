"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductsModern() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts()
        if (data && data.length > 0) {
          const mappedProducts = data.map((product, index) => ({
            id: product.id,
            name: product.name || product.title,
            slug: product.slug,
            category: product.category || 'all',
            price: typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 99.99),
            image: product.image ? api.getImageUrl(product.image) : '📦',
            description: product.description || 'High-quality product',
            inStock: product.in_stock !== false,
            featured: product.featured || false
          }))
          setProducts(mappedProducts)
          console.log('✅ Products loaded from API:', mappedProducts.length)
        } else {
          setProducts([])
          console.log('⚠️ No products found in database')
        }
      } catch (error) {
        console.log('⚠️ API error, showing empty product list', error)
        setProducts([])
      }
    }
    loadProducts()
  }, [])

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '⚡' },
    { id: 'fashion', name: 'Fashion', icon: '👔' },
    { id: 'accessories', name: 'Accessories', icon: '👜' },
    { id: 'home', name: 'Home & Living', icon: '🏠' }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-full mb-6">
            OUR PRODUCTS
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-8xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">Check back soon for new products!</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {product.featured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold rounded-full">
                      ⭐ Featured
                    </div>
                  )}

                  {!product.inStock && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Out of Stock
                    </div>
                  )}

                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center cursor-pointer overflow-hidden">
                    {typeof product.image === 'string' && (product.image.startsWith('http') || product.image.startsWith('data:')) ? (
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = '<div class="text-8xl">📦</div>'
                        }}
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-8xl"
                      >
                        {product.image}
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                          product.inStock
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                      </button>
                      <Link href={`/products/${product.slug || product.id}`}>
                        <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">
                          👁️
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl"
        >
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us for custom orders or special requests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact">
              <button className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
                Contact Us
              </button>
            </a>
            <Link href="/products">
              <button className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                View All Products
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
