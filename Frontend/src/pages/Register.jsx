function Register({ onLogin, onHome }) {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className='flex min-h-[calc(100vh-76px)] items-center justify-center bg-orange-50 px-5 py-12'>
      <section className='w-full max-w-2xl rounded-[2rem] bg-white p-7 shadow-xl shadow-orange-950/10 sm:p-12'>
        <div className='flex items-center justify-between gap-4'>
          <button type='button' onClick={onHome} className='flex items-center gap-3 text-left'><img src='/bhojExpress(1).jpg' alt='Bhoj Express logo' className='h-11 w-11 rounded-full object-cover ring-2 ring-orange-100' /><span className='font-bold text-orange-600'>Bhoj Express</span></button>
          <button type='button' onClick={onHome} className='text-sm font-bold text-orange-600 hover:text-orange-800'>← Home</button>
        </div>
        <div className='mt-10'><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Join the table</p><h1 className='mt-2 text-4xl font-black tracking-tight text-orange-950'>Create your account</h1><p className='mt-3 text-sm text-orange-950/60'>Save your favorites and make every order feel like home.</p></div>
        <form onSubmit={handleSubmit} className='mt-8 grid gap-5 sm:grid-cols-2'>
          <label className='block text-sm font-bold text-orange-950'>Full name<input type='text' name='name' autoComplete='name' required placeholder='Your full name' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
          <label className='block text-sm font-bold text-orange-950'>Phone number<input type='tel' name='phone' autoComplete='tel' required placeholder='+1 555 000 0000' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
          <label className='block text-sm font-bold text-orange-950 sm:col-span-2'>Address<input type='text' name='address' autoComplete='street-address' required placeholder='Street, city, and postal code' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
          <label className='block text-sm font-bold text-orange-950'>Email address<input type='email' name='email' autoComplete='email' required placeholder='you@example.com' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
          <label className='block text-sm font-bold text-orange-950'>Password<input type='password' name='password' autoComplete='new-password' required minLength='8' placeholder='At least 8 characters' className='mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-normal outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200' /></label>
          <label className='flex items-start gap-2 text-xs leading-5 text-orange-950/60 sm:col-span-2'><input type='checkbox' required className='mt-1 accent-orange-600' /> I agree to the terms and privacy policy.</label>
          <button type='submit' className='rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-orange-700 sm:col-span-2'>Create account</button>
        </form>
        <p className='mt-7 text-center text-sm text-orange-950/60'>Already have an account? <button type='button' onClick={onLogin} className='font-bold text-orange-600 hover:text-orange-800'>Sign in</button></p>
      </section>
    </main>
  )
}

export default Register