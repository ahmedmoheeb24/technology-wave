"use client"
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-blue-600 to-sky-600 text-white py-12 mt-20'>
      <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-12'>
        
        {/* Footer Top - Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10'>
          
          {/* About Column */}
          <div>
            <h3 className='text-xl font-bold mb-4 font-Ovo'>Technology Wave</h3>
            <p className='text-white text-sm leading-relaxed mb-4'>
              Your trusted technology partner. We deliver innovative solutions and cutting-edge products with exceptional service and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 font-Ovo'>Quick Links</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href="/#about" className='text-white hover:text-sky-400 transition-colors'>About Us</Link>
              </li>
              <li>
                <Link href="/#services" className='text-white hover:text-sky-400 transition-colors'>Services</Link>
              </li>
              <li>
                <Link href="/#work" className='text-white hover:text-sky-400 transition-colors'>Products</Link>
              </li>
              <li>
                <Link href="/#contact" className='text-white hover:text-sky-400 transition-colors'>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4 font-Ovo'>Customer Service</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href="/shippinginfo" className='text-white hover:text-sky-400 transition-colors'>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returnpolicy" className='text-white hover:text-sky-400 transition-colors'>
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/termsandconditions" className='text-white hover:text-sky-400 transition-colors'>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4 font-Ovo'>Contact Us</h4>
            <ul className='space-y-3 text-sm'>

              {/* Emails */}
              {[
                'Zeeshan@technology-wave.uk',
                'Shahzad@technology-wave.uk',
                'Alex@technology-wave.uk',
                'info@technology-wave.uk',
              ].map((email) => (
                <li key={email} className='flex items-start gap-2'>
                  <svg className='w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className='text-white hover:text-gray-200'>{email}</a>
                </li>
              ))}

              {/* Phone */}
              <li className='flex items-start gap-2'>
                <svg className='w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+447488321411" className='text-white hover:text-gray-200'>
                  Moheeb: +44 7488 321411
                </a>
              </li>

              {/* Address */}
              <li className='flex items-start gap-2'>
                <svg className='w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className='text-white'>53 Northfield Park, UB3 4NU, London</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex items-center justify-center'>
            <p className='text-sm text-white'>
              © 2026 Technology Wave. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer