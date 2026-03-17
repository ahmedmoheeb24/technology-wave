"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiArrowRight, FiCheck, FiShield } from 'react-icons/fi'

const services = [
  {
    id: 1,
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Comprehensive solutions for commercial aircraft operations and management',
    longDescription: 'We provide end-to-end solutions for commercial aviation, including fleet management, aircraft leasing, and operational support to ensure maximum efficiency and safety.',
    features: [
      'Fleet Management Solutions',
      'Aircraft Leasing & Sales',
      'Route Optimization',
      'Fuel Management Systems',
      'Passenger Safety Compliance',
      'Operational Efficiency Consulting'
    ],
    color: 'from-blue-600 to-sky-500',
    price: 'Custom Quote'
  },
  {
    id: 2,
    slug: 'military-division',
    icon: FiShield,
    title: 'Military Division',
    description: 'Specialized aviation solutions for defense and military operations',
    longDescription: 'Our military division offers specialized services including aircraft modifications, defense systems integration, and tactical aviation support for military applications.',
    features: [
      'Military Aircraft Modifications',
      'Defense Systems Integration',
      'Tactical Aviation Support',
      'Secure Communications',
      'Mission Planning Systems',
      'Training & Simulation'
    ],
    color: 'from-slate-700 to-slate-500',
    price: 'Custom Quote'
  },
  {
    id: 3,
    slug: 'helicopters',
    icon: FiCloud,
    title: 'Helicopters',
    description: 'Complete helicopter services from acquisition to maintenance',
    longDescription: 'Specialized in rotary-wing aircraft, we offer comprehensive helicopter services including sales, maintenance, modifications, and operational support for all helicopter types.',
    features: [
      'Helicopter Sales & Leasing',
      'Maintenance Programs',
      'Avionics Upgrades',
      'Interior Refurbishment',
      'Performance Enhancements',
      'Emergency Services Support'
    ],
    color: 'from-emerald-600 to-teal-500',
    price: 'Custom Quote'
  },
  {
    id: 4,
    slug: 'maintenance-repair-overhaul',
    icon: FiCode,
    title: 'Maintenance, Repair and Overhaul',
    description: 'Expert MRO services to keep your aircraft in peak condition',
    longDescription: 'Our state-of-the-art MRO facilities provide comprehensive maintenance, repair, and overhaul services for all aircraft types, ensuring airworthiness and optimal performance.',
    features: [
      'Scheduled Maintenance',
      'Major Repairs & Modifications',
      'Engine Overhaul',
      'Avionics Maintenance',
      'Structural Inspections',
      'AOG (Aircraft on Ground) Support'
    ],
    color: 'from-orange-600 to-amber-500',
    price: 'Custom Quote'
  },
  {
    id: 5,
    slug: 'end-of-life-aircraft-solutions',
    icon: FiLayout,
    title: 'End-of-Life Aircraft Solutions',
    description: 'Sustainable aircraft retirement and recycling services',
    longDescription: 'We provide environmentally responsible end-of-life aircraft solutions including dismantling, parts harvesting, and material recycling to maximize asset value.',
    features: [
      'Aircraft Dismantling',
      'Parts Harvesting & Certification',
      'Material Recycling',
      'Environmental Compliance',
      'Asset Value Recovery',
      'Documentation Services'
    ],
    color: 'from-purple-600 to-violet-500',
    price: 'Custom Quote'
  },
  {
    id: 6,
    slug: 'tagged-parts-available',
    icon: FiShoppingCart,
    title: 'Tagged Parts Available',
    description: 'Certified aircraft parts inventory with full traceability',
    longDescription: 'Access our extensive inventory of certified, tagged aircraft parts with complete documentation and traceability. Quality parts at competitive prices with fast delivery.',
    features: [
      'Certified Parts Inventory',
      'Full Traceability & Documentation',
      'Quality Assurance',
      'Fast Global Shipping',
      'Competitive Pricing',
      'Exchange Programs'
    ],
    color: 'from-red-600 to-rose-500',
    price: 'View Inventory'
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
