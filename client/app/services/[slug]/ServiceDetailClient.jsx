"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiCheckCircle, FiClock, FiTag, FiChevronRight } from 'react-icons/fi'

// ── DATA ─────────────────────────────────────────────────────────────────────
// Keep this in sync with services/page.jsx (or extract to a shared data file)
const ASSET_URL = "https://api.technology-wave.com/uploads"

const services = [
  {
    slug: 'technical-organization',
    title: 'Technical Organization',
    description: 'Regulatory-acceptable departmental structure for Operators & MROs',
    longDescription:
      'We design and derive regulatory-acceptable Technical Department organizational structures for Operators and MROs. We establish clear reporting lines, authority levels, and functional segregation — ensuring alignment with applicable Civil Aviation Authority approval requirements.\n\nOur scope covers initial setup, restructuring, expansion projects, talent acquisition support, job role definition, technical documentation compliance mentoring, audits, KPI frameworks, decision-making matrices, and gap analysis for organizational approval readiness.',
    heroImage: `${ASSET_URL}/commercial-aviation-1.jfif`,
    detailImage: `${ASSET_URL}/commercial-aviation-2.jfif`,
    sections: [
      {
        heading: 'Organizational Design',
        body: 'Design and derive a regulatory-acceptable Technical Department organizational structure for Operators and MROs. Establish clear reporting lines, authority levels, and functional segregation, ensuring alignment with applicable Civil Aviation Authority approval requirements. Support initial setup, restructuring, or organizational expansion projects.'
      },
      {
        heading: 'Talent Acquisition & Staffing',
        body: 'Assist management in defining technical staffing requirements, participate in technical interviews and candidate evaluations, validate competency and regulatory knowledge, and support selection of engineering personnel aligned with organizational objectives.'
      },
      {
        heading: 'Job Role Definition & Responsibilities',
        body: 'Guide technical teams on key assignments and deliverables for each role. Develop or refine Job Descriptions (JDs) aligned with regulatory expectations. Ensure clarity of accountability across Engineering, CAMO, Power Plant, and Material functions.'
      },
      {
        heading: 'Technical Documentation & Compliance Mentoring',
        body: 'Review and guide compliance of technical documentation including Organizational Manuals, Continuing Airworthiness Management Exposition (CAME), Maintenance Organization Exposition (MOE), and Maintenance & Support Contracts for Aircraft, Power Plant, APUs & Landing Gears.'
      },
      {
        heading: 'Audits, Performance Reviews & KPIs',
        body: 'Audit existing procedures and workflows within the Technical Organization. Assist management in performance reviews of technical personnel. Define and recommend Key Performance Indicators (KPIs). Identify improvement areas and support continuous improvement initiatives.'
      },
      {
        heading: 'Gap Analysis & Approval Readiness',
        body: 'Perform Gap Analysis against applicable regulatory requirements. Assess readiness for initial Organization Approval, Scope Expansion, and Regulatory Audits. Deliver structured findings, risk assessments, and corrective action recommendations.'
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
    bgAccent: 'bg-blue-600',
    price: 'Custom Quote',
    timeline: 'Project-Based'
  },
  {
    slug: 'aircraft-asset-advisory',
    title: 'Aircraft & Asset Advisory',
    description: 'Pre-purchase, induction, ongoing oversight and redelivery support',
    longDescription:
      'Technology Wave provides comprehensive aircraft and asset advisory services to operators, lessors, investors, and hedge fund managers. Our experienced team supports every stage of the aircraft lifecycle — from pre-purchase technical evaluation through ongoing annual oversight to redelivery representation.\n\nWe deliver independent, results-driven assessments that identify technical risks, quantify maintenance exposure, and protect asset value at every stage.',
    heroImage: `${ASSET_URL}/aircraft-solutions-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-solutions-2.jfif`,
    sections: [
      {
        heading: 'Pre-Purchase & Acquisition Support',
        body: 'Review of aircraft specifications and maintenance status. Physical inspection of aircraft and records. Identification of technical risks, deferred defects, and maintenance exposure before financial commitment is made.'
      },
      {
        heading: 'Aircraft Induction & Delivery Support',
        body: 'Representation at newly manufactured aircraft deliveries. Support the induction of additional aircraft into fleets. Follow-up and closure of open delivery technical issues to ensure the aircraft enters service in full contractual compliance.'
      },
      {
        heading: 'Ongoing Asset Oversight',
        body: 'Annual inspection of aircraft and records. Preparation of technical audit and condition reports that keep owners and lessors fully informed of the asset\'s technical status and any emerging maintenance risks.'
      },
      {
        heading: 'Aircraft Redelivery Services',
        body: 'Redelivery inspections and onsite representation. Identification, documentation, and negotiation support for technical findings — protecting your financial interests at lease end and ensuring the aircraft is returned in the agreed contractual condition.'
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
    bgAccent: 'bg-slate-700',
    price: 'Custom Quote',
    timeline: 'Per Assignment'
  },
  {
    slug: 'powerplant-apu-consultancy',
    title: 'Powerplant & APU Consultancy',
    description: 'Shop visit management, work scope preparation & warranty review',
    longDescription:
      'Technology Wave provides specialist Powerplant and APU consultancy services, covering work scope preparation, shop visit monitoring, invoice validation, and warranty review. With deep expertise across major engine families and APU types, we ensure your maintenance spend is optimized and your assets return from shop in airworthy, contractually compliant condition.\n\nWe support operators through every aspect of the power plant MRO process — from initial planning through shop visit closure and borescope assessment.',
    heroImage: `${ASSET_URL}/aircraft-maintenance-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-maintenance-2.jfif`,
    sections: [
      {
        heading: 'Work Scope Preparation',
        body: 'Develop detailed engine and APU shop visit work scopes aligned with maintenance program requirements, life limits, and contractual obligations — ensuring the shop performs required work while avoiding unnecessary costs.'
      },
      {
        heading: 'Shop Visit Monitoring',
        body: 'Active monitoring of engine and APU shop visits to track technical findings, assess emerging work scope changes, and protect your interests throughout the repair process.'
      },
      {
        heading: 'Invoice Validation & Warranty Review',
        body: 'Independent validation of shop invoices against agreed work scopes and contractual terms. Warranty review and claims support to maximize your recovery on eligible maintenance costs.'
      },
      {
        heading: 'Borescope Inspections',
        body: 'Borescope inspections of engines and APUs with detailed technical assessment of findings and actionable recommendations — enabling informed decisions on maintenance and continued airworthiness planning.'
      }
    ],
    features: [
      'Work scope preparation',
      'Shop visit monitoring & oversight',
      'Invoice validation',
      'Warranty review & claims support',
      'Borescope inspections',
      'Technical assessment of findings',
      'GE CF6-50/80 specialist support',
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
      'Honeywell GTCP131-9', 'GTCP331-250/500',
      'Hamilton Sundstrand APS3200'
    ],
    color: 'from-orange-600 to-amber-500',
    bgAccent: 'bg-orange-600',
    price: 'Custom Quote',
    timeline: 'Per Assignment'
  },
  {
    slug: 'camo-technical-records',
    title: 'CAMO & Technical Records',
    description: 'CAMO support, LLP management & Back-to-Birth records review',
    longDescription:
      'Technology Wave provides specialist Continuing Airworthiness Management Organization (CAMO) support services for engines and APUs, along with comprehensive technical records verification. Our experienced team ensures that Life Limited Parts are correctly tracked and that Back-to-Birth traceability is established and maintained in accordance with regulatory requirements.\n\nAccurate technical records are critical to asset value, regulatory compliance, and safe continued operations — and are increasingly scrutinized in aircraft transactions.',
    heroImage: `${ASSET_URL}/aircraft-parts-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-parts-2.jfif`,
    sections: [
      {
        heading: 'CAMO Support for Engines & APUs',
        body: 'CAMO support services ensuring continued airworthiness management is performed in accordance with applicable authority requirements and maintenance program obligations for engines and APUs.'
      },
      {
        heading: 'Technical Records Verification',
        body: 'Detailed review and verification of technical records to confirm accuracy, completeness, and regulatory compliance — supporting aircraft transactions, lease returns, and authority audits.'
      },
      {
        heading: 'Life Limited Parts Management',
        body: 'Precise tracking and management of Life Limited Parts (LLPs) across engines, APUs, and airframe components — protecting operators from inadvertent LLP exceedance and supporting accurate residual value calculations.'
      },
      {
        heading: 'Back-to-Birth Records Review',
        body: 'Comprehensive Back-to-Birth (BTB) records review establishing full traceability for life-limited and critical components — essential for aircraft acquisitions, sales, and regulatory compliance demonstrations.'
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
    bgAccent: 'bg-teal-600',
    price: 'Custom Quote',
    timeline: 'Ongoing or Per Project'
  },
  {
    slug: 'material-asset-support',
    title: 'Material & Asset Support',
    description: 'Sourcing, technical evaluation & traceability for aviation components',
    longDescription:
      'Technology Wave provides material and asset support services covering the sourcing and technical evaluation of aircraft spares, components, engines, APUs, and landing gears. We support operators and lessors on traceability, serviceability, and regulatory acceptability — ensuring that every part meets the standards required for safe and compliant use.\n\nWith deep technical expertise and a strong vendor network, we provide independent evaluation that protects your operations and investments.',
    heroImage: `${ASSET_URL}/aircraft-parts-2.jfif`,
    detailImage: `${ASSET_URL}/commercial-aviation-2.jfif`,
    sections: [
      {
        heading: 'Sourcing & Procurement Support',
        body: 'Technical support for sourcing aircraft spares, components, engines, APUs, and landing gears. Independent technical evaluation ensures parts meet regulatory acceptability and serviceability requirements before purchase.'
      },
      {
        heading: 'Traceability & Serviceability Assessment',
        body: 'Detailed review of part documentation, traceability records, and serviceability status to confirm regulatory acceptability prior to installation or acceptance into inventory.'
      },
      {
        heading: 'AOG & Critical Material Requirements',
        body: 'Priority support for AOG and critical material requirements, leveraging our network and technical expertise to identify and validate solutions quickly while maintaining uncompromising standards on documentation and traceability.'
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
      'Reduce risk of unserviceable or untraceable parts',
      'Independent technical evaluation before purchase',
      'Support AOG resolution with confidence'
    ],
    technologies: ['Aircraft Spares', 'Engines', 'APUs', 'Landing Gears', 'Rotables', 'Expendables'],
    color: 'from-violet-600 to-purple-500',
    bgAccent: 'bg-violet-600',
    price: 'Custom Quote',
    timeline: '24-72 hours AOG support'
  },
  {
    slug: 'maintenance-repair-overhaul',
    title: 'Maintenance, Repair & Overhaul',
    description: 'Component MRO management across all ATA chapters',
    longDescription:
      'Technology Wave covers the entire spectrum of ATA chapters in managing Maintenance, Repair and Overhaul (MRO) components through long-standing partnerships with reputable FAA Part 145 and EASA Part 145 approved repair stations. All shops we partner with have undergone our full inspection criteria and have established industry credentials.\n\nConsider us an extension of your organization — dedicated to your reputation and success, always in tune with your requirements. We ensure quality workmanship, competitive turnaround times, and full warranty for components under our management.',
    heroImage: `${ASSET_URL}/aircraft-maintenance-1.jfif`,
    detailImage: `${ASSET_URL}/aircraft-maintenance-2.jfif`,
    sections: [
      {
        heading: 'Full ATA Chapter Coverage',
        body: 'Hydraulic actuators, valves & landing gears; fuel pumps & engine accessories; auxiliary power units (APU); propellers & related components; avionics & cockpit instrumentation; flight controls & structural parts; wheels, tires, brakes & brake pads; engine fan blades, vanes & QEC accessories; oxygen systems & safety equipment; and all Line Replaceable Units (LRUs).'
      },
      {
        heading: 'FAA & EASA Approved Repair Station Network',
        body: 'All MRO partners are FAA Part 145 and EASA Part 145 approved and have undergone Technology Wave\'s full inspection and vetting criteria. Quality workmanship, competitive turnaround times, and full warranty are standard on all managed components.'
      },
      {
        heading: 'Repair Management as a Service',
        body: 'We act as an extension of your organization — managing the entire repair cycle from induction through return to service, tracking status, validating invoices, and ensuring compliance at every step. You gain expert oversight without the overhead.'
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
      'Oxygen systems & LRUs'
    ],
    benefits: [
      'Minimize aircraft downtime with competitive TATs',
      'Ensure regulatory compliance at every step',
      'Full warranty on managed components',
      'Reduce MRO management overhead'
    ],
    technologies: ['FAA Part 145', 'EASA Part 145', 'All ATA Chapters', 'Rotables', 'Expendables', 'Avionics'],
    color: 'from-red-600 to-rose-500',
    bgAccent: 'bg-red-600',
    price: 'Custom Quote',
    timeline: '2-12 weeks'
  }
]

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-10 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* Breadcrumb */}
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4 hover:text-blue-300 transition-colors">
              <FiArrowLeft className="w-3 h-3" />
              All Services
            </Link>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-4 tracking-tight">
              {service.title}
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl">{service.description}</p>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <FiTag className="text-blue-400" />
                <span>{service.price}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <FiClock className="text-blue-400" />
                <span>{service.timeline}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-gray-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center"
          >
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Service Overview</p>
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              {service.longDescription.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Authority / Tech Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {service.technologies.map((tech) => (
                <span key={tech} className="text-xs font-bold text-blue-400 border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/contact">
                <button className={`inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-xl`}>
                  Request This Service
                  <FiChevronRight />
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 relative min-h-[320px]"
          >
            <img
              src={service.detailImage}
              alt={`${service.title} detail`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 to-transparent lg:bg-gradient-to-l" />
          </motion.div>
        </div>
      </section>

      {/* ── DETAILED SECTIONS ── */}
      {service.sections.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-2">In Detail</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">What We Deliver</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-0.5 bg-blue-600 mb-4" />
                  <h3 className="font-black text-gray-900 text-lg mb-3">{section.heading}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES & BENEFITS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-4">Scope of Work</p>
            <h2 className="text-3xl font-black text-gray-900 mb-8">What&apos;s Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <FiCheckCircle className="text-blue-600 flex-shrink-0 mt-0.5 w-4 h-4" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-4">The Value</p>
            <h2 className="text-3xl font-black text-gray-900 mb-8">Key Benefits</h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className={`p-5 rounded-2xl bg-gradient-to-r ${service.color} text-white`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-xs">{i + 1}</span>
                    </div>
                    <span className="font-semibold text-sm">{benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 p-8 bg-gray-950 rounded-3xl">
              <h3 className="text-white font-black text-xl mb-3">Ready to engage?</h3>
              <p className="text-gray-400 text-sm mb-6">Contact us to discuss your specific requirements. International assignments available.</p>
              <Link href="/contact">
                <button className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${service.color} text-white font-bold hover:scale-[1.02] transition-all`}>
                  Request a Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-2">Keep Exploring</p>
            <h2 className="text-3xl font-black text-gray-900">Other Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherServices.map((other, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/services/${other.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={other.heroImage}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-blue-600 transition-colors">{other.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">{other.description}</p>
                      <div className="flex items-center gap-1 text-blue-600 text-xs font-bold">
                        Learn More <FiChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}