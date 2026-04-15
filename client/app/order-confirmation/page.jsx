"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../Components/Navbar'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <>
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Order Placed!</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 px-2">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {orderNumber && (
          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 mb-8 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-blue-500 font-bold mb-2">Your Order Number</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-700 font-mono break-all">{orderNumber}</p>
            <p className="text-sm text-gray-500 mt-4">
              Save this number to track your order
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md mb-10 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-left border-b pb-4">What's Next?</h2>
          <ul className="text-left space-y-6">
            <li className="flex items-start gap-4">
              <span className="text-2xl bg-gray-50 p-2 rounded-lg">📧</span>
              <div>
                <h3 className="font-bold text-gray-900">Confirmation Email</h3>
                <p className="text-gray-600 text-sm sm:text-base">You'll receive an order confirmation email with all the details.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl bg-gray-50 p-2 rounded-lg">📦</span>
              <div>
                <h3 className="font-bold text-gray-900">Processing</h3>
                <p className="text-gray-600 text-sm sm:text-base">Our team will start preparing your items within 24 hours.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl bg-gray-50 p-2 rounded-lg">🚚</span>
              <div>
                <h3 className="font-bold text-gray-900">Shipping</h3>
                <p className="text-gray-600 text-sm sm:text-base">Your order will be shipped to your provided delivery address.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Improved Button UI: Stacked on Mobile, Row on Desktop */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:shadow-lg active:scale-95 transition-all duration-200 shadow-blue-200">
              Continue Shopping
            </button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:px-10 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your confirmation...</p>
          </div>
        </div>
      }>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  )
}