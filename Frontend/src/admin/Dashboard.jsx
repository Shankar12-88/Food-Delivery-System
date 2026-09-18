const stats = [
  { label: 'Total Revenue', value: 'रु 12,846', tone: 'bg-orange-100 text-orange-700' },
  { label: 'Orders Today', value: '1,248', tone: 'bg-amber-100 text-amber-700' },
  { label: 'Avg. Order', value: 'रु 27.54', tone: 'bg-yellow-100 text-yellow-700' },
  { label: 'Rating', value: '4.9/5', tone: 'bg-emerald-100 text-emerald-700' },
]

const recentOrders = [
  { id: '#1048', customer: 'Aarav Sharma', total: 'रु 28.40', status: 'Preparing' },
  { id: '#1047', customer: 'Maya Thompson', total: 'रु 46.85', status: 'Ready' },
  { id: '#1046', customer: 'Rohan Karki', total: 'रु 12.90', status: 'Delivered' },
]

const categoryData = [
  { name: 'Biryani', value: 42, color: 'bg-orange-500' },
  { name: 'Wraps', value: 28, color: 'bg-amber-400' },
  { name: 'Desserts', value: 18, color: 'bg-yellow-400' },
  { name: 'Drinks', value: 12, color: 'bg-emerald-400' },
]

const performance = [
  { label: 'Order completion', value: '96%', detail: '+4.2% vs last week' },
  { label: 'Customer retention', value: '68%', detail: '+6.8% this month' },
  { label: 'Delivery time', value: '22 mins', detail: '-3 mins faster' },
]

function Dashboard() {
  return (
    <div className='space-y-6'>
      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div key={stat.label} className='rounded-3xl border border-orange-100 bg-white p-5 shadow-sm'>
            <div className={`mb-4 inline-flex rounded-xl px-3 py-2 text-sm font-bold ${stat.tone}`}>
              {stat.label}
            </div>
            <p className={stat.value.includes('रु') ? 'text-3xl font-black text-emerald-600' : 'text-3xl font-black text-orange-950'}>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className='grid gap-6 xl:grid-cols-[1.5fr_0.9fr]'>
        <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
          <div className='mb-5 flex items-center justify-between'>
            <h3 className='text-xl font-black text-orange-950'>Sales Overview</h3>
            <span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700'>+18.6%</span>
          </div>

          <div className='flex h-52 items-end gap-3'>
            {[42, 58, 48, 74, 66, 82, 90].map((height, index) => (
              <div key={index} className='flex flex-1 flex-col items-center gap-2'>
                <div className='w-full rounded-t-2xl bg-gradient-to-t from-orange-500 to-amber-400' style={{ height: `${height}%` }} />
                <span className='text-[10px] font-bold uppercase tracking-wide text-orange-500'>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
          <h3 className='text-xl font-black text-orange-950'>Recent Orders</h3>
          <div className='mt-5 space-y-4'>
            {recentOrders.map((order) => (
              <div key={order.id} className='flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50 p-3'>
                <div>
                  <p className='font-black text-orange-950'>{order.id}</p>
                  <p className='text-sm text-orange-700'>{order.customer}</p>
                </div>
                <div className='text-right'>
                  <p className='font-black text-emerald-600'>{order.total}</p>
                  <span className='rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700'>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-3'>
        {performance.map((item) => (
          <div key={item.label} className='rounded-3xl border border-orange-100 bg-white p-5 shadow-sm'>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>{item.label}</p>
            <h3 className='mt-4 text-3xl font-black text-orange-950'>{item.value}</h3>
            <p className='mt-2 text-sm text-orange-700'>{item.detail}</p>
          </div>
        ))}
      </section>

      <section className='grid gap-6 xl:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
          <div className='mb-5 flex items-center justify-between'>
            <h3 className='text-xl font-black text-orange-950'>Category Breakdown</h3>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Popular items</span>
          </div>

          <div className='space-y-4'>
            {categoryData.map((item) => (
              <div key={item.name}>
                <div className='mb-1 flex items-center justify-between text-sm font-semibold text-orange-900'>
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className='h-2.5 overflow-hidden rounded-full bg-orange-100'>
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
          <h3 className='text-xl font-black text-orange-950'>Summary Insight</h3>
          <div className='mt-5 space-y-4'>
            <div className='rounded-2xl bg-orange-50 p-4'>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Best seller</p>
              <p className='mt-2 text-lg font-black text-orange-950'>Tandoori Butter Bowl</p>
              <p className='mt-1 text-sm text-orange-700'>84 units sold this week</p>
            </div>

            <div className='rounded-2xl bg-amber-50 p-4'>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-amber-600'>Customer trend</p>
              <p className='mt-2 text-lg font-black text-orange-950'>Weekend demand rising</p>
              <p className='mt-1 text-sm text-orange-700'>Orders increased by 21% on weekends</p>
            </div>

            <div className='rounded-2xl bg-emerald-50 p-4'>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-emerald-600'>Operational note</p>
              <p className='mt-2 text-lg font-black text-orange-950'>Delivery performance is strong</p>
              <p className='mt-1 text-sm text-orange-700'>On-time delivery rate reached 96%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
