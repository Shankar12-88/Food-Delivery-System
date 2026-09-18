import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Products() {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadFoods = async () => {
      try {
        const response = await axios.get('/api/food/getfood', { withCredentials: true })
        if (isMounted) {
          setFoods(response.data.foods || [])
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error.response?.data?.message || 'Unable to load products.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFoods()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDelete = async (food) => {
    if (!window.confirm(`Delete ${food.name}?`)) return
    setDeletingId(food._id)
    try {
      await axios.delete(`/api/food/${food._id}`, { withCredentials: true })
      toast.success('Product deleted successfully.', { position: 'top-center' })
      setFoods((prev) => prev.filter((item) => item._id !== food._id))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete product.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className='rounded-3xl border border-orange-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500'>Menu management</p>
          <h3 className='mt-1 text-2xl font-black text-orange-950'>All products</h3>
        </div>
        <Link to='/admin/products/add' className='rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700'>Add product</Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead>
            <tr className='border-b border-orange-100 text-xs font-bold uppercase tracking-wide text-orange-500'>
              <th className='px-4 py-3'>S.N.</th>
              <th className='px-4 py-3'>Food item</th>
              <th className='px-4 py-3'>Category</th>
              <th className='px-4 py-3'>Price</th>
              <th className='px-4 py-3'>Stock</th>
              <th className='px-4 py-3 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan='6' className='px-4 py-8 text-center text-sm text-orange-950/60'>Loading products...</td></tr>}
            {!isLoading && foods.length === 0 && <tr><td colSpan='6' className='px-4 py-8 text-center text-sm text-orange-950/60'>No food items have been added yet.</td></tr>}
            {foods.map((food, index) => (
              <tr key={food._id} className='border-b border-orange-50 text-sm last:border-0 hover:bg-orange-50/60'>
                <td className='px-4 py-4 font-bold text-orange-500'>{index + 1}</td>
                <td className='px-4 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-orange-100 text-lg'>
                      {food.image ? <img src={food.image} className='h-full w-full object-cover' alt='' /> : '🍽️'}
                    </div>
                    <span className='font-black text-orange-950'>{food.name}</span>
                  </div>
                </td>
                <td className='px-4 py-4 text-orange-950/70'>{food.category}</td>
                <td className='px-4 py-4 font-black text-emerald-600'>रु {Number(food.price).toLocaleString()}</td>
                <td className='px-4 py-4 font-semibold text-orange-950/80'>{food.stock}</td>
                <td className='px-4 py-4 text-right'>
                  <div className='flex justify-end gap-2'>
                    <button type='button' onClick={() => navigate('/admin/products/add', { state: { food } })} className='rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100'>Edit</button>
                    <button type='button' onClick={() => handleDelete(food)} disabled={deletingId === food._id} className='rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60'>{deletingId === food._id ? 'Deleting...' : 'Delete'}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Products
