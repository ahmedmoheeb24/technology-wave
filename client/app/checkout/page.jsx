"use client"

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import Navbar from '../Components/Navbar'

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'United Kingdom',
    payment_method: 'cod',
    notes: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setLoading(true)
    
    try {
      // Prepare order data
      const orderData = {
        ...formData,
        total_amount: getCartTotal(),
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          product_image: typeof item.image === 'string' && item.image.startsWith('http') ? item.image : null,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        }))
      }

      // Create order
      const response = await api.createOrder(orderData)
      
      // Clear cart
      clearCart()
      
      // Redirect to success page
      router.push(`/order-confirmation?order=${response.order_number}`)
      
    } catch (error) {
      console.error('Order error:', error)
      alert(`Failed to place order: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products before checking out</p>
          <a href="/" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_country}
                    onChange={(e) => setFormData({...formData, shipping_country: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_city}
                    onChange={(e) => setFormData({...formData, shipping_city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_postal_code}
                    onChange={(e) => setFormData({...formData, shipping_postal_code: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Order Notes (Optional)</label>
                  <textarea
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                    className="mr-3"
                  />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Place Order - $${getCartTotal().toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {typeof item.image === 'string' && item.image.startsWith('http') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-2xl">{item.image || '📦'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
