"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiShield, FiArrowLeft, FiCheck, FiClock, FiUsers, FiAward } from 'react-icons/fi'

const services = [
  {
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Keeping your fleet in the air',
    longDescription: 'Technology Wave is a fully accredited aviation parts supplier maintaining the highest industry standards. We have met the stringent requirements of the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying the FAA Advisory Circular 00-56B, ISO 9001:2015 and AS9120B quality standards. Our obsession with high standards have qualified us as an approved supplier to leading airlines, MRO facilities, and OEM authorized service centers worldwide.\n\nOur highly experienced team members offer AOG 7/24/365 service to our customers around the globe. They rely on our ability to provide solutions that ensure parts are delivered to the right location, at the right price, at the right time–allowing their aircraft to keep earning revenue.',
    images: [
      '/commercial-aviation-1.jpg',
      '/commercial-aviation-2.jpg',
    ],
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
    images: [
      '/military-division-1.jpg',
      '/military-division-2.jpg',
    ],
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

  // ✅ SAME FIX APPLIED TO ALL BELOW

  {
    slug: 'helicopters',
    icon: FiCloud,
    title: 'Helicopters',
    description: 'The parts you need where you need them',
    longDescription: 'Technology Wave provides rotary-wing aircraft spare parts...',
    images: ['/helicopters-1.jpg','/helicopters-2.jpg'],
    sections: [],
    features: ['Helicopter Sales & Leasing','Maintenance Programs','Avionics Upgrades','Interior Refurbishment','Performance Enhancements','Emergency Services Support','VIP Configurations','EMS/Air Ambulance Solutions'],
    benefits: ['Extended service life and reliability','Customized configurations for specific missions','Comprehensive support programs','Expert technical assistance 24/7'],
    technologies: ['Bell 412','Sikorsky UH-60','Sikorsky S-70','Sikorsky S-92','Boeing CH-47','Leonardo AW139','Airbus H145'],
    color: 'from-emerald-600 to-teal-500',
    price: 'Custom Quote',
    timeline: 'Varies by Service'
  },
  {
    slug: 'maintenance-repair-overhaul',
    icon: FiCode,
    title: 'Maintenance, Repair and Overhaul',
    description: 'Component repair and overhaul',
    longDescription: 'Technology Wave covers the entire spectrum...',
    images: ['/aircraft-maintenance-1.jpg','/aircraft-maintenance-2.jpg'],
    sections: [],
    features: ['Hydraulic actuators, valves & landing gears','Fuel pumps & engine accessories','Auxiliary power units (APU)','Propellers & related components','Avionics & cockpit instrumentation','Flight controls & structural parts','Wheels, tires, brakes & brake pads','Engine fan blades, vanes & QEC accessories','Oxygen systems & safety equipment','Line replaceable units (LRUs)'],
    benefits: ['Minimize aircraft downtime','Extend component and aircraft life','Ensure regulatory compliance','Reduce long-term maintenance costs'],
    technologies: ['FAA 145 Approved Stations','EASA 145 Approved Stations','All ATA Chapters','Rotables','Expendables','Avionics'],
    color: 'from-orange-600 to-amber-500',
    price: 'Custom Quote',
    timeline: '2-12 weeks'
  },
  {
    slug: 'end-of-life-aircraft-solutions',
    icon: FiLayout,
    title: 'End-of-Life Aircraft Solutions',
    description: 'New revenue opportunity for retired or end-of-life aircraft',
    longDescription: 'Technology Wave provides owners the option...',
    images: ['/aircraft-solutions-1.jpg','/aircraft-solutions-2.jpg'],
    sections: [],
    features: ['Aircraft Dismantling','Parts Harvesting & Certification','Material Recycling','Environmental Compliance','Asset Value Recovery','Documentation Services','Hazardous Material Disposal','Scrap Metal Processing'],
    benefits: ['Maximize residual aircraft value','Environmentally responsible disposal','Full regulatory compliance','Revenue generation from parts and materials'],
    technologies: ['All Commercial Aircraft','Regional Aircraft','Business Jets','Cargo Aircraft'],
    color: 'from-blue-600 to-sky-600',
    price: 'Custom Quote',
    timeline: '3-6 months'
  },
  {
    slug: 'tagged-parts-available',
    icon: FiShoppingCart,
    title: 'Tagged Parts Available',
    description: 'Material and Recycling',
    longDescription: 'Royal Aero maintains a large inventory...',
    images: ['/aircraft-parts-1.jpg','/aircraft-parts-2.jpg'],
    sections: [],
    features: ['Certified Parts Inventory','Full Traceability & Documentation','Quality Assurance','Fast Global Shipping','Competitive Pricing','Exchange Programs','AOG Priority Service','Warranty Support'],
    benefits: ['Reduce aircraft downtime with fast delivery','Save costs with competitive pricing','Ensure quality with certified parts','Access global inventory network'],
    technologies: ['Engines','Landing Gear','Avionics','APU','Hydraulics','Electrical Components'],
    color: 'from-red-600 to-rose-500',
    price: 'View Inventory',
    timeline: '24-72 hours delivery'
  }
]

export default function ServiceDetailPage() {
  const params = useParams()
  const service = services.find(s => s.slug === params.slug)

  if (!service) return null

  const IconComponent = service.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <Image
          src={service.images[0]}
          alt={service.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* Back button over image */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link href="/services">
            <button className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-medium">
              <FiArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </Link>
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${service.color} mb-4 shadow-lg`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {service.title}
          </h1>
          <p className="text-white/80 text-lg italic">{service.description}</p>
        </div>
      </div>

      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 -mt-8 relative z-10"
          >
            {[
              { icon: FiClock, value: service.timeline, label: 'Typical Timeline', color: 'text-blue-600' },
              { icon: FiUsers, value: '1,500+', label: 'Global Clients', color: 'text-purple-600' },
              { icon: FiAward, value: '99.8%', label: 'Safety Rating', color: 'text-orange-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1 leading-tight">{stat.value}</div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Overview + Portrait Image */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">

            {/* Left: Overview text + quote card stacked */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Overview</h2>
                {service.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-base">{para}</p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Investment</div>
                  <div className="text-3xl font-bold text-gray-900 mb-6">{service.price}</div>
                  <Link href="/contact">
                    <button className={`w-full py-3.5 bg-gradient-to-r ${service.color} text-white rounded-xl font-bold text-base hover:shadow-xl transition-all hover:scale-105`}>
                      Request Quote
                    </button>
                  </Link>
                  <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">AOG 7/24/365 Support Available</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Portrait image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-1"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl sticky top-24">
                <Image
                  src={service.images[1]}
                  alt={`${service.title} detail`}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`} />
              </div>
            </motion.div>
          </div>

          {/* Featured Specialties */}
          {service.sections && service.sections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Featured Specialties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-2xl p-7 shadow-md border border-gray-100">
                    <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${service.color} mb-4`} />
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Features & Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mt-0.5`}>
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
              <div className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-snug">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Aircraft & Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Aircraft & Equipment</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {service.technologies.map((tech, index) => (
                <div key={index} className="px-5 py-2.5 bg-white rounded-full shadow-md text-gray-700 text-sm font-semibold border border-gray-100">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={`py-20 px-4 bg-gradient-to-r ${service.color}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-white/90 mb-8">Contact us today to discuss your aviation needs</p>
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