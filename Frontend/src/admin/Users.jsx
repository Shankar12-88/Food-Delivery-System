const users = [
  { name: 'Aarav Sharma', email: 'aarav@gmail.com', role: 'Customer' },
  { name: 'Maya Thompson', email: 'maya@gmail.com', role: 'Customer' },
  { name: 'Riya Sharma', email: 'riya@bhojexpress.com', role: 'Admin' },
]

function Users() {
  return (
    <div className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Customers</p>
        <h3 className='mt-1 text-2xl font-black text-orange-950'>Users</h3>
      </div>

      <div className='space-y-3'>
        {users.map((user) => (
          <div key={user.email} className='flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50 p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white'>
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className='font-black text-orange-950'>{user.name}</p>
                <p className='text-sm text-orange-700'>{user.email}</p>
              </div>
            </div>

            <span className='rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700'>
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
