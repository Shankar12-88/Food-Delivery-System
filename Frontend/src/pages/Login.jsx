function Login({ onRegister, onHome }) {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className='flex min-h-[calc(100vh-76px)] items-center justify-center bg-orange-50 px-5 py-16'>
      <section className='grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-950/10 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='hidden bg-orange-950 p-10 text-white lg:flex lg:flex-col lg:justify-between'>
          <div>
            <button type='button' onClick={onHome} className='flex items-center gap-3 text-left'>
              <img src='/bhojExpress(1).jpg' alt='Bhoj Express logo' className='h-12 w-12 rounded-full object-cover ring-2 ring-orange-400' />
              <span className='text-xl font-bold'>Bhoj Express</span>
            </button>
            <p className='mt-20 text-4xl font-black leading-tight'>Welcome back to your table.</p>
          </div>
          <p className='max-w-xs text-sm leading-6 text-orange-200'>Sign in to reorder favorites, track deliveries, and discover something delicious.</p>
        </div>

        <div className='p-7 sm:p-12'>
          <button type='button' onClick={onHome} className='text-sm font-bold text-orange-600 hover:text-orange-800'>← Back to home</button>
          <div className='mt-10'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Good to see you</p><h1 className='mt-2 text-4xl font-black tracking-tight text-orange-950'>Sign in</h1><p className='mt-3 text-sm text-orange-950/60'>Continue your Bhoj Express journey.</p></div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            <label className='block text-sm font-bold text-orange-950'>Email address<input type='email' name='email' autoComplete='email' required placeholder='you@example.com' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
            <label className='block text-sm font-bold text-orange-950'>Password<input type='password' name='password' autoComplete='current-password' required placeholder='Enter your password' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
            <div className='flex items-center justify-between text-xs'><label className='flex items-center gap-2 text-orange-950/60'><input type='checkbox' className='accent-orange-600' /> Remember me</label><a href='#forgot-password' className='font-bold text-orange-600 hover:text-orange-800'>Forgot password?</a></div>
            <button type='submit' className='w-full rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-orange-700'>Sign in</button>
          </form>
          <p className='mt-8 text-center text-sm text-orange-950/60'>New to Bhoj Express? <button type='button' onClick={onRegister} className='font-bold text-orange-600 hover:text-orange-800'>Create an account</button></p>
        </div>
      </section>
    </main>
  )
}

export default Login