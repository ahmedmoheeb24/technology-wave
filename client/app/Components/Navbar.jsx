'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      
      {/* ── HERO SECTION (Transparent Navbar Overlays This) ── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-950 z-10" />
          <Image 
            src="https://api.technology-wave.com/uploads/aircraft-parts-1.jfif" 
            alt="Aviation Excellence Background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600 rounded-full">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Our Legacy
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-none">
              Aviation <span className="text-blue-500">Excellence.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Leading the global aviation supply chain with an unwavering commitment to safety, 
              precision, and rapid technical support.
            </p>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── CORE STORY SECTION ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-8 leading-tight">
              Bridging the gap in the <br /> 
              <span className="text-blue-600 font-outline-2">Global Supply Chain.</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Technology Wave was founded on the principle that aviation maintenance should never be 
              stalled by logistics. We provide a seamless link between top-tier manufacturers and 
              global operators, ensuring every component meets the highest standards of certification.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-4xl font-black text-gray-900">15+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-gray-900">24/7</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">AOG Support</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[550px] rounded-[48px] overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image 
              src="https://api.technology-wave.com/uploads/aircraft-parts-1.jfif" 
              alt="Aviation Logistics"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="py-24 bg-gray-50 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Foundations</span>
            <h2 className="text-4xl font-black text-gray-900 mt-3">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Traceability", 
                desc: "Every component is delivered with rigorous back-to-birth documentation and certification.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                title: "Speed", 
                desc: "AOG and critical requirements demand immediate response. Our network never sleeps.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              { 
                title: "Integrity", 
                desc: "Building long-term partnerships through transparency and consistent technical reliability.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-[48px] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Let's keep you flying.</h2>
          <p className="text-gray-400 text-lg mb-10">Connect with our specialized team for technical support or parts procurement.</p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
            Work With Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;