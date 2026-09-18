import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import useCart from '../context/useCart.js'
const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Offers', href: '/offers' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { itemCount } = useCart()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('api/users/profile', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        setCurrentUser(response.data.user)
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Error fetching user profile:', error)
        }
      }
    }


    fetchUserProfile()
  },[])


  return (
    <header className='sticky top-0 z-50 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8' aria-label='Main navigation'>
        <Link to='/' className='flex items-center gap-3' aria-label='Bhoj Express home'>
          <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-orange-100'>
            <img
              src='/bhojExpress(1).jpg'
              alt='Bhoj Express logo'
              className='h-full w-full rounded-full object-contain'
            />
          </div>
          <span className='text-xl font-bold tracking-tight text-orange-600'>Bhoj Express</span>
        </Link>

        <div className='hidden items-center gap-8 md:flex'>
          {navigationLinks.map((link) => <NavLink key={link.label} to={link.href} onClick={() => window.scrollTo(0, 0)} className={({ isActive }) => `text-sm font-medium transition-colors hover:text-orange-600 ${isActive ? 'text-orange-600' : 'text-slate-700'}`}>{link.label}</NavLink>)}
        </div>

        <div className='hidden items-center gap-3 md:flex'>
          <Link
            to='/cart'
            className='rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600'
          >
            Cart ({itemCount})
          </Link>
          {currentUser ? (
            <div className='relative'>
              <button type='button' onClick={() => setIsProfileOpen((open) => !open)} aria-expanded={isProfileOpen} aria-haspopup='true' className='flex items-center gap-2 rounded-full bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700'>
                <span className='max-w-28 truncate'>{currentUser.name}</span>
                <span aria-hidden='true' className='text-xs'>{isProfileOpen ? '▴' : '▾'}</span>
              </button>
              {isProfileOpen && (
                <div className='absolute right-0 top-12 z-50 w-72 rounded-2xl border border-orange-100 bg-white p-4 text-left shadow-xl shadow-orange-950/10'>
                  <div className='flex items-center gap-3 border-b border-orange-100 pb-4'>
                    <div className='min-w-0'><p className='truncate font-bold text-orange-950'>{currentUser.name}</p><p className='truncate text-xs text-orange-950/60'>{currentUser.email}</p></div>
                  </div>
                  <dl className='grid grid-cols-2 gap-x-4 gap-y-3 py-4 text-sm'>
                    <div><dt className='text-xs text-orange-950/50'>Profile</dt><dd className='font-semibold text-orange-950'>Personal</dd></div>
                    <div><dt className='text-xs text-orange-950/50'>Date of birth</dt><dd className='font-semibold text-orange-950'>Not set</dd></div>
                    <div><dt className='text-xs text-orange-950/50'>Gender</dt><dd className='font-semibold text-orange-950'>Not set</dd></div>
                    <div><dt className='text-xs text-orange-950/50'>Settings</dt><dd className='font-semibold text-orange-600'>Manage</dd></div>
                  </dl>
                  <button type='button' onClick={onLogout} className='w-full rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-bold text-orange-700 transition-colors hover:bg-orange-50'>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className='rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700'>Login</Link>
          )}
        </div>

        <button
          type='button'
          className='rounded-lg p-2 text-slate-700 hover:bg-orange-50 md:hidden'
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className='block h-0.5 w-6 bg-current' />
          <span className='mt-1.5 block h-0.5 w-6 bg-current' />
          <span className='mt-1.5 block h-0.5 w-6 bg-current' />
        </button>
      </nav>

      {isMenuOpen && (
        <div className='border-t border-orange-100 bg-white px-5 pb-4 md:hidden'>
          <div className='flex flex-col gap-1 pt-2'>
            {navigationLinks.map((link) => <Link key={link.label} to={link.href} className='rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600' onClick={() => setIsMenuOpen(false)}>{link.label}</Link>)}
            <Link to='/cart' onClick={() => setIsMenuOpen(false)} className='rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600'>
              Cart ({itemCount})
            </Link>
            {currentUser ? (
              <>
                <button type='button' onClick={() => setIsProfileOpen((open) => !open)} className='mt-1 rounded-lg bg-orange-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-700'>Profile</button>
                {isProfileOpen && <div className='rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm'><p className='font-bold text-orange-950'>{currentUser.name}</p><p className='mt-1 text-orange-950/60'>{currentUser.email}</p><p className='mt-3 text-orange-950/60'>Profile · Date of birth: Not set · Gender: Not set</p><button type='button' onClick={onLogout} className='mt-3 font-bold text-orange-700'>Log out</button></div>}
              </>
            ) : (
              <Link to='/login' onClick={() => setIsMenuOpen(false)} className='mt-1 rounded-lg bg-orange-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-700'>Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar