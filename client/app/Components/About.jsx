"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const About = () => {
  return (
    <div 
      id='about' 
      className='w-full px-6 sm:px-10 lg:px-[12%] py-20 scroll-mt-20 overflow-x-hidden bg-gray-50'
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className='text-center mb-2 text-xl font-Ovo text-blue-600'>
          Get To Know Us
        </h4>

        <h2 className='text-center text-4xl sm:text-5xl font-Ovo mb-6'>
          About Our Store
        </h2>

        <div className='max-w-4xl mx-auto text-center'>
          <div className='mb-8 font-Ovo text-gray-700 text-base sm:text-lg leading-relaxed'>
            <p className='mb-6'>
              Welcome to our online store, where quality meets affordability. We are dedicated to bringing you 
              the best products with a focus on excellence, customer service, and uniqueness. Founded with a 
              passion for innovation and quality, we've come a long way from our beginnings.
            </p>
            <p className='mb-6'>
              Our mission is to provide our customers with high-quality products at competitive prices. 
              We believe in building lasting relationships with our customers by offering exceptional service 
              and a seamless shopping experience. Every product we offer is carefully selected to meet our 
              high standards of quality and value.
            </p>
          </div>

          {/* Learn More Button */}
          <Link 
            href="/about"
            className='inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-16'
          >
            Learn More About Us
            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Stats Section */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className='bg-white p-8 rounded-2xl border border-gray-200 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300'
            >
              <h3 className='text-4xl font-bold text-blue-600 mb-2'>500+</h3>
              <p className='text-gray-700 font-Ovo'>Products Available</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='bg-white p-8 rounded-2xl border border-gray-200 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300'
            >
              <h3 className='text-4xl font-bold text-blue-600 mb-2'>1000+</h3>
              <p className='text-gray-700 font-Ovo'>Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='bg-white p-8 rounded-2xl border border-gray-200 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300'
            >
              <h3 className='text-4xl font-bold text-blue-600 mb-2'>24/7</h3>
              <p className='text-gray-700 font-Ovo'>Customer Support</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default About