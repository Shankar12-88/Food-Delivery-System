import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Offers', href: '/offers' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8' aria-label='Main navigation'>
        <Link to='/' className='flex items-center gap-3' aria-label='Bhoj Express home'>
          <img
            src='/bhojExpress(1).jpg'
            alt='Bhoj Express logo'
            className='h-12 w-12 rounded-full object-cover ring-2 ring-orange-100'
          />
          <span className='text-xl font-bold tracking-tight text-orange-600'>Bhoj Express</span>
        </Link>

        <div className='hidden items-center gap-8 md:flex'>
          {navigationLinks.map((link) => <NavLink key={link.label} to={link.href} className={({ isActive }) => `text-sm font-medium transition-colors hover:text-orange-600 ${isActive ? 'text-orange-600' : 'text-slate-700'}`}>{link.label}</NavLink>)}
        </div>

        <div className='hidden items-center gap-3 md:flex'>
          <Link
            to='/cart'
            className='rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600'
          >
            Cart (0)
          </Link>
          <Link
            to='/login'
            className='rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700'
          >
            Sign in
          </Link>
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
              Cart (0)
            </Link>
            <Link to='/login' onClick={() => setIsMenuOpen(false)} className='mt-1 rounded-lg bg-orange-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-700'>Sign in</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar