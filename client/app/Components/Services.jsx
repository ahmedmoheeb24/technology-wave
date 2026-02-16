"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Services = () => {
  const [servicesData, setServicesData] = useState([])

  useEffect(() => {
    // Load services from admin or use default
    const adminServices = localStorage.getItem('adminServices')
    if (adminServices) {
      const allServices = JSON.parse(adminServices)
      setServicesData(allServices.slice(0, 6)) // Show first 6 services
    } else {
      // Default services
      setServicesData(defaultServices)
    }
  }, [])

  const defaultServices = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing. Your data is encrypted and protected.",
    },
    {
      id: 3,
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy. Not satisfied? Get your money back, no questions asked.",
    },
    {
      id: 4,
      icon: "💬",
      title: "24/7 Support",
      description: "Round-the-clock customer support via chat, email, or phone. We're always here.",
    },
    {
      id: 5,
      icon: "✨",
      title: "Quality Products",
      description: "Premium quality products carefully selected and tested for your satisfaction.",
    },
    {
      id: 6,
      icon: "🎁",
      title: "Gift Cards",
      description: "Give the gift of choice with our digital gift cards. Perfect for any occasion.",
    },
  ]

  return (
    <div 
        id='services'
        className='w-full px-6 sm:px-10 lg:px-[12%] py-20 scroll-mt-20'
    >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className='text-center mb-2 text-xl font-Ovo text-blue-600'>
              Why Choose Us
          </h4>
          
          <h2 className='text-center text-4xl sm:text-5xl font-Ovo mb-6'>
              Our Services
          </h2>

          <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-700'>
              We provide exceptional services to ensure your shopping experience is smooth, secure, and satisfying.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>
              {servicesData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='group'
                  >
                      <div 
                          className='border border-gray-300 rounded-2xl p-8 
                                     bg-white
                                     hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100
                                     hover:shadow-xl hover:border-blue-300
                                     transition-all duration-500 h-full
                                     hover:-translate-y-2'
                      >
                          <div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                              {service.icon}
                          </div>
                          
                          <h3 className='text-xl font-bold mb-3 text-gray-800 font-Ovo'>
                              {service.title}
                          </h3>
                          
                          <p className='text-sm text-gray-600 leading-6 font-outfit'>
                              {service.description}
                          </p>
                      </div>
                  </motion.div>
              ))}
          </div>

          {/* View All Services Button */}
          <div className='text-center mt-12'>
            <Link 
              href="/services"
              className='inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
            >
              View All Services
              <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
    </div>
  )
}

export default Services