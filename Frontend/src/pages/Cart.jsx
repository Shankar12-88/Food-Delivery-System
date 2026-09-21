import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useCart from '../context/useCart.js'
import axios from 'axios'

function Cart() {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { items, updateItem, itemCount, total } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scroll(0, 0)
    const checkAuth = async () => {
      try {
        await axios.get('/api/users/profile', { withCredentials: true })
      } catch (error) {
        navigate('/register')
      }
    }
    checkAuth()
  }, [navigate])
  async function handleCheckout() {
    setIsCheckingOut(true)

    try {
      let customerName = 'Guest Customer'
      let customerEmail = 'guest@example.com'
      try {
        const profileRes = await axios.get('/api/users/profile', { withCredentials: true })
        customerName = profileRes.data.user.name
        customerEmail = profileRes.data.user.email
      } catch (err) {
        // Proceed as guest
      }

      await axios.post('/api/orders/checkout', {
        name: customerName,
        phone: '9800000000', // Mocked as there's no input form yet
        address: 'Kathmandu, Nepal', // Mocked as there's no input form yet
        payment_method: 'esewa'
      })

      const response = await fetch('/api/payments/esewa/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: total,
          items: items.map(({ name, quantity }) => ({ name, quantity })),
        }),
      })
      const payment = await response.json()

      if (!response.ok) throw new Error(payment.message || 'Unable to start eSewa payment.')

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = payment.paymentUrl
      Object.entries(payment.fields).forEach(([name, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      toast.error(error.message)
      setIsCheckingOut(false)
    }
  }

  return (
    <main className='min-h-[calc(100vh-76px)] bg-orange-50 px-5 py-16 text-orange-950 lg:px-8'>
      <section className='mx-auto max-w-5xl'>
        <div className='flex flex-col justify-between gap-4 border-b border-orange-200 pb-8 sm:flex-row sm:items-end'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Your cart</p>
            <h1 className='mt-3 text-4xl font-black tracking-tight sm:text-5xl'>Ready when you are.</h1>
          </div>
          <span className='rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white'>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        {items.length === 0 ? (
          <div className='py-20 text-center'>
            <span className='text-7xl' role='img' aria-label='Empty plate'>🍽️</span>
            <h2 className='mt-8 text-3xl font-black'>Your table is waiting.</h2>
            <p className='mx-auto mt-4 max-w-lg leading-7 text-orange-950/60'>Your cart is empty for now. Find something delicious and we will bring it right over.</p>
            <a href='/menu' className='mt-8 inline-block rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-orange-700'>Browse the menu →</a>
          </div>
        ) : (
          <div className='mt-10 grid gap-8 lg:grid-cols-[1fr_320px]'>
            <div className='grid gap-4'>
              {items.map((item) => (
                <article key={item.name} className='flex items-center gap-4 rounded-3xl border border-orange-200 bg-white p-4 shadow-sm sm:p-5'>
                  <span className='flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-200 to-amber-300 text-4xl' role='img' aria-label={item.name}>{item.emoji}</span>
                  <div className='min-w-0 flex-1'><h2 className='truncate text-lg font-black'>{item.name}</h2><p className='mt-1 text-sm font-semibold text-emerald-600'>{item.price} each</p></div>
                  <div className='flex items-center gap-3'><button type='button' onClick={() => updateItem(item.name, -1)} className='flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 font-bold text-orange-700 hover:bg-orange-50' aria-label={`Remove one ${item.name}`}>−</button><span className='w-5 text-center font-black'>{item.quantity}</span><button type='button' onClick={() => updateItem(item.name, 1)} className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 font-bold text-white hover:bg-orange-700' aria-label={`Add one ${item.name}`}>+</button></div>
                </article>
              ))}
            </div>
            <aside className='h-fit rounded-3xl bg-orange-950 p-6 text-orange-50'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Order summary</p><div className='mt-6 flex justify-between border-b border-orange-800 pb-4 text-sm text-orange-200'><span>{itemCount} items</span><span>Subtotal</span></div><div className='mt-5 flex items-center justify-between'><span className='text-lg font-bold'>Total</span><span className='text-2xl font-black text-emerald-400'>रु {total.toFixed(2)}</span></div><button type='button' onClick={handleCheckout} disabled={isCheckingOut} className='mt-7 w-full rounded-full bg-amber-300 px-6 py-3.5 text-sm font-black text-orange-950 hover:bg-amber-200 disabled:cursor-wait disabled:opacity-70'>{isCheckingOut ? 'Connecting to eSewa…' : 'Continue to checkout →'}</button></aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default Cart
