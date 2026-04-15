"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allProducts, setAllProducts] = useState([])

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Accessories', 'Travel', 'Wearables']

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts()
        if (data && data.length > 0) {
          setAllProducts(data)
          console.log('✅ Products loaded from API:', data.length)
        } else {
          setAllProducts([])
          console.log('⚠️ No products found in database')
        }
      } catch (error) {
        console.log('⚠️ API not available, showing empty list')
        setAllProducts([])
      }
    }
    loadProducts()
  }, [])

  // Old default products code preserved exactly as provided
  const oldDefaultProducts = () => {
    if (false) {
      setAllProducts([
        {
          id: 1,
          title: "Premium Headphones",
          category: "Electronics",
          price: "$199",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        },
        {
          id: 2,
          title: "Smart Watch",
          category: "Wearables",
          price: "$299",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        },
        {
          id: 3,
          title: "Leather Bag",
          category: "Fashion",
          price: "$149",
          image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=500&fit=crop",
        },
        {
          id: 4,
          title: "Running Shoes",
          category: "Sports",
          price: "$129",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        },
        {
          id: 5,
          title: "Coffee Maker",
          category: "Home",
          price: "$89",
          image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        },
        {
          id: 6,
          title: "Sunglasses",
          category: "Accessories",
          price: "$79",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        },
        {
          id: 7,
          title: "Desk Lamp",
          category: "Home",
          price: "$59",
          image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
        },
        {
          id: 8,
          title: "Backpack",
          category: "Travel",
          price: "$119",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        },
      ])
    }
  }

  // Updated filter logic with case-insensitivity to ensure it works with database strings
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen font-outfit overflow-x-hidden">
      
      <main className='pt-24 pb-20'>
        {/* Hero Section */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-16 bg-gradient-to-r from-blue-50 to-blue-100'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-4xl mx-auto text-center'
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold font-Ovo mb-6 text-gray-900'>
              Our Products
            </h1>
            <p className='text-lg sm:text-xl text-gray-700 font-Ovo leading-relaxed'>
              Discover our complete collection of premium quality products.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-8 bg-white border-b'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-wrap gap-3 justify-center'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-20'>
          <div className='max-w-7xl mx-auto'>
            <motion.div 
              layout
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 hover:border-blue-300 cursor-pointer">
                      {/* Product Image */}
                      <div className="relative h-64 bg-gray-200 overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        
                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <p className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-lg text-gray-900 mb-3 font-Ovo">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">
                            {product.price}
                          </span>
                          <div className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className='text-center py-20'>
                <p className='text-xl text-gray-500'>No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductsPage;