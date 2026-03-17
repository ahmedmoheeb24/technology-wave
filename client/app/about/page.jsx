"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiTarget, FiEye, FiAward, FiUsers, FiTrendingUp, FiHeart, FiZap, FiShield } from 'react-icons/fi'

export default function AboutPage() {
  const stats = [
    { icon: FiUsers, value: '500+', label: 'Happy Clients' },
    { icon: FiAward, value: '1000+', label: 'Projects Completed' },
    { icon: FiTrendingUp, value: '15+', label: 'Years Experience' },
    { icon: FiZap, value: '50+', label: 'Team Members' }
  ]

  const values = [
    {
      icon: FiTarget,
      title: 'Innovation',
      description: 'We stay ahead of the curve, embracing cutting-edge technologies to deliver solutions that give you a competitive edge.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiHeart,
      title: 'Client-Centric',
      description: 'Your success is our success. We build long-term partnerships by understanding your goals and exceeding expectations.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiShield,
      title: 'Quality',
      description: 'We never compromise on quality. Every line of code, every pixel, every interaction is crafted with precision and care.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiZap,
      title: 'Agility',
      description: 'We adapt quickly to changing requirements and market conditions, ensuring your project stays on track and on budget.',
      color: 'from-teal-500 to-green-500'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team/ceo.jpg',
      bio: 'Visionary leader with 15+ years in tech innovation'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/team/cto.jpg',
      bio: 'Tech architect specializing in scalable solutions'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: '/team/design.jpg',
      bio: 'Award-winning designer creating beautiful experiences'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: '/team/dev.jpg',
      bio: 'Full-stack expert building robust applications'
    }
  ]

  const timeline = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'Started as a small team of passionate developers in a garage, driven by a vision to transform digital experiences.'
    },
    {
      year: '2013',
      title: 'First Major Client',
      description: 'Landed our first Fortune 500 client, marking a significant milestone in our growth journey.'
    },
    {
      year: '2016',
      title: 'Expansion',
      description: 'Expanded to a team of 20+ professionals and opened our second office to serve clients globally.'
    },
    {
      year: '2019',
      title: 'Industry Recognition',
      description: 'Received multiple awards for innovation and excellence in web development and design.'
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Served clients in over 30 countries, delivering cutting-edge digital solutions across industries.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered solutions, helping businesses leverage artificial intelligence for growth.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TechnologyWave</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're a team of passionate innovators, designers, and developers dedicated to transforming ideas into exceptional digital experiences.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-12 shadow-xl"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
                <FiTarget className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value. We believe in the power of technology to transform industries and improve lives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-12 shadow-xl"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                <FiEye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the world's most trusted partner in digital transformation, recognized for our innovation, quality, and commitment to client success. We envision a future where technology seamlessly enhances every aspect of business and life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
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

      {/* Our Story / Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leaders
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow lg:mx-8">
                      <div className="text-blue-600 font-bold text-2xl mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of satisfied clients who have transformed their businesses with our solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Start Your Project
                </button>
              </Link>
              <Link href="/work">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105">
                  View Our Work
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
