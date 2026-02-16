"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion'
import api from '@/lib/api'

const AboutImages = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl h-96 flex items-center justify-center'
      >
        <div className='text-center'>
          <svg className='w-32 h-32 mx-auto text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className='mt-4 text-xl font-bold text-blue-900'>Quality Products</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='rounded-3xl overflow-hidden'
    >
      {images.length === 1 ? (
        <img 
          src={api.getImageUrl(images[0])} 
          alt="About Us" 
          className='w-full h-96 object-cover' 
        />
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={api.getImageUrl(image)}
              alt={`About Us ${index + 1}`}
              className='w-full h-48 object-cover rounded-lg'
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await api.getAbout()
        if (data && data.length > 0) {
          setAboutData(data[0])
        }
      } catch (error) {
        console.error('Error loading about data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAboutData()
  }, [])

  // Get values array (support both old string format and new object format)
  const getValuesArray = () => {
    if (!aboutData?.values) return []
    // If it's already an array of objects, return it
    if (Array.isArray(aboutData.values)) return aboutData.values
    // Otherwise, parse as comma-separated string (legacy support)
    return aboutData.values.split(',').map(v => ({ title: v.trim(), description: '' })).filter(v => v.title)
  }

  const valuesArray = getValuesArray()

  return (
    <div className="min-h-screen font-outfit overflow-x-hidden">
      <Navbar />
      
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
              {aboutData?.title || 'About Our Store'}
            </h1>
            <p className='text-lg sm:text-xl text-gray-700 font-Ovo leading-relaxed'>
              {aboutData?.subtitle || 'Learn more about our journey, mission, and commitment to providing you with the best shopping experience.'}
            </p>
          </motion.div>
        </div>

        {/* Our Story Section */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-20'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className='text-3xl sm:text-4xl font-bold font-Ovo mb-6 text-blue-600'>Our Story</h2>
                <div className='space-y-4 text-gray-700 font-Ovo leading-relaxed'>
                  <p>
                    {aboutData?.description || 'Welcome to our online store, where quality meets affordability. We are dedicated to bringing you the best products with a focus on excellence, customer service, and uniqueness.'}
                  </p>
                  {aboutData?.mission && (
                    <div>
                      <h3 className='font-bold text-gray-900 mb-2'>Our Mission</h3>
                      <p>{aboutData.mission}</p>
                    </div>
                  )}
                  {aboutData?.vision && (
                    <div>
                      <h3 className='font-bold text-gray-900 mb-2'>Our Vision</h3>
                      <p>{aboutData.vision}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <AboutImages images={aboutData?.images} />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        {valuesArray.length > 0 && (
          <div className='w-full px-6 sm:px-10 lg:px-[12%] py-20 bg-gray-50'>
            <div className='max-w-6xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='text-center mb-16'
              >
                <h2 className='text-3xl sm:text-4xl font-bold font-Ovo mb-4 text-blue-600'>Our Values</h2>
                <p className='text-gray-700 font-Ovo text-lg max-w-2xl mx-auto'>
                  These core values guide everything we do and help us serve you better.
                </p>
              </motion.div>

              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(valuesArray.length, 3)} gap-8`}>
                {valuesArray.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className='bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300'
                  >
                    <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
                      <svg className='w-8 h-8 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className='text-2xl font-bold font-Ovo mb-4 text-gray-900'>{value.title || value}</h3>
                    {value.description && (
                      <p className='text-gray-600 font-Ovo leading-relaxed'>{value.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-20'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <h3 className='text-5xl font-bold text-blue-600 mb-2'>500+</h3>
                <p className='text-gray-700 font-Ovo'>Products</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <h3 className='text-5xl font-bold text-blue-600 mb-2'>1000+</h3>
                <p className='text-gray-700 font-Ovo'>Customers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <h3 className='text-5xl font-bold text-blue-600 mb-2'>24/7</h3>
                <p className='text-gray-700 font-Ovo'>Support</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <h3 className='text-5xl font-bold text-blue-600 mb-2'>100%</h3>
                <p className='text-gray-700 font-Ovo'>Satisfaction</p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
