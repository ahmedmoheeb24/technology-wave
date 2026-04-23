"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "96b57209-65a7-4814-abb2-726aeccaa3ad");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("✓ Message sent successfully! We'll get back to you soon.");
      event.target.reset();
      setTimeout(() => setResult(""), 5000);
    } else {
      console.log("Error", data);
      setResult("✗ " + data.message);
    }
  };

  return (
    <div id='contact' className='w-full px-6 sm:px-10 lg:px-[12%] py-20 scroll-mt-20'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className='text-center mb-2 text-xl font-Ovo text-blue-600'>
          Need Help?
        </h4>

        <h2 className='text-center text-4xl sm:text-5xl font-Ovo mb-6'>
          Get in Touch
        </h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-700'>
          Have questions about our products or services? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12'>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='space-y-6'
            >

              {/* Email Card */}
              <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:border-blue-300'>
                <div className='flex items-start gap-4'>
                  <div className='bg-blue-100 p-3 rounded-full flex-shrink-0'>
                    <svg className='w-6 h-6 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-bold text-lg mb-2'>Email Us</h3>
                    <div className='space-y-1'>
                      <a href="mailto:Zeeshan@technology-wave.uk" className='block text-gray-600 hover:text-blue-600 transition-colors text-sm'>Zeeshan@technology-wave.uk</a>
                      <a href="mailto:Shahzad@technology-wave.uk" className='block text-gray-600 hover:text-blue-600 transition-colors text-sm'>Shahzad@technology-wave.uk</a>
                      <a href="mailto:Alex@technology-wave.uk" className='block text-gray-600 hover:text-blue-600 transition-colors text-sm'>Alex@technology-wave.uk</a>
                      <a href="mailto:info@technology-wave.uk" className='block text-gray-600 hover:text-blue-600 transition-colors text-sm'>info@technology-wave.uk</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:border-blue-300'>
                <div className='flex items-start gap-4'>
                  <div className='bg-blue-100 p-3 rounded-full flex-shrink-0'>
                    <svg className='w-6 h-6 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-bold text-lg mb-1'>Call Us</h3>
                    <a href="tel:+447488321411" className='text-gray-600 hover:text-blue-600 transition-colors'>
                      Moheeb: +44 7488 321411
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:border-blue-300'>
                <div className='flex items-start gap-4'>
                  <div className='bg-blue-100 p-3 rounded-full flex-shrink-0'>
                    <svg className='w-6 h-6 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-bold text-lg mb-1'>Visit Us</h3>
                    <p className='text-gray-600'>53 Northfield Park<br />UB3 4NU, London</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:bg-white transition-all duration-300'
            >
              <div className='space-y-5'>
                <div>
                  <label className='block text-sm font-semibold mb-2 text-gray-700'>Name</label>
                  <input
                    type='text'
                    placeholder='Your name'
                    required
                    className='w-full p-3 outline-none border-2 border-gray-300 rounded-lg bg-white focus:border-blue-600 transition-colors'
                    name='name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2 text-gray-700'>Email</label>
                  <input
                    type='email'
                    placeholder='your.email@example.com'
                    required
                    className='w-full p-3 outline-none border-2 border-gray-300 rounded-lg bg-white focus:border-blue-600 transition-colors'
                    name='email'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2 text-gray-700'>Message</label>
                  <textarea
                    rows='5'
                    placeholder='Tell us what you need...'
                    required
                    className='w-full p-3 outline-none border-2 border-gray-300 rounded-lg bg-white focus:border-blue-600 transition-colors resize-none'
                    name='message'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full py-3 px-8 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
                >
                  Send Message
                  <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {result && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={result.includes('✓') ? 'text-center font-semibold text-green-600' : 'text-center font-semibold text-red-600'}
                  >
                    {result}
                  </motion.p>
                )}
              </div>
            </motion.form>

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact