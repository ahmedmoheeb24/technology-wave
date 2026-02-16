"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

const AdminDashboard = () => {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }
    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const orders = await api.getOrders()
      
      const totalOrders = orders.length
      const pendingOrders = orders.filter(o => o.status === 'pending').length
      const completedOrders = orders.filter(o => o.status === 'completed').length
      const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)

      setStats({ totalOrders, pendingOrders, completedOrders, totalRevenue })
      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setStats({ totalOrders: 0, pendingOrders: 0, completedOrders: 0, totalRevenue: 0 })
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrder(orderId, { status: newStatus })
      loadDashboardData()
      alert('Order status updated!')
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    }
  }

  const deleteOrder = async (orderId) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await api.deleteOrder(orderId)
        loadDashboardData()
        alert('Order deleted!')
      } catch (error) {
        console.error('Error deleting order:', error)
        alert('Failed to delete order')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Panel</h2>
          <p className="text-gray-600">Track orders and manage your website content</p>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <h3 className="text-3xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <h3 className="text-3xl font-bold text-blue-600">{stats.totalOrders}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Orders</p>
                <h3 className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed</p>
                <h3 className="text-3xl font-bold text-purple-600">{stats.completedOrders}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading orders...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono">{order.order_number}</td>
                      <td className="px-4 py-3 text-sm">{order.customer_name}</td>
                      <td className="px-4 py-3 text-sm">{order.customer_email}</td>
                      <td className="px-4 py-3 text-sm font-bold">${parseFloat(order.total_amount).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/dashboard/products">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-2xl font-bold mb-2">Products</h2>
              <p className="text-gray-600">Manage your product catalog</p>
            </div>
          </Link>

          <Link href="/admin/dashboard/services">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-500">
              <div className="text-5xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold mb-2">Services</h2>
              <p className="text-gray-600">Manage your services</p>
            </div>
          </Link>

          <Link href="/admin/dashboard/hero">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500">
              <div className="text-5xl mb-4">🖼️</div>
              <h2 className="text-2xl font-bold mb-2">Hero Banners</h2>
              <p className="text-gray-600">Manage hero slider</p>
            </div>
          </Link>

          <Link href="/admin/dashboard/about">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-indigo-500">
              <div className="text-5xl mb-4">ℹ️</div>
              <h2 className="text-2xl font-bold mb-2">About Page</h2>
              <p className="text-gray-600">Manage about us content</p>
            </div>
          </Link>

          <Link href="/admin/dashboard/orders">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-500">
              <div className="text-5xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">All Orders</h2>
              <p className="text-gray-600">Track and manage orders</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
