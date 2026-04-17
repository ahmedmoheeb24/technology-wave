"use client"

export const runtime = 'edge';

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { FiTarget, FiEye, FiShield, FiZap, FiCheckCircle } from 'react-icons/fi'

const timeline = [
  {
    year: '2001',
    title: 'Founded',
    description: 'Technology Wave was established with a mission to become a world-class aviation parts supplier, serving leading airlines and operators.',
  },
  {
    year: '2005',
    title: 'Commercial Expansion',
    description: 'Grew our commercial aviation portfolio to support narrow and wide-body aircraft across Airbus, Boeing, Bombardier, and Embraer platforms.',
  },
  {
    year: '2010',
    title: 'Military Division Launched',
    description: 'Established our dedicated military division to provide parts and MRO support for the Lockheed Martin C-130, serving air forces worldwide.',
  },
  {
    year: '2013',
    title: 'ASA-100 Accreditation',
    description: 'Earned the Aviation Suppliers Association Quality System ASA-100 accreditation, satisfying FAA Advisory Circular 00-56B.',
  },
  {
    year: '2018',
    title: 'Global Network',
    description: 'Expanded our international network of sales representatives and approved vendors, enabling 7/24/365 service coverage across all major markets.',
  },
  {
    year: '2024',
    title: 'Technical Consultancy Launched',
    description: 'Launched structured Technical Organization and Asset Advisory services — delivering independent consultancy to Operators, MROs, Lessors, and Investors worldwide.',
  },
]

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: 'ICAO/EASA/FAA', label: 'Aligned' },
  { value: 'Independent', label: 'Consultancy' },
  { value: '7/24/365', label: 'AOG Support' },
]

const authorities = ['ICAO', 'EASA', 'FAA', 'GCAA', 'GACA']

const expertise = [
  { label: 'Airline Operations', icon: '✈️' },
  { label: 'MRO Environments', icon: '🔧' },
  { label: 'Power Plant Engineering', icon: '⚙️' },
  { label: 'CAMO Services', icon: '📋' },
  { label: 'Material Management', icon: '📦' },
  { label: 'Aircraft Leasing & Asset Advisory', icon: '🤝' },
  { label: 'Technical Records & Airworthiness', icon: '📁' },
  { label: 'Executive Technical Leadership', icon: '🏢' },
]

export default function AboutHomepage() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 1])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white text-sm font-bold rounded-full mb-6"
          >
            OUR STORY
          </motion.span>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            25+ Years of
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Aviation Expertise
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Independent technical consultancy and aviation parts supplier — serving Airlines, MROs, Lessors, and Investors with uncompromising standards since 2001.
          </p>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl py-6 px-4 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-blue-700 leading-none mb-2">{stat.value}</div>
              <div className="text-gray-500 text-xs uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── WHO WE ARE + EXPERTISE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Who We Are */}
            <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-3xl p-8 md:p-10 text-white">
              <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">Who We Are</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                Expert Technical Consultancy &amp; Asset Advisory.
              </h3>
              <div className="space-y-4 text-gray-400 text-sm leading-relaxed mb-8">
                <p>
                  Our team comprises senior aviation professionals with over 25 years of experience across airline operations, MRO environments, Power Plant engineering, CAMO services, material management, and executive technical leadership.
                </p>
                <p>
                  We provide structured Technical Organization and Asset Advisory consultancy to Aircraft Operators, MROs, Lessors, and Investors on an as-needed basis — independent, confidential, and results-driven.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {authorities.map((auth) => (
                  <span key={auth} className="text-xs font-bold text-blue-400 border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 rounded-full">
                    {auth}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Expertise */}
            <div>
              <p className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-4">What We Know</p>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
                Areas of Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-md rounded-2xl p-4 transition-all group cursor-default"
                  >
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="w-6 h-0.5 bg-blue-600 mb-2 group-hover:w-10 transition-all duration-300" />
                    <div className="font-semibold text-gray-900 text-xs leading-snug">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── OUR JOURNEY TIMELINE ── */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white text-sm font-bold rounded-full mb-4"
            >
              TWO DECADES
            </motion.span>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900">Our Journey</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 transform -translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * index }}
                className={`relative mb-10 md:mb-14 flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 pl-8 md:pl-0' : 'md:pl-12 pl-8 md:pr-0'}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
                  >
                    <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA BUTTONS ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-10 py-4 border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Know About Us
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  )
}