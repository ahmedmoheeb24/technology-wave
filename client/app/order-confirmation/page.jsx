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
      
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {orderNumber && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Your Order Number</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">{orderNumber}</p>
            <p className="text-sm text-gray-600 mt-4">
              Save this number to track your order
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <ul className="text-left space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-bold">Confirmation Email</h3>
                <p className="text-gray-600">You'll receive an order confirmation email with all the details</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <h3 className="font-bold">Processing</h3>
                <p className="text-gray-600">We'll start processing your order within 24 hours</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <h3 className="font-bold">Shipping</h3>
                <p className="text-gray-600">Your order will be shipped to your provided address</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-full hover:shadow-xl transition-all">
              Continue Shopping
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all">
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
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  )
}
