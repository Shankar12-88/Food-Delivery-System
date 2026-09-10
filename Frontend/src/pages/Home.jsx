const categories = [
  { name: 'Indian classics', detail: 'Comfort in every bite', icon: '🍛', color: 'bg-orange-100' },
  { name: 'Street favorites', detail: 'Bold, bright, unforgettable', icon: '🌮', color: 'bg-amber-100' },
  { name: 'Fresh & light', detail: 'Goodness made delicious', icon: '🥗', color: 'bg-lime-100' },
  { name: 'Sweet endings', detail: 'Save room for dessert', icon: '🍰', color: 'bg-rose-100' },
]

const popularDishes = [
  { name: 'Tandoori Butter Bowl', description: 'Charred paneer, makhani sauce, basmati rice', price: '$12.90', rating: '4.9', color: 'from-orange-300 to-red-400', emoji: '🍲' },
  { name: 'Crispy Masala Wrap', description: 'Spiced potato, fresh slaw, mint chutney', price: '$9.50', rating: '4.8', color: 'from-amber-200 to-orange-400', emoji: '🌯' },
  { name: 'Mango Cloud Lassi', description: 'Alphonso mango, yogurt, cardamom', price: '$5.25', rating: '5.0', color: 'from-yellow-200 to-amber-300', emoji: '🥭' },
]

const reviews = [
  { quote: 'The kind of meal that makes a busy Tuesday feel like a celebration.', name: 'Maya R.', detail: 'Regular customer', initials: 'MR' },
  { quote: 'Everything arrived warm, beautifully packed, and somehow even tastier than expected.', name: 'Jonah K.', detail: 'Verified order', initials: 'JK' },
  { quote: 'Bhoj Express is now our Friday night ritual. The butter bowl is genuinely excellent.', name: 'Aisha T.', detail: 'Verified order', initials: 'AT' },
  { quote: 'The flavors are bright, comforting, and exactly what I wanted after a long day.', name: 'Ravi S.', detail: 'Verified order', initials: 'RS' },
  { quote: 'Fast delivery, generous portions, and the friendliest service in the neighborhood.', name: 'Nina P.', detail: 'Regular customer', initials: 'NP' },
  { quote: 'I found my new favorite lunch spot without leaving my desk. Absolutely delightful.', name: 'Leo M.', detail: 'Verified order', initials: 'LM' },
]

const feedbackNotes = [
  ['“Perfectly spiced and still hot when it arrived.”', 'Priya, Kathmandu'],
  ['“The ordering experience was as good as the food.”', 'Sam, Lalitpur'],
  ['“That mango lassi deserves its own fan club.”', 'Anu, Bhaktapur'],
  ['“A reliable little bright spot in a busy week.”', 'Kiran, Kathmandu'],
]

function Stars({ value = '5.0' }) {
  return (
    <span className='inline-flex items-center gap-1' aria-label={`${value} out of 5 stars`}>
      <span className='text-amber-400' aria-hidden='true'>★★★★★</span>
      <span className='text-xs font-bold text-orange-950'>{value}</span>
    </span>
  )
}

function Home() {
  return (
    <div className='overflow-hidden bg-orange-50 text-orange-950'>
      <section id='home' className='relative isolate border-b border-orange-100'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,_#fed7aa_0,_transparent_34%),linear-gradient(115deg,_#fff7ed_0%,_#ffedd5_54%,_#fed7aa_100%)]' />
        <div className='mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28'>
          <div>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700'>
              <span className='h-2 w-2 rounded-full bg-green-500' /> Delivering fresh today
            </div>
            <h1 className='max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl'>
              Food that feels like <span className='text-orange-600'>home.</span>
            </h1>
            <p className='mt-7 max-w-xl text-lg leading-8 text-orange-900/70'>
              Big flavors, honest ingredients, and a warm delivery to your doorstep. Discover your next comfort meal with Bhoj Express.
            </p>
            <div className='mt-9 flex flex-wrap items-center gap-4'>
              <a href='#menu' className='rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-transform hover:-translate-y-0.5 hover:bg-orange-700'>
                Explore the menu <span aria-hidden='true'>→</span>
              </a>
              <a href='#how-it-works' className='rounded-full border border-orange-300 bg-white/60 px-7 py-3.5 text-sm font-bold text-orange-900 hover:bg-white'>
                How it works
              </a>
            </div>
            <div className='mt-10 flex items-center gap-4 text-sm text-orange-900/70'>
              <div className='flex -space-x-2' aria-hidden='true'>
                {['MR', 'JK', 'AT'].map((initials) => <span key={initials} className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-50 bg-orange-800 text-[10px] font-bold text-white'>{initials}</span>)}
              </div>
              <span><strong className='text-orange-950'>4.9/5</strong> from 2,000+ happy foodies</span>
            </div>
          </div>
          <div className='relative mx-auto w-full max-w-lg'>
            <div className='absolute -right-4 -top-5 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-orange-900/10'>
              <Stars value='4.9' />
              <p className='mt-1 text-xs font-medium text-orange-900/60'>Loved by locals</p>
            </div>
            <div className='relative aspect-square rounded-[2.5rem] bg-orange-950 p-5 shadow-2xl shadow-orange-950/20'>
              <div className='flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-orange-700 bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 p-7 text-white'>
                <div className='flex items-start justify-between'><span className='text-sm font-bold uppercase tracking-[0.18em] text-orange-100'>Bhoj / Express</span><span className='rounded-full bg-white/15 px-3 py-1 text-xs font-bold'>#01</span></div>
                <div className='text-center'><span className='text-8xl drop-shadow-lg' role='img' aria-label='Bowl of food'>🍛</span><p className='mt-4 text-3xl font-black'>Made with heart.</p><p className='mt-2 text-orange-100'>Delivered with care.</p></div>
                <div className='flex items-end justify-between text-xs font-semibold text-orange-100'><span>Comfort food<br />for every mood</span><span className='text-right'>Est. 2026<br />Fresh daily</span></div>
              </div>
            </div>
            <div className='absolute -bottom-5 -left-5 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-orange-900/10'><p className='text-2xl font-black text-orange-600'>30 min</p><p className='text-xs font-medium text-orange-900/60'>Average delivery</p></div>
          </div>
        </div>
      </section>

      <section aria-label='Bhoj Express highlights' className='border-b border-orange-100 bg-white'>
        <div className='mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 lg:px-8'>
          {[['2,000+', 'orders delivered'], ['4.9 / 5', 'average rating'], ['30 min', 'to your doorstep']].map(([number, label]) => <div key={label} className='flex items-center gap-3 border-orange-100 sm:border-r sm:last:border-0'><span className='text-2xl font-black text-orange-600'>{number}</span><span className='text-sm text-orange-950/60'>{label}</span></div>)}
        </div>
      </section>

      <section id='menu' className='mx-auto max-w-7xl px-5 py-20 lg:px-8'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Find your flavor</p><h2 className='mt-2 text-4xl font-black tracking-tight'>What are you craving?</h2></div><a href='#all-categories' className='text-sm font-bold text-orange-600 hover:text-orange-800'>View all categories <span aria-hidden='true'>↗</span></a></div>
        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>{categories.map((category) => <a key={category.name} href='#menu' className={`group rounded-3xl ${category.color} p-6 transition-transform hover:-translate-y-1`}><span className='text-5xl' role='img' aria-label={category.name}>{category.icon}</span><h3 className='mt-8 text-lg font-black'>{category.name}</h3><p className='mt-1 text-sm text-orange-950/60'>{category.detail}</p><span className='mt-5 inline-block text-xl font-bold text-orange-700 transition-transform group-hover:translate-x-1' aria-hidden='true'>→</span></a>)}</div>
      </section>

      <section className='bg-orange-950 py-20 text-orange-50'>
        <div className='mx-auto max-w-7xl px-5 lg:px-8'><div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>The crowd favorites</p><h2 className='mt-2 text-4xl font-black tracking-tight text-white'>Good taste, confirmed.</h2></div><a href='#full-menu' className='text-sm font-bold text-orange-300 hover:text-white'>Browse full menu <span aria-hidden='true'>↗</span></a></div><div className='mt-10 grid gap-5 lg:grid-cols-3'>{popularDishes.map((dish) => <article key={dish.name} className='overflow-hidden rounded-3xl bg-white text-orange-950'><div className={`flex h-48 items-center justify-center bg-gradient-to-br ${dish.color}`}><span className='text-8xl drop-shadow-md' role='img' aria-label={dish.name}>{dish.emoji}</span></div><div className='p-6'><div className='flex items-start justify-between gap-4'><h3 className='text-xl font-black'>{dish.name}</h3><span className='whitespace-nowrap text-lg font-black text-orange-600'>{dish.price}</span></div><p className='mt-2 text-sm leading-6 text-orange-950/60'>{dish.description}</p><div className='mt-5 flex items-center justify-between'><Stars value={dish.rating} /><a href='#order' className='text-sm font-bold text-orange-600 hover:text-orange-800'>Add to order <span aria-hidden='true'>+</span></a></div></div></article>)}</div></div>
      </section>

      <section id='how-it-works' className='mx-auto max-w-7xl px-5 py-20 lg:px-8'><div className='max-w-xl'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Simple as 1, 2, yum</p><h2 className='mt-2 text-4xl font-black tracking-tight'>From our kitchen to your table.</h2></div><div className='mt-12 grid gap-8 md:grid-cols-3'>{[['01', 'Choose your craving', 'Browse a menu built around big flavor and easy choices.'], ['02', 'We cook it fresh', 'Our kitchen starts your order when you place it, never before.'], ['03', 'Enjoy the moment', 'Follow your delivery and get ready for a meal worth sharing.']].map(([number, title, text]) => <div key={number} className='border-t-2 border-orange-200 pt-5'><span className='text-sm font-black text-orange-600'>{number}</span><h3 className='mt-12 text-xl font-black'>{title}</h3><p className='mt-3 max-w-xs text-sm leading-6 text-orange-950/60'>{text}</p></div>)}</div></section>

      <section id='offers' className='mx-5 overflow-hidden rounded-[2rem] bg-amber-300 lg:mx-auto lg:max-w-7xl'><div className='grid items-center gap-8 px-8 py-12 sm:px-14 lg:grid-cols-[1fr_auto] lg:px-16'><div><span className='rounded-full bg-orange-950 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200'>First order treat</span><h2 className='mt-5 max-w-2xl text-4xl font-black tracking-tight text-orange-950 sm:text-5xl'>A little welcome gift, on us.</h2><p className='mt-4 max-w-lg text-orange-950/70'>Take $5 off your first order with code <strong className='text-orange-950'>WELCOME5</strong>. Your dinner plans just got better.</p></div><a href='#order' className='w-fit rounded-full bg-orange-950 px-7 py-3.5 text-center text-sm font-bold text-white hover:bg-orange-800'>Claim the offer <span aria-hidden='true'>→</span></a></div></section>

      <section id='reviews' className='mx-auto max-w-7xl px-5 py-20 lg:px-8'><div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Kind words</p><h2 className='mt-2 text-4xl font-black tracking-tight'>The reviews are in.</h2></div><div className='flex items-center gap-3'><span className='text-3xl font-black'>4.9</span><div><Stars /><p className='text-xs text-orange-950/50'>2,000+ reviews</p></div></div></div><div className='mt-10 grid gap-5 lg:grid-cols-3'>{reviews.map((review, index) => <figure key={review.name} style={{ animationDelay: `${index}s` }} className='animate-[slide-in-right_800ms_ease-out_both] rounded-3xl border border-orange-200 bg-white p-7'><Stars /><blockquote className='mt-6 text-lg font-bold leading-8 text-orange-950'>“{review.quote}”</blockquote><figcaption className='mt-8 flex items-center gap-3'><span className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-xs font-black text-orange-800'>{review.initials}</span><span><strong className='block text-sm'>{review.name}</strong><span className='text-xs text-orange-950/50'>{review.detail}</span></span></figcaption></figure>)}</div></section>

      <section id='feedback' className='border-y border-orange-200 bg-orange-100'><div className='mx-auto max-w-7xl px-5 py-16 lg:px-8'><div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Your voice matters</p><h2 className='mt-2 text-3xl font-black tracking-tight sm:text-4xl'>How did we do?</h2><p className='mt-3 max-w-xl text-sm leading-6 text-orange-950/65'>A few notes from the people who keep us cooking. Every rating helps us make the next order even better.</p></div><a href='#feedback-form' className='w-fit rounded-full border-2 border-orange-600 px-7 py-3.5 text-sm font-bold text-orange-700 hover:bg-orange-600 hover:text-white'>Leave feedback <span aria-hidden='true'>↗</span></a></div><div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>{feedbackNotes.map(([quote, author], index) => <article key={author} style={{ animationDelay: `${index}s` }} className='animate-[slide-in-right_800ms_ease-out_both] rounded-2xl border border-orange-200 bg-white p-5 shadow-sm'><div className='text-sm tracking-widest text-amber-400' aria-label='5 out of 5 stars'>★★★★★</div><p className='mt-4 text-sm font-bold leading-6'>{quote}</p><p className='mt-4 text-xs text-orange-950/50'>{author}</p></article>)}</div></div></section>

      <section id='order' className='mx-auto max-w-7xl px-5 py-20 text-center lg:px-8'><img src='/bhojExpress(1).jpg' alt='Bhoj Express' className='mx-auto h-16 w-16 rounded-full object-cover ring-4 ring-orange-200' /><h2 className='mx-auto mt-6 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl'>Ready when your appetite is.</h2><p className='mx-auto mt-4 max-w-lg text-orange-950/60'>Skip the cooking, keep the joy. Order your favorite meal and make today delicious.</p><a href='#menu' className='mt-8 inline-block rounded-full bg-orange-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700'>Start your order <span aria-hidden='true'>→</span></a></section>
    </div>
  )
}

export default Home