function Cart() {
  return (
    <main className='flex min-h-[calc(100vh-76px)] items-center justify-center bg-orange-50 px-5 py-16 text-center'><section className='max-w-lg'><span className='text-7xl' role='img' aria-label='Empty plate'>🍽️</span><p className='mt-8 text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Your cart</p><h1 className='mt-3 text-4xl font-black tracking-tight text-orange-950'>Your table is waiting.</h1><p className='mt-4 leading-7 text-orange-950/60'>Your cart is empty for now. Find something delicious and we will bring it right over.</p><a href='/menu' className='mt-8 inline-block rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-orange-700'>Browse the menu →</a></section></main>
  )
}

export default Cart
