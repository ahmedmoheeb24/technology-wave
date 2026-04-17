"use client"

export const runtime = 'edge';

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import {
  FiSettings, FiShield, FiTool, FiSearch, FiFileText, FiPackage
} from 'react-icons/fi'

const services = [
  {
    slug: 'technical-organization',
    icon: FiSettings,
    title: 'Technical Organization',
    description: 'Regulatory-acceptable departmental structure for Operators & MROs',
    features: [
      'Regulatory-acceptable org structure design',
      'Technical staffing & interview support',
      'Job Description development',
      'Gap Analysis against regulatory requirements',
    ],
    color: 'from-blue-600 to-sky-500',
  },
  {
    slug: 'aircraft-asset-advisory',
    icon: FiSearch,
    title: 'Aircraft & Asset Advisory',
    description: 'Pre-purchase, induction, ongoing oversight and redelivery support',
    features: [
      'Pre-purchase inspection & records review',
      'Maintenance exposure identification',
      'Annual inspection & condition reports',
      'Redelivery inspection & representation',
    ],
    color: 'from-slate-700 to-slate-500',
  },
  {
    slug: 'powerplant-apu-consultancy',
    icon: FiTool,
    title: 'Powerplant & APU Consultancy',
    description: 'Shop visit management, work scope preparation & warranty review',
    features: [
      'Work scope preparation',
      'Shop visit monitoring & oversight',
      'Invoice validation',
      'Borescope inspections',
    ],
    color: 'from-orange-600 to-amber-500',
  },
  {
    slug: 'camo-technical-records',
    icon: FiFileText,
    title: 'CAMO & Technical Records',
    description: 'CAMO support, LLP management & Back-to-Birth records review',
    features: [
      'CAMO support for engines & APUs',
      'Life Limited Parts (LLP) management',
      'Back-to-Birth (BTB) records review',
      'Airworthiness directive tracking',
    ],
    color: 'from-teal-600 to-green-500',
  },
  {
    slug: 'material-asset-support',
    icon: FiPackage,
    title: 'Material & Asset Support',
    description: 'Sourcing, technical evaluation & traceability for aviation components',
    features: [
      'Aircraft spares sourcing support',
      'Traceability documentation review',
      'Serviceability assessment',
      'AOG priority support',
    ],
    color: 'from-violet-600 to-purple-500',
  },
  {
    slug: 'maintenance-repair-overhaul',
    icon: FiShield,
    title: 'Maintenance, Repair & Overhaul',
    description: 'Component MRO management across all ATA chapters',
    features: [
      'Full ATA chapter coverage',
      'FAA & EASA Part 145 partner network',
      'Avionics & cockpit instrumentation',
      'Wheels, tires, brakes & LRUs',
    ],
    color: 'from-red-600 to-rose-500',
  },
]

export default function ServicesHomepage() {
  // Fixed: Removed TypeScript type annotation which causes build errors in .jsx files
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
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
            End-to-end structured Technical Organization, Powerplant management, CAMO &amp; Asset Advisory — supporting organizations through setup, expansion, audits, acquisitions, and ongoing operations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
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
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />

                {/* Card */}
                <Link href={`/services/${service.slug}`}>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full cursor-pointer">

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-5`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 text-sm">{service.description}</p>

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
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className={`w-full py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-bold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                      Learn More
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-tr-3xl rounded-bl-3xl transition-all duration-300 ${hoveredIndex === index ? 'scale-150' : 'scale-100'}`} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 mb-6">Need a tailored consultancy solution?</p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Let&apos;s Talk About Your Requirements
            </button>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  )
}