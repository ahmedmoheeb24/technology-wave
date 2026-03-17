"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiSmartphone, FiLayout, FiCloud, FiShoppingCart, FiTrendingUp, FiArrowLeft, FiCheck, FiClock, FiUsers, FiAward } from 'react-icons/fi'

const services = [
  {
    slug: 'web-development',
    icon: FiCode,
    title: 'Web Development',
    description: 'Build powerful, scalable web applications with cutting-edge technologies',
    longDescription: 'Transform your ideas into reality with our expert web development services. We create fast, secure, and scalable web applications using modern frameworks like React, Next.js, and Node.js. Our team ensures your web presence is optimized for performance, SEO, and user experience.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Performance Optimization',
      'Responsive Design',
      'SEO Optimization',
      'Security Best Practices'
    ],
    benefits: [
      'Fast loading times for better user engagement',
      'Scalable architecture that grows with your business',
      'SEO-friendly code for better search rankings',
      'Mobile-responsive for all devices'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
    color: 'from-blue-500 to-cyan-500',
    price: 'Starting at $2,999',
    timeline: '4-8 weeks'
  },
  {
    slug: 'mobile-app-development',
    icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps that users love',
    longDescription: 'Reach your audience wherever they are with stunning mobile applications. We develop iOS and Android apps that deliver exceptional user experiences and drive engagement. From concept to app store deployment, we handle everything.',
    features: [
      'iOS & Android Apps',
      'Cross-Platform Development',
      'App Store Deployment',
      'Push Notifications',
      'In-App Purchases',
      'Offline Functionality',
      'Real-time Sync',
      'Analytics Integration'
    ],
    benefits: [
      'Reach users on their preferred devices',
      'Increase customer engagement and retention',
      'Enable mobile commerce opportunities',
      'Build brand loyalty through mobile presence'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    color: 'from-purple-500 to-pink-500',
    price: 'Starting at $4,999',
    timeline: '8-12 weeks'
  },
  {
    slug: 'ui-ux-design',
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that convert visitors into customers',
    longDescription: 'Great design is invisible. Our UI/UX experts create interfaces that are not only beautiful but also intuitive and conversion-focused. We conduct thorough user research and testing to ensure your users have the best experience possible.',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems',
      'Responsive Design',
      'Usability Testing',
      'Brand Identity',
      'Accessibility Compliance'
    ],
    benefits: [
      'Increase conversion rates with better UX',
      'Reduce development costs with clear designs',
      'Build consistent brand experiences',
      'Improve customer satisfaction'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    color: 'from-orange-500 to-red-500',
    price: 'Starting at $1,999',
    timeline: '2-4 weeks'
  },
  {
    slug: 'cloud-solutions',
    icon: FiCloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure for modern applications',
    longDescription: 'Leverage the power of cloud computing to scale your business. We design and implement robust cloud solutions using AWS, Google Cloud, and Azure. From migration to optimization, we ensure your infrastructure is reliable, secure, and cost-effective.',
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'Auto-scaling Solutions',
      'DevOps & CI/CD',
      'Cloud Security',
      'Cost Optimization',
      'Disaster Recovery',
      'Performance Monitoring'
    ],
    benefits: [
      'Scale resources based on demand',
      'Reduce infrastructure costs',
      'Improve application reliability',
      'Enhanced security and compliance'
    ],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    color: 'from-teal-500 to-green-500',
    price: 'Starting at $3,499',
    timeline: '4-6 weeks'
  },
  {
    slug: 'ecommerce-solutions',
    icon: FiShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions that drive sales',
    longDescription: 'Launch your online business with a powerful e-commerce platform. From product catalogs to payment processing, we build complete solutions that convert visitors into customers. Our platforms are optimized for sales, security, and customer experience.',
    features: [
      'Custom Shopping Carts',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing',
      'Analytics & Reporting',
      'SEO Optimization',
      'Multi-currency Support',
      'Customer Accounts'
    ],
    benefits: [
      'Increase online sales revenue',
      'Streamline order management',
      'Provide seamless checkout experience',
      'Track performance with detailed analytics'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Square'],
    color: 'from-indigo-500 to-blue-500',
    price: 'Starting at $3,999',
    timeline: '6-10 weeks'
  },
  {
    slug: 'digital-marketing',
    icon: FiTrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven strategies to grow your online presence',
    longDescription: 'Reach more customers and grow your business with targeted digital marketing campaigns. We combine SEO, content marketing, social media, and paid advertising to maximize your ROI and build your brand.',
    features: [
      'SEO & Content Strategy',
      'Social Media Marketing',
      'PPC Advertising',
      'Email Marketing',
      'Analytics & Reporting',
      'Conversion Optimization',
      'Brand Strategy',
      'Influencer Marketing'
    ],
    benefits: [
      'Increase website traffic and visibility',
      'Generate qualified leads',
      'Improve brand awareness',
      'Maximize marketing ROI'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Mailchimp', 'SEMrush'],
    color: 'from-yellow-500 to-orange-500',
    price: 'Starting at $1,499/mo',
    timeline: 'Ongoing'
  }
]

export default function ServiceDetailPage({ params }) {
  const service = services.find(s => s.slug === params.slug)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Services
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = service.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link href="/services">
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Services
          </button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${service.color} mb-6`}>
              <IconComponent className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiClock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{service.timeline}</h3>
              <p className="text-gray-600">Typical Timeline</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiUsers className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <FiAward className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </motion.div>

          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {service.longDescription}
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm text-gray-500 mb-2">Investment</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">{service.price}</div>
                <Link href="/contact">
                  <button className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105`}>
                    Get Started
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mr-4 mt-1`}>
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    <FiCheck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technologies We Use</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {service.technologies.map((tech, index) => (
                <div key={index} className="px-6 py-3 bg-white rounded-full shadow-lg text-gray-700 font-semibold">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 bg-gradient-to-r ${service.color}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how we can help you achieve your goals
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Contact Us
                </button>
              </Link>
              <Link href="/work">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
                  View Portfolio
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
