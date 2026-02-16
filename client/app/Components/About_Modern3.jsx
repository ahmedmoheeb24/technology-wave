"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function AboutModern3() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  // UPDATED: Changed the last value from 0 to 1 so the text doesn't fade out at the bottom
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 1])

  const achievements = [
    { year: "2009", title: "Company Founded", description: "Started with a vision to transform digital experiences" },
    { year: "2015", title: "100+ Projects", description: "Reached our first major milestone in project delivery" },
    { year: "2020", title: "Industry Leader", description: "Recognized as a top digital agency in the region" },
    { year: "2024", title: "Global Expansion", description: "Serving clients across 15+ countries worldwide" }
  ]

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-100 to-transparent rounded-tr-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with Parallax */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white text-sm font-bold rounded-full mb-6"
        >
          OUR STORY
        </motion.span>
        
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
          15 Years of
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent">
            Digital Excellence
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From a small startup to an industry-leading digital agency, our journey has been driven by passion, innovation, and an unwavering commitment to our clients' success.
        </p>
      </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 transform -translate-x-1/2"></div>

            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
                className={`relative mb-12 md:mb-16 flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 pl-8 md:pl-0' : 'md:pl-12 pl-8 md:pr-0'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
                  >
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-3">
                      {achievement.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-12">
          <a href="#contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </a>
          <Link href="/about">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-10 py-4 border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Know About Us
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  )
}