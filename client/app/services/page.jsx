"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ASSET_URL = "https://api.technology-wave.com/uploads"

const categories = [
  'All',
  'Airframe Parts',
  'Engine & APU',
  'Avionics',
  'Hydraulics',
  'Landing Gear',
  'Rotables',
  'Consumables',
  'Tools & GSE'
]

// Example products — replace with your real data / props
const products = [
  {
    id: 1,
    title: 'CFM56-5B Fan Blade',
    partNumber: 'CFM-FB-5B-001',
    category: 'Engine & APU',
    condition: 'Serviceable',
    traceability: 'Back-to-Birth',
    certifications: ['FAA 8130-3', 'EASA Form 1'],
    image: `${ASSET_URL}/aircraft-maintenance-1.jfif`,
    color: 'from-orange-600 to-amber-500',
    stock: 'In Stock',
  },
  {
    id: 2,
    title: 'Hydraulic Actuator – Aileron',
    partNumber: 'HYD-ACT-AIL-220',
    category: 'Hydraulics',
    condition: 'Overhauled',
    traceability: 'Full',
    certifications: ['EASA Form 1'],
    image: `${ASSET_URL}/aircraft-parts-1.jfif`,
    color: 'from-blue-600 to-sky-500',
    stock: 'In Stock',
  },
  {
    id: 3,
    title: 'Landing Gear Actuator',
    partNumber: 'LG-ACT-B737-004',
    category: 'Landing Gear',
    condition: 'New',
    traceability: 'OEM Trace',
    certifications: ['FAA 8130-3', 'EASA Form 1'],
    image: `${ASSET_URL}/aircraft-parts-2.jfif`,
    color: 'from-slate-700 to-slate-500',
    stock: 'Limited',
  },
  {
    id: 4,
    title: 'Avionics Control Unit – FMS',
    partNumber: 'AV-FMS-CTL-110',
    category: 'Avionics',
    condition: 'Serviceable',
    traceability: 'Full',
    certifications: ['EASA Form 1'],
    image: `${ASSET_URL}/commercial-aviation-1.jfif`,
    color: 'from-teal-600 to-green-500',
    stock: 'In Stock',
  },
  {
    id: 5,
    title: 'Wheel & Brake Assembly',
    partNumber: 'WB-ASY-B320-007',
    category: 'Airframe Parts',
    condition: 'Overhauled',
    traceability: 'Full',
    certifications: ['FAA 8130-3'],
    image: `${ASSET_URL}/aircraft-maintenance-2.jfif`,
    color: 'from-violet-600 to-purple-500',
    stock: 'In Stock',
  },
  {
    id: 6,
    title: 'APU – Honeywell GTCP131-9',
    partNumber: 'APU-HW-131-9-003',
    category: 'Engine & APU',
    condition: 'Serviceable',
    traceability: 'Back-to-Birth',
    certifications: ['EASA Form 1', 'FAA 8130-3'],
    image: `${ASSET_URL}/commercial-aviation-2.jfif`,
    color: 'from-red-600 to-rose-500',
    stock: 'Available',
  }
]

const conditionColor = {
  'New': 'bg-emerald-100 text-emerald-700',
  'Serviceable': 'bg-blue-100 text-blue-700',
  'Overhauled': 'bg-amber-100 text-amber-700',
}

const stockColor = {
  'In Stock': 'text-emerald-600',
  'Limited': 'text-amber-500',
  'Available': 'text-blue-600',
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header (mirrors Services page) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-full mb-6">
            TAGGED &amp; TRACEABLE
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
            Parts Inventory
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Certified, traceable aviation parts and components — ready for immediate dispatch across all ATA chapters.
          </p>
        </motion.div>

        {/* ── Filters + Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-transparent shadow-lg scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search parts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm font-medium text-gray-700 bg-white shadow-sm transition-colors"
            />
          </div>
        </motion.div>

        {/* ── Result count ── */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8"
        >
          AVAILABLE STOCK &nbsp;·&nbsp; {filtered.length} Part{filtered.length !== 1 ? 's' : ''} Found
        </motion.p>

        {/* ── Product Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index }}
              className="relative group h-full"
            >
              {/* Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${product.color} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />

              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col w-full h-full cursor-pointer">

                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className={`absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${product.color} text-white text-xs font-bold`}>
                    {product.category}
                  </div>
                  <div className={`absolute top-3 right-4 text-xs font-bold ${stockColor[product.stock]}`}>
                    ● {product.stock}
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${product.color} flex items-center justify-center mb-4`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mb-4">P/N: {product.partNumber}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${conditionColor[product.condition]}`}>
                      {product.condition}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                      {product.traceability}
                    </span>
                  </div>

                  {/* Certifications */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.certifications.map((cert, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cert}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${product.color} text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto`}>
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl font-bold mb-2">No parts found</p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 mb-6">Can't find the part you need?</p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Submit an AOG / Parts Request
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}