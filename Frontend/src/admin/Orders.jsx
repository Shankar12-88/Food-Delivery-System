import { useState, useEffect } from 'react'
import axios from 'axios'

function Orders() {
  const [orders, setOrders] = useState([])
  const [updatingId, setUpdatingId] = useState(null)

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', { withCredentials: true })
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    }
  }

  useEffect(() => {
    // Fetch once when the order-management page opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders()
  }, [])

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel and delete this order?')) return
    try {
      await axios.delete(`/api/orders/${orderId}`, { withCredentials: true })
      setOrders(orders.filter(o => o._id !== orderId))
    } catch (error) {
      console.error('Failed to cancel order:', error)
      alert('Failed to cancel order')
    }
  }

  const handleAdvanceStatus = async (orderId) => {
    setUpdatingId(orderId)
    try {
      const response = await axios.patch(`/api/orders/${orderId}/advance-status`, {}, { withCredentials: true })
      setOrders((current) => current.map((order) => order._id === orderId ? { ...response.data.order, contactEmail: response.data.order.email || order.contactEmail } : order))
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to update order status')
    } finally {
      setUpdatingId(null)
    }
  }

  const nextActionLabel = (status) => ({
    Cart: 'Accept order',
    Pending: 'Start preparing',
    Preparing: 'Mark packed',
    Packing: 'Send on route',
    'On route': 'Mark delivered',
  }[status])

  return (
    <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Orders</p>
          <h3 className='mt-1 text-2xl font-black text-orange-950'>Order Management</h3>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead>
            <tr className='border-b border-orange-100 text-xs font-bold uppercase tracking-wide text-orange-500'>
              <th className='pb-3 pr-4'>Order ID</th>
              <th className='pb-3 pr-4'>Customer & Contact</th>
              <th className='pb-3 pr-4'>Items</th>
              <th className='pb-3 pr-4'>Total</th>
              <th className='pb-3 pr-4'>Status</th>
              <th className='pb-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='border-b border-orange-50 align-top'>
                <td className='py-4 pr-4 font-black text-orange-950'>#{order._id.slice(-5).toUpperCase()}</td>
                <td className='py-4 pr-4'>
                  <div className='font-semibold text-orange-900'>{order.name || 'Customer'}</div>
                  {order.phone && (
                    <a href={`tel:${order.phone}`} className='text-sm text-emerald-600 hover:underline'>
                      📞 {order.phone}
                    </a>
                  )}
                  {!order.phone && order.contactEmail && (
                    <a href={`mailto:${order.contactEmail}`} className='block text-sm text-emerald-600 hover:underline'>
                      {order.contactEmail}
                    </a>
                  )}
                </td>
                <td className='py-4 pr-4 text-orange-700 max-w-xs'>
                  <ul className='list-disc pl-4 text-sm'>
                    {order.items?.map((item, idx) => (
                      <li key={idx}>{item.name} x{item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td className='py-4 pr-4 font-black text-emerald-600'>रु {order.total?.toFixed(2)}</td>
                <td className='py-4 pr-4'>
                  <span className='rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700'>
                    {order.status}
                  </span>
                </td>
                <td className='py-4'>
                  <div className='flex flex-wrap gap-2'>
                    {nextActionLabel(order.status) && <button onClick={() => handleAdvanceStatus(order._id)} disabled={updatingId === order._id} className='rounded-xl bg-orange-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-orange-700 disabled:opacity-60'>{updatingId === order._id ? 'Updating...' : nextActionLabel(order.status)}</button>}
                    {order.status !== 'Delivered' && <button onClick={() => handleCancelOrder(order._id)} className='rounded-xl bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-200'>Cancel</button>}
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan='6' className='py-8 text-center text-orange-950/50'>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
