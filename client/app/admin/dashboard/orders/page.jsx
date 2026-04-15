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
  const [selectedOrder, setSelectedOrder] = useState(null) // State for Modal

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
      // If modal is open, update the local state too
      if(selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({...selectedOrder, status})
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const deleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    try {
      await api.deleteOrder(orderId)
      loadOrders()
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error deleting order:', error)
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
    <div className="min-h-screen bg-gray-50/50 font-outfit pb-10">
      {/* PROFESSIONAL HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-blue-600 p-2.5 md:p-3 rounded-xl md:rounded-2xl shrink-0 shadow-lg shadow-blue-100">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-gray-900 leading-none tracking-tight">Order Registry</h1>
              <p className="hidden md:block text-xs text-blue-600 font-black uppercase tracking-widest mt-1.5">Sales & Logistics</p>
            </div>
          </div>

          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 text-gray-700 bg-gray-50 hover:text-blue-600 hover:bg-blue-50 rounded-xl md:rounded-2xl transition-all text-xs md:text-sm font-black group border border-gray-100"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span><span className="hidden sm:inline">Back to </span>Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* STATS AREA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          {[
            { label: 'Total Volume', value: orders.length, color: 'gray' },
            { label: 'Pending Action', value: orders.filter(o => o.status === 'pending').length, color: 'yellow' },
            { label: 'In Processing', value: orders.filter(o => o.status === 'processing').length, color: 'blue' },
            { label: 'Total Revenue', value: `$${orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString()}`, color: 'green' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-1 md:mb-2 text-${stat.color}-500`}>{stat.label}</p>
              <p className="text-xl md:text-4xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* FILTERS AREA */}
        <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8 mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-base md:text-lg font-black text-gray-900 flex items-center gap-3">
              <div className="w-1.5 md:w-2 h-6 md:h-8 bg-blue-600 rounded-full"></div>
              Filter by Status
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black capitalize transition-all whitespace-nowrap border-2 ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100'
                      : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ORDERS LIST CONTAINER */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Current Records</h2>
            <button 
                onClick={loadOrders} 
                className="flex items-center gap-2 p-2.5 md:px-4 md:py-2 bg-gray-50 text-gray-500 hover:text-blue-600 rounded-xl transition-all font-bold text-sm"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Customer Details</th>
                  <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                  <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Live Status</th>
                  <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Control</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="py-32 text-center text-blue-600 font-black text-xl animate-pulse">Syncing Database...</td></tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-40 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-xl font-black">No Records Available</p>
                        </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/30 transition-colors group">
                      <td className="py-7 px-8 font-mono text-sm font-bold text-blue-600 bg-blue-50/30">{order.order_number}</td>
                      <td className="py-7 px-8">
                        <p className="font-black text-gray-900 text-base">{order.customer_name}</p>
                        <p className="text-sm text-gray-500 font-medium">{order.customer_email}</p>
                      </td>
                      <td className="py-7 px-8">
                        <p className="font-black text-gray-900 text-lg">${order.total_amount?.toFixed(2)}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Gateway Paid</p>
                      </td>
                      <td className="py-7 px-8">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight outline-none border-2 border-transparent focus:border-blue-200 cursor-pointer transition-all ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-7 px-8">
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW - High Accessibility Control Buttons */}
          <div className="md:hidden divide-y divide-gray-50">
            {loading ? (
               <div className="py-20 text-center text-blue-600 font-black animate-pulse">Syncing...</div>
            ) : orders.length === 0 ? (
               <div className="py-20 text-center text-gray-300 font-black">No Records</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-6 space-y-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {order.order_number}
                      </span>
                      <h3 className="font-black text-gray-900 text-lg leading-tight">{order.customer_name}</h3>
                      <p className="text-xs text-gray-500">{order.customer_email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-gray-900">${order.total_amount?.toFixed(2)}</p>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Amount Due</p>
                    </div>
                  </div>

                  {/* MOBILE STATUS DROPDOWN */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`w-full h-12 px-4 rounded-xl text-xs font-black uppercase outline-none border-2 border-transparent shadow-sm ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* MOBILE ACTION BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm active:scale-95 transition-all shadow-lg shadow-blue-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                    <button 
                      onClick={() => deleteOrder(order.id)}
                      className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center active:bg-red-500 active:text-white transition-all border border-red-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* --- ORDER DETAILS MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-blue-600 p-6 md:p-8 text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Order Details</p>
                <h3 className="text-xl md:text-2xl font-black font-mono">{selectedOrder.order_number}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 md:p-8 max-h-[75vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Section */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Name</p>
                      <p className="font-black text-gray-900">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                      <p className="font-bold text-gray-700 break-all">{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Contact Number</p>
                      <p className="font-bold text-gray-900">{selectedOrder.customer_phone || 'Not Provided'}</p>
                    </div>
                  </div>
                </section>

                {/* Shipping Section */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Shipping Destination</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Address</p>
                      <p className="font-bold text-gray-900 leading-tight">{selectedOrder.shipping_address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">City</p>
                        <p className="font-bold text-gray-900">{selectedOrder.shipping_city}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Postal Code</p>
                        <p className="font-bold text-gray-900">{selectedOrder.shipping_postal_code || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <hr className="my-8 border-gray-100" />

              {/* Order Notes Section */}
              <section className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">Order Notes</h4>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 italic text-gray-600 text-sm leading-relaxed">
                  {selectedOrder.order_notes || "No additional instructions provided for this order."}
                </div>
              </section>

              {/* Total Section */}
              <div className="bg-blue-50 rounded-3xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-600">Total Transaction Amount</p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900">${selectedOrder.total_amount?.toFixed(2)}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
               <button 
                onClick={() => deleteOrder(selectedOrder.id)}
                className="flex-1 h-14 bg-red-50 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all text-sm"
               >
                 Archive Order
               </button>
               <button 
                onClick={() => setSelectedOrder(null)}
                className="flex-1 h-14 bg-white border border-gray-200 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-all text-sm"
               >
                 Close View
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}