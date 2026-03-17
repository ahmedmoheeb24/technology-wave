"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Link from 'next/link'

export default function ServiceDetailPage({ params }) {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true)
        const slug = params.slug
        const data = await api.request(`/api/services/slug/${slug}`)
        setService(data)
        setError(null)
      } catch (err) {
        console.error('Error loading service:', err)
        setError('Service not found')
      } finally {
        setLoading(false)
      }
    }
    loadService()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen font-outfit">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading service details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen font-outfit">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-8xl mb-4">😕</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
            <Link href="/services">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all">
                Back to Services
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Parse features from comma-separated string
  const features = service.features 
    ? (typeof service.features === 'string' 
        ? service.features.split(',').map(f => f.trim()).filter(f => f.length > 0)
        : service.features)
    : []

  return (
    <div className="min-h-screen font-outfit">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{service.title}</span>
            </div>

            {/* Title and Icon */}
            <div className="flex items-start gap-6 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-7xl"
              >
                {service.icon}
              </motion.div>
              <div className="flex-1">
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
                  {service.title}
                </h1>
                <p className="text-2xl text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4">
              <a href="#contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </a>
              <Link href="/services">
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300">
                  All Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      {service.image && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={api.getImageUrl(service.image)}
                alt={service.title}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Detailed Description */}
      {service.detailed_description && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                About This Service
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.detailed_description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0">
                      <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Let's discuss how this service can help your business grow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact">
                <button className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
                  Contact Us
                </button>
              </a>
              <Link href="/services">
                <button className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                  View All Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
