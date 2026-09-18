import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useCart from '../context/useCart.js'


function Menu() {
  const [foods, setFoods] = useState([])
  const [ratings, setRatings] = useState({})
  const [sentItem, setSentItem] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const categoryRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()
  const selectedCategory = searchParams.get('category')
  const visibleFoods = selectedCategory
    ? foods.filter((food) => food.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase())
    : foods
  const categories = [...new Map(foods
    .map((food) => food.category?.trim())
    .filter(Boolean)
    .map((category) => [category.toLowerCase(), category])).values()]
  const selectedCategoryLabel = selectedCategory || 'All items'

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
    setIsCategoryOpen(false)
  }

  const handleAddToCart = (dish) => {
    addToCart({
      name: dish.name,
      description: dish.description,
      price: `रु ${dish.price.toLocaleString()}`,
      emoji: '🍽️',
    })
    setSentItem(dish.name)
    window.setTimeout(() => setSentItem(''), 1200)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("api/food/getfood", {
          withCredentials: true
        });
        const menuItems = response?.data?.foods || []
        setFoods(menuItems)
        setRatings(Object.fromEntries(menuItems.map((food) => [food._id, Math.floor(Math.random() * 5) + 1])))
      } catch (error) {
        console.log("Unable to fetch menu from the backend", error)
      }
    }
    fetchMenu();
  }, [])
  return (
    <main className='bg-orange-50 px-5 py-16 text-orange-950 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>03 / Full menu</p>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
          <h1 className='mt-3 text-5xl font-black tracking-tight sm:text-6xl'>Choose your craving.</h1>
          <div ref={categoryRef} className='relative mt-8 flex w-full items-center justify-end gap-3' aria-label='Food categories'>
            <span className='text-sm font-bold text-orange-950/60'>Category:</span>
            <button
              type='button'
              onClick={() => setIsCategoryOpen((open) => !open)}
              aria-expanded={isCategoryOpen}
              aria-haspopup='menu'
              className='flex items-center gap-3 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-orange-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-100'
            >
              {selectedCategoryLabel}
              <span aria-hidden='true' className={`text-xs transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isCategoryOpen && (
              <div className='absolute right-0 top-full z-20 mt-2 min-w-56 overflow-hidden rounded-xl border border-orange-200 bg-white p-1.5 shadow-xl shadow-orange-950/10' role='menu'>
                <button type='button' onClick={() => handleCategoryChange('')} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-orange-50 ${!selectedCategory ? 'bg-orange-50 text-orange-700' : 'text-orange-950'}`} role='menuitem'>
                  All items
                  {!selectedCategory && <span aria-hidden='true'>✓</span>}
                </button>
                {categories.map((category) => {
                  const isSelected = selectedCategory?.toLowerCase() === category.toLowerCase()
                  return <button key={category} type='button' onClick={() => handleCategoryChange(category)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-orange-50 ${isSelected ? 'bg-orange-50 text-orange-700' : 'text-orange-950'}`} role='menuitem'>
                    {category}
                    {isSelected && <span aria-hidden='true'>✓</span>}
                  </button>
                })}
              </div>
            )}
          </div>
        </div>
        <p className='mt-5 max-w-xl text-lg leading-8 text-orange-950/60'>Comforting classics, fresh favorites, and sweet little endings made for your kind of day.</p>



        <div className='mt-10 grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {visibleFoods.map((dish) => (
            <article key={dish._id} className='group mb-4 w-full max-w-[280px] overflow-hidden rounded-2xl border border-orange-200/80 bg-white shadow-[0_10px_30px_rgba(124,45,18,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(124,45,18,0.12)]'>
              <div className='relative flex justify-center aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-200 to-amber-300'>
                <img src={dish.image} className='h-full w-full object-cover transition duration-500 group-hover:scale-105' alt={dish.name} />
                {dish.category && <span className='absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-700 shadow-sm backdrop-blur'>{dish.category}</span>}
              </div>

              <div className='p-4 sm:p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <h2 className='min-w-0 text-lg font-black leading-tight'>{dish.name}</h2>
                  <span className='shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-600'>रु {dish.price.toLocaleString()}</span>
                </div>

                <p className='mt-2 line-clamp-2 text-sm leading-5 text-orange-950/60'>{dish.description}</p>

                <div className='mt-3 flex items-center gap-2' aria-label={`${ratings[dish._id] || 1} out of 5 stars`}>
                  <span className='text-sm tracking-wide text-amber-400' aria-hidden='true'>
                    {'★'.repeat(ratings[dish._id] || 1)}
                    <span className='text-orange-200'>{'★'.repeat(5 - (ratings[dish._id] || 1))}</span>
                  </span>
                  <span className='text-xs font-bold text-orange-950/50'>{ratings[dish._id] || 1}.0</span>
                </div>

                <div className='mt-4 flex gap-2'>
                  <Link
                    to={`/menu/${dish._id}`}
                    state={{ food: dish }}
                    onClick={() => window.scrollTo(0, 0)}
                    className='flex-1 rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 text-center text-sm font-bold text-orange-700 transition-colors hover:bg-orange-100'
                  >
                    View
                  </Link>

                  <button
                    type='button'
                    onClick={() => handleAddToCart(dish)}
                    className={`rounded-xl px-4 py-1.5 text-sm font-bold text-white transition-colors ${sentItem === dish.name ? 'bg-green-600' : 'bg-orange-600 hover:bg-orange-700'}`}
                  >
                    {sentItem === dish.name ? 'Sent ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>

          ))}
        </div>
      </div>
    </main >
  )
}

export default Menu
