"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// Interactive Card Grid Services
export default function ServicesModern1() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      slug: "web-development",
      title: "Web Development",
      description: "Build powerful, scalable web applications with cutting-edge technologies",
      features: ["React/Next.js", "Backend APIs", "Database Design", "Deployment"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps that users love",
      features: ["iOS & Android", "React Native", "App Store Deploy", "Push Notifications"],
      color: "from-purple-500 to-pink-500"
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that convert visitors into customers",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      color: "from-orange-500 to-red-500"
    },
    {
      slug: "cloud-solutions",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure for modern applications",
      features: ["AWS/Azure", "DevOps", "CI/CD Pipeline", "Cloud Security"],
      color: "from-teal-500 to-green-500"
    },
    {
      slug: "ecommerce-solutions",
      title: "E-Commerce Solutions",
      description: "Complete online store solutions that drive sales",
      features: ["Shopping Carts", "Payment Gateway", "Inventory", "Analytics"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      description: "Data-driven strategies to grow your online presence",
      features: ["SEO Strategy", "Social Media", "PPC Advertising", "Analytics"],
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-full mb-6">
            WHAT WE OFFER
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
              
              {/* Card */}
              <Link href={`/services/${service.slug}`}>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={`/services/${service.slug}`}>
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    Learn More
                  </button>
                </Link>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-tr-3xl rounded-bl-3xl transition-all duration-300 ${
                  hoveredIndex === index ? 'scale-150' : 'scale-100'
                }`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 mb-6">Need a custom solution?</p>
          <a href="#contact">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Let's Talk About Your Project
            </button>
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
