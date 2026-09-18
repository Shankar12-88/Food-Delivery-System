import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import useCart from '../context/useCart.js'

const dishes = [
  ['Tandoori Butter Bowl', 'Charred paneer, makhani sauce, basmati rice', 'रु 1,806', '🍲', 'A rich, comforting bowl with creamy makhani sauce, smoky paneer, and fragrant basmati rice. Perfect for a cozy, indulgent meal.'],
  ['Crispy Masala Wrap', 'Spiced potato, fresh slaw, mint chutney', 'रु 1,330', '🌯', 'Loaded with crisp vegetables and warm masala potato, this wrap is crunchy, fresh, and packed with bold flavors.'],
  ['Mango Cloud Lassi', 'Alphonso mango, yogurt, cardamom', 'रु 735', '🥭', 'A cooling, creamy mango lassi blended with cardamom for a sweet and refreshing sip.'],
  ['Ginger Garlic Noodles', 'Wok-tossed vegetables, sesame, chili oil', 'रु 1,645', '🍜', 'Slurp-worthy noodles tossed with ginger, garlic, vegetables, and a touch of chili oil for a savory finish.'],
  ['Saffron Kheer', 'Rice pudding, pistachio, rose petals', 'रु 840', '🍮', 'Soft, creamy, and aromatic, this dessert brings the warmth of saffron and the elegance of rose petals.'],
  ['Garden Chaat Bowl', 'Crisp chickpeas, herbs, tangy tamarind', 'रु 1,246', '🥗', 'A bright and crunchy bowl with a lively mix of herbs, chickpeas, and tangy tamarind dressing.'],
]

function FoodDetails() {
  const { dishName } = useParams()
  const location = useLocation()
  const food = location.state?.food
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const fallbackDish = dishes.find((dish) => {
    const [name] = dish
    return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-')) === dishName
  })

  if (!food && !fallbackDish) {
    return (
      <main className='min-h-screen bg-orange-50 px-5 py-16 text-orange-950 lg:px-8'>
        <div className='mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white p-10 text-center shadow-sm'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Dish not found</p>
          <h1 className='mt-4 text-3xl font-black'>This item is not on the menu.</h1>
          <Link to='/menu' className='mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700'>Back to menu</Link>
        </div>
      </main>
    )
  }

  const [fallbackName, fallbackDescription, fallbackPrice, fallbackEmoji, fallbackDetails] = fallbackDish || []
  const name = food?.name || fallbackName
  const description = food?.description || fallbackDescription
  const price = food ? `रु ${food.price.toLocaleString()}` : fallbackPrice
  const details = food?.description || fallbackDetails

  const handleAddToCart = () => {
    addToCart({
      name,
      description,
      price,
      image: food?.image,
      emoji: fallbackEmoji || '🍽️',
    })
    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 1200)
  }

  return (
    <main className='min-h-screen bg-orange-50 px-5 py-16 text-orange-950 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <Link to='/menu' className='mb-6 inline-flex items-center gap-2 text-sm font-bold text-orange-700'>← Back to menu</Link>

        <div className='overflow-hidden rounded-[32px] border border-orange-200 bg-white shadow-[0_20px_60px_rgba(251,146,60,0.12)]'>
          <div className='grid gap-0 md:grid-cols-2'>
            <div className='flex min-h-[320px] items-center justify-center bg-gradient-to-br from-orange-200 via-amber-300 to-yellow-200 text-[120px] md:text-[180px]'>
              {food?.image ? <img src={food.image} className='h-full min-h-[320px] w-full object-cover' alt={name} /> : fallbackEmoji}
            </div>

            <div className='p-7 sm:p-8 lg:p-10'>
              <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Signature dish</p>
              <h1 className='mt-3 text-3xl font-black sm:text-4xl'>{name}</h1>

              <div className='mt-5 flex items-center gap-3'>
                <span className='rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700'>{food?.category || 'Best seller'}</span>
                <span className='text-2xl font-black text-emerald-600'>{price}</span>
              </div>

              <p className='mt-6 text-lg leading-8 text-orange-950/70'>{details}</p>

              <div className='mt-8 rounded-2xl border border-orange-100 bg-orange-50 p-4'>
                <p className='text-sm font-bold uppercase tracking-[0.15em] text-orange-600'>Includes</p>
                <p className='mt-2 text-base text-orange-950/70'>{description}</p>
                {food?.preparationTime && <p className='mt-2 text-base text-orange-950/70'>Preparation time: {food.preparationTime}</p>}
              </div>

              <div className='mt-8 flex flex-wrap gap-3'>
                <button
                  type='button'
                  onClick={handleAddToCart}
                  className={`rounded-full px-6 py-3 text-sm font-bold text-white transition ${isAdded ? 'bg-green-600' : 'bg-orange-600 hover:bg-orange-700'}`}
                >
                  {isAdded ? 'Added to cart' : 'Add to order'}
                </button>
                <button type='button' className='rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-50'>Save item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FoodDetails
