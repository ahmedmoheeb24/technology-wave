"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion'

const ServicesPage = () => {
  const [servicesData, setServicesData] = useState([])

  useEffect(() => {
    // Load services from admin or use default
    const adminServices = localStorage.getItem('adminServices')
    if (adminServices) {
      setServicesData(JSON.parse(adminServices))
    } else {
      setServicesData(defaultServices)
    }
  }, [])

  const defaultServices = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
      details: "We partner with trusted shipping carriers to ensure your orders arrive safely and on time. Track your package every step of the way."
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing. Your data is encrypted and protected.",
      details: "We use industry-standard SSL encryption to protect your payment information. Multiple payment options available including credit cards, PayPal, and more."
    },
    {
      id: 3,
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy. Not satisfied? Get your money back, no questions asked.",
      details: "Return any item within 30 days of purchase. Simple return process with prepaid shipping labels. Full refund guaranteed."
    },
    {
      id: 4,
      icon: "💬",
      title: "24/7 Support",
      description: "Round-the-clock customer support via chat, email, or phone. We're always here.",
      details: "Our dedicated support team is available 24/7 to answer your questions and resolve any issues. Contact us anytime through live chat, email, or phone."
    },
    {
      id: 5,
      icon: "✨",
      title: "Quality Products",
      description: "Premium quality products carefully selected and tested for your satisfaction.",
      details: "Every product is carefully curated and tested to meet our high standards. We work with trusted brands and suppliers to ensure you get the best."
    },
    {
      id: 6,
      icon: "🎁",
      title: "Gift Cards",
      description: "Give the gift of choice with our digital gift cards. Perfect for any occasion.",
      details: "Digital gift cards delivered instantly via email. Choose any amount and let your loved ones pick exactly what they want."
    },
    {
      id: 7,
      icon: "📦",
      title: "Order Tracking",
      description: "Real-time order tracking from warehouse to your door.",
      details: "Track your order status in real-time with detailed updates. Know exactly when your package will arrive."
    },
    {
      id: 8,
      icon: "🏆",
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and get exclusive rewards.",
      details: "Join our loyalty program and earn points on every purchase. Redeem points for discounts, free shipping, and exclusive products."
    },
    {
      id: 9,
      icon: "💳",
      title: "Multiple Payment Options",
      description: "Pay your way with various payment methods accepted.",
      details: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and more. Choose the payment method that works best for you."
    },
  ]

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
              Our Services
            </h1>
            <p className='text-lg sm:text-xl text-gray-700 font-Ovo leading-relaxed'>
              We provide exceptional services to ensure your shopping experience is smooth, secure, and satisfying.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-20'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
                    
                    <h3 className='text-2xl font-bold mb-3 text-gray-800 font-Ovo'>
                      {service.title}
                    </h3>
                    
                    <p className='text-base text-gray-600 leading-6 font-outfit mb-4'>
                      {service.description}
                    </p>

                    <p className='text-sm text-gray-500 leading-6 font-outfit'>
                      {service.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='w-full px-6 sm:px-10 lg:px-[12%] py-16 bg-blue-600'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='max-w-4xl mx-auto text-center'
          >
            <h2 className='text-3xl sm:text-4xl font-bold font-Ovo mb-6 text-white'>
              Ready to Start Shopping?
            </h2>
            <p className='text-lg text-white/90 font-Ovo mb-8'>
              Experience our exceptional service and quality products today.
            </p>
            <a 
              href="/products"
              className='inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
            >
              Browse Products
              <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ServicesPage
