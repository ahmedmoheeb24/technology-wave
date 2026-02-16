"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Work = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Load products from admin or use default
    const adminProducts = localStorage.getItem('adminProducts')
    if (adminProducts) {
      const allProducts = JSON.parse(adminProducts)
      setProducts(allProducts.slice(0, 8)) // Show first 8 products
    } else {
      // Default products
      setProducts(defaultProducts)
    }
  }, [])

  const defaultProducts = [
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
  ]

  return (
    <section
      id="work"
      className="w-full px-6 sm:px-10 lg:px-[12%] py-20 scroll-mt-20 bg-gray-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <h4 className="text-center mb-2 text-xl font-Ovo text-blue-600">
          Our Collection
        </h4>

        <h2 className="text-center text-4xl sm:text-5xl font-Ovo mb-6">
          Featured Products
        </h2>

        <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Ovo text-gray-700">
          Discover our handpicked selection of premium products. Quality meets style in every item.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 hover:border-blue-300">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                      Quick View
                    </button>
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-16">
          <motion.a
            href="/products"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Work