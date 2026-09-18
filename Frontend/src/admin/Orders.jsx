const orders = [
  { id: '#1048', customer: 'Aarav Sharma', items: '2 items', total: 'रु 28.40', status: 'Preparing' },
  { id: '#1047', customer: 'Maya Thompson', items: '4 items', total: 'रु 46.85', status: 'Ready' },
  { id: '#1046', customer: 'Rohan Karki', items: '1 item', total: 'रु 12.90', status: 'Delivered' },
  { id: '#1045', customer: 'Sofia Williams', items: '3 items', total: 'रु 35.20', status: 'Pending' },
]

function Orders() {
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
              <th className='pb-3 pr-4'>Order</th>
              <th className='pb-3 pr-4'>Customer</th>
              <th className='pb-3 pr-4'>Items</th>
              <th className='pb-3 pr-4'>Total</th>
              <th className='pb-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='border-b border-orange-50'>
                <td className='py-4 pr-4 font-black text-orange-950'>{order.id}</td>
                <td className='py-4 pr-4 font-semibold text-orange-900'>{order.customer}</td>
                <td className='py-4 pr-4 text-orange-700'>{order.items}</td>
                <td className='py-4 pr-4 font-black text-emerald-600'>{order.total}</td>
                <td className='py-4'>
                  <span className='rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700'>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
