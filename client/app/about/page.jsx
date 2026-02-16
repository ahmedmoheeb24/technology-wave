"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion'

const AboutImage = () => {
  const [aboutImage, setAboutImage] = useState('')

  useEffect(() => {
    const savedImage = localStorage.getItem('adminAboutImage')
    if (savedImage) {
      setAboutImage(savedImage)
    }
  }, [])

  if (aboutImage) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='rounded-3xl h-96 overflow-hidden'
      >
        <img src={aboutImage} alt="About Us" className='w-full h-full object-cover' />
      </motion.div>
    )
  }

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

const AboutPage = () => {
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
              About Our Store
            </h1>
            <p className='text-lg sm:text-xl text-gray-700 font-Ovo leading-relaxed'>
              Learn more about our journey, mission, and commitment to providing you with the best shopping experience.
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
                    Welcome to our online store, where quality meets affordability. We are dedicated to bringing you 
                    the best products with a focus on excellence, customer service, and uniqueness. Founded with a 
                    passion for innovation and quality, we've come a long way from our beginnings.
                  </p>
                  <p>
                    Our mission is to provide our customers with high-quality products at competitive prices. 
                    We believe in building lasting relationships with our customers by offering exceptional service 
                    and a seamless shopping experience.
                  </p>
                  <p>
                    Every product we offer is carefully selected to meet our high standards of quality and value. 
                    We're constantly expanding our product range and improving our services to better serve you.
                  </p>
                </div>
              </motion.div>

              <AboutImage />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
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

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className='bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300'
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
                  <svg className='w-8 h-8 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold font-Ovo mb-4 text-gray-900'>Quality First</h3>
                <p className='text-gray-700 font-Ovo leading-relaxed'>
                  We carefully curate our products to ensure only the highest quality items reach our customers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300'
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
                  <svg className='w-8 h-8 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold font-Ovo mb-4 text-gray-900'>Customer Focus</h3>
                <p className='text-gray-700 font-Ovo leading-relaxed'>
                  Your satisfaction is our priority. We're here to provide exceptional service every step of the way.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className='bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300'
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
                  <svg className='w-8 h-8 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold font-Ovo mb-4 text-gray-900'>Innovation</h3>
                <p className='text-gray-700 font-Ovo leading-relaxed'>
                  We continuously evolve and adapt to bring you the latest and greatest products and services.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

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
