"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiShield, FiArrowLeft, FiCheck, FiClock, FiUsers, FiAward } from 'react-icons/fi'

const services = [
  {
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Keeping your fleet in the air',
    longDescription: 'Aventure is a fully accredited aviation parts supplier maintaining the highest industry standards. We have met the stringent requirements of the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying the FAA Advisory Circular 00-56B, ISO 9001:2015 and AS9120B quality standards. Our obsession with high standards have qualified us as an approved supplier to leading airlines, MRO facilities, and OEM authorized service centers worldwide.\n\nOur highly experienced team members offer AOG 7/24/365 service to our customers around the globe. They rely on our ability to provide solutions that ensure parts are delivered to the right location, at the right price, at the right time–allowing their aircraft to keep earning revenue.',
    sections: [
      {
        heading: 'Inventory Solutions',
        body: 'For customers seeking solutions for their surplus or excess inventory, we provide options based on current supply and demand conditions to help them decide if surplus consignment or outright sale makes the best economic sense. With Aventure Aviation, you have a trusted partner that provides informed options and expert advice to help you with key decisions.'
      },
      {
        heading: 'Narrow and Wide-Body Aircraft',
        body: 'Aventure provides parts support for narrow and wide-body aircraft to the world\'s airlines, aircraft owners and operators, corporate aviation, leasing firms, fixed base operators, and maintenance facilities. Our comprehensive parts support includes the Boeing 777, 767, 757, 737, and the Airbus 340, 330, 320, and 310.'
      },
      {
        heading: 'Regional and Corporate Aircraft',
        body: 'Aventure supports customers operating regional turbo-props and commuter twin jets. We specialize in supplying parts to airlines and operators of the Bombardier Dash 8 series turbo-prop and CRJ series twin jet. These customers are supported by our 24/7 technical support and customer service.'
      }
    ],
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
    technologies: ['Boeing 777', 'Boeing 767', 'Boeing 757', 'Boeing 737', 'Airbus A340', 'Airbus A330', 'Airbus A320', 'Airbus A310', 'Bombardier Dash 8', 'CRJ Series'],
    color: 'from-blue-600 to-sky-500',
    price: 'Custom Quote',
    timeline: 'Ongoing Partnership'
  },
  {
    slug: 'military-division',
    icon: FiShield,
    title: 'Military Division',
    description: 'Proud to serve those who serve',
    longDescription: 'Aventure Aviation has a proud heritage of service, dating from our founding in 2001. We started our military division in 2010, to provide parts and service support for the Lockheed Martin C-130 transport. We have since expanded our services to support fighter jets and other key aircraft, as we have grown into a world-class military aviation parts supplier.\n\nAventure offers military aircraft parts and MRO support to customers across the globe. We provide 24/7/365 personal contact support for AOG/MICAP grounding issues. We maintain substantial inventory levels of critical rotables and components, along with standard used components and consumables.',
    sections: [
      {
        heading: 'C-130 Transport',
        body: 'The Lockheed C-130 Hercules is a versatile four-engine turboprop military transport aircraft. Still in production after 60 years, the "Herc" offers unsurpassed versatility, performance and mission-effectiveness. It is the main tactical airlifter for military forces worldwide, serving more than 60 nations. Aventure provides consignment and inventory management for these aircraft using our worldwide network of C-130 operators, along with contract maintenance, repair, overhaul, and modification programs.'
      },
      {
        heading: 'F-16 Fighter',
        body: 'The F-16 Fighting Falcon is a single-engine multirole fighter aircraft originally developed by General Dynamics (now Lockheed Martin). More than 4,500 F-16s have been built since 1976. Due to the high demand of allied air forces in key regions, we have focused our parts supply services on the F-16A/C variants. We are planning to have a full distributorship with OEMs to support the F-16 A/C supply chain.'
      },
      {
        heading: 'T56 Engine',
        body: 'The Allison T56 is a single shaft, modular design military turboprop engine, originally developed for the Lockheed C-130 transport and now manufactured by Rolls-Royce. With more than 18,000 engines produced since 1954, Aventure provides complete parts supply and repair/overhaul management services for the T56.'
      }
    ],
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
    technologies: ['C-130 Hercules', 'F-16 Fighting Falcon', 'Boeing F-15', 'Boeing F-18', 'Northrop F-5', 'Sikorsky UH-60', 'Bell 212/412'],
    color: 'from-slate-700 to-slate-500',
    price: 'Custom Quote',
    timeline: 'Project-Based'
  },
  {
    slug: 'helicopters',
    icon: FiCloud,
    title: 'Helicopters',
    description: 'The parts you need where you need them',
    longDescription: 'Aventure Aviation provides rotary-wing aircraft spare parts and component repair and overhaul management to ensure mission readiness for both domestic and international operators. Our large variety of helicopter components includes hardware, airframe, engine, rotables, consumables, tools, and fasteners. We supply parts from all condition codes and can work on an exchange basis when appropriate.\n\nWe ensure customers get the parts needed where they are needed. When choosing Aventure for your helicopter support, you have access to our vast network of approved vendors and service providers who assist us in accomplishing all of your requirements.',
    sections: [],
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
    technologies: ['Bell 412', 'Sikorsky UH-60', 'Sikorsky S-70', 'Sikorsky S-92', 'Boeing CH-47', 'Leonardo AW139', 'Airbus H145'],
    color: 'from-emerald-600 to-teal-500',
    price: 'Custom Quote',
    timeline: 'Varies by Service'
  },
  {
    slug: 'maintenance-repair-overhaul',
    icon: FiCode,
    title: 'Maintenance, Repair and Overhaul',
    description: 'Component repair and overhaul',
    longDescription: 'Aventure covers the entire spectrum of ATA chapters in managing Maintenance, Repair and Overhaul (MRO) components through long-standing partnerships with reputable FAA 145 and EASA 145 approved repair stations. All shops we partner with have undergone Aventure\'s full inspection criteria and have established industry credentials.\n\nConsider us an extension of your organization that is dedicated to your reputation and success, and is always in tune with your customer\'s needs. We ensure quality workmanship, competitive turnaround times, and full warranty for components under our management.',
    sections: [],
    features: [
      'Hydraulic actuators, valves & landing gears',
      'Fuel pumps & engine accessories',
      'Auxiliary power units (APU)',
      'Propellers & related components',
      'Avionics & cockpit instrumentation',
      'Flight controls & structural parts',
      'Wheels, tires, brakes & brake pads',
      'Engine fan blades, vanes & QEC accessories',
      'Oxygen systems & safety equipment',
      'Line replaceable units (LRUs)'
    ],
    benefits: [
      'Minimize aircraft downtime',
      'Extend component and aircraft life',
      'Ensure regulatory compliance',
      'Reduce long-term maintenance costs'
    ],
    technologies: ['FAA 145 Approved Stations', 'EASA 145 Approved Stations', 'All ATA Chapters', 'Rotables', 'Expendables', 'Avionics'],
    color: 'from-orange-600 to-amber-500',
    price: 'Custom Quote',
    timeline: '2-12 weeks'
  },
  {
    slug: 'end-of-life-aircraft-solutions',
    icon: FiLayout,
    title: 'End-of-Life Aircraft Solutions',
    description: 'New revenue opportunity for retired or end-of-life aircraft',
    longDescription: 'Aventure provides owners the option to sell or consign their end-of-life or retired aircraft asset to us. We are experienced in all aspects of aircraft teardown. This includes identifying the acquisition, planning the disassembly, selecting the parts to harvest, project oversight, recycling the hull, refurbishing and storing parts, marketing, sales, and collecting the proceeds.\n\nWith a ready network of markets and customers with a high demand for parts, our asset management team can tailor a partnership program to meet the needs of owners, hedge fund managers, private equity funds, and institutional investors–and provide the best return on your retired asset.',
    sections: [],
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
    color: 'from-blue-600 to-sky-600',
    price: 'Custom Quote',
    timeline: '3-6 months'
  },
  {
    slug: 'tagged-parts-available',
    icon: FiShoppingCart,
    title: 'Tagged Parts Available',
    description: 'Material and Recycling',
    longDescription: 'Royal Aero maintains a large inventory of material across all engine types to satisfy customer demand. The material is acquired from the acquisition and teardown of whole engines to the piece part level or, as required, from our suppliers.\n\nRoyal Aero are proud to consider themselves a "recycling" company, helping the aviation industry get the most out of their sunset fleets, via the USM market, for as long as possible, avoiding the production of new material at the expense of the environment.',
    sections: [],
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto italic px-4">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{service.timeline}</h3>
              <p className="text-gray-600">Typical Timeline</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiUsers className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,500+</h3>
              <p className="text-gray-600">Global Clients</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiAward className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">99.8%</h3>
              <p className="text-gray-600">Safety Rating</p>
            </div>
          </motion.div>

          {/* Overview + Request Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              {service.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-gray-600 mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <div className="text-sm text-gray-500 mb-2">Investment</div>
                <div className="text-3xl font-bold text-gray-900 mb-6">{service.price}</div>
                <Link href="/contact">
                  <button className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105`}>
                    Request Quote
                  </button>
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">AOG 7/24/365 Support Available</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sub-sections (Inventory Solutions, C-130, etc.) */}
          {service.sections && service.sections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border-t-4" style={{ borderColor: 'transparent' }}
                    // Workaround: use inline gradient via a wrapper
                  >
                    <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${service.color} mb-4`}></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features & Benefits side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 shadow-md flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                      <FiCheck className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg leading-snug">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Aircraft & Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Aircraft & Equipment</h2>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
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