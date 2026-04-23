"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import Link from 'next/link'

export default function HeroModern3() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const [slides, setSlides] = useState([
    {
      title: "Craft Digital Excellence",
      subtitle: "Where Innovation Meets Design",
      description: "We transform ideas into powerful digital experiences that drive real business outcomes",
      button_text: "Start Project",
      button_link: "#contact",
    },
    {
      title: "Strategic Solutions",
      subtitle: "Technology That Scales",
      description: "Building robust platforms that grow with your business and adapt to market demands",
      button_text: "View Cases",
      button_link: "/products",
    },
    {
      title: "Creative Impact",
      subtitle: "Designs That Convert",
      description: "User-centric designs backed by data, optimized for engagement and conversion",
      button_text: "Our Process",
      button_link: "/services",
    }
  ])

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await api.getHeroBanners()
        if (data && data.length > 0) {
          const mappedSlides = data.map(banner => {
            let imageUrl = banner.image ? api.getImageUrl(banner.image) : null
            return {
              title: banner.title,
              subtitle: banner.subtitle,
              description: banner.description,
              button_text: banner.button_text || banner.buttonText,
              button_link: banner.button_link || banner.buttonLink,
              image: imageUrl,
            }
          })
          setSlides(mappedSlides)
        }
      } catch (error) {
        console.log('⚠️ Using default hero slides')
      }
    }
    loadSlides()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background Image */}
      {slides[currentSlide].image && (
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800" />

      {/* ── MAIN LAYOUT ── */}
      {/* pt-20 accounts for fixed navbar (~80px) on mobile, py-12 on desktop */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 pt-24 pb-10 md:py-12">

        {/* Slide counter — pushed below navbar with top spacing */}
        <div className="flex justify-end mb-6 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/60 font-mono text-sm"
          >
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </motion.div>
        </div>

        {/* Center Content — flex-1 so it fills remaining space */}
        <div className="flex-1 flex items-center justify-center py-8 md:py-0">
          <div className="max-w-6xl w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-400 font-mono text-xs md:text-base tracking-wider uppercase"
              >
                → {slides[currentSlide].subtitle}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight"
              >
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="inline-block mr-3 md:mr-6 hover:text-blue-400 transition-colors duration-300 cursor-default"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-2 md:pt-4"
              >
                <Link href={slides[currentSlide].button_link}>
                  <button className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3.5 md:py-4 bg-white text-black font-bold text-base md:text-lg rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <span>{slides[currentSlide].button_text}</span>
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-end mt-6 md:mt-0">

          {/* Navigation Arrows */}
          <div className="flex gap-3 md:gap-4">
            <button
              onClick={handlePrev}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Bars */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className="group relative">
                <div className={`h-1 transition-all duration-300 ${
                  index === currentSlide ? 'w-16 md:w-24 bg-white' : 'w-8 md:w-12 bg-white/30 hover:bg-white/50'
                }`} />
              </button>
            ))}
          </div>

          {/* Social Links — desktop only */}
          {/* <div className="hidden md:flex gap-6 text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div> */}

          {/* Mobile: empty spacer to keep progress bar centered */}
          <div className="flex md:hidden w-[88px]" />
        </div>
      </div>
    </section>
  )
}