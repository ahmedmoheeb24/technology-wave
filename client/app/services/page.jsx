"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiShield } from 'react-icons/fi'

const services = [
  {
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Keeping your fleet in the air',
    longDescription: 'Technology Wave is a fully accredited aviation parts supplier maintaining the highest industry standards. We have met the stringent requirements of the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying the FAA Advisory Circular 00-56B, ISO 9001:2015 and AS9120B quality standards. Our obsession with high standards have qualified us as an approved supplier to leading airlines, MRO facilities, and OEM authorized service centers worldwide.\n\nOur highly experienced team members offer AOG 7/24/365 service to our customers around the globe. They rely on our ability to provide solutions that ensure parts are delivered to the right location, at the right price, at the right time–allowing their aircraft to keep earning revenue.',
    heroImage: '/Commercial Aviation 1.jfif',
    detailImage: '/Commercial Aviation 2.jfif',
    sections: [
      { heading: 'Inventory Solutions', body: 'For customers seeking solutions for their surplus or excess inventory, we provide options based on current supply and demand conditions to help them decide if surplus consignment or outright sale makes the best economic sense. With Technology Wave, you have a trusted partner that provides informed options and expert advice to help you with key decisions.' },
      { heading: 'Narrow and Wide-Body Aircraft', body: "Technology Wave provides parts support for narrow and wide-body aircraft to the world's airlines, aircraft owners and operators, corporate aviation, leasing firms, fixed base operators, and maintenance facilities. Our comprehensive parts support includes the Boeing 777, 767, 757, 737, and the Airbus 340, 330, 320, and 310." },
      { heading: 'Regional and Corporate Aircraft', body: 'Technology Wave supports customers operating regional turbo-props and commuter twin jets. We specialize in supplying parts to airlines and operators of the Bombardier Dash 8 series turbo-prop and CRJ series twin jet. These customers are supported by our 24/7 technical support and customer service.' }
    ],
    features: ['Fleet Management Solutions', 'Aircraft Leasing & Sales', 'Route Optimization', 'Fuel Management Systems', 'Passenger Safety Compliance', 'Operational Efficiency Consulting', 'Crew Training Programs', 'Regulatory Compliance Support'],
    benefits: ['Reduce operational costs by up to 25%', 'Maximize aircraft utilization and profitability', 'Ensure complete regulatory compliance', 'Access to global aviation expertise'],
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
    longDescription: 'Technology Wave has a proud heritage of service, dating from our founding in 2001. We started our military division in 2010, to provide parts and service support for the Lockheed Martin C-130 transport. We have since expanded our services to support fighter jets and other key aircraft, as we have grown into a world-class military aviation parts supplier.\n\nTechnology Wave offers military aircraft parts and MRO support to customers across the globe. We provide 24/7/365 personal contact support for AOG/MICAP grounding issues. We maintain substantial inventory levels of critical rotables and components, along with standard used components and consumables.',
    heroImage: '/Military Division 1.jfif',
    detailImage: '/Military Division 2.jfif',
    sections: [
      { heading: 'C-130 Transport', body: 'The Lockheed C-130 Hercules is a versatile four-engine turboprop military transport aircraft. Still in production after 60 years, the "Herc" offers unsurpassed versatility, performance and mission-effectiveness. Technology Wave provides consignment and inventory management for these aircraft using our worldwide network of C-130 operators, along with contract maintenance, repair, overhaul, and modification programs.' },
      { heading: 'F-16 Fighter', body: 'The F-16 Fighting Falcon is a single-engine multirole fighter aircraft originally developed by General Dynamics (now Lockheed Martin). More than 4,500 F-16s have been built since 1976. Due to the high demand of allied air forces in key regions, we have focused our parts supply services on the F-16A/C variants.' },
      { heading: 'T56 Engine', body: 'The Allison T56 is a single shaft, modular design military turboprop engine, originally developed for the Lockheed C-130 transport and now manufactured by Rolls-Royce. With more than 18,000 engines produced since 1954, Technology Wave provides complete parts supply and repair/overhaul management services for the T56.' }
    ],
    features: ['Military Aircraft Modifications', 'Defense Systems Integration', 'Tactical Aviation Support', 'Secure Communications', 'Mission Planning Systems', 'Training & Simulation', 'Special Mission Aircraft', 'Counter-Measure Systems'],
    benefits: ['Enhanced mission capability and effectiveness', 'State-of-the-art defense technology integration', 'Secure and reliable communication systems', 'Proven track record with military clients'],
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
    longDescription: 'Technology Wave provides rotary-wing aircraft spare parts and component repair and overhaul management to ensure mission readiness for both domestic and international operators. Our large variety of helicopter components includes hardware, airframe, engine, rotables, consumables, tools, and fasteners. We supply parts from all condition codes and can work on an exchange basis when appropriate.\n\nWe ensure customers get the parts needed where they are needed. When choosing Technology Wave for your helicopter support, you have access to our vast network of approved vendors and service providers who assist us in accomplishing all of your requirements.',
    heroImage: '/Helicopters 1.jfif',
    detailImage: '/Helicopters 2.jfif',
    sections: [],
    features: ['Helicopter Sales & Leasing', 'Maintenance Programs', 'Avionics Upgrades', 'Interior Refurbishment', 'Performance Enhancements', 'Emergency Services Support', 'VIP Configurations', 'EMS/Air Ambulance Solutions'],
    benefits: ['Extended service life and reliability', 'Customized configurations for specific missions', 'Comprehensive support programs', 'Expert technical assistance 24/7'],
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
    longDescription: "Technology Wave covers the entire spectrum of ATA chapters in managing Maintenance, Repair and Overhaul (MRO) components through long-standing partnerships with reputable FAA 145 and EASA 145 approved repair stations. All shops we partner with have undergone Technology Wave's full inspection criteria and have established industry credentials.\n\nConsider us an extension of your organization that is dedicated to your reputation and success, and is always in tune with your customer's needs. We ensure quality workmanship, competitive turnaround times, and full warranty for components under our management.",
    heroImage: '/Aircraft Maintenance 1.jfif',
    detailImage: '/Aircraft Maintenance 2.jfif',
    sections: [],
    features: ['Hydraulic actuators, valves & landing gears', 'Fuel pumps & engine accessories', 'Auxiliary power units (APU)', 'Propellers & related components', 'Avionics & cockpit instrumentation', 'Flight controls & structural parts', 'Wheels, tires, brakes & brake pads', 'Engine fan blades, vanes & QEC accessories', 'Oxygen systems & safety equipment', 'Line replaceable units (LRUs)'],
    benefits: ['Minimize aircraft downtime', 'Extend component and aircraft life', 'Ensure regulatory compliance', 'Reduce long-term maintenance costs'],
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
    longDescription: 'Technology Wave provides owners the option to sell or consign their end-of-life or retired aircraft asset to us. We are experienced in all aspects of aircraft teardown. This includes identifying the acquisition, planning the disassembly, selecting the parts to harvest, project oversight, recycling the hull, refurbishing and storing parts, marketing, sales, and collecting the proceeds.\n\nWith a ready network of markets and customers with a high demand for parts, our asset management team can tailor a partnership program to meet the needs of owners, hedge fund managers, private equity funds, and institutional investors–and provide the best return on your retired asset.',
    heroImage: '/Aircraft Solutions 1.jfif',
    detailImage: '/Aircraft Solutions 2.jfif',
    sections: [],
    features: ['Aircraft Dismantling', 'Parts Harvesting & Certification', 'Material Recycling', 'Environmental Compliance', 'Asset Value Recovery', 'Documentation Services', 'Hazardous Material Disposal', 'Scrap Metal Processing'],
    benefits: ['Maximize residual aircraft value', 'Environmentally responsible disposal', 'Full regulatory compliance', 'Revenue generation from parts and materials'],
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
    heroImage: '/Aircraft Parts 1.jfif',
    detailImage: '/Aircraft Parts 2.jfif',
    sections: [],
    features: ['Certified Parts Inventory', 'Full Traceability & Documentation', 'Quality Assurance', 'Fast Global Shipping', 'Competitive Pricing', 'Exchange Programs', 'AOG Priority Service', 'Warranty Support'],
    benefits: ['Reduce aircraft downtime with fast delivery', 'Save costs with competitive pricing', 'Ensure quality with certified parts', 'Access global inventory network'],
    technologies: ['Engines', 'Landing Gear', 'Avionics', 'APU', 'Hydraulics', 'Electrical Components'],
    color: 'from-red-600 to-rose-500',
    price: 'View Inventory',
    timeline: '24-72 hours delivery'
  }
]

export default function ServicesPage() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
            Comprehensive aviation solutions tailored to your operational needs
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
              className="relative group h-full"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>

              {/* Card */}
              <Link href={`/services/${service.slug}`} className="h-full flex">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col w-full h-full">
                  {/* Card Image */}
                  <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent`} />
                    <div className={`absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white text-xs font-bold`}>
                      {service.title}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto`}>
                      Learn More
                    </button>
                  </div>
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
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Let&apos;s Talk About Your Project
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}