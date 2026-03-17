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
    subheading: 'Keeping your fleet in the air',
    description: 'Fully accredited aviation parts supplier with ASA-100, ISO 9001:2015 and AS9120B certifications. AOG 7/24/365 service ensuring parts are delivered to the right location, at the right price, at the right time.',
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
    subheading: 'Proud to serve those who serve',
    description: 'Specialized military aviation parts and MRO support since 2010. 24/7/365 AOG/MICAP grounding support with an approved supplier network qualified to ASA-100 and AS9100 standards.',
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
    subheading: 'The parts you need where you need them',
    description: 'Rotary-wing aircraft spare parts and component repair management for domestic and international operators. Hardware, airframe, engine, rotables, consumables, tools, and fasteners — all condition codes.',
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
    subheading: 'Component repair and overhaul',
    description: 'Full ATA chapter coverage through FAA 145 and EASA 145 approved repair stations. Quality workmanship, competitive turnaround times, and full warranty on all managed components.',
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
    subheading: 'New revenue opportunity for retired or end-of-life aircraft',
    description: 'Full-service aircraft teardown from acquisition planning to hull recycling. We tailor partnership programs for owners, hedge fund managers, private equity funds, and institutional investors.',
    features: [
      'Aircraft Dismantling',
      'Parts Harvesting & Certification',
      'Material Recycling',
      'Environmental Compliance',
      'Asset Value Recovery',
      'Documentation Services'
    ],
    color: 'from-blue-600 to-sky-600',
    price: 'Custom Quote'
  },
  {
    id: 6,
    slug: 'tagged-parts-available',
    icon: FiShoppingCart,
    title: 'Tagged Parts Available',
    subheading: 'Material and Recycling',
    description: 'Large inventory across all engine types, acquired through whole engine teardowns to piece part level. Helping the aviation industry maximize sunset fleets via the USM market — sustainably.',
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              World-class aviation solutions — from commercial fleet support to military operations, MRO, and sustainable end-of-life programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
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
                    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer flex flex-col">
                      {/* Gradient top bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${service.color}`}></div>

                      <div className="p-8 flex flex-col flex-1">
                        {/* Icon */}
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-5 group-hover:scale-110 transition-transform duration-300 self-start`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>

                        {/* Subheading */}
                        <p className="text-sm font-semibold text-gray-400 italic mb-4">
                          {service.subheading}
                        </p>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                          {service.description}
                        </p>

                        {/* Features Preview */}
                        <ul className="space-y-2 mb-6 flex-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                          <span className="text-base font-bold text-gray-900">{service.price}</span>
                          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-sky-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us today to discuss your aviation requirements
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Get Started
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105">
                  About Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}