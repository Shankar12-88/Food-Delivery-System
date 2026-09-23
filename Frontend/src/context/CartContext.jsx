import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CartContext from './cartContext.js'

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/orders/cart', { withCredentials: true })
        if (response.data.cart && response.data.cart.items) {
          setItems(response.data.cart.items.map((item) => ({ ...item, emoji: '🍽️' })))
        }
      } catch (error) {
        setItems([])
        console.error('Error fetching cart:', error)
      }
    }
    fetchCart()
    window.addEventListener('user-login', fetchCart)
    const clearCart = () => setItems([])
    window.addEventListener('user-logout', clearCart)

    return () => {
      window.removeEventListener('user-login', fetchCart)
      window.removeEventListener('user-logout', clearCart)
    }
  }, [])

  const applyCart = (cart) => {
    setItems((cart?.items || []).map((cartItem) => ({ ...cartItem, emoji: '🍽️' })))
  }

  async function addToCart(item) {
    try {
      const response = await axios.post('/api/orders/cart/add', { foodId: item.foodId }, { withCredentials: true })
      applyCart(response.data.cart)
      return response.data.cart
    } catch (error) {
      console.error('Error adding to backend cart:', error)
      if (error.response?.status === 401) {
        navigate('/register')
      }
      throw error
    }
  }

  async function updateItem(foodId, amount) {
    const itemToUpdate = items.find((item) => String(item.foodId) === String(foodId))
    if (!itemToUpdate) return;

    try {
      let response
      if (amount > 0) {
        response = await axios.post('/api/orders/cart/add', { foodId: itemToUpdate.foodId }, { withCredentials: true })
      } else {
        response = await axios.post('/api/orders/cart/remove', { foodId: itemToUpdate.foodId }, { withCredentials: true })
      }
      applyCart(response.data.cart)
      return response.data.cart
    } catch (error) {
      console.error('Error updating backend cart:', error)
      if (error.response?.status === 401) {
        navigate('/register')
      }
      throw error
    }
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => {
    const price = Number(item.price)
    return sum + (Number.isFinite(price) ? price : 0) * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateItem, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider }
