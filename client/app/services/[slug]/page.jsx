"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiShield, FiArrowLeft, FiCheck, FiClock, FiUsers, FiAward } from 'react-icons/fi'

const services = [
  {
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Comprehensive solutions for commercial aircraft operations and management',
    longDescription: 'We provide end-to-end solutions for commercial aviation, including fleet management, aircraft leasing, and operational support. Our expertise ensures maximum efficiency, safety, and profitability for commercial operators worldwide.',
    features: [
      'Fleet Management Solutions',
      'Aircraft Leasing & Sales',
      'Route Optimization',
      'Fuel Management Systems',
      'Passenger Safety Compliance',
      'Operational Efficiency Consulting',
      'Crew Training Programs',
      'Regulatory Compliance Support'
    ],
    benefits: [
      'Reduce operational costs by up to 25%',
      'Maximize aircraft utilization and profitability',
      'Ensure complete regulatory compliance',
      'Access to global aviation expertise'
    ],
    technologies: ['Boeing 737', 'Airbus A320', 'Boeing 787', 'Airbus A350', 'Regional Jets'],
    color: 'from-blue-600 to-sky-500',
    price: 'Custom Quote',
    timeline: 'Ongoing Partnership'
  },
  {
    slug: 'military-division',
    icon: FiShield,
    title: 'Military Division',
    description: 'Specialized aviation solutions for defense and military operations',
    longDescription: 'Our military division offers specialized services including aircraft modifications, defense systems integration, and tactical aviation support. We work with defense forces worldwide to enhance operational capabilities and mission effectiveness.',
    features: [
      'Military Aircraft Modifications',
      'Defense Systems Integration',
      'Tactical Aviation Support',
      'Secure Communications',
      'Mission Planning Systems',
      'Training & Simulation',
      'Special Mission Aircraft',
      'Counter-Measure Systems'
    ],
    benefits: [
      'Enhanced mission capability and effectiveness',
      'State-of-the-art defense technology integration',
      'Secure and reliable communication systems',
      'Proven track record with military clients'
    ],
    technologies: ['C-130 Hercules', 'F-16 Fighting Falcon', 'Black Hawk', 'Chinook', 'Military Transport'],
    color: 'from-slate-700 to-slate-500',
    price: 'Custom Quote',
    timeline: 'Project-Based'
  },
  {
    slug: 'helicopters',
    icon: FiCloud,
    title: 'Helicopters',
    description: 'Complete helicopter services from acquisition to maintenance',
    longDescription: 'Specialized in rotary-wing aircraft, we offer comprehensive helicopter services including sales, maintenance, modifications, and operational support. From medical helicopters to corporate transport, we handle all helicopter types with expertise.',
    features: [
      'Helicopter Sales & Leasing',
      'Maintenance Programs',
      'Avionics Upgrades',
      'Interior Refurbishment',
      'Performance Enhancements',
      'Emergency Services Support',
      'VIP Configurations',
      'EMS/Air Ambulance Solutions'
    ],
    benefits: [
      'Extended service life and reliability',
      'Customized configurations for specific missions',
      'Comprehensive support programs',
      'Expert technical assistance 24/7'
    ],
    technologies: ['Bell 407', 'Airbus H125', 'Sikorsky S-76', 'AgustaWestland AW139', 'Robinson R44'],
    color: 'from-emerald-600 to-teal-500',
    price: 'Custom Quote',
    timeline: 'Varies by Service'
  },
  {
    slug: 'maintenance-repair-overhaul',
    icon: FiCode,
    title: 'Maintenance, Repair and Overhaul',
    description: 'Expert MRO services to keep your aircraft in peak condition',
    longDescription: 'Our state-of-the-art MRO facilities provide comprehensive maintenance, repair, and overhaul services for all aircraft types. With certified technicians and advanced equipment, we ensure airworthiness, safety, and optimal performance for your fleet.',
    features: [
      'Scheduled Maintenance',
      'Major Repairs & Modifications',
      'Engine Overhaul',
      'Avionics Maintenance',
      'Structural Inspections',
      'AOG (Aircraft on Ground) Support',
      'Component Repair',
      'Non-Destructive Testing'
    ],
    benefits: [
      'Minimize aircraft downtime',
      'Extend component and aircraft life',
      'Ensure regulatory compliance',
      'Reduce long-term maintenance costs'
    ],
    technologies: ['CFM56 Engines', 'PW4000 Series', 'GE90 Series', 'Honeywell Avionics', 'Rockwell Collins'],
    color: 'from-orange-600 to-amber-500',
    price: 'Custom Quote',
    timeline: '2-12 weeks'
  },
  {
    slug: 'end-of-life-aircraft-solutions',
    icon: FiLayout,
    title: 'End-of-Life Aircraft Solutions',
    description: 'Sustainable aircraft retirement and recycling services',
    longDescription: 'We provide environmentally responsible end-of-life aircraft solutions including dismantling, parts harvesting, and material recycling. Our process maximizes asset value recovery while ensuring environmental compliance and sustainable practices.',
    features: [
      'Aircraft Dismantling',
      'Parts Harvesting & Certification',
      'Material Recycling',
      'Environmental Compliance',
      'Asset Value Recovery',
      'Documentation Services',
      'Hazardous Material Disposal',
      'Scrap Metal Processing'
    ],
    benefits: [
      'Maximize residual aircraft value',
      'Environmentally responsible disposal',
      'Full regulatory compliance',
      'Revenue generation from parts and materials'
    ],
    technologies: ['All Commercial Aircraft', 'Regional Aircraft', 'Business Jets', 'Cargo Aircraft'],
    color: 'from-purple-600 to-violet-500',
    price: 'Custom Quote',
    timeline: '3-6 months'
  },
  {
    slug: 'tagged-parts-available',
    icon: FiShoppingCart,
    title: 'Tagged Parts Available',
    description: 'Certified aircraft parts inventory with full traceability',
    longDescription: 'Access our extensive inventory of certified, tagged aircraft parts with complete documentation and traceability. We maintain thousands of parts in stock, all with proper certifications and ready for immediate delivery worldwide.',
    features: [
      'Certified Parts Inventory',
      'Full Traceability & Documentation',
      'Quality Assurance',
      'Fast Global Shipping',
      'Competitive Pricing',
      'Exchange Programs',
      'AOG Priority Service',
      'Warranty Support'
    ],
    benefits: [
      'Reduce aircraft downtime with fast delivery',
      'Save costs with competitive pricing',
      'Ensure quality with certified parts',
      'Access global inventory network'
    ],
    technologies: ['Engines', 'Landing Gear', 'Avionics', 'APU', 'Hydraulics', 'Electrical Components'],
    color: 'from-red-600 to-rose-500',
    price: 'View Inventory',
    timeline: '24-72 hours delivery'
  }
]

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params
  const service = services.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Services
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = service.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link href="/services">
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Services
          </button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${service.color} mb-6`}>
              <IconComponent className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiClock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{service.timeline}</h3>
              <p className="text-gray-600">Typical Timeline</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiUsers className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Global Clients</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiAward className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">99.8%</h3>
              <p className="text-gray-600">Safety Rating</p>
            </div>
          </motion.div>

          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {service.longDescription}
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm text-gray-500 mb-2">Investment</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">{service.price}</div>
                <Link href="/contact">
                  <button className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105`}>
                    Request Quote
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mr-4 mt-1`}>
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    <FiCheck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Aircraft/Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Aircraft & Equipment</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {service.technologies.map((tech, index) => (
                <div key={index} className="px-6 py-3 bg-white rounded-full shadow-lg text-gray-700 font-semibold">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 bg-gradient-to-r ${service.color}`}>
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
            <p className="text-xl text-white/90 mb-8">
              Contact us today to discuss your aviation needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Contact Us
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
                  View All Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
