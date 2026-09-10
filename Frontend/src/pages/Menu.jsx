const dishes = [
  ['Tandoori Butter Bowl', 'Charred paneer, makhani sauce, basmati rice', '$12.90', '🍲'],
  ['Crispy Masala Wrap', 'Spiced potato, fresh slaw, mint chutney', '$9.50', '🌯'],
  ['Mango Cloud Lassi', 'Alphonso mango, yogurt, cardamom', '$5.25', '🥭'],
  ['Ginger Garlic Noodles', 'Wok-tossed vegetables, sesame, chili oil', '$11.75', '🍜'],
  ['Saffron Kheer', 'Rice pudding, pistachio, rose petals', '$6.00', '🍮'],
  ['Garden Chaat Bowl', 'Crisp chickpeas, herbs, tangy tamarind', '$8.90', '🥗'],
]

function Menu() {
  return (
    <main className='bg-orange-50 px-5 py-16 text-orange-950 lg:px-8'>
      <div className='mx-auto max-w-7xl'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>03 / Full menu</p><h1 className='mt-3 text-5xl font-black tracking-tight sm:text-6xl'>Choose your craving.</h1><p className='mt-5 max-w-xl text-lg leading-8 text-orange-950/60'>Comforting classics, fresh favorites, and sweet little endings made for your kind of day.</p><div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>{dishes.map(([name, description, price, emoji]) => <article key={name} className='overflow-hidden rounded-3xl border border-orange-200 bg-white'><div className='flex h-44 items-center justify-center bg-gradient-to-br from-orange-200 to-amber-300 text-8xl'>{emoji}</div><div className='p-6'><div className='flex items-start justify-between gap-3'><h2 className='text-xl font-black'>{name}</h2><span className='font-black text-orange-600'>{price}</span></div><p className='mt-2 text-sm leading-6 text-orange-950/60'>{description}</p><button type='button' className='mt-5 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700'>Add to order +</button></div></article>)}</div></div>
    </main>
  )
}

export default Menu
