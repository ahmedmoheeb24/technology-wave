"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiTarget, FiEye, FiAward, FiUsers, FiTrendingUp, FiHeart, FiZap, FiShield } from 'react-icons/fi'
import { assets } from '@/assets/assets'

export default function AboutPage() {
  const stats = [
    { icon: FiUsers, value: '1,500+', label: 'Global Clients' },
    { icon: FiAward, value: 'ASA-100', label: 'Accredited Supplier' },
    { icon: FiTrendingUp, value: '20+', label: 'Years Experience' },
    { icon: FiShield, value: '7/24/365', label: 'AOG Support' }
  ]

  const values = [
    { icon: FiTarget, title: 'Quality', description: 'We never compromise on standards. Our ASA-100, ISO 9001:2015, and AS9120B certifications reflect our obsession with delivering the highest quality parts and services.', color: 'from-blue-500 to-cyan-500' },
    { icon: FiHeart, title: 'Client-Centric', description: 'Your mission readiness is our priority. We build lasting partnerships by understanding your operational goals and consistently exceeding expectations.', color: 'from-purple-500 to-pink-500' },
    { icon: FiShield, title: 'Integrity', description: 'Known for strong professional ethics and transparent practices, we are a trusted approved supplier to leading airlines, military forces, and OEM authorized service centers.', color: 'from-orange-500 to-red-500' },
    { icon: FiZap, title: 'Responsiveness', description: 'AOG situations demand immediate action. Our team provides round-the-clock support to ensure parts reach the right location at the right time.', color: 'from-teal-500 to-green-500' }
  ]

  const timeline = [
    { year: '2001', title: 'Founded', description: 'Technology Wave was established with a mission to become a world-class aviation parts supplier, serving leading airlines and operators with exceptional quality and service.' },
    { year: '2005', title: 'Commercial Expansion', description: 'Grew our commercial aviation portfolio to support narrow and wide-body aircraft across Airbus, Boeing, Bombardier, and Embraer platforms.' },
    { year: '2010', title: 'Military Division Launched', description: 'Established our dedicated military division to provide parts and MRO support for the Lockheed Martin C-130 transport, serving air forces worldwide.' },
    { year: '2013', title: 'ASA-100 Accreditation', description: 'Earned the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying FAA Advisory Circular 00-56B and cementing our reputation for quality.' },
    { year: '2018', title: 'Global Network', description: 'Expanded our international network of sales representatives and approved vendors, enabling 7/24/365 service coverage across all major markets.' },
    { year: '2024', title: 'Industry Recognition', description: 'Continued to achieve significant growth while earning industry awards and recognition as a leading provider of aviation parts and component repair management services.' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technology Wave</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A world-class, award-winning commercial and military aviation parts supplier — proudly serving the industry since 2001.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-4 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight break-words">{stat.value}</div>
                  <div className="text-gray-600 text-xs sm:text-sm leading-snug">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text left */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">Who We Are</h2>
              <div className="space-y-5 text-base lg:text-lg text-gray-600 leading-relaxed">
                <p>Technology Wave has a proud heritage of service, dating from our founding in 2001. We have since grown into a world-class, award-winning commercial and military aviation parts supplier and provider of component repair management services.</p>
                <p>We find practical solutions for your excess and surplus inventories, and are experts at acquiring retired aircraft for dismantling and harvesting parts. We excel in providing customers with the highest quality parts, best value, fastest delivery, exceptional customer service, and solutions for hard to find parts and repair requirements.</p>
                <p>Our customers include the world's leading airlines, air forces, and MRO centers. They rely on our ability to supply parts that keep assets flying. To ensure a one-stop shop approach, we provide airframe and engine parts and component repair management services for the entire spectrum of ATA chapters.</p>
                <p>We are a distributor for OEMs who qualify to AS9100 standards. Our knowledgeable team and international network of sales representatives provide 7/24/365 service.</p>
              </div>
            </motion.div>

            {/* Images right — stacked */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              {/* Aircraft image — tall */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                <Image src={assets.about.aircraft}
                  unoptimized alt="Aviation aircraft" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">Commercial & Military Fleet</span>
                </div>
              </div>
              {/* Part image — shorter */}
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden shadow-xl">
                <Image src={assets.about.part}
                  unoptimized alt="Aviation parts" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow">
                  <p className="text-xs font-bold text-gray-900">ASA-100 Certified Parts</p>
                  <p className="text-xs text-gray-500">Full traceability & documentation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform Specialties */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Platform Specialties</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {specialties.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <div className="font-bold text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
                <FiTarget className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">To keep the world's aviation assets flying by delivering the highest quality parts, fastest service, and most reliable component repair management — 24 hours a day, 7 days a week, 365 days a year.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                <FiEye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">To be the most trusted global partner in aviation parts and services — recognized for our uncompromising standards, depth of expertise, and commitment to keeping every aircraft operational and every mission ready.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Over two decades of growth, excellence, and industry recognition</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block" />
            {timeline.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`relative mb-12 lg:mb-16 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:ml-auto'}`}>
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="text-blue-600 font-bold text-2xl mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                <div className={`hidden lg:block absolute top-8 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg ${index % 2 === 0 ? '-right-3' : '-left-3'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Let's Keep Your Fleet Flying</h2>
            <p className="text-xl text-blue-100 mb-8">Join 1,500+ operators worldwide who trust Technology Wave for their parts and MRO needs</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"><button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">Contact Us</button></Link>
              <Link href="/services"><button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105">Our Services</button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}