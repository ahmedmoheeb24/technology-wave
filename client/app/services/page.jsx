"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiSmartphone, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi'

const services = [
  {
    id: 1,
    slug: 'web-development',
    icon: FiCode,
    title: 'Web Development',
    description: 'Build powerful, scalable web applications with cutting-edge technologies',
    longDescription: 'Transform your ideas into reality with our expert web development services. We create fast, secure, and scalable web applications using modern frameworks like React, Next.js, and Node.js.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Performance Optimization',
      'Responsive Design'
    ],
    color: 'from-blue-500 to-cyan-500',
    price: 'Starting at $2,999'
  },
  {
    id: 2,
    slug: 'mobile-app-development',
    icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps that users love',
    longDescription: 'Reach your audience wherever they are with stunning mobile applications. We develop iOS and Android apps that deliver exceptional user experiences and drive engagement.',
    features: [
      'iOS & Android Apps',
      'Cross-Platform Development',
      'App Store Deployment',
      'Push Notifications',
      'In-App Purchases',
      'Offline Functionality'
    ],
    color: 'from-purple-500 to-pink-500',
    price: 'Starting at $4,999'
  },
  {
    id: 3,
    slug: 'ui-ux-design',
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that convert visitors into customers',
    longDescription: 'Great design is invisible. Our UI/UX experts create interfaces that are not only beautiful but also intuitive and conversion-focused, ensuring your users have the best experience.',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems',
      'Responsive Design',
      'Usability Testing'
    ],
    color: 'from-orange-500 to-red-500',
    price: 'Starting at $1,999'
  },
  {
    id: 4,
    slug: 'cloud-solutions',
    icon: FiCloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure for modern applications',
    longDescription: 'Leverage the power of cloud computing to scale your business. We design and implement robust cloud solutions using AWS, Google Cloud, and Azure.',
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'Auto-scaling Solutions',
      'DevOps & CI/CD',
      'Cloud Security',
      'Cost Optimization'
    ],
    color: 'from-teal-500 to-green-500',
    price: 'Starting at $3,499'
  },
  {
    id: 5,
    slug: 'ecommerce-solutions',
    icon: FiShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions that drive sales',
    longDescription: 'Launch your online business with a powerful e-commerce platform. From product catalogs to payment processing, we build complete solutions that convert.',
    features: [
      'Custom Shopping Carts',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing',
      'Analytics & Reporting',
      'SEO Optimization'
    ],
    color: 'from-indigo-500 to-blue-500',
    price: 'Starting at $3,999'
  },
  {
    id: 6,
    slug: 'digital-marketing',
    icon: FiTrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven strategies to grow your online presence',
    longDescription: 'Reach more customers and grow your business with targeted digital marketing campaigns. We combine SEO, content marketing, and paid advertising for maximum ROI.',
    features: [
      'SEO & Content Strategy',
      'Social Media Marketing',
      'PPC Advertising',
      'Email Marketing',
      'Analytics & Reporting',
      'Conversion Optimization'
    ],
    color: 'from-yellow-500 to-orange-500',
    price: 'Starting at $1,499/mo'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business and accelerate growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-500 cursor-pointer">
                      {/* Gradient Header */}
                      <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                      
                      <div className="p-8">
                        {/* Icon */}
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 line-clamp-2">
                          {service.description}
                        </p>

                        {/* Features Preview */}
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                          <span className="text-lg font-bold text-gray-900">{service.price}</span>
                          <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                            Learn More
                            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Get Started
                </button>
              </Link>
              <Link href="/work">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105">
                  View Our Work
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
