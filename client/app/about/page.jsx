"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiTarget, FiEye, FiUsers, FiHeart, FiZap, FiShield, FiDownload } from 'react-icons/fi'
import { assets } from '@/assets/assets'

export default function AboutPage() {
  const stats = [
    { value: '1,500+', label: 'Global Clients' },
    { value: 'ASA-100', label: 'Accredited' },
    { value: '20+', label: 'Years' },
    { value: '7/24/365', label: 'AOG Support' }
  ]

  const values = [
    { icon: FiTarget, title: 'Quality', description: 'ASA-100, ISO 9001:2015, and AS9120B certifications reflect our obsession with delivering the highest quality parts and services.', color: 'from-blue-500 to-cyan-500' },
    { icon: FiHeart, title: 'Client-Centric', description: 'Your mission readiness is our priority. We build lasting partnerships by understanding your operational goals and consistently exceeding expectations.', color: 'from-violet-500 to-purple-600' },
    { icon: FiShield, title: 'Integrity', description: 'Trusted approved supplier to leading airlines, military forces, and OEM authorized service centers worldwide.', color: 'from-orange-500 to-red-500' },
    { icon: FiZap, title: 'Responsiveness', description: 'AOG situations demand immediate action. Round-the-clock support to ensure parts reach the right location at the right time.', color: 'from-teal-500 to-green-500' }
  ]

  const timeline = [
    { year: '2001', title: 'Founded', description: 'Technology Wave was established with a mission to become a world-class aviation parts supplier, serving leading airlines and operators.' },
    { year: '2005', title: 'Commercial Expansion', description: 'Grew our commercial aviation portfolio to support narrow and wide-body aircraft across Airbus, Boeing, Bombardier, and Embraer platforms.' },
    { year: '2010', title: 'Military Division Launched', description: 'Established our dedicated military division to provide parts and MRO support for the Lockheed Martin C-130 transport, serving air forces worldwide.' },
    { year: '2013', title: 'ASA-100 Accreditation', description: 'Earned the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying FAA Advisory Circular 00-56B.' },
    { year: '2018', title: 'Global Network', description: 'Expanded our international network of sales representatives and approved vendors, enabling 7/24/365 service coverage across all major markets.' },
    { year: '2024', title: 'Industry Recognition', description: 'Continued significant growth while earning industry awards as a leading provider of aviation parts and component repair management services.' }
  ]

  const specialties = [
    { label: 'Airbus', sub: 'A320, A330, A340, A350' },
    { label: 'Boeing', sub: '737, 757, 767, 777, 787' },
    { label: 'Bombardier', sub: 'Dash 8, CRJ Series' },
    { label: 'Embraer', sub: 'Regional & Commercial' },
    { label: 'C-130 Hercules', sub: 'Lockheed Martin' },
    { label: 'F-16 Fighting Falcon', sub: 'Lockheed Martin' },
    { label: 'F-15 / F-18', sub: 'McDonnell Douglas' },
    { label: 'UH-60 / CH-47', sub: 'Military Helicopters' },
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

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
              World-class aviation parts, delivered right.
            </h2>
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>Technology Wave has a proud heritage of service, dating from our founding in 2001. We have since grown into a world-class, award-winning commercial and military aviation parts supplier and provider of component repair management services.</p>
              <p>We find practical solutions for your excess and surplus inventories, and are experts at acquiring retired aircraft for dismantling and harvesting parts. We excel in providing customers with the highest quality parts, best value, fastest delivery, and solutions for hard to find parts and repair requirements.</p>
              <p>Our customers include the world's leading airlines, air forces, and MRO centers. We provide airframe and engine parts and component repair management services for the entire spectrum of ATA chapters.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8">
              {['ASA-100', 'ISO 9001:2015', 'AS9120B', 'FAA AC 00-56B'].map((cert) => (
                <span key={cert} className="text-xs font-bold text-blue-400 border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 rounded-full">
                  {cert}
                </span>
              ))}
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-8">
              <a
                href="/assets/Certificate of Incorporation (Technology Wave Ltd).pdf" 
                download="Certificate of Incorporation (Technology Wave Ltd).pdf"
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
              <div className="text-2xl font-black mb-0.5">1,500+</div>
              <div className="text-xs text-white/60">Customers in 60+ countries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PLATFORM SPECIALTIES ── */}
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
              <p className="text-blue-600 font-mono text-xs sm:text-sm tracking-widest uppercase mb-2">Aircraft Coverage</p>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900">Platform Specialties</h2>
            </div>
            <p className="text-gray-500 text-sm lg:text-base max-w-xs">Parts support across commercial, regional, and military platforms.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {specialties.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-7 lg:p-10 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-default"
              >
                <div className="w-10 h-0.5 bg-blue-600 mb-4 group-hover:w-14 transition-all duration-300" />
                <div className="font-bold text-gray-900 text-base lg:text-lg">{item.label}</div>
                <div className="text-sm lg:text-base text-gray-500 mt-2">{item.sub}</div>
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
                Keeping the world's fleets airborne.
              </h2>
              <p className="text-blue-100 leading-relaxed flex-1">
                To deliver the highest quality parts, fastest service, and most reliable component repair management — 24 hours a day, 7 days a week, 365 days a year.
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
                The most trusted global aviation partner.
              </h2>
              <p className="text-gray-400 leading-relaxed flex-1">
                Recognized for uncompromising standards, depth of expertise, and commitment to keeping every aircraft operational and every mission ready.
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

      {/* ── TIMELINE ── */}
      <section className="py-20 px-4 bg-white">
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
              Let's Keep Your<br />Fleet Flying
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Join 1,500+ operators worldwide who trust Technology Wave for their parts and MRO needs.
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