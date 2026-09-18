import { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('api/users/profile', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })

        setUser(response.data.user)
      } catch (e) {
        console.log(`error: ${e}`)
      }
    }

    fetchUserProfile()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U'

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        <div className='overflow-hidden rounded-[28px] border border-orange-100 bg-white/90 shadow-[0_20px_60px_rgba(251,146,60,0.14)] backdrop-blur-sm'>
          <div className='bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 p-6 sm:p-8'>
            <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-orange-100 text-2xl font-black text-orange-700 shadow-lg'>
                  {initials}
                </div>

                <div className='text-white'>
                  <p className='text-sm uppercase tracking-[0.2em] text-orange-100'>My Profile</p>
                  <h1 className='mt-1 text-2xl font-bold sm:text-3xl'>{user?.name || 'Loading...'}</h1>
                </div>
              </div>

              <div className='rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-orange-50 shadow-sm backdrop-blur-sm'>
                Active account
              </div>
            </div>
          </div>

          <div className='grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]'>
            <div className='space-y-6'>
              <div className='rounded-2xl border border-orange-100 bg-orange-50/60 p-5'>
                <h2 className='mb-4 text-lg font-bold text-orange-950'>Personal Information</h2>

                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-orange-100'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-orange-500'>Full Name</p>
                    <p className='mt-2 text-base font-semibold text-slate-800'>{user?.name || 'Not available'}</p>
                  </div>

                  <div className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-orange-100'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-orange-500'>Email</p>
                    <p className='mt-2 break-all text-base font-semibold text-slate-800'>{user?.email || 'Not available'}</p>
                  </div>

                  <div className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-orange-100'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-orange-500'>Phone</p>
                    <p className='mt-2 text-base font-semibold text-slate-800'>{user?.phone || 'Not provided'}</p>
                  </div>

                  <div className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-orange-100'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-orange-500'>Account Status</p>
                    <p className='mt-2 text-base font-semibold text-emerald-600'>Verified</p>
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                <h2 className='mb-4 text-lg font-bold text-orange-950'>Account Timeline</h2>

                <div className='space-y-4'>
                  <div className='flex items-start gap-3 rounded-xl bg-orange-50 p-3'>
                    <div className='mt-1 h-2.5 w-2.5 rounded-full bg-orange-500' />
                    <div>
                      <p className='text-sm font-semibold text-slate-700'>Created</p>
                      <p className='text-sm text-slate-500'>{formatDate(user?.createdAt)}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 rounded-xl bg-amber-50 p-3'>
                    <div className='mt-1 h-2.5 w-2.5 rounded-full bg-amber-500' />
                    <div>
                      <p className='text-sm font-semibold text-slate-700'>Last Updated</p>
                      <p className='text-sm text-slate-500'>{formatDate(user?.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-500 to-amber-500 p-5 text-white shadow-lg'>
                <p className='text-xs uppercase tracking-[0.2em] text-orange-100'>Summary</p>
                <h3 className='mt-3 text-3xl font-black'>1</h3>
                <p className='mt-2 text-sm text-orange-50'>Active profile</p>
              </div>

              <div className='rounded-2xl border border-orange-100 bg-orange-50 p-5'>
                <h3 className='text-lg font-bold text-orange-950'>Quick Actions</h3>

                <div className='mt-4 space-y-3'>
                  <button type='button' className='w-full rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700'>Edit Profile</button>
                  <button type='button' className='w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50'>Manage Orders</button>
                  <button type='button' className='w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50'>Payment Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile