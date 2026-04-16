"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiTarget, FiEye, FiShield, FiZap, FiCheckCircle, FiDownload, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { assets } from '@/assets/assets'

export default function AboutPage() {
  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: 'ICAO/EASA/FAA', label: 'Aligned' },
    { value: 'Independent', label: 'Consultancy' },
    { value: '7/24/365', label: 'AOG Support' }
  ]

  const values = [
    {
      icon: FiTarget,
      title: 'Regulatory Compliance',
      description: 'Grounded in ICAO, EASA, FAA, GCAA, GACA and other international authority frameworks — ensuring every recommendation meets the highest standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiShield,
      title: 'Risk Mitigation',
      description: 'Independent, confidential, and results-driven. We identify technical risks and deliver structured findings with corrective action recommendations.',
      color: 'from-slate-600 to-slate-400'
    },
    {
      icon: FiCheckCircle,
      title: 'Operational Practicality',
      description: 'Real-world solutions from senior professionals with deep MRO, airline, CAMO, and Power Plant engineering backgrounds.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: FiZap,
      title: 'Cost-Effectiveness',
      description: 'On-demand consultancy that delivers maximum value without the overhead of a full-time resource — practical, focused, and outcome-driven.',
      color: 'from-teal-500 to-green-500'
    }
  ]

  const expertise = [
    { label: 'Airline Operations', icon: '✈️' },
    { label: 'MRO Environments', icon: '🔧' },
    { label: 'Power Plant Engineering', icon: '⚙️' },
    { label: 'CAMO Services', icon: '📋' },
    { label: 'Material Management', icon: '📦' },
    { label: 'Executive Technical Leadership', icon: '🏢' },
    { label: 'Aircraft Leasing & Asset Advisory', icon: '🤝' },
    { label: 'Technical Records & Airworthiness', icon: '📁' },
  ]

  const authorities = ['ICAO', 'EASA', 'FAA', 'GCAA', 'GACA']

  const timeline = [
    {
      year: '2001',
      title: 'Founded',
      description: 'Technology Wave was established with a mission to become a world-class aviation parts supplier, serving leading airlines and operators.'
    },
    {
      year: '2005',
      title: 'Commercial Expansion',
      description: 'Grew our commercial aviation portfolio to support narrow and wide-body aircraft across Airbus, Boeing, Bombardier, and Embraer platforms.'
    },
    {
      year: '2010',
      title: 'Military Division Launched',
      description: 'Established our dedicated military division to provide parts and MRO support for the Lockheed Martin C-130 transport, serving air forces worldwide.'
    },
    {
      year: '2013',
      title: 'ASA-100 Accreditation',
      description: 'Earned the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying FAA Advisory Circular 00-56B.'
    },
    {
      year: '2018',
      title: 'Global Network',
      description: 'Expanded our international network of sales representatives and approved vendors, enabling 7/24/365 service coverage across all major markets.'
    },
    {
      year: '2024',
      title: 'Technical Consultancy Launched',
      description: 'Launched structured Technical Organization and Asset Advisory services — delivering independent consultancy to Operators, MROs, Lessors, and Investors worldwide.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden">
        {assets.about.aircraft && (
          <Image
            src={assets.about.aircraft}
            alt="Aviation Hero"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-10 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-blue-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">— Since 2001</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-8 tracking-tight">
              About<br /><span className="text-blue-400">Technology Wave</span>
            </h1>
            <div className="flex flex-wrap gap-8 sm:gap-12">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-black text-white leading-none">{s.value}</div>
                  <div className="text-white/50 text-xs mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-gray-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center order-2 lg:order-1"
          >
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
              Expert Technical Consultancy &amp; Asset Advisory.
            </h2>
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                Our team comprises senior aviation professionals with over 25 years of experience across airline operations, MRO environments, Power Plant engineering, CAMO services, material management, and executive technical leadership.
              </p>
              <p>
                We provide structured Technical Organization and Asset Advisory consultancy to Aircraft Operators, MROs, Lessors, and Investors on an as-needed basis — independent, confidential, and results-driven.
              </p>
              <p>
                Our consultancy philosophy is grounded in regulatory compliance, operational practicality, cost control, and risk mitigation, aligned with ICAO, EASA, FAA, GCAA, GACA, and other international authority frameworks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {authorities.map((auth) => (
                <span key={auth} className="text-xs font-bold text-blue-400 border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 rounded-full">
                  {auth}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMapPin className="text-blue-400 flex-shrink-0" />
                <span>53 Northfield Park UB3 4NU London</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMail className="text-blue-400 flex-shrink-0" />
                <span>info@technology-wave.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone className="text-blue-400 flex-shrink-0" />
                <span>+447488321411</span>
              </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-8">
              <a
                href="https://api.technology-wave.com/assets/certificate.pdf"
                download="Technology_Wave_Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-xl shadow-blue-900/30 group"
              >
                <FiDownload className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Incorporation Certificate</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[360px] lg:min-h-0 order-1 lg:order-2"
          >
            {assets.about.part && (
              <Image
                src={assets.about.part}
                alt="Aviation parts"
                fill
                unoptimized
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/40 to-transparent lg:bg-gradient-to-l" />
            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white">
              <div className="text-2xl font-black mb-0.5">25+</div>
              <div className="text-xs text-white/60">Years of Aviation Expertise</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AREAS OF EXPERTISE ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
          >
            <div>
              <p className="text-blue-600 font-mono text-xs sm:text-sm tracking-widest uppercase mb-2">What We Know</p>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900">Areas of Expertise</h2>
            </div>
            <p className="text-gray-500 text-sm lg:text-base max-w-xs">Deep domain knowledge across the full aviation technical spectrum.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-7 lg:p-10 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-default"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="w-10 h-0.5 bg-blue-600 mb-4 group-hover:w-14 transition-all duration-300" />
                <div className="font-bold text-gray-900 text-sm lg:text-base">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-blue-600 rounded-3xl p-8 sm:p-10 flex flex-col"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <p className="text-blue-200 text-xs font-mono tracking-widest uppercase mb-3">Mission</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                Keeping the world&apos;s fleets airborne.
              </h2>
              <p className="text-blue-100 leading-relaxed flex-1">
                To deliver independent, results-driven technical consultancy and high-quality aviation parts — grounded in regulatory compliance, cost control, and risk mitigation, 24 hours a day, 7 days a week, 365 days a year.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 relative min-h-[280px] rounded-3xl overflow-hidden shadow-2xl"
            >
              {assets.about.aircraft && (
                <Image src={assets.about.aircraft} alt="Aircraft View" fill unoptimized className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-gray-950 rounded-3xl p-8 sm:p-10 flex flex-col"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <FiEye className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400 text-xs font-mono tracking-widest uppercase mb-3">Vision</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                The most trusted global aviation technical partner.
              </h2>
              <p className="text-gray-400 leading-relaxed flex-1">
                Recognized for uncompromising standards, deep regulatory expertise, and a commitment to keeping every aircraft operational, every mission ready, and every asset protected.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-blue-600 font-mono text-xs lg:text-sm tracking-widest uppercase mb-3">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-500 text-sm lg:text-base leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY ENGAGE US ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-blue-600 font-mono text-xs lg:text-sm tracking-widest uppercase mb-3">The Difference</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">Why Engage This Consultancy</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { point: '25+ years of airline & MRO experience', detail: 'Battle-tested expertise across every facet of commercial and military aviation operations.' },
              { point: 'Deep Power Plant, CAMO & Leasing expertise', detail: 'Specialist knowledge in engines, APUs, continuing airworthiness, and asset lifecycle management.' },
              { point: 'Strong regulatory alignment', detail: 'ICAO / EASA / FAA / Middle East authorities — we navigate the full regulatory landscape.' },
              { point: 'Practical & risk-focused approach', detail: 'Actionable recommendations grounded in real-world operational and financial constraints.' },
              { point: 'Independent & confidential', detail: 'No conflicts of interest. Pure advisory — your goals, your outcomes.' },
              { point: 'On-demand, cost-effective', detail: 'Expert-level support when you need it, without long-term overhead commitments.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base">{item.point}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed pl-8">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-blue-600 font-mono text-xs lg:text-sm tracking-widest uppercase mb-3">Two Decades</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">Our Journey</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[1.125rem] lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-500 to-blue-200 lg:-translate-x-px" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className={`relative flex items-center gap-0 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="absolute left-[1.125rem] lg:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-[3px] border-white shadow-md z-10 ring-4 ring-blue-100" />

                  <div className={`ml-12 lg:ml-0 w-full lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 hover:shadow-lg hover:border-blue-200 transition-all">
                      <span className="text-blue-600 font-black text-xl lg:text-3xl">{item.year}</span>
                      <h3 className="font-black text-gray-900 text-base lg:text-xl mt-1 mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm lg:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gray-950 py-24 px-4">
        <div className="absolute inset-0 opacity-15">
          {assets.about.part && (
            <Image src={assets.about.part} alt="Background Part" fill unoptimized className="object-cover" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-gray-950/80" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Get In Touch</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let&apos;s Keep Your<br />Fleet Flying
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Independent technical consultancy from professionals who have been there — across airlines, MROs, CAMO, and Power Plant environments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30">
                  Contact Us
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-full transition-all hover:scale-105 backdrop-blur-sm">
                  Our Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}