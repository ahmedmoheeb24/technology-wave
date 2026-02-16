"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

export default function OrdersManagement() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadOrders()
  }, [router, filterStatus])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const status = filterStatus === 'all' ? null : filterStatus
      const data = await api.getOrders(status)
      setOrders(data || [])
      console.log('✅ Loaded orders from API:', data?.length || 0)
    } catch (error) {
      console.error('❌ Error loading orders:', error)
      alert('Error loading orders. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrder(orderId, { status })
      loadOrders()
      alert('Order status updated!')
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    }
  }

  const deleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    
    try {
      await api.deleteOrder(orderId)
      loadOrders()
      alert('Order deleted!')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600 mt-1">Track and manage customer orders</p>
            </div>
            <Link href="/admin/dashboard">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Filter Orders</h2>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">All Orders ({orders.length})</h2>
          
          {loading ? (
            <p className="text-blue-600 text-center py-8">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order #</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-mono text-sm">{order.order_number}</td>
                      <td className="py-4 px-4">{order.customer_name}</td>
                      <td className="py-4 px-4">{order.customer_email}</td>
                      <td className="py-4 px-4 font-bold">${order.total_amount.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const details = `
Order: ${order.order_number}
Customer: ${order.customer_name}
Email: ${order.customer_email}
Phone: ${order.customer_phone}
Address: ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_postal_code}
Payment: ${order.payment_method}
Items: ${order.items.length}
Total: $${order.total_amount.toFixed(2)}
Notes: ${order.notes || 'None'}
                              `.trim()
                              alert(details)
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm font-semibold"
                          >
                            View
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold">Total Orders</h3>
            <p className="text-3xl font-black text-blue-600 mt-2">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold">Pending</h3>
            <p className="text-3xl font-black text-yellow-600 mt-2">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold">Processing</h3>
            <p className="text-3xl font-black text-blue-600 mt-2">
              {orders.filter(o => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold">Revenue</h3>
            <p className="text-3xl font-black text-green-600 mt-2">
              ${orders.reduce((sum, o) => sum + o.total_amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
