"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/lib/api'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load hero slides from API
    const fetchSlides = async () => {
      try {
        const data = await api.getHeroBanners()
        if (data && data.length > 0) {
          // Transform API data to match component structure
          const transformedSlides = data.map(banner => ({
            id: banner.id,
            title: banner.title,
            subtitle: banner.subtitle,
            description: banner.description,
            buttonText: banner.button_text,
            buttonLink: banner.button_link,
            bgColor: banner.bg_color,
            image: banner.image ? api.getImageUrl(banner.image) : null
          }))
          setSlides(transformedSlides)
        } else {
          // Use default slides if no data from API
          setSlides(defaultSlides)
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error)
        // Fallback to default slides on error
        setSlides(defaultSlides)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSlides()
  }, [])

  const defaultSlides = [
    {
      id: 1,
      title: "Welcome to Our Store",
      subtitle: "Discover Amazing Products",
      description: "Quality products at unbeatable prices",
      buttonText: "Shop Now",
      buttonLink: "#services",
      bgColor: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Collection 2026",
      description: "Check out our latest products and exclusive deals",
      buttonText: "Explore",
      buttonLink: "#work",
      bgColor: "from-blue-600 to-indigo-600",
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Limited Time Only",
      description: "Don't miss out on our exclusive promotions",
      buttonText: "View Deals",
      buttonLink: "#services",
      bgColor: "from-sky-500 to-blue-600",
    },
  ]

  // Auto-play slider
  useEffect(() => {
    if (slides.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (slides.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background image or gradient */}
          {slides[currentSlide].image ? (
            <div className="absolute inset-0">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor} opacity-80`}></div>
            </div>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor}`}></div>
          )}
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-center relative z-10">
            <div className="text-center text-white max-w-4xl">
              <motion.h3
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl lg:text-3xl font-outfit mb-4"
              >
                {slides[currentSlide].subtitle}
              </motion.h3>

              <motion.h1
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ovo font-bold mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl mb-8 font-outfit"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.a
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                href={slides[currentSlide].buttonLink}
                className="inline-block px-10 py-4 bg-white text-gray-900 font-semibold rounded-full 
                         hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 
                         hover:shadow-2xl text-lg"
              >
                {slides[currentSlide].buttonText}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 
                   backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 
                   hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 
                   backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 
                   hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white z-10"
      >
        <a href="#about" className="flex flex-col items-center gap-2">
          <span className="text-sm font-outfit">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}

export default HeroSlider
