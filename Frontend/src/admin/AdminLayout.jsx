import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Order', to: '/admin/orders' },
  { label: 'Delivery Boy', to: '/admin/deliveryboy' },
  { label: 'Transcation', to: '/admin/]transcations' },
  { label: 'Customers', to: '/admin/users' },
  { label: 'Settings', to: '/admin/settings' },

]

function AdminLayout() {
  const sidebarRef = useRef(null)
  const mainRef = useRef(null)
  const location = useLocation()
  const [isProductsOpen, setIsProductsOpen] = useState(location.pathname.startsWith('/admin/products'))
  const isProductsActive = location.pathname.startsWith('/admin/products')

  const [prevIsActive, setPrevIsActive] = useState(isProductsActive)
  if (prevIsActive !== isProductsActive) {
    setPrevIsActive(isProductsActive)
    if (!isProductsActive) {
      setIsProductsOpen(false)
    }
  }

  const handoffScroll = (event, sourceRef, targetRef) => {
    const source = sourceRef.current
    const target = targetRef.current
    if (!source || !target || event.deltaY === 0) return

    const atTop = source.scrollTop <= 0 && event.deltaY < 0
    const atBottom = source.scrollTop + source.clientHeight >= source.scrollHeight - 1 && event.deltaY > 0
    if ((atTop || atBottom) && target.scrollHeight > target.clientHeight) {
      event.preventDefault()
      target.scrollTop += event.deltaY
    }
  }

  return (
    <div className='min-h-screen bg-orange-50 text-orange-950 lg:h-screen lg:overflow-hidden'>
      <div className='mx-auto flex min-h-screen max-w-[1600px] lg:h-screen'>
        <aside ref={sidebarRef} onWheel={(event) => handoffScroll(event, sidebarRef, mainRef)} className='hidden w-72 shrink-0 flex-col overflow-y-auto bg-[#2b1d1a] p-6 text-white lg:flex'>
          <div className='flex items-center gap-3 border-b border-white/10 pb-5'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white'>B</div>
            <div>
              <p className='text-xs uppercase tracking-[0.2em] text-orange-200'>Admin</p>
              <h1 className='text-xl font-black'>Bhoj Express</h1>
            </div>
          </div>

          <nav className='mt-8 mb-8 space-y-2'>
            {navItems.map((item) => item.label === 'Products' ? (
              <div key={item.to}>
                <button type='button' onClick={() => setIsProductsOpen((open) => !open)} aria-expanded={isProductsOpen} aria-controls='admin-product-links' className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${isProductsActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-orange-100/80 hover:bg-white/5 hover:text-white'}`}>
                    <span>{item.label}</span>
                    <span aria-hidden='true' className={`text-xs transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                <div id='admin-product-links' className={`grid overflow-hidden transition-all duration-300 ${isProductsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className='min-h-0 space-y-1 pl-4 pt-1'>
                    <NavLink to='/admin/products' end className={({ isActive }) => `block rounded-lg border-l-2 px-4 py-2 text-xs font-semibold transition-all duration-300 ${isActive ? 'border-orange-300 bg-white/10 text-orange-100 shadow-sm shadow-white/5 translate-x-1' : 'border-transparent text-orange-100/70 hover:bg-white/5 hover:text-white'}`}>All products</NavLink>
                    <NavLink to='/admin/products/add' className={({ isActive }) => `block rounded-lg border-l-2 px-4 py-2 text-xs font-semibold transition-all duration-300 ${isActive ? 'border-orange-300 bg-white/10 text-orange-100 shadow-sm shadow-white/5 translate-x-1' : 'border-transparent text-orange-100/70 hover:bg-white/5 hover:text-white'}`}>Add product</NavLink>
                    <span className='block px-4 py-2 text-xs font-semibold text-orange-100/45'>Edit from product row</span>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/admin/dashboard'} className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-orange-100/80 hover:bg-white/5 hover:text-white'}`}>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className='mt-auto rounded-2xl border border-white/10 bg-white/5 p-4'>
            <p className='text-xs uppercase tracking-[0.2em] text-orange-200'>Status</p>
            <p className='mt-2 text-sm font-semibold text-white'>Restaurant is live</p>
            <p className='mt-1 text-xs text-orange-100/70'>Open for orders today</p>
          </div>
        </aside>

        <main ref={mainRef} onWheel={(event) => handoffScroll(event, mainRef, sidebarRef)} className='min-w-0 flex-1 overflow-y-auto'>
          <header className='border-b border-orange-200 bg-white/80 px-4 py-5 backdrop-blur-sm sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Operations dashboard</p>
                <h2 className='mt-1 text-2xl font-black text-orange-950'>Admin Panel</h2>
              </div>

              <div className='flex items-center gap-3'>
                <button type='button' className='rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700'>View Store</button>
                <div className='flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white'>RS</div>
              </div>
            </div>
          </header>

          <div className='p-4 sm:p-6 lg:p-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
