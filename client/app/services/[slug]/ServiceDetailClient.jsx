"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiCode, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiShield, FiArrowLeft, FiCheck, FiClock, FiUsers, FiAward } from 'react-icons/fi'

// --- KEEP YOUR SERVICES ARRAY EXACTLY HERE ---
const services = [
  {
    slug: 'commercial-aviation',
    icon: FiTrendingUp,
    title: 'Commercial Aviation',
    description: 'Keeping your fleet in the air',
    longDescription: 'Technology Wave is a fully accredited aviation parts supplier maintaining the highest industry standards...',
    images: ['/Commercial Aviation 1.jfif', '/Commercial Aviation 2.jfif'],
    sections: [
        { heading: 'Inventory Solutions', body: 'For customers seeking solutions...' },
        { heading: 'Narrow and Wide-Body Aircraft', body: "Technology Wave provides parts support..." },
        { heading: 'Regional and Corporate Aircraft', body: 'Technology Wave supports customers...' }
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
    longDescription: 'Technology Wave has a proud heritage of service...',
    images: ['/Military Division 1.jfif', '/Military Division 2.jfif'],
    sections: [
        { heading: 'C-130 Transport', body: 'The Lockheed C-130 Hercules...' },
        { heading: 'F-16 Fighter', body: 'The F-16 Fighting Falcon...' },
        { heading: 'T56 Engine', body: 'The Allison T56 is a single shaft...' }
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
    longDescription: 'Technology Wave provides rotary-wing aircraft spare parts...',
    images: ['/Helicopters 1.jfif', '/Helicopters 2.jfif'],
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
    longDescription: "Technology Wave covers the entire spectrum of ATA chapters...",
    images: ['/Aircraft Maintenance 1.jfif', '/Aircraft Maintenance 2.jfif'],
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
    longDescription: 'Technology Wave provides owners the option to sell or consign...',
    images: ['/Aircraft Solutions 1.jfif', '/Aircraft Solutions 2.jfif'],
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
    longDescription: 'Royal Aero maintains a large inventory of material...',
    images: ['/Aircraft Parts 1.jfif', '/Aircraft Parts 2.jfif'],
    sections: [],
    features: ['Certified Parts Inventory', 'Full Traceability & Documentation', 'Quality Assurance', 'Fast Global Shipping', 'Competitive Pricing', 'Exchange Programs', 'AOG Priority Service', 'Warranty Support'],
    benefits: ['Reduce aircraft downtime with fast delivery', 'Save costs with competitive pricing', 'Ensure quality with certified parts', 'Access global inventory network'],
    technologies: ['Engines', 'Landing Gear', 'Avionics', 'APU', 'Hydraulics', 'Electrical Components'],
    color: 'from-red-600 to-rose-500',
    price: 'View Inventory',
    timeline: '24-72 hours delivery'
  }
];

export default function ServiceDetailPage({ params }) {
  // 1. Direct Slug Lookup (Safest for both Next 14 and 15)
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);

  // 2. Loading / Error States
  if (!slug) return <div className="min-h-screen bg-white" />;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-blue-600 hover:underline">← Back to Services</Link>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Image Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <Image
          src={encodeURI(service.images[0])}
          unoptimized
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link href="/services">
            <button className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-medium">
              <FiArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </Link>
        </div>

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
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Overview</h2>
                {service.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-base">{para}</p>
                ))}
              </div>

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
            </div>

            <div className="lg:col-span-1">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={encodeURI(service.images[1])}
                  unoptimized
                  alt={`${service.title} detail`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Specialties */}
          {service.sections && service.sections.length > 0 && (
            <div className="mb-14">
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
            </div>
          )}

          {/* Features / Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            <div>
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
            </div>

            <div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}