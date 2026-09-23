import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const initialForm = { name: '', email: '', phone: '', address: '', password: '' }

function CreateAdmin() {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await axios.post('/api/users/admin', form, { withCredentials: true })
      toast.success('Administrator created successfully.')
      setForm(initialForm)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to create administrator.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <section className='max-w-3xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
    <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Access management</p>
    <h3 className='mt-1 text-2xl font-black text-orange-950'>Create administrator</h3>
    <p className='mt-2 text-sm text-orange-950/60'>Administrators can manage menu items, categories, and orders.</p>
    <form onSubmit={submit} className='mt-6 grid gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:grid-cols-2'>
      {[['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'], ['address', 'Address', 'text'], ['password', 'Password (minimum 8 characters)', 'password']].map(([field, label, type]) => <label key={field} className={`text-sm font-semibold text-orange-950 ${field === 'address' ? 'sm:col-span-2' : ''}`}>{label}<input type={type} value={form[field]} minLength={field === 'password' ? 8 : undefined} required onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} className='mt-2 w-full rounded-xl border border-orange-200 bg-white px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' /></label>)}
      <div className='sm:col-span-2 flex justify-end'><button disabled={isSubmitting} className='rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-60'>{isSubmitting ? 'Creating...' : 'Create administrator'}</button></div>
    </form>
  </section>
}

export default CreateAdmin
