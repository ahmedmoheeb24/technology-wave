"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FiSettings, FiShield, FiTool, FiSearch, FiFileText, FiPackage
} from 'react-icons/fi'

const ASSET_URL = "https://api.technology-wave.com/uploads"

const services = [
  {
    slug: 'technical-organization',
    icon: FiSettings,
    title: 'Technical Organization',
    description: 'Regulatory-acceptable departmental structure for Operators & MROs',
    longDescription:
      'We design and derive regulatory-acceptable Technical Department organizational structures for Operators and MROs. We establish clear reporting lines, authority levels, and functional segregation — ensuring alignment with applicable Civil Aviation Authority approval requirements.\n\nOur scope covers initial setup, restructuring, expansion projects, talent acquisition support, job role definition, technical documentation compliance mentoring, audits, KPI frameworks, decision-making matrices, and gap analysis for organizational approval readiness.',
    heroImage: `${ASSET_URL}/commercial-aviation-1.jfif`,
    detailImage: `${ASSET_URL}/commercial-aviation-2.jfif`,
    sections: [
      {
        heading: 'Organizational Design',
        body: 'Design and derive a regulatory-acceptable Technical Department organizational structure for Operators and MROs. Establish clear reporting lines, authority levels, and functional segregation, ensuring alignment with applicable Civil Aviation Authority approval requirements.'
      },
      {
        heading: 'Talent Acquisition & Staffing',
        body: 'Assist management in defining technical staffing requirements, participate in technical interviews and candidate evaluations, validate competency and regulatory knowledge, and support selection of engineering personnel aligned with organizational objectives.'
      },
      {
        heading: 'Gap Analysis & Approval Readiness',
        body: 'Perform gap analysis against applicable regulatory requirements. Assess readiness for initial organization approval, scope expansion, and regulatory audits. Deliver structured findings, risk assessments, and corrective action recommendations.'
      }
    ],
    features: [
      'Regulatory-acceptable org structure design',
      'Technical staffing & interview support',
      'Job Description development',
      'Organizational Manual & CAME/MOE review',
      'Audits, performance reviews & KPIs',
      'Decision-Making Matrix / Decision Grid',
      'Gap Analysis against regulatory requirements',
      'Approval readiness assessment'
    ],
    benefits: [
      'Achieve and maintain CAA organizational approval',
      'Clear accountability across all technical functions',
      'Reduce audit findings and regulatory risk',
      'Build a high-performing technical team'
    ],
    technologies: ['ICAO', 'EASA', 'FAA', 'GCAA', 'GACA', 'CAME', 'MOE', 'CAA Frameworks'],
    color: 'from-blue-600 to-sky-500',
    price: 'Custom Quote',
    timeline: 'Project-Based'
  },
  {
    slug: 'aircraft-asset-advisory',
    icon: FiSearch,
    title: 'Aircraft & Asset Advisory',
    description: 'Pre-purchase, induction, ongoing oversight and redelivery support',
    longDescription:
      'Technology Wave provides comprehensive aircraft and asset advisory services to operators, lessors, investors, and hedge fund managers. Our experienced team supports every stage of the aircraft lifecycle — from pre-purchase technical evaluation through ongoing annual oversight to redelivery representation.\n\nWe deliver independent, results-driven assessments that identify technical risks, quantify maintenance exposure, and protect asset value.',
    heroImage: `${ASSET_URL}/aircraft-solutions-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-solutions-2.jfif`,
    sections: [
      {
        heading: 'Pre-Purchase & Acquisition Support',
        body: 'Review of aircraft specifications and maintenance status, physical inspection of aircraft and records, and identification of technical risks, deferred defects, and maintenance exposure before commitment.'
      },
      {
        heading: 'Aircraft Induction & Delivery Support',
        body: 'Representation at newly manufactured aircraft deliveries, support for induction of additional aircraft into fleets, and follow-up and closure of open delivery technical issues.'
      },
      {
        heading: 'Aircraft Redelivery Services',
        body: 'Redelivery inspections and onsite representation, identification, documentation, and negotiation support for technical findings to protect your financial interests at lease end.'
      }
    ],
    features: [
      'Pre-purchase inspection & records review',
      'Maintenance exposure identification',
      'New delivery representation',
      'Fleet induction support',
      'Annual inspection & condition reports',
      'Redelivery inspection & representation',
      'Technical findings documentation',
      'Negotiation support for technical items'
    ],
    benefits: [
      'Protect asset value at every lifecycle stage',
      'Identify technical risks before acquisition',
      'Ensure regulatory compliance at delivery',
      'Independent representation at redelivery'
    ],
    technologies: ['All Commercial Aircraft', 'Regional Aircraft', 'Business Jets', 'Turboprops'],
    color: 'from-slate-700 to-slate-500',
    price: 'Custom Quote',
    timeline: 'Per Assignment'
  },
  {
    slug: 'powerplant-apu-consultancy',
    icon: FiTool,
    title: 'Powerplant & APU Consultancy',
    description: 'Shop visit management, work scope preparation & warranty review',
    longDescription:
      'Technology Wave provides specialist Powerplant and APU consultancy services, covering work scope preparation, shop visit monitoring, invoice validation, and warranty review. With deep expertise across major engine families and APU types, we ensure your maintenance spend is optimized and your assets return from shop in airworthy, contractually compliant condition.\n\nWe support operators through every aspect of the power plant MRO process — from initial planning through shop visit closure.',
    heroImage: `${ASSET_URL}/aircraft-maintenance-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-maintenance-2.jfif`,
    sections: [
      {
        heading: 'Engine Support',
        body: 'Specialist support for GE CF6-50 / CF6-80, CFM56-3 / CFM56-5, PW4000, and PW100 Series engines. Work scope preparation, shop visit monitoring, invoice validation, and warranty review services.'
      },
      {
        heading: 'APU Support',
        body: 'Comprehensive APU consultancy for Honeywell APU GTCP131-9, Honeywell GTCP331-250 / GTCP331-500, and Hamilton Sundstrand APU APS3200 units.'
      },
      {
        heading: 'Borescope Inspections',
        body: 'Borescope inspections of engines and APUs with technical assessment of findings and actionable recommendations — enabling informed decisions on maintenance and continued airworthiness.'
      }
    ],
    features: [
      'Work scope preparation',
      'Shop visit monitoring & oversight',
      'Invoice validation',
      'Warranty review & claims support',
      'Borescope inspections',
      'Technical assessment of findings',
      'GE CF6-50/80 support',
      'CFM56-3/5, PW4000, PW100 support'
    ],
    benefits: [
      'Optimise maintenance spend and reduce overruns',
      'Ensure work scope aligns with contractual requirements',
      'Independent validation of shop invoices',
      'Maximize warranty recovery'
    ],
    technologies: [
      'GE CF6-50', 'GE CF6-80', 'CFM56-3', 'CFM56-5',
      'PW4000', 'PW100 Series',
      'Honeywell GTCP131-9', 'Honeywell GTCP331-250/500',
      'Hamilton Sundstrand APS3200'
    ],
    color: 'from-orange-600 to-amber-500',
    price: 'Custom Quote',
    timeline: 'Per Assignment'
  },
  {
    slug: 'camo-technical-records',
    icon: FiFileText,
    title: 'CAMO & Technical Records',
    description: 'CAMO support, LLP management & Back-to-Birth records review',
    longDescription:
      'Technology Wave provides specialist Continuing Airworthiness Management Organization (CAMO) support services for engines and APUs, along with comprehensive technical records verification. Our experienced team ensures that Life Limited Parts are correctly tracked and that Back-to-Birth traceability is established and maintained in accordance with regulatory requirements.\n\nAccurate technical records are critical to asset value, regulatory compliance, and safe continued operations.',
    heroImage: `${ASSET_URL}/aircraft-parts-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-parts-2.jfif`,
    sections: [
      {
        heading: 'CAMO Support',
        body: 'CAMO support services for engines and APUs, ensuring continued airworthiness management is performed in accordance with applicable authority requirements and maintenance program obligations.'
      },
      {
        heading: 'Life Limited Parts Management',
        body: 'Precise tracking and management of Life Limited Parts (LLPs) across engines, APUs, and airframe components — protecting operators from inadvertent LLP exceedance and supporting accurate residual value calculations.'
      },
      {
        heading: 'Back-to-Birth Records Review',
        body: 'Comprehensive Back-to-Birth (BTB) records review and technical records verification services, critical for aircraft transactions, lease returns, and regulatory compliance audits.'
      }
    ],
    features: [
      'CAMO support for engines & APUs',
      'Technical records verification',
      'Life Limited Parts (LLP) management',
      'Back-to-Birth (BTB) records review',
      'Maintenance program compliance review',
      'Airworthiness directive tracking',
      'Records audit for transactions',
      'Regulatory compliance support'
    ],
    benefits: [
      'Ensure regulatory compliance in records management',
      'Protect asset value with complete traceability',
      'Avoid LLP exceedance risks',
      'Support transactions with verified documentation'
    ],
    technologies: ['EASA Part-M', 'FAA FAR Part 43/91', 'GCAA', 'GACA', 'All Major Engine Types'],
    color: 'from-teal-600 to-green-500',
    price: 'Custom Quote',
    timeline: 'Ongoing or Per Project'
  },
  {
    slug: 'material-asset-support',
    icon: FiPackage,
    title: 'Material & Asset Support',
    description: 'Sourcing, technical evaluation & traceability for aviation components',
    longDescription:
      'Technology Wave provides material and asset support services, covering the sourcing and technical evaluation of aircraft spares, components, engines, APUs, and landing gears. We support operators and lessors on traceability, serviceability, and regulatory acceptability — ensuring that every part meets the standards required for safe and compliant use.\n\nWith deep technical expertise and a strong vendor network, we provide independent evaluation that protects your operations and investments.',
    heroImage: `${ASSET_URL}/aircraft-parts-2.jfif`,
    detailImage: `${ASSET_URL}/commercial-aviation-2.jfif`,
    sections: [
      {
        heading: 'Sourcing & Procurement Support',
        body: 'Technical support for sourcing aircraft spares, components, engines, APUs, and landing gears. Independent evaluation ensures parts meet regulatory acceptability and serviceability requirements.'
      },
      {
        heading: 'Traceability & Serviceability',
        body: 'Detailed review of part documentation, traceability records, and serviceability status to confirm regulatory acceptability prior to installation or acceptance.'
      },
      {
        heading: 'AOG & Critical Requirements',
        body: 'Priority support for AOG and critical material requirements, leveraging our network and technical expertise to identify and validate solutions quickly.'
      }
    ],
    features: [
      'Aircraft spares sourcing support',
      'Engine & APU component evaluation',
      'Landing gear sourcing support',
      'Traceability documentation review',
      'Serviceability assessment',
      'Regulatory acceptability verification',
      'AOG priority support',
      'Vendor evaluation assistance'
    ],
    benefits: [
      'Ensure only compliant parts enter your fleet',
      'Reduce risk of counterfeit or unserviceable parts',
      'Independent technical evaluation',
      'Support AOG resolution with confidence'
    ],
    technologies: ['Aircraft Spares', 'Engines', 'APUs', 'Landing Gears', 'Rotables', 'Expendables'],
    color: 'from-violet-600 to-purple-500',
    price: 'Custom Quote',
    timeline: '24-72 hours AOG support'
  },
  {
    slug: 'maintenance-repair-overhaul',
    icon: FiShield,
    title: 'Maintenance, Repair & Overhaul',
    description: 'Component MRO management across all ATA chapters',
    longDescription:
      'Technology Wave covers the entire spectrum of ATA chapters in managing Maintenance, Repair and Overhaul (MRO) components through long-standing partnerships with reputable FAA Part 145 and EASA Part 145 approved repair stations. All shops we partner with have undergone our full inspection criteria and have established industry credentials.\n\nConsider us an extension of your organization — dedicated to your reputation and success, always in tune with your requirements. We ensure quality workmanship, competitive turnaround times, and full warranty for components under our management.',
    heroImage: `${ASSET_URL}/aircraft-maintenance-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-maintenance-2.jfif`,
    sections: [
      {
        heading: 'Full ATA Chapter Coverage',
        body: 'Hydraulic actuators, valves & landing gears; fuel pumps & engine accessories; APUs; propellers; avionics & cockpit instrumentation; flight controls; wheels, tires, brakes; engine fan blades & QEC accessories; oxygen systems; and all LRUs.'
      },
      {
        heading: 'Approved Repair Station Network',
        body: 'All MRO partners are FAA Part 145 and EASA Part 145 approved, and have undergone Technology Wave\'s full inspection and vetting criteria. Quality workmanship, competitive turnaround times, and full warranty are standard.'
      },
      {
        heading: 'Repair Management as a Service',
        body: 'We act as an extension of your organization — managing the entire repair cycle from induction through return to service, tracking status, validating invoices, and ensuring compliance at every step.'
      }
    ],
    features: [
      'Hydraulic actuators, valves & landing gears',
      'Fuel pumps & engine accessories',
      'Auxiliary Power Units (APU)',
      'Avionics & cockpit instrumentation',
      'Flight controls & structural parts',
      'Wheels, tires, brakes & brake pads',
      'Engine fan blades, vanes & QEC accessories',
      'Oxygen systems & Line Replaceable Units (LRUs)'
    ],
    benefits: [
      'Minimize aircraft downtime with competitive TATs',
      'Ensure regulatory compliance at every step',
      'Full warranty on managed components',
      'Reduce long-term MRO management overhead'
    ],
    technologies: ['FAA Part 145', 'EASA Part 145', 'All ATA Chapters', 'Rotables', 'Expendables', 'Avionics'],
    color: 'from-red-600 to-rose-500',
    price: 'Custom Quote',
    timeline: '2-12 weeks'
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
                className="relative group h-full"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>

                {/* Card */}
                <Link href={`/services/${service.slug}`} className="h-full flex">
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col w-full h-full">
                    {/* Card Image */}
                    <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className={`absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white text-xs font-bold`}>
                        {service.title}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6 text-sm">{service.description}</p>
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
    </section>
  )
}

export { services }