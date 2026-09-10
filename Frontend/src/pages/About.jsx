function About({ onHome, onContact }) {
  return (
    <main className='bg-orange-50 text-orange-950'>
      <section className='bg-orange-950 text-white'>
        <div className='mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:py-28'>
          <div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Our story</p><h1 className='mt-4 max-w-2xl text-5xl font-black leading-tight sm:text-7xl'>Food made for feeling at home.</h1><p className='mt-6 max-w-xl text-lg leading-8 text-orange-100/70'>Bhoj Express started with a simple idea: a delivered meal should feel personal, generous, and worth looking forward to.</p></div>
          <div className='relative rounded-[2rem] bg-orange-500 p-8 text-center'><img src='/bhojExpress(1).jpg' alt='Bhoj Express logo' className='mx-auto h-40 w-40 rounded-full object-cover ring-8 ring-orange-300/50' /><p className='mt-7 text-2xl font-black'>Made with heart.</p><p className='mt-2 text-orange-100'>Delivered with care.</p></div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-5 py-20 lg:px-8'><div className='grid gap-12 lg:grid-cols-2 lg:items-center'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>More than a meal</p><h2 className='mt-3 text-4xl font-black tracking-tight'>The good stuff should be easy to find.</h2></div><div className='space-y-5 text-base leading-8 text-orange-950/65'><p>We bring together the flavors people love and the convenience busy days need. Every menu choice is selected to be comforting, exciting, and easy to share.</p><p>From our kitchen partners to the person at your door, we care about the small details that turn a delivery into a moment.</p></div></div></section>

      <section className='border-y border-orange-200 bg-white'><div className='mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-3 lg:px-8'>{[['2,000+', 'happy foodies'], ['4.9 / 5', 'average rating'], ['30 min', 'average delivery']].map(([value, label]) => <div key={label} className='border-orange-200 sm:border-r sm:last:border-0'><p className='text-4xl font-black text-orange-600'>{value}</p><p className='mt-2 text-sm text-orange-950/60'>{label}</p></div>)}</div></section>

      <section className='mx-auto max-w-7xl px-5 py-20 lg:px-8'><div className='text-center'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>What guides us</p><h2 className='mt-3 text-4xl font-black tracking-tight'>Our promise, in three parts.</h2></div><div className='mt-12 grid gap-5 md:grid-cols-3'>{[['01', 'Flavor first', 'We look for meals that make the first bite memorable and the last one satisfying.'], ['02', 'People matter', 'We build relationships with cooks, couriers, and customers one order at a time.'], ['03', 'Keep it warm', 'Great service should feel thoughtful, from the kitchen to your front door.']].map(([number, title, text]) => <article key={number} className='rounded-3xl bg-orange-100 p-7'><span className='text-sm font-black text-orange-600'>{number}</span><h3 className='mt-12 text-xl font-black'>{title}</h3><p className='mt-3 text-sm leading-6 text-orange-950/65'>{text}</p></article>)}</div></section>

      <section className='mx-5 mb-20 rounded-[2rem] bg-amber-300 lg:mx-auto lg:max-w-7xl'><div className='flex flex-col items-start justify-between gap-6 px-8 py-12 sm:flex-row sm:items-center sm:px-14'><div><h2 className='text-3xl font-black'>Have a question for our team?</h2><p className='mt-2 text-sm text-orange-950/65'>We would love to hear from you.</p></div><button type='button' onClick={onContact} className='rounded-full bg-orange-950 px-7 py-3.5 text-sm font-bold text-white hover:bg-orange-800'>Get in touch <span aria-hidden='true'>→</span></button></div></section>
      <div className='pb-10 text-center'><button type='button' onClick={onHome} className='text-sm font-bold text-orange-600 hover:text-orange-800'>← Back to home</button></div>
    </main>
  )
}

export default About